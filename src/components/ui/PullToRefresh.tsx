import React, { useState, useRef, useEffect, useCallback, useId } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion';
import { ArrowDown, RefreshCw, Check, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export type PullStatus = 'idle' | 'pulling' | 'ready' | 'refreshing' | 'complete';

export interface PullState {
  status: PullStatus;
  pullDistance: number;
  progress: number;
  threshold: number;
}

export interface FinancialDataPoint {
  value: number;
  displayValue: string;
  change: string;
  context: string;
  high?: string;
  low?: string;
  volume?: string;
  points: number[];
  timestamps?: string[];
}

export interface FinancialStatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Main formatted currency/stat value */
  mainValue?: string;
  /** Change percentage / delta text */
  change?: string;
  /** Context subtitle tag (e.g. "today", "last hour") */
  context?: string;
  /** Available time ranges */
  timeRanges?: string[];
  /** Currently selected time range */
  selectedTimeRange?: string;
  /** Callback when time range changes */
  onTimeRangeChange?: (range: string) => void;
  /** Custom data mapping per time range */
  dataMap?: Record<string, FinancialDataPoint>;
  /** External refreshing status flag */
  isRefreshing?: boolean;
  /** Whether to show the 24h High/Low/Volume micro stats row (default: true) */
  showMetrics?: boolean;
  /** Whether to show quick action buttons (default: false) */
  showActions?: boolean;
  /** Custom action buttons callback */
  onActionClick?: (action: 'deposit' | 'withdraw') => void;
  /** Custom wrapper class */
  className?: string;
}

export interface PullToRefreshProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Async or sync callback fired when pull passes threshold and is released */
  onRefresh?: () => Promise<void> | void;
  /** Pull threshold distance in pixels required to trigger refresh (default: 68) */
  threshold?: number;
  /** Maximum downward pull travel distance in pixels (default: 110) */
  maxPull?: number;
  /** Resistance elasticity multiplier (default: 0.45) */
  resistance?: number;
  /** Height in pixels to hold content at while refreshing (default: 48) */
  refreshingHoldOffset?: number;
  /** Disable the pull-to-refresh gesture */
  disabled?: boolean;
  /** Custom indicator renderer */
  pullIndicator?: (state: PullState) => React.ReactNode;
  /** Show the built-in minimal EasyUI indicator (default: true) */
  showDefaultIndicator?: boolean;
  /** Child content to be pulled. If omitted, renders the default financial statistics card */
  children?: React.ReactNode;
  /** Custom wrapper class name */
  className?: string;
}

/* =========================================================================
   DEFAULT FINANCIAL DATA & CHART CONFIGURATION
   ========================================================================= */

const DEFAULT_FINANCIAL_DATA: Record<string, FinancialDataPoint> = {
  '1H': {
    value: 58610.2,
    displayValue: '$58,610.20',
    change: '+340.50 · 0.6%',
    context: 'last hour',
    high: '$58,790.00',
    low: '$58,210.50',
    volume: '$240.5M',
    points: [35, 38, 42, 40, 48, 46, 54, 52, 60, 68, 72, 75],
    timestamps: ['11:00 AM', '11:05 AM', '11:10 AM', '11:15 AM', '11:20 AM', '11:25 AM', '11:30 AM', '11:35 AM', '11:40 AM', '11:45 AM', '11:50 AM', '12:00 PM'],
  },
  '4H': {
    value: 57980.4,
    displayValue: '$57,980.40',
    change: '+850.15 · 1.5%',
    context: 'last 4 hrs',
    high: '$58,450.00',
    low: '$56,920.00',
    volume: '$680.2M',
    points: [25, 28, 36, 32, 44, 42, 50, 48, 58, 64, 70, 78],
    timestamps: ['08:00 AM', '08:20 AM', '08:40 AM', '09:00 AM', '09:20 AM', '09:40 AM', '10:00 AM', '10:20 AM', '10:40 AM', '11:00 AM', '11:30 AM', '12:00 PM'],
  },
  '1D': {
    value: 58834.75,
    displayValue: '$58,834.75',
    change: '+1,204.60 · 2.1%',
    context: 'today',
    high: '$59,140.00',
    low: '$57,410.80',
    volume: '$1.42B',
    // Multi-crest wave climbing up to the top right endpoint
    points: [16, 20, 26, 24, 32, 36, 34, 52, 46, 60, 56, 62, 68, 80],
    timestamps: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '21:00', '22:00', '23:59'],
  },
};

/* =========================================================================
   SMOOTH BEZIER CURVE GENERATOR
   ========================================================================= */

function generateSmoothPath(
  data: number[],
  width = 320,
  height = 110,
  paddingX = 12,
  paddingY = 14
) {
  if (!data || data.length < 2) return { pathD: '', areaD: '', points: [], endpoint: { x: 0, y: 0 } };

  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal || 1;

  const usableWidth = width - paddingX * 2;
  const usableHeight = height - paddingY * 2;

  const points = data.map((val, i) => {
    const x = paddingX + (i / (data.length - 1)) * usableWidth;
    const normalizedY = (val - minVal) / range;
    const y = height - paddingY - normalizedY * usableHeight;
    return { x, y, raw: val };
  });

  let pathD = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    pathD += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  const lastPoint = points[points.length - 1];
  const areaD = `${pathD} L ${lastPoint.x.toFixed(1)} ${height} L ${points[0].x.toFixed(1)} ${height} Z`;

  return { pathD, areaD, points, endpoint: lastPoint };
}

/* =========================================================================
   FINANCIAL STATISTICS CARD COMPONENT (Light & Dark Mode + Interactive Scrub)
   ========================================================================= */

export const FinancialStatsCard: React.FC<FinancialStatsCardProps> = ({
  mainValue,
  change,
  context,
  timeRanges = ['1H', '4H', '1D'],
  selectedTimeRange: controlledRange,
  onTimeRangeChange,
  dataMap = DEFAULT_FINANCIAL_DATA,
  isRefreshing = false,
  showMetrics = true,
  showActions = false,
  onActionClick,
  className,
  ...props
}) => {
  const [internalRange, setInternalRange] = useState('1D');
  const activeRange = controlledRange || internalRange;
  const componentId = useId();
  const prefersReducedMotion = useReducedMotion();

  const [scrubIndex, setScrubIndex] = useState<number | null>(null);
  const chartRef = useRef<SVGSVGElement>(null);

  const currentData = dataMap[activeRange] || DEFAULT_FINANCIAL_DATA['1D'];
  const { pathD, areaD, points, endpoint } = generateSmoothPath(currentData.points, 320, 110, 12, 14);

  // Scrubber data calculations
  const activePoint = scrubIndex !== null && points[scrubIndex] ? points[scrubIndex] : endpoint;
  const activeTimestamp =
    scrubIndex !== null && currentData.timestamps?.[scrubIndex]
      ? currentData.timestamps[scrubIndex]
      : null;

  // Formatted display values
  let displayMain = mainValue || currentData.displayValue;
  let displayChange = change || currentData.change;
  let displayContext = activeTimestamp || context || currentData.context;

  if (scrubIndex !== null && currentData.points[scrubIndex] !== undefined) {
    const minP = Math.min(...currentData.points);
    const maxP = Math.max(...currentData.points);
    const rawVal = currentData.points[scrubIndex];
    const pct = (rawVal - minP) / (maxP - minP || 1);
    const interpolatedVal = currentData.value * (0.98 + pct * 0.04);
    displayMain = `$${interpolatedVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  // Split integer and decimal parts for authentic typography treatment ($58,834 .75)
  const [integerPart, decimalPart] = displayMain.includes('.')
    ? displayMain.split('.')
    : [displayMain, '00'];

  const handleRangeSelect = (range: string) => {
    setScrubIndex(null);
    if (controlledRange === undefined) {
      setInternalRange(range);
    }
    onTimeRangeChange?.(range);
  };

  // Pointer scrubbing handler on SVG chart surface
  const handleChartPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!chartRef.current || points.length === 0) return;
    const rect = chartRef.current.getBoundingClientRect();
    const relativeX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const fraction = relativeX / rect.width;
    const closestIdx = Math.round(fraction * (points.length - 1));
    setScrubIndex(Math.max(0, Math.min(points.length - 1, closestIdx)));
  };

  const handleChartPointerLeave = () => {
    setScrubIndex(null);
  };

  return (
    <div
      role="region"
      aria-label="Financial asset performance card"
      className={cn(
        'relative w-full max-w-[360px] select-none rounded-[28px]',
        'bg-white dark:bg-[#161616]',
        'border border-neutral-200/80 dark:border-[#262626]',
        'p-5 sm:p-6 text-neutral-900 dark:text-[#F5F5F5]',
        'shadow-[0_12px_36px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.55),0_2px_8px_rgba(0,0,0,0.3)]',
        'transition-colors duration-200 overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Top Header: Main Value & Change Metric */}
      <div className="flex flex-col items-start gap-1 mb-2">
        {/* Main Price / Balance Headline with soft Blur Crossfade on Update */}
        <div className="flex items-baseline font-sans tracking-tight relative overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={`val-${displayMain}`}
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: 3, filter: 'blur(2px)' }
              }
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -3, filter: 'blur(2px)' }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-baseline"
            >
              <span className="text-[34px] sm:text-[38px] font-bold leading-none text-neutral-900 dark:text-white tracking-[-0.03em]">
                {integerPart}
              </span>
              {decimalPart && (
                <span className="text-[24px] sm:text-[26px] font-semibold text-neutral-400 dark:text-[#8A8A8A] leading-none ml-0.5 tracking-[-0.02em]">
                  .{decimalPart}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Change Metric & Context Label */}
        <div className="flex items-center gap-1.5 text-[13px] font-medium leading-none">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={`change-${displayChange}`}
              initial={prefersReducedMotion ? false : { opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.18 }}
              className="text-emerald-600 dark:text-[#22c55e] tracking-tight font-medium"
            >
              {displayChange}
            </motion.span>
          </AnimatePresence>
          <span className="text-neutral-500 dark:text-[#6F6F6F] font-normal transition-colors">
            {displayContext}
          </span>
        </div>
      </div>

      {/* Smooth Line Chart Surface with Touch/Pointer Scrubbing */}
      <div className="relative w-full h-[116px] my-2 overflow-visible flex items-center justify-center touch-none">
        <svg
          ref={chartRef}
          viewBox="0 0 320 110"
          className="w-full h-full overflow-visible cursor-crosshair"
          preserveAspectRatio="none"
          aria-hidden="true"
          onPointerMove={handleChartPointerMove}
          onPointerLeave={handleChartPointerLeave}
        >
          {/* Subtle Glow Defs and Gradients */}
          <defs>
            <linearGradient id={`chart-grad-${componentId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.0" />
            </linearGradient>
            <filter id={`glow-${componentId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Subtle Fill Area under the curve */}
          {areaD && (
            <motion.path
              key={`area-${activeRange}`}
              d={areaD}
              fill={`url(#chart-grad-${componentId})`}
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          )}

          {/* Smooth Bezier Stroke Path */}
          {pathD && (
            <motion.path
              key={`path-${activeRange}-${displayMain}`}
              d={pathD}
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#glow-${componentId})`}
              initial={prefersReducedMotion ? false : { pathLength: 0.3, opacity: 0.6 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
              }
            />
          )}

          {/* Vertical Guide Line on Scrub */}
          {scrubIndex !== null && activePoint && (
            <line
              x1={activePoint.x}
              y1="0"
              x2={activePoint.x}
              y2="110"
              stroke="rgba(34, 197, 94, 0.35)"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />
          )}

          {/* Endpoint / Scrubbed Indicator Dot */}
          {activePoint && (
            <g>
              {/* Subtle ambient pulse ring during live refresh */}
              {isRefreshing && (
                <motion.circle
                  cx={activePoint.x}
                  cy={activePoint.y}
                  r="9"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="1.5"
                  initial={{ scale: 0.7, opacity: 0.9 }}
                  animate={{ scale: 1.7, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeOut' }}
                />
              )}

              {/* Core hollow endpoint ring */}
              <motion.circle
                key={`point-${activeRange}-${scrubIndex ?? 'end'}`}
                cx={activePoint.x}
                cy={activePoint.y}
                r={scrubIndex !== null ? '6' : '5.5'}
                className="fill-white dark:fill-[#161616]"
                stroke="#22c55e"
                strokeWidth="2.4"
                initial={prefersReducedMotion ? false : { scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={motionTransitions.springSnappy}
              />
            </g>
          )}
        </svg>
      </div>

      {/* Time Range Selector Tabs */}
      <div
        role="tablist"
        aria-label="Time range filters"
        className="flex items-center justify-between gap-2 mt-2 pt-1"
      >
        {timeRanges.map((range) => {
          const isSelected = activeRange === range;
          return (
            <button
              key={range}
              type="button"
              role="tab"
              aria-selected={isSelected}
              tabIndex={0}
              onClick={() => handleRangeSelect(range)}
              className={cn(
                'relative flex-1 py-1.5 px-3 rounded-full text-[13px] font-semibold tracking-wide select-none',
                'transition-colors duration-150 cursor-pointer focus-ring outline-none',
                isSelected
                  ? 'text-neutral-900 dark:text-white'
                  : 'text-neutral-500 dark:text-[#737373] hover:text-neutral-900 dark:hover:text-[#D4D4D4]'
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId={`timeRangePill-${componentId}`}
                  className="absolute inset-0 bg-neutral-100 dark:bg-[#282828] border border-neutral-300/80 dark:border-[#383838] rounded-full -z-10 shadow-xs"
                  transition={motionTransitions.springSnappy}
                />
              )}
              <span>{range}</span>
            </button>
          );
        })}
      </div>

      {/* Minimal Key Metrics Row (High / Low / Volume) */}
      {showMetrics && (
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-neutral-100 dark:border-[#242424] text-center">
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-medium text-neutral-400 dark:text-neutral-500 tracking-wider">
              24h High
            </span>
            <span className="text-[12px] font-medium text-neutral-800 dark:text-neutral-200 mt-0.5">
              {currentData.high || '$59,140.00'}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-medium text-neutral-400 dark:text-neutral-500 tracking-wider">
              24h Low
            </span>
            <span className="text-[12px] font-medium text-neutral-800 dark:text-neutral-200 mt-0.5">
              {currentData.low || '$57,410.80'}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-medium text-neutral-400 dark:text-neutral-500 tracking-wider">
              Volume
            </span>
            <span className="text-[12px] font-medium text-neutral-800 dark:text-neutral-200 mt-0.5">
              {currentData.volume || '$1.42B'}
            </span>
          </div>
        </div>
      )}

      {/* Optional Minimal Action Buttons */}
      {showActions && (
        <div className="flex items-center gap-2 mt-3.5 pt-2">
          <button
            type="button"
            onClick={() => onActionClick?.('deposit')}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold',
              'bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900',
              'transition-all duration-150 cursor-pointer shadow-xs active:scale-[0.98]'
            )}
          >
            <ArrowDownLeft className="w-3.5 h-3.5" />
            <span>Deposit</span>
          </button>
          <button
            type="button"
            onClick={() => onActionClick?.('withdraw')}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold',
              'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 dark:bg-[#252525] dark:hover:bg-[#303030] dark:text-neutral-200',
              'border border-neutral-200/80 dark:border-[#353535] transition-all duration-150 cursor-pointer active:scale-[0.98]'
            )}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Transfer</span>
          </button>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   PULL TO REFRESH CONTAINER COMPONENT
   ========================================================================= */

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  threshold = 68,
  maxPull = 110,
  resistance = 0.45,
  refreshingHoldOffset = 48,
  disabled = false,
  pullIndicator,
  showDefaultIndicator = true,
  children,
  className,
  ...props
}) => {
  const [status, setStatus] = useState<PullStatus>('idle');
  const [pullProgress, setPullProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startXRef = useRef(0);
  const startTimeRef = useRef(0);
  const currentPullYRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  // Internal simulated financial data update when default demo is refreshed
  const [demoValues, setDemoValues] = useState(DEFAULT_FINANCIAL_DATA);

  // Raw gesture target motion value
  const rawTranslateY = useMotionValue(0);

  // Physical critical-damped spring for liquid smoothness (eliminates touch sensor micro-jitter)
  const smoothTranslateY = useSpring(rawTranslateY, {
    stiffness: 380,
    damping: 28,
    mass: 0.65,
  });

  // Calculate damped non-linear pull distance (logarithmic resistance curve)
  const calculateDampedPull = useCallback(
    (rawDeltaY: number) => {
      if (rawDeltaY <= 0) return 0;
      const factor = 1 - Math.exp(-(rawDeltaY * resistance) / threshold);
      return Math.min(maxPull, maxPull * factor);
    },
    [maxPull, resistance, threshold]
  );

  // Execute refresh lifecycle routine
  const executeRefresh = useCallback(async () => {
    if (disabled || status === 'refreshing') return;

    setStatus('refreshing');
    setPullProgress(1);

    // Hold content at hold offset smoothly
    animate(rawTranslateY, refreshingHoldOffset, {
      type: 'spring',
      stiffness: 300,
      damping: 26,
      mass: 0.75,
    });

    try {
      if (onRefresh) {
        await onRefresh();
      } else {
        // Simulated network refresh with realistic delay
        await new Promise((resolve) => setTimeout(resolve, 1100));
        // Fluctuate prices realistically
        setDemoValues((prev) => {
          const deltaMultiplier = Math.random() * 0.035 - 0.012;
          const base1D = prev['1D'].value * (1 + deltaMultiplier);
          const changeVal = base1D - 57630.15;
          const changePct = (changeVal / 57630.15) * 100;
          return {
            ...prev,
            '1D': {
              ...prev['1D'],
              value: base1D,
              displayValue: `$${base1D.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              change: `+${changeVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} · ${changePct.toFixed(1)}%`,
              points: prev['1D'].points.map((p) =>
                Math.max(12, Math.min(92, p + (Math.random() * 6 - 3)))
              ),
            },
          };
        });
      }

      setStatus('complete');
      // Gentle settle in complete state
      await new Promise((resolve) => setTimeout(resolve, 380));
    } catch {
      setStatus('idle');
    } finally {
      // Soft physical snapback return to rest position
      animate(rawTranslateY, 0, {
        type: 'spring',
        stiffness: 260,
        damping: 28,
        mass: 0.85,
      });
      setStatus('idle');
      setPullProgress(0);
      currentPullYRef.current = 0;
    }
  }, [disabled, status, rawTranslateY, refreshingHoldOffset, onRefresh]);

  // Pointer / Touch Event Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || status === 'refreshing' || status === 'complete') return;

    // Check if target is inside an interactive tab button or scrub chart
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('svg.cursor-crosshair')) {
      return;
    }

    const scrollContainer = target.closest('[data-scrollable="true"]');
    if (scrollContainer && scrollContainer.scrollTop > 0) {
      return;
    }

    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    startXRef.current = e.clientX;
    startTimeRef.current = Date.now();
  };

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDraggingRef.current || disabled || status === 'refreshing' || status === 'complete') {
        return;
      }

      const deltaY = e.clientY - startYRef.current;
      const deltaX = e.clientX - startXRef.current;

      // Ignore horizontal swipes
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 12) {
        return;
      }

      if (deltaY > 0) {
        const dampedY = calculateDampedPull(deltaY);
        currentPullYRef.current = dampedY;
        rawTranslateY.set(dampedY);

        const progress = Math.min(1, dampedY / threshold);
        setPullProgress(progress);

        if (dampedY >= threshold) {
          if (status !== 'ready') setStatus('ready');
        } else {
          if (status !== 'pulling') setStatus('pulling');
        }
      } else {
        rawTranslateY.set(0);
        setPullProgress(0);
        if (status !== 'idle') setStatus('idle');
      }
    },
    [disabled, status, calculateDampedPull, threshold, rawTranslateY]
  );

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const timeDiff = Math.max(1, Date.now() - startTimeRef.current);
    const velocity = currentPullYRef.current / timeDiff;

    // Trigger refresh if threshold reached OR fast downward flick velocity achieved
    if (status === 'ready' || currentPullYRef.current >= threshold || velocity > 0.35) {
      executeRefresh();
    } else {
      // Smooth spring snap back to 0
      animate(rawTranslateY, 0, {
        type: 'spring',
        stiffness: 300,
        damping: 26,
        mass: 0.7,
      });
      setStatus('idle');
      setPullProgress(0);
      currentPullYRef.current = 0;
    }
  }, [status, threshold, executeRefresh, rawTranslateY]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => handlePointerMove(e);
    const onUp = () => handlePointerUp();

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  // Keyboard shortcut trigger
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'r' || e.key === 'R') && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      executeRefresh();
    }
  };

  const pullState: PullState = {
    status,
    pullDistance: currentPullYRef.current,
    progress: pullProgress,
    threshold,
  };

  // Transform opacity and scale for default indicator
  const indicatorOpacity = useTransform(
    rawTranslateY,
    [0, threshold * 0.3, threshold],
    [0, 0.75, 1]
  );
  const indicatorScale = useTransform(rawTranslateY, [0, threshold], [0.75, 1]);

  // Circumference for circular progress ring (radius = 6.5 -> 2 * PI * 6.5 ≈ 40.8)
  const ringCircumference = 40.8;
  const strokeDashoffset = ringCircumference * (1 - Math.min(1, pullProgress));

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="region"
      aria-label="Pull to refresh panel. Press R to refresh when focused."
      aria-busy={status === 'refreshing'}
      className={cn(
        'relative isolate flex flex-col items-center justify-start',
        'w-full max-w-sm select-none touch-pan-y outline-none',
        disabled ? 'cursor-default' : 'cursor-grab active:cursor-grabbing',
        className
      )}
      {...props}
    >
      {/* Top Floating Refresh Pill Indicator (Seamless Light & Dark Mode) */}
      {showDefaultIndicator && !pullIndicator && (
        <motion.div
          aria-hidden="true"
          style={{
            opacity: status === 'refreshing' || status === 'complete' ? 1 : indicatorOpacity,
            scale: status === 'refreshing' || status === 'complete' ? 1 : indicatorScale,
          }}
          className="absolute -top-11 left-0 right-0 h-10 flex items-center justify-center pointer-events-none z-20"
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-[#1E1E1E]/95 backdrop-blur-md border border-neutral-200/90 dark:border-[#303030] shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.45)] text-neutral-800 dark:text-[#F5F5F5] text-xs font-medium transition-colors">
            <AnimatePresence mode="wait">
              {status === 'refreshing' ? (
                <motion.div
                  key="refreshing"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 flex items-center justify-center text-emerald-600 dark:text-emerald-400"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </motion.div>
              ) : status === 'complete' ? (
                <motion.div
                  key="complete"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={motionTransitions.springSnappy}
                  className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400"
                >
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </motion.div>
              ) : (
                /* Circular Pull Progress Arc with Center Arrow */
                <div key="progress-ring" className="relative w-4 h-4 flex items-center justify-center">
                  <svg className="w-4 h-4 -rotate-90">
                    <circle
                      cx="8"
                      cy="8"
                      r="6.5"
                      stroke="currentColor"
                      className="text-neutral-200 dark:text-white/15"
                      strokeWidth="1.6"
                      fill="none"
                    />
                    <motion.circle
                      cx="8"
                      cy="8"
                      r="6.5"
                      stroke="#22c55e"
                      strokeWidth="1.8"
                      fill="none"
                      strokeDasharray={ringCircumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  <motion.div
                    animate={{ rotate: status === 'ready' ? 180 : 0 }}
                    transition={motionTransitions.springSnappy}
                    className="absolute inset-0 flex items-center justify-center text-neutral-400 dark:text-[#A3A3A3]"
                  >
                    <ArrowDown className="w-2.5 h-2.5" />
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            <span className="text-[11px] font-sans tracking-tight text-neutral-600 dark:text-[#D4D4D4]">
              {status === 'refreshing'
                ? 'Refreshing...'
                : status === 'complete'
                ? 'Updated'
                : status === 'ready'
                ? 'Release to refresh'
                : 'Pull to refresh'}
            </span>
          </div>
        </motion.div>
      )}

      {/* Custom Indicator Slot */}
      {pullIndicator && pullIndicator(pullState)}

      {/* Draggable Card Content Body Driven by Mass Spring */}
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : smoothTranslateY }}
        className="w-full relative z-10 will-change-transform"
      >
        {children || (
          <FinancialStatsCard
            dataMap={demoValues}
            isRefreshing={status === 'refreshing'}
            showMetrics
          />
        )}
      </motion.div>

      {/* Accessible screen-reader fallback button */}
      <button
        type="button"
        onClick={executeRefresh}
        disabled={disabled || status === 'refreshing'}
        className="sr-only"
      >
        Refresh financial statistics
      </button>
    </div>
  );
};

export default PullToRefresh;
