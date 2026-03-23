import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';

import blockerSvg from '@/assets/icons/o9con-blocker-action-filled-alt.svg?raw';

/**
 * Switch — binary toggle control for immediate-effect settings.
 *
 * Variants from Figma (node 25784-972):
 *  - Rectangular sharp track with sliding square thumb
 *  - Checked: black track, white thumb with checkmark
 *  - size: sm (28×16 track) | md (36×20 track) | lg (44×24 track)
 *  - states: enable, hover, focus, disabled, read-only, error
 *
 * A11Y:
 *  - Native <input type="checkbox" role="switch"> for full keyboard + screen reader support
 *  - aria-invalid, aria-readonly, aria-describedby for state communication
 *  - Focus ring via :focus-visible for keyboard navigation
 *  - Label linked via htmlFor/id
 */
const Switch = forwardRef(function Switch(
  {
    label,
    description,
    size = 'md',
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
  const inputId = id || (label ? `sw-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const handleChange = (e) => {
    if (readOnly) return;
    onChange?.(e);
  };

  /* ── Size config ── */
  const trackSize = { sm: 'w-7 h-4', md: 'w-9 h-5', lg: 'w-11 h-6' };
  const thumbSize = {
    sm: 'h-3 w-3 left-0.5 peer-checked:translate-x-3',
    md: 'h-3.5 w-3.5 left-0.5 peer-checked:translate-x-[18px]',
    lg: 'h-[18px] w-[18px] left-[3px] peer-checked:translate-x-5',
  };
  const checkIconSize = { sm: 'h-2 w-2', md: 'h-2.5 w-2.5', lg: 'h-3 w-3' };
  const labelText = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };
  const descText = { sm: 'text-[10px]', md: 'text-xs', lg: 'text-sm' };
  const gap = { sm: 'gap-2', md: 'gap-3', lg: 'gap-3' };
  const errorIndent = { sm: 'ml-9', md: 'ml-12', lg: 'ml-14' };

  const hasError = error && errorText;

  /* ── A11Y: aria-describedby IDs ── */
  const descId = description && inputId ? `${inputId}-desc` : undefined;
  const errorId = hasError && inputId ? `${inputId}-error` : undefined;
  const describedBy = [descId, errorId].filter(Boolean).join(' ') || undefined;

  const hasSecondaryText = description || hasError;
  const hasLabel = label || description;

  const control = (
    <label
      htmlFor={inputId}
      className={cn(
        'group inline-flex cursor-pointer',
        hasLabel && gap[size],
        hasSecondaryText ? 'items-start' : 'items-center',
        disabled && 'pointer-events-none opacity-50',
        readOnly && 'pointer-events-none',
        !hasError && className
      )}
    >
      {/* Control */}
      <span className={cn('relative shrink-0', hasSecondaryText && 'mt-0.5', trackSize[size])}>
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={inputId}
          checked={checked}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleChange}
          aria-invalid={error || undefined}
          aria-readonly={readOnly || undefined}
          aria-describedby={describedBy}
          className="peer sr-only"
          {...rest}
        />
        {/* Track — rectangular sharp */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 border transition-colors duration-150',
            'border-border-form bg-surface-chip',
            error
              ? 'peer-checked:border-danger peer-checked:bg-danger'
              : 'peer-checked:border-interactive peer-checked:bg-interactive',
            'peer-focus-visible:ring-1 peer-focus-visible:ring-interactive-border peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-surface',
            'group-hover:border-border-hover',
            !error && 'peer-checked:group-hover:bg-interactive-hover peer-checked:group-hover:border-interactive-hover',
            error && 'border-danger',
            readOnly && 'border-dashed border-border-strong',
          )}
        />
        {/* Thumb — square with optional checkmark */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute top-1/2 -translate-y-1/2 flex items-center justify-center bg-text-tertiary shadow transition-all duration-150',
            'peer-checked:bg-on-interactive',
            thumbSize[size]
          )}
        >
          {/* Checkmark — visible only when checked */}
          <svg
            className={cn(
              checkIconSize[size],
              'text-interactive transition-opacity duration-100',
              checked ? 'opacity-100' : 'opacity-0'
            )}
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            focusable="false"
          >
            <polyline points="1.5,5 4,7.5 8.5,2.5" />
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
      <p id={errorId} role="alert" className={cn('text-xs flex items-center gap-1 text-danger', hasLabel && errorIndent[size])}>
        <span aria-hidden="true" className="shrink-0 w-3 h-3 [&_svg]:h-3 [&_svg]:w-3 flex items-center justify-center">
          <O9Icon svg={blockerSvg} />
        </span>
        <span>{errorText}</span>
      </p>
    </div>
  );
});

export default Switch;
