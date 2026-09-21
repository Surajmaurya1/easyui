import React, { useState, useRef, useEffect, useMemo, createContext, useContext } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Send,
  Paperclip,
  X,
  FileText,
  Image as ImageIcon,
  Check,
  Copy,
  RotateCw,
  Sparkles,
  User,
  Bot,
  AlertCircle,
  Menu,
  MessageSquare,
  Plus,
  Trash2,
} from 'lucide-react';
import { cn, copyToClipboard } from '../../lib/utils';

// =============================================================================
// DESIGN SYSTEM CONSTANTS & SPRING TOKENS
// =============================================================================

const SPRING_PHYSICS = {
  type: 'spring' as const,
  stiffness: 320,
  damping: 34,
  mass: 0.7,
};

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

export type MessageRole = 'user' | 'assistant' | 'system';
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'failed' | 'streaming';

export interface ChatAttachment {
  id: string;
  name: string;
  size?: string;
  type?: 'image' | 'file' | 'code';
  url?: string;
}

export interface ChatMessageItem {
  id: string;
  role: MessageRole;
  content: string;
  author?: string;
  timestamp?: string;
  status?: MessageStatus;
  attachments?: ChatAttachment[];
}

export interface ChatConversationThread {
  id: string;
  title: string;
  timestamp: string;
  group?: 'Today' | 'Yesterday' | 'Previous' | string;
}

export interface ChatContextValue {
  messages: ChatMessageItem[];
  onSendMessage: (content: string, attachments?: ChatAttachment[]) => void;
  isGenerating?: boolean;
  activeThreadId?: string;
  onSelectThread?: (threadId: string) => void;
  onNewChat?: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  threads?: ChatConversationThread[];
  accentColor?: string;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error('Chat compound subcomponents must be used within <Chat>');
  }
  return ctx;
}

// =============================================================================
// SUB-COMPONENTS (MOBILE-FIRST & MINIMAL)
// =============================================================================

export interface ChatHeaderProps {
  title?: string;
  subtitle?: string;
  modelBadge?: string;
  onClearChat?: () => void;
  className?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  title = 'AI Assistant',
  subtitle = 'Claude 3.7 Sonnet',
  modelBadge,
  onClearChat,
  className,
}) => {
  const { isSidebarOpen, setIsSidebarOpen, threads } = useChat();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        'px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#121214] flex items-center justify-between gap-3 select-none',
        className
      )}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {threads && threads.length > 0 && (
          <motion.button
            type="button"
            whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg border border-neutral-200/80 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/60 text-text-muted hover:text-text-primary md:hidden focus-ring cursor-pointer"
            aria-label="Toggle chat thread history"
          >
            <Menu className="w-4 h-4" />
          </motion.button>
        )}

        <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-text-primary shrink-0 shadow-xs">
          <Bot className="w-4 h-4" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-semibold text-text-primary truncate">{title}</h3>
            {modelBadge && (
              <span className="rounded-md border border-neutral-200/80 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/60 px-1.5 py-0.5 font-sans text-[10px] text-text-muted">
                {modelBadge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-[10px] text-text-muted truncate font-sans">{subtitle}</p>}
        </div>
      </div>

      {onClearChat && (
        <motion.button
          type="button"
          whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
          onClick={onClearChat}
          title="Clear messages"
          aria-label="Clear chat history"
          className="p-1.5 rounded-lg border border-neutral-200/80 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/60 text-text-muted hover:text-text-primary hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors focus-ring cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </motion.button>
      )}
    </div>
  );
};

export interface ChatSidebarProps {
  className?: string;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ className }) => {
  const { threads = [], activeThreadId, onSelectThread, onNewChat, isSidebarOpen, setIsSidebarOpen } = useChat();

  // Group threads by group property
  const grouped = useMemo(() => {
    const groups: Record<string, ChatConversationThread[]> = {};
    threads.forEach((t) => {
      const g = t.group || 'Today';
      if (!groups[g]) groups[g] = [];
      groups[g].push(t);
    });
    return groups;
  }, [threads]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      <aside
        className={cn(
          'w-64 border-r border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/90 dark:bg-neutral-900/70 flex flex-col shrink-0 transition-transform duration-200 z-50',
          'fixed inset-y-0 left-0 md:static md:translate-x-0',
          isSidebarOpen ? 'translate-x-0 shadow-elevated md:shadow-none' : '-translate-x-full md:translate-x-0',
          className
        )}
      >
        {/* New Chat Button + Mobile Close */}
        <div className="p-3 border-b border-neutral-200/80 dark:border-neutral-800 flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              onNewChat?.();
              setIsSidebarOpen(false);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-medium text-text-primary transition-colors focus-ring cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Conversation</span>
          </button>
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
            className="p-2 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-text-muted hover:text-text-primary transition-colors md:hidden focus-ring cursor-pointer shadow-xs"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-3 font-sans text-xs">
          {(Object.entries(grouped) as [string, ChatConversationThread[]][]).map(([groupTitle, list]) => (
            <div key={groupTitle} className="space-y-1">
              <div className="px-2 text-[10px] font-sans font-medium uppercase tracking-wider text-text-muted">
                {groupTitle}
              </div>
              {list.map((thread) => {
                const isActive = thread.id === activeThreadId;
                return (
                  <button
                    key={thread.id}
                    type="button"
                    onClick={() => {
                      onSelectThread?.(thread.id);
                      setIsSidebarOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors truncate focus-ring cursor-pointer text-xs',
                      isActive
                        ? 'bg-white dark:bg-neutral-800 text-text-primary font-medium border border-neutral-200/80 dark:border-neutral-700 shadow-xs'
                        : 'text-text-secondary hover:text-text-primary hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40'
                    )}
                  >
                    <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-50" />
                    <span className="truncate">{thread.title}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

const ChatCodeBlock: React.FC<{ language?: string; code: string }> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-2 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-neutral-900 text-neutral-100 overflow-hidden shadow-xs">
      <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-950/80 border-b border-neutral-800 text-[10px] font-sans text-neutral-400">
        <span className="uppercase tracking-wider font-semibold text-[9px] text-neutral-400">{language || 'code'}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-3 font-sans text-[11px] leading-relaxed max-w-full overflow-x-auto text-neutral-200">
        <code>{code}</code>
      </pre>
    </div>
  );
};

function renderChatMessageContent(content: string, isUser: boolean) {
  if (isUser) {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }

  if (!content.includes('```')) {
    const parts = content.split(/(`[^`]+`)/g);
    return (
      <div className="whitespace-pre-wrap">
        {parts.map((part, i) => {
          if (part.startsWith('`') && part.endsWith('`')) {
            return (
              <code
                key={i}
                className="px-1.5 py-0.5 rounded bg-neutral-200/80 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 font-sans text-[11px]"
              >
                {part.slice(1, -1)}
              </code>
            );
          }
          return part;
        })}
      </div>
    );
  }

  const chunks: Array<{ type: 'text' | 'code'; language?: string; text: string }> = [];
  const lines = content.split('\n');
  let currentText: string[] = [];
  let inCode = false;
  let codeLang = '';
  let codeLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('```')) {
      if (!inCode) {
        if (currentText.length > 0) {
          chunks.push({ type: 'text', text: currentText.join('\n') });
          currentText = [];
        }
        inCode = true;
        codeLang = line.trim().replace(/^```/, '') || 'text';
        codeLines = [];
      } else {
        inCode = false;
        chunks.push({ type: 'code', language: codeLang, text: codeLines.join('\n') });
        codeLines = [];
      }
    } else if (inCode) {
      codeLines.push(line);
    } else {
      currentText.push(line);
    }
  }

  if (inCode && codeLines.length > 0) {
    chunks.push({ type: 'code', language: codeLang, text: codeLines.join('\n') });
  } else if (currentText.length > 0) {
    chunks.push({ type: 'text', text: currentText.join('\n') });
  }

  return (
    <div className="space-y-2">
      {chunks.map((chunk, idx) => {
        if (chunk.type === 'code') {
          return <ChatCodeBlock key={idx} language={chunk.language} code={chunk.text} />;
        }

        const parts = chunk.text.split(/(`[^`]+`)/g);
        return (
          <div key={idx} className="whitespace-pre-wrap">
            {parts.map((part, pIdx) => {
              if (part.startsWith('`') && part.endsWith('`')) {
                return (
                  <code
                    key={pIdx}
                    className="px-1.5 py-0.5 rounded bg-neutral-200/80 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 font-sans text-[11px]"
                  >
                    {part.slice(1, -1)}
                  </code>
                );
              }
              return part;
            })}
          </div>
        );
      })}
    </div>
  );
}

export interface ChatMessageProps {
  message: ChatMessageItem;
  onRetry?: (messageId: string) => void;
  className?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onRetry, className }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';
  const shouldReduceMotion = useReducedMotion();

  const handleCopy = () => {
    copyToClipboard(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : SPRING_PHYSICS}
      className={cn(
        'flex gap-2.5 sm:gap-3 text-xs',
        isUser ? 'flex-row-reverse' : 'flex-row',
        className
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'w-6 h-6 sm:w-7 sm:h-7 rounded-lg border flex items-center justify-center shrink-0 shadow-xs',
          isUser
            ? 'bg-neutral-900 text-white dark:bg-[#2C2C30] dark:text-white border-neutral-800 dark:border-neutral-700'
            : 'bg-neutral-100 dark:bg-[#1E1E22] text-text-primary border-neutral-200 dark:border-neutral-700'
        )}
      >
        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
      </div>

      {/* Bubble + Metadata */}
      <div className={cn('flex flex-col max-w-[88%] sm:max-w-[78%]', isUser ? 'items-end' : 'items-start')}>
        {/* Author / Timestamp */}
        <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] font-sans text-text-muted">
          <span>{message.author || (isUser ? 'You' : 'Assistant')}</span>
          {message.timestamp && <span>· {message.timestamp}</span>}
        </div>

        {/* Message Container */}
        <div
          className={cn(
            'p-3 sm:p-3.5 rounded-2xl text-xs leading-relaxed transition-colors break-words overflow-hidden',
            isUser
              ? 'bg-neutral-900 text-white dark:bg-[#2C2C30] dark:text-white border border-transparent dark:border-neutral-700/60 rounded-tr-xs shadow-xs'
              : 'bg-neutral-100/80 dark:bg-[#1E1E22] text-neutral-900 dark:text-[#F4F4F5] border border-neutral-200/80 dark:border-neutral-800 rounded-tl-xs shadow-xs'
          )}
        >
          {/* Attachments inside bubble */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2 pb-2 border-b border-border/40">
              {message.attachments.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface border border-border text-[10px] font-sans text-text-primary"
                >
                  {att.type === 'image' ? (
                    <ImageIcon className="w-3 h-3 text-text-muted" />
                  ) : (
                    <FileText className="w-3 h-3 text-text-muted" />
                  )}
                  <span className="truncate max-w-[120px]">{att.name}</span>
                  {att.size && <span className="text-text-muted">({att.size})</span>}
                </div>
              ))}
            </div>
          )}

          {/* Content */}
          {renderChatMessageContent(message.content, isUser)}

          {/* Streaming cursor indicator */}
          {message.status === 'streaming' && (
            <span className="inline-block w-1.5 h-3 ml-1 align-baseline bg-current animate-pulse" />
          )}

          {/* Error / retry state */}
          {message.status === 'failed' && (
            <div className="mt-2 flex items-center gap-2 text-rose-500 font-sans text-[11px]">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Failed to send</span>
              {onRetry && (
                <button
                  type="button"
                  onClick={() => onRetry(message.id)}
                  className="underline underline-offset-2 ml-1 text-text-primary hover:text-white cursor-pointer"
                >
                  Retry
                </button>
              )}
            </div>
          )}
        </div>

        {/* Action bar for assistant messages */}
        {isAssistant && message.status !== 'streaming' && (
          <div className="flex items-center gap-1 mt-1 px-1">
            <motion.button
              type="button"
              whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
              onClick={handleCopy}
              title="Copy message"
              aria-label={copied ? 'Message copied' : 'Copy message'}
              className="p-1 rounded text-text-muted hover:text-text-primary hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-ring cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export interface ChatMessagesProps {
  className?: string;
  emptyPlaceholder?: React.ReactNode;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  className,
  emptyPlaceholder,
}) => {
  const { messages, isGenerating } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof bottomRef.current?.scrollIntoView === 'function') {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isGenerating]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 text-center text-xs text-text-muted">
        {emptyPlaceholder || (
          <div className="max-w-xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-text-primary mx-auto mb-3 shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="font-semibold text-text-primary">Start a conversation</h4>
            <p className="text-[11px] text-text-muted">
              Ask anything, request component blueprints, or run interactive code analysis.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-3 sm:space-y-4', className)}>
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export interface ChatComposerProps {
  placeholder?: string;
  allowAttachments?: boolean;
  className?: string;
}

export const ChatComposer: React.FC<ChatComposerProps> = ({
  placeholder = 'Ask a question or type a message...',
  allowAttachments = true,
  className,
}) => {
  const { onSendMessage, isGenerating, accentColor } = useChat();
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleSend = () => {
    if ((!input.trim() && attachments.length === 0) || isGenerating) return;
    onSendMessage(input.trim(), attachments);
    setInput('');
    setAttachments([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newAtts: ChatAttachment[] = Array.from(files).map((f, i) => ({
      id: `att-${Date.now()}-${i}`,
      name: f.name,
      size: `${(f.size / 1024).toFixed(1)} KB`,
      type: f.type.startsWith('image/') ? 'image' : 'file',
    }));

    setAttachments((prev) => [...prev, ...newAtts]);
    e.target.value = '';
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  // Auto-grow textarea height up to a max
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  return (
    <div className={cn('p-2 sm:p-4 border-t border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#121214]', className)}>
      {/* Selected attachments chips */}
      <AnimatePresence>
        {attachments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={SPRING_PHYSICS}
            className="flex flex-wrap gap-1.5 mb-2 overflow-hidden"
          >
            {attachments.map((att) => (
              <div
                key={att.id}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-[10px] font-sans text-text-primary"
              >
                {att.type === 'image' ? <ImageIcon className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                <span className="truncate max-w-[110px]">{att.name}</span>
                <button
                  type="button"
                  onClick={() => removeAttachment(att.id)}
                  className="text-text-muted hover:text-text-primary ml-1 p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Enclosure */}
      <div className="relative rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60 p-1.5 sm:p-2 focus-within:border-neutral-400 dark:focus-within:border-neutral-600 transition-colors shadow-xs">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className="w-full resize-none bg-transparent px-2 py-1 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none font-sans max-h-40 leading-relaxed"
        />

        {/* Toolbar & Send Button */}
        <div className="flex items-center justify-between pt-1.5 px-1 border-t border-neutral-200/60 dark:border-neutral-800/60 text-xs">
          <div className="flex items-center gap-1.5">
            {allowAttachments && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Attach file or image"
                  aria-label="Attach file"
                  className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-ring cursor-pointer"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                </button>
              </>
            )}

            <span className="text-[10px] font-sans text-text-muted hidden sm:inline">
              Return to send, Shift+Return for newline
            </span>
          </div>

          <motion.button
            type="button"
            whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
            onClick={handleSend}
            disabled={(!input.trim() && attachments.length === 0) || isGenerating}
            title="Send message"
            aria-label="Send message"
            style={accentColor ? { backgroundColor: accentColor } : undefined}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-text-primary text-background hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-medium text-xs focus-ring cursor-pointer shadow-xs',
              accentColor && 'text-white'
            )}
          >
            {isGenerating ? (
              <RotateCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span className="font-semibold text-xs">Send</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// ROOT COMPOUND COMPONENT & STANDALONE
// =============================================================================

export interface ChatProps {
  messages: ChatMessageItem[];
  onSendMessage: (content: string, attachments?: ChatAttachment[]) => void;
  isGenerating?: boolean;
  threads?: ChatConversationThread[];
  activeThreadId?: string;
  accentColor?: string;
  onSelectThread?: (threadId: string) => void;
  onNewChat?: () => void;
  onClearChat?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const Chat: React.FC<ChatProps> = ({
  messages,
  onSendMessage,
  isGenerating = false,
  threads,
  activeThreadId,
  accentColor,
  onSelectThread,
  onNewChat,
  onClearChat,
  className,
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const contextValue: ChatContextValue = {
    messages,
    onSendMessage,
    isGenerating,
    threads,
    activeThreadId,
    accentColor,
    onSelectThread,
    onNewChat,
    isSidebarOpen,
    setIsSidebarOpen,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      <div
        style={{
          fontFamily: "var(--font-sans, 'Geist', sans-serif)",
          ...(accentColor ? ({ '--accent-custom': accentColor } as React.CSSProperties) : {}),
        }}
        className={cn(
          'w-full h-[500px] sm:h-[600px] flex rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#121214] text-text-primary shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden transition-colors font-sans',
          className
        )}
      >
        {children || (
          <>
            {threads && threads.length > 0 && <ChatSidebar />}
            <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#121214]">
              <ChatHeader onClearChat={onClearChat} />
              <ChatMessages />
              <ChatComposer />
            </div>
          </>
        )}
      </div>
    </ChatContext.Provider>
  );
};
