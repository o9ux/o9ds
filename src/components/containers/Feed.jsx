import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Feed = forwardRef(function Feed(
  { className, children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      role="feed"
      aria-label="Activity feed"
      className={cn('flex flex-col', className)}
      {...rest}
    >
      {children}
    </div>
  );
});

const typeStyles = {
  default: 'bg-interactive-muted',
  success: 'bg-success/20',
  warning: 'bg-warning/20',
  danger: 'bg-danger/20',
  info: 'bg-info/20',
};

const FeedItem = forwardRef(function FeedItem(
  {
    avatar,
    author,
    timestamp,
    type = 'default',
    icon,
    className,
    children,
    ...rest
  },
  ref
) {
  return (
    <article
      ref={ref}
      className={cn(
        'relative flex gap-3 px-4 py-3',
        'border-b border-border last:border-b-0',
        'hover:bg-surface-overlay/50 transition-colors',
        className
      )}
      {...rest}
    >
      {/* Timeline connector */}
      <div className="flex flex-col items-center shrink-0">
        {avatar ? (
          <div className="h-8 w-8 rounded-circle bg-surface-overlay overflow-hidden flex items-center justify-center text-xs font-bold text-text">
            {avatar}
          </div>
        ) : icon ? (
          <div
            className={cn(
              'h-8 w-8 rounded-circle flex items-center justify-center [&_svg]:h-4 [&_svg]:w-4',
              typeStyles[type]
            )}
          >
            {icon}
          </div>
        ) : (
          <div className={cn('h-8 w-8 rounded-circle', typeStyles[type])} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-0.5">
          {author && (
            <span className="text-sm font-semibold text-text truncate">
              {author}
            </span>
          )}
          {timestamp && (
            <span className="text-xs text-text-tertiary shrink-0">
              {timestamp}
            </span>
          )}
        </div>
        <div className="text-sm text-text-secondary">{children}</div>
      </div>
    </article>
  );
});

const FeedDivider = forwardRef(function FeedDivider(
  { label, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-3 px-4 py-2',
        'text-[10px] font-bold uppercase tracking-widest text-text-tertiary',
        className
      )}
      {...rest}
    >
      <span className="flex-1 border-t border-border" />
      {label && <span>{label}</span>}
      <span className="flex-1 border-t border-border" />
    </div>
  );
});

export { Feed, FeedItem, FeedDivider };
export default Feed;
