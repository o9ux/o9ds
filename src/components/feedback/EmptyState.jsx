import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const EmptyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="6" y="10" width="36" height="28" rx="2" />
    <path d="M6 18h36" />
    <circle cx="24" cy="30" r="4" />
    <path d="M20 38h8" strokeLinecap="round" />
  </svg>
);

const EmptyState = forwardRef(function EmptyState(
  {
    icon,
    title = 'No data found',
    description,
    action,
    size = 'md',
    className,
    ...rest
  },
  ref
) {
  const sizeStyles = {
    sm: 'py-8 px-4',
    md: 'py-12 px-6',
    lg: 'py-16 px-8',
  };

  const iconSizes = {
    sm: '[&_svg]:h-8 [&_svg]:w-8',
    md: '[&_svg]:h-12 [&_svg]:w-12',
    lg: '[&_svg]:h-16 [&_svg]:w-16',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center justify-center text-center',
        sizeStyles[size],
        className
      )}
      {...rest}
    >
      <span className={cn('text-text-tertiary mb-4', iconSizes[size])}>
        {icon || <EmptyIcon />}
      </span>

      <h3
        className={cn(
          'font-bold text-text',
          size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'
        )}
      >
        {title}
      </h3>

      {description && (
        <p
          className={cn(
            'text-text-secondary mt-1.5 max-w-sm',
            size === 'sm' ? 'text-xs' : 'text-sm'
          )}
        >
          {description}
        </p>
      )}

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
});

export default EmptyState;
