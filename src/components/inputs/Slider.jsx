import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const sizeStyles = {
  sm: 'h-1',
  md: 'h-1.5',
  lg: 'h-2',
};

const thumbSizeStyles = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

const Slider = forwardRef(function Slider(
  {
    size = 'md',
    min = 0,
    max = 100,
    step = 1,
    value,
    defaultValue,
    onChange,
    label,
    showValue = false,
    disabled = false,
    className,
    id,
    ...rest
  },
  ref
) {
  const inputId =
    id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const pct =
    value !== undefined
      ? ((value - min) / (max - min)) * 100
      : undefined;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
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
          {showValue && value !== undefined && (
            <span
              className={cn(
                'text-xs tabular-nums',
                disabled ? 'text-text-disabled' : 'text-text'
              )}
            >
              {value}
            </span>
          )}
        </div>
      )}

      <div className="relative flex items-center">
        <input
          ref={ref}
          type="range"
          id={inputId}
          min={min}
          max={max}
          step={step}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            'w-full appearance-none bg-transparent cursor-pointer',
            'disabled:opacity-50 disabled:pointer-events-none',
            /* Track */
            '[&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-interactive-muted',
            `[&::-webkit-slider-runnable-track]:${sizeStyles[size]}`,
            /* Thumb */
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full',
            '[&::-webkit-slider-thumb]:bg-interactive [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-interactive',
            '[&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:-mt-1.5',
            `[&::-webkit-slider-thumb]:${thumbSizeStyles[size]}`,
            '[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110',
            /* Firefox */
            '[&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-interactive-muted',
            `[&::-moz-range-track]:${sizeStyles[size]}`,
            '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-interactive',
            '[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-interactive',
            `[&::-moz-range-thumb]:${thumbSizeStyles[size]}`,
            /* Focus */
            'focus-visible:outline-none [&:focus-visible::-webkit-slider-thumb]:ring-2 [&:focus-visible::-webkit-slider-thumb]:ring-interactive-border/50 [&:focus-visible::-webkit-slider-thumb]:ring-offset-1 [&:focus-visible::-webkit-slider-thumb]:ring-offset-surface'
          )}
          {...rest}
        />
      </div>
    </div>
  );
});

export default Slider;
