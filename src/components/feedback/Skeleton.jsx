import { cn } from '@/utils/cn';

/**
 * Skeleton — placeholder content shown while data loads.
 *
 * @param {'text'|'title'|'rect'|'circle'|'avatar'} props.variant
 * @param {string|number} props.width   — custom width (Tailwind class or inline style)
 * @param {string|number} props.height  — custom height (Tailwind class or inline style)
 * @param {string} props.className
 */
export function Skeleton({ variant = 'text', width, height, className }) {
  const base = 'block animate-pulse bg-interactive-muted shrink-0';

  const variantStyles = {
    text:   'h-3.5 w-full',
    title:  'h-5 w-3/5',
    rect:   'h-24 w-full',
    circle: 'rounded-circle h-10 w-10',
    avatar: 'rounded-circle h-8 w-8',
  };

  const inlineStyle = {};
  if (typeof width === 'number') inlineStyle.width = width;
  else if (typeof width === 'string' && width.match(/^\d/)) inlineStyle.width = width;

  if (typeof height === 'number') inlineStyle.height = height;
  else if (typeof height === 'string' && height.match(/^\d/)) inlineStyle.height = height;

  return (
    <span
      aria-hidden="true"
      style={Object.keys(inlineStyle).length ? inlineStyle : undefined}
      className={cn(base, variantStyles[variant], className)}
    />
  );
}

/**
 * SkeletonText — a block of multiple skeleton text lines.
 */
export function SkeletonText({ lines = 3, className }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={i === lines - 1 ? 'w-2/3' : 'w-full'}
        />
      ))}
    </div>
  );
}

/**
 * SkeletonCard — a pre-composed card placeholder.
 */
export function SkeletonCard({ className }) {
  return (
    <div className={cn('border border-border bg-surface-raised p-4 space-y-3', className)}>
      <Skeleton variant="title" />
      <SkeletonText lines={3} />
      <div className="flex gap-2 pt-1">
        <Skeleton variant="text" className="w-16 h-7" />
        <Skeleton variant="text" className="w-20 h-7" />
      </div>
    </div>
  );
}

export default Skeleton;
