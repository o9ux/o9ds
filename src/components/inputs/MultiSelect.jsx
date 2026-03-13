import { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 6l4 4 4-4" />
  </svg>
);

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 3l6 6M9 3l-6 6" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 7l3 3 5-5" />
  </svg>
);

const MultiSelect = forwardRef(function MultiSelect(
  {
    options = [],
    value = [],
    onChange,
    placeholder = 'Select...',
    disabled = false,
    error = false,
    maxTags,
    className,
    ...rest
  },
  ref
) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const normalizedOptions = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const filteredOptions = normalizedOptions.filter(
    (opt) =>
      !opt.disabled &&
      opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedSet = new Set(value);

  const toggleOption = (optValue) => {
    const next = selectedSet.has(optValue)
      ? value.filter((v) => v !== optValue)
      : [...value, optValue];
    onChange?.(next);
    setSearch('');
  };

  const removeTag = (optValue) => {
    onChange?.(value.filter((v) => v !== optValue));
  };

  // Outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const displayTags = maxTags ? value.slice(0, maxTags) : value;
  const overflow = maxTags && value.length > maxTags ? value.length - maxTags : 0;

  return (
    <div ref={containerRef} className={cn('relative', className)} {...rest}>
      {/* Trigger area */}
      <div
        ref={ref}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setIsOpen(true);
            inputRef.current?.focus();
          }
        }}
        className={cn(
          'flex flex-wrap items-center gap-1 min-h-[36px] px-2 py-1',
          'border rounded bg-surface-overlay text-sm text-text',
          'transition-colors cursor-text',
          error
            ? 'border-danger focus-within:ring-1 focus-within:ring-danger'
            : 'border-border-strong focus-within:border-interactive-border focus-within:ring-1 focus-within:ring-interactive-border',
          disabled && 'opacity-35 pointer-events-none'
        )}
      >
        {displayTags.map((val) => {
          const opt = normalizedOptions.find((o) => o.value === val);
          return (
            <span
              key={val}
              className="inline-flex items-center gap-1 h-6 px-2 text-xs font-medium bg-interactive-muted rounded"
            >
              {opt?.label || val}
              <button
                type="button"
                tabIndex={-1}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(val);
                }}
                className="shrink-0 rounded-full p-0.5 hover:bg-interactive-muted-hover transition-colors cursor-pointer"
                aria-label={`Remove ${opt?.label || val}`}
              >
                <CloseIcon />
              </button>
            </span>
          );
        })}
        {overflow > 0 && (
          <span className="text-xs text-text-tertiary">+{overflow}</span>
        )}
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[60px] bg-transparent outline-none text-sm text-text placeholder:text-text-tertiary"
          disabled={disabled}
        />
        <span className="shrink-0 text-text-tertiary ml-auto">
          <ChevronIcon />
        </span>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <ul
          role="listbox"
          aria-multiselectable="true"
          className="absolute z-50 mt-1 w-full max-h-52 overflow-auto rounded border border-border bg-surface-raised shadow-lg py-1"
        >
          {filteredOptions.length === 0 && (
            <li className="px-3 py-2 text-xs text-text-tertiary">
              No options found
            </li>
          )}
          {filteredOptions.map((opt) => {
            const isSelected = selectedSet.has(opt.value);
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => toggleOption(opt.value)}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer transition-colors',
                  isSelected
                    ? 'text-text bg-interactive-subtle'
                    : 'text-text-secondary hover:bg-surface-overlay hover:text-text'
                )}
              >
                <span
                  className={cn(
                    'h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-colors',
                    isSelected
                      ? 'bg-interactive border-interactive text-on-interactive'
                      : 'border-border-strong'
                  )}
                >
                  {isSelected && <CheckIcon />}
                </span>
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
});

export default MultiSelect;
