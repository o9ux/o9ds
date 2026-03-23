import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import Avatar from './Avatar';

/* ── Overlap negative-margin per avatar size ── */
const OVERLAP = {
  xs:     '-ml-1',
  sm:     '-ml-1.5',
  normal: '-ml-2',
  md:     '-ml-2.5',
  lg:     '-ml-3',
  xl:     '-ml-3.5',
  xxl:    '-ml-4',
  xxxl:   '-ml-5',
};

/* ── +count text sizing per avatar size — compact, text-fit only ── */
const COUNT_SIZE = {
  xs:     'text-[8px]',
  sm:     'text-[9px]',
  normal: 'text-[10px]',
  md:     'text-[11px]',
  lg:     'text-xs',
  xl:     'text-sm',
  xxl:    'text-base',
  xxxl:   'text-lg',
};

/* ── Portal-based dropdown positioned below the group ── */
function AvatarOverflowDropdown({ wrapperRef, items, effectiveMax, onItemClick, onClose }) {
  const listRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  /* Position below the group container */
  useEffect(() => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 4 + window.scrollY,
      left: rect.left + window.scrollX,
    });
  }, [wrapperRef]);

  return (
    <div
      ref={listRef}
      role="listbox"
      style={{ position: 'absolute', top: pos.top, left: pos.left, zIndex: 9999 }}
      className={cn(
        'min-w-[200px] max-h-[280px] overflow-y-auto',
        'bg-surface-overlay border border-border shadow-down',
      )}
    >
      {items.map((item, i) => (
        <button
          key={i}
          type="button"
          role="option"
          aria-selected={false}
          onClick={() => {
            onItemClick?.(item, effectiveMax + i);
            onClose();
          }}
          className={cn(
            'flex items-center gap-2.5 w-full px-3 py-2',
            'text-left hover:bg-surface-input transition-colors cursor-pointer',
            'focus-visible:outline-none focus-visible:bg-surface-input',
          )}
        >
          <Avatar
            variant={item.variant || 'character'}
            size="sm"
            name={item.name}
            src={item.src}
            anonymous={item.anonymous}
            readOnly
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-text truncate">
              {item.primaryLabel || item.name}
            </p>
            {item.secondaryLabel && (
              <p className="text-[10px] text-text-tertiary truncate">
                {item.secondaryLabel}
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}

/**
 * AvatarGroup — renders a stack of overlapping avatars with a +N overflow
 * counter that opens a dropdown list on click/focus.
 *
 * @param {Array<{name,src,variant,anonymous,primaryLabel,secondaryLabel}>} props.items — avatar data
 * @param {'xs'|'sm'|'normal'|'md'|'lg'|'xl'|'xxl'|'xxxl'} props.size
 * @param {number} props.min  — minimum visible avatars (default 1)
 * @param {number} props.max  — maximum visible avatars before +N counter
 * @param {Function} props.onItemClick — callback(item, index) when a dropdown row is clicked
 * @param {string} props.className
 */
export default function AvatarGroup({
  items = [],
  size = 'md',
  min = 1,
  max = 4,
  onItemClick,
  className,
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  /* Clamp max to be at least min */
  const effectiveMax = Math.max(min, max);
  const total = items.length;
  const visibleItems = total > effectiveMax ? items.slice(0, effectiveMax) : items;
  const overflowItems = total > effectiveMax ? items.slice(effectiveMax) : [];
  const overflowCount = overflowItems.length;

  /* Close on click-outside or Escape */
  const handleClickOutside = useCallback((e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handleClickOutside, handleKeyDown]);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        'relative inline-flex items-center p-0.5 bg-[var(--color-global-gray-08)]',
        className,
      )}
    >
      {/* Visible avatars */}
      {visibleItems.map((item, i) => (
        <span
          key={i}
          className={cn(
            'relative inline-flex ring-2 ring-[var(--color-global-gray-08)]',
            i > 0 && OVERLAP[size],
          )}
          style={{ zIndex: total - i }}
        >
          <Avatar
            variant={item.variant || 'character'}
            size={size}
            name={item.name}
            src={item.src}
            anonymous={item.anonymous}
            readOnly
          />
        </span>
      ))}

      {/* +N overflow counter button */}
      {overflowCount > 0 && (
        <span className="inline-flex" style={{ zIndex: 0 }}>
          <button
            type="button"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-label={`${overflowCount} more users`}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              'inline-flex items-center leading-none whitespace-nowrap',
              'pl-1.5 pr-2 py-1',
              'bg-transparent text-white-static font-semibold select-none',
              'hover:text-white-static/80 transition-colors cursor-pointer',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-border',
              COUNT_SIZE[size],
            )}
          >
            +{overflowCount}
          </button>
        </span>
      )}

      {/* Dropdown list — portalled to body, positioned below the group */}
      {open && overflowCount > 0 && createPortal(
        <AvatarOverflowDropdown
          wrapperRef={wrapperRef}
          items={overflowItems}
          effectiveMax={effectiveMax}
          onItemClick={onItemClick}
          onClose={() => setOpen(false)}
        />,
        document.body,
      )}
    </div>
  );
}
