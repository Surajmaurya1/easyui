'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface TraceNode {
  id: string;
  label: string;
  type?: 'service' | 'database' | 'api' | 'client';
  x?: number;
  y?: number;
}

export interface TraceConnection {
  from: string;
  to: string;
  label?: string;
  type?: string;
}

export interface DependencyTraceProps {
  /** Nodes in the dependency graph. */
  nodes: TraceNode[];
  /** Connection links between nodes. */
  connections: TraceConnection[];
  /** Selected node handler. */
  onNodeSelect?: (id: string) => void;
  /** Hovered node handler. */
  onNodeHover?: (id: string | null) => void;
  /** Radius/size of the node badge in pixels. Default is 36. */
  nodeSize?: number;
  /** Custom CSS class names. */
  className?: string;
}

export const DependencyTrace: React.FC<DependencyTraceProps> = ({
  nodes,
  connections,
  onNodeSelect,
  onNodeHover,
  nodeSize = 36,
  className,
}) => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Position nodes nicely on SVG canvas (hierarchical / circular layout)
  const positionedNodes = useMemo(() => {
    return nodes.map((node, i) => {
      if (node.x !== undefined && node.y !== undefined) return node;
      // Default radial positioning
      const total = nodes.length;
      if (total === 1) return { ...node, x: 200, y: 150 };
      const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
      const radiusX = 140;
      const radiusY = 80;
      return {
        ...node,
        x: 200 + radiusX * Math.cos(angle),
        y: 140 + radiusY * Math.sin(angle),
      };
    });
  }, [nodes]);

  const activeId = hoveredNodeId || selectedNodeId;

  // Set of node IDs connected to the currently active node
  const connectedNodeIds = useMemo(() => {
    if (!activeId) return new Set<string>();
    const ids = new Set<string>([activeId]);
    connections.forEach((conn) => {
      if (conn.from === activeId) ids.add(conn.to);
      if (conn.to === activeId) ids.add(conn.from);
    });
    return ids;
  }, [activeId, connections]);

  const handleHover = (id: string | null) => {
    setHoveredNodeId(id);
    if (onNodeHover) onNodeHover(id);
  };

  const handleSelect = (id: string) => {
    setSelectedNodeId(id === selectedNodeId ? null : id);
    if (onNodeSelect) onNodeSelect(id);
  };

  return (
    <div
      role="region"
      aria-label="Dependency Relationship Graph"
      className={cn(
        'relative w-full h-80 rounded-2xl bg-[#050505] border border-[#1F1F1F] overflow-hidden select-none flex items-center justify-center',
        className
      )}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 400 280"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Draw Connection Lines */}
        {connections.map((conn, idx) => {
          const fromNode = positionedNodes.find((n) => n.id === conn.from);
          const toNode = positionedNodes.find((n) => n.id === conn.to);
          if (!fromNode || !toNode || fromNode.x === undefined || fromNode.y === undefined || toNode.x === undefined || toNode.y === undefined) {
            return null;
          }

          const isConnected =
            activeId && (conn.from === activeId || conn.to === activeId);
          const isDimmed = activeId && !isConnected;

          // Bezier curve calculation
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;
          const pathD = `M ${fromNode.x} ${fromNode.y} Q ${midX} ${midY - 15} ${toNode.x} ${toNode.y}`;

          return (
            <g key={`${conn.from}-${conn.to}-${idx}`}>
              {/* Glow background line when active */}
              {isConnected && (
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.3)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}

              {/* Main SVG path */}
              <motion.path
                d={pathD}
                fill="none"
                stroke={isConnected ? '#3B82F6' : '#1F1F1F'}
                strokeWidth={isConnected ? '2.5' : '1.5'}
                strokeDasharray={isConnected ? 'none' : '4 4'}
                strokeLinecap="round"
                animate={{
                  opacity: isDimmed ? 0.2 : isConnected ? 1 : 0.7,
                }}
                transition={motionTransitions.springSnappy}
              />
            </g>
          );
        })}

        {/* Draw Nodes */}
        {positionedNodes.map((node) => {
          if (node.x === undefined || node.y === undefined) return null;
          const isCurrentActive = activeId === node.id;
          const isConnected = connectedNodeIds.has(node.id);
          const isDimmed = activeId !== null && !isConnected;

          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              onClick={() => handleSelect(node.id)}
              onMouseEnter={() => handleHover(node.id)}
              onMouseLeave={() => handleHover(null)}
              className="cursor-pointer"
            >
              {/* Outer glow ring on active */}
              {isCurrentActive && (
                <motion.circle
                  r={nodeSize / 2 + 6}
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.4)"
                  strokeWidth="2"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              )}

              {/* Node Circle Background */}
              <motion.circle
                r={nodeSize / 2}
                fill={isCurrentActive ? '#141414' : '#0E0E0E'}
                stroke={isCurrentActive ? '#3B82F6' : isConnected && activeId ? '#A1A1A1' : '#1F1F1F'}
                strokeWidth="1.5"
                animate={{
                  scale: isCurrentActive ? 1.15 : 1,
                  opacity: isDimmed ? 0.25 : 1,
                }}
                transition={motionTransitions.springSnappy}
              />

              {/* Node Label */}
              <motion.text
                textAnchor="middle"
                dy="3.5"
                className="text-[9px] font-mono font-medium pointer-events-none fill-[#FAFAFA]"
                animate={{
                  opacity: isDimmed ? 0.25 : 1,
                  fontWeight: isCurrentActive ? 700 : 500,
                }}
              >
                {node.label.length > 8 ? `${node.label.slice(0, 7)}…` : node.label}
              </motion.text>
            </g>
          );
        })}
      </svg>

      {/* Floating Status Bar */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#A1A1A1] bg-[#0E0E0E]/90 backdrop-blur px-3 py-1.5 rounded-lg border border-[#1F1F1F] pointer-events-none">
        <span>{activeId ? `Selected: ${activeId}` : 'Hover node to trace dependencies'}</span>
        <span>{connections.length} connections</span>
      </div>
    </div>
  );
};
