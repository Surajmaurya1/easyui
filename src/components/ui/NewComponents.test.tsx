import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  AIResponse,
  AIResponseHeader,
  AIResponseContent,
  AIResponseSources,
  AIResponseActions,
} from './AIResponse';
import {
  AdvancedDataTable,
  type ColumnDef,
} from './AdvancedDataTable';
import {
  Chat,
  type ChatMessageItem,
} from './Chat';
import {
  AIAgentActivity,
  type AgentActivityItemData,
} from './AIAgentActivity';

describe('AIResponse component', () => {
  it('renders title, markdown content, and citations', () => {
    render(
      <AIResponse
        content="This is a test response with **bold text** and `inline code`."
        sources={[
          { id: 1, title: 'Test Documentation', url: 'https://example.com' },
        ]}
      >
        <AIResponseHeader title="EasyAI" modelBadge="Claude 3.7" />
        <AIResponseContent />
        <AIResponseSources defaultExpanded={true} />
        <AIResponseActions />
      </AIResponse>
    );

    expect(screen.getByText('EasyAI')).toBeInTheDocument();
    expect(screen.getByText('Claude 3.7')).toBeInTheDocument();
    expect(screen.getByText('bold text')).toBeInTheDocument();
    expect(screen.getByText('inline code')).toBeInTheDocument();
    expect(screen.getByText('Test Documentation')).toBeInTheDocument();
  });

  it('renders loading state when generating', () => {
    render(<AIResponse status="generating" content="" />);
    expect(screen.getByText('Synthesizing response...')).toBeInTheDocument();
  });

  it('renders error state when status is error', () => {
    render(<AIResponse status="error" content="Connection timeout" />);
    expect(screen.getByText('Unable to complete response generation')).toBeInTheDocument();
    expect(screen.getByText('Connection timeout')).toBeInTheDocument();
  });
});

describe('AdvancedDataTable component', () => {
  interface TestItem {
    id: string;
    name: string;
    role: string;
  }

  const columns: ColumnDef<TestItem>[] = [
    { id: 'name', header: 'Name', accessorKey: 'name', sortable: true },
    { id: 'role', header: 'Role', accessorKey: 'role', sortable: true },
  ];

  const data: TestItem[] = [
    { id: '1', name: 'Alice Smith', role: 'Engineer' },
    { id: '2', name: 'Bob Jones', role: 'Designer' },
    { id: '3', name: 'Charlie Brown', role: 'Architect' },
  ];

  it('renders table columns, rows, and pagination info', () => {
    render(
      <AdvancedDataTable
        title="Team Members"
        data={data}
        columns={columns}
        defaultPageSize={2}
      />
    );

    expect(screen.getByText('Team Members')).toBeInTheDocument();
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Jones')).toBeInTheDocument();
    // 3rd item is on page 2
    expect(screen.queryByText('Charlie Brown')).not.toBeInTheDocument();
    expect(screen.getByText(/Showing/)).toBeInTheDocument();
  });

  it('filters data when search query is entered', () => {
    render(
      <AdvancedDataTable
        data={data}
        columns={columns}
        searchPlaceholder="Filter items..."
      />
    );

    const input = screen.getByPlaceholderText('Filter items...');
    fireEvent.change(input, { target: { value: 'Alice' } });

    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.queryByText('Bob Jones')).not.toBeInTheDocument();
  });
});

describe('Chat component', () => {
  const initialMessages: ChatMessageItem[] = [
    { id: '1', role: 'user', content: 'Hello there', timestamp: '10:00 AM' },
    { id: '2', role: 'assistant', content: 'Hi! How can I help you?', timestamp: '10:01 AM' },
  ];

  it('renders messages and handles message submission', () => {
    const handleSend = vi.fn();

    render(
      <Chat
        messages={initialMessages}
        onSendMessage={handleSend}
      />
    );

    expect(screen.getByText('Hello there')).toBeInTheDocument();
    expect(screen.getByText('Hi! How can I help you?')).toBeInTheDocument();

    const textarea = screen.getByPlaceholderText('Ask a question or type a message...');
    fireEvent.change(textarea, { target: { value: 'New question' } });

    const sendBtn = screen.getByLabelText('Send message');
    fireEvent.click(sendBtn);

    expect(handleSend).toHaveBeenCalledWith('New question', []);
  });
});

describe('AIAgentActivity component', () => {
  const activities: AgentActivityItemData[] = [
    {
      id: 'step-1',
      type: 'thinking',
      title: 'Analyze Prompt',
      description: 'Understanding requirements',
      status: 'success',
      duration: '42ms',
      details: { input: { test: 'val' }, output: 'done' },
    },
    {
      id: 'step-2',
      type: 'code_execution',
      title: 'Execute Tests',
      status: 'running',
      duration: 'Active',
    },
  ];

  it('renders activity steps and durations', () => {
    render(
      <AIAgentActivity
        activities={activities}
        isRunning={true}
        title="Test Agent Trace"
      />
    );

    expect(screen.getByText('Test Agent Trace')).toBeInTheDocument();
    expect(screen.getByText('Analyze Prompt')).toBeInTheDocument();
    expect(screen.getByText('Execute Tests')).toBeInTheDocument();
    expect(screen.getByText('42ms')).toBeInTheDocument();
  });

  it('expands details when clicked', () => {
    render(
      <AIAgentActivity
        activities={activities}
        defaultExpandedIds={['step-1']}
      />
    );

    expect(screen.getByText(/Parameters/i)).toBeInTheDocument();
    expect(screen.getByText(/Output Result/i)).toBeInTheDocument();
  });
});
