import { forwardRef, useState, useCallback } from 'react';
import { cn } from '@/utils/cn';

const ChevronUp = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 7.5l3-3 3 3" />
  </svg>
);

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 4.5l3 3 3-3" />
  </svg>
);

const sizeStyles = {
  sm: 'h-8 text-xs',
  md: 'h-10 text-sm',
  lg: 'h-12 text-sm',
};

const NumberInput = forwardRef(function NumberInput(
  {
    size = 'md',
    status = 'default',
    label,
    helperText,
    errorText,
    min,
    max,
    step = 1,
    value: controlledValue,
    defaultValue = 0,
    onChange,
    disabled = false,
    readOnly = false,
    className,
    id,
    ...rest
  },
  ref
) {
  const inputId =
    id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const statusBorder = {
    default: 'border-border-form hover:border-border-hover focus-within:border-interactive-border',
    error: 'border-danger hover:border-danger focus-within:border-danger',
    success: 'border-success/60 hover:border-success focus-within:border-success',
    warning: 'border-warning/60 hover:border-warning focus-within:border-warning',
  };

  const statusText = {
    default: 'text-text-tertiary',
    error: 'text-danger',
    success: 'text-success',
    warning: 'text-warning',
  };

  const messageText = status === 'error' ? errorText : helperText;

  const updateValue = useCallback(
    (newVal) => {
      let clamped = newVal;
      if (min !== undefined) clamped = Math.max(min, clamped);
      if (max !== undefined) clamped = Math.min(max, clamped);
      if (!isControlled) setInternalValue(clamped);
      onChange?.({ target: { value: clamped } });
    },
    [min, max, isControlled, onChange]
  );

  const increment = () => updateValue(Number(value) + step);
  const decrement = () => updateValue(Number(value) - step);

  const handleChange = (e) => {
    const num = parseFloat(e.target.value);
    if (!isNaN(num)) {
      updateValue(num);
    } else if (e.target.value === '' || e.target.value === '-') {
      if (!isControlled) setInternalValue(e.target.value);
    }
  };

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
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

      <div
        className={cn(
          'relative flex items-center border bg-surface-input transition-colors duration-100',
          statusBorder[status],
          disabled && 'opacity-50 pointer-events-none border-border-disabled',
          readOnly && 'bg-surface-raised border-border-form'
        )}
      >
        <input
          ref={ref}
          id={inputId}
          type="number"
          inputMode="numeric"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          readOnly={readOnly}
          className={cn(
            'w-full bg-transparent text-text outline-none placeholder:text-text-placeholder px-3 pr-8',
            'appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
            sizeStyles[size]
          )}
          {...rest}
        />

        {!readOnly && (
          <div className="absolute right-0 top-0 bottom-0 flex flex-col border-l border-border-form">
            <button
              type="button"
              tabIndex={-1}
              onClick={increment}
              disabled={disabled || (max !== undefined && Number(value) >= max)}
              className="flex-1 flex items-center justify-center px-1.5 text-text-tertiary hover:text-text hover:bg-interactive-subtle transition-colors cursor-pointer disabled:opacity-35 disabled:pointer-events-none"
              aria-label="Increase"
            >
              <ChevronUp />
            </button>
            <div className="h-px bg-border-form" />
            <button
              type="button"
              tabIndex={-1}
              onClick={decrement}
              disabled={disabled || (min !== undefined && Number(value) <= min)}
              className="flex-1 flex items-center justify-center px-1.5 text-text-tertiary hover:text-text hover:bg-interactive-subtle transition-colors cursor-pointer disabled:opacity-35 disabled:pointer-events-none"
              aria-label="Decrease"
            >
              <ChevronDown />
            </button>
          </div>
        )}
      </div>

      {messageText && (
        <p className={cn('text-xs', statusText[status])}>{messageText}</p>
      )}
    </div>
  );
});

export default NumberInput;
