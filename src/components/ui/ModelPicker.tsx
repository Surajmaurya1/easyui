"use client";

import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useDragControls,
  useReducedMotion,
} from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  ModelPicker — choose an AI model.                                          */
/*                                                                             */
/*  • Phones: a bottom sheet (drag the handle to dismiss, safe-area aware)     */
/*  • Desktop: a popover that flips up/down and stays inside the viewport      */
/*  • Search (auto when there are many), provider groups, tags, speed and      */
/*    intelligence dots, "locked" models with a reason                         */
/*  • A highlight that glides between rows as you arrow or hover               */
/*  • Full keyboard: ↑ ↓ Home End Enter Esc · type to filter · focus returns   */
/*                                                                             */
/*  One file · deps: react 19, react-dom, framer-motion, tailwindcss.          */
/*  Light + dark · 16px inputs on phones (no iOS zoom) · reduced-motion aware. */
/* -------------------------------------------------------------------------- */

/* ========================================================================== */
/*  Types                                                                     */
/* ========================================================================== */

export interface AIModel {
  id: string;
  name: string;
  /** Used for grouping and the colored mark, e.g. "Nova" */
  provider?: string;
  description?: string;
  /** Small pills, e.g. ["Fast", "Vision", "New"]. The first two are shown */
  tags?: string[];
  /** e.g. "200K context" */
  context?: string;
  /** 1–5, shown as dots */
  speed?: 1 | 2 | 3 | 4 | 5;
  /** 1–5, shown as dots */
  intelligence?: 1 | 2 | 3 | 4 | 5;
  disabled?: boolean;
  /** Shown on a locked model, e.g. "Pro" or "Upgrade" */
  disabledReason?: string;
  /** Replaces the colored provider mark */
  icon?: ReactNode;
}

export interface ModelPickerProps {
  models: AIModel[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string, model: AIModel) => void;
  /** pill: compact chip (for a chat composer) · field: full-width, like a select */
  variant?: "pill" | "field";
  /** Small label above the field variant and the title of the sheet / popover */
  label?: string;
  placeholder?: string;
  /** "auto" shows search when there are more than 6 models */
  searchable?: boolean | "auto";
  /** Shown at the bottom of the list, e.g. a "Compare models" link */
  footer?: ReactNode;
  disabled?: boolean;
  className?: string;
}

/* ========================================================================== */
/*  Helpers                                                                   */
/* ========================================================================== */

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const cx = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(" ");
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

const MARKS = ["#6d7cff", "#34d1bf", "#ffb44c", "#ff6b8b", "#a78bfa", "#5ac8fa"];
const markColor = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return MARKS[h % MARKS.length];
};

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/70 dark:focus-visible:ring-white/40";

type ModelBrand = "claude" | "gemini" | "openai";

/*
 * Monochrome brand marks from Lobe Icons: https://github.com/lobehub/lobe-icons
 * Copyright (c) 2023 LobeHub — MIT License.
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const MODEL_BRAND_PATHS: Record<ModelBrand, string> = {
  claude: "M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z",
  gemini: "M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z",
  openai: "M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z",
};

function ModelBrandGlyph({ brand }: { brand: ModelBrand }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
      <path d={MODEL_BRAND_PATHS[brand]} />
    </svg>
  );
}

function useMedia(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

function Ico({ d, className = "h-4 w-4", sw = 1.8 }: { d: string; className?: string; sw?: number }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}
const P = {
  chevron: "m6 9 6 6 6-6",
  check: "M5 12.5l4.5 4.5L19 7.5",
  search: "M16 16l4 4M10.5 17a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Z",
  x: "M6 6l12 12M18 6 6 18",
  lock: "M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6Z",
};

function Mark({ model, size = 32 }: { model: AIModel; size?: number }) {
  const c = markColor(model.provider ?? model.name);
  return (
    <span
      aria-hidden
      className="grid shrink-0 place-items-center overflow-hidden font-semibold text-neutral-900 dark:text-neutral-100"
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.32,
        fontSize: size * 0.42,
        background: model.icon ? "transparent" : `linear-gradient(145deg, color-mix(in oklch, ${c}, white 18%), ${c})`,
        boxShadow: model.icon ? undefined : "inset 0 1px 0 rgba(255,255,255,0.3)",
      }}
    >
      {model.icon ?? <span className="text-white">{(model.provider ?? model.name).slice(0, 1).toUpperCase()}</span>}
    </span>
  );
}

function RatingBlocks({ value, label }: { value: number; label: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${label} ${value} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={cx("h-1.5 w-1 rounded-[1px]", i <= value ? "bg-neutral-700 dark:bg-neutral-200" : "bg-black/[0.12] dark:bg-white/[0.16]")} />
      ))}
    </span>
  );
}

/* ========================================================================== */
/*  Panel (shared by the popover and the sheet)                               */
/* ========================================================================== */

interface PanelProps {
  uid: string;
  title: string;
  groups: { name: string | null; items: AIModel[] }[];
  total: number;
  selectedId?: string;
  activeId: string | null;
  searchable: boolean;
  query: string;
  setQuery: (q: string) => void;
  setActive: (id: string) => void;
  onPick: (m: AIModel) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  footer?: ReactNode;
  listRef: React.RefObject<HTMLDivElement | null>;
  searchRef: React.RefObject<HTMLInputElement | null>;
}

function Panel(p: PanelProps) {
  const reduce = useReducedMotion();
  const listId = `${p.uid}-list`;

  return (
    <div onKeyDown={p.onKeyDown} className="flex min-h-0 flex-1 flex-col">
      {p.searchable && (
        <div className="px-3 pb-2 pt-1 sm:pt-3">
          <label className="relative flex items-center">
            <Ico d={P.search} className="pointer-events-none absolute left-3 h-4 w-4 text-neutral-400" />
            <input
              ref={p.searchRef}
              role="combobox"
              aria-expanded
              aria-controls={listId}
              aria-activedescendant={p.activeId ? `${p.uid}-opt-${p.activeId}` : undefined}
              aria-autocomplete="list"
              aria-label="Search models"
              value={p.query}
              onChange={(e) => p.setQuery(e.target.value)}
              placeholder="Search models"
              enterKeyHint="go"
              autoComplete="off"
              spellCheck={false}
              className="h-11 w-full rounded-xl bg-black/[0.04] pl-9 pr-9 text-[16px] text-neutral-900 outline-none transition-shadow placeholder:text-neutral-400 focus:ring-2 focus:ring-neutral-400/50 dark:bg-white/[0.06] dark:text-neutral-100 dark:focus:ring-white/25 sm:h-10 sm:text-[14px]"
            />
            {p.query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  p.setQuery("");
                  p.searchRef.current?.focus();
                }}
                className={`absolute right-1.5 grid h-8 w-8 place-items-center rounded-lg text-neutral-400 [@media(hover:hover)]:hover:text-neutral-700 dark:[@media(hover:hover)]:hover:text-neutral-200 ${focusRing}`}
              >
                <Ico d={P.x} className="h-3.5 w-3.5" sw={2} />
              </button>
            )}
          </label>
        </div>
      )}

      <LayoutGroup id={p.uid}>
        <motion.div
          layoutScroll
          ref={p.listRef}
          id={listId}
          role="listbox"
          aria-label={p.title}
          tabIndex={p.searchable ? -1 : 0}
          aria-activedescendant={!p.searchable && p.activeId ? `${p.uid}-opt-${p.activeId}` : undefined}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-1.5 pb-1.5 outline-none"
        >
          {p.total === 0 ? (
            <p className="px-4 py-10 text-center text-[13.5px] text-neutral-500">
              No models match “{p.query}”.
            </p>
          ) : (
            p.groups.map((g, gi) => (
              <div key={g.name ?? gi} role="group" aria-label={g.name ?? undefined}>
                {g.name && <p className="px-3 pb-1 pt-3 text-[11.5px] font-medium tracking-[0.01em] text-neutral-500">{g.name}</p>}
                {g.items.map((m) => {
                  const selected = m.id === p.selectedId;
                  const active = m.id === p.activeId && !m.disabled;
                  const tags = (m.tags ?? []).slice(0, 2);
                  return (
                    <div
                      key={m.id}
                      id={`${p.uid}-opt-${m.id}`}
                      role="option"
                      aria-selected={selected}
                      aria-disabled={m.disabled || undefined}
                      onPointerEnter={(e) => e.pointerType === "mouse" && !m.disabled && p.setActive(m.id)}
                      onClick={() => p.onPick(m)}
                      className={cx(
                        "relative flex min-h-[52px] items-start gap-2.5 rounded-lg px-2.5 py-2 [-webkit-tap-highlight-color:transparent]",
                        m.disabled ? "cursor-not-allowed opacity-55" : "cursor-pointer",
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="mp-highlight"
                          aria-hidden
                          className="absolute inset-0 rounded-lg bg-black/[0.05] dark:bg-white/[0.07]"
                          transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.3, bounce: 0.08 }}
                        />
                      )}
                      <span className="relative mt-0.5">
                        <Mark model={m} size={24} />
                      </span>

                      <span className="relative min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="text-[14px] font-medium leading-tight tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">{m.name}</span>
                          {tags.map((t) => (
                            <span key={t} className="rounded-full bg-black/[0.06] px-1.5 py-px text-[10.5px] font-medium leading-4 text-neutral-600 dark:bg-white/[0.09] dark:text-neutral-300">
                              {t}
                            </span>
                          ))}
                        </span>
                        {(m.context || m.speed || m.intelligence) && (
                          <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] leading-tight text-neutral-500">
                            {m.description && <span>{m.description}</span>}
                            {m.context && <span>{m.context}</span>}
                            {m.speed && (
                              <span className="inline-flex items-center gap-1">
                                Speed <RatingBlocks value={m.speed} label="Speed" />
                              </span>
                            )}
                            {m.intelligence && (
                              <span className="inline-flex items-center gap-1">
                                Intelligence <RatingBlocks value={m.intelligence} label="Intelligence" />
                              </span>
                            )}
                          </span>
                        )}
                        {m.description && !m.context && !m.speed && !m.intelligence && (
                          <span className="mt-1 block text-[10.5px] leading-tight text-neutral-500">{m.description}</span>
                        )}
                      </span>

                      <span className="relative mt-0.5 flex h-5 shrink-0 items-center">
                        {m.disabled ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-black/[0.06] px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:bg-white/[0.09] dark:text-neutral-300">
                            <Ico d={P.lock} className="h-3 w-3" sw={2} />
                            {m.disabledReason ?? "Locked"}
                          </span>
                        ) : (
                          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-neutral-900 dark:text-neutral-100" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <motion.path
                              d={P.check}
                              initial={false}
                              animate={{ pathLength: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
                              transition={{ duration: reduce ? 0 : 0.25, ease: EASE_OUT }}
                            />
                          </svg>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </motion.div>
      </LayoutGroup>

      {p.footer && <div className="border-t border-black/[0.06] px-3 py-2.5 text-[12.5px] text-neutral-500 dark:border-white/[0.08]">{p.footer}</div>}
    </div>
  );
}

/* ========================================================================== */
/*  ModelPicker                                                               */
/* ========================================================================== */

export function ModelPicker({
  models,
  value,
  defaultValue,
  onChange,
  variant = "pill",
  label = "Model",
  placeholder = "Choose a model",
  searchable = "auto",
  footer,
  disabled = false,
  className = "",
}: ModelPickerProps) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const desktop = useMedia("(min-width: 640px)");
  const drag = useDragControls();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const typed = useRef({ s: "", t: undefined as ReturnType<typeof setTimeout> | undefined });

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [inner, setInner] = useState(defaultValue ?? models.find((m) => !m.disabled)?.id);
  const selectedId = value ?? inner;
  const selected = models.find((m) => m.id === selectedId);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const [pos, setPos] = useState<{ left: number; width: number; maxH: number; top?: number; bottom?: number; ox: number; up: boolean } | null>(null);
  const [announce, setAnnounce] = useState("");

  const showSearch = searchable === "auto" ? models.length > 6 : searchable;

  /* ------------------------------ filter + group ------------------------------ */
  const { groups, flat } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? models.filter((m) => [m.name, m.provider, m.description, m.id, ...(m.tags ?? [])].some((s) => s?.toLowerCase().includes(q)))
      : models;
    const order: string[] = [];
    const map = new Map<string, AIModel[]>();
    for (const m of list) {
      const k = m.provider ?? "";
      if (!map.has(k)) {
        map.set(k, []);
        order.push(k);
      }
      map.get(k)!.push(m);
    }
    const hasProviders = order.some((k) => k);
    const groups = order.map((k) => ({ name: hasProviders ? k || "Other" : null, items: map.get(k)! }));
    return { groups, flat: groups.flatMap((g) => g.items) };
  }, [models, query]);

  /* --------------------------------- open / close --------------------------------- */
  const openPicker = () => {
    if (disabled) return;
    setQuery("");
    setActive(selected && !selected.disabled ? selected.id : models.find((m) => !m.disabled)?.id ?? null);
    setOpen(true);
  };
  const close = useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
  }, []);
  const pick = (m: AIModel) => {
    if (m.disabled) return;
    if (value === undefined) setInner(m.id);
    onChange?.(m.id, m);
    setAnnounce(`${m.name} selected`);
    close();
  };

  // when the filter changes, jump to the first match
  useEffect(() => {
    if (!open) return;
    if (!flat.some((m) => m.id === active && !m.disabled)) setActive(flat.find((m) => !m.disabled)?.id ?? null);
    if (query) setAnnounce(`${flat.length} ${flat.length === 1 ? "model" : "models"}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flat, open]);

  // keep the active row in view while arrowing
  useEffect(() => {
    if (!open || !active) return;
    document.getElementById(`${uid}-opt-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, open, uid]);

  // focus the search box (or the list) when it opens
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => (showSearch ? searchRef.current : listRef.current)?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(id);
  }, [open, showSearch, desktop]);

  /* --------------------------------- popover position --------------------------------- */
  useLayoutEffect(() => {
    if (!open || !desktop) return;
    const place = () => {
      const t = triggerRef.current?.getBoundingClientRect();
      if (!t) return;
      const vw = window.innerWidth, vh = window.innerHeight;
      const width = Math.min(380, vw - 16);
      const left = Math.max(8, Math.min(t.left, vw - 8 - width));
      const below = vh - t.bottom - 16;
      const above = t.top - 16;
      const want = 440;
      const up = below < Math.min(want, 300) && above > below;
      setPos({
        left,
        width,
        up,
        maxH: Math.max(220, Math.min(want, up ? above : below)),
        top: up ? undefined : t.bottom + 8,
        bottom: up ? vh - t.top + 8 : undefined,
        ox: clamp(t.left + t.width / 2 - left, 16, width - 16),
      });
    };
    place();
    let raf = 0;
    const onMove = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(place);
    };
    window.addEventListener("resize", onMove);
    window.addEventListener("scroll", onMove, true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onMove);
      window.removeEventListener("scroll", onMove, true);
    };
  }, [open, desktop]);

  /* ---------------------------- outside click, scroll lock ---------------------------- */
  useEffect(() => {
    if (!open || !desktop) return;
    const down = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!popRef.current?.contains(t) && !triggerRef.current?.contains(t)) close(false);
    };
    document.addEventListener("pointerdown", down);
    return () => document.removeEventListener("pointerdown", down);
  }, [open, desktop, close]);

  useEffect(() => {
    if (!open || desktop) return;
    const b = document.body;
    const prev = { o: b.style.overflow, p: b.style.paddingRight };
    const gap = window.innerWidth - document.documentElement.clientWidth;
    b.style.overflow = "hidden";
    if (gap > 0) b.style.paddingRight = `${gap}px`;
    return () => {
      b.style.overflow = prev.o;
      b.style.paddingRight = prev.p;
    };
  }, [open, desktop]);
  useEffect(() => () => clearTimeout(typed.current.t), []);

  /* --------------------------------- keyboard --------------------------------- */
  const move = (dir: 1 | -1 | "home" | "end") => {
    const enabled = flat.filter((m) => !m.disabled);
    if (!enabled.length) return;
    const i = enabled.findIndex((m) => m.id === active);
    const next = dir === "home" ? 0 : dir === "end" ? enabled.length - 1 : (i + dir + enabled.length) % enabled.length;
    setActive(enabled[next].id);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    switch (e.key) {
      case "ArrowDown":
        move(1);
        break;
      case "ArrowUp":
        move(-1);
        break;
      case "Home":
        if (showSearch && (e.target as HTMLElement).tagName === "INPUT") return; // let the caret move
        move("home");
        break;
      case "End":
        if (showSearch && (e.target as HTMLElement).tagName === "INPUT") return;
        move("end");
        break;
      case "Enter": {
        const m = flat.find((x) => x.id === active);
        if (m) pick(m);
        break;
      }
      case "Escape":
        close();
        break;
      case "Tab": {
        // keep focus inside while open
        const nodes = Array.from(popRef.current?.querySelectorAll<HTMLElement>("input,button,[href],[tabindex]:not([tabindex='-1'])") ?? []);
        if (!nodes.length) return e.preventDefault();
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) last.focus();
        else if (!e.shiftKey && document.activeElement === last) first.focus();
        else return;
        break;
      }
      default:
        if (!showSearch && e.key.length === 1 && !e.metaKey && !e.ctrlKey) {
          clearTimeout(typed.current.t);
          typed.current.s += e.key.toLowerCase();
          typed.current.t = setTimeout(() => (typed.current.s = ""), 600);
          const hit = flat.find((m) => !m.disabled && m.name.toLowerCase().startsWith(typed.current.s));
          if (hit) setActive(hit.id);
        }
        return;
    }
    e.preventDefault();
  };
  const onTriggerKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      openPicker();
    }
  };

  /* ---------------------------------- trigger ---------------------------------- */
  const trigger = (
    <button
      ref={triggerRef}
      type="button"
      disabled={disabled}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={open ? `${uid}-pop` : undefined}
      aria-label={`${label}: ${selected?.name ?? placeholder}. Change`}
      onClick={() => (open ? close(false) : openPicker())}
      onKeyDown={onTriggerKey}
      className={cx(
        "group relative inline-flex items-center text-neutral-900 transition-[background-color,box-shadow,transform] duration-150 active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-100 [-webkit-tap-highlight-color:transparent]",
        variant === "pill"
          ? "h-11 gap-2 rounded-full bg-black/[0.04] pl-2 pr-3.5 text-[13.5px] font-medium [@media(hover:hover)]:hover:bg-black/[0.07] dark:bg-white/[0.06] dark:[@media(hover:hover)]:hover:bg-white/[0.1] sm:h-10"
          : "h-14 w-full gap-3 rounded-2xl bg-white pl-3 pr-3.5 text-left text-[14.5px] font-medium ring-1 ring-black/[0.08] [@media(hover:hover)]:hover:ring-black/20 dark:bg-[#0f0f10] dark:ring-white/[0.1] dark:[@media(hover:hover)]:hover:ring-white/25",
        open && (variant === "pill" ? "bg-black/[0.08] dark:bg-white/[0.12]" : "ring-black/25 dark:ring-white/30"),
        focusRing,
      )}
    >
      {selected ? <Mark model={selected} size={variant === "pill" ? 28 : 34} /> : <span className="h-7 w-7 rounded-lg bg-black/[0.06] dark:bg-white/[0.08]" aria-hidden />}
      <span className={cx("relative min-w-0 overflow-hidden", variant === "field" && "flex-1")}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={selected?.id ?? "none"}
            className={cx("block truncate", !selected && "text-neutral-500")}
            initial={{ opacity: 0, y: reduce ? 0 : 8, filter: reduce ? "blur(0px)" : "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: reduce ? 0 : -8, filter: reduce ? "blur(0px)" : "blur(4px)" }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
          >
            {selected?.name ?? placeholder}
          </motion.span>
        </AnimatePresence>
      </span>
      <Ico d={P.chevron} className={cx("h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200", open && "rotate-180")} sw={2} />
    </button>
  );

  const panelProps: PanelProps = {
    uid,
    title: label,
    groups,
    total: flat.length,
    selectedId,
    activeId: active,
    searchable: showSearch,
    query,
    setQuery,
    setActive,
    onPick: pick,
    onKeyDown,
    footer,
    listRef,
    searchRef,
  };

  return (
    <div className={cx(variant === "field" ? "w-full" : "inline-block", className)}>
      {variant === "field" && <p className="mb-1.5 px-1 text-[12.5px] font-medium text-neutral-500">{label}</p>}
      {trigger}

      <p className="sr-only" role="status" aria-live="polite">
        {announce}
      </p>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && desktop && pos && (
              <motion.div
                key="popover"
                ref={popRef}
                id={`${uid}-pop`}
                role="dialog"
                aria-label={`Choose ${label.toLowerCase()}`}
                className="fixed z-[100] flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/[0.08] dark:bg-[#121213] dark:ring-white/[0.1]"
                style={{
                  left: pos.left,
                  width: pos.width,
                  maxHeight: pos.maxH,
                  top: pos.top,
                  bottom: pos.bottom,
                  transformOrigin: `${pos.ox}px ${pos.up ? "100%" : "0%"}`,
                  boxShadow: "0 16px 40px -18px rgba(0,0,0,0.32), 0 2px 8px rgba(0,0,0,0.07)",
                }}
                initial={{ opacity: 0, scale: reduce ? 1 : 0.97, y: reduce ? 0 : pos.up ? 6 : -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: reduce ? 1 : 0.98, transition: { duration: 0.12 } }}
                transition={{ duration: 0.18, ease: EASE_OUT }}
              >
                <Panel {...panelProps} />
              </motion.div>
            )}

            {open && !desktop && (
              <motion.div
                key="sheet"
                className="fixed inset-0 z-[100]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.2, ease: EASE_OUT }}
              >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => close()} aria-hidden />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
                  <motion.div
                    ref={popRef}
                    id={`${uid}-pop`}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Choose ${label.toLowerCase()}`}
                    className="pointer-events-auto flex max-h-[84dvh] w-full flex-col overflow-hidden rounded-t-[26px] bg-white shadow-2xl dark:bg-[#121213]"
                    style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.45, bounce: 0.08 }}
                    drag="y"
                    dragListener={false}
                    dragControls={drag}
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={{ top: 0, bottom: 0.6 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.y > 110 || info.velocity.y > 600) close();
                    }}
                  >
                    <div className="touch-none px-4 pb-1 pt-2.5" onPointerDown={(e) => drag.start(e)}>
                      <span className="mx-auto mb-2 block h-1 w-9 rounded-full bg-black/15 dark:bg-white/20" aria-hidden />
                      <div className="flex h-10 items-center justify-between">
                        <p className="text-[16px] font-semibold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">{label}</p>
                        <button
                          type="button"
                          aria-label="Close"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={() => close()}
                          className={`-mr-2 grid h-11 w-11 place-items-center rounded-full text-neutral-500 active:bg-black/[0.05] dark:active:bg-white/[0.08] ${focusRing}`}
                        >
                          <Ico d={P.x} className="h-[18px] w-[18px]" />
                        </button>
                      </div>
                    </div>
                    <Panel {...panelProps} />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

export default ModelPicker;

/* ========================================================================== */
/*  Demo                                                                      */
/* ========================================================================== */

export const DEMO_MODELS: AIModel[] = [
  { id: "claude", name: "Claude", description: "High intelligence · balanced speed", speed: 3, intelligence: 5, icon: <ModelBrandGlyph brand="claude" /> },
  { id: "claude-haiku", name: "Claude Haiku", description: "Lower intelligence · faster", speed: 5, intelligence: 2, icon: <ModelBrandGlyph brand="claude" /> },
  { id: "gemini-pro", name: "Gemini Pro", description: "High intelligence · balanced speed", speed: 4, intelligence: 5, icon: <ModelBrandGlyph brand="gemini" /> },
  { id: "gemini-flash", name: "Gemini Flash", description: "Lower intelligence · faster", speed: 5, intelligence: 3, icon: <ModelBrandGlyph brand="gemini" /> },
  { id: "gpt", name: "GPT", description: "High intelligence · balanced speed", speed: 3, intelligence: 5, icon: <ModelBrandGlyph brand="openai" /> },
  { id: "gpt-mini", name: "GPT Mini", description: "Lower intelligence · faster", speed: 5, intelligence: 2, icon: <ModelBrandGlyph brand="openai" /> },
];

export function ModelPickerDemo() {
  const [id, setId] = useState("claude");
  return (
    <div className="flex justify-center px-5 py-8 antialiased">
      <ModelPicker models={DEMO_MODELS} value={id} onChange={setId} />
    </div>
  );
}
