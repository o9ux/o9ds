import { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 6l4 4 4-4" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 7l3 3 5-5" />
  </svg>
);

const sizeStyles = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-3 text-sm',
  lg: 'h-12 px-4 text-sm',
};

const SelectDropdown = forwardRef(function SelectDropdown(
  {
    size = 'md',
    status = 'default',
    label,
    helperText,
    errorText,
    placeholder = 'Select...',
    options = [],
    value: controlledValue,
    onChange,
    disabled = false,
    className,
    id,
    ...rest
  },
  ref
) {
  const inputId =
    id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const [internalValue, setInternalValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const selectedOption = options.find((opt) =>
    typeof opt === 'string' ? opt === value : opt.value === value
  );
  const displayLabel = selectedOption
    ? typeof selectedOption === 'string'
      ? selectedOption
      : selectedOption.label
    : '';

  const statusBorder = {
    default: 'border-border-form hover:border-border-hover',
    error: 'border-danger hover:border-danger',
    success: 'border-success/60 hover:border-success',
    warning: 'border-warning/60 hover:border-warning',
  };

  const statusText = {
    default: 'text-text-tertiary',
    error: 'text-danger',
    success: 'text-success',
    warning: 'text-warning',
  };

  const messageText = status === 'error' ? errorText : helperText;

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  const handleSelect = (optValue) => {
    if (!isControlled) setInternalValue(optValue);
    onChange?.(optValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            'text-xs font-medium',
            disabled ? 'text-text-disabled' : 'text-text-secondary'
          )}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <button
          ref={ref}
          id={inputId}
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className={cn(
            'w-full flex items-center justify-between border bg-surface-input transition-colors duration-100',
            'cursor-pointer focus-visible:outline-none focus-visible:border-interactive-border',
            statusBorder[status],
            isOpen && 'border-interactive-border',
            disabled && 'opacity-50 pointer-events-none border-border-disabled',
            sizeStyles[size]
          )}
          {...rest}
        >
          <span
            className={cn(
              'truncate',
              displayLabel ? 'text-text' : 'text-text-placeholder'
            )}
          >
            {displayLabel || placeholder}
          </span>
          <span
            className={cn(
              'shrink-0 ml-2 text-text-tertiary transition-transform duration-150',
              isOpen && 'rotate-180'
            )}
          >
            <ChevronDown />
          </span>
        </button>

        {isOpen && (
          <div
            role="listbox"
            className="absolute top-full left-0 right-0 mt-1 z-50 bg-surface-raised border border-border py-1 max-h-60 overflow-y-auto"
          >
            {options.map((opt) => {
              const optValue = typeof opt === 'string' ? opt : opt.value;
              const optLabel = typeof opt === 'string' ? opt : opt.label;
              const optDisabled =
                typeof opt === 'object' ? opt.disabled : false;
              const isSelected = optValue === value;

              return (
                <button
                  key={optValue}
                  role="option"
                  aria-selected={isSelected}
                  disabled={optDisabled}
                  onClick={() => handleSelect(optValue)}
                  className={cn(
                    'w-full text-left px-3 py-2 text-sm flex items-center justify-between',
                    'transition-colors cursor-pointer',
                    isSelected
                      ? 'bg-interactive-muted text-text'
                      : 'text-text hover:bg-interactive-subtle',
                    optDisabled && 'opacity-35 pointer-events-none'
                  )}
                >
                  <span className="truncate">{optLabel}</span>
                  {isSelected && (
                    <span className="shrink-0 ml-2 text-text">
                      <CheckIcon />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {messageText && (
        <p className={cn('text-xs', statusText[status])}>{messageText}</p>
      )}
    </div>
  );
});

export default SelectDropdown;
