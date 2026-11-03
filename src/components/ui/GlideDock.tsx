import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Search,
  LayoutGrid,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";



export interface GlideDockItem {
  name: string;
  icon: React.ElementType;
  onClick: () => void;
}

interface GlideDockProps {
  items: GlideDockItem[];
  className?: string;
}

const defaultItems: GlideDockItem[] = [
  { name: "Home", icon: Home, onClick: () => { } },
  { name: "Explore", icon: Search, onClick: () => { } },
  { name: "Projects", icon: LayoutGrid, onClick: () => { } },
  { name: "Profile", icon: User, onClick: () => { } },
];


export default function GlideDock({ items = defaultItems, className = "" }: GlideDockProps) {
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState("Home");


  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Keep dock visible near the top
      if (currentScrollY < 80) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY + 5) {
        // Scrolling down
        setVisible(false);
      } else if (currentScrollY < lastScrollY - 5) {
        // Scrolling up
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 28,
            mass: 0.85,
          }}
          className={cn(
            "fixed bottom-4 sm:bottom-6 left-1/2 z-50 -translate-x-1/2",
            "w-[90vw] min-w-[90vw] max-w-[90vw]",
            "sm:w-auto sm:min-w-0 sm:max-w-none",
            className
          )}
        >
          <div className="flex w-full items-center justify-around gap-0.5 rounded-full border border-black/10 bg-white/85 p-1.5 shadow-2xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/85 dark:shadow-black/30 sm:w-auto sm:justify-center sm:gap-1 sm:p-2">

            {items.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActive(item.name);
                    item.onClick();
                  }}
                  aria-label={item.name}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex flex-1 items-center justify-center gap-1.5 rounded-full px-2.5 py-2.5 text-xs transition-colors duration-300",
                    "sm:flex-none sm:gap-2 sm:px-4 sm:py-3 sm:text-sm",
                    isActive
                      ? "text-zinc-950 dark:text-white"
                      : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeDock"
                      className="absolute inset-0 rounded-full bg-black/10 dark:bg-white/15"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  <Icon
                    size={16}
                    className="relative z-10 shrink-0 sm:h-[18px] sm:w-[18px]"
                  />

                  <span className="relative z-10 hidden sm:block whitespace-nowrap">
                    {item.name}
                  </span>
                </button>
              );
            })}

          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}