import React, { useState, useRef } from 'react';
import {
  Play,
  RotateCw,
  Sparkles,
  Check,
  Cpu,
  Layers,
  MoveDown,
  MoveUp,
  ArrowRight,
} from 'lucide-react';
import { cn } from '../../../lib/utils';

// Import our new components
import {
  AIResponse,
  AIResponseHeader,
  AIResponseContent,
  AIResponseSources,
  AIResponseToolsSummary,
  AIResponseActions,
  type AIResponseStatus,
} from '../../ui/AIResponse';
import {
  AdvancedDataTable,
  type ColumnDef,
} from '../../ui/AdvancedDataTable';
import {
  Chat,
  type ChatMessageItem,
  type ChatConversationThread,
} from '../../ui/Chat';
import {
  AIAgentActivity,
  type AgentActivityItemData,
} from '../../ui/AIAgentActivity';
import { DotShader } from '../../ui/DotShader';
import {
  GlitchText,
  type GlitchVariant,
  type GlitchIntensity,
  type GlitchTrigger,
} from '../../ui/GlitchText';
import { Meteors } from '../../ui/Meteors';
import {
  RainbowButton,
  type RainbowButtonVariant,
  type RainbowButtonSize,
} from '../../ui/RainbowButton';
import { ScrollVelocityText } from '../../ui/Scrollvelocitytext';
import { ShootingStars } from '../../ui/ShootingStars';
import {
  SparklesCore,
  type SparkleShape,
  type SparkleCursorMode,
} from '../../ui/SparklesCore';

// =============================================================================
// 1. AI RESPONSE LIVE SHOWCASE
// =============================================================================

const SAMPLE_RESPONSE_MARKDOWN = `# Component Analysis & Optimization

Based on the verified codebase audit, here is the recommended architecture for **EasyUI** motion integration:

> All spring transitions must be imported directly from the unified motion tokens file to maintain 60fps hardware acceleration and physical consistency.

### Implementation Example

\`\`\`typescript
import { motionTransitions } from '@/lib/motion-tokens';

export const cardAnimation = {
  whileHover: { scale: 1.02, y: -2 },
  transition: motionTransitions.springSnappy,
};
\`\`\`

### Verification Checklist
- Respects \`prefers-reduced-motion\` media queries.
- Utilizes CSS variables for zero-flash dark and light theme switching.
- Standardized accessible focus-visible rings with 2px offset.

Feel free to request a custom benchmark or bundle size breakdown.`;

export const AIResponseLiveShowcase: React.FC = () => {
  const [status, setStatus] = useState<AIResponseStatus>('complete');
  const [modelName] = useState('Claude 3.7 Sonnet');
  const [content, setContent] = useState(SAMPLE_RESPONSE_MARKDOWN);
  const [showSources] = useState(true);

  const simulateStream = () => {
    setStatus('generating');
    setContent('');
    setTimeout(() => {
      setStatus('streaming');
      let currentLength = 0;
      const fullText = SAMPLE_RESPONSE_MARKDOWN;
      const interval = setInterval(() => {
        currentLength += 28;
        if (currentLength >= fullText.length) {
          setContent(fullText);
          setStatus('complete');
          clearInterval(interval);
        } else {
          setContent(fullText.slice(0, currentLength));
        }
      }, 50);
    }, 600);
  };

  const sampleSources = [
    {
      id: 1,
      title: 'EasyUI Motion System Documentation',
      url: 'https://github.com/Surajmaurya1/easyui',
      snippet: 'Specifications for springSnappy, springGentle, and hardware-accelerated physics.',
      sourceType: 'doc',
    },
    {
      id: 2,
      title: 'tokens.css — Color Token Architecture',
      url: 'https://github.com/Surajmaurya1/easyui',
      snippet: 'Theme-agnostic CSS variables: --bg, --surface, --border, --text-primary.',
      sourceType: 'github',
    },
    {
      id: 3,
      title: 'W3C Web Content Accessibility Guidelines (WCAG 2.2)',
      url: 'https://www.w3.org/WAI/standards-guidelines/wcag/',
      snippet: 'Focus visible criteria, color contrast ratios, and reduced motion guidance.',
      sourceType: 'web',
    },
  ];

  return (
    <div
      style={{ fontFamily: "var(--font-sans, 'Geist', sans-serif)" }}
      className="w-full max-w-2xl mx-auto flex flex-col gap-4 sm:gap-6 py-2 sm:py-6 font-sans"
    >
      {/* Interactive Control Deck */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-border/60 bg-surface/40 text-xs font-sans">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground font-normal">State:</span>
          {(['complete', 'streaming', 'generating', 'error'] as AIResponseStatus[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                if (s === 'streaming') simulateStream();
                else {
                  setStatus(s);
                  if (s === 'complete') setContent(SAMPLE_RESPONSE_MARKDOWN);
                  if (s === 'error') setContent('Rate limit exceeded: Please wait 12s before re-requesting.');
                }
              }}
              className={cn(
                'px-2.5 py-1 rounded-md text-xs font-normal transition-colors cursor-pointer capitalize',
                status === s
                  ? 'bg-foreground text-background font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface-hover'
              )}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={simulateStream}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/70 hover:bg-surface-hover text-foreground text-xs font-medium transition-colors cursor-pointer"
          >
            <RotateCw className="w-3 h-3" />
            <span>Simulate Stream</span>
          </button>
        </div>
      </div>

      {/* AI Response Card */}
      <AIResponse
        status={status}
        content={content}
        modelName={modelName}
        sources={showSources ? sampleSources : []}
        onRegenerate={simulateStream}
      >
        <AIResponseHeader modelBadge={modelName} timestamp="Just now" />
        <AIResponseToolsSummary
          toolCount={3}
          tools={[
            { name: 'read_codebase_tokens', duration: '42ms' },
            { name: 'verify_wcag_contrast', duration: '88ms' },
            { name: 'generate_motion_spec', duration: '120ms' },
          ]}
        />
        <AIResponseContent />
        {showSources && <AIResponseSources sources={sampleSources} defaultExpanded={true} />}
        <AIResponseActions />
      </AIResponse>
    </div>
  );
};

// =============================================================================
// 2. ADVANCED DATA TABLE LIVE SHOWCASE
// =============================================================================

interface ComponentRecord {
  id: string;
  name: string;
  category: 'Motion' | 'AI' | 'Interactive' | 'Form' | 'Layout';
  status: 'Stable' | 'New' | 'Beta';
  downloads: string;
  bundleSize: string;
  rating: number;
  author: string;
  dependencies: string[];
}

const SAMPLE_COMPONENTS_DATA: ComponentRecord[] = [
  {
    id: 'comp_01',
    name: 'AI Response',
    category: 'AI',
    status: 'New',
    downloads: '14,280',
    bundleSize: '3.4 KB',
    rating: 4.9,
    author: 'EasyUI Core',
    dependencies: ['framer-motion', 'lucide-react'],
  },
  {
    id: 'comp_02',
    name: 'Advanced Data Table',
    category: 'Interactive',
    status: 'New',
    downloads: '18,920',
    bundleSize: '4.8 KB',
    rating: 5.0,
    author: 'EasyUI Core',
    dependencies: ['framer-motion', 'lucide-react'],
  },
  {
    id: 'comp_03',
    name: 'Chat',
    category: 'AI',
    status: 'New',
    downloads: '12,450',
    bundleSize: '4.1 KB',
    rating: 4.9,
    author: 'EasyUI Core',
    dependencies: ['framer-motion', 'lucide-react'],
  },
  {
    id: 'comp_04',
    name: 'AI Agent Activity',
    category: 'AI',
    status: 'New',
    downloads: '9,830',
    bundleSize: '3.1 KB',
    rating: 4.8,
    author: 'EasyUI Core',
    dependencies: ['framer-motion', 'lucide-react'],
  },
  {
    id: 'comp_05',
    name: 'Magnetic Button',
    category: 'Motion',
    status: 'Stable',
    downloads: '42,100',
    bundleSize: '1.8 KB',
    rating: 4.9,
    author: 'Design Systems Lab',
    dependencies: ['framer-motion'],
  },
  {
    id: 'comp_06',
    name: 'Spotlight Card',
    category: 'Motion',
    status: 'Stable',
    downloads: '38,400',
    bundleSize: '1.5 KB',
    rating: 4.8,
    author: 'Design Systems Lab',
    dependencies: ['framer-motion'],
  },
  {
    id: 'comp_07',
    name: 'Morphing Dialog',
    category: 'Interactive',
    status: 'Stable',
    downloads: '29,300',
    bundleSize: '2.6 KB',
    rating: 4.9,
    author: 'EasyUI Core',
    dependencies: ['framer-motion', 'lucide-react'],
  },
  {
    id: 'comp_08',
    name: 'Interactive Timeline',
    category: 'Interactive',
    status: 'Stable',
    downloads: '24,100',
    bundleSize: '3.8 KB',
    rating: 4.7,
    author: 'DevOps Tooling',
    dependencies: ['framer-motion', 'lucide-react'],
  },
  {
    id: 'comp_09',
    name: 'Animated Tabs',
    category: 'Layout',
    status: 'Stable',
    downloads: '51,200',
    bundleSize: '1.4 KB',
    rating: 5.0,
    author: 'EasyUI Core',
    dependencies: ['framer-motion'],
  },
  {
    id: 'comp_10',
    name: 'Notification Stack',
    category: 'Interactive',
    status: 'Stable',
    downloads: '31,800',
    bundleSize: '2.9 KB',
    rating: 4.8,
    author: 'Design Systems Lab',
    dependencies: ['framer-motion', 'lucide-react'],
  },
  {
    id: 'comp_11',
    name: 'Floating Action Dock',
    category: 'Layout',
    status: 'Stable',
    downloads: '22,400',
    bundleSize: '2.2 KB',
    rating: 4.7,
    author: 'Apple HIG Concepts',
    dependencies: ['framer-motion'],
  },
  {
    id: 'comp_12',
    name: 'Origin Dropdown',
    category: 'Form',
    status: 'Beta',
    downloads: '16,700',
    bundleSize: '2.5 KB',
    rating: 4.6,
    author: 'Form Primitives',
    dependencies: ['framer-motion', 'lucide-react'],
  },
];

export const AdvancedDataTableLiveShowcase: React.FC = () => {
  const [data, setData] = useState<ComponentRecord[]>(SAMPLE_COMPONENTS_DATA);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const columns: ColumnDef<ComponentRecord>[] = [
    {
      id: 'name',
      header: 'Component',
      accessorKey: 'name',
      sortable: true,
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <span className="font-medium text-foreground">{row.name}</span>
          {row.status === 'New' && (
            <span className="px-2 py-0.5 text-[11px] rounded-full bg-surface-raised/60 text-muted-foreground border border-border/50 font-normal">
              New
            </span>
          )}
        </div>
      ),
    },
    {
      id: 'category',
      header: 'Category',
      accessorKey: 'category',
      sortable: true,
      filterable: true,
      filterOptions: [
        { label: 'Motion', value: 'Motion' },
        { label: 'AI', value: 'AI' },
        { label: 'Interactive', value: 'Interactive' },
        { label: 'Layout', value: 'Layout' },
        { label: 'Form', value: 'Form' },
      ],
      cell: ({ value }) => (
        <span className="text-muted-foreground font-normal">
          {value}
        </span>
      ),
    },
    {
      id: 'downloads',
      header: 'Weekly Installs',
      accessorKey: 'downloads',
      sortable: true,
      align: 'right',
      cell: ({ value }) => <span className="tabular-nums text-foreground/85 font-normal">{value}</span>,
    },
    {
      id: 'bundleSize',
      header: 'Gzip Size',
      accessorKey: 'bundleSize',
      sortable: true,
      align: 'right',
      cell: ({ value }) => <span className="tabular-nums text-muted-foreground font-normal">{value}</span>,
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      filterable: true,
      filterOptions: [
        { label: 'Stable', value: 'Stable' },
        { label: 'New', value: 'New' },
        { label: 'Beta', value: 'Beta' },
      ],
      cell: ({ value }) => {
        const isStable = value === 'Stable';
        const isNew = value === 'New';
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-normal">
            <span
              className={cn(
                'w-1.5 h-1.5 rounded-full',
                isStable ? 'bg-emerald-500' : isNew ? 'bg-foreground' : 'bg-amber-500'
              )}
            />
            {value}
          </span>
        );
      },
    },
  ];

  const handleBulkDelete = (ids: string[]) => {
    setData((prev) => prev.filter((item) => !ids.includes(item.id)));
    setActionMessage(`Removed ${ids.length} selected record(s) from table.`);
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleBulkExport = (ids: string[]) => {
    const selected = data.filter((d) => ids.includes(d.id));
    setActionMessage(`Exported ${selected.length} records as JSON payload.`);
    setTimeout(() => setActionMessage(null), 3000);
  };

  return (
    <div
      style={{ fontFamily: "var(--font-sans, 'Geist', sans-serif)" }}
      className="w-full max-w-4xl mx-auto space-y-3 sm:space-y-4 py-2 sm:py-6 font-sans"
    >
      {actionMessage && (
        <div className="p-3 rounded-lg border border-border/60 bg-surface/50 text-xs text-foreground flex items-center gap-2 font-sans">
          <Check className="w-3.5 h-3.5 text-emerald-500" />
          <span>{actionMessage}</span>
        </div>
      )}

      <AdvancedDataTable
        title="Component Registry"
        data={data}
        columns={columns}
        defaultPageSize={5}
        onBulkDelete={handleBulkDelete}
        onBulkExport={handleBulkExport}
        renderSubComponent={(row) => (
          <div className="p-4 rounded-xl border border-border/50 bg-surface-raised/20 space-y-3 text-xs font-sans">
            <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
              <span className="font-medium text-foreground">
                {row.name} Specifications
              </span>
              <span className="text-xs text-muted-foreground font-normal">Author: {row.author}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-surface/40 border border-border/40">
                <div className="text-xs text-muted-foreground font-normal">Tree-shake efficiency</div>
                <div className="text-sm font-medium text-foreground tabular-nums mt-1">99.4%</div>
              </div>
              <div className="p-3 rounded-lg bg-surface/40 border border-border/40">
                <div className="text-xs text-muted-foreground font-normal">Dependencies</div>
                <div className="text-xs text-foreground/80 mt-1 truncate">
                  {row.dependencies.join(', ')}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-surface/40 border border-border/40">
                <div className="text-xs text-muted-foreground font-normal">Verification</div>
                <div className="text-sm font-medium text-foreground mt-1">100% Verified</div>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
};

// =============================================================================
// 3. CHAT LIVE SHOWCASE
// =============================================================================

const INITIAL_CHAT_MESSAGES: ChatMessageItem[] = [
  {
    id: 'msg-1',
    role: 'user',
    content: 'Can you show me how to compose an accessible data table in EasyUI?',
    author: 'Alex',
    timestamp: '10:41 AM',
    status: 'delivered',
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content: `Certainly! EasyUI provides a fully compound \`<DataTable>\` component with sorting, searching, selection, and responsive pagination:

\`\`\`tsx
<DataTable data={users} columns={columns}>
  <DataTableToolbar title="Team Directory" />
  <DataTableFilters />
  <DataTableContent />
  <DataTablePagination />
</DataTable>
\`\`\`

It adheres to strict monochromatic styling and supports full keyboard navigation out of the box.`,
    author: 'EasyAI Assistant',
    timestamp: '10:42 AM',
    status: 'delivered',
  },
];

const INITIAL_THREADS: ChatConversationThread[] = [
  { id: 't-1', title: 'Data Table Architecture', timestamp: '10:40 AM', group: 'Today' },
  { id: 't-2', title: 'Framer Motion Spring Tokens', timestamp: 'Yesterday', group: 'Yesterday' },
  { id: 't-3', title: 'Accessibility (WCAG) Audit', timestamp: '2 days ago', group: 'Previous' },
];

export const ChatLiveShowcase: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageItem[]>(INITIAL_CHAT_MESSAGES);
  const [threads, setThreads] = useState<ChatConversationThread[]>(INITIAL_THREADS);
  const [activeThreadId, setActiveThreadId] = useState('t-1');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSendMessage = (text: string, attachments?: any[]) => {
    const userMsg: ChatMessageItem = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      author: 'You',
      timestamp: 'Just now',
      status: 'sent',
      attachments: attachments?.map((a) => ({ id: a.id, name: a.name, size: a.size, type: a.type })),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsGenerating(true);

    // Simulate realistic AI reply
    setTimeout(() => {
      const botMsg: ChatMessageItem = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: `Acknowledged! I received your instruction regarding: "${text.slice(0, 40)}${text.length > 40 ? '...' : ''}". The EasyUI component library has synchronized these updates with zero breaking changes.`,
        author: 'EasyAI Assistant',
        timestamp: 'Just now',
        status: 'delivered',
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsGenerating(false);
    }, 1200);
  };

  const handleNewChat = () => {
    const newThreadId = `t-${Date.now()}`;
    const newThread: ChatConversationThread = {
      id: newThreadId,
      title: 'New Conversation',
      timestamp: 'Just now',
      group: 'Today',
    };
    setThreads((prev) => [newThread, ...prev]);
    setActiveThreadId(newThreadId);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: 'Hello! I am your EasyUI assistant. How can I assist you with your component design today?',
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-1 sm:py-0">
      <Chat
        messages={messages}
        onSendMessage={handleSendMessage}
        isGenerating={isGenerating}
        threads={threads}
        activeThreadId={activeThreadId}
        onSelectThread={(id) => setActiveThreadId(id)}
        onNewChat={handleNewChat}
        onClearChat={() => setMessages([])}
      />
    </div>
  );
};

// =============================================================================
// 4. AI AGENT ACTIVITY LIVE SHOWCASE
// =============================================================================

const INITIAL_ACTIVITIES: AgentActivityItemData[] = [
  {
    id: 'act-1',
    type: 'thinking',
    title: 'Analyze request',
    description: 'Resolve intent, dependencies, and token references.',
    status: 'success',
    duration: '42ms',
    details: {
      input: { query: 'Build a minimal agent activity timeline' },
      output: { status: 'Verified', steps: 5 },
    },
  },
  {
    id: 'act-2',
    type: 'searching',
    title: 'Search tokens',
    description: 'Resolve design tokens for border, surface, and motion.',
    status: 'success',
    duration: '94ms',
    details: {
      input: 'border, surface, radius, typography',
      output: { font: 'Geist', spacing: 'spacious' },
    },
  },
  {
    id: 'act-3',
    type: 'database_query',
    title: 'Check registry',
    description: 'Verify component schema against local catalog.',
    status: 'success',
    duration: '142ms',
    details: {
      input: { table: 'components', id: 'ai-agent-activity' },
      output: { collision: false, status: 'Ready' },
    },
  },
  {
    id: 'act-4',
    type: 'code_execution',
    title: 'Type check',
    description: 'Validate TypeScript types and strict null checks.',
    status: 'success',
    duration: '310ms',
    details: {
      codeSnippet: `export interface AgentActivityItemData {
  id: string;
  title: string;
  status: 'pending' | 'running' | 'success';
  duration?: string;
}`,
      language: 'typescript',
      output: { errors: 0, warnings: 0 },
    },
  },
  {
    id: 'act-5',
    type: 'tool_execution',
    title: 'Generate output',
    description: 'Format output and render interactive view.',
    status: 'running',
    duration: 'Active',
  },
];

export const AIAgentActivityLiveShowcase: React.FC = () => {
  const [activities, setActivities] = useState<AgentActivityItemData[]>(INITIAL_ACTIVITIES);
  const [isRunning, setIsRunning] = useState(true);

  const handleRestart = () => {
    setIsRunning(true);
    setActivities(
      INITIAL_ACTIVITIES.map((a, i) => ({
        ...a,
        status: i === 0 ? 'running' : 'pending',
      }))
    );

    let step = 0;
    const timer = setInterval(() => {
      step++;
      if (step <= INITIAL_ACTIVITIES.length) {
        setActivities((prev) =>
          prev.map((item, idx) => {
            if (idx < step - 1) return { ...item, status: 'success' };
            if (idx === step - 1) return { ...item, status: 'running' };
            return { ...item, status: 'pending' };
          })
        );
      } else {
        setActivities((prev) =>
          prev.map((item) => ({ ...item, status: 'success' }))
        );
        setIsRunning(false);
        clearInterval(timer);
      }
    }, 900);
  };

  return (
    <div
      style={{ fontFamily: "var(--font-sans, 'Geist', sans-serif)" }}
      className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6 py-2 sm:py-6 font-sans"
    >
      {/* Control Bar */}
      <div className="flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-border/60 bg-surface/40 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground font-normal">Status:</span>
          {isRunning ? (
            <span className="flex items-center gap-1.5 text-foreground font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Running trace
            </span>
          ) : (
            <span className="text-muted-foreground font-normal">
              Completed
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleRestart}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/70 hover:bg-surface-hover text-foreground text-xs font-medium transition-colors cursor-pointer"
        >
          <RotateCw className="w-3 h-3" />
          <span>Restart</span>
        </button>
      </div>

      {/* Agent Activity Component */}
      <AIAgentActivity
        activities={activities}
        isRunning={isRunning}
        defaultExpandedIds={['act-1', 'act-4']}
      />
    </div>
  );
};

// =============================================================================
// 5. CROSS-COMPONENT INTEGRATION SHOWCASE
// =============================================================================

export const CrossComponentLiveShowcase: React.FC = () => {
  const [pipelineState, setPipelineState] = useState<'idle' | 'executing' | 'complete'>('complete');

  const runPipeline = () => {
    setPipelineState('executing');
    setTimeout(() => {
      setPipelineState('complete');
    }, 2000);
  };

  const integrationActivities: AgentActivityItemData[] = [
    {
      id: 'pipe-1',
      type: 'thinking',
      title: 'Analyze User Request',
      description: 'User requested runtime benchmark and catalog metrics for new components.',
      status: 'success',
      duration: '38ms',
    },
    {
      id: 'pipe-2',
      type: 'database_query',
      title: 'Fetch Registry Telemetry Data',
      description: 'Queried database for component sizes, downloads, and stability index.',
      status: 'success',
      duration: '112ms',
    },
    {
      id: 'pipe-3',
      type: 'code_execution',
      title: 'Aggregate Table Rows & Compute Statistics',
      description: 'Calculated median tree-shake efficiency across all 96 components.',
      status: 'success',
      duration: '84ms',
    },
  ];

  const integrationTableColumns: ColumnDef<any>[] = [
    { id: 'name', header: 'Component', accessorKey: 'name', sortable: true },
    { id: 'downloads', header: 'Installs', accessorKey: 'downloads', sortable: true, align: 'right' },
    { id: 'size', header: 'Bundle', accessorKey: 'size', sortable: true, align: 'right' },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ value }) => (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          {value}
        </span>
      ),
    },
  ];

  const integrationTableData = [
    { id: '1', name: 'AI Response', downloads: '14.2k', size: '3.4 KB', status: 'Verified' },
    { id: '2', name: 'Advanced Data Table', downloads: '18.9k', size: '4.8 KB', status: 'Verified' },
    { id: '3', name: 'Chat', downloads: '12.4k', size: '4.1 KB', status: 'Verified' },
    { id: '4', name: 'AI Agent Activity', downloads: '9.8k', size: '3.1 KB', status: 'Verified' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-border bg-surface-raised">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-semibold text-text-primary">
              Cross-Component Pipeline Demo
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-text-primary text-background font-mono text-[9px] font-semibold">
              E2E Flow
            </span>
          </div>
          <p className="text-[11px] text-text-muted">
            Demonstrates Chat → Agent Activity → AI Response → Advanced Data Table in a cohesive unified flow.
          </p>
        </div>

        <button
          type="button"
          onClick={runPipeline}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-text-primary text-background hover:opacity-90 transition-opacity font-medium text-xs shadow-xs shrink-0 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5" />
          <span>Execute Full Pipeline</span>
        </button>
      </div>

      {/* Simulated Chat Message */}
      <div className="flex items-start justify-end gap-2.5">
        <div className="rounded-2xl rounded-tr-none bg-surface-raised border border-border p-3 text-xs text-text-primary max-w-md shadow-xs">
          Analyze the new EasyAI components and provide a structured metrics comparison.
        </div>
        <div className="w-7 h-7 rounded-lg bg-surface-raised border border-border flex items-center justify-center text-text-primary shrink-0 text-xs">
          You
        </div>
      </div>

      {/* Step 1: Agent Activity */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[11px] font-mono text-text-muted px-1">
          <Cpu className="w-3.5 h-3.5" />
          <span>1. Autonomous Agent Execution Trace</span>
        </div>
        <AIAgentActivity
          activities={integrationActivities}
          isRunning={pipelineState === 'executing'}
          title="Pipeline Execution Steps"
        />
      </div>

      {/* Step 2: AI Response with embedded Advanced Data Table */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[11px] font-mono text-text-muted px-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>2. Synthesized AI Response & Embedded Data Table</span>
        </div>

        <AIResponse
          modelName="Claude 3.7 Sonnet"
          status={pipelineState === 'executing' ? 'generating' : 'complete'}
          content={
            pipelineState === 'executing'
              ? ''
              : `I have completed the system audit across the **4 new EasyUI components**. All components adhere to the monochromatic design tokens and feature 0 third-party styling lock-ins.

### Component Telemetry Overview`
          }
          sources={[
            { id: 1, title: 'EasyUI Component Catalog', url: 'https://github.com/Surajmaurya1/easyui' },
            { id: 2, title: 'Bundlephobia Web Audit', url: 'https://bundlephobia.com' },
          ]}
        >
          <AIResponseHeader modelBadge="Claude 3.7 Sonnet" />
          <AIResponseContent />

          {/* Embedded Data Table inside Response! */}
          {pipelineState === 'complete' && (
            <div className="my-3">
              <AdvancedDataTable
                data={integrationTableData}
                columns={integrationTableColumns}
                defaultPageSize={5}
                title="Performance & Verification Matrix"
              />
            </div>
          )}

          <AIResponseSources
            sources={[
              { id: 1, title: 'EasyUI Component Catalog', url: 'https://github.com/Surajmaurya1/easyui' },
              { id: 2, title: 'Bundlephobia Web Audit', url: 'https://bundlephobia.com' },
            ]}
          />
          <AIResponseActions />
        </AIResponse>
      </div>
    </div>
  );
};

// =============================================================================
// 6. DOT SHADER LIVE SHOWCASE
// =============================================================================

export const DotShaderLiveShowcase: React.FC = () => {
  const [accentColor, setAccentColor] = useState('#F5F5F5');
  const [spacing, setSpacing] = useState(20);
  const [cursorRadius, setCursorRadius] = useState(160);
  const dotSize = 1.5;
  const distortionStrength = 0.4;

  const colorPresets = [
    { label: 'White', value: '#F5F5F5' },
    { label: 'Neutral Gray', value: '#A3A3A3' },
    { label: 'Cyan Tint', value: '#00F0FF' },
    { label: 'Emerald Tint', value: '#10B981' },
    { label: 'Amber Tint', value: '#F59E0B' },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Control Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-[#202020] border border-[#363636] text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[#A3A3A3] font-medium text-[11px] sm:text-xs">Accent:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {colorPresets.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => setAccentColor(preset.value)}
                className={cn(
                  'w-5 h-5 rounded-full border transition-all cursor-pointer',
                  accentColor === preset.value
                    ? 'scale-110 ring-2 ring-white/50 border-white'
                    : 'border-white/20 opacity-70 hover:opacity-100'
                )}
                style={{ backgroundColor: preset.value }}
                title={preset.label}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[#A3A3A3]">
          <label className="flex items-center gap-1.5 text-[11px] sm:text-xs">
            <span>Spacing:</span>
            <input
              type="range"
              min={14}
              max={30}
              value={spacing}
              onChange={(e) => setSpacing(Number(e.target.value))}
              className="w-16 sm:w-20 accent-white cursor-pointer"
            />
            <span className="font-mono text-[11px] text-[#F5F5F5] w-5">{spacing}</span>
          </label>

          <label className="flex items-center gap-1.5 text-[11px] sm:text-xs">
            <span>Radius:</span>
            <input
              type="range"
              min={100}
              max={240}
              value={cursorRadius}
              onChange={(e) => setCursorRadius(Number(e.target.value))}
              className="w-16 sm:w-20 accent-white cursor-pointer"
            />
            <span className="font-mono text-[11px] text-[#F5F5F5] w-6">{cursorRadius}</span>
          </label>
        </div>
      </div>

      {/* Live Interactive Canvas */}
      <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-[#363636] bg-[#151515] shadow-2xl">
        <DotShader
          dotColor="rgba(255, 255, 255, 0.14)"
          accentColor={accentColor}
          spacing={spacing}
          dotSize={dotSize}
          cursorRadius={cursorRadius}
          distortionStrength={distortionStrength}
          maxScale={2.4}
          className="h-full w-full flex items-center justify-center"
        >
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 max-w-lg mx-auto pointer-events-none select-none">
            <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-md border border-[#363636] bg-[#242424]/90 text-[#A3A3A3] mb-3 backdrop-blur-md shadow-sm">
              Point Primitive Dot Matrix
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5]">
              Interactive Dot Shader
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#A3A3A3] max-w-md">
              Move your pointer across the canvas to experience magnetic cursor repulsion and proximity illumination.
            </p>
          </div>
        </DotShader>
      </div>
    </div>
  );
};

// =============================================================================
// 7. GLITCH TEXT LIVE SHOWCASE
// =============================================================================

export const GlitchTextLiveShowcase: React.FC = () => {
  const [variant, setVariant] = useState<GlitchVariant>('rgb-split');
  const [trigger, setTrigger] = useState<GlitchTrigger>('continuous');
  const [intensity, setIntensity] = useState<GlitchIntensity>('medium');
  const [text, setText] = useState('EASYUI KINETIC MOTION');
  const [key, setKey] = useState(0);

  const variants: GlitchVariant[] = ['rgb-split', 'slice', 'vhs', 'scramble', 'pulse'];
  const triggers: GlitchTrigger[] = ['continuous', 'hover', 'click'];
  const intensities: GlitchIntensity[] = ['low', 'medium', 'high'];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Control Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-[#202020] border border-[#363636] text-xs">
        {/* Variant Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-[#242424] border border-[#363636] overflow-x-auto max-w-full scrollbar-none">
          {variants.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVariant(v)}
              className={cn(
                'px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer',
                variant === v
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-[#A3A3A3] hover:text-white'
              )}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Trigger & Intensity Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#242424] border border-[#363636] overflow-x-auto scrollbar-none">
            {triggers.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTrigger(t)}
                className={cn(
                  'px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer',
                  trigger === t
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-[#A3A3A3] hover:text-white'
                )}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Intensity */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#242424] border border-[#363636] overflow-x-auto scrollbar-none">
            {intensities.map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIntensity(i)}
                className={cn(
                  'px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-medium uppercase whitespace-nowrap transition-all cursor-pointer',
                  intensity === i
                    ? 'bg-white text-black font-semibold'
                    : 'text-[#A3A3A3] hover:text-white'
                )}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Editable input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type text to animate..."
          className="flex-1 px-3 py-2 rounded-xl bg-[#202020] border border-[#363636] text-xs sm:text-sm text-[#F5F5F5] placeholder:text-[#737373] focus:outline-none focus:ring-1 focus:ring-white"
        />
        <button
          type="button"
          onClick={() => setKey((k) => k + 1)}
          className="px-2.5 sm:px-3 py-2 rounded-xl bg-[#202020] border border-[#363636] text-xs text-[#A3A3A3] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Retrigger</span>
        </button>
      </div>

      {/* Live Showcase Box */}
      <div className="relative w-full min-h-[260px] sm:min-h-[280px] rounded-2xl overflow-hidden border border-[#363636] bg-[#151515] flex flex-col items-center justify-center p-4 sm:p-8 text-center select-none shadow-2xl">
        <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4 max-w-full overflow-hidden">
          <GlitchText
            key={`${key}-${variant}-${trigger}-${intensity}`}
            as="h2"
            text={text || 'EASYUI KINETIC MOTION'}
            variant={variant}
            trigger={trigger}
            intensity={intensity}
            color1="#FFFFFF"
            color2="#737373"
            className="text-2xl sm:text-5xl font-black tracking-widest text-[#F5F5F5] font-mono break-all"
          />
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono text-[#A3A3A3]">
            <span className="px-2 py-0.5 rounded bg-[#202020] border border-[#363636] text-[#F5F5F5]">
              variant: {variant}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#202020] border border-[#363636] text-[#F5F5F5]">
              trigger: {trigger}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#202020] border border-[#363636] text-[#F5F5F5]">
              intensity: {intensity}
            </span>
          </div>
          {trigger === 'hover' && (
            <span className="text-[11px] sm:text-xs text-[#737373] font-mono">
              Hover over the text to trigger glitch cycle
            </span>
          )}
          {trigger === 'click' && (
            <span className="text-[11px] sm:text-xs text-[#737373] font-mono">
              Click the text to trigger burst animation
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// 8. METEORS LIVE SHOWCASE
// =============================================================================

export const MeteorsLiveShowcase: React.FC = () => {
  const [meteorCount, setMeteorCount] = useState(25);
  const [colorPreset, setColorPreset] = useState('#E5E5E5');
  const angle = 215;

  const presets = [
    { label: 'Monochrome Light', head: '#E5E5E5', trail: '#525252' },
    { label: 'Slate Blue', head: '#94A3B8', trail: '#475569' },
    { label: 'Sky Tint', head: '#38BDF8', trail: '#0284C7' },
    { label: 'Amber Tint', head: '#FBBF24', trail: '#D97706' },
  ];

  const currentPreset = presets.find((p) => p.head === colorPreset) || presets[0];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Control Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-[#202020] border border-[#363636] text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          <span className="text-[#A3A3A3] font-medium text-[11px] sm:text-xs">Palette:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
            {presets.map((preset) => (
              <button
                key={preset.head}
                type="button"
                onClick={() => setColorPreset(preset.head)}
                className={cn(
                  'px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-medium border whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0',
                  colorPreset === preset.head
                    ? 'border-white bg-[#242424] text-[#F5F5F5] shadow-sm'
                    : 'border-[#363636] text-[#A3A3A3] hover:text-white'
                )}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.head }} />
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-[#A3A3A3] shrink-0">
          <label className="flex items-center gap-1.5 text-[11px] sm:text-xs">
            <span>Count:</span>
            <input
              type="range"
              min={10}
              max={40}
              value={meteorCount}
              onChange={(e) => setMeteorCount(Number(e.target.value))}
              className="w-16 sm:w-20 accent-white cursor-pointer"
            />
            <span className="font-mono text-[11px] text-[#F5F5F5] w-5">{meteorCount}</span>
          </label>
        </div>
      </div>

      {/* Live Feature Cards with Meteors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative rounded-2xl overflow-hidden bg-[#202020] border border-[#363636] p-6 sm:p-8 shadow-2xl min-h-[240px] sm:min-h-[260px] flex flex-col justify-between select-none">
          <Meteors
            number={meteorCount}
            color={currentPreset.head}
            trailColor={currentPreset.trail}
            angle={angle}
            tailLength={65}
          />
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#363636] bg-[#242424]/90 text-[#A3A3A3] backdrop-blur-sm">
              Meteors Stream
            </span>
            <span className="h-2 w-2 rounded-full animate-ping bg-[#E5E5E5]" />
          </div>
          <div className="relative z-10 mt-6">
            <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5] tracking-tight">Meteor Stream Engine</h3>
            <p className="text-xs sm:text-sm text-[#A3A3A3] mt-2">
              Hardware-accelerated CSS keyframe streaks streaming seamlessly across cards and hero containers.
            </p>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden bg-[#242424] border border-[#363636] p-6 sm:p-8 shadow-2xl min-h-[240px] sm:min-h-[260px] flex flex-col justify-between select-none">
          <Meteors
            number={Math.round(meteorCount * 0.7)}
            color={currentPreset.head}
            trailColor={currentPreset.trail}
            angle={angle}
            tailLength={45}
          />
          <div className="relative z-10">
            <span className="text-xs font-mono text-[#737373] uppercase tracking-wider">Card Micro-Motion</span>
            <h4 className="text-lg sm:text-xl font-bold text-[#F5F5F5] mt-1">Zero JavaScript Runtime</h4>
            <p className="text-xs text-[#A3A3A3] mt-2">
              Pure CSS keyframe transforms with randomized distribution and automatic prefers-reduced-motion support.
            </p>
          </div>
          <div className="relative z-10 flex items-center gap-2 pt-4">
            <button
              type="button"
              className="px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition-colors cursor-pointer shadow-md"
            >
              Explore Component
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// 9. RAINBOW BUTTON LIVE SHOWCASE
// =============================================================================

export const RainbowButtonLiveShowcase: React.FC = () => {
  const [variant, setVariant] = useState<RainbowButtonVariant>('default');
  const [size, setSize] = useState<RainbowButtonSize>('default');
  const [speed, setSpeed] = useState(3);
  const [glow, setGlow] = useState(true);
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Control Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-[#202020] border border-[#363636] text-xs">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Variant */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#242424] border border-[#363636]">
            {(['default', 'outline'] as RainbowButtonVariant[]).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVariant(v)}
                className={cn(
                  'px-2.5 sm:px-3 py-1 rounded-md text-[10px] sm:text-[11px] font-medium transition-all cursor-pointer',
                  variant === v
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-[#A3A3A3] hover:text-white'
                )}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Size */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#242424] border border-[#363636]">
            {(['sm', 'default', 'lg'] as RainbowButtonSize[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={cn(
                  'px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-medium uppercase transition-all cursor-pointer',
                  size === s
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-[#A3A3A3] hover:text-white'
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[#A3A3A3]">
          <label className="flex items-center gap-1.5 cursor-pointer text-[11px] sm:text-xs">
            <input
              type="checkbox"
              checked={glow}
              onChange={(e) => setGlow(e.target.checked)}
              className="rounded accent-white cursor-pointer"
            />
            <span>Ambient Glow</span>
          </label>

          <label className="flex items-center gap-1.5 text-[11px] sm:text-xs">
            <span>Speed:</span>
            <input
              type="range"
              min={1}
              max={6}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-14 sm:w-16 accent-white cursor-pointer"
            />
            <span className="font-mono text-[11px] text-[#F5F5F5] w-4">{speed}s</span>
          </label>
        </div>
      </div>

      {/* Live Interactive Button Showcase */}
      <div className="relative w-full min-h-[260px] sm:min-h-[280px] rounded-2xl overflow-hidden border border-[#363636] bg-[#151515] flex flex-col items-center justify-center p-6 sm:p-8 gap-6 shadow-2xl select-none">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <RainbowButton
            variant={variant}
            size={size}
            speed={speed}
            glow={glow}
            onClick={() => setClickCount((c) => c + 1)}
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Get Unlimited Access</span>
          </RainbowButton>

          <RainbowButton
            variant="outline"
            size={size}
            speed={speed}
            glow={glow}
            onClick={() => setClickCount((c) => c + 1)}
          >
            <span>Explore Documentation</span>
            <ArrowRight className="w-4 h-4" />
          </RainbowButton>
        </div>

        {clickCount > 0 && (
          <span className="text-xs font-mono text-[#F5F5F5] bg-[#242424] border border-[#363636] px-3 py-1 rounded-full">
            Clicked {clickCount} {clickCount === 1 ? 'time' : 'times'}
          </span>
        )}
      </div>
    </div>
  );
};

// =============================================================================
// 10. SCROLL VELOCITY TEXT LIVE SHOWCASE
// =============================================================================

export const ScrollVelocityTextLiveShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [intensity, setIntensity] = useState(1.2);
  const expandDistance = 300;

  const scrollDown = () => {
    containerRef.current?.scrollBy({ top: 120, behavior: 'smooth' });
  };

  const scrollUp = () => {
    containerRef.current?.scrollBy({ top: -120, behavior: 'smooth' });
  };

  const resetScroll = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Control Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-[#202020] border border-[#363636] text-xs">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={scrollDown}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#242424] border border-[#363636] text-[#F5F5F5] hover:bg-[#2C2C2C] transition-colors cursor-pointer flex items-center gap-1.5 font-medium text-[11px] sm:text-xs"
          >
            <MoveDown className="w-3.5 h-3.5 text-white" />
            <span>Scroll Down</span>
          </button>
          <button
            type="button"
            onClick={scrollUp}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#242424] border border-[#363636] text-[#F5F5F5] hover:bg-[#2C2C2C] transition-colors cursor-pointer flex items-center gap-1.5 font-medium text-[11px] sm:text-xs"
          >
            <MoveUp className="w-3.5 h-3.5 text-white" />
            <span>Scroll Up</span>
          </button>
          <button
            type="button"
            onClick={resetScroll}
            className="px-2 sm:px-2.5 py-1.5 rounded-lg bg-[#242424] border border-[#363636] text-[#A3A3A3] hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px] sm:text-xs"
          >
            <RotateCw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        <div className="flex items-center gap-4 text-[#A3A3A3] shrink-0">
          <label className="flex items-center gap-1.5 text-[11px] sm:text-xs">
            <span>Intensity:</span>
            <input
              type="range"
              min={0.5}
              max={2.5}
              step={0.1}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-16 accent-white cursor-pointer"
            />
            <span className="font-mono text-[11px] text-[#F5F5F5] w-6">{intensity}x</span>
          </label>
        </div>
      </div>

      {/* Scoped Scroll Area */}
      <div
        ref={containerRef}
        className="relative w-full h-[340px] sm:h-[380px] overflow-y-auto rounded-2xl border border-[#363636] bg-[#151515] p-4 sm:p-6 shadow-2xl select-none scrollbar-thin scrollbar-thumb-zinc-800"
      >
        <div className="min-h-[900px] flex flex-col items-center justify-between py-8 sm:py-12 text-center">
          <div className="sticky top-2 sm:top-4 z-20 px-2.5 sm:px-3 py-1 rounded-md bg-[#202020] border border-[#363636] text-[10px] sm:text-[11px] font-mono text-[#A3A3A3] backdrop-blur max-w-full">
            Scroll the container down and up to observe kinetic velocity physics
          </div>

          <div className="my-auto py-10 sm:py-16 flex flex-col items-center gap-3 w-full">
            <ScrollVelocityText
              as="h2"
              text="BUILD THE FUTURE"
              scrollContainerRef={containerRef}
              expandDistance={expandDistance}
              intensity={intensity}
              minLetterSpacing={0.02}
              maxLetterSpacing={0.6}
              maxScale={1.4}
              fadeStart={0.6}
              className="text-2xl sm:text-6xl font-black tracking-tight text-[#F5F5F5] uppercase text-center font-mono"
            />
            <p className="text-xs sm:text-sm text-[#A3A3A3] max-w-sm px-2">
              Direction-aware letter-spacing expanding on downward momentum with zero per-frame React re-renders.
            </p>
          </div>

          <div className="text-[11px] sm:text-xs font-mono text-[#737373]">
            End of velocity track · Scroll back up to restore rest state
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// 11. SHOOTING STARS LIVE SHOWCASE
// =============================================================================

export const ShootingStarsLiveShowcase: React.FC = () => {
  const [starCount, setStarCount] = useState(120);
  const interval = 1600;
  const [trailColor, setTrailColor] = useState('#E5E5E5');
  const [parallax, setParallax] = useState(true);

  const palettes = [
    { label: 'Neutral Light', color: '#E5E5E5' },
    { label: 'Slate Blue', color: '#94A3B8' },
    { label: 'Sky Tint', color: '#38BDF8' },
    { label: 'Purple Tint', color: '#C084FC' },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Control Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-[#202020] border border-[#363636] text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[#A3A3A3] font-medium text-[11px] sm:text-xs">Trail Tint:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {palettes.map((p) => (
              <button
                key={p.color}
                type="button"
                onClick={() => setTrailColor(p.color)}
                className={cn(
                  'w-5 h-5 rounded-full border transition-all cursor-pointer',
                  trailColor === p.color
                    ? 'scale-110 ring-2 ring-white/50 border-white'
                    : 'border-white/20 opacity-70 hover:opacity-100'
                )}
                style={{ backgroundColor: p.color }}
                title={p.label}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[#A3A3A3]">
          <label className="flex items-center gap-1.5 cursor-pointer text-[11px] sm:text-xs">
            <input
              type="checkbox"
              checked={parallax}
              onChange={(e) => setParallax(e.target.checked)}
              className="rounded accent-white cursor-pointer"
            />
            <span>Mouse Parallax</span>
          </label>

          <label className="flex items-center gap-1.5 text-[11px] sm:text-xs">
            <span>Stars:</span>
            <input
              type="range"
              min={60}
              max={200}
              value={starCount}
              onChange={(e) => setStarCount(Number(e.target.value))}
              className="w-16 accent-white cursor-pointer"
            />
            <span className="font-mono text-[11px] text-[#F5F5F5] w-6">{starCount}</span>
          </label>
        </div>
      </div>

      {/* Live Cosmos Canvas */}
      <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-[#363636] bg-[#151515] shadow-2xl select-none">
        <ShootingStars
          background="#151515"
          starCount={starCount}
          interval={interval}
          starColors={['#FFFFFF', '#E5E5E5', '#D4D4D4', '#A3A3A3']}
          trailColor={trailColor}
          headColor="#FFFFFF"
          nebula={false}
          parallax={parallax}
          clickToSpawn={true}
          className="w-full h-full flex items-center justify-center"
        >
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 sm:p-6 max-w-lg mx-auto pointer-events-none">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3] bg-[#242424]/90 border border-[#363636] px-2.5 sm:px-3 py-1 rounded-md mb-2 sm:mb-3 backdrop-blur-md shadow-sm">
              Celestial Shooting Stars
            </span>
            <h2 className="text-2xl sm:text-5xl font-extrabold text-[#F5F5F5] tracking-tight">
              Shooting Stars Canvas
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-[#A3A3A3] max-w-md">
              Twinkling celestial starfield, smooth linear gradients, and shooting stars with ember stardust shedding.
            </p>
            <span className="mt-3 sm:mt-4 text-[10px] sm:text-[11px] font-mono text-[#A3A3A3] bg-[#202020] border border-[#363636] px-2.5 sm:px-3 py-1 rounded-md">
              Click or tap anywhere to summon a meteor
            </span>
          </div>
        </ShootingStars>
      </div>
    </div>
  );
};

// =============================================================================
// 12. SPARKLES CORE LIVE SHOWCASE
// =============================================================================

export const SparklesCoreLiveShowcase: React.FC = () => {
  const [shape, setShape] = useState<SparkleShape>('mixed');
  const [cursorMode, setCursorMode] = useState<SparkleCursorMode>('repulse');
  const [density, setDensity] = useState(110);
  const twinkleSpeed = 1;

  const shapes: SparkleShape[] = ['circle', 'star', 'cross', 'mixed'];
  const cursorModes: SparkleCursorMode[] = ['repulse', 'attract', 'sparkle', 'none'];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Control Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-[#202020] border border-[#363636] text-xs">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Shape Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#242424] border border-[#363636] overflow-x-auto max-w-full scrollbar-none">
            {shapes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setShape(s)}
                className={cn(
                  'px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-medium uppercase whitespace-nowrap transition-all cursor-pointer',
                  shape === s
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-[#A3A3A3] hover:text-white'
                )}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Cursor Mode */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#242424] border border-[#363636] overflow-x-auto max-w-full scrollbar-none">
            {cursorModes.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setCursorMode(m)}
                className={cn(
                  'px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer',
                  cursorMode === m
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-[#A3A3A3] hover:text-white'
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-[#A3A3A3] shrink-0">
          <label className="flex items-center gap-1.5 text-[11px] sm:text-xs">
            <span>Density:</span>
            <input
              type="range"
              min={50}
              max={180}
              value={density}
              onChange={(e) => setDensity(Number(e.target.value))}
              className="w-16 accent-white cursor-pointer"
            />
            <span className="font-mono text-[11px] text-[#F5F5F5] w-6">{density}</span>
          </label>
        </div>
      </div>

      {/* Live Sparkles Canvas Box */}
      <div className="relative w-full h-[340px] sm:h-[380px] rounded-2xl overflow-hidden border border-[#363636] bg-[#151515] flex items-center justify-center shadow-2xl select-none">
        <SparklesCore
          background="#151515"
          minSize={0.6}
          maxSize={2.4}
          particleDensity={density}
          particleShape={shape}
          cursorMode={cursorMode}
          twinkleSpeed={twinkleSpeed}
          particleColors={['#FFFFFF', '#E5E5E5', '#D4D4D4', '#A3A3A3', '#737373']}
          className="w-full h-full"
        >
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 text-center pointer-events-none max-w-lg mx-auto">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3] bg-[#242424]/90 border border-[#363636] px-2.5 sm:px-3 py-1 rounded-md mb-2 sm:mb-3 backdrop-blur-md shadow-sm">
              Particle Sparkles Engine
            </span>
            <h2 className="text-2xl sm:text-5xl font-bold text-[#F5F5F5] tracking-tight">
              Sparkles Core
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-[#A3A3A3] max-w-sm">
              Multi-shape geometry, continuous twinkling phase modulation, and cursor repulsion dynamics.
            </p>
          </div>
        </SparklesCore>
      </div>
    </div>
  );
};

// =============================================================================
// 13. STICKY PAGES LIVE SHOWCASE
// =============================================================================

export const StickyPagesLiveShowcase: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Overview Info Header */}
      <div className="p-2.5 sm:p-3 rounded-xl bg-[#202020] border border-[#363636] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[#A3A3A3] text-[11px] sm:text-xs">
          <Layers className="w-4 h-4 text-white shrink-0" />
          <span>Pure Static CSS Stacking · Native browser scrolling with physical shadows</span>
        </div>
        <span className="text-[10px] sm:text-[11px] font-mono text-[#737373] self-end sm:self-auto">position: sticky</span>
      </div>

      {/* Scoped Sticky Container Demo */}
      <div className="relative w-full h-[400px] sm:h-[460px] overflow-y-auto rounded-2xl border border-[#363636] bg-[#151515] p-3 sm:p-4 select-none scrollbar-thin scrollbar-thumb-zinc-800">
        <div className="space-y-4 pb-20">
          {/* Intro Card */}
          <div className="h-40 sm:h-48 rounded-xl bg-[#202020] border border-[#363636] p-4 sm:p-6 flex flex-col justify-center items-center text-center">
            <span className="text-xs font-mono text-[#737373] uppercase tracking-wider">Scroll Container</span>
            <h3 className="text-lg sm:text-xl font-bold text-[#F5F5F5] mt-1">Scroll Down to Stack Pages</h3>
            <p className="text-xs text-[#A3A3A3] mt-1 max-w-sm">
              Each section locks at the top and stacks over the previous one with elevated top drop shadows.
            </p>
          </div>

          {/* Stacking Page 1 */}
          <div className="sticky top-0 z-10 rounded-2xl bg-[#202020] border border-[#363636] p-5 sm:p-8 shadow-2xl min-h-[260px] sm:min-h-[300px] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#F5F5F5] px-2.5 py-1 rounded-md bg-[#242424] border border-[#363636]">
                01. ARCHITECTURE
              </span>
              <span className="text-xs font-mono text-[#737373]">Engine Layer</span>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5]">High-Performance Sub-system</h3>
              <p className="text-xs sm:text-sm text-[#A3A3A3] mt-2 max-w-md">
                Distributed architecture designed for low-latency web interactions with zero layout shifts.
              </p>
            </div>
          </div>

          {/* Stacking Page 2 */}
          <div className="sticky top-4 z-20 rounded-2xl bg-[#242424] border border-[#363636] p-5 sm:p-8 shadow-2xl min-h-[260px] sm:min-h-[300px] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#F5F5F5] px-2.5 py-1 rounded-md bg-[#2C2C2C] border border-[#363636]">
                02. DESIGN SYSTEM
              </span>
              <span className="text-xs font-mono text-[#737373]">Visual Tokens</span>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5]">Modern Monochromatic Aesthetic</h3>
              <p className="text-xs sm:text-sm text-[#A3A3A3] mt-2 max-w-md">
                Curated typography, precision spring physics, and physical shadow depth.
              </p>
            </div>
          </div>

          {/* Stacking Page 3 */}
          <div className="sticky top-8 z-30 rounded-2xl bg-[#2C2C2C] border border-[#363636] p-5 sm:p-8 shadow-2xl min-h-[260px] sm:min-h-[300px] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#F5F5F5] px-2.5 py-1 rounded-md bg-[#363636] border border-[#4A4A4A]">
                03. PRODUCTION READY
              </span>
              <span className="text-xs font-mono text-[#737373]">Release Flow</span>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5]">Zero Third-Party Lock-in</h3>
              <p className="text-xs sm:text-sm text-[#A3A3A3] mt-2 max-w-md">
                Direct code ownership delivered seamlessly via shadcn CLI with full typing.
              </p>
            </div>
          </div>

          {/* Subsequent Natural Flow Card */}
          <div className="h-36 sm:h-40 rounded-xl bg-[#202020] border border-[#363636] p-4 sm:p-6 flex flex-col justify-center items-center text-center">
            <span className="text-xs font-mono text-[#F5F5F5]">Natural Flow Resumes</span>
            <p className="text-xs text-[#737373] mt-1">Normal page scrolling continues smoothly after stack release.</p>
          </div>
        </div>
      </div>
    </div>
  );
};


