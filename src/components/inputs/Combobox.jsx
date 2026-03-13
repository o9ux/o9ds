import { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 6l4 4 4-4" />
  </svg>
);

const Combobox = forwardRef(function Combobox(
  {
    options = [],
    value,
    onChange,
    placeholder = 'Search...',
    disabled = false,
    error = false,
    emptyMessage = 'No results found',
    className,
    ...rest
  },
  ref
) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const normalizedOptions = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const filteredOptions = normalizedOptions.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedOption = normalizedOptions.find((o) => o.value === value);

  // Outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        // Reset search to selected label on close
        setSearch(selectedOption?.label || '');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [selectedOption]);

  const handleSelect = (opt) => {
    onChange?.(opt.value);
    setSearch(opt.label);
    setIsOpen(false);
    setHighlightIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setIsOpen(true);
      return;
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearch(selectedOption?.label || '');
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(filteredOptions.length - 1, i + 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(0, i - 1));
    }
    if (e.key === 'Enter' && highlightIndex >= 0 && filteredOptions[highlightIndex]) {
      e.preventDefault();
      handleSelect(filteredOptions[highlightIndex]);
    }
  };

  return (
    <div ref={containerRef} className={cn('relative', className)} {...rest}>
      <div
        className={cn(
          'flex items-center gap-1 h-9 px-3',
          'border rounded bg-surface-overlay text-sm',
          'transition-colors',
          error
            ? 'border-danger focus-within:ring-1 focus-within:ring-danger'
            : 'border-border-strong focus-within:border-interactive-border focus-within:ring-1 focus-within:ring-interactive-border',
          disabled && 'opacity-35 pointer-events-none'
        )}
      >
        <input
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          value={search || (selectedOption?.label ?? '')}
          onChange={(e) => {
            setSearch(e.target.value);
            setHighlightIndex(-1);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            setIsOpen(true);
            setSearch(selectedOption?.label || '');
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent outline-none text-text placeholder:text-text-tertiary"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => {
            if (!disabled) {
              setIsOpen(!isOpen);
              inputRef.current?.focus();
            }
          }}
          className="shrink-0 text-text-tertiary cursor-pointer"
        >
          <ChevronIcon />
        </button>
      </div>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 w-full max-h-52 overflow-auto rounded border border-border bg-surface-raised shadow-lg py-1"
        >
          {filteredOptions.length === 0 && (
            <li className="px-3 py-2 text-xs text-text-tertiary">
              {emptyMessage}
            </li>
          )}
          {filteredOptions.map((opt, idx) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => handleSelect(opt)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer transition-colors',
                opt.value === value && 'text-text font-medium',
                idx === highlightIndex
                  ? 'bg-surface-overlay text-text'
                  : 'text-text-secondary hover:bg-surface-overlay hover:text-text'
              )}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default Combobox;
