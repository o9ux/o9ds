import { forwardRef, useState, Children } from 'react';
import { cn } from '@/utils/cn';
import Label from '@/components/inputs/Label';
import Button from '@/components/buttons/Button';
import O9Icon from '@/components/O9Icon';

import blockerSvg from '@/assets/icons/o9con-blocker-action-filled-alt.svg?raw';
import exclamationSvg from '@/assets/icons/o9con-exclamation-triangle-filled.svg?raw';

/**
 * ChipList — container for a list of Chip components.
 *
 * Figma reference: node 29119-18172 (o9ds-chips-list [BETA 1.0])
 *
 * Features:
 *  - Horizontal or vertical orientation
 *  - Overflow with "+N more" / "Show less" toggle (via maxVisible)
 *  - Optional label above the list (uses Label component)
 *  - Error/warning/helper messages below the list (follows Textbox pattern)
 *  - Optional dismiss ("Close") button on message footer
 *
 * The component is a pure layout container — chip rendering and removal
 * are managed externally by the consumer via children.
 */

/* ── Status text colors ── */
const statusText = {
  default: 'text-text-tertiary',
  error:   'text-danger',
  warning: 'text-warning',
};

/* ── Status message icons ── */
const statusIcons = {
  error:   blockerSvg,
  warning: exclamationSvg,
};

/* ── Button size mapping (overflow button matches chip sizes) ── */
const overflowBtnSize = {
  sm: 'sm',
  md: 'sm',
  lg: 'sm',
};

const ChipList = forwardRef(function ChipList(
  {
    orientation = 'horizontal',
    variant = 'primary',
    size = 'md',
    label,
    required = false,
    optional = false,
    maxVisible,
    status = 'default',
    helperText,
    errorText,
    warningText,
    onDismiss,
    disabled = false,
    className,
    children,
    ...rest
  },
  ref
) {
  const [expanded, setExpanded] = useState(false);

  /* ── Children handling ── */
  const allChips = Children.toArray(children);
  const hasOverflow = maxVisible != null && allChips.length > maxVisible;
  const visibleChips = hasOverflow && !expanded
    ? allChips.slice(0, maxVisible)
    : allChips;
  const hiddenCount = hasOverflow ? allChips.length - maxVisible : 0;

  /* ── Message resolution (same pattern as Textbox) ── */
  const messageText = status === 'error'
    ? errorText
    : status === 'warning'
      ? warningText
      : helperText;
  const messageIconSvg = statusIcons[status] || null;
  const hasFooter = !!messageText;

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label || undefined}
      aria-invalid={status === 'error' || undefined}
      className={cn('flex flex-col gap-1', className)}
      {...rest}
    >
      {/* ── Optional Label ── */}
      {label && (
        <Label
          size={size}
          required={required}
          optional={optional}
          disabled={disabled}
        >
          {label}
        </Label>
      )}

      {/* ── Chip container ── */}
      <div
        className={cn(
          orientation === 'horizontal'
            ? 'flex flex-wrap items-center gap-2'
            : 'flex flex-col items-start gap-1'
        )}
      >
        {visibleChips}

        {/* ── Overflow button (+N more / Show less) ── */}
        {hasOverflow && (
          <Button
            variant="secondary"
            size={overflowBtnSize[size] || 'sm'}
            onClick={() => setExpanded(!expanded)}
            className="shrink-0"
          >
            {expanded ? 'Show less' : `+${hiddenCount} more`}
          </Button>
        )}
      </div>

      {/* ── Footer message (error/warning/helper) ── */}
      {hasFooter && (
        <div className="flex items-start justify-between gap-2">
          <p className={cn('text-xs flex items-center gap-1', statusText[status] || statusText.default)}>
            {messageIconSvg && (
              <span className="shrink-0 w-3 h-3 flex items-center justify-center text-xs">
                <O9Icon svg={messageIconSvg} />
              </span>
            )}
            <span>{messageText}</span>
          </p>
          {onDismiss && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onDismiss}
            >
              Close
            </Button>
          )}
        </div>
      )}
    </div>
  );
});

export default ChipList;
