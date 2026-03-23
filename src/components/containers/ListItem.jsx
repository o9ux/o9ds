import { forwardRef, useCallback } from 'react';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';
import IconButton from '@/components/buttons/IconButton';
import Avatar from '@/components/containers/Avatar';
import Tooltip from '@/components/containers/Tooltip';
import Checkbox from '@/components/inputs/Checkbox';
import Radio from '@/components/inputs/Radio';
import Switch from '@/components/inputs/Switch';

import dragHandleSvg from '@/assets/icons/o9con-drag-handle.svg?raw';
import angleRightSvg from '@/assets/icons/o9con-angle-right.svg?raw';
import arrowRightUpSvg from '@/assets/icons/o9con-arrow-right-up.svg?raw';
import ellipsisVSvg from '@/assets/icons/o9con-ellipsis-v.svg?raw';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LIST ITEM COMPONENT
   Figma: o9ds-list-item / Menu Item

   Full-featured list item with optional leading/trailing
   elements, states, single-line & two-line text variants.

   No border on the component itself.
   Focus uses a single inset outline (no double-border).
   Active state uses a left-only 2px accent border.
   Trailing elements use 2px gap for tight packing.

   Layout (left → right):
   [drag-handle] [leading] [text] ── [shortcut] [switch]
   [actions…] [overflow] [submenu] [external-link]
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/**
 * ListItem — composable list/menu item.
 *
 * @param {ReactNode}  children         — primary text
 * @param {string}     secondaryText    — secondary line (enables two-line layout)
 *
 * States:
 * @param {boolean}    active           — active / selected with left border accent
 * @param {boolean}    danger           — danger text color
 * @param {boolean}    disabled         — disabled state
 *
 * Leading elements (mutually exclusive — first match wins):
 * @param {boolean}    dragHandle       — drag handle icon
 * @param {object}     avatar           — Avatar props {name, src, variant, …}
 * @param {string}     leadingIcon      — SVG raw string for O9Icon
 * @param {boolean}    checkbox         — show Checkbox control
 * @param {boolean}    radio            — show Radio control
 * @param {boolean}    emptyLeading     — empty icon-sized placeholder
 *
 * Checkbox / Radio state:
 * @param {boolean}    checked
 * @param {boolean}    indeterminate    — checkbox only
 * @param {function}   onCheckedChange
 * @param {string}     radioName        — radio group name
 * @param {string}     radioValue       — radio value
 *
 * Trailing elements:
 * @param {string}     shortcut         — keyboard shortcut label
 * @param {boolean}    switchControl    — show Switch toggle
 * @param {boolean}    switchChecked
 * @param {function}   onSwitchChange
 * @param {Array}      actions          — [{icon, onClick, 'aria-label'}]
 * @param {number}     maxActions       — max visible action buttons (default 3)
 * @param {boolean}    showOverflow     — show overflow (⋮) button
 * @param {function}   onOverflow
 * @param {boolean}    showSubmenu      — show angle-right drill-down
 * @param {function}   onSubmenuClick
 * @param {boolean}    showExternalLink — show external link icon
 * @param {string}     externalLinkHref
 * @param {function}   onExternalLinkClick
 *
 * @param {function}   onClick
 * @param {string}     className
 */
const ListItem = forwardRef(function ListItem(
  {
    children,
    secondaryText,

    active = false,
    danger = false,
    disabled = false,

    dragHandle = false,
    avatar,
    leadingIcon,
    checkbox = false,
    radio = false,
    emptyLeading = false,

    checked,
    indeterminate = false,
    onCheckedChange,
    radioName,
    radioValue,

    shortcut,
    switchControl = false,
    switchChecked,
    onSwitchChange,
    actions = [],
    maxActions = 3,
    showOverflow = false,
    onOverflow,
    showSubmenu = false,
    onSubmenuClick,
    showExternalLink = false,
    externalLinkHref,
    onExternalLinkClick,

    onClick,
    className,
    ...rest
  },
  ref,
) {
  const isTwoLine = !!secondaryText;
  const isInteractive = !!onClick && !disabled;

  /* ── Keyboard handler for A11Y: Enter / Space activate ── */
  const handleKeyDown = useCallback(
    (e) => {
      if (disabled || !onClick) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(e);
      }
    },
    [disabled, onClick],
  );

  /* ── Determine which leading element to render ── */
  const hasLeading = avatar || leadingIcon || checkbox || radio || emptyLeading;

  const renderLeading = () => {
    if (avatar) {
      const avatarProps = typeof avatar === 'object' && !avatar.$$typeof
        ? { size: 'normal', readOnly: true, ...avatar }
        : { size: 'normal', readOnly: true };
      return <Avatar {...avatarProps} />;
    }

    if (leadingIcon) {
      return (
        <span className="shrink-0 flex items-center justify-center w-4 h-4 [&_svg]:w-4 [&_svg]:h-4 text-text-tertiary">
          <O9Icon svg={leadingIcon} />
        </span>
      );
    }

    if (checkbox) {
      return (
        <span onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
          <Checkbox
            size="sm"
            checked={checked}
            indeterminate={indeterminate}
            onChange={onCheckedChange}
            disabled={disabled}
            aria-label={typeof children === 'string' ? children : undefined}
          />
        </span>
      );
    }

    if (radio) {
      return (
        <span onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
          <Radio
            size="sm"
            name={radioName}
            value={radioValue}
            checked={checked}
            onChange={onCheckedChange}
            disabled={disabled}
            aria-label={typeof children === 'string' ? children : undefined}
          />
        </span>
      );
    }

    if (emptyLeading) {
      return <span className="shrink-0 w-4 h-4" aria-hidden="true" />;
    }

    return null;
  };

  /* ── Visible action buttons (capped at maxActions) ── */
  const visibleActions = actions.slice(0, maxActions);

  /* ── Has any trailing element ── */
  const hasTrailing =
    shortcut || switchControl || visibleActions.length > 0 ||
    showOverflow || showSubmenu || showExternalLink;

  return (
    <div
      ref={ref}
      role={onClick ? 'button' : undefined}
      tabIndex={disabled ? -1 : 0}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={handleKeyDown}
      aria-disabled={disabled || undefined}
      aria-current={active ? 'true' : undefined}
      aria-selected={checkbox || radio ? !!checked : undefined}
      className={cn(
        'flex items-center gap-2 pl-3 pr-2 w-full bg-transparent',
        'text-sm transition-colors duration-100',
        'outline-none',
        isTwoLine ? 'min-h-10 py-2' : 'min-h-8 py-1',

        /* Active state — left-only 2px accent border + subtle bg */
        active && !danger && 'border-l-2 border-l-interactive bg-interactive-subtle pl-[10px]',
        active && danger && 'border-l-2 border-l-danger bg-danger/5 pl-[10px]',

        /* Danger state */
        danger && !disabled && 'text-danger',

        /* Default (non-active, non-danger) */
        !active && !danger && 'text-text',

        /* Hover */
        !disabled && !danger && 'hover:bg-interactive-subtle',
        !disabled && danger && 'hover:bg-danger/5',

        /* Focus-visible — single inset outline, no double border */
        'focus-visible:outline-1 focus-visible:outline focus-visible:-outline-offset-1 focus-visible:outline-interactive-border',

        /* Disabled */
        disabled && 'opacity-35 pointer-events-none',

        /* Interactive cursor */
        isInteractive && 'cursor-pointer',
        className,
      )}
      {...rest}
    >
      {/* ── Drag handle ── */}
      {dragHandle && (
        <Tooltip label="Drag to reorder" placement="top">
          <span
            className="shrink-0 flex items-center justify-center w-4 h-4 [&_svg]:w-4 [&_svg]:h-4 text-text-tertiary cursor-grab"
            role="img"
            aria-label="Drag handle"
          >
            <O9Icon svg={dragHandleSvg} />
          </span>
        </Tooltip>
      )}

      {/* ── Leading element ── */}
      {hasLeading && (
        <span className="shrink-0 flex items-center">
          {renderLeading()}
        </span>
      )}

      {/* ── Text content ── */}
      <span className={cn('flex-1 min-w-0', isTwoLine ? 'flex flex-col gap-0.5' : 'truncate')}>
        {isTwoLine ? (
          <>
            <span className={cn('text-sm leading-tight truncate', danger && 'text-danger')}>
              {children}
            </span>
            <span className="text-[10px] leading-tight text-text-tertiary truncate">
              {secondaryText}
            </span>
          </>
        ) : (
          children
        )}
      </span>

      {/* ── Trailing elements — 2px gap ── */}
      {hasTrailing && (
        <span className="shrink-0 flex items-center gap-0.5">
          {/* Shortcut badge */}
          {shortcut && (
            <span
              className="shrink-0 inline-flex items-center text-xs leading-none text-text-tertiary font-mono tracking-wide bg-surface-overlay border border-border px-2 py-1"
              aria-hidden="true"
            >
              {shortcut}
            </span>
          )}

          {/* Switch — vertically centered */}
          {switchControl && (
            <span className="shrink-0 flex items-center" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
              <Switch
                size="sm"
                checked={switchChecked}
                onChange={onSwitchChange}
                disabled={disabled}
              />
            </span>
          )}

          {/* Action icon buttons with tooltips */}
          {visibleActions.map((action, i) => (
            <Tooltip key={i} label={action['aria-label'] || 'Action'} placement="top">
              <IconButton
                variant="secondary"
                size="sm"
                icon={<O9Icon svg={action.icon} />}
                aria-label={action['aria-label'] || 'Action'}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick?.(e);
                }}
                disabled={disabled}
              />
            </Tooltip>
          ))}

          {/* Overflow button with tooltip */}
          {showOverflow && (
            <Tooltip label="More actions" placement="top">
              <IconButton
                variant="secondary"
                size="sm"
                icon={<O9Icon svg={ellipsisVSvg} />}
                aria-label="More actions"
                onClick={(e) => {
                  e.stopPropagation();
                  onOverflow?.(e);
                }}
                disabled={disabled}
              />
            </Tooltip>
          )}

          {/* Submenu arrow with tooltip */}
          {showSubmenu && (
            <Tooltip label="Open submenu" placement="top">
              <IconButton
                variant="secondary"
                size="sm"
                icon={<O9Icon svg={angleRightSvg} />}
                aria-label="Open submenu"
                aria-haspopup="menu"
                onClick={(e) => {
                  e.stopPropagation();
                  onSubmenuClick?.(e);
                }}
                disabled={disabled}
              />
            </Tooltip>
          )}

          {/* External link with tooltip */}
          {showExternalLink && (
            <Tooltip label="Open in new tab" placement="top">
              {externalLinkHref ? (
                <a
                  href={externalLinkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onExternalLinkClick?.(e);
                  }}
                  className="shrink-0 inline-flex items-center justify-center h-6 w-6 text-text-tertiary hover:text-text transition-colors"
                  aria-label="Open in new tab"
                >
                  <span className="[&_svg]:w-[var(--o9con-16)] [&_svg]:h-[var(--o9con-16)]">
                    <O9Icon svg={arrowRightUpSvg} />
                  </span>
                </a>
              ) : (
                <IconButton
                  variant="secondary"
                  size="sm"
                  icon={<O9Icon svg={arrowRightUpSvg} />}
                  aria-label="Open in new tab"
                  onClick={(e) => {
                    e.stopPropagation();
                    onExternalLinkClick?.(e);
                  }}
                  disabled={disabled}
                />
              )}
            </Tooltip>
          )}
        </span>
      )}
    </div>
  );
});

ListItem.displayName = 'ListItem';
export default ListItem;
