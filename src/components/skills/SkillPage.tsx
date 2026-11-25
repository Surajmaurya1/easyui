import React, { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { ClaudeCodeMark, CursorMark, OpenAICodexMark } from './agent-marks';

const REPOSITORY_URL = 'https://github.com/Surajmaurya1/anti-slop-ui';
const SUPPORTED_AGENTS_URL = 'https://github.com/vercel-labs/skills/blob/main/docs/agents.md';
const INSTALL_COMMAND = 'npx skills add Surajmaurya1/anti-slop-ui --skill anti-slop-ui';

const AGENTS = [
  { name: 'Claude Code', Icon: ClaudeCodeMark },
  { name: 'OpenAI Codex', Icon: OpenAICodexMark },
  { name: 'Cursor', Icon: CursorMark },
];

type CopyState = 'idle' | 'copying' | 'copied' | 'error';

/**
 * Clipboard API fallback for browsers or embedded contexts where
 * navigator.clipboard is unavailable or blocked.
 */
function legacyCopy(text: string): boolean {
  if (typeof document === 'undefined') return false;

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.top = '-9999px';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

export const SkillPage: React.FC = () => {
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const [copyAttempt, setCopyAttempt] = useState(0);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    []
  );

  async function copyCommand() {
    setCopyAttempt((attempt) => attempt + 1);
    setCopyState('copying');
    if (copyTimer.current) clearTimeout(copyTimer.current);
    let copied = false;

    try {
      if (navigator.clipboard?.writeText) {
        let timeoutId: ReturnType<typeof setTimeout> | undefined;
        copied = await Promise.race([
          navigator.clipboard.writeText(INSTALL_COMMAND).then(
            () => true,
            () => false
          ),
          new Promise<boolean>((resolve) => {
            timeoutId = setTimeout(() => resolve(false), 700);
          }),
        ]);
        if (timeoutId) clearTimeout(timeoutId);
      }
    } catch {
      copied = false;
    }

    if (!copied) copied = legacyCopy(INSTALL_COMMAND);
    setCopyState(copied ? 'copied' : 'error');

    copyTimer.current = setTimeout(() => setCopyState('idle'), 2200);
  }

  return (
    <main className="bg-background text-text-primary">
      <div className="mx-auto w-full max-w-[620px] px-5 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
          Skill
        </p>
        <article className="mt-4 rounded-2xl border border-border-subtle bg-[#F1F1F2] p-5 sm:p-8 dark:bg-[#18181B]">
          <header>
            <h1 className="mt-4 text-[clamp(2.5rem,8vw,3.4rem)] font-semibold leading-[1.03] tracking-[-0.045em] text-text-primary">
              Anti-Slop UI
            </h1>
            <p className="mt-5 max-w-[54ch] text-[15px] leading-7 tracking-[-0.011em] text-text-secondary sm:text-base">
              A design skill for AI coding agents that helps build interfaces with intention,
              consistency, and personality ·{' '}
              Less generic UI · Better design decisions · Interfaces that feel made for the product
            </p>
          </header>

          <section aria-labelledby="value-title" className="mt-9">
            <h2
              id="value-title"
              className="text-[19px] font-semibold tracking-[-0.025em] text-text-primary sm:text-[21px]"
            >
              Better interfaces, not more AI slop
            </h2>
            <p className="mt-2 max-w-[56ch] text-sm leading-7 tracking-[-0.008em] text-text-secondary sm:text-[15px]">
              Anti-Slop UI gives your coding agent a structured design workflow, from understanding
              the product and defining its visual direction to implementing and checking the final
              interface
            </p>
            <p className="mt-3 text-xs leading-5 text-text-muted">
              Product thinking <span aria-hidden="true">·</span> Design direction{' '}
              <span aria-hidden="true">·</span> Accessibility <span aria-hidden="true">·</span>{' '}
              Visual consistency
            </p>
          </section>

          <section
            aria-labelledby="install-title"
            className="mt-12"
          >
            <h2
              id="install-title"
              className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted"
            >
              Install
            </h2>
            <p className="mt-3 text-sm leading-6 text-text-secondary">
              Run this command in your project directory to install Anti-Slop UI
            </p>

            <ul aria-label="Supported coding agents" className="mt-4 flex items-center -space-x-1">
              {AGENTS.map(({ name, Icon }) => (
                <li key={name} title={name} className="flex h-8 w-6 shrink-0 items-center justify-center">
                  <Icon className="h-[22px] w-[22px] shrink-0 text-text-secondary" />
                  <span className="sr-only">{name}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 overflow-hidden rounded-xl border border-border-subtle bg-surface-raised shadow-[var(--shadow-subtle)]">
              <div className="flex min-h-[58px] items-center">
                <div className="flex min-w-0 flex-1 items-center py-3 pl-4 sm:pl-5">
                  <code
                    tabIndex={0}
                    aria-label={`Installation command: ${INSTALL_COMMAND}`}
                    className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap rounded-sm font-mono text-[13px] leading-6 text-text-primary [scrollbar-width:none] [-ms-overflow-style:none] focus-visible:outline-none [&::-webkit-scrollbar]:hidden"
                  >
                    {INSTALL_COMMAND}
                  </code>
                </div>
                <div className="self-stretch border-l border-border-subtle p-1.5">
                  <button
                    type="button"
                    onClick={copyCommand}
                    aria-label={
                      copyState === 'copied'
                        ? 'Installation command copied'
                        : copyState === 'error'
                          ? 'Copy failed, select the command manually'
                          : 'Copy installation command'
                    }
                    title={
                      copyState === 'copied'
                        ? 'Copied to clipboard'
                        : copyState === 'copying'
                          ? 'Copying command'
                          : copyState === 'error'
                            ? 'Copy failed'
                            : 'Copy command'
                    }
                    className="flex h-full min-h-10 w-11 items-center justify-center rounded-lg bg-transparent text-text-secondary transition-colors duration-150 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-reduce:transition-none"
                  >
                    {copyState === 'copied' ? (
                      <Check
                        key={`copied-${copyAttempt}`}
                        className="skill-copy-pop h-[18px] w-[18px]"
                        aria-hidden="true"
                      />
                    ) : (
                      <Copy
                        key={`copy-${copyAttempt}`}
                        className="skill-copy-pop h-[18px] w-[18px]"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <p role="status" aria-live="polite" className="sr-only">
              {copyState === 'copied'
                ? 'Installation command copied to clipboard'
                : copyState === 'error'
                  ? 'Copy failed; select the command and copy it manually'
                  : copyState === 'copying'
                    ? 'Copying installation command'
                    : ''}
            </p>

            <p className="mt-3 text-xs leading-5 text-text-muted">
              The Skills CLI supports installation into Claude Code, Codex, Cursor and{' '}
              <a
                href={SUPPORTED_AGENTS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded underline decoration-border-hover underline-offset-4 transition-colors duration-150 hover:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring motion-reduce:transition-none"
              >
                other supported agents
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>

            <div className="mt-7">
              <a
                href={REPOSITORY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded text-[13px] font-medium text-text-secondary transition-colors duration-150 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring motion-reduce:transition-none"
              >
                View source on GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
};

export default SkillPage;
