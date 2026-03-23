import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import Tooltip from '@/components/containers/Tooltip';
import O9Icon from '@/components/O9Icon';
import externalLinkSvg from '@/assets/icons/o9con-external-link.svg?raw';

/* ─────────────────────────────────────────────
   Icon size per link size
   ───────────────────────────────────────────── */
const iconSizeMap = {
  sm: '[&_svg]:h-3.5 [&_svg]:w-3.5',
  md: '[&_svg]:h-4 [&_svg]:w-4',
  lg: '[&_svg]:h-5 [&_svg]:w-5',
};

const linkIconSize = {
  sm: '[&_svg]:h-3 [&_svg]:w-3',
  md: '[&_svg]:h-3.5 [&_svg]:w-3.5',
  lg: '[&_svg]:h-4 [&_svg]:w-4',
};

/* ─────────────────────────────────────────────
   Variant styles
   ───────────────────────────────────────────── */
const variantStyles = {
  primary: cn(
    'text-info',
    'no-underline hover:underline hover:text-info-hover hover:underline-offset-2',
    'active:font-medium active:text-info',
    'visited:text-utility-purple',
  ),
  secondary: cn(
    'text-text',
    'no-underline hover:underline hover:text-info-hover hover:underline-offset-2',
    'active:font-medium active:text-info',
    'visited:text-utility-purple',
  ),
};

const sizeStyles = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

/**
 * Link — navigational element with Primary (info blue) and Secondary (default text) variants.
 *
 * Compositions:
 *  - Leading icon only       (icon, no children, no linkIcon)
 *  - Leading icon + text     (icon + children)
 *  - Leading icon + text + link icon  (icon + children + linkIcon)
 *  - Text only               (children)
 *  - Text + link icon        (children + linkIcon)
 *
 * @param {'primary'|'secondary'} props.variant
 * @param {'sm'|'md'|'lg'}       props.size
 * @param {string}               props.href
 * @param {boolean}              props.external — opens in new tab, shows external icon as link icon
 * @param {ReactNode}            props.leadingIcon
 * @param {boolean}              props.linkIcon — show the external-link trailing icon
 * @param {boolean}              props.disabled
 * @param {string}               props.tooltip — tooltip text on hover
 * @param {'top'|'bottom'|'left'|'right'} props.tooltipPlacement
 * @param {string}               props.className
 * @param {ReactNode}            props.children — link text
 */
const Link = forwardRef(function Link(
  {
    variant = 'primary',
    size = 'md',
    href,
    external = false,
    leadingIcon,
    linkIcon = false,
    disabled = false,
    tooltip,
    tooltipPlacement = 'top',
    className,
    children,
    ...rest
  },
  ref
) {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  /* Show the link/external icon when explicit linkIcon or external prop */
  const showLinkIcon = linkIcon || external;

  const linkElement = (
    <a
      ref={ref}
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      className={cn(
        'inline-flex items-center gap-1.5 transition-colors duration-100',
        /* Focus — matches Button component ring style */
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-border focus-visible:ring-offset-1 focus-visible:ring-offset-surface',
        'cursor-pointer',
        disabled && 'opacity-35 pointer-events-none !text-text-disabled',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...externalProps}
      {...rest}
    >
      {leadingIcon && (
        <span className={cn('shrink-0 flex items-center justify-center', iconSizeMap[size])}>
          {leadingIcon}
        </span>
      )}
      {children && <span>{children}</span>}
      {showLinkIcon && (
        <span className={cn('shrink-0 flex items-center justify-center opacity-70', linkIconSize[size])}>
          <O9Icon svg={externalLinkSvg} />
        </span>
      )}
    </a>
  );

  /* Wrap with Tooltip if tooltip content provided */
  if (tooltip) {
    return (
      <Tooltip content={tooltip} placement={tooltipPlacement}>
        {linkElement}
      </Tooltip>
    );
  }

  return linkElement;
});

export default Link;
