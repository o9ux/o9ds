import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * Checkbox — binary checked/unchecked control with optional indeterminate state.
 *
 * @param {string}  props.label
 * @param {string}  props.description  — helper text below the label
 * @param {boolean} props.indeterminate — visual-only partial-check state
 * @param {boolean} props.disabled
 * @param {string}  props.className    — applied to wrapper
 */
const Checkbox = forwardRef(function Checkbox(
  {
    label,
    description,
    indeterminate = false,
    disabled = false,
    className,
    id,
    checked,
    onChange,
    ...rest
  },
  ref
) {
  const inputId = id || (label ? `cb-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const isChecked = !!checked;
  const showMark = isChecked || indeterminate;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'group inline-flex cursor-pointer gap-3',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
    >
      {/* Control — all siblings of the peer input so peer-* selectors work */}
      <span className="relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          checked={isChecked}
          disabled={disabled}
          onChange={onChange}
          className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0 z-10"
          {...rest}
        />

        {/* Box background — sibling of input ✓ */}
        <span
          className={cn(
            'pointer-events-none absolute inset-0 border border-border-form bg-surface-input transition-colors duration-100',
            'peer-checked:bg-interactive peer-checked:border-interactive',
            indeterminate && !isChecked && 'bg-interactive border-interactive',
            'peer-focus-visible:ring-1 peer-focus-visible:ring-interactive-border peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-surface',
            'group-hover:border-border-hover'
          )}
        />

        {/* Check / indeterminate icon — always in DOM, shown by opacity */}
        <span
          className={cn(
            'pointer-events-none relative z-[1] flex items-center justify-center transition-opacity duration-100',
            showMark ? 'opacity-100' : 'opacity-0 peer-checked:opacity-100'
          )}
        >
          <svg
            className="h-2.5 w-2.5 text-on-interactive"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {indeterminate && !isChecked
              ? <line x1="2" y1="5" x2="8" y2="5" />
              : <polyline points="1.5,5 4,7.5 8.5,2.5" />
            }
          </svg>
        </span>
      </span>

      {(label || description) && (
        <span className="flex flex-col gap-0.5">
          {label && (
            <span className="text-sm text-text leading-tight select-none">{label}</span>
          )}
          {description && (
            <span className="text-xs text-text-tertiary leading-snug select-none">{description}</span>
          )}
        </span>
      )}
    </label>
  );
});

export default Checkbox;
