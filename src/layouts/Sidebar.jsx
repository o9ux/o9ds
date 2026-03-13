import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { navigation } from '@/docs/data/navigation';

function SidebarLink({ item, depth = 0 }) {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  if (!item.path) {
    return (
      <span className="flex items-center gap-2 px-3 py-1.5 text-xs text-text-disabled cursor-not-allowed">
        {item.title}
        {item.status === 'planned' && (
          <span className="border border-text-disabled/40 px-1 py-px text-[9px] font-bold tracking-wider uppercase text-text-disabled">
            PLANNED
          </span>
        )}
        {item.status === 'alpha' && (
          <span className="border border-red-500/50 px-1 py-px text-[9px] font-bold tracking-wider uppercase text-red-400">
            ALPHA
          </span>
        )}
      </span>
    );
  }

  return (
    <NavLink
      to={item.path}
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 text-xs transition-colors',
        isActive
          ? 'bg-interactive text-on-interactive font-semibold'
          : 'text-text-secondary hover:bg-surface-overlay hover:text-text'
      )}
    >
      {item.title}
      {item.status === 'beta' && (
        <span className="border border-amber-500/50 px-1 py-px text-[9px] font-bold tracking-wider uppercase text-amber-400">
          BETA
        </span>
      )}
      {item.status === 'alpha' && (
        <span className="border border-red-500/50 px-1 py-px text-[9px] font-bold tracking-wider uppercase text-red-400">
          ALPHA
        </span>
      )}
    </NavLink>
  );
}

function SidebarSection({ item, depth = 0 }) {
  const location = useLocation();
  const hasActiveChild = item.children?.some(
    (child) =>
      child.path === location.pathname ||
      child.children?.some((c) => c.path === location.pathname)
  );
  const [isOpen, setIsOpen] = useState(hasActiveChild || depth === 0);

  if (item.path || !item.children) {
    return <SidebarLink item={item} depth={depth} />;
  }

  return (
    <div className={cn(depth === 0 && 'mt-5 first:mt-0')}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex w-full items-center justify-between px-3 py-1.5 text-left transition-colors',
          depth === 0
            ? 'text-[10px] font-bold uppercase tracking-widest text-text-tertiary'
            : 'text-xs font-semibold text-text-secondary hover:text-text'
        )}
      >
        {item.title}
        <svg
          className={cn('h-3 w-3 shrink-0 transition-transform', isOpen && 'rotate-90')}
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M6 3l5 5-5 5V3z" />
        </svg>
      </button>

      {isOpen && (
        <div className={cn(depth === 0 ? 'mt-0.5' : 'mt-0 ml-3 border-l border-border pl-2')}>
          {item.children.map((child) => (
            <SidebarSection key={child.title} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ className }) {
  return (
    <nav className={cn('flex flex-col gap-0 p-4', className)}>
      {navigation.map((item) => (
        <SidebarSection key={item.title} item={item} depth={0} />
      ))}
    </nav>
  );
}
