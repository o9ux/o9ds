import { cn } from '@/utils/cn';

const variantConfig = {
  info: {
    border: 'border-info/40',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-info shrink-0 mt-px">
        <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 5.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 6.5zm0-2.5a.875.875 0 110 1.75A.875.875 0 018 4z" />
      </svg>
    ),
    titleColor: 'text-info',
  },
  success: {
    border: 'border-success/40',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-success shrink-0 mt-px">
        <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.28 5.28a.75.75 0 00-1.06-1.06L7 8.44 5.78 7.22a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.75-3.75z" />
      </svg>
    ),
    titleColor: 'text-success',
  },
  warning: {
    border: 'border-warning/40',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-warning shrink-0 mt-px">
        <path fillRule="evenodd" d="M6.457 1.047a1.75 1.75 0 013.086 0l6.25 11.5A1.75 1.75 0 0114.25 15H1.75a1.75 1.75 0 01-1.543-2.453l6.25-11.5zM8 5.5a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 018 5.5zm0 6.5a.875.875 0 110-1.75A.875.875 0 018 12z" />
      </svg>
    ),
    titleColor: 'text-warning',
  },
  danger: {
    border: 'border-danger/40',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-danger shrink-0 mt-px">
        <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM6.53 5.47a.75.75 0 00-1.06 1.06L6.94 8 5.47 9.47a.75.75 0 101.06 1.06L8 9.06l1.47 1.47a.75.75 0 101.06-1.06L9.06 8l1.47-1.47a.75.75 0 00-1.06-1.06L8 6.94 6.53 5.47z" />
      </svg>
    ),
    titleColor: 'text-danger',
  },
};

/**
 * InlineAlert — contextual, inline feedback strip.
 *
 * @param {'info'|'success'|'warning'|'danger'} props.variant
 * @param {string}    props.title    — short headline (optional)
 * @param {ReactNode} props.children — body / description text
 * @param {boolean}   props.compact  — single-line layout
 * @param {string}    props.className
 */
export default function InlineAlert({
  variant = 'info',
  title,
  compact = false,
  className,
  children,
}) {
  const cfg = variantConfig[variant];

  return (
    <div
      role="alert"
      className={cn(
        'flex gap-3 border bg-surface-raised px-4',
        compact ? 'items-center py-2' : 'py-3.5',
        cfg.border,
        className
      )}
    >
      {cfg.icon}
      <div className={cn('min-w-0', compact ? 'flex items-center gap-2' : 'space-y-0.5')}>
        {title && (
          <p className={cn('text-xs font-semibold', cfg.titleColor)}>
            {title}
          </p>
        )}
        {children && (
          <p className="text-xs text-text-secondary">{children}</p>
        )}
      </div>
    </div>
  );
}
