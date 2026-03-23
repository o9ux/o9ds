import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import O9Icon from '@/components/O9Icon';
import o9LogoSvg from '@/assets/icons/o9con-o9-logo.svg?raw';

export default function Header({ onMenuToggle }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center border-b border-border bg-surface-sunken px-4 lg:px-6">
      <button
        onClick={onMenuToggle}
        className="mr-3 p-2 text-text-secondary hover:bg-surface-overlay hover:text-text lg:hidden transition-colors"
        aria-label="Toggle navigation"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 4h14M2 9h14M2 14h14" />
        </svg>
      </button>

      <Link to="/" className="flex items-center gap-3 font-bold text-text">
        <span className="flex h-8 w-8 items-center justify-center bg-interactive border border-interactive text-on-interactive">
          <O9Icon svg={o9LogoSvg} className="!w-5 !h-5" />
        </span>
        <span className="text-sm font-semibold tracking-tight">
          o9<span className="text-text-secondary font-normal">ds</span>
        </span>
      </Link>

      <div className="ml-auto flex items-center gap-4">
        <span className="hidden text-xs font-medium tracking-widest uppercase text-text-tertiary sm:block">
          Platform Design System
        </span>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex h-8 w-8 items-center justify-center border border-border-strong text-text-secondary hover:border-interactive-border hover:text-text transition-colors cursor-pointer"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            /* Sun icon — shown in dark mode, click switches to light */
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="8" cy="8" r="3" />
              <path d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M3.4 12.6l.7-.7M11.9 4.1l.7-.7" />
            </svg>
          ) : (
            /* Moon icon — shown in light mode, click switches to dark */
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M13.5 8.5a5.5 5.5 0 0 1-7-7 5.5 5.5 0 1 0 7 7Z" />
            </svg>
          )}
        </button>

        <Link
          to="/docs/get-started"
          className="hidden border border-border-strong px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-text-secondary hover:border-interactive-border hover:text-text transition-colors sm:block"
        >
          Docs
        </Link>
      </div>
    </header>
  );
}
