import { cn } from '@/utils/cn';

/**
 * Spinner — indeterminate loading indicator.
 *
 * @param {'sm'|'md'|'lg'|'xl'} props.size
 * @param {'primary'|'muted'} props.variant
 * @param {string} props.label  — sr-only accessible label
 * @param {string} props.className
 */
export default function Spinner({
  size = 'md',
  variant = 'primary',
  label = 'Loading…',
  className,
}) {
  const sizeMap = {
    sm: 'h-3.5 w-3.5 border-[1.5px]',
    md: 'h-5 w-5 border-2',
    lg: 'h-7 w-7 border-2',
    xl: 'h-10 w-10 border-[3px]',
  };

  const colorMap = {
    primary: 'border-interactive-border/20 border-t-interactive',
    muted:   'border-interactive-muted border-t-interactive-border/40',
  };

  return (
    <span role="status" aria-label={label} className={cn('inline-flex items-center justify-center', className)}>
      <span
        className={cn(
          'animate-spin rounded-circle',
          sizeMap[size],
          colorMap[variant]
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
