import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';

import checkCircleSvg from '@/assets/icons/o9con-check-circle.svg?raw';
import infoCircleFilledSvg from '@/assets/icons/o9con-info-circle-filled.svg?raw';
import bookmarkSvg from '@/assets/icons/o9con-bookmark.svg?raw';
import exclamationTriangleFilledSvg from '@/assets/icons/o9con-exclamation-triangle-filled.svg?raw';
import blockerActionSvg from '@/assets/icons/o9con-blocker-action.svg?raw';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TYPE CONFIG — icon + color per semantic type
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const TYPE_CONFIG = {
  success: {
    icon: checkCircleSvg,
    color: 'text-success',
    fill: 'bg-success text-white-static',
  },
  info: {
    icon: infoCircleFilledSvg,
    color: 'text-info',
    fill: 'bg-info text-white-static',
  },
  neutral: {
    icon: bookmarkSvg,
    color: 'text-text',
    fill: 'bg-text text-on-interactive',
  },
  warning: {
    icon: exclamationTriangleFilledSvg,
    color: 'text-warning',
    fill: 'bg-warning text-white-static',
  },
  negative: {
    icon: blockerActionSvg,
    color: 'text-danger',
    fill: 'bg-danger text-white-static',
  },
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SIZE CONFIG
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const SIZE_STYLES = {
  sm: 'h-4 min-w-4 px-1 gap-0.5 text-[10px]',
  md: 'h-5 min-w-5 px-1.5 gap-0.5 text-xs',
  lg: 'h-6 min-w-6 px-2 gap-1 text-sm',
};

const SIZE_ICON = {
  sm: 'text-[12px]',
  md: 'text-[14px]',
  lg: 'text-[16px]',
};

/* Shape — pill (rounded) vs rect (sharp edges) */
const SHAPE_STYLES = {
  pill: 'rounded-full',
  rect: 'rounded-none',
};

/* Indicator dot position + size per counter size */
const INDICATOR_STYLES = {
  sm: '-top-[2px] -right-[2px] w-1.5 h-1.5',
  md: '-top-[3px] -right-[3px] w-2 h-2',
  lg: '-top-[3px] -right-[3px] w-2.5 h-2.5',
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COUNTER COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/**
 * Counter — icon + count badge with semantic type, variant, size, and optional indicator.
 *
 * Matches the Figma o9ds-Counter [ALPHA 2.0] design:
 * - Three style variants: primary (subtle bg), outline (border), fill (solid bg)
 * - Five semantic types: success, info, neutral, warning, negative
 * - Two shapes: pill (rounded) and rect (rectangular sharp edges)
 * - Three sizes: sm (16px), md (20px), lg (24px)
 * - Optional indicator dot at top-right corner
 * - Per-type icon: check-circle, info-circle, bookmark, exclamation-triangle, blocker-action
 */
const Counter = forwardRef(function Counter(
  {
    variant = 'primary',
    type = 'neutral',
    shape = 'pill',
    size = 'md',
    count = 0,
    max,
    indicator = false,
    pulse = false,
    className,
    ...rest
  },
  ref
) {
  const displayCount =
    max !== undefined && count > max ? `${max}+` : String(count);
  const typeConfig = TYPE_CONFIG[type] || TYPE_CONFIG.neutral;

  /* Build variant + type classes */
  let variantClasses;
  if (variant === 'fill') {
    variantClasses = typeConfig.fill;
  } else if (variant === 'outline') {
    variantClasses = cn('bg-transparent border border-current', typeConfig.color);
  } else {
    /* primary — subtle raised background */
    variantClasses = cn('bg-surface-raised', typeConfig.color);
  }

  return (
    <span ref={ref} className={cn('relative inline-flex', className)} {...rest}>
      {/* Counter body */}
      <span
        className={cn(
          'inline-flex items-center justify-center font-bold leading-none',
          SHAPE_STYLES[shape] || SHAPE_STYLES.pill,
          SIZE_STYLES[size],
          variantClasses,
          pulse && 'animate-pulse'
        )}
      >
        {/* Type icon */}
        <span className={cn('shrink-0', SIZE_ICON[size])}>
          <O9Icon svg={typeConfig.icon} />
        </span>
        {/* Count number */}
        <span>{displayCount}</span>
      </span>

      {/* Optional indicator dot — top-right corner */}
      {indicator && (
        <span
          className={cn(
            'absolute block rounded-full bg-warning',
            INDICATOR_STYLES[size]
          )}
          aria-hidden="true"
        />
      )}
    </span>
  );
});

export default Counter;
