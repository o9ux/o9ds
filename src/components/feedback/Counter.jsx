import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const variantStyles = {
  filled: 'bg-interactive text-on-interactive',
  danger: 'bg-danger text-white-static',
  subtle: 'bg-interactive-muted-hover text-text',
};

const sizeStyles = {
  sm: 'h-4 min-w-4 text-[9px] px-1',
  md: 'h-5 min-w-5 text-[10px] px-1.5',
  lg: 'h-6 min-w-6 text-xs px-2',
};

const Counter = forwardRef(function Counter(
  {
    variant = 'filled',
    size = 'md',
    count = 0,
    max,
    pulse = false,
    className,
    ...rest
  },
  ref
) {
  const displayCount =
    max !== undefined && count > max ? `${max}+` : String(count);

  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-bold rounded-full leading-none',
        variantStyles[variant],
        sizeStyles[size],
        pulse && 'animate-pulse',
        className
      )}
      {...rest}
    >
      {displayCount}
    </span>
  );
});

export default Counter;
