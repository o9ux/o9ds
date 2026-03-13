import { forwardRef, useState } from 'react';
import { cn } from '@/utils/cn';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="7" cy="7" r="4.5" />
    <path d="M10.5 10.5L14 14" />
  </svg>
);

const ClearIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4l6 6M10 4l-6 6" />
  </svg>
);

const sizeStyles = {
  sm: 'h-8 text-xs',
  md: 'h-10 text-sm',
  lg: 'h-12 text-sm',
};

const Search = forwardRef(function Search(
  {
    size = 'md',
    placeholder = 'Search...',
    value: controlledValue,
    onChange,
    onClear,
    disabled = false,
    className,
    ...rest
  },
  ref
) {
  const [internalValue, setInternalValue] = useState('');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    onClear?.();
    onChange?.({ target: { value: '' } });
  };

  return (
    <div
      className={cn(
        'relative flex items-center border border-border-form bg-surface-input',
        'transition-colors duration-100',
        'hover:border-border-hover focus-within:border-interactive-border',
        disabled && 'opacity-50 pointer-events-none border-border-disabled',
        className
      )}
    >
      <span className="pointer-events-none absolute left-3 flex items-center text-text-tertiary">
        <SearchIcon />
      </span>

      <input
        ref={ref}
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'w-full bg-transparent text-text outline-none placeholder:text-text-placeholder pl-9',
          value ? 'pr-9' : 'pr-3',
          sizeStyles[size]
        )}
        {...rest}
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          tabIndex={-1}
          className="absolute right-3 flex items-center text-text-tertiary hover:text-text transition-colors cursor-pointer"
          aria-label="Clear search"
        >
          <ClearIcon />
        </button>
      )}
    </div>
  );
});

export default Search;
