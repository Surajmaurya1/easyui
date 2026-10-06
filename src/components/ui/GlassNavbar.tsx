'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface NavItem {
  id?: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
  active?: boolean;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

export interface GlassNavbarProps {
  /** Brand / Logo element or text */
  brand?: React.ReactNode;
  /** Brand link destination */
  brandHref?: string;
  /** Navigation links */
  items?: NavItem[];
  /** Right-hand side call-to-action button or custom element */
  cta?: React.ReactNode;
  /** Currently active item ID or label */
  activeId?: string;
  /** Floating pill style vs full-width attached bar */
  variant?: 'floating' | 'full-width';
  /** Sticky positioning at the top of the viewport */
  sticky?: boolean;
  /** Enable background blur glassmorphism effect */
  glass?: boolean;
  /** Additional container classes */
  className?: string;
  /** Callback when navigation item is clicked */
  onItemSelect?: (item: NavItem) => void;
}

export const GlassNavbar: React.FC<GlassNavbarProps> = ({
  brand = (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-lg bg-[#141414] border border-[#1F1F1F] flex items-center justify-center font-bold text-xs text-[#FAFAFA]">
        E
      </div>
      <span className="font-semibold text-sm tracking-tight text-[#FAFAFA]">EasyUI</span>
    </div>
  ),
  brandHref = '/',
  items = [
    { label: 'Overview', href: '#overview' },
    { label: 'Components', href: '#components', badge: '16+' },
    { label: 'Showcase', href: '#showcase' },
    { label: 'Docs', href: '#docs' },
  ],
  cta = (
    <a
      href="#get-started"
      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FAFAFA] text-[#050505] text-xs font-medium hover:bg-white transition-colors focus-ring shadow-xs"
    >
      <span>Get Started</span>
      <ArrowRight className="w-3.5 h-3.5" />
    </a>
  ),
  activeId,
  variant = 'floating',
  sticky = true,
  glass = true,
  className,
  onItemSelect,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState<string>(
    activeId || (items.find((i) => i.active)?.label ?? items[0]?.label ?? '')
  );
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (activeId) {
      setActiveItem(activeId);
    }
  }, [activeId]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    setActiveItem(item.id || item.label);
    if (item.onClick) {
      item.onClick(e);
    }
    if (onItemSelect) {
      onItemSelect(item);
    }
    setMobileMenuOpen(false);
  };

  const isFloating = variant === 'floating';

  return (
    <header
      ref={navRef}
      className={cn(
        'w-full z-50 transition-all duration-300',
        sticky && 'sticky top-0',
        isFloating ? 'pt-3 sm:pt-4 px-4 sm:px-6' : 'px-0',
        className
      )}
      role="banner"
    >
      <div
        className={cn(
          'relative mx-auto transition-all duration-300',
          isFloating
            ? 'max-w-5xl rounded-2xl border border-[#1F1F1F] px-4 sm:px-5 py-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.5)]'
            : 'w-full border-b border-[#1F1F1F] px-4 sm:px-8 py-3.5',
          glass
            ? 'bg-[#0E0E0E]/90 backdrop-blur-md'
            : 'bg-[#0E0E0E]'
        )}
      >
        <nav
          className="flex items-center justify-between gap-4"
          aria-label="Main Navigation"
        >
          {/* Brand / Logo */}
          <a
            href={brandHref}
            className="flex items-center gap-2 text-inherit no-underline focus-ring rounded-lg shrink-0 cursor-pointer"
            aria-label="Home"
          >
            {brand}
          </a>

          {/* Desktop Navigation Links */}
          <div
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {items.map((item, idx) => {
              const currentId = item.id || item.label;
              const isCurrent = activeItem === currentId;

              return (
                <a
                  key={currentId}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  onClick={(e) => handleLinkClick(e, item)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className={cn(
                    'relative px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-150 flex items-center gap-1.5 focus-ring select-none cursor-pointer',
                    isCurrent
                      ? 'text-[#FAFAFA]'
                      : 'text-[#6B6B6B] hover:text-[#FAFAFA]'
                  )}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {/* Hover spotlight background */}
                  {hoveredIndex === idx && (
                    <motion.div
                      layoutId="navbar-hover-pill"
                      className="absolute inset-0 rounded-lg bg-[#141414] -z-10"
                      transition={motionTransitions.springSnappy}
                    />
                  )}

                  {/* Active indicator pill (when not hovered over another item) */}
                  {isCurrent && hoveredIndex === null && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-lg bg-[#141414] border border-[#1F1F1F] -z-10"
                      transition={motionTransitions.springGentle}
                    />
                  )}

                  {item.icon && (
                    <span className="w-3.5 h-3.5 text-current shrink-0">
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono leading-none bg-[#141414] border border-[#1F1F1F] text-[#A1A1A1]">
                      {item.badge}
                    </span>
                  )}
                  {item.external && (
                    <ExternalLink className="w-3 h-3 text-[#525252]" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop Right Action Area / CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {cta}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            {cta && (
              <div className="hidden sm:block">
                {cta}
              </div>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-lg bg-[#141414] border border-[#1F1F1F] text-[#525252] hover:text-[#FAFAFA] hover:border-[#4A4A4A] transition-colors focus-ring cursor-pointer"
            >
              <motion.div
                key={mobileMenuOpen ? 'close' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={motionTransitions.springSnappy}
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </motion.div>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={motionTransitions.springGentle}
              className="overflow-hidden md:hidden pt-3 mt-3 border-t border-[#1F1F1F]"
            >
              <div className="flex flex-col gap-1 pb-2">
                {items.map((item) => {
                  const currentId = item.id || item.label;
                  const isCurrent = activeItem === currentId;

                  return (
                    <a
                      key={currentId}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      onClick={(e) => handleLinkClick(e, item)}
                      className={cn(
                        'flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors focus-ring cursor-pointer',
                        isCurrent
                          ? 'bg-[#141414] text-[#FAFAFA] border border-[#1F1F1F]'
                          : 'text-[#6B6B6B] hover:text-[#FAFAFA] hover:bg-[#141414]'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon && (
                          <span className="w-4 h-4 text-current">
                            {item.icon}
                          </span>
                        )}
                        <span>{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono leading-none bg-[#141414] border border-[#1F1F1F] text-[#A1A1A1]">
                            {item.badge}
                          </span>
                        )}
                        {item.external && (
                          <ExternalLink className="w-3 h-3 text-[#525252]" />
                        )}
                      </div>
                    </a>
                  );
                })}

                {cta && (
                  <div className="pt-2 mt-2 border-t border-[#1F1F1F] flex flex-col">
                    {cta}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
