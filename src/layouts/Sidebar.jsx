import { useState, useMemo } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { navigation } from '@/docs/data/navigation';
import Search from '@/components/inputs/Search';

/* ── Collect all linkable items from navigation tree ── */
function flattenNav(items, category = '') {
  const result = [];
  for (const item of items) {
    if (item.path) {
      result.push({ ...item, category });
    }
    if (item.children) {
      result.push(...flattenNav(item.children, item.title || category));
    }
  }
  return result;
}

const allItems = flattenNav(navigation);

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
      {item.className ? (
        <span className={item.className} style={item.style}>{item.title}</span>
      ) : (
        item.title
      )}
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

/* ── Search result item ── */
function SearchResult({ item, onSelect }) {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  return (
    <NavLink
      to={item.path}
      onClick={onSelect}
      className={cn(
        'flex flex-col px-3 py-2 text-xs transition-colors',
        isActive
          ? 'bg-interactive text-on-interactive'
          : 'text-text-secondary hover:bg-surface-overlay hover:text-text'
      )}
    >
      <span className="font-medium">{item.title}</span>
      {item.category && (
        <span className={cn('text-[10px] mt-0.5', isActive ? 'text-on-interactive/70' : 'text-text-tertiary')}>
          {item.category}
        </span>
      )}
    </NavLink>
  );
}

export default function Sidebar({ className }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const isSearching = searchTerm.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const term = searchTerm.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.category?.toLowerCase().includes(term)
    );
  }, [searchTerm, isSearching]);

  return (
    <nav className={cn('flex flex-col gap-0 p-4', className)}>
      {/* Get Started */}
      {!isSearching && <SidebarSection item={navigation[0]} depth={0} />}

      {/* Search box — above Foundation */}
      <div className="mt-4 mb-2 px-1">
        <Search
          variant="filter-search"
          size="sm"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
          onSearch={() => {
            if (searchResults.length > 0) {
              navigate(searchResults[0].path);
              setSearchTerm('');
            }
          }}
          shortcutKey="/"
        />
      </div>

      {/* Search results */}
      {isSearching && (
        <div className="mb-2">
          {searchResults.length > 0 ? (
            <>
              <p className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-text-tertiary">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </p>
              {searchResults.map((item) => (
                <SearchResult
                  key={item.path}
                  item={item}
                  onSelect={() => setSearchTerm('')}
                />
              ))}
            </>
          ) : (
            <p className="px-3 py-3 text-xs text-text-tertiary text-center">
              No results for "{searchTerm}"
            </p>
          )}
        </div>
      )}

      {/* Foundation + Components — hidden during search */}
      {!isSearching && navigation.slice(1).map((item) => (
        <SidebarSection key={item.title} item={item} depth={0} />
      ))}
    </nav>
  );
}
