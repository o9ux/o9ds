import { Children, isValidElement } from 'react';
import { cn } from '@/utils/cn';
import Avatar from './Avatar';

const overlapStyles = {
  xs: '-ml-1.5',
  sm: '-ml-2',
  md: '-ml-2.5',
  lg: '-ml-3',
  xl: '-ml-3.5',
  '2xl': '-ml-4',
};

export default function AvatarGroup({
  max,
  size = 'md',
  className,
  children,
}) {
  const items = Children.toArray(children).filter(isValidElement);
  const total = items.length;
  const visible = max && total > max ? items.slice(0, max) : items;
  const overflow = max && total > max ? total - max : 0;

  return (
    <div className={cn('inline-flex items-center', className)}>
      {visible.map((child, i) => (
        <span
          key={i}
          className={cn(
            'relative inline-flex ring-2 ring-surface rounded-full',
            i > 0 && overlapStyles[size]
          )}
          style={{ zIndex: total - i }}
        >
          {child}
        </span>
      ))}
      {overflow > 0 && (
        <span
          className={cn(
            'relative inline-flex items-center justify-center rounded-full bg-surface-overlay text-text-secondary font-semibold ring-2 ring-surface',
            overlapStyles[size],
            size === 'xs' || size === 'sm'
              ? 'h-7 w-7 text-[9px]'
              : size === 'md'
                ? 'h-8 w-8 text-[10px]'
                : 'h-10 w-10 text-xs'
          )}
          style={{ zIndex: 0 }}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}
