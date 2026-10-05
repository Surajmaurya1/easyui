import React, { useState, useRef, useEffect, useId, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  User,
  ArrowUpRight,
  Plus,
  X,
  ArrowLeft,
  Mail,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export type DynamicIslandState = 'collapsed' | 'expanded' | 'profile' | 'share';

export type DynamicIslandSocialPlatform =
  | 'github'
  | 'x'
  | 'twitter'
  | 'linkedin'
  | 'instagram'
  | 'email'
  | 'website'
  | 'custom';

export interface DynamicIslandSocialItem {
  type?: DynamicIslandSocialPlatform;
  href: string;
  label?: string;
  icon?: React.ReactNode;
}

export type DynamicIslandSocials =
  | DynamicIslandSocialItem[]
  | {
      github?: string;
      x?: string;
      twitter?: string;
      linkedin?: string;
      instagram?: string;
      email?: string;
      website?: string;
      [key: string]: string | undefined;
    };

export interface DynamicIslandMetadataItem {
  label: string;
  value: string;
}

export interface DynamicIslandProps {
  avatar?: string;
  avatarAlt?: string;
  name?: string;
  role?: string;
  description?: string;
  greeting?: string;
  statusText?: string;
  metadata?: DynamicIslandMetadataItem[];
  socials?: DynamicIslandSocials;
  defaultState?: DynamicIslandState;
  state?: DynamicIslandState;
  onStateChange?: (state: DynamicIslandState) => void;
  className?: string;
  profileContent?: React.ReactNode;
  shareContent?: React.ReactNode;
  children?: React.ReactNode;
  idPrefix?: string;
}

/* -------------------------------------------------------------------------- */
/* Built-in Social Platform Icons                                             */
/* -------------------------------------------------------------------------- */

const GithubPlatformIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const XPlatformIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinPlatformIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const InstagramPlatformIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

function renderPlatformIcon(item: DynamicIslandSocialItem): React.ReactNode {
  if (item.icon) return item.icon;
  switch (item.type) {
    case 'github':
      return <GithubPlatformIcon className="w-4 h-4" />;
    case 'x':
    case 'twitter':
      return <XPlatformIcon className="w-3.5 h-3.5" />;
    case 'linkedin':
      return <LinkedinPlatformIcon className="w-4 h-4" />;
    case 'instagram':
      return <InstagramPlatformIcon className="w-4 h-4" />;
    case 'email':
      return <Mail className="w-4 h-4" />;
    case 'website':
      return <Globe className="w-4 h-4" />;
    default:
      return <ExternalLink className="w-4 h-4" />;
  }
}


/* -------------------------------------------------------------------------- */
/* DynamicIsland Component                                                    */
/* -------------------------------------------------------------------------- */

export const DynamicIsland: React.FC<DynamicIslandProps> = ({
  avatar,
  avatarAlt,
  name = 'Suraj Maurya',
  role = 'Frontend Developer',
  description = 'Building thoughtful interfaces with React, Next.js, and Framer Motion.',
  greeting,
  statusText = 'Available for work',
  metadata,
  socials,
  defaultState = 'collapsed',
  state: controlledState,
  onStateChange,
  className,
  profileContent,
  shareContent,
  children,
  idPrefix,
}) => {
  const [internalState, setInternalState] = useState<DynamicIslandState>(defaultState);
  const isControlled = controlledState !== undefined;
  const currentState = isControlled ? controlledState : internalState;

  const rawId = useId();
  const instanceId = idPrefix || `dyn-island-${rawId.replace(/[:]/g, '')}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleStateChange = useCallback(
    (nextState: DynamicIslandState) => {
      if (!isControlled) {
        setInternalState(nextState);
      }
      onStateChange?.(nextState);
    },
    [isControlled, onStateChange]
  );

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (currentState === 'collapsed') return;

    const handlePointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleStateChange('collapsed');
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleStateChange('collapsed');
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentState, handleStateChange]);

  // Normalize socials configuration
  const normalizedSocials: DynamicIslandSocialItem[] = useMemo(() => {
    if (!socials) {
      return [
        { type: 'github', href: 'https://github.com', label: 'GitHub' },
        { type: 'x', href: 'https://x.com', label: 'X (Twitter)' },
        { type: 'linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
        { type: 'instagram', href: 'https://instagram.com', label: 'Instagram' },
        { type: 'email', href: 'mailto:contact@example.com', label: 'Email' },
      ];
    }

    if (Array.isArray(socials)) return socials;

    const items: DynamicIslandSocialItem[] = [];
    const entries = Object.entries(socials);
    for (const [key, val] of entries) {
      if (!val) continue;
      const lower = key.toLowerCase();
      let type: DynamicIslandSocialPlatform = 'custom';
      let label = key;

      if (lower === 'github') {
        type = 'github';
        label = 'GitHub';
      } else if (lower === 'x' || lower === 'twitter') {
        type = 'x';
        label = 'X';
      } else if (lower === 'linkedin') {
        type = 'linkedin';
        label = 'LinkedIn';
      } else if (lower === 'instagram') {
        type = 'instagram';
        label = 'Instagram';
      } else if (lower === 'email') {
        type = 'email';
        label = 'Email';
      } else if (lower === 'website') {
        type = 'website';
        label = 'Website';
      }

      items.push({
        type,
        href: type === 'email' && !val.startsWith('mailto:') ? `mailto:${val}` : val,
        label,
      });
    }
    return items;
  }, [socials]);

  // Spring physics matching EasyUI motion philosophy
  const springTransition = shouldReduceMotion
    ? { duration: 0 }
    : {
        type: 'spring' as const,
        stiffness: 400,
        damping: 30,
        mass: 0.8,
      };

  const contentTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const };

  const effectiveGreeting = greeting || (name ? `Hello, I'm ${name}` : 'Welcome to EasyUI');

  // Avatar component with layoutId for spatial continuity
  const renderAvatar = (sizeClass: string, isProfile = false) => {
    return (
      <motion.div
        layoutId={`${instanceId}-avatar`}
        transition={springTransition}
        className={cn(
          'relative shrink-0 overflow-hidden rounded-full border border-black/10 dark:border-white/15 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center select-none shadow-xs',
          sizeClass
        )}
      >
        {avatar ? (
          <img
            src={avatar}
            alt={avatarAlt || name || 'Avatar'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            data-testid="dynamic-island-profile-icon"
            className="w-full h-full flex items-center justify-center text-neutral-600 dark:text-neutral-300"
          >
            {isProfile ? (
              <User className="w-6 h-6 stroke-[1.8]" aria-hidden="true" />
            ) : (
              <User className="w-3.5 h-3.5 stroke-[1.8]" aria-hidden="true" />
            )}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center justify-center"
      role="region"
      aria-label="Dynamic Island"
    >
      <motion.div
        layout
        transition={springTransition}
        className={cn(
          'relative z-30 inline-flex flex-col items-center justify-center overflow-hidden border backdrop-blur-md transition-colors',
          'bg-white/95 dark:bg-[#141416]/95',
          'border-black/[0.08] dark:border-white/[0.12]',
          'text-[#0A0A0A] dark:text-[#F4F4F5]',
          'shadow-[0_12px_32px_-6px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.04)] dark:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)]',
          currentState === 'profile' ? 'rounded-[26px]' : 'rounded-full',
          className
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {/* ============================================================= */}
          {/* STATE 1: COLLAPSED                                            */}
          {/* ============================================================= */}
          {currentState === 'collapsed' && (
            <motion.div
              key="island-collapsed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={contentTransition}
              className="flex items-center gap-2 px-2 py-1.5 min-h-[44px]"
            >
              {renderAvatar('w-7 h-7')}
              <button
                type="button"
                onClick={() => handleStateChange('expanded')}
                aria-label="Expand dynamic island"
                aria-expanded={false}
                className="w-7 h-7 flex items-center justify-center rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all focus-ring cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* ============================================================= */}
          {/* STATE 2: EXPANDED                                             */}
          {/* ============================================================= */}
          {currentState === 'expanded' && (
            <motion.div
              key="island-expanded"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={contentTransition}
              className="flex items-center gap-2.5 px-3 py-1.5 min-h-[44px] max-w-[calc(100vw-2rem)]"
            >
              {renderAvatar('w-7 h-7')}

              {/* Greeting / Summary text */}
              <div className="flex items-center min-w-0 pr-1">
                <span className="text-xs sm:text-sm font-medium tracking-tight truncate max-w-[140px] sm:max-w-[210px] text-neutral-900 dark:text-neutral-100">
                  {effectiveGreeting}
                </span>
              </div>

              {children}

              {/* Action Buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleStateChange('profile')}
                  aria-label="View profile"
                  title="View profile"
                  className="w-7 h-7 flex items-center justify-center rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all focus-ring cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleStateChange('share')}
                  aria-label="Share links"
                  title="Share links"
                  className="w-7 h-7 flex items-center justify-center rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all focus-ring cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="w-px h-3.5 bg-neutral-200 dark:bg-neutral-800 mx-0.5" />

                <button
                  type="button"
                  onClick={() => handleStateChange('collapsed')}
                  aria-label="Collapse dynamic island"
                  title="Collapse"
                  className="w-7 h-7 flex items-center justify-center rounded-full text-neutral-400 dark:text-neutral-500 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all focus-ring cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ============================================================= */}
          {/* STATE 3: PROFILE                                              */}
          {/* ============================================================= */}
          {currentState === 'profile' && (
            <motion.div
              key="island-profile"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={contentTransition}
              className="w-full max-w-[min(380px,calc(100vw-2rem))] p-4 flex flex-col gap-3.5"
            >
              {profileContent || (
                <>
                  {/* Profile Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {renderAvatar('w-12 h-12', true)}
                      <div className="min-w-0 flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 truncate">
                            {name}
                          </h4>
                          {statusText && (
                            <span
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                              title={statusText}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="truncate max-w-[90px]">{statusText}</span>
                            </span>
                          )}
                        </div>
                        {role && (
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                            {role}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleStateChange('expanded')}
                      aria-label="Back to summary"
                      title="Back to summary"
                      className="w-7 h-7 flex items-center justify-center rounded-full text-neutral-500 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all focus-ring cursor-pointer shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Profile Description */}
                  {description && (
                    <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                      {description}
                    </p>
                  )}

                  {/* Optional Metadata Badges */}
                  {metadata && metadata.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {metadata.map((item, idx) => (
                        <div
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/60 text-neutral-700 dark:text-neutral-300"
                        >
                          <span className="text-neutral-400 dark:text-neutral-500">{item.label}:</span>
                          <span className="font-medium text-neutral-900 dark:text-neutral-100">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Profile Actions Footer */}
                  <div className="flex items-center justify-between pt-1 border-t border-neutral-200/80 dark:border-neutral-800/80 mt-0.5">
                    <button
                      type="button"
                      onClick={() => handleStateChange('share')}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors focus-ring py-1 px-1.5 rounded cursor-pointer"
                    >
                      <span>Share Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStateChange('expanded')}
                      className="inline-flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors focus-ring py-1 px-1.5 rounded cursor-pointer"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>Back</span>
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* ============================================================= */}
          {/* STATE 4: SHARE                                                */}
          {/* ============================================================= */}
          {currentState === 'share' && (
            <motion.div
              key="island-share"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={contentTransition}
              className="flex items-center gap-1.5 px-2.5 py-1.5 min-h-[44px] max-w-[calc(100vw-2rem)]"
            >
              {shareContent || (
                <>
                  <button
                    type="button"
                    onClick={() => handleStateChange('expanded')}
                    aria-label="Back to overview"
                    title="Back to overview"
                    className="w-7 h-7 flex items-center justify-center rounded-full text-neutral-500 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all focus-ring cursor-pointer shrink-0"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>

                  <div className="w-px h-3.5 bg-neutral-200 dark:bg-neutral-800 mx-1 shrink-0" />

                  {/* Social icons row */}
                  <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar">
                    {normalizedSocials.length === 0 ? (
                      <span className="text-xs text-neutral-500 px-2">No links configured</span>
                    ) : (
                      normalizedSocials.map((item, idx) => (
                        <a
                          key={`${item.href}-${idx}`}
                          href={item.href}
                          target={item.type === 'email' ? undefined : '_blank'}
                          rel={item.type === 'email' ? undefined : 'noopener noreferrer'}
                          aria-label={item.label || item.type || 'Social link'}
                          title={item.label || item.type}
                          className="group relative w-7 h-7 flex items-center justify-center rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all focus-ring shrink-0"
                        >
                          {renderPlatformIcon(item)}
                        </a>
                      ))
                    )}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
