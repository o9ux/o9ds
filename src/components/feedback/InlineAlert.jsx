import { forwardRef, useState } from 'react';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';
import Link from '@/components/navigation/Link';
import Button from '@/components/buttons/Button';

import infoCircleFilledSvg from '@/assets/icons/o9con-info-circle-filled.svg?raw';
import checkCircleSvg from '@/assets/icons/o9con-check-circle.svg?raw';
import exclamationTriangleFilledSvg from '@/assets/icons/o9con-exclamation-triangle-filled.svg?raw';
import blockerActionFilledAltSvg from '@/assets/icons/o9con-blocker-action-filled-alt.svg?raw';
import blockerActionFilledSvg from '@/assets/icons/o9con-blocker-action-filled.svg?raw';
import volumeMidSvg from '@/assets/icons/o9con-volume-mid.svg?raw';
import closeSvg from '@/assets/icons/o9con-close.svg?raw';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   VARIANT CONFIG — icon + accent color per semantic type
   Matches Figma o9ds-banner [ALPHA 2.0] (node 19956-19852)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const VARIANT_CONFIG = {
  info: {
    icon: infoCircleFilledSvg,
    accent: 'border-l-info',
    titleColor: 'text-info',
    iconColor: 'text-info',
  },
  success: {
    icon: checkCircleSvg,
    accent: 'border-l-success',
    titleColor: 'text-success',
    iconColor: 'text-success',
  },
  warning: {
    icon: exclamationTriangleFilledSvg,
    accent: 'border-l-warning',
    titleColor: 'text-warning',
    iconColor: 'text-warning',
  },
  danger: {
    icon: blockerActionFilledAltSvg,
    accent: 'border-l-[var(--color-global-scarlet-l1)]',
    titleColor: 'text-[var(--color-global-scarlet-l1)]',
    iconColor: 'text-[var(--color-global-scarlet-l1)]',
  },
  block: {
    icon: blockerActionFilledSvg,
    accent: 'border-l-[var(--color-global-scarlet-d1)]',
    titleColor: 'text-[var(--color-global-scarlet-d1)]',
    iconColor: 'text-[var(--color-global-scarlet-d1)]',
  },
  neutral: {
    icon: volumeMidSvg,
    accent: 'border-l-text',
    titleColor: 'text-text',
    iconColor: 'text-text',
  },
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   INLINE ALERT COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/**
 * InlineAlert — contextual, non-blocking feedback strip.
 *
 * Figma: o9ds-banner [ALPHA 2.0] (node 19956-19852)
 *
 * Features:
 * - Six semantic variants: info, success, warning, danger, block, neutral
 * - Left accent border with variant color
 * - O9Icon-based icons (o9con icon set)
 * - Optional title, message body, action button, action link, secondary text
 * - Compact single-line layout mode
 * - Dismissible with close button
 * - Custom icon override
 * - Uses Link component for action links
 * - Uses Button component for action buttons
 *
 * Layout order (non-compact):
 *   Icon | Title + Message + [ActionButton] + [Link] + [SecondaryText] | [CloseBtn]
 */
const InlineAlert = forwardRef(function InlineAlert(
  {
    variant = 'info',
    title,
    children,
    compact = false,
    dismissible = false,
    onDismiss,

    /* Action button — outline button in content area (above the link) */
    actionLabel,
    onActionClick,

    /* Action link — below the action button */
    link,
    linkHref,
    onLinkClick,

    /* Secondary text — below the link */
    secondaryText,

    icon: customIcon,
    className,
    ...rest
  },
  ref
) {
  const [visible, setVisible] = useState(true);
  const config = VARIANT_CONFIG[variant] || VARIANT_CONFIG.info;

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  /* ── Icon selection ── */
  const iconSvg = customIcon || config.icon;

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        'flex border-l-2 bg-surface-raised',
        compact ? 'items-center gap-1 pl-3 py-2' : 'items-start gap-1 pl-3',
        dismissible ? 'pr-1' : 'pr-3',
        config.accent,
        className
      )}
      {...rest}
    >
      {/* Type icon */}
      <span
        className={cn(
          'shrink-0 w-4 h-4 flex items-center justify-center',
          compact ? '' : 'mt-[13px]',
          config.iconColor,
        )}
        aria-hidden="true"
      >
        <O9Icon svg={iconSvg} />
      </span>

      {/* Content area */}
      <div
        className={cn(
          'flex-1 min-w-0',
          compact
            ? 'flex items-center gap-2 py-2'
            : 'flex flex-col gap-1 py-3',
        )}
      >
        {/* Title + primary message */}
        {(title || children) && (
          <div className="flex flex-col gap-1">
            {title && (
              <p className={cn('text-sm font-medium leading-4', config.titleColor)}>
                {title}
              </p>
            )}
            {children && (
              <p className="text-xs text-text-secondary leading-normal">
                {children}
              </p>
            )}
          </div>
        )}

        {/* Action button — outline, small */}
        {!compact && actionLabel && (
          <div className="mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onActionClick}
            >
              {actionLabel}
            </Button>
          </div>
        )}

        {/* Action link */}
        {!compact && link && (
          <div className="mt-1">
            <Link
              size="sm"
              variant="primary"
              href={linkHref || '#'}
              onClick={(e) => {
                if (onLinkClick) { e.preventDefault(); onLinkClick(); }
              }}
            >
              {link}
            </Link>
          </div>
        )}

        {/* Secondary text */}
        {!compact && secondaryText && (
          <p className="text-xs text-text-secondary leading-normal mt-2">
            {secondaryText}
          </p>
        )}
      </div>

      {/* Close (dismiss) button */}
      {dismissible && (
        <div className="flex items-start shrink-0 py-3 pr-2 pl-2">
          <button
            type="button"
            tabIndex={0}
            onClick={handleDismiss}
            className="shrink-0 w-4 h-4 flex items-center justify-center text-text-tertiary hover:text-text transition-colors cursor-pointer mt-0.5"
            aria-label="Dismiss alert"
          >
            <O9Icon svg={closeSvg} />
          </button>
        </div>
      )}
    </div>
  );
});

export default InlineAlert;
