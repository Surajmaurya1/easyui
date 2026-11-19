import React, { useState } from 'react';
import { Bookmark, BookmarkCheck, Volume2, VolumeX, Sun, Moon, Play, Pause, Lock, Unlock } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { DEMO_COMPONENTS } from '../demo-registry';
const { MorphingIcon } = DEMO_COMPONENTS;

export const MorphingIconShowcase: React.FC = () => {
  const [activeBookmark, setActiveBookmark] = useState(false);
  const [activeAudio, setActiveAudio] = useState(false);
  const [activeTheme, setActiveTheme] = useState(false);
  const [activeMedia, setActiveMedia] = useState(false);
  const [activeLock, setActiveLock] = useState(false);
  const [isCtaActive, setIsCtaActive] = useState(false);

  return (
    <div className="py-12 flex flex-col items-center justify-center gap-7 w-full max-w-md mx-auto select-none">
      {/* Primary Interactive Action Button */}
      <button
        type="button"
        onClick={() => setIsCtaActive((prev) => !prev)}
        className="px-5 py-2.5 rounded-full bg-surface-raised border border-border hover:border-border-hover flex items-center gap-2.5 text-xs font-medium text-text-primary transition-all duration-200 active:scale-95 shadow-xs cursor-pointer group"
      >
        <MorphingIcon
          active={isCtaActive}
          from={<Bookmark className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors" />}
          to={<BookmarkCheck className="w-4 h-4 text-emerald-400" />}
          size={16}
        />
        <span>{isCtaActive ? 'Saved to Collection' : 'Save to Collection'}</span>
      </button>

      {/* Minimal Floating Action Strip */}
      <div className="flex items-center gap-1.5 p-2 rounded-2xl bg-surface-raised/90 border border-border backdrop-blur-md shadow-lg">
        {/* Bookmark */}
        <button
          type="button"
          onClick={() => setActiveBookmark((prev) => !prev)}
          className={cn(
            'p-3 rounded-xl transition-all duration-200 active:scale-90 cursor-pointer',
            activeBookmark
              ? 'bg-surface-hover text-emerald-400 border border-border shadow-xs'
              : 'text-text-muted hover:text-text-primary hover:bg-surface-hover/60 border border-transparent'
          )}
          title={activeBookmark ? 'Saved' : 'Bookmark'}
          aria-label="Toggle Bookmark"
        >
          <MorphingIcon
            active={activeBookmark}
            from={<Bookmark className="w-5 h-5" />}
            to={<BookmarkCheck className="w-5 h-5 text-emerald-400" />}
            size={20}
          />
        </button>

        {/* Audio */}
        <button
          type="button"
          onClick={() => setActiveAudio((prev) => !prev)}
          className={cn(
            'p-3 rounded-xl transition-all duration-200 active:scale-90 cursor-pointer',
            activeAudio
              ? 'bg-surface-hover text-rose-400 border border-border shadow-xs'
              : 'text-text-muted hover:text-text-primary hover:bg-surface-hover/60 border border-transparent'
          )}
          title={activeAudio ? 'Muted' : 'Sound On'}
          aria-label="Toggle Audio"
        >
          <MorphingIcon
            active={activeAudio}
            from={<Volume2 className="w-5 h-5" />}
            to={<VolumeX className="w-5 h-5 text-rose-400" />}
            size={20}
          />
        </button>

        {/* Theme */}
        <button
          type="button"
          onClick={() => setActiveTheme((prev) => !prev)}
          className={cn(
            'p-3 rounded-xl transition-all duration-200 active:scale-90 cursor-pointer',
            activeTheme
              ? 'bg-surface-hover text-sky-400 border border-border shadow-xs'
              : 'text-text-muted hover:text-text-primary hover:bg-surface-hover/60 border border-transparent'
          )}
          title={activeTheme ? 'Dark Mode' : 'Light Mode'}
          aria-label="Toggle Theme"
        >
          <MorphingIcon
            active={activeTheme}
            from={<Sun className="w-5 h-5 text-amber-400" />}
            to={<Moon className="w-5 h-5 text-sky-400" />}
            size={20}
          />
        </button>

        {/* Media */}
        <button
          type="button"
          onClick={() => setActiveMedia((prev) => !prev)}
          className={cn(
            'p-3 rounded-xl transition-all duration-200 active:scale-90 cursor-pointer',
            activeMedia
              ? 'bg-surface-hover text-emerald-400 border border-border shadow-xs'
              : 'text-text-muted hover:text-text-primary hover:bg-surface-hover/60 border border-transparent'
          )}
          title={activeMedia ? 'Playing' : 'Paused'}
          aria-label="Toggle Playback"
        >
          <MorphingIcon
            active={activeMedia}
            from={<Play className="w-5 h-5" />}
            to={<Pause className="w-5 h-5 text-emerald-400" />}
            size={20}
          />
        </button>

        {/* Lock */}
        <button
          type="button"
          onClick={() => setActiveLock((prev) => !prev)}
          className={cn(
            'p-3 rounded-xl transition-all duration-200 active:scale-90 cursor-pointer',
            activeLock
              ? 'bg-surface-hover text-amber-400 border border-border shadow-xs'
              : 'text-text-muted hover:text-text-primary hover:bg-surface-hover/60 border border-transparent'
          )}
          title={activeLock ? 'Unlocked' : 'Locked'}
          aria-label="Toggle Lock"
        >
          <MorphingIcon
            active={activeLock}
            from={<Lock className="w-5 h-5" />}
            to={<Unlock className="w-5 h-5 text-amber-400" />}
            size={20}
          />
        </button>
      </div>

      {/* Minimal Status Hint */}
      <span className="text-[11px] font-mono text-text-muted flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Click any action to trigger spring rotation & morph
      </span>
    </div>
  );
};

export default MorphingIconShowcase;
