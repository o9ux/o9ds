import { cn } from '@/utils/cn';

/**
 * Pill — numeric count or short status label overlaid on other elements.
 *
 * Four sizes: sm (16px), md (20px), lg (24px), xl (32px)
 * Six semantic variants: neutral, info, success, warning, danger, utility
 *
 * @param {object} props
 * @param {'neutral'|'info'|'success'|'warning'|'danger'|'utility'} props.variant
 * @param {'sm'|'md'|'lg'|'xl'} props.size
 * @param {boolean} props.dot  — show a dot without a count
 * @param {boolean} props.rounded — rounded-full pill shape; default: true
 * @param {string}  props.className
 */
export default function Pill({
  variant = 'neutral',
  size = 'md',
  dot = false,
  rounded = true,
  className,
  children,
}) {
  const variantStyles = {
    neutral: 'bg-interactive-muted-hover text-text border border-interactive-border/20',
    info:    'bg-info-subtle text-info border border-info/30',
    success: 'bg-success-subtle text-success border border-success/30',
    warning: 'bg-warning-subtle text-warning border border-warning/30',
    danger:  'bg-danger-subtle text-danger border border-danger/30',
    utility: 'bg-[var(--color-global-indigo-l1)]/10 text-[var(--color-global-indigo-l1)] border border-[var(--color-global-indigo-l1)]/30',
  };

  const sizeStyles = dot
    ? { sm: 'h-1.5 w-1.5', md: 'h-2 w-2', lg: 'h-2.5 w-2.5', xl: 'h-3 w-3' }
    : {
        sm: 'min-w-[16px] h-4 px-1 text-[10px]',
        md: 'min-w-[20px] h-5 px-1.5 text-xs',
        lg: 'min-w-[24px] h-6 px-2 text-sm font-medium',
        xl: 'min-w-[32px] h-8 px-2.5 text-base font-medium',
      };

  /* ── A11Y: dot pills are decorative, label pills convey content ── */
  const ariaProps = dot
    ? { 'aria-hidden': 'true' }
    : {};

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-bold leading-none tracking-wide',
        rounded ? 'rounded-full' : '',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...ariaProps}
    >
      {!dot && children}
    </span>
  );
}
