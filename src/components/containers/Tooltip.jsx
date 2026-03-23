import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TOOLTIP COMPONENT
   Figma: 🟡 o9ds-tooltip [EBTA 2.0]

   Two variants:
   1. Plain  — single-line label + optional shortcut badge
   2. Rich   — header title, description, shortcut + "Learn more" button

   Color scheme is INVERTED:
   - Dark mode  → white/light background, dark text
   - Light mode → dark/black background, white text
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* ── Shortcut badge sub-component ── */
function ShortcutBadge({ shortcut }) {
  if (!shortcut) return null;
  return (
    <span className="inline-flex items-center shrink-0 h-5 px-1 bg-[var(--color-tooltip-muted)] text-[var(--color-tooltip-fg)] text-xs leading-none text-center whitespace-nowrap">
      {shortcut}
    </span>
  );
}

/* ── Placement offsets ── */
const PLACEMENT_STYLES = {
  top:    'bottom-full left-1/2 -translate-x-1/2 mb-1.5',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-1.5',
  left:   'right-full top-1/2 -translate-y-1/2 mr-1.5',
  right:  'left-full top-1/2 -translate-y-1/2 ml-1.5',
};

/**
 * Tooltip — brief informational overlay on hover/focus.
 *
 * @param {string}    label          — tooltip text (plain variant)
 * @param {ReactNode} content        — legacy: raw tooltip content (still supported)
 * @param {string}    shortcut       — keyboard shortcut string, e.g. "⌘ S"
 * @param {'plain'|'rich'} variant   — tooltip type
 * @param {string}    title          — header title (rich variant)
 * @param {string}    description    — body text (rich variant)
 * @param {string}    learnMoreText  — learn-more button label (rich variant)
 * @param {string}    learnMoreHref  — learn-more URL
 * @param {function}  onLearnMore    — learn-more click handler
 * @param {'top'|'bottom'|'left'|'right'} placement
 * @param {number}    delay          — show delay in ms (default 400)
 * @param {string}    className      — applied to the trigger wrapper
 * @param {ReactNode} children       — the trigger element
 */
export default function Tooltip({
  label,
  content,
  shortcut,
  variant = 'plain',
  title,
  description,
  learnMoreText = 'Learn more',
  learnMoreHref,
  onLearnMore,
  placement = 'top',
  delay = 400,
  className,
  children,
}) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState(null);
  const timerRef = useRef(null);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPos(rect);
  }, []);

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => {
      updatePosition();
      setVisible(true);
    }, delay);
  }, [delay, updatePosition]);

  const hide = useCallback(() => {
    clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  /* ── Reposition on scroll/resize while visible ── */
  useEffect(() => {
    if (!visible) return;
    const reposition = () => updatePosition();
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    return () => {
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
    };
  }, [visible, updatePosition]);

  /* ── Determine if rich ── */
  const isRich = variant === 'rich';

  /* ── Resolve label text (backward compat with content prop) ── */
  const displayLabel = label || content;

  /* ── Has interactive footer (learn more button) ── */
  const hasLearnMore = isRich && (learnMoreHref || onLearnMore);

  /* ── Don't render if nothing to show ── */
  const hasContent = isRich
    ? (title || description)
    : displayLabel;

  /* ── Compute portal tooltip position ── */
  const getTooltipStyle = () => {
    if (!pos) return { position: 'fixed', opacity: 0, pointerEvents: 'none' };
    const GAP = 6;
    const style = { position: 'fixed', zIndex: 9999 };
    switch (placement) {
      case 'bottom':
        style.top = pos.bottom + GAP;
        style.left = pos.left + pos.width / 2;
        style.transform = 'translateX(-50%)';
        break;
      case 'left':
        style.top = pos.top + pos.height / 2;
        style.right = window.innerWidth - pos.left + GAP;
        style.transform = 'translateY(-50%)';
        break;
      case 'right':
        style.top = pos.top + pos.height / 2;
        style.left = pos.right + GAP;
        style.transform = 'translateY(-50%)';
        break;
      case 'top':
      default:
        style.bottom = window.innerHeight - pos.top + GAP;
        style.left = pos.left + pos.width / 2;
        style.transform = 'translateX(-50%)';
        break;
    }
    return style;
  };

  return (
    <span
      ref={triggerRef}
      className={cn('relative inline-flex', className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}

      {visible && hasContent && createPortal(
        <span
          ref={tooltipRef}
          role="tooltip"
          style={getTooltipStyle()}
          className={cn(
            'bg-[var(--color-tooltip)] text-[var(--color-tooltip-fg)]',
            'shadow-[0px_2px_4px_0px_rgba(16,16,16,0.14),0px_0px_2px_0px_rgba(16,16,16,0.12)]',
            isRich
              ? 'flex flex-col items-start gap-1 w-[320px] max-w-[320px] px-3 pt-2.5 pb-3 pointer-events-auto'
              : 'inline-flex items-center gap-1 whitespace-nowrap px-1.5 py-1 pointer-events-none'
          )}
        >
          {/* ── PLAIN variant ── */}
          {!isRich && (
            <>
              <span className="text-xs leading-normal min-h-px min-w-px">
                {displayLabel}
              </span>
              <ShortcutBadge shortcut={shortcut} />
            </>
          )}

          {/* ── RICH variant ── */}
          {isRich && (
            <>
              {/* Row 1: Header */}
              {title && (
                <p className="text-xs font-medium leading-normal w-full">
                  {title}
                </p>
              )}

              {/* Row 2: Description */}
              {description && (
                <p className="text-xs leading-normal w-full text-[var(--color-tooltip-secondary)]">
                  {description}
                </p>
              )}

              {/* Row 3: Footer — shortcut + learn more */}
              {(shortcut || hasLearnMore) && (
                <div className="flex items-center justify-between w-full mt-1 gap-1">
                  <ShortcutBadge shortcut={shortcut} />

                  {/* Spacer when no shortcut */}
                  {!shortcut && <span />}

                  {hasLearnMore && (
                    <a
                      href={learnMoreHref || '#'}
                      onClick={(e) => {
                        if (onLearnMore) {
                          e.preventDefault();
                          onLearnMore();
                        }
                      }}
                      className="inline-flex items-center justify-center h-6 px-2 py-1 text-xs leading-4 bg-[var(--color-tooltip-btn)] text-[var(--color-tooltip-btn-fg)] hover:opacity-80 transition-opacity cursor-pointer shrink-0 tracking-tight"
                    >
                      {learnMoreText}
                    </a>
                  )}
                </div>
              )}
            </>
          )}
        </span>,
        document.body
      )}
    </span>
  );
}
