import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import Tooltip from '@/components/containers/Tooltip';

const variantStyles = {
  primary:
    'bg-interactive text-on-interactive border border-interactive hover:bg-interactive-hover active:bg-interactive-active focus-visible:ring-1 focus-visible:ring-interactive-border focus-visible:ring-offset-1 focus-visible:ring-offset-surface',
  secondary:
    'bg-surface-raised text-text border border-transparent hover:bg-interactive-muted active:bg-interactive-muted-hover focus-visible:ring-1 focus-visible:ring-interactive-border/50',
  outline:
    'bg-transparent text-text border border-border-strong hover:border-interactive-border hover:bg-interactive-subtle active:bg-interactive-muted focus-visible:ring-1 focus-visible:ring-interactive-border/50',
  ghost:
    'bg-transparent text-text border border-transparent hover:bg-interactive-subtle active:bg-interactive-muted focus-visible:ring-1 focus-visible:ring-interactive-border/50',
  danger:
    'bg-danger text-white-static border border-danger hover:bg-danger-hover hover:border-danger-hover active:bg-danger-active focus-visible:ring-1 focus-visible:ring-danger focus-visible:ring-offset-1 focus-visible:ring-offset-surface',
};

/* Square icon-only button — height matches Button sizes
   xm 20×20  |  sm 24×24  |  md 32×32  |  lg 36×36 */
const sizeStyles = {
  xm: 'h-5 w-5',     /* 20px */
  sm: 'h-6 w-6',     /* 24px */
  md: 'h-8 w-8',     /* 32px */
  lg: 'h-9 w-9',     /* 36px */
};

/* Icon sizes map to o9con icon tokens
   Uses [&>*] to support both SVG icons and mask-image <span> icons */
const iconSizeStyles = {
  xm: '[&>*]:w-[var(--o9con-14)] [&>*]:h-[var(--o9con-14)]',   /* 14px */
  sm: '[&>*]:w-[var(--o9con-16)] [&>*]:h-[var(--o9con-16)]',   /* 16px */
  md: '[&>*]:w-[var(--o9con-20)] [&>*]:h-[var(--o9con-20)]',   /* 20px */
  lg: '[&>*]:w-[var(--o9con-24)] [&>*]:h-[var(--o9con-24)]',   /* 24px */
};

/**
 * IconButton — square icon-only button with optional Tooltip.
 *
 * @param {'primary'|'secondary'|'outline'|'ghost'|'danger'} props.variant
 * @param {'xm'|'sm'|'md'|'lg'} props.size
 * @param {ReactNode}  props.icon        — O9Icon element
 * @param {string}     props.tooltip     — Tooltip label (shown on hover/focus)
 * @param {string}     props.tooltipPlacement — Tooltip placement (default "top")
 * @param {string}     props.tooltipShortcut  — Keyboard shortcut badge in tooltip
 * @param {boolean}    props.disabled
 * @param {string}     props.className
 */
const IconButton = forwardRef(function IconButton(
  {
    variant = 'primary',
    size = 'md',
    icon,
    tooltip,
    tooltipPlacement = 'top',
    tooltipShortcut,
    disabled = false,
    className,
    children,
    ...rest
  },
  ref
) {
  const button = (
    <button
      ref={tooltip ? undefined : ref}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center leading-none',
        'transition-colors duration-100',
        'focus-visible:outline-none',
        'disabled:opacity-35 disabled:pointer-events-none',
        'cursor-pointer select-none',
        variantStyles[variant],
        sizeStyles[size],
        iconSizeStyles[size],
        className
      )}
      {...rest}
    >
      {icon || children}
    </button>
  );

  if (tooltip) {
    return (
      <Tooltip ref={ref} label={tooltip} shortcut={tooltipShortcut} placement={tooltipPlacement}>
        {button}
      </Tooltip>
    );
  }

  return button;
});

export default IconButton;
