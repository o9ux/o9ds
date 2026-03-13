import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * Radio — single option within a radio group.
 *
 * @param {string}  props.label
 * @param {string}  props.description
 * @param {boolean} props.disabled
 * @param {string}  props.className
 */
const Radio = forwardRef(function Radio(
  { label, description, disabled = false, className, id, ...rest },
  ref
) {
  const inputId = id || (label ? `radio-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'group inline-flex cursor-pointer gap-3',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
    >
      {/* Control — all children are siblings of input so peer-* selectors work */}
      <span className="relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
        <input
          ref={ref}
          type="radio"
          id={inputId}
          disabled={disabled}
          className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0 z-10"
          {...rest}
        />
        {/* Outer ring — sibling of input ✓ */}
        <span
          className={cn(
            'pointer-events-none absolute inset-0 rounded-full border border-border-form bg-surface-input transition-colors duration-100',
            'peer-checked:border-interactive-border',
            'peer-focus-visible:ring-1 peer-focus-visible:ring-interactive-border peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-surface',
            'group-hover:border-border-hover'
          )}
        />
        {/* Inner dot — sibling of input ✓ */}
        <span
          className={cn(
            'pointer-events-none h-2 w-2 rounded-full bg-interactive scale-0 transition-transform duration-150',
            'peer-checked:scale-100'
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

export default Radio;
