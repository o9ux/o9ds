import { forwardRef, useState } from 'react';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';

import blockerSvg from '@/assets/icons/o9con-blocker-action-filled-alt.svg?raw';
import checkCircleSvg from '@/assets/icons/o9con-check-circle.svg?raw';
import exclamationSvg from '@/assets/icons/o9con-exclamation-triangle-filled.svg?raw';
import eyeSvg from '@/assets/icons/o9con-eye.svg?raw';
import eyeSlashSvg from '@/assets/icons/o9con-eye-slash.svg?raw';

/**
 * Textbox — single-line text input field with bottom-border styling.
 *
 * @param {'sm'|'md'|'lg'} props.size        — sm=24px, md=32px, lg=40px
 * @param {'default'|'error'|'success'|'warning'} props.status
 * @param {string}    props.label         — label text
 * @param {string}    props.helperText    — helper / description below the field
 * @param {string}    props.errorText     — error message (replaces helperText when status=error)
 * @param {ReactNode} props.leadingIcon   — icon inside the left edge
 * @param {ReactNode} props.trailingIcon  — icon inside the right edge (overrides status icon)
 * @param {number}    props.maxLength     — max character count (also sets native maxlength)
 * @param {boolean}   props.showCount     — show live character counter (requires maxLength)
 * @param {boolean}   props.disabled
 * @param {boolean}   props.readOnly
 * @param {string}    props.className     — applied to outer wrapper
 */

/* ── Status trailing icons ── */
const statusIcons = {
  error: blockerSvg,
  success: checkCircleSvg,
  warning: exclamationSvg,
};

/* ── Focus border colors per status ── */
const focusBorderColors = {
  default: 'var(--color-interactive-border)',
  error:   'var(--color-danger)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
};

const Textbox = forwardRef(function Textbox(
  {
    size = 'md',
    status = 'default',
    label,
    helperText,
    errorText,
    leadingIcon,
    trailingIcon,
    maxLength,
    showCount = false,
    disabled = false,
    readOnly = false,
    type,
    className,
    id,
    ...rest
  },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  /* ── Track focus state for border highlight ── */
  const [focused, setFocused] = useState(false);

  /* ── Track length for character count ── */
  const [internalLength, setInternalLength] = useState(
    () => (rest.value ?? rest.defaultValue ?? '').length
  );
  const currentLength = rest.value !== undefined ? String(rest.value).length : internalLength;

  /* ── Password visibility toggle ── */
  const isPassword = type === 'password';
  const [showPassword, setShowPassword] = useState(false);
  const resolvedType = isPassword && showPassword ? 'text' : type;

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

  /* ── Resolve trailing icon: password toggle > explicit prop > status icon ── */
  const hasPasswordToggle = isPassword && !trailingIcon;
  const resolvedTrailingIcon = hasPasswordToggle
    ? null
    : trailingIcon || (statusIcons[status] ? <O9Icon svg={statusIcons[status]} /> : null);

  /* ── Size variants ── */
  const sizeStyles = {
    sm: 'h-6 px-2 text-xs',
    md: 'h-8 px-3 text-xs',
    lg: 'h-10 px-3 text-sm',
  };

  /* ── Icon sizes per input size ── */
  const iconSize = {
    sm: '[&_svg]:h-3 [&_svg]:w-3',
    md: '[&_svg]:h-3.5 [&_svg]:w-3.5',
    lg: '[&_svg]:h-4 [&_svg]:w-4',
  };

  /* ── Icon container sizes per input size ── */
  const iconContainerSize = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  /* ── Icon positioning per size ── */
  const iconLeft = { sm: 'left-2', md: 'left-3', lg: 'left-3' };
  const iconRight = { sm: 'right-2', md: 'right-3', lg: 'right-3' };
  const inputPadLeft = { sm: 'pl-6', md: 'pl-8', lg: 'pl-9' };
  const inputPadRight = { sm: 'pr-6', md: 'pr-8', lg: 'pr-9' };

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

  /* ── Status message icons (same icons, shown before message text) ── */
  const messageIconSvg = statusIcons[status] || null;

  const messageText = status === 'error' ? errorText : helperText;
  const hasFooter = messageText || (showCount && maxLength);
  const hasTrailing = resolvedTrailingIcon || hasPasswordToggle;

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
          'relative flex items-center border-b',
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
              'pointer-events-none absolute top-1/2 -translate-y-1/2 flex shrink-0 items-center justify-center text-text-tertiary',
              iconLeft[size],
              iconContainerSize[size],
              iconSize[size]
            )}
          >
            {leadingIcon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          type={resolvedType}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          style={{ outline: 'none' }}
          className={cn(
            'w-full bg-transparent text-text placeholder:text-text-placeholder',
            sizeStyles[size],
            leadingIcon && inputPadLeft[size],
            hasTrailing && inputPadRight[size]
          )}
          {...rest}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {/* Password toggle button */}
        {hasPasswordToggle && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 flex shrink-0 items-center justify-center text-text-tertiary hover:text-text cursor-pointer',
              iconRight[size],
              iconContainerSize[size],
              iconSize[size]
            )}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <O9Icon svg={showPassword ? eyeSlashSvg : eyeSvg} />
          </button>
        )}

        {/* Status or custom trailing icon */}
        {resolvedTrailingIcon && (
          <span
            className={cn(
              'pointer-events-none absolute top-1/2 -translate-y-1/2 flex shrink-0 items-center justify-center',
              status !== 'default' ? statusText[status] : 'text-text-tertiary',
              iconRight[size],
              iconContainerSize[size],
              iconSize[size]
            )}
          >
            {resolvedTrailingIcon}
          </span>
        )}
      </div>

      {hasFooter && (
        <div className="flex items-start justify-between gap-2">
          {messageText ? (
            <p className={cn('text-xs flex items-center gap-1', statusText[status])}>
              {messageIconSvg && (
                <span className="shrink-0 w-3 h-3 [&_svg]:h-3 [&_svg]:w-3 flex items-center justify-center">
                  <O9Icon svg={messageIconSvg} />
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

export default Textbox;
