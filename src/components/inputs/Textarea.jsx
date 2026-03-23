import { forwardRef, useState } from 'react';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';

import blockerSvg from '@/assets/icons/o9con-blocker-action-filled-alt.svg?raw';

/**
 * Textarea — multi-line text input with bottom-border styling.
 *
 * Matches Textbox patterns: bottom-border, bg-surface-input,
 * React-based focus tracking, character count, and status icons.
 */

/* ── Focus border colors per status ── */
const focusBorderColors = {
  default: 'var(--color-interactive-border)',
  error:   'var(--color-danger)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
};

const Textarea = forwardRef(function Textarea(
  {
    size = 'md',
    status = 'default',
    label,
    helperText,
    errorText,
    leadingIcon,
    maxLength,
    showCount = false,
    disabled = false,
    readOnly = false,
    resize = 'vertical',
    rows = 4,
    className,
    id,
    ...rest
  },
  ref
) {
  const inputId =
    id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  /* ── Track focus state for border highlight ── */
  const [focused, setFocused] = useState(false);

  /* ── Track length for character count ── */
  const [internalLength, setInternalLength] = useState(
    () => (rest.value ?? rest.defaultValue ?? '').length
  );
  const currentLength = rest.value !== undefined ? String(rest.value).length : internalLength;

  const handleChange = (e) => {
    setInternalLength(e.target.value.length);
    rest.onChange?.(e);
  };

  const handleFocus = (e) => {
    setFocused(true);
    rest.onFocus?.(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    rest.onBlur?.(e);
  };

  /* ── Size variants ── */
  const sizeStyles = {
    sm: 'py-1.5 text-xs',
    md: 'py-2 text-xs',
    lg: 'py-2.5 text-sm',
  };

  const padBase = { sm: 'px-2', md: 'px-3', lg: 'px-3' };

  /* ── Icon sizes per input size ── */
  const iconSize = {
    sm: '[&_svg]:h-3 [&_svg]:w-3',
    md: '[&_svg]:h-3.5 [&_svg]:w-3.5',
    lg: '[&_svg]:h-4 [&_svg]:w-4',
  };

  const iconContainerSize = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  const iconLeft = { sm: 'left-2', md: 'left-3', lg: 'left-3' };
  const inputPadLeft = { sm: 'pl-6', md: 'pl-8', lg: 'pl-9' };

  /* ── Status border colors (default/hover only — focus handled via React state) ── */
  const statusBorder = {
    default: 'border-border-hover hover:border-border-strong',
    error:   'border-danger',
    success: 'border-success/60 hover:border-success',
    warning: 'border-warning/60 hover:border-warning',
  };

  /* ── Status text colors ── */
  const statusText = {
    default: 'text-text-tertiary',
    error:   'text-danger',
    success: 'text-success',
    warning: 'text-warning',
  };

  const resizeClass = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  };

  const messageText = status === 'error' ? errorText : helperText;
  const hasFooter = messageText || (showCount && maxLength != null);

  return (
    <div className={cn('flex flex-col gap-1', className)}>
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
          'relative border-b',
          'bg-surface-input hover:bg-surface-input-hover transition-[background-color] duration-100',
          !focused && statusBorder[status],
          disabled && 'opacity-50 pointer-events-none border-border-disabled bg-surface-input',
          readOnly && 'border-dashed border-border-strong cursor-default'
        )}
        style={focused && !disabled ? { borderBottomColor: focusBorderColors[status] } : undefined}
      >
        {leadingIcon && (
          <span
            className={cn(
              'pointer-events-none absolute top-2 flex shrink-0 items-center justify-center text-text-tertiary',
              iconLeft[size],
              iconContainerSize[size],
              iconSize[size]
            )}
          >
            {leadingIcon}
          </span>
        )}

        <div className={cn('w-full', resize !== 'none' && 'pr-1 pb-1')}>
          <textarea
            ref={ref}
            id={inputId}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            rows={rows}
            style={{ outline: 'none' }}
            className={cn(
              'w-full bg-transparent text-text placeholder:text-text-placeholder',
              sizeStyles[size],
              padBase[size],
              leadingIcon && inputPadLeft[size],
              resizeClass[resize]
            )}
            {...rest}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </div>

      {hasFooter && (
        <div className="flex items-start justify-between gap-2">
          {messageText ? (
            <p className={cn('text-xs flex items-center gap-1', statusText[status])}>
              {status === 'error' && (
                <span className="shrink-0 w-3 h-3 [&_svg]:h-3 [&_svg]:w-3 flex items-center justify-center">
                  <O9Icon svg={blockerSvg} />
                </span>
              )}
              <span>{messageText}</span>
            </p>
          ) : (
            <span />
          )}
          {showCount && maxLength != null && (
            <span className="text-xs text-text-tertiary tabular-nums shrink-0">
              {String(currentLength).padStart(2, '0')}/{String(maxLength).padStart(2, '0')}
            </span>
          )}
        </div>
      )}
    </div>
  );
});

export default Textarea;
