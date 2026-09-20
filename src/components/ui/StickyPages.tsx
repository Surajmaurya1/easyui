"use client";

import React, { useRef } from "react";
import { cn } from "../../lib/utils";

export interface StickyPageItem {
  id?: string | number;
  title?: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  content?: React.ReactNode;
  className?: string;
  bg?: string;
}

export interface StickyPagesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of page items (alternatively pass children <StickyPage /> components) */
  pages?: StickyPageItem[];
  /** Height of each sticky page. Default: "100vh" */
  pageHeight?: string;
  /** Distance from top of viewport in pixels when page locks into sticky position. Default: 0 */
  topOffset?: number;
  /** Progressive pixel offset between stacked cards (e.g. 0 for full clean cover, 24 for visible deck header tabs). Default: 0 */
  stackOffset?: number;
  /** Rounded top corners on pages as they stack over one another. Default: true */
  rounded?: boolean;
  /** Elevated top drop shadow as each page covers the previous one. Default: true */
  shadow?: boolean;
  /** Subtle top highlight border. Default: true */
  border?: boolean;
  /** Container custom classes */
  className?: string;
  /** Custom child <StickyPage> components */
  children?: React.ReactNode;
}

export interface StickyPageProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Individual Page Wrapper for JSX composition:
 * <StickyPages>
 *   <StickyPage>...</StickyPage>
 *   <StickyPage>...</StickyPage>
 * </StickyPages>
 */
export const StickyPage: React.FC<StickyPageProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("relative h-full w-full", className)} {...props}>
      {children}
    </div>
  );
};

interface StickyPageCardProps {
  index: number;
  total: number;
  topOffset: number;
  stackOffset: number;
  pageHeight: string;

  children: React.ReactNode;
  className?: string;
  bg?: string;
}

const StickyPageCard: React.FC<StickyPageCardProps> = ({
  index,
  topOffset,
  stackOffset,
  pageHeight,
  children,
  className,
  bg = "bg-[#090A0F]",
}) => {
  const stickyTop = `${topOffset + index * stackOffset}px`;

  return (
    <div
      style={{
        position: "sticky",
        top: stickyTop,
        height: pageHeight,
        zIndex: index + 1,
      }}
      className="w-full flex items-center justify-center will-change-transform"
    >
      <div
        className={cn(
          "relative h-full w-full overflow-hidden transition-shadow",
          bg,
          className
        )}
      >
        <div className="relative z-10 h-full w-full flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

export const StickyPages: React.FC<StickyPagesProps> = ({
  pages,
  pageHeight = "100vh",
  topOffset = 0,
  stackOffset = 0,
  rounded = true,
  shadow = true,
  border = true,
  className,
  children,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine content items (either from children or pages prop)
  const childArray = React.Children.toArray(children);
  const isChildrenMode = childArray.length > 0;
  const total = isChildrenMode ? childArray.length : pages?.length || 0;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      {...props}
    >
      {/* Composition via <StickyPage> children */}
      {isChildrenMode &&
        childArray.map((child, idx) => (
          <StickyPageCard
            key={`sticky-page-${idx}`}
            index={idx}
            total={total}
            topOffset={topOffset}
            stackOffset={stackOffset}
            pageHeight={pageHeight}
          >
            {child}
          </StickyPageCard>
        ))}

      {/* Composition via pages data array */}
      {!isChildrenMode &&
        pages?.map((page, idx) => (
          <StickyPageCard
            key={page.id || `sticky-page-${idx}`}
            index={idx}
            total={total}
            topOffset={topOffset}
            stackOffset={stackOffset}
            pageHeight={pageHeight}
            className={page.className}
            bg={page.bg}
          >
            {page.content ? (
              page.content
            ) : (
              <DefaultPageContent page={page} index={idx} total={total} />
            )}
          </StickyPageCard>
        ))}
    </div>
  );
};

// Default layout when using pages data array
const DefaultPageContent: React.FC<{
  page: StickyPageItem;
  index: number;
  total: number;
}> = ({ page, index, total }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 sm:px-12 text-center max-w-4xl mx-auto">
      {page.badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-sky-400 bg-sky-950/60 border border-sky-800/60 mb-6">
          {page.badge}
        </span>
      )}
      {page.subtitle && (
        <span className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-2">
          {page.subtitle} • 0{index + 1} / 0{total}
        </span>
      )}
      {page.title && (
        <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          {page.title}
        </h2>
      )}
      {page.description && (
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl">
          {page.description}
        </p>
      )}
    </div>
  );
};

// Aliases
export const StickyStack = StickyPages;
export const StackingPages = StickyPages;

export default StickyPages;
