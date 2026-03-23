import { forwardRef, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';

import blockerSvg from '@/assets/icons/o9con-blocker-action-filled-alt.svg?raw';

/**
 * Checkbox — binary checked/unchecked control with optional indeterminate state.
 *
 * Variants from Figma:
 *  - size: sm (14px) | md (16px) | lg (18px)
 *  - types: unchecked, checked, indeterminate, checked+exclude (danger)
 *  - states: enable, hover, focus, disabled, read-only, error
 *
 * A11Y:
 *  - Native <input type="checkbox"> for full keyboard + screen reader support
 *  - indeterminate DOM property set via ref for mixed state announcement
 *  - aria-invalid, aria-readonly, aria-describedby for state communication
 *  - Focus ring via :focus-visible for keyboard navigation
 *  - Label linked via htmlFor/id
 */
const Checkbox = forwardRef(function Checkbox(
  {
    label,
    description,
    size = 'md',
    indeterminate = false,
    exclude = false,
    disabled = false,
    readOnly = false,
    error = false,
    errorText,
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

  /* ── Set indeterminate DOM property (not settable via HTML attribute) ── */
  const internalRef = useRef(null);
  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const mergedRef = (el) => {
    internalRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  };

  const handleChange = (e) => {
    if (readOnly) return;
    onChange?.(e);
  };

  /* ── Size config ── */
  const boxSize = { sm: 'h-3.5 w-3.5', md: 'h-4 w-4', lg: 'h-[18px] w-[18px]' };
  const iconSize = { sm: 'h-2.5 w-2.5', md: 'h-3 w-3', lg: 'h-3.5 w-3.5' };
  const labelText = { sm: 'text-xs', md: 'text-xs', lg: 'text-sm' };
  const descText = { sm: 'text-[10px]', md: 'text-[11px]', lg: 'text-xs' };
  const gap = { sm: 'gap-2', md: 'gap-2', lg: 'gap-2.5' };
  const errorIndent = { sm: 'ml-[22px]', md: 'ml-6', lg: 'ml-7' };

  /* ── Box fill when checked/indeterminate ── */
  const checkedFill = exclude
    ? 'bg-danger border-danger'
    : 'bg-interactive border-interactive';

  const hasError = error && errorText;

  /* ── A11Y: aria-describedby IDs ── */
  const descId = description && inputId ? `${inputId}-desc` : undefined;
  const errorId = hasError && inputId ? `${inputId}-error` : undefined;
  const describedBy = [descId, errorId].filter(Boolean).join(' ') || undefined;

  const hasSecondaryText = description || hasError;

  const control = (
    <label
      htmlFor={inputId}
      className={cn(
        'group inline-flex cursor-pointer', gap[size],
        hasSecondaryText ? 'items-start' : 'items-center',
        disabled && 'pointer-events-none opacity-50',
        readOnly && 'pointer-events-none',
        !hasError && className
      )}
    >
      {/* Control */}
      <span className={cn('relative flex shrink-0 items-center justify-center', hasSecondaryText && 'mt-0.5', boxSize[size])}>
        <input
          ref={mergedRef}
          type="checkbox"
          id={inputId}
          checked={isChecked}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleChange}
          aria-invalid={error || undefined}
          aria-readonly={readOnly || undefined}
          aria-describedby={describedBy}
          className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0 z-10"
          {...rest}
        />

        {/* Box background */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 border transition-colors duration-100',
            showMark
              ? checkedFill
              : 'bg-transparent border-border-form',
            !showMark && 'group-hover:border-border-hover',
            showMark && !exclude && 'group-hover:bg-interactive-hover group-hover:border-interactive-hover',
            error && !showMark && 'border-danger',
            readOnly && 'border-dashed border-border-strong',
            'peer-focus-visible:ring-1 peer-focus-visible:ring-interactive-border peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-surface',
          )}
        />

        {/* Check / indeterminate icon — sharp stroked paths */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none relative z-[1] flex items-center justify-center transition-opacity duration-100',
            showMark ? 'opacity-100' : 'opacity-0'
          )}
        >
          <svg
            className={cn(iconSize[size], 'text-on-interactive')}
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            focusable="false"
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
            <span className={cn(labelText[size], 'text-text leading-tight select-none')}>{label}</span>
          )}
          {description && (
            <span id={descId} className={cn(descText[size], 'text-text-tertiary leading-snug select-none')}>{description}</span>
          )}
        </span>
      )}
    </label>
  );

  if (!hasError) return control;

  return (
    <div className={cn('inline-flex flex-col gap-0.5', className)}>
      {control}
      <p id={errorId} role="alert" className={cn('text-xs flex items-center gap-1 text-danger', errorIndent[size])}>
        <span aria-hidden="true" className="shrink-0 w-3 h-3 [&_svg]:h-3 [&_svg]:w-3 flex items-center justify-center">
          <O9Icon svg={blockerSvg} />
        </span>
        <span>{errorText}</span>
      </p>
    </div>
  );
});

export default Checkbox;
