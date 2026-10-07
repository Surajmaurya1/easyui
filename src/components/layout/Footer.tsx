import React from 'react';
import { Container } from './Container';
import { EasyUISnail } from './EasyUISnail';
import { GITHUB_URL } from '../../lib/constants';

export interface FooterProps {
  onNavigateHome?: () => void;
  onNavigateComponents?: () => void;
  onNavigateDocs?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateComponents,
  onNavigateDocs,
}) => {
  const handleInternalNavigation =
    (callback?: () => void) =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        e.button === 0 &&
        callback
      ) {
        e.preventDefault();
        callback();
      }
    };

  return (
    <>
      <style>{`
        .easyui-footer-track {
          position: relative;
          height: 1px;
          container-type: inline-size;
        }

        .easyui-footer-snail {
          position: absolute;
          top: -35px;
          left: 0;
          width: 36px;
          height: 36px;
          color: var(--text-primary);
          animation: easyui-footer-travel 60s ease-in-out infinite;
          will-change: transform;
        }

        .easyui-footer-snail .easyui-snail-mark {
          display: block;
          width: 100%;
          height: 100%;
          animation: easyui-footer-turn 60s steps(1, end) infinite;
        }

        .easyui-footer-snail .easyui-snail-pupil {
          transform-box: fill-box;
          transform-origin: center;
          animation: easyui-footer-look 4s ease-in-out infinite;
        }

        .easyui-footer-snail .easyui-snail-pupil-right {
          animation-delay: 80ms;
        }

        .easyui-footer-nav {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          column-gap: 22px;
          row-gap: 12px;
          font-family: 'Geist', sans-serif;
        }

        .easyui-footer-sponsor {
          font-family: 'Geist', sans-serif;
        }

        @keyframes easyui-footer-travel {
          0%, 4% { transform: translateX(0); }
          46%, 54% { transform: translateX(calc(100cqi - 36px)); }
          96%, 100% { transform: translateX(0); }
        }

        @keyframes easyui-footer-turn {
          0%, 49.9% { transform: scaleX(1); }
          50%, 100% { transform: scaleX(-1); }
        }

        @keyframes easyui-footer-look {
          0%, 100% { transform: translateX(0); }
          45%, 55% { transform: translateX(2px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .easyui-footer-snail,
          .easyui-footer-snail .easyui-snail-mark,
          .easyui-footer-snail .easyui-snail-pupil {
            animation: none;
          }
          .easyui-footer-snail { left: 0; }
        }
      `}</style>

      <footer className="relative border-t border-border-subtle bg-background text-text-muted">
        <div className="pointer-events-none absolute inset-x-0 top-0" aria-hidden="true">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="easyui-footer-track">
              <div className="easyui-footer-snail"><EasyUISnail size={36} /></div>
            </div>
          </div>
        </div>
        <Container size="xl">
          <div className="pt-12 pb-20 sm:py-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col items-start gap-2">
                <a
                  href="/"
                  aria-label="EasyUI home"
                  onClick={handleInternalNavigation(onNavigateHome)}
                  className="group inline-flex items-center gap-2.5 rounded focus-ring"
                >
                  <img
                    src="/logo.png"
                    alt=""
                    width="24"
                    height="24"
                    className="h-6 w-6 object-contain invert dark:invert-0 transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="font-mono text-sm font-medium tracking-tight text-text-primary transition-colors group-hover:text-text-secondary">
                    easyui
                  </span>
                </a>
                <p className="max-w-xs text-sm leading-5 text-text-muted">
                  Open-source, thoughtful components
                  <br className="sm:hidden" /> for modern React interfaces
                </p>
              </div>

              <nav
                className="easyui-footer-nav text-sm"
                aria-label="Footer navigation"
              >
                <a href="/components" onClick={handleInternalNavigation(onNavigateComponents)} className="whitespace-nowrap rounded text-text-secondary transition-colors hover:text-text-primary focus-ring">Components</a>
                <a href="/docs/introduction" onClick={handleInternalNavigation(onNavigateDocs)} className="whitespace-nowrap rounded text-text-secondary transition-colors hover:text-text-primary focus-ring">Docs</a>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap rounded text-text-secondary transition-colors hover:text-text-primary focus-ring">GitHub</a>
                <a href="/llms.txt" className="whitespace-nowrap rounded text-text-secondary transition-colors hover:text-text-primary focus-ring">LLMs</a>
              </nav>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-border-subtle pt-4 text-xs sm:flex-row sm:items-center sm:justify-between">
              <a
                href="https://tracwell.app/"
                aria-label="Tracwell — analytics sponsor"
                target="_blank"
                rel="noopener noreferrer"
                className="easyui-footer-sponsor group inline-flex w-fit items-center gap-2 rounded focus-ring"
              >
                <img src="/tracwell-icon-dark.svg" alt="" width="18" height="18" className="h-[18px] w-[18px] object-contain" />
                <span className="flex flex-col leading-tight">
                  <span className="text-xs font-medium text-text-secondary transition-colors group-hover:text-text-primary">Tracwell</span>
                  <span className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-text-muted">Analytics sponsor</span>
                </span>
              </a>

              <p className="text-text-muted sm:text-right">
                © {new Date().getFullYear()} EasyUI <span className="px-1.5 text-text-subtle">·</span> Built by{' '}
                <a href="https://x.com/surajmaurya_m" target="_blank" rel="noopener noreferrer" className="text-text-secondary transition-colors hover:text-text-primary">Suraj</a>
              </p>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
