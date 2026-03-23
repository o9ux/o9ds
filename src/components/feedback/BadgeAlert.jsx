import { forwardRef, useMemo } from 'react';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';

import checkCircleSvg from '@/assets/icons/o9con-check-circle.svg?raw';
import infoCircleFilledSvg from '@/assets/icons/o9con-info-circle-filled.svg?raw';
import infoCircleSvg from '@/assets/icons/o9con-info-circle.svg?raw';
import exclamationTriangleFilledSvg from '@/assets/icons/o9con-exclamation-triangle-filled.svg?raw';
import blockerActionSvg from '@/assets/icons/o9con-blocker-action.svg?raw';
import blockerActionFilledSvg from '@/assets/icons/o9con-blocker-action-filled.svg?raw';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TYPE CONFIG — icon + color per semantic type
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const TYPE_CONFIG = {
  success: {
    icon: checkCircleSvg,
    color: 'text-success',
    fill: 'bg-success text-white-static',
    tint: 'bg-success/10 text-success',
  },
  info: {
    icon: infoCircleFilledSvg,
    color: 'text-info',
    fill: 'bg-info text-white-static',
    tint: 'bg-info/10 text-info',
  },
  neutral: {
    icon: infoCircleSvg,
    color: 'text-text',
    fill: 'bg-text text-on-interactive',
    tint: 'bg-text/10 text-text',
  },
  warning: {
    icon: exclamationTriangleFilledSvg,
    color: 'text-warning',
    fill: 'bg-warning text-white-static',
    tint: 'bg-warning/10 text-warning',
  },
  negative: {
    icon: blockerActionSvg,
    color: 'text-[var(--color-global-scarlet-l1)]',
    fill: 'bg-[var(--color-global-scarlet-l1)] text-white-static',
    tint: 'bg-[var(--color-global-scarlet-l1)]/10 text-[var(--color-global-scarlet-l1)]',
  },
  block: {
    icon: blockerActionFilledSvg,
    color: 'text-[var(--color-global-scarlet-d1)]',
    fill: 'bg-[var(--color-global-scarlet-d1)] text-white-static',
    tint: 'bg-[var(--color-global-scarlet-d1)]/10 text-[var(--color-global-scarlet-d1)]',
  },
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SIZE CONFIG
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const SIZE_STYLES = {
  sm: 'h-5 px-1.5 gap-1',
  md: 'h-6 px-2 gap-1',
  lg: 'h-7 px-2.5 gap-1.5',
};

const SIZE_ICON = {
  sm: 'text-[12px]',
  md: 'text-[14px]',
  lg: 'text-[16px]',
};

const SIZE_TEXT = {
  sm: 'text-[10px]',
  md: 'text-xs',
  lg: 'text-sm',
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   BADGE ALERT COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/**
 * BadgeAlert — inline contextual badge with icon and status message.
 *
 * Matches the Figma o9ds-badge [ALPHA 2.0] design:
 * - Five style variants: primary (subtle bg), outline (border), fill (solid bg), tint (semi-transparent type color), ghost (transparent)
 * - Six semantic types: success, info, neutral, warning, negative, block
 * - Three sizes: sm (20px), md (24px), lg (28px)
 * - Rectangular sharp-edge shape
 * - Text truncation with maxChars, maxLines, and default ellipsis overflow
 *
 * Designed for inline contextual information messages within any container.
 */
const BadgeAlert = forwardRef(function BadgeAlert(
  {
    variant = 'primary',
    type = 'neutral',
    size = 'md',
    message = '',
    maxChars,
    maxLines = 1,
    className,
    ...rest
  },
  ref
) {
  const typeConfig = TYPE_CONFIG[type] || TYPE_CONFIG.neutral;

  /* ── Truncate by maxChars if set ── */
  const displayMessage = useMemo(() => {
    if (!message) return '';
    if (maxChars && message.length > maxChars) {
      return message.slice(0, maxChars) + '...';
    }
    return message;
  }, [message, maxChars]);

  /* ── Build variant + type classes ── */
  let variantClasses;
  if (variant === 'fill') {
    variantClasses = typeConfig.fill;
  } else if (variant === 'tint') {
    /* tint — semi-transparent type-colored background */
    variantClasses = typeConfig.tint;
  } else if (variant === 'outline') {
    variantClasses = cn('bg-transparent border border-border', typeConfig.color);
  } else if (variant === 'ghost') {
    /* ghost — fully transparent, no border */
    variantClasses = cn('bg-transparent', typeConfig.color);
  } else {
    /* primary — subtle raised background */
    variantClasses = cn('bg-surface-raised', typeConfig.color);
  }

  /* ── Line clamp styles ── */
  const lineClampStyle =
    maxLines === 1
      ? {} /* handled by CSS truncate */
      : {
          display: '-webkit-box',
          WebkitLineClamp: maxLines,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        };
  const isSingleLine = maxLines === 1;

  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex rounded-none font-medium',
        isSingleLine ? 'items-center' : 'items-start',
        SIZE_STYLES[size],
        variantClasses,
        className
      )}
      title={message}
      {...rest}
    >
      {/* Type icon */}
      <span className={cn('shrink-0 flex items-center justify-center', SIZE_ICON[size], !isSingleLine && 'mt-0.5')}>
        <O9Icon svg={typeConfig.icon} />
      </span>

      {/* Message text */}
      <span
        className={cn(
          SIZE_TEXT[size],
          'leading-snug min-w-0',
          isSingleLine && 'truncate'
        )}
        style={!isSingleLine ? lineClampStyle : undefined}
      >
        {displayMessage}
      </span>
    </span>
  );
});

export default BadgeAlert;
