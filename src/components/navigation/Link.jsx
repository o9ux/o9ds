import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const variantStyles = {
  default:
    'text-text underline decoration-interactive-border/40 underline-offset-2 hover:decoration-interactive-border active:text-text/80',
  subtle:
    'text-text-secondary no-underline hover:text-text hover:underline hover:decoration-interactive-border/40 hover:underline-offset-2',
  standalone:
    'text-text no-underline hover:underline hover:decoration-interactive-border/40 hover:underline-offset-2',
};

const sizeStyles = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const Link = forwardRef(function Link(
  {
    variant = 'default',
    size = 'md',
    href,
    external = false,
    leadingIcon,
    trailingIcon,
    disabled = false,
    className,
    children,
    ...rest
  },
  ref
) {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <a
      ref={ref}
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      className={cn(
        'inline-flex items-center gap-1.5 transition-colors duration-100',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-border/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        'cursor-pointer',
        disabled && 'opacity-35 pointer-events-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...externalProps}
      {...rest}
    >
      {leadingIcon && (
        <span className="shrink-0 [&_svg]:h-4 [&_svg]:w-4">{leadingIcon}</span>
      )}
      {children}
      {trailingIcon && (
        <span className="shrink-0 [&_svg]:h-4 [&_svg]:w-4">{trailingIcon}</span>
      )}
      {external && !trailingIcon && (
        <span className="shrink-0 [&_svg]:h-3 [&_svg]:w-3 opacity-60">
          <svg
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5 1h6v6M11 1L4.5 7.5" />
          </svg>
        </span>
      )}
    </a>
  );
});

export default Link;
