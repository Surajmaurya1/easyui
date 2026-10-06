'use client';

import React, { useState, useMemo, useRef, useId } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Activity, Copy, Check } from 'lucide-react';
import { cn, copyToClipboard } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export type MetricTrend = 'up' | 'down' | 'neutral';

export interface MetricDelta {
  value: string;
  trend: MetricTrend;
  isPositiveGood?: boolean;
}

export interface MetricItem {
  id: string;
  label: string;
  value: string;
  unit?: string;
  delta: MetricDelta;
  timeSeries: Record<string, number[]>;
  status?: 'normal' | 'warning' | 'critical';
  description?: string;
}

export interface MetricHUDProps extends React.HTMLAttributes<HTMLDivElement> {
  metrics: MetricItem[];
  timeRanges?: string[];
  defaultTimeRange?: string;
  className?: string;
}

export const MetricHUD: React.FC<MetricHUDProps> = ({
  metrics = [],
  timeRanges = ['1h', '24h', '7d', '30d'],
  defaultTimeRange = '24h',
  className,
  ...props
}) => {
  const [selectedMetricId, setSelectedMetricId] = useState<string>(metrics[0]?.id || '');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>(defaultTimeRange);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const hudId = useId();

  const activeMetric = useMemo(() => {
    return metrics.find((m) => m.id === selectedMetricId) || metrics[0];
  }, [metrics, selectedMetricId]);

  const activeData = useMemo(() => {
    if (!activeMetric) return [];
    const series = activeMetric.timeSeries[selectedTimeRange];
    if (series && series.length > 0) return series;
    const firstKey = Object.keys(activeMetric.timeSeries)[0];
    return firstKey ? activeMetric.timeSeries[firstKey] : [];
  }, [activeMetric, selectedTimeRange]);

  const minVal = useMemo(() => Math.min(...activeData, 0), [activeData]);
  const maxVal = useMemo(() => Math.max(...activeData, 1), [activeData]);

  // Compute SVG smooth Path
  const { pathD, areaD, points } = useMemo(() => {
    if (activeData.length < 2) {
      return { pathD: '', areaD: '', points: [] };
    }

    const width = 400;
    const height = 120;
    const padding = 10;
    const usableHeight = height - padding * 2;
    const usableWidth = width - padding * 2;

    const pts = activeData.map((val, idx) => {
      const x = padding + (idx / (activeData.length - 1)) * usableWidth;
      const normalizedY = (val - minVal) / (maxVal - minVal || 1);
      const y = height - padding - normalizedY * usableHeight;
      return { x, y, val };
    });

    // Generate smooth cubic bezier SVG path
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }

    const area = `${d} L ${pts[pts.length - 1].x} 120 L ${pts[0].x} 120 Z`;

    return { pathD: d, areaD: area, points: pts };
  }, [activeData, minVal, maxVal]);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || points.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const relativeX = (clientX / rect.width) * 400;

    let closestIdx = 0;
    let closestDist = Infinity;
    points.forEach((pt, i) => {
      const dist = Math.abs(pt.x - relativeX);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }
    });

    setHoverIndex(closestIdx);
  };

  const handleCopyStat = (e: React.MouseEvent, val: string, id: string) => {
    e.stopPropagation();
    copyToClipboard(val);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderTrendIcon = (delta: MetricDelta) => {
    if (delta.trend === 'up') return <TrendingUp className="w-3 h-3" />;
    if (delta.trend === 'down') return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const getDeltaStyle = (delta: MetricDelta) => {
    const isGood = delta.isPositiveGood !== false;
    if (delta.trend === 'up') {
      return isGood
        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
        : 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    }
    if (delta.trend === 'down') {
      return isGood
        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
    return 'bg-[#181818] text-[#888888] border-[#252525]';
  };

  const getStatusIndicator = (status?: 'normal' | 'warning' | 'critical') => {
    switch (status) {
      case 'critical':
        return <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />;
      case 'warning':
        return <span className="w-2 h-2 rounded-full bg-amber-400" />;
      case 'normal':
      default:
        return <span className="w-2 h-2 rounded-full bg-emerald-400" />;
    }
  };

  const hoveredPoint = hoverIndex !== null && points[hoverIndex] ? points[hoverIndex] : null;

  return (
    <div
      role="region"
      aria-label="Developer telemetry and metrics HUD"
      className={cn(
        'w-full rounded-xl border border-[#1F1F1F] bg-[#0E0E0E] p-3.5 sm:p-5 text-[#FAFAFA] overflow-hidden',
        className
      )}
      {...props}
    >
      {/* HUD Header Bar: Title + Status + Time Range Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#1F1F1F]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#141414] border border-[#1F1F1F] flex items-center justify-center text-[#FAFAFA] shrink-0">
            <Activity className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-semibold text-[#FAFAFA]">System Telemetry HUD</h3>
              {getStatusIndicator(activeMetric?.status)}
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#6B6B6B]">Live hardware-accelerated telemetry telemetry</p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center p-0.5 bg-[#141414] rounded-lg border border-[#1F1F1F]">
          {timeRanges.map((range) => {
            const isSelected = selectedTimeRange === range;
            return (
              <button
                key={range}
                type="button"
                onClick={() => setSelectedTimeRange(range)}
                className={cn(
                  'relative py-1 px-2.5 text-[11px] font-mono rounded-md transition-colors cursor-pointer',
                  isSelected ? 'text-[#FAFAFA]' : 'text-[#6B6B6B] hover:text-[#A1A1A1]'
                )}
              >
                {isSelected && (
                  <motion.div
                    layoutId={`metricHudTimeTab-${hudId}`}
                    className="absolute inset-0 bg-[#0E0E0E] border border-[#1F1F1F] rounded-md -z-10"
                    transition={motionTransitions.springSnappy}
                  />
                )}
                <span>{range}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
        {metrics.map((m) => {
          const isSelected = selectedMetricId === m.id;
          return (
            <div
              key={m.id}
              onClick={() => setSelectedMetricId(m.id)}
              className={cn(
                'p-3 rounded-lg border transition-all cursor-pointer relative flex flex-col justify-between',
                isSelected
                  ? 'bg-[#141414] border-[#3B82F6]/60 shadow-xs ring-1 ring-[#3B82F6]/20'
                  : 'bg-[#0E0E0E] border-[#1F1F1F] hover:border-[#4A4A4A] hover:bg-[#141414]'
              )}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] text-[#A1A1A1] font-medium truncate">{m.label}</span>
                <button
                  type="button"
                  onClick={(e) => handleCopyStat(e, `${m.value} ${m.unit || ''}`, m.id)}
                  className="text-[#525252] hover:text-white p-0.5 cursor-pointer"
                  title="Copy value"
                >
                  {copiedId === m.id ? (
                    <Check className="w-3 h-3 text-white" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>

              <div className="flex items-baseline justify-between gap-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg sm:text-xl font-bold font-mono text-[#FAFAFA]">{m.value}</span>
                  {m.unit && <span className="text-[10px] font-mono text-[#6B6B6B]">{m.unit}</span>}
                </div>

                <span
                  className={cn(
                    'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono border',
                    getDeltaStyle(m.delta)
                  )}
                >
                  {renderTrendIcon(m.delta)}
                  <span>{m.delta.value}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Interactive SVG Sparkline HUD Surface */}
      {activeMetric && (
        <div className="rounded-lg border border-[#1F1F1F] bg-[#050505] p-3 sm:p-3.5 relative">
          {/* Sparkline Header & Scrub value display */}
          <div className="flex items-center justify-between mb-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[#FAFAFA] text-xs font-semibold">{activeMetric.label}</span>
              <span className="text-[#6B6B6B] text-[11px] font-mono">({selectedTimeRange})</span>
            </div>

            <div className="text-right font-mono">
              {hoveredPoint ? (
                <span className="text-[#FAFAFA] text-[11px] font-semibold bg-[#141414] px-2 py-0.5 rounded border border-[#1F1F1F]">
                  Indexed: {hoveredPoint.val.toFixed(1)} {activeMetric.unit || ''}
                </span>
              ) : (
                <span className="text-[10px] text-[#6B6B6B]">
                  Hover canvas to inspect timeline values
                </span>
              )}
            </div>
          </div>

          {/* SVG Sparkline Surface */}
          <div className="relative w-full h-[100px] sm:h-[110px] flex items-center justify-center">
            <svg
              ref={svgRef}
              viewBox="0 0 400 120"
              className="w-full h-full cursor-crosshair overflow-visible"
              preserveAspectRatio="none"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <defs>
                <linearGradient id={`grad-${hudId}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area Under Curve */}
              {areaD && <path d={areaD} fill={`url(#grad-${hudId})`} />}

              {/* Stroke Path with Motion */}
              {pathD && (
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={motionTransitions.springGentle}
                />
              )}

              {/* Interactive Scrub Hover Line and Indicator Dot */}
              {hoveredPoint && (
                <g>
                  {/* Vertical Guide Line */}
                  <line
                    x1={hoveredPoint.x}
                    y1="0"
                    x2={hoveredPoint.x}
                    y2="120"
                    stroke="#4A4A4A"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  {/* Outer Pulsing Dot */}
                  <circle
                    cx={hoveredPoint.x}
                    cy={hoveredPoint.y}
                    r="6"
                    fill="rgba(59, 130, 246, 0.2)"
                  />
                  {/* Core White Dot */}
                  <circle
                    cx={hoveredPoint.x}
                    cy={hoveredPoint.y}
                    r="3.5"
                    fill="#3B82F6"
                    stroke="#050505"
                    strokeWidth="1.5"
                  />
                </g>
              )}
            </svg>
          </div>

          {/* Min & Max Labels */}
          <div className="flex items-center justify-between pt-2 border-t border-[#1F1F1F] text-[10px] font-mono text-[#6B6B6B]">
            <span>Min: {minVal.toFixed(1)}</span>
            <span>Max: {maxVal.toFixed(1)}</span>
          </div>
        </div>
      )}
    </div>
  );
};
