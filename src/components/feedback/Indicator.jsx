import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const statusColors = {
  online: 'bg-success',
  offline: 'bg-text-tertiary',
  busy: 'bg-danger',
  away: 'bg-warning',
  neutral: 'bg-interactive/40',
};

const sizeStyles = {
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
};

const Indicator = forwardRef(function Indicator(
  {
    status = 'online',
    size = 'md',
    pulse = false,
    label,
    className,
    ...rest
  },
  ref
) {
  return (
    <span
      ref={ref}
      className={cn('inline-flex items-center gap-1.5', className)}
      {...rest}
    >
      <span className="relative inline-flex">
        <span
          className={cn(
            'rounded-full',
            statusColors[status],
            sizeStyles[size]
          )}
        />
        {pulse && (
          <span
            className={cn(
              'absolute inset-0 rounded-full animate-ping opacity-50',
              statusColors[status]
            )}
          />
        )}
      </span>
      {label && (
        <span className="text-xs text-text-secondary">{label}</span>
      )}
    </span>
  );
});

export default Indicator;
