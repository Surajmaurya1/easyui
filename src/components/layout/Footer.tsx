import React from 'react';
import { Container } from './Container';
import { GITHUB_URL, LINKEDIN_URL } from '../../lib/constants';

export interface FooterProps {
  onNavigateComponents?: () => void;
  onNavigateDocs?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateComponents, onNavigateDocs }) => {
  return (
    <footer className="bg-background pt-10 sm:pt-12 pb-8 sm:pb-10 text-text-muted border-t border-border-subtle">
      <Container size="xl">
        {/* Top row: wordmark on the left, simple link row on the right */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-6">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="EasyUI Logo"
              width="24"
              height="24"
              className="w-6 h-6 object-contain invert dark:invert-0"
            />
            <span className="text-base font-medium text-text-primary font-mono">easyui</span>
          </div>

          <nav
            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px]"
            aria-label="Footer navigation"
          >
            <button
              onClick={onNavigateComponents}
              className="text-text-secondary hover:text-text-primary transition-colors focus-ring rounded cursor-pointer"
            >
              Components
            </button>
            <button
              onClick={onNavigateDocs}
              className="text-text-secondary hover:text-text-primary transition-colors focus-ring rounded cursor-pointer"
            >
              Docs
            </button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors focus-ring rounded"
            >
              GitHub
            </a>
          </nav>
        </div>

        {/* Bottom row: copyright + signature — tight gap, no border line */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12px]">
          <div>
            © {new Date().getFullYear()} EasyUI. Built by{' '}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Suraj Maurya
            </a>
            .
          </div>
          <span className="font-mono text-[11px] text-text-subtle tracking-wide">
            React · TypeScript · Motion
          </span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
