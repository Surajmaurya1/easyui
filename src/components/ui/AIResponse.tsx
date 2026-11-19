"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  AIResponse — a streaming-ready AI message: markdown, code, sources, tools, */
/*  actions. One file · deps: react 19, framer-motion, tailwindcss.            */
/*  No lucide, no lib/utils, no design-system tokens.                          */
/*                                                                             */
/*  SECURITY: model output is untrusted. Every link (markdown links AND       */
/*  source URLs) goes through safeHref(): only http, https and mailto (and     */
/*  same-site relative paths) are ever rendered as links. javascript:, data:,  */
/*  vbscript:, file:, blob:, obfuscated variants (java\tscript:) and URLs with */
/*  embedded credentials are blocked and shown as plain text.                  */
/* -------------------------------------------------------------------------- */

/* ========================================================================== */
/*  Security                                                                  */
/* ========================================================================== */

const ALLOWED_PROTOCOLS = ["http:", "https:", "mailto:"];
const RELATIVE_BASE = "https://relative.invalid";

/**
 * Returns a safe href, or null if the URL must not become a link.
 * Uses the same URL parser the browser uses, so obfuscation tricks
 * (case, tabs/newlines, leading spaces, backslashes) can't slip through.
 */
export function safeHref(raw: string | null | undefined, allowed: string[] = ALLOWED_PROTOCOLS): string | null {
  if (!raw) return null;
  const value = raw.trim();
  // eslint-disable-next-line no-control-regex
  if (!value || /[\u0000-\u001f\u007f]/.test(value)) return null;

  let url: URL;
  try {
    url = new URL(value, RELATIVE_BASE);
  } catch {
    return null;
  }

  // Relative reference: "/docs", "./x", "#section", "?q=1"
  if (url.origin === RELATIVE_BASE) return value;

  if (!allowed.includes(url.protocol)) return null;
  if (url.username || url.password) return null; // https://trusted.com@evil.com tricks
  return url.href; // normalized, never the raw string
}

function hostOf(href: string): string {
  try {
    const u = new URL(href, RELATIVE_BASE);
    if (u.origin === RELATIVE_BASE) return "";
    if (u.protocol === "mailto:") return "email";
    return u.hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

const isExternal = (href: string) => {
  try {
    return new URL(href, RELATIVE_BASE).origin !== RELATIVE_BASE;
  } catch {
    return false;
  }
};

const safeColor = (c?: string) =>
  c && /^(#[0-9a-f]{3,8}|(rgb|hsl|oklch)a?\([0-9.,%\s/a-z-]+\)|[a-z]{3,20})$/i.test(c.trim()) ? c.trim() : undefined;

/* ========================================================================== */
/*  Types + context                                                           */
/* ========================================================================== */

export type AIResponseStatus = "idle" | "generating" | "streaming" | "complete" | "error" | "cancelled";

export interface AIResponseSource {
  id: string | number;
  title: string;
  url?: string;
  snippet?: string;
  sourceType?: "doc" | "github" | "web" | "api" | string;
}

export interface AIResponseContextValue {
  content: string;
  status: AIResponseStatus;
  modelName?: string;
  sources: AIResponseSource[];
  copied: boolean;
  copyContent: () => void;
  onRegenerate?: () => void;
  onFeedback?: (type: "like" | "dislike") => void;
  feedback?: "like" | "dislike" | null;
  accentColor?: string;
}

const AIResponseContext = createContext<AIResponseContextValue | null>(null);

export function useAIResponseContext() {
  const ctx = useContext(AIResponseContext);
  if (!ctx) throw new Error("AIResponse compound components must be used within <AIResponse>");
  return ctx;
}

/* ========================================================================== */
/*  Small utilities                                                           */
/* ========================================================================== */

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const SPRING = { type: "spring", duration: 0.4, bounce: 0 } as const;
const cx = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(" ");

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.readOnly = true;
    ta.setAttribute("aria-hidden", "true");
    Object.assign(ta.style, { position: "fixed", left: "-9999px", top: "0" });
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

function useCopy() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = useCallback(async (text: string) => {
    if (await copyText(text)) {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    }
  }, []);
  return { copied, copy };
}

/* ---------------------------------- Icons ---------------------------------- */

const PATHS = {
  copy: "M9 9h10v10H9zM5 15V5h10",
  check: "M5 12.5l4.5 4.5L19 7.5",
  retry: "M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5",
  up: "M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
  external: "M7 17 17 7M8 7h9v9",
  chevron: "m6 9 6 6 6-6",
  tool: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4Z",
  alert: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 8v5M12 16.5v.01",
};

function Ico({ d, className = "h-3.5 w-3.5", sw = 1.7 }: { d: string; className?: string; sw?: number }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

/* ---------------------------------- Styles --------------------------------- */

const muted = "text-neutral-500 dark:text-neutral-500";
const hair = "ring-1 ring-black/[0.07] dark:ring-white/[0.07]";
const wash = "bg-black/[0.025] dark:bg-white/[0.03]";
const focus = "outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/70 dark:focus-visible:ring-white/40";
const iconBtn = `grid h-8 min-w-8 place-items-center rounded-lg text-neutral-500 transition-[color,background-color,transform] duration-150 active:scale-[0.94] [-webkit-tap-highlight-color:transparent] max-sm:h-10 max-sm:min-w-10 [@media(hover:hover)]:hover:bg-black/[0.05] [@media(hover:hover)]:hover:text-neutral-900 dark:[@media(hover:hover)]:hover:bg-white/[0.06] dark:[@media(hover:hover)]:hover:text-neutral-100 ${focus}`;

/* ========================================================================== */
/*  Markdown (small, streaming-friendly, never touches innerHTML)             */
/* ========================================================================== */

type Block =
  | { type: "heading"; level: 1 | 2 | 3 | 4; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; lang: string; code: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "hr" };

const RE = {
  fence: /^\s*```(.*)$/,
  heading: /^(#{1,4})\s+(.*)$/,
  ul: /^\s*[-*+]\s+(.*)$/,
  ol: /^\s*\d+[.)]\s+(.*)$/,
  quote: /^\s*>\s?(.*)$/,
  hr: /^\s*([-*_])(\s*\1){2,}\s*$/,
  tableDiv: /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/,
};

const splitRow = (l: string) =>
  l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((s) => s.trim());

function parseMarkdown(raw: string): Block[] {
  const lines = raw.replace(/\r\n?/g, "\n").split("\n");
  const out: Block[] = [];
  let i = 0;

  const startsBlock = (idx: number) => {
    const l = lines[idx];
    return (
      RE.fence.test(l) || RE.heading.test(l) || RE.hr.test(l) || RE.ul.test(l) || RE.ol.test(l) || RE.quote.test(l) ||
      (l.includes("|") && idx + 1 < lines.length && RE.tableDiv.test(lines[idx + 1]))
    );
  };

  while (i < lines.length) {
    const line = lines[i];

    const fence = line.match(RE.fence);
    if (fence) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !RE.fence.test(lines[i])) code.push(lines[i++]);
      i++; // closing fence (may be missing while streaming)
      out.push({ type: "code", lang: fence[1].trim() || "text", code: code.join("\n") });
      continue;
    }

    if (line.includes("|") && i + 1 < lines.length && RE.tableDiv.test(lines[i + 1])) {
      const headers = splitRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim()) rows.push(splitRow(lines[i++]));
      out.push({ type: "table", headers, rows });
      continue;
    }

    const h = line.match(RE.heading);
    if (h) {
      out.push({ type: "heading", level: h[1].length as 1 | 2 | 3 | 4, text: h[2] });
      i++;
      continue;
    }

    if (RE.hr.test(line)) {
      out.push({ type: "hr" });
      i++;
      continue;
    }

    if (RE.quote.test(line)) {
      const q: string[] = [];
      while (i < lines.length && RE.quote.test(lines[i])) q.push(lines[i++].match(RE.quote)![1]);
      out.push({ type: "quote", text: q.join(" ") });
      continue;
    }

    const isUl = RE.ul.test(line);
    if (isUl || RE.ol.test(line)) {
      const re = isUl ? RE.ul : RE.ol;
      const items: string[] = [];
      while (i < lines.length && re.test(lines[i])) items.push(lines[i++].match(re)![1]);
      out.push({ type: "list", ordered: !isUl, items });
      continue;
    }

    if (!line.trim()) {
      i++;
      continue;
    }

    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !(para.length && startsBlock(i))) para.push(lines[i++]);
    out.push({ type: "paragraph", text: para.join(" ") });
  }
  return out;
}

const INLINE = /(`[^`\n]+`|\*\*[^*\n]+\*\*|\*[^*\s][^*\n]*\*|\[[^\]\n]+\]\([^)\s]+(?:\s+"[^"]*")?\))/g;

function Link({ href, children }: { href: string | undefined; children: React.ReactNode }) {
  const safe = safeHref(href);
  if (!safe) {
    // Unsafe or unparseable → plain text, never a link
    return (
      <span className="underline decoration-dotted decoration-neutral-400 underline-offset-4" title="Link blocked for your safety">
        {children}
      </span>
    );
  }
  const external = isExternal(safe);
  const host = hostOf(safe);
  return (
    <a
      href={safe}
      title={host ? `${host} — ${safe}` : safe}
      {...(external ? { target: "_blank", rel: "noopener noreferrer nofollow ugc", referrerPolicy: "no-referrer" as const } : {})}
      className={`inline-flex items-baseline gap-0.5 break-words font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-[3px] transition-[text-decoration-color] duration-150 dark:text-neutral-100 dark:decoration-neutral-600 [@media(hover:hover)]:hover:decoration-current ${focus} rounded-sm`}
    >
      {children}
      {external && <Ico d={PATHS.external} className="h-[0.7em] w-[0.7em] translate-y-[0.05em] self-center text-neutral-400" sw={2} />}
    </a>
  );
}

function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  // A fresh regex per call: renderInline recurses, and a shared /g regex would
  // have its lastIndex clobbered by the nested call (infinite loop).
  const re = new RegExp(INLINE.source, "g");
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const t = m[0];
    const k = m.index;
    if (t.startsWith("`")) {
      nodes.push(
        <code key={k} className={`rounded-md px-1.5 py-0.5 font-mono text-[0.86em] text-neutral-900 dark:text-neutral-100 ${wash} ${hair}`}>
          {t.slice(1, -1)}
        </code>,
      );
    } else if (t.startsWith("**")) {
      nodes.push(<strong key={k} className="font-semibold text-neutral-950 dark:text-white">{renderInline(t.slice(2, -2))}</strong>);
    } else if (t.startsWith("*")) {
      nodes.push(<em key={k}>{renderInline(t.slice(1, -1))}</em>);
    } else {
      const parts = t.match(/^\[([^\]]+)\]\(([^)\s]+)/);
      if (parts) nodes.push(<Link key={k} href={parts[2]}>{renderInline(parts[1])}</Link>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function Caret() {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className="ml-[3px] inline-block h-[1.05em] w-[2px] translate-y-[0.2em] rounded-full bg-current"
      animate={reduce ? { opacity: 0.7 } : { opacity: [1, 0.15, 1] }}
      transition={reduce ? undefined : { repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
    />
  );
}

/* ========================================================================== */
/*  CodeBlock                                                                 */
/* ========================================================================== */

export interface CodeBlockProps {
  language?: string;
  code: string;
  filename?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language = "text", code, filename, className }) => {
  const { copied, copy } = useCopy();
  return (
    <figure className={cx("my-4 overflow-hidden rounded-xl", wash, hair, className)}>
      <figcaption className="flex h-9 items-center justify-between pl-3.5 pr-1.5">
        <span className={`truncate font-mono text-[11px] ${muted}`}>{filename || language}</span>
        <button
          type="button"
          onClick={() => copy(code)}
          aria-label={copied ? "Code copied" : "Copy code"}
          className={`inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-[11.5px] text-neutral-500 transition-colors duration-150 [@media(hover:hover)]:hover:text-neutral-900 dark:[@media(hover:hover)]:hover:text-neutral-100 ${focus}`}
        >
          <Ico d={copied ? PATHS.check : PATHS.copy} className={cx("h-3 w-3", copied && "text-emerald-500")} sw={copied ? 2.2 : 1.7} />
          <span className={copied ? "text-emerald-500" : ""}>{copied ? "Copied" : "Copy"}</span>
        </button>
      </figcaption>
      <pre
        tabIndex={0}
        aria-label={`${filename || language} code`}
        className="overflow-x-auto px-3.5 pb-3.5 pt-0.5 font-mono text-[12.5px] leading-[1.7] text-neutral-800 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-400/60 dark:text-neutral-200"
      >
        <code>{code}</code>
      </pre>
    </figure>
  );
};

/* ========================================================================== */
/*  Header                                                                    */
/* ========================================================================== */

export interface AIResponseHeaderProps {
  title?: string;
  modelBadge?: string;
  timestamp?: string;
  icon?: React.ReactNode;
  className?: string;
}

function Orb({ active, accent }: { active: boolean; accent?: string }) {
  const reduce = useReducedMotion();
  const bg = accent
    ? `conic-gradient(from 200deg, ${accent}, color-mix(in srgb, ${accent} 30%, white), ${accent})`
    : "conic-gradient(from 200deg, #c7d2fe, #fbcfe8, #fde68a, #a7f3d0, #c7d2fe)";
  return (
    <motion.span
      aria-hidden
      className="relative block h-[18px] w-[18px] shrink-0 rounded-full"
      style={{ background: bg, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.45), 0 1px 4px rgba(120,120,160,0.35)" }}
      animate={active && !reduce ? { rotate: 360 } : { rotate: 0 }}
      transition={active && !reduce ? { repeat: Infinity, duration: 7, ease: "linear" } : { duration: 0.3 }}
    />
  );
}

const Shimmer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="bg-clip-text text-transparent"
      style={{
        backgroundImage: "linear-gradient(90deg, rgb(115 115 115) 35%, rgb(212 212 212) 50%, rgb(115 115 115) 65%)",
        backgroundSize: "250% 100%",
      }}
      animate={reduce ? undefined : { backgroundPosition: ["120% 0", "-120% 0"] }}
      transition={reduce ? undefined : { repeat: Infinity, duration: 1.8, ease: "linear" }}
    >
      {children}
    </motion.span>
  );
};

export const AIResponseHeader: React.FC<AIResponseHeaderProps> = ({
  title = "Assistant",
  modelBadge,
  timestamp,
  icon,
  className,
}) => {
  const { status, modelName, accentColor } = useAIResponseContext();
  const badge = modelBadge || modelName;
  const busy = status === "streaming" || status === "generating";

  return (
    <header className={cx("flex items-center justify-between gap-3", className)}>
      <div className="flex min-w-0 items-center gap-2.5">
        {icon ?? <Orb active={busy} accent={accentColor} />}
        <span className="truncate text-[13px] font-medium tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">{title}</span>
        {badge && <span className={`truncate text-[12px] ${muted}`}>{badge}</span>}
      </div>

      <div className={`flex shrink-0 items-center gap-3 text-[12px] ${muted}`} role="status" aria-live="polite">
        {status === "streaming" && (
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" aria-hidden />
            Streaming
          </span>
        )}
        {status === "generating" && <Shimmer>Thinking</Shimmer>}
        {status === "cancelled" && <span>Stopped</span>}
        {timestamp && <span className="hidden tabular-nums sm:inline">{timestamp}</span>}
      </div>
    </header>
  );
};

/* ========================================================================== */
/*  Content                                                                   */
/* ========================================================================== */

export interface AIResponseContentProps {
  className?: string;
}

export const AIResponseContent: React.FC<AIResponseContentProps> = ({ className }) => {
  const { content, status, onRegenerate } = useAIResponseContext();
  const reduce = useReducedMotion();
  const blocks = useMemo(() => parseMarkdown(content), [content]);
  const streaming = status === "streaming";

  if (status === "generating" && !content) {
    return (
      <div className="space-y-2.5 py-5" role="status" aria-label="Generating response">
        {["w-3/4", "w-11/12", "w-1/2"].map((w, i) => (
          <motion.div
            key={i}
            className={`h-2.5 rounded-full bg-black/[0.06] dark:bg-white/[0.07] ${w}`}
            animate={reduce ? undefined : { opacity: [0.5, 1, 0.5] }}
            transition={reduce ? undefined : { repeat: Infinity, duration: 1.6, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div role="alert" className={`my-5 flex items-start gap-3 rounded-xl bg-rose-500/[0.06] p-4 ring-1 ring-rose-500/20`}>
        <Ico d={PATHS.alert} className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
        <div className="min-w-0 flex-1 text-[13px] leading-relaxed">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">Couldn’t finish this response</p>
          <p className={`mt-0.5 break-words ${muted}`}>{content || "The connection dropped or the model timed out."}</p>
          {onRegenerate && (
            <button type="button" onClick={onRegenerate} className={`mt-2 rounded-md text-[12.5px] font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 dark:text-neutral-100 ${focus}`}>
              Try again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!content) {
    return <p className={`py-8 text-center text-[13px] ${muted}`}>Ready when you are.</p>;
  }

  const lastIdx = blocks.length - 1;
  const caretAt = (idx: number) => streaming && idx === lastIdx;
  const enter = streaming && !reduce ? { opacity: 0, y: 5 } : false;

  return (
    <div
      aria-live={streaming ? "polite" : "off"}
      aria-busy={streaming}
      className={cx("space-y-4 py-5 text-[14.5px] leading-[1.7] tracking-[-0.003em] text-neutral-700 dark:text-neutral-300", className)}
    >
      {blocks.map((b, idx) => {
        const key = `${idx}-${b.type}`;
        const caret = caretAt(idx) ? <Caret /> : null;
        const wrap = (node: React.ReactNode) => (
          <motion.div key={key} initial={enter} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, ease: EASE_OUT }}>
            {node}
          </motion.div>
        );

        switch (b.type) {
          case "heading": {
            const size = { 1: "text-[19px]", 2: "text-[16.5px]", 3: "text-[15px]", 4: "text-[14.5px]" }[b.level];
            return wrap(
              <h3 className={`${size} pt-2 font-semibold leading-snug tracking-[-0.02em] text-neutral-950 dark:text-white`}>
                {renderInline(b.text)}
                {caret}
              </h3>,
            );
          }
          case "paragraph":
            return wrap(<p className="break-words">{renderInline(b.text)}{caret}</p>);
          case "code":
            return wrap(<CodeBlock language={b.lang} code={b.code} />);
          case "list": {
            const Tag = b.ordered ? "ol" : "ul";
            return wrap(
              <Tag className={cx("space-y-1.5 pl-5 marker:text-neutral-400", b.ordered ? "list-decimal marker:tabular-nums" : "list-disc")}>
                {b.items.map((it, j) => (
                  <li key={j} className="break-words pl-1">
                    {renderInline(it)}
                    {caret && j === b.items.length - 1 ? caret : null}
                  </li>
                ))}
              </Tag>,
            );
          }
          case "quote":
            return wrap(
              <blockquote className="border-l-2 border-black/10 pl-4 text-neutral-500 dark:border-white/15">
                {renderInline(b.text)}
                {caret}
              </blockquote>,
            );
          case "hr":
            return wrap(<hr className="border-black/[0.08] dark:border-white/[0.08]" />);
          case "table":
            return wrap(
              <div className={`overflow-x-auto rounded-xl ${hair}`}>
                <table className="w-full min-w-[320px] border-collapse text-left text-[13px]">
                  <thead>
                    <tr className={`${wash} text-[11.5px] font-medium ${muted}`}>
                      {b.headers.map((h, j) => (
                        <th key={j} scope="col" className="px-3.5 py-2.5 font-medium">{renderInline(h)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
                    {b.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) => (
                          <td key={c} className="px-3.5 py-2.5 text-neutral-700 dark:text-neutral-300">{renderInline(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>,
            );
        }
      })}
      {streaming && blocks[lastIdx]?.type !== undefined && ["code", "table", "hr"].includes(blocks[lastIdx].type) && <Caret />}
    </div>
  );
};

/* ========================================================================== */
/*  Sources                                                                   */
/* ========================================================================== */

export interface AIResponseSourcesProps {
  sources?: AIResponseSource[];
  title?: string;
  defaultExpanded?: boolean;
  className?: string;
}

export const AIResponseSources: React.FC<AIResponseSourcesProps> = ({
  sources: propSources,
  title = "Sources",
  defaultExpanded = false,
  className,
}) => {
  const { sources: ctx } = useAIResponseContext();
  const sources = propSources ?? ctx;
  const [open, setOpen] = useState(defaultExpanded);
  if (!sources?.length) return null;

  return (
    <div className={cx("pt-2", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`inline-flex h-8 items-center gap-1.5 rounded-lg pr-2 text-[12.5px] text-neutral-500 transition-colors duration-150 [@media(hover:hover)]:hover:text-neutral-900 dark:[@media(hover:hover)]:hover:text-neutral-100 ${focus}`}
      >
        <Ico d={PATHS.chevron} className={cx("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")} />
        {title}
        <span className="tabular-nums text-neutral-400">{sources.length}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={SPRING}
            className="overflow-hidden"
          >
            {sources.map((s, i) => {
              const href = safeHref(s.url);
              const host = href ? hostOf(href) : "";
              const inner = (
                <>
                  <span className="mt-px w-4 shrink-0 text-right text-[11.5px] tabular-nums text-neutral-400">{i + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-2">
                      <span className="truncate text-[13px] font-medium text-neutral-900 dark:text-neutral-100">{s.title}</span>
                      {host && <span className="shrink-0 text-[11.5px] text-neutral-400">{host}</span>}
                    </span>
                    {s.snippet && <span className={`mt-0.5 line-clamp-1 block text-[12px] ${muted}`}>{s.snippet}</span>}
                  </span>
                  {href && isExternal(href) && <Ico d={PATHS.external} className="mt-0.5 h-3 w-3 shrink-0 text-neutral-400" />}
                </>
              );
              const row = "flex items-start gap-3 rounded-xl px-2.5 py-2";
              return (
                <li key={s.id ?? i}>
                  {href ? (
                    <a
                      href={href}
                      title={href}
                      {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer nofollow ugc", referrerPolicy: "no-referrer" as const } : {})}
                      className={`${row} transition-colors duration-150 [@media(hover:hover)]:hover:bg-black/[0.035] dark:[@media(hover:hover)]:hover:bg-white/[0.04] ${focus}`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={row} title={s.url ? "Link blocked for your safety" : undefined}>
                      {inner}
                    </div>
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ========================================================================== */
/*  Tools summary                                                             */
/* ========================================================================== */

export interface AIResponseToolsSummaryProps {
  toolCount: number;
  tools?: Array<{ name: string; status?: "success" | "running" | "error"; duration?: string }>;
  onToggleDetails?: () => void;
  className?: string;
}

const DOT = { success: "bg-emerald-500", running: "animate-pulse bg-amber-400", error: "bg-rose-500" } as const;

export const AIResponseToolsSummary: React.FC<AIResponseToolsSummaryProps> = ({
  toolCount,
  tools = [],
  onToggleDetails,
  className,
}) => {
  const [open, setOpen] = useState(false);
  if (toolCount <= 0) return null;

  return (
    <div className={cx("pt-1", className)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => {
          setOpen((v) => !v);
          onToggleDetails?.();
        }}
        className={`inline-flex h-8 items-center gap-2 rounded-full bg-black/[0.03] pl-3 pr-2.5 text-[12.5px] text-neutral-500 ${hair} transition-[color,background-color,transform] duration-150 active:scale-[0.98] dark:bg-white/[0.03] [@media(hover:hover)]:hover:text-neutral-900 dark:[@media(hover:hover)]:hover:text-neutral-100 ${focus}`}
      >
        <Ico d={PATHS.tool} className="h-3 w-3" />
        Used {toolCount} {toolCount === 1 ? "tool" : "tools"}
        <Ico d={PATHS.chevron} className={cx("h-3 w-3 transition-transform duration-200", open && "rotate-180")} />
      </button>

      <AnimatePresence initial={false}>
        {open && tools.length > 0 && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={SPRING}
            className="overflow-hidden"
          >
            {tools.map((t, i) => (
              <li key={i} className="flex items-center justify-between gap-3 px-1 py-1.5 text-[12.5px]">
                <span className="flex min-w-0 items-center gap-2.5">
                  <span className={cx("h-1.5 w-1.5 shrink-0 rounded-full", DOT[t.status ?? "success"])} aria-hidden />
                  <span className="truncate font-mono text-neutral-700 dark:text-neutral-300">{t.name}</span>
                  <span className="sr-only">{t.status ?? "success"}</span>
                </span>
                {t.duration && <span className="shrink-0 tabular-nums text-neutral-400">{t.duration}</span>}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ========================================================================== */
/*  Actions                                                                   */
/* ========================================================================== */

export interface AIResponseActionsProps {
  className?: string;
}

export const AIResponseActions: React.FC<AIResponseActionsProps> = ({ className }) => {
  const { copied, copyContent, onRegenerate, onFeedback, feedback, status } = useAIResponseContext();
  const busy = status === "streaming" || status === "generating";

  return (
    <div className={cx("-ml-2 flex items-center gap-0.5 pt-3", className)}>
      <button type="button" onClick={copyContent} className={iconBtn} aria-label={copied ? "Response copied" : "Copy response"} title="Copy">
        <Ico d={copied ? PATHS.check : PATHS.copy} className={cx("h-[15px] w-[15px]", copied && "text-emerald-500")} sw={copied ? 2.2 : 1.7} />
      </button>

      {onRegenerate && (
        <button type="button" onClick={onRegenerate} disabled={busy} className={`${iconBtn} disabled:pointer-events-none disabled:opacity-30`} aria-label="Regenerate response" title="Regenerate">
          <Ico d={PATHS.retry} className={cx("h-[15px] w-[15px]", busy && "animate-spin")} />
        </button>
      )}

      <span className="mx-1 h-4 w-px bg-black/[0.08] dark:bg-white/[0.08]" aria-hidden />

      <button
        type="button"
        onClick={() => onFeedback?.("like")}
        aria-pressed={feedback === "like"}
        aria-label="Good response"
        title="Good response"
        className={cx(iconBtn, feedback === "like" && "bg-black/[0.05] !text-neutral-900 dark:bg-white/[0.07] dark:!text-white")}
      >
        <Ico d={PATHS.up} className="h-[15px] w-[15px]" />
      </button>
      <button
        type="button"
        onClick={() => onFeedback?.("dislike")}
        aria-pressed={feedback === "dislike"}
        aria-label="Poor response"
        title="Poor response"
        className={cx(iconBtn, feedback === "dislike" && "bg-black/[0.05] !text-neutral-900 dark:bg-white/[0.07] dark:!text-white")}
      >
        <Ico d={PATHS.up} className="h-[15px] w-[15px] rotate-180" />
      </button>
    </div>
  );
};

/* ========================================================================== */
/*  Root                                                                      */
/* ========================================================================== */

export interface AIResponseProps {
  /** Markdown text. Safe to stream into: unfinished code fences and lists render fine */
  content?: string;
  status?: AIResponseStatus;
  modelName?: string;
  sources?: AIResponseSource[];
  /** Any CSS color (validated). Tints the orb */
  accentColor?: string;
  onRegenerate?: () => void;
  onFeedback?: (type: "like" | "dislike") => void;
  className?: string;
  /** Custom composition using the compound parts. Defaults to header + content + sources + actions */
  children?: React.ReactNode;
}

export const AIResponse: React.FC<AIResponseProps> = ({
  content = "",
  status = "complete",
  modelName = "EasyAI 2.0",
  sources = [],
  accentColor,
  onRegenerate,
  onFeedback,
  className,
  children,
}) => {
  const { copied, copy } = useCopy();
  const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null);

  const value: AIResponseContextValue = {
    content,
    status,
    modelName,
    sources,
    copied,
    copyContent: () => void copy(content),
    onRegenerate,
    onFeedback: (type) => {
      setFeedback((prev) => (prev === type ? null : type));
      onFeedback?.(type);
    },
    feedback,
    accentColor: safeColor(accentColor),
  };

  return (
    <AIResponseContext.Provider value={value}>
      <article
        aria-label="AI response"
        aria-busy={status === "streaming" || status === "generating"}
        className={cx(
          "w-full rounded-[20px] bg-white p-4 text-neutral-700 antialiased dark:bg-[#0b0b0c] dark:text-neutral-300 sm:p-6",
          hair,
          className,
        )}
        style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 24px 48px -32px rgba(0,0,0,0.18)" }}
      >
        {children ?? (
          <>
            <AIResponseHeader />
            <AIResponseContent />
            {sources.length > 0 && <AIResponseSources />}
            <AIResponseActions />
          </>
        )}
      </article>
    </AIResponseContext.Provider>
  );
};

export default AIResponse;

/* ========================================================================== */
/*  Demo — streams a reply, includes a malicious link to show it's blocked    */
/* ========================================================================== */

const DEMO = `## Shipping a safer UI

Model output is **untrusted input**, so every link is checked before it renders. Here are three links in the same sentence: [a normal one](https://easyui.site/docs), [a script link](javascript:alert(document.cookie)) and [an obfuscated one](java\tscript:alert(1)).

- Only \`http\`, \`https\` and \`mailto\` become links
- Credentials like \`https://good.com@evil.com\` are rejected
- External links open with \`noopener noreferrer nofollow\`

\`\`\`ts
import { safeHref } from "./ai-response";

safeHref("javascript:alert(1)"); // null
safeHref("https://easyui.site"); // "https://easyui.site/"
\`\`\`

| Scheme | Allowed |
| --- | --- |
| https | Yes |
| javascript | No |
| data | No |

> Treat every URL from a model like a URL from a stranger.`;

export function AIResponseDemo() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<AIResponseStatus>("generating");
  const run = useRef(0);

  const start = useCallback(() => {
    const id = ++run.current;
    setText("");
    setStatus("generating");
    setTimeout(() => {
      if (id !== run.current) return;
      setStatus("streaming");
      let i = 0;
      const tick = () => {
        if (id !== run.current) return;
        i = Math.min(DEMO.length, i + 3);
        setText(DEMO.slice(0, i));
        if (i < DEMO.length) setTimeout(tick, 16);
        else setStatus("complete");
      };
      tick();
    }, 900);
  }, []);

  useEffect(() => {
    start();
    return () => {
      run.current++;
    };
  }, [start]);

  return (
    <div className="flex min-h-dvh items-start justify-center bg-neutral-100 p-4 dark:bg-black sm:p-10">
      <div className="w-full max-w-2xl">
        <AIResponse
          content={text}
          status={status}
          onRegenerate={start}
          sources={[
            { id: 1, title: "EasyUI documentation", url: "https://easyui.site/docs", snippet: "Components, tokens and registry" },
            { id: 2, title: "Blocked example", url: "javascript:alert(1)", snippet: "This link never renders as a link" },
          ]}
        />
      </div>
    </div>
  );
}