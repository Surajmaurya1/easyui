"use client";

import {
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Morphing Mega Menu — one panel that morphs between triggers (Stripe-style) */
/*  Deps: react 19, framer-motion, tailwindcss. No other imports.              */
/* -------------------------------------------------------------------------- */

const EASE_OUT = [0.23, 1, 0.32, 1] as const; // strong ease-out
const GAP = 12; // space between nav and panel
const ARROW = 12; // arrow square size
const CLOSE_DELAY = 120;
const HOVER = "[@media(hover:hover)]:hover:bg-neutral-100 dark:[@media(hover:hover)]:hover:bg-neutral-900";

export type MegaMenuItem = {
  id: string;
  label: string;
  /** Plain link (no panel) when `content` is omitted */
  href?: string;
  content?: ReactNode;
};

export interface MorphingMegaMenuProps {
  items?: MegaMenuItem[];
  className?: string;
}

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

/* ------------------------------- Demo content ------------------------------ */

function Icon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  card: "M3 7h18v10H3z M3 11h18",
  zap: "M13 3L5 13h6l-1 8 8-10h-6z",
  globe: "M12 3a9 9 0 100 18 9 9 0 000-18z M3 12h18 M12 3c3 3 3 15 0 18 M12 3c-3 3-3 15 0 18",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  code: "M8 8l-4 4 4 4 M16 8l4 4-4 4",
  terminal: "M4 6l6 6-6 6 M12 18h8",
  book: "M4 5h6a2 2 0 012 2v12a2 2 0 00-2-2H4z M20 5h-6a2 2 0 00-2 2v12a2 2 0 012-2h6z",
  users: "M9 11a3 3 0 100-6 3 3 0 000 6z M3 20c0-3 3-5 6-5s6 2 6 5 M17 11a3 3 0 000-6 M21 20c0-2-1.5-4-4-4.5",
  briefcase: "M3 8h18v11H3z M9 8V5h6v3",
  chart: "M4 20V10 M10 20V4 M16 20v-7 M22 20H2",
};

export function MenuLink({
  icon,
  title,
  desc,
  href = "#",
}: {
  icon: keyof typeof ICONS;
  title: string;
  desc: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={`flex gap-2.5 sm:gap-3 rounded-xl p-2 sm:p-3 outline-none transition-colors duration-150 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-900 ${HOVER}`}
    >
      <span className="mt-0.5 flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
        <Icon d={ICONS[icon]} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
          {title}
        </span>
        <span className="block text-[12px] sm:text-[13px] leading-snug text-neutral-500 line-clamp-2">
          {desc}
        </span>
      </span>
    </a>
  );
}

export const DEFAULT_MEGA_MENU_ITEMS: MegaMenuItem[] = [
  {
    id: "products",
    label: "Products",
    content: (
      <div className="grid w-[260px] sm:w-[540px] grid-cols-1 sm:grid-cols-2 gap-1 p-1.5 sm:p-2">
        <MenuLink icon="card" title="Payments" desc="Accept cards and wallets worldwide" />
        <MenuLink icon="chart" title="Analytics" desc="Revenue insights in real time" />
        <MenuLink icon="shield" title="Fraud" desc="Block bad actors automatically" />
        <MenuLink icon="globe" title="Global" desc="Local methods in 40+ countries" />
        <MenuLink icon="zap" title="Billing" desc="Subscriptions and invoicing" />
        <MenuLink icon="users" title="Identity" desc="Verify customers in seconds" />
      </div>
    ),
  },
  {
    id: "developers",
    label: "Developers",
    content: (
      <div className="flex flex-col sm:flex-row w-[260px] sm:w-[580px]">
        <div className="flex-1 p-1.5 sm:p-2">
          <MenuLink icon="book" title="Documentation" desc="Guides and API reference" />
          <MenuLink icon="code" title="SDKs" desc="Libraries for every stack" />
          <MenuLink icon="terminal" title="CLI" desc="Ship from your terminal" />
        </div>
        <div className="m-1.5 sm:m-2 sm:ml-0 flex w-auto sm:w-[200px] flex-col justify-end rounded-xl bg-neutral-100 p-2.5 sm:p-4 dark:bg-neutral-900">
          <span className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-100">
            Changelog
          </span>
          <span className="mt-0.5 sm:mt-1 text-[12px] sm:text-[13px] leading-snug text-neutral-500">
            Everything we shipped this month, in one place.
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "company",
    label: "Company",
    content: (
      <div className="w-[260px] sm:w-[300px] p-1.5 sm:p-2">
        <MenuLink icon="users" title="About" desc="Our story and values" />
        <MenuLink icon="briefcase" title="Careers" desc="We're hiring" />
      </div>
    ),
  },
  { id: "pricing", label: "Pricing", href: "#pricing" },
];

/* -------------------------------- Component -------------------------------- */

export function MorphingMegaMenu({
  items = DEFAULT_MEGA_MENU_ITEMS,
  className = "",
}: MorphingMegaMenuProps) {
  const uid = useId();
  const reduce = useReducedMotion();

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<(HTMLElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [morph, setMorph] = useState(false); // morph only when moving between triggers
  const [anchor, setAnchor] = useState({ center: 0, rootW: 0 });
  const [sizes, setSizes] = useState<Record<number, { w: number; h: number }>>({});
  const justDismissed = useRef(false);

  // Arrow: raw target (cursor x) -> spring
  const arrowRaw = useMotionValue(0);
  const arrowSpring = useSpring(arrowRaw, { stiffness: 600, damping: 45, mass: 0.6 });
  const arrowX = useTransform(arrowSpring, (v) => v - ARROW / 2);

  // Measure every panel's natural size
  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      setSizes((prev) => {
        const next = { ...prev };
        for (const e of entries) {
          const el = e.target as HTMLDivElement;
          next[Number(el.dataset.index)] = { w: el.offsetWidth, h: el.offsetHeight };
        }
        return next;
      });
    });
    contentRefs.current.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, [items]);

  // Close on outside press (touch) + cleanup
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      clearTimeout(closeTimer.current);
    };
  }, []);

  const getPanelSize = (i: number) => {
    const s = sizes[i];
    if (s && s.w > 0 && s.h > 0) return s;
    const el = contentRefs.current[i];
    if (el && el.offsetWidth > 0 && el.offsetHeight > 0) {
      return { w: el.offsetWidth, h: el.offsetHeight };
    }
    return s ?? { w: 0, h: 0 };
  };

  const geometry = (i: number) => {
    const root = rootRef.current;
    const el = triggerRefs.current[i];
    if (!root || !el) return null;
    const rootRect = root.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const rootW = rootRect.width || root.offsetWidth;
    const center = elRect.left - rootRect.left + elRect.width / 2;
    const pSize = getPanelSize(i);
    const w = Math.min(pSize.w, rootW);
    const x = clamp(center - w / 2, 0, Math.max(0, rootW - w));
    return { rootW, center, w, x };
  };

  const clampArrow = (v: number, g: { x: number; w: number }) =>
    g.w > 44 ? clamp(v, g.x + 20, g.x + g.w - 20) : v;

  const show = (i: number) => {
    if (justDismissed.current) {
      justDismissed.current = false;
      return;
    }
    clearTimeout(closeTimer.current);
    const g = geometry(i);
    if (!g) return;
    const wasOpen = open;
    setAnchor({ center: g.center, rootW: g.rootW });
    setMorph(wasOpen);
    setIndex(i);
    setOpen(true);
    const target = clampArrow(g.center, g);
    arrowRaw.set(target);
    if (!wasOpen) arrowSpring.jump(target); // snap on first open, spring afterwards
  };

  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  // Re-adjust anchor on window resize
  useEffect(() => {
    const onResize = () => {
      if (open && rootRef.current && triggerRefs.current[index]) {
        const g = geometry(index);
        if (g) {
          setAnchor({ center: g.center, rootW: g.rootW });
          arrowRaw.set(clampArrow(g.center, g));
        }
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, index]);

  // Derived panel geometry
  const rawSize = getPanelSize(index);
  const currentRootW = rootRef.current?.offsetWidth || anchor.rootW || rawSize.w;
  const panelW = Math.min(rawSize.w, currentRootW);
  const x = clamp(anchor.center - panelW / 2, 0, Math.max(0, currentRootW - panelW));

  const morphT = reduce || !morph
    ? { duration: 0 }
    : ({ type: "spring", duration: 0.4, bounce: 0.1 } as const);
  const fadeT = { duration: 0.18, ease: EASE_OUT };

  return (
    <div
      ref={rootRef}
      className={`relative mx-auto w-full max-w-3xl ${className}`}
      onPointerEnter={() => clearTimeout(closeTimer.current)}
      onPointerLeave={(e) => e.pointerType !== "touch" && scheduleClose()}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          justDismissed.current = true;
          setOpen(false);
          triggerRefs.current[index]?.focus();
        }
      }}
    >
      <nav aria-label="Main" className="w-full overflow-x-auto no-scrollbar">
        <ul className="flex items-center justify-center gap-1 py-2 min-w-max mx-auto px-1">
          {items.map((item, i) => {
            const active = open && index === i;
            const cls = `rounded-full px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-xs sm:text-sm font-medium outline-none transition-[background-color,transform] duration-150 ease-out active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-neutral-400 whitespace-nowrap ${
              active
                ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50"
                : `text-neutral-600 dark:text-neutral-400 ${HOVER}`
            }`;

            return (
              <li key={item.id}>
                {item.content ? (
                  <button
                    ref={(el) => {
                      triggerRefs.current[i] = el;
                    }}
                    type="button"
                    className={cls}
                    aria-expanded={active}
                    aria-controls={`${uid}-${i}`}
                    onPointerEnter={() => show(i)}
                    onFocus={() => show(i)}
                    onClick={() => {
                      if (open && index === i) {
                        setOpen(false);
                      } else {
                        show(i);
                      }
                    }}
                    onPointerMove={(e) => {
                      if (!open || index !== i) return;
                      const g = geometry(i);
                      const root = rootRef.current;
                      if (!g || !root) return;
                      arrowRaw.set(clampArrow(e.clientX - root.getBoundingClientRect().left, g));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        show(i);
                        contentRefs.current[i]
                          ?.querySelector<HTMLElement>("a,button")
                          ?.focus();
                      }
                    }}
                  >
                    {item.label}
                  </button>
                ) : (
                  <button
                    ref={(el) => {
                      triggerRefs.current[i] = el;
                    }}
                    type="button"
                    role={item.href ? "link" : undefined}
                    onClick={(e) => {
                      if (item.href && item.href !== "#") {
                        e.stopPropagation();
                        if (typeof window !== "undefined") window.location.href = item.href;
                      }
                    }}
                    className={cls}
                    onPointerEnter={scheduleClose}
                  >
                    {item.label}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Single morphing panel */}
      <motion.div
        className="absolute left-0 top-full z-50"
        style={{
          paddingTop: GAP, // hover bridge so the cursor never leaves the menu
          transformOrigin: `${anchor.center - x}px 0px`,
          pointerEvents: open ? "auto" : "none",
        }}
        inert={!open}
        initial={false}
        animate={{ x, opacity: open ? 1 : 0, scale: open || reduce ? 1 : 0.97 }}
        transition={{
          x: morphT,
          opacity: { duration: open ? 0.18 : 0.12, ease: EASE_OUT },
          scale: { duration: open ? 0.18 : 0.12, ease: EASE_OUT },
        }}
      >
        <motion.div
          className="relative box-content overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl shadow-black/5 dark:border-neutral-800 dark:bg-neutral-950"
          initial={false}
          animate={{ width: panelW, height: rawSize.h }}
          transition={{ width: morphT, height: morphT }}
        >
          {items.map((item, i) => {
            if (!item.content) return null;
            const active = index === i;
            const dir = i < index ? -16 : 16;
            return (
              <motion.div
                key={item.id}
                id={`${uid}-${i}`}
                ref={(el) => {
                  contentRefs.current[i] = el;
                }}
                data-index={i}
                className="absolute left-0 top-0 w-max"


                inert={!(open && active)}
                style={{ pointerEvents: active ? "auto" : "none" }}
                initial={false}
                animate={{
                  opacity: active ? 1 : 0,
                  x: active || reduce ? 0 : dir,
                  filter: active || reduce ? "blur(0px)" : "blur(2px)", // masks the crossfade
                }}
                transition={fadeT}
              >
                {item.content}
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Arrow follows the cursor along the trigger bar */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-0 z-20 block rounded-tl-[3px] border-l border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950"
        style={{
          width: ARROW,
          height: ARROW,
          x: arrowX,
          rotate: 45,
          top: `calc(100% + ${GAP - ARROW / 2}px)`,
        }}
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: open ? 0.18 : 0.12, ease: EASE_OUT }}
      />
    </div>
  );
}

export default MorphingMegaMenu;
