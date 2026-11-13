import { useCallback, useEffect, useRef, useState } from 'react';
import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';
import type { PromptSubmit } from '../../../../ui/PromptInput';

const { PromptInput } = DEMO_COMPONENTS;

export const meta = { id: 'prompt-input', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([PromptInput.preload()]);
}

interface DemoMessage {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  files?: string[];
}

const REPLY =
  "Sure — here's a quick take. A good composer should feel instant: the box grows as you type, sending is one keystroke, and the moment the assistant starts replying the send button turns into a stop button so you're always in control.\n\nTry attaching a file, switching models, or pressing Escape while this is streaming.";

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
  const [messages, setMessages] = useState<DemoMessage[]>([]);
  const [streaming, setStreaming] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const nextId = useRef(1);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => () => clearInterval(timer.current), []);
  useEffect(() => {
    bottom.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [messages]);

  const stop = useCallback(() => {
    clearInterval(timer.current);
    setStreaming(false);
  }, []);

  const send = useCallback(({ text, files, model }: PromptSubmit) => {
    const id = nextId.current++;
    const replyId = nextId.current++;
    setMessages((m) => [
      ...m,
      { id, role: 'user', text, files: files.map((f) => f.name) },
      { id: replyId, role: 'assistant', text: '' },
    ]);
    setStreaming(true);
    const full = `[${model?.name ?? 'Model'}] ${REPLY}`;
    let i = 0;
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      i = Math.min(full.length, i + 3);
      setMessages((m) => m.map((x) => (x.id === replyId ? { ...x, text: full.slice(0, i) } : x)));
      if (i >= full.length) {
        clearInterval(timer.current);
        setStreaming(false);
      }
    }, 22);
  }, []);

  return (
    <div
      key={demoKey}
      className="flex h-[520px] w-full max-w-3xl flex-col overflow-hidden rounded-[24px] border border-black/[0.06] bg-neutral-100 text-neutral-800 antialiased dark:border-white/[0.08] dark:bg-black dark:text-neutral-200"
    >
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pt-6 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-5 pb-6">
          {messages.length === 0 && (
            <p className="py-16 text-center text-[14px] text-neutral-500">
              Say something to start. Your message streams back a reply.
            </p>
          )}
          {messages.map((m) =>
            m.role === 'user' ? (
              <div key={m.id} className="ml-auto flex max-w-[85%] flex-col items-end gap-1.5">
                {!!m.files?.length && (
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {m.files.map((f) => (
                      <span
                        key={f}
                        className="rounded-lg bg-black/[0.06] px-2 py-1 text-[12px] text-neutral-600 dark:bg-white/[0.08] dark:text-neutral-300"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}
                {m.text && (
                  <p className="whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-neutral-900 px-3.5 py-2 text-[14.5px] leading-relaxed text-white dark:bg-white dark:text-neutral-900">
                    {m.text}
                  </p>
                )}
              </div>
            ) : (
              <p key={m.id} className="max-w-[92%] whitespace-pre-wrap break-words text-[14.5px] leading-[1.7]">
                {m.text || <span className="text-neutral-400">Thinking…</span>}
              </p>
            ),
          )}
          <div ref={bottom} />
        </div>
      </div>

      <div className="px-3 pb-3 pt-1 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <PromptInput onSend={send} streaming={streaming} onStop={stop} safeArea autoFocus />
        </div>
      </div>
    </div>
  );
}
