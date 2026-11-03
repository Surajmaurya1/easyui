import { useCallback, useEffect, useRef, useState } from "react";
import type { DragEvent, KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * FolderDropzone — a file upload card built around an illustrated folder.
 *
 * idle       dashed card, folder closed, a sliver of paper peeking out
 * dragging   card goes solid, folder opens, the paper rises out of it
 * rejected   rose border pulse, unsupported file type feedback
 * uploading  progress traces the card border, the paper sinks in as bytes land
 * done       paper is inside, a green check pops onto the folder
 * error      rose border, click to retry
 *
 * Works out of the box with a simulated upload. Pass `onUpload` to wire a real one.
 */

type Status = "idle" | "dragging" | "rejected" | "uploading" | "done" | "error";

export interface FileDropzoneProps {
  /**
   * Perform the real upload. Call `onProgress(loadedBytes)` as bytes are sent.
   * Resolve when finished, reject to show the error state.
   * Omit it to get a simulated upload.
   */
  onUpload?: (
    files: File[],
    onProgress: (loadedBytes: number) => void,
    signal: AbortSignal
  ) => Promise<void>;
  /** Passed to the native file input, e.g. "image/*,.pdf" */
  accept?: string;
  multiple?: boolean;
  /** Show the "or try sample files" link under the card */
  showSamples?: boolean;
  /** ms to wait on the success state before going back to idle. 0 keeps it. */
  resetAfter?: number;
  className?: string;
}

/* ---------- palette (folder illustration) ---------- */

const BACK = "#3a63d8";
const LIP = "#2f55c0";
const FRONT_TOP = "#5d8cf2";
const FRONT_BOTTOM = "#4a7be6";
const SUCCESS = "#1f6b3a";

/* ---------- helpers ---------- */

const plural = (n: number) => (n === 1 ? "1 file" : `${n} files`);

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const wait = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const id = setTimeout(resolve, ms);
    signal.addEventListener("abort", () => {
      clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });

/**
 * Parse the `accept` prop into a set of MIME types and extensions for
 * client-side validation. Handles wildcards like `image/*`.
 */
function parseAccept(accept: string | undefined): {
  mimeTypes: string[];
  extensions: string[];
  wildcards: string[];
} | null {
  if (!accept) return null;
  const parts = accept
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (!parts.length) return null;

  const mimeTypes: string[] = [];
  const extensions: string[] = [];
  const wildcards: string[] = [];

  for (const part of parts) {
    if (part.startsWith(".")) {
      extensions.push(part);
    } else if (part.endsWith("/*")) {
      wildcards.push(part.replace("/*", "/"));
    } else {
      mimeTypes.push(part);
    }
  }
  return { mimeTypes, extensions, wildcards };
}

/**
 * Return `true` when at least one file in `items` would be accepted.
 * During `dragenter`/`dragover` we only have access to `DataTransferItem`,
 * which exposes `type` (MIME) but not the file name / extension — so
 * extension-only filters can't be fully validated until drop.
 */
function dragItemsMatchAccept(
  items: DataTransferItemList | undefined,
  parsed: ReturnType<typeof parseAccept>
): boolean {
  if (!parsed || !items || items.length === 0) return true;

  // If the accept list is extension-only we can't validate during drag
  if (!parsed.mimeTypes.length && !parsed.wildcards.length) return true;

  for (let i = 0; i < items.length; i++) {
    const t = items[i].type.toLowerCase();
    if (!t) continue; // type unknown during drag — don't reject
    if (parsed.mimeTypes.includes(t)) return true;
    if (parsed.wildcards.some((w) => t.startsWith(w))) return true;
  }
  return false;
}

function filesMatchAccept(
  files: File[],
  parsed: ReturnType<typeof parseAccept>
): boolean {
  if (!parsed || !files.length) return true;

  for (const file of files) {
    const t = file.type.toLowerCase();
    const name = file.name.toLowerCase();
    const ext = name.includes(".") ? `.${name.split(".").pop()}` : "";

    if (parsed.mimeTypes.includes(t)) return true;
    if (parsed.wildcards.some((w) => t.startsWith(w))) return true;
    if (ext && parsed.extensions.includes(ext)) return true;
  }
  return false;
}

/** Human-readable label from the `accept` prop, e.g. "images, .pdf" */
function humanAccept(accept: string | undefined): string {
  if (!accept) return "files";
  const parts = accept
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return parts
    .map((p) => {
      if (p.startsWith(".")) return p;
      if (p === "image/*") return "images";
      if (p === "video/*") return "videos";
      if (p === "audio/*") return "audio";
      if (p === "application/pdf") return ".pdf";
      if (p === "text/*") return "text files";
      return p;
    })
    .join(", ");
}

/** Fake upload: eases to 100% over ~2.6s, then "finishes" for a beat. */
async function simulateUpload(
  total: number,
  onProgress: (loaded: number) => void,
  signal: AbortSignal
) {
  const duration = 2600;
  const startedAt = performance.now();
  await new Promise<void>((resolve, reject) => {
    const tick = () => {
      if (signal.aborted) return reject(new DOMException("Aborted", "AbortError"));
      const p = Math.min(1, (performance.now() - startedAt) / duration);
      onProgress(Math.round(total * (1 - Math.pow(1 - p, 1.6))));
      if (p < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });
  await wait(700, signal);
}

/* ---------- component ---------- */

export function FileDropzone({
  onUpload,
  accept,
  multiple = true,
  showSamples = true,
  resetAfter = 2500,
  className = "",
}: FileDropzoneProps) {
  const reduceMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragDepth = useRef(0);

  const [status, setStatus] = useState<Status>("idle");
  const [dragCount, setDragCount] = useState(1);
  const [info, setInfo] = useState({ count: 0, total: 0 });
  const [loaded, setLoaded] = useState(0);

  const parsedAccept = parseAccept(accept);

  useEffect(
    () => () => {
      abortRef.current?.abort();
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    []
  );

  const start = useCallback(
    async (incoming: File[]) => {
      const files = multiple ? incoming : incoming.slice(0, 1);
      if (!files.length) return;

      // Validate file types on drop / file-pick
      if (!filesMatchAccept(files, parsedAccept)) {
        setStatus("rejected");
        if (resetTimer.current) clearTimeout(resetTimer.current);
        resetTimer.current = setTimeout(() => setStatus("idle"), 2200);
        return;
      }

      const total = files.reduce((sum, f) => sum + f.size, 0) || 1;
      if (resetTimer.current) clearTimeout(resetTimer.current);
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      setInfo({ count: files.length, total });
      setLoaded(0);
      setStatus("uploading");

      try {
        if (onUpload) await onUpload(files, setLoaded, ctrl.signal);
        else await simulateUpload(total, setLoaded, ctrl.signal);

        setLoaded(total);
        setStatus("done");
        if (resetAfter > 0) {
          resetTimer.current = setTimeout(() => setStatus("idle"), resetAfter);
        }
      } catch (err) {
        if ((err as Error)?.name === "AbortError") return;
        setStatus("error");
      }
    },
    [multiple, onUpload, resetAfter, parsedAccept]
  );

  /* ----- drag & drop ----- */

  const busy = status === "uploading";

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (busy) return;
    dragDepth.current += 1;
    const itemCount = Math.max(1, e.dataTransfer?.items?.length ?? 1);
    setDragCount(itemCount);

    // Check file types during drag
    if (!dragItemsMatchAccept(e.dataTransfer?.items, parsedAccept)) {
      setStatus("rejected");
    } else {
      setStatus("dragging");
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (busy) return;
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setStatus("idle");
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragDepth.current = 0;
    if (busy) return;
    start(Array.from(e.dataTransfer.files));
  };

  /* ----- click / keyboard ----- */

  const browse = () => {
    if (!busy) inputRef.current?.click();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      browse();
    }
  };

  const trySamples = () => {
    if (busy) return;
    const sample = new File([new Uint8Array(230 * 1024)], "sample-photo.jpg", {
      type: "image/jpeg",
    });
    start([sample]);
  };

  /* ----- derived values ----- */

  const pct = Math.min(1, loaded / info.total || 0);
  const finishing = status === "uploading" && pct >= 1;
  const acceptLabel = humanAccept(accept);

  const [title, subtitle] = {
    idle: [
      multiple ? "drop files to upload" : "drop a file to upload",
      "or click to browse",
    ],
    dragging: [`drop ${plural(dragCount)}`, "let go to upload"],
    rejected: [
      "unsupported file type",
      `only ${acceptLabel} allowed`,
    ],
    uploading: [
      `uploading ${plural(info.count)}`,
      finishing
        ? "finishing"
        : `${Math.round(pct * 100)}%, ${formatBytes(loaded)} of ${formatBytes(info.total)}`,
    ],
    done: [`${plural(info.count)} uploaded`, formatBytes(info.total)],
    error: ["upload failed", "click to try again"],
  }[status];

  const open = status === "dragging";
  const docY =
    status === "dragging"
      ? 2
      : status === "uploading"
        ? 6 + pct * 32
        : status === "done"
          ? 38
          : 27; // idle / error / rejected: just a sliver above the flap

  const cardTone = {
    idle: "border-dashed border-zinc-300 dark:border-zinc-700",
    dragging:
      "border-solid border-zinc-400 shadow-xl shadow-zinc-300/40 scale-[1.015] dark:border-zinc-500 dark:shadow-black/40",
    rejected:
      "border-solid border-rose-400 shadow-lg shadow-rose-200/30 animate-[shake_0.35s_ease-in-out] dark:border-rose-500 dark:shadow-rose-900/30",
    uploading: "border-solid border-zinc-200 dark:border-zinc-800",
    done: "border-solid border-emerald-700/40 dark:border-emerald-500/40",
    error: "border-solid border-rose-400 dark:border-rose-500",
  }[status];

  const spring = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 260, damping: 24 };

  return (
    <div className={`flex w-full max-w-xs sm:max-w-sm flex-col items-center gap-3 sm:gap-4 ${className}`}>
      <div
        role="button"
        tabIndex={0}
        aria-disabled={busy}
        aria-label="Upload files. Drop files here or press Enter to browse."
        onClick={browse}
        onKeyDown={onKeyDown}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={[
          "relative flex aspect-[3/2] w-full select-none flex-col items-center justify-center",
          "rounded-2xl sm:rounded-[22px] border-[1.5px] bg-white shadow-sm dark:bg-zinc-900",
          "outline-none transition-[border-color,box-shadow,transform] duration-200",
          "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          busy ? "cursor-default" : "cursor-pointer",
          cardTone,
        ].join(" ")}
      >
        {/* progress traced around the border */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 280 190"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <motion.rect
            x={0.75}
            y={0.75}
            width={278.5}
            height={188.5}
            rx={21.5}
            strokeWidth={1.5}
            strokeLinecap="round"
            className="stroke-zinc-500 dark:stroke-zinc-300"
            initial={false}
            animate={{
              pathLength: status === "uploading" ? pct : 0,
              opacity: status === "uploading" ? 1 : 0,
            }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "linear" }}
          />
        </svg>

        {/* folder */}
        <motion.svg
          viewBox="0 0 120 100"
          className="w-[38%] sm:w-[43%] overflow-visible"
          aria-hidden="true"
          animate={status === "done" && !reduceMotion ? { y: [0, -4, 0] } : { y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <defs>
            <linearGradient id="fd-front" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={FRONT_TOP} />
              <stop offset="1" stopColor={FRONT_BOTTOM} />
            </linearGradient>
          </defs>

          {/* ground shadow */}
          <ellipse cx={60} cy={89} rx={40} ry={3} fill="#000" opacity={0.07} />

          {/* back panel with tab */}
          <path
            fill={BACK}
            d="M14 76 V20 A5 5 0 0 1 19 15 H40 A5 5 0 0 1 43.5 16.5 L47 20 A5 5 0 0 0 50.5 21.5 H101 A5 5 0 0 1 106 26.5 V76 Z"
          />

          {/* paper */}
          <motion.g initial={false} animate={{ y: docY }} transition={spring}>
            <rect
              x={28}
              y={0}
              width={64}
              height={40}
              rx={3}
              fill="#ffffff"
              stroke="#dfe5f2"
              strokeWidth={0.6}
            />
            <rect x={34} y={7} width={6} height={6} rx={1.5} fill={BACK} />
            <rect x={45} y={7.5} width={26} height={1.8} rx={0.9} fill="#c9d2e6" />
            <rect x={45} y={11.5} width={16} height={1.4} rx={0.7} fill="#e0e5f0" />
            <rect x={34} y={21} width={52} height={1.6} rx={0.8} fill="#e0e5f0" />
            <rect x={34} y={26} width={40} height={1.6} rx={0.8} fill="#e0e5f0" />
          </motion.g>

          {/* darker lip, only visible when the flap lowers */}
          <motion.rect
            x={10}
            y={74}
            width={100}
            height={9}
            rx={4}
            fill={LIP}
            initial={false}
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* front flap */}
          <motion.rect
            x={10}
            y={32}
            width={100}
            height={48}
            rx={7}
            fill="url(#fd-front)"
            style={{ originY: 0 }}
            initial={false}
            animate={{ scaleY: open ? 0.93 : 1 }}
            transition={spring}
          />

          {/* success badge */}
          <AnimatePresence>
            {status === "done" && (
              <motion.g
                key="badge"
                style={{ originX: 0.5, originY: 0.5 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={
                  reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 18 }
                }
              >
                <circle cx={60} cy={57} r={10} fill={SUCCESS} stroke="#fff" strokeWidth={2} />
                <motion.path
                  d="M55 57.5 L58.5 61 L65 53.5"
                  fill="none"
                  stroke="#fff"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: reduceMotion ? 0 : 0.12, duration: reduceMotion ? 0 : 0.25 }}
                />
              </motion.g>
            )}
          </AnimatePresence>

          {/* rejected X badge */}
          <AnimatePresence>
            {status === "rejected" && (
              <motion.g
                key="rejected-badge"
                style={{ originX: 0.5, originY: 0.5 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={
                  reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 18 }
                }
              >
                <circle cx={60} cy={57} r={10} fill="#e11d48" stroke="#fff" strokeWidth={2} />
                <motion.path
                  d="M55.5 52.5 L64.5 61.5 M64.5 52.5 L55.5 61.5"
                  fill="none"
                  stroke="#fff"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: reduceMotion ? 0 : 0.08, duration: reduceMotion ? 0 : 0.2 }}
                />
              </motion.g>
            )}
          </AnimatePresence>
        </motion.svg>

        {/* copy */}
        <div className="mt-2 sm:mt-3 flex flex-col items-center px-3 text-center" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`t-${status}`}
              className={[
                "text-[13px] sm:text-[15px] font-medium leading-5",
                status === "rejected"
                  ? "text-rose-600 dark:text-rose-400"
                  : "text-zinc-800 dark:text-zinc-100",
              ].join(" ")}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: reduceMotion ? 0 : 0.14 }}
            >
              {title}
            </motion.span>
          </AnimatePresence>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`s-${status}-${finishing}`}
              className={[
                "mt-0.5 text-[11px] sm:text-[13px] leading-5 tabular-nums",
                status === "rejected"
                  ? "text-rose-400 dark:text-rose-500"
                  : "text-zinc-400 dark:text-zinc-500",
              ].join(" ")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.14 }}
            >
              {subtitle}
            </motion.span>
          </AnimatePresence>
        </div>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          tabIndex={-1}
          multiple={multiple}
          accept={accept}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            start(Array.from(e.target.files ?? []));
            e.target.value = "";
          }}
        />
      </div>

      {showSamples && (
        <button
          type="button"
          onClick={trySamples}
          disabled={busy}
          className="rounded text-[12px] sm:text-[13px] text-zinc-400 transition-colors hover:text-zinc-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:text-zinc-500 dark:hover:text-zinc-300"
        >
          or try sample files
        </button>
      )}

      {/* shake keyframes injected once */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-4px); }
          40% { transform: translateX(4px); }
          60% { transform: translateX(-3px); }
          80% { transform: translateX(2px); }
        }
      `}</style>
    </div>
  );
}
