import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * Switch — binary toggle control.
 *
 * @param {string}  props.label
 * @param {string}  props.description
 * @param {'sm'|'md'} props.size
 * @param {boolean} props.disabled
 * @param {string}  props.className
 */
const Switch = forwardRef(function Switch(
  { label, description, size = 'md', disabled = false, className, id, checked, ...rest },
  ref
) {
  const inputId = id || (label ? `sw-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const trackSize = size === 'sm'
    ? 'w-7 h-4'
    : 'w-9 h-5';

  const thumbSize = size === 'sm'
    ? 'h-3 w-3 left-0.5 peer-checked:translate-x-3'
    : 'h-3.5 w-3.5 left-0.5 peer-checked:translate-x-[18px]';

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'group inline-flex cursor-pointer items-start gap-3',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
    >
      <span className={cn('relative mt-0.5 shrink-0', trackSize)}>
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={inputId}
          checked={checked}
          disabled={disabled}
          className="peer sr-only"
          {...rest}
        />
        {/* Track */}
        <span
          className={cn(
            'absolute inset-0 rounded-full border border-border-form bg-surface-chip transition-colors duration-150',
            'peer-checked:border-interactive peer-checked:bg-interactive',
            'peer-focus-visible:ring-1 peer-focus-visible:ring-interactive-border peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-surface',
            'group-hover:border-border-hover'
          )}
        />
        {/* Thumb */}
        <span
          className={cn(
            'pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-text-tertiary shadow transition-all duration-150',
            'peer-checked:bg-on-interactive',
            thumbSize
          )}
        />
      </span>

      {(label || description) && (
        <span className="flex flex-col gap-0.5">
          {label && <span className="text-sm text-text leading-tight select-none">{label}</span>}
          {description && (
            <span className="text-xs text-text-tertiary leading-snug select-none">{description}</span>
          )}
        </span>
      )}
    </label>
  );
});

export default Switch;
