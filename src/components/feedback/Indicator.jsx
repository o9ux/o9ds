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

const shapeStyles = {
  circle: 'rounded-circle',
  rect: 'rounded-none',
};

/**
 * Indicator — small colored dot (or rectangle) that conveys status.
 *
 * Props:
 * - status: online | offline | busy | away | neutral
 * - size: sm | md | lg
 * - shape: circle (default) | rect (rectangular / box)
 * - pulse: boolean — pulsing animation
 * - label: optional text beside the dot
 */
const Indicator = forwardRef(function Indicator(
  {
    status = 'online',
    size = 'md',
    shape = 'circle',
    pulse = false,
    label,
    className,
    ...rest
  },
  ref
) {
  const shapeClass = shapeStyles[shape] || shapeStyles.circle;

  return (
    <span
      ref={ref}
      className={cn('inline-flex items-center gap-1.5', className)}
      {...rest}
    >
      <span className="relative inline-flex">
        <span
          className={cn(
            shapeClass,
            statusColors[status],
            sizeStyles[size]
          )}
        />
        {pulse && (
          <span
            className={cn(
              'absolute inset-0 animate-ping opacity-50',
              shapeClass,
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
