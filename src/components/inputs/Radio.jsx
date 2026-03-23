import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';

import blockerSvg from '@/assets/icons/o9con-blocker-action-filled-alt.svg?raw';

/**
 * Radio — single option within a radio group.
 *
 * Variants from Figma:
 *  - size: sm (14px) | md (16px) | lg (18px)
 *  - states: enable, hover, focus, disabled, read-only, error
 *
 * A11Y:
 *  - Native <input type="radio"> for full keyboard + screen reader support
 *  - aria-invalid, aria-readonly, aria-describedby for state communication
 *  - Focus ring via :focus-visible for keyboard navigation
 *  - Label linked via htmlFor/id
 */
const Radio = forwardRef(function Radio(
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
    name,
    value,
    checked,
    onChange,
    ...rest
  },
  ref
) {
  const inputId = id || (label ? `radio-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const handleChange = (e) => {
    if (readOnly) return;
    onChange?.(e);
  };

  /* ── Size config ── */
  const boxSize = { sm: 'h-3.5 w-3.5', md: 'h-4 w-4', lg: 'h-[18px] w-[18px]' };
  const dotSize = { sm: 'h-1.5 w-1.5', md: 'h-2 w-2', lg: 'h-2.5 w-2.5' };
  const labelText = { sm: 'text-xs', md: 'text-xs', lg: 'text-sm' };
  const descText = { sm: 'text-[10px]', md: 'text-[11px]', lg: 'text-xs' };
  const gap = { sm: 'gap-2', md: 'gap-2', lg: 'gap-2' };
  const errorIndent = { sm: 'ml-[22px]', md: 'ml-6', lg: 'ml-[26px]' };

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
          ref={ref}
          type="radio"
          id={inputId}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleChange}
          aria-invalid={error || undefined}
          aria-readonly={readOnly || undefined}
          aria-describedby={describedBy}
          className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0 z-10"
          {...rest}
        />

        {/* Outer ring */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 rounded-full border transition-colors duration-100',
            checked
              ? 'border-interactive-border'
              : 'bg-transparent border-border-form',
            !checked && 'group-hover:border-border-hover',
            checked && 'group-hover:border-interactive-hover',
            error && 'border-danger',
            readOnly && 'border-dashed border-border-strong',
            'peer-focus-visible:ring-1 peer-focus-visible:ring-interactive-border peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-surface',
          )}
        />

        {/* Inner dot */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none rounded-full transition-transform duration-150',
            error ? 'bg-danger' : 'bg-interactive',
            dotSize[size],
            checked ? 'scale-100' : 'scale-0'
          )}
        />
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

export default Radio;
