/**
 * Default number of items per page for the dedicated components page.
 */
export const ITEMS_PER_PAGE = 10;

/**
 * @deprecated The homepage now uses `getFeaturedComponents()` instead of a numeric limit.
 * Kept for backwards compatibility with any external references.
 */
export const FEATURED_COMPONENT_LIMIT = 9;

/**
 * The ordered list of component IDs that appear in the homepage showcase.
 * The order here determines display order on the homepage.
 */
export const FEATURED_COMPONENT_IDS: readonly string[] = [
  'draw-checkbox',
  'lock-input',
  'origin-dropdown',
  'slide-pagination',
  'unfold-accordion',
  'liquid-toggle',
  'gooey-menu',
  'pill-navigation',
  'neon-edge-button',
] as const;

/**
 * Returns the curated set of featured homepage components.
 *
 * Priority: components with `featured: true` in the registry, sorted by the
 * canonical FEATURED_COMPONENT_IDS order so the homepage always renders in
 * the intended sequence.
 *
 * To feature a component in the future, set `featured: true` in its
 * `.meta.ts` file and add its ID to FEATURED_COMPONENT_IDS above.
 */
export function getFeaturedComponents<T extends { id: string }>(components: T[]): T[] {
  const byId = new Map<string, T>(components.map((c) => [c.id, c]));
  return FEATURED_COMPONENT_IDS.reduce<T[]>((acc, id) => {
    const comp = byId.get(id);
    if (comp) acc.push(comp);
    return acc;
  }, []);
}

export const NEW_BADGE_DURATION_DAYS = 7;
export const NEW_BADGE_DURATION_MS = NEW_BADGE_DURATION_DAYS * 24 * 60 * 60 * 1000;

/**
 * Returns all components sorted by creation date descending (newest first).
 * Stable secondary sort on component name for identical timestamps.
 */
export function getSortedComponents<T extends { createdAt: string; name: string }>(components: T[]): T[] {
  return [...components].sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    if (timeB !== timeA) {
      return timeB - timeA;
    }
    return a.name.localeCompare(b.name);
  });
}

/**
 * Resolves the single newest component from the collection based on createdAt.
 */
export function getNewestComponent<T extends { createdAt: string; name: string }>(components: T[]): T | null {
  if (!components || components.length === 0) return null;
  const sorted = getSortedComponents(components);
  return sorted[0] || null;
}

/**
 * Determines whether a given component qualifies for the NEW badge.
 * A component is considered NEW if its creation/publish date is within the last 7 days (604,800,000 ms).
 * Calculation is strictly per-component based on its own timestamp and does not depend on repository pushes or global commit dates.
 *
 * @param component Component metadata object containing createdAt timestamp
 * @param referenceTime Optional reference date/timestamp for deterministic calculation / testing (defaults to Date.now())
 */
export function isComponentNew(
  component: { createdAt?: string } | null | undefined,
  referenceTime?: Date | number | unknown
): boolean {
  if (!component || !component.createdAt) return false;
  const createdTime = new Date(component.createdAt).getTime();
  if (isNaN(createdTime)) return false;

  let nowTime = Date.now();
  if (typeof referenceTime === 'number') {
    nowTime = referenceTime;
  } else if (referenceTime instanceof Date) {
    nowTime = referenceTime.getTime();
  }

  if (isNaN(nowTime)) return false;
  const age = nowTime - createdTime;

  // Component must have been created in the past (or present) and within 7 days
  return age >= 0 && age < NEW_BADGE_DURATION_MS;
}

export interface PaginatedResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Slices a component array into a paginated subset.
 */
export function getPaginatedComponents<T>(
  components: T[],
  page = 1,
  pageSize = ITEMS_PER_PAGE
): PaginatedResult<T> {
  const totalItems = components.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(Math.max(1, Math.floor(page) || 1), totalPages);

  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const items = components.slice(startIndex, endIndex);

  return {
    items,
    currentPage: safeCurrentPage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    hasNextPage: safeCurrentPage < totalPages,
    hasPreviousPage: safeCurrentPage > 1,
  };
}

/**
 * Generates an array of page numbers and ellipsis strings for responsive pagination navigation.
 * Example: [1, 2, 3, 4, 5] or [1, '...', 4, 5, 6, '...', 10]
 */
export function generatePaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount = 1
): (number | '...')[] {
  // If total pages is 7 or fewer, show all page numbers without ellipsis
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  // Case 1: No left dots, but right dots to show
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, '...', totalPages];
  }

  // Case 2: No right dots, but left dots to show
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [firstPageIndex, '...', ...rightRange];
  }

  // Case 3: Both left and right dots to show
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
  }

  return Array.from({ length: totalPages }, (_, i) => i + 1);
}
