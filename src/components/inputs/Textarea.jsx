import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Textarea = forwardRef(function Textarea(
  {
    size = 'md',
    status = 'default',
    label,
    helperText,
    errorText,
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

  const sizeStyles = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-3 py-2.5 text-sm',
    lg: 'px-4 py-3 text-sm',
  };

  const statusBorder = {
    default:
      'border-border-form hover:border-border-hover focus-within:border-interactive-border',
    error: 'border-danger hover:border-danger focus-within:border-danger',
    success:
      'border-success/60 hover:border-success focus-within:border-success',
    warning:
      'border-warning/60 hover:border-warning focus-within:border-warning',
  };

  const statusText = {
    default: 'text-text-tertiary',
    error: 'text-danger',
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
          'border bg-surface-input transition-colors duration-100',
          statusBorder[status],
          disabled && 'opacity-50 pointer-events-none border-border-disabled',
          readOnly && 'bg-surface-raised border-border-form'
        )}
      >
        <textarea
          ref={ref}
          id={inputId}
          disabled={disabled}
          readOnly={readOnly}
          rows={rows}
          className={cn(
            'w-full bg-transparent text-text outline-none placeholder:text-text-placeholder',
            sizeStyles[size],
            resizeClass[resize]
          )}
          {...rest}
        />
      </div>

      {messageText && (
        <p className={cn('text-xs', statusText[status])}>{messageText}</p>
      )}
    </div>
  );
});

export default Textarea;
