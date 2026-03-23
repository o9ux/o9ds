import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const sizeStyles = {
  sm: 'text-[10px]',
  md: 'text-xs',
  lg: 'text-sm',
};

const Label = forwardRef(function Label(
  {
    size = 'md',
    required = false,
    optional = false,
    disabled = false,
    htmlFor,
    className,
    children,
    ...rest
  },
  ref
) {
  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={cn(
        'inline-flex items-center gap-1 font-medium',
        sizeStyles[size],
        disabled ? 'text-text-disabled' : 'text-text-secondary',
        className
      )}
      {...rest}
    >
      {children}
      {required && (
        <span className="text-danger" aria-hidden="true">
          *
        </span>
      )}
      {optional && (
        <span className="text-text-tertiary font-normal">(optional)</span>
      )}
    </label>
  );
});

export default Label;
