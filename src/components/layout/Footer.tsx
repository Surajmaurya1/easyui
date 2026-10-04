import React from 'react';
import { Container } from './Container';
import { GITHUB_URL, LINKEDIN_URL } from '../../lib/constants';

export interface FooterProps {
  onNavigateHome?: () => void;
  onNavigateComponents?: () => void;
  onNavigateDocs?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateHome, onNavigateComponents, onNavigateDocs }) => {
  return (
    <footer className="bg-background pt-10 sm:pt-12 pb-24 sm:pb-10 text-text-muted border-t border-border-subtle">
      <Container size="xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-y-6">
          <div className="flex flex-col items-start gap-5 sm:col-start-1 sm:row-start-1 sm:justify-self-start">
            <a
              href="https://tracwell.app/"
              aria-label="Tracwell — analytics sponsor"
              className="group flex items-center gap-2 rounded focus-ring"
            >
              <img
                src="/tracwell-icon-dark.svg"
                alt=""
                width="24"
                height="24"
                className="h-6 w-6 object-contain"
              />
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-semibold tracking-tight text-text-primary transition-colors group-hover:text-text-secondary">
                  Tracwell
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                Analytics sponsor
                </span>
              </span>
            </a>

            <a
              href="/"
              aria-label="EasyUI home"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0 && onNavigateHome) {
                  e.preventDefault();
                  onNavigateHome();
                }
              }}
              className="group flex items-center gap-2.5 self-start rounded focus-ring sm:self-auto"
            >
              <img
                src="/logo.png"
                alt=""
                width="24"
                height="24"
                className="w-6 h-6 object-contain invert dark:invert-0"
              />
              <span className="text-base font-medium text-text-primary font-mono transition-colors group-hover:text-text-secondary">
                easyui
              </span>
            </a>
          </div>

          <nav
            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] sm:col-start-2 sm:row-start-1 sm:justify-self-end"
            aria-label="Footer navigation"
          >
            <a
              href="/components"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0 && onNavigateComponents) {
                  e.preventDefault();
                  onNavigateComponents();
                }
              }}
              className="text-text-secondary hover:text-text-primary transition-colors focus-ring rounded cursor-pointer"
            >
              Components
            </a>
            <a
              href="/docs/introduction"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0 && onNavigateDocs) {
                  e.preventDefault();
                  onNavigateDocs();
                }
              }}
              className="text-text-secondary hover:text-text-primary transition-colors focus-ring rounded cursor-pointer"
            >
              Docs
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors focus-ring rounded"
            >
              GitHub
            </a>
            <a
              href="/llms.txt"
              className="text-text-secondary hover:text-text-primary transition-colors focus-ring rounded"
            >
              LLMs
            </a>
          </nav>
          <div className="text-[12px] sm:col-start-2 sm:row-start-2 sm:justify-self-end">
            © {new Date().getFullYear()} EasyUI. Built by{' '}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Suraj Maurya
            </a>
            
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
