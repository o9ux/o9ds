import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * Textbox — single-line text input field.
 *
 * @param {'sm'|'md'|'lg'} props.size
 * @param {'default'|'error'|'success'|'warning'} props.status
 * @param {string}    props.label         — label text
 * @param {string}    props.helperText    — helper / description below the field
 * @param {string}    props.errorText     — error message (replaces helperText when status=error)
 * @param {ReactNode} props.leadingIcon   — icon inside the left edge
 * @param {ReactNode} props.trailingIcon  — icon inside the right edge
 * @param {boolean}   props.disabled
 * @param {boolean}   props.readOnly
 * @param {string}    props.className     — applied to outer wrapper
 */
const Textbox = forwardRef(function Textbox(
  {
    size = 'md',
    status = 'default',
    label,
    helperText,
    errorText,
    leadingIcon,
    trailingIcon,
    disabled = false,
    readOnly = false,
    className,
    id,
    ...rest
  },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const sizeStyles = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-3 text-sm',
    lg: 'h-12 px-4 text-sm',
  };

  const statusBorder = {
    default: 'border-border-form hover:border-border-hover focus-within:border-interactive-border',
    error:   'border-danger hover:border-danger focus-within:border-danger',
    success: 'border-success/60 hover:border-success focus-within:border-success',
    warning: 'border-warning/60 hover:border-warning focus-within:border-warning',
  };

  const statusText = {
    default: 'text-text-tertiary',
    error:   'text-danger',
    success: 'text-success',
    warning: 'text-warning',
  };

  const messageText = status === 'error' ? errorText : helperText;

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
        {leadingIcon && (
          <span className="pointer-events-none absolute left-3 flex shrink-0 items-center text-text-tertiary [&>svg]:h-4 [&>svg]:w-4">
            {leadingIcon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          readOnly={readOnly}
          className={cn(
            'w-full bg-transparent text-text outline-none placeholder:text-text-placeholder',
            sizeStyles[size],
            leadingIcon && 'pl-9',
            trailingIcon && 'pr-9'
          )}
          {...rest}
        />

        {trailingIcon && (
          <span className="pointer-events-none absolute right-3 flex shrink-0 items-center text-text-tertiary [&>svg]:h-4 [&>svg]:w-4">
            {trailingIcon}
          </span>
        )}
      </div>

      {messageText && (
        <p className={cn('text-xs', statusText[status])}>
          {messageText}
        </p>
      )}
    </div>
  );
});

export default Textbox;
