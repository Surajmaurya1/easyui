import React, { useState } from 'react';
import {
  Play,
  RotateCw,
  Sparkles,
  Check,
  Cpu,
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
