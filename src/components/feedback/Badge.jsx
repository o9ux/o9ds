import { cn } from '@/utils/cn';

/**
 * Badge — numeric count or short status label overlaid on other elements.
 *
 * Three sizes: sm (16px), md (20px), lg (24px)
 * Five semantic variants: neutral, info, success, warning, danger
 *
 * @param {object} props
 * @param {'neutral'|'info'|'success'|'warning'|'danger'} props.variant
 * @param {'sm'|'md'|'lg'} props.size
 * @param {boolean} props.dot  — show a dot without a count
 * @param {boolean} props.pill — pill (rounded-full) shape; default: pill
 * @param {string}  props.className
 */
export default function Badge({
  variant = 'neutral',
  size = 'md',
  dot = false,
  pill = true,
  className,
  children,
}) {
  const variantStyles = {
    neutral: 'bg-interactive-muted-hover text-text border border-interactive-border/20',
    info:    'bg-info-subtle text-info border border-info/30',
    success: 'bg-success-subtle text-success border border-success/30',
    warning: 'bg-warning-subtle text-warning border border-warning/30',
    danger:  'bg-danger-subtle text-danger border border-danger/30',
  };

  const sizeStyles = dot
    ? { sm: 'h-1.5 w-1.5', md: 'h-2 w-2', lg: 'h-2.5 w-2.5' }
    : {
        sm: 'min-w-[16px] h-4 px-1 text-[9px]',
        md: 'min-w-[20px] h-5 px-1.5 text-[10px]',
        lg: 'min-w-[24px] h-6 px-2 text-xs',
      };

  /* ── A11Y: dot badges are decorative, label badges convey content ── */
  const ariaProps = dot
    ? { 'aria-hidden': 'true' }
    : {};

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-bold leading-none tracking-wide',
        pill ? 'rounded-full' : '',
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
