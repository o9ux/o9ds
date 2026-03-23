import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import Tooltip from '@/components/containers/Tooltip';

const variantStyles = {
  primary:
    'bg-interactive text-on-interactive border border-interactive hover:bg-interactive-hover active:bg-interactive-active focus-visible:ring-1 focus-visible:ring-interactive-border focus-visible:ring-offset-2 focus-visible:ring-offset-surface shadow-down',
  danger:
    'bg-danger text-white-static border border-danger hover:bg-danger-hover hover:border-danger-hover active:bg-danger-active focus-visible:ring-1 focus-visible:ring-danger focus-visible:ring-offset-2 focus-visible:ring-offset-surface shadow-down',
};

/* FAB is larger than standard buttons — uses a proportional scale
   based on Button tier heights with extra visual weight           */
const sizeStyles = {
  sm: 'h-10 min-w-10 text-xs gap-2',
  md: 'h-12 min-w-12 text-sm gap-2',
  lg: 'h-14 min-w-14 text-base gap-2.5',
};

/* Icon sizes map to o9con icon tokens per size tier
   sm → 20px | md → 24px | lg → 32px
   Uses [&>*] to support both SVG icons and mask-image <span> icons */
const iconSizeStyles = {
  sm: '[&>*]:w-[var(--o9con-20)] [&>*]:h-[var(--o9con-20)]',   /* 20px */
  md: '[&>*]:w-[var(--o9con-24)] [&>*]:h-[var(--o9con-24)]',   /* 24px */
  lg: '[&>*]:w-[var(--o9con-32)] [&>*]:h-[var(--o9con-32)]',   /* 32px */
};

/* Indicator bubble color map */
const indicatorColors = {
  true: 'bg-danger',
  danger: 'bg-danger',
  success: 'bg-success',
  warning: 'bg-warning',
  info: 'bg-info',
};

/**
 * FABButton — floating action button with optional Tooltip.
 *
 * When not extended (icon-only), the tooltip displays on hover/focus
 * to provide a label for the icon-only button.
 *
 * @param {'primary'|'danger'}   props.variant
 * @param {'sm'|'md'|'lg'}      props.size
 * @param {ReactNode}           props.icon
 * @param {boolean}             props.extended     — show label text alongside icon
 * @param {string}              props.tooltip      — Tooltip label (shown on hover/focus)
 * @param {string}              props.tooltipPlacement — Tooltip placement (default "top")
 * @param {boolean|string|number} props.indicator  — notification bubble
 * @param {boolean}             props.disabled
 */
const FABButton = forwardRef(function FABButton(
  {
    variant = 'primary',
    size = 'md',
    icon,
    extended = false,
    tooltip,
    tooltipPlacement = 'top',
    indicator,
    disabled = false,
    className,
    children,
    ...rest
  },
  ref
) {
  const showIndicator = indicator != null && indicator !== false;

  const button = (
    <button
      ref={tooltip ? undefined : ref}
      disabled={disabled}
      className={cn(
        'relative inline-flex items-center justify-center font-medium leading-none',
        'transition-all duration-150',
        'focus-visible:outline-none',
        'disabled:opacity-35 disabled:pointer-events-none',
        'cursor-pointer select-none',
        variantStyles[variant],
        sizeStyles[size],
        extended ? 'px-6' : 'aspect-square',
        className
      )}
      {...rest}
    >
      {icon && <span className={cn('shrink-0 flex items-center', iconSizeStyles[size])}>{icon}</span>}
      {extended && children}

      {/* Indicator bubble */}
      {showIndicator && (
        <span
          className={cn(
            'absolute -top-1 -right-1 rounded-full border-2 border-surface',
            typeof indicator === 'number'
              ? 'min-w-[18px] h-[18px] px-1 text-[10px] font-bold inline-flex items-center justify-center bg-danger text-white-static'
              : cn('h-3.5 w-3.5', indicatorColors[indicator] || indicatorColors[true])
          )}
        >
          {typeof indicator === 'number' ? indicator : null}
        </span>
      )}
    </button>
  );

  /* Show tooltip on hover for icon-only (non-extended) FABs */
  if (tooltip) {
    return (
      <Tooltip ref={ref} label={tooltip} placement={tooltipPlacement}>
        {button}
      </Tooltip>
    );
  }

  return button;
});

export default FABButton;
