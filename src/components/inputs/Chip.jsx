import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';

import closeSvg from '@/assets/icons/o9con-close.svg?raw';
import checkSvg from '@/assets/icons/o9con-check.svg?raw';
import blockerSvg from '@/assets/icons/o9con-blocker-action-filled-alt.svg?raw';
import dragHandleSvg from '@/assets/icons/o9con-drag-handle.svg?raw';

/**
 * Chip — compact element representing a tag, attribute, filter, or selection.
 *
 * Figma reference: node 26482-67444
 *
 * Variants:
 *  - primary:   Subtle filled background (surface-chip)
 *  - secondary: Subtle border, transparent bg; hover/active/focus fill like primary
 *  - tertiary:  Purple border & text (utility-purple-light)
 *
 * Sizes: sm (24px), md (28px), lg (32px)
 *
 * States: enable, hover, focus, active, readOnly, disabled, error
 *
 * Modifiers:
 *  - exclude:     Outline/border mode (has-Exclude in Figma)
 *  - draggable:   Drag handle flush left, no top/left/bottom padding (has-Drag)
 *  - avatar/avatarSrc: User avatar
 *  - leadingIcon / trailingIcon: Icons
 *  - unsaved:     Unsaved indicator dot
 *  - removable:   Close button flush right, packed with container — no top/right/bottom padding
 *  - selected:    Active/checked state
 *
 * Shape: Sharp rectangular corners (no border-radius) — matches o9ds design language
 */

/* ── Variant styles (default / non-exclude) ── */
const variantStyles = {
  primary:
    'bg-surface-chip text-text border border-transparent hover:bg-interactive-muted-hover',
  secondary:
    'bg-transparent text-text border border-border-strong hover:bg-surface-chip hover:border-border-hover',
  tertiary:
    'bg-transparent text-utility-purple-light border border-utility-purple-light hover:bg-utility-purple-light/10',
};

/* ── Variant styles when exclude=true (outline mode) ── */
const excludeStyles = {
  primary:
    'bg-transparent text-text border border-border-strong hover:border-border-hover hover:bg-surface-chip',
  secondary:
    'bg-transparent text-text border border-border-subtle hover:border-border-hover hover:bg-surface-chip',
  tertiary:
    'bg-transparent text-utility-purple-light border border-utility-purple-light hover:bg-utility-purple-light/10',
};

/* ── Size styles (height, text, gap — padding applied separately) ── */
const sizeStyles = {
  sm: 'h-6 text-[10px] gap-1',
  md: 'h-7 text-xs gap-1.5',
  lg: 'h-8 text-sm gap-1.5',
};

/* ── Horizontal padding per size (applied conditionally) ── */
const padLeft  = { sm: 'pl-2', md: 'pl-2.5', lg: 'pl-3' };
const padRight = { sm: 'pr-2', md: 'pr-2.5', lg: 'pr-3' };

/* ── Icon sizes per chip size ── */
/* Font-size controls O9Icon's 1em×1em so SVG stays within its container */
const iconSize = {
  sm: 'text-xs',    /* 1em = 12px */
  md: 'text-sm',    /* 1em = 14px */
  lg: 'text-base',  /* 1em = 16px */
};

/* ── Close button: self-stretching, flush right, packed with container ── */
/* Font-size controls icon sizing via O9Icon's 1em */
const closeBtnSize = {
  sm: 'self-stretch w-5 text-[10px]',
  md: 'self-stretch w-6 text-xs',
  lg: 'self-stretch w-7 text-sm',
};

/* ── Drag handle: self-stretching, flush left, tight-packed ── */
/* Icon sizing via font-size so O9Icon's 1em×1em stays in sync with its SVG */
const dragHandleSize = {
  sm: 'self-stretch w-4 text-xs',
  md: 'self-stretch w-5 text-sm',
  lg: 'self-stretch w-6 text-sm',
};

/* ── Avatar sizes within chip ── */
const avatarSize = {
  sm: 'h-4 w-4 text-[7px]',
  md: 'h-5 w-5 text-[8px]',
  lg: 'h-6 w-6 text-[9px]',
};

/* ── Dot sizes ── */
const dotSize = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
  lg: 'h-2 w-2',
};

/* ── Dot colors ── */
const dotColors = {
  default: 'bg-text-tertiary',
  success: 'bg-success',
  warning: 'bg-warning',
  error:   'bg-danger',
  info:    'bg-info',
  utility: 'bg-utility-purple',
};

/* ── Count badge styles ── */
const countStyles = {
  sm: 'text-[9px] min-w-[14px] h-3.5 px-1',
  md: 'text-[10px] min-w-[16px] h-4 px-1',
  lg: 'text-xs min-w-[18px] h-[18px] px-1.5',
};

const Chip = forwardRef(function Chip(
  {
    variant = 'primary',
    size = 'md',
    leadingIcon,
    trailingIcon,
    avatar,
    avatarSrc,
    dot,
    count,
    selected = false,
    exclude = false,
    error = false,
    readOnly = false,
    draggable: isDraggable = false,
    unsaved = false,
    removable = false,
    onRemove,
    disabled = false,
    className,
    children,
    ...rest
  },
  ref
) {
  /* ── Avatar rendering ── */
  const avatarInitials = avatar
    ? avatar.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
    : null;

  const hasAvatar = avatar || avatarSrc;

  /* ── Keyboard handler ── */
  const handleKeyDown = (e) => {
    if (disabled || readOnly) return;

    if ((e.key === 'Enter' || e.key === ' ') && rest.onClick) {
      e.preventDefault();
      rest.onClick(e);
    }

    if ((e.key === 'Delete' || e.key === 'Backspace') && removable) {
      e.preventDefault();
      onRemove?.();
    }

    rest.onKeyDown?.(e);
  };

  /* ── Resolve visual styles ── */
  const getBaseStyles = () => {
    if (selected) {
      return 'bg-interactive text-on-interactive border border-interactive hover:bg-interactive-hover';
    }
    if (error) {
      return exclude
        ? 'bg-transparent text-text border border-danger hover:bg-surface-overlay'
        : `${variantStyles[variant] || variantStyles.primary} border-danger`;
    }
    if (exclude) {
      return excludeStyles[variant] || excludeStyles.primary;
    }
    return variantStyles[variant] || variantStyles.primary;
  };

  return (
    <span
      ref={ref}
      role={rest.onClick ? 'button' : undefined}
      tabIndex={rest.onClick && !disabled ? 0 : undefined}
      aria-selected={rest.onClick ? selected : undefined}
      aria-disabled={disabled || undefined}
      aria-invalid={error || undefined}
      aria-readonly={readOnly || undefined}
      draggable={isDraggable || undefined}
      className={cn(
        /* Sharp rectangular corners — matching o9ds design language */
        'inline-flex items-center font-medium',
        'transition-colors duration-100',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-border/50',
        disabled
          ? 'opacity-35 pointer-events-none'
          : readOnly
            ? 'pointer-events-none border-dashed!'
            : rest.onClick
              ? 'cursor-pointer select-none'
              : '',
        getBaseStyles(),
        sizeStyles[size],
        /* Conditional padding — removed on sides with flush elements */
        !isDraggable && padLeft[size],
        !removable && padRight[size],
        /* Adjust left padding when avatar is present (and not draggable) */
        hasAvatar && !isDraggable && 'pl-1',
        /* Drag mode adjustments */
        isDraggable && 'cursor-grab active:cursor-grabbing',
        className
      )}
      {...rest}
      onKeyDown={handleKeyDown}
    >
      {/* ── Drag handle (flush left, no top/left/bottom padding) ── */}
      {isDraggable && (
        <span className={cn(
          'shrink-0 flex items-center justify-center text-text-tertiary',
          dragHandleSize[size]
        )}>
          <O9Icon svg={dragHandleSvg} />
        </span>
      )}

      {/* ── Status dot ── */}
      {dot && !hasAvatar && !leadingIcon && !selected && (
        <span
          className={cn(
            'shrink-0 rounded-full',
            dotSize[size],
            dotColors[dot] || dotColors.default
          )}
          aria-hidden="true"
        />
      )}

      {/* ── Selected checkmark ── */}
      {selected && !hasAvatar && (
        <span className={cn('shrink-0 flex items-center justify-center', iconSize[size])}>
          <O9Icon svg={checkSvg} />
        </span>
      )}

      {/* ── Avatar ── */}
      {hasAvatar && (
        <span className="shrink-0">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={avatar || 'Avatar'}
              className={cn('rounded-full object-cover border border-border-subtle', avatarSize[size])}
            />
          ) : (
            <span
              className={cn(
                'flex items-center justify-center rounded-full font-semibold select-none border border-border-subtle',
                avatarSize[size],
                selected
                  ? 'bg-on-interactive/20 text-on-interactive border-on-interactive/30'
                  : 'bg-surface-overlay text-text-secondary'
              )}
              aria-hidden="true"
            >
              {avatarInitials}
            </span>
          )}
        </span>
      )}

      {/* ── Leading icon ── */}
      {leadingIcon && !hasAvatar && !selected && (
        <span className={cn('shrink-0 flex items-center justify-center', iconSize[size])}>
          {leadingIcon}
        </span>
      )}

      {/* ── Label text ── */}
      <span className="truncate">{children}</span>

      {/* ── Count badge ── */}
      {count !== undefined && count !== null && (
        <span
          className={cn(
            'shrink-0 inline-flex items-center justify-center rounded-full font-semibold tabular-nums',
            countStyles[size],
            selected
              ? 'bg-on-interactive/20 text-on-interactive'
              : 'bg-surface-overlay text-text-secondary'
          )}
          aria-label={`Count: ${count}`}
        >
          {count}
        </span>
      )}

      {/* ── Unsaved indicator dot ── */}
      {unsaved && (
        <span
          className="shrink-0 h-1.5 w-1.5 rounded-full bg-warning"
          aria-label="Unsaved changes"
        />
      )}

      {/* ── Error icon (blocker-action-filled-alt) ── */}
      {error && !removable && (
        <span className={cn('shrink-0 flex items-center justify-center text-danger', iconSize[size])}>
          <O9Icon svg={blockerSvg} />
        </span>
      )}

      {/* ── Exclude check/close icon (for exclude mode, non-removable) ── */}
      {exclude && !removable && !error && (
        <span className={cn(
          'shrink-0 flex items-center justify-center',
          selected ? 'text-on-interactive' : 'text-text-tertiary',
          iconSize[size]
        )}>
          <O9Icon svg={selected ? checkSvg : closeSvg} />
        </span>
      )}

      {/* ── Trailing icon ── */}
      {trailingIcon && !removable && !exclude && !error && (
        <span className={cn('shrink-0 flex items-center justify-center', iconSize[size])}>
          {trailingIcon}
        </span>
      )}

      {/* ── Remove / close button (flush right, packed with container) ── */}
      {removable && (
        <button
          type="button"
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          disabled={disabled}
          className={cn(
            'shrink-0 flex items-center justify-center transition-colors cursor-pointer',
            closeBtnSize[size],
            selected
              ? 'text-on-interactive/70 hover:text-on-interactive hover:bg-on-interactive/15'
              : 'text-text-tertiary hover:text-text hover:bg-surface-overlay'
          )}
          aria-label="Remove"
        >
          <O9Icon svg={closeSvg} />
        </button>
      )}
    </span>
  );
});

export default Chip;
