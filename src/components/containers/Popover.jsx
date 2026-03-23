import { forwardRef, useState, useRef, useEffect, useCallback, cloneElement } from 'react';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';
import IconButton from '@/components/buttons/IconButton';
import Button from '@/components/buttons/Button';

import arrowLeftSvg from '@/assets/icons/o9con-arrow-left.svg?raw';
import closeSvg from '@/assets/icons/o9con-close.svg?raw';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   POPOVER COMPONENT
   Figma: 🟡 o9ds-popover [BETA 2.0]

   Four-section structured layout:
   1. Header — back button, title, action buttons, close
   2. Sticky Header — non-scrolling content area (description, filters)
   3. Body — scrollable content area (space or edge variant)
   4. Footer — CTA buttons (tertiary icon, secondary, primary)

   Two body variants:
   - "space" — padded content area (default)
   - "edge"  — full-width, no horizontal padding

   Back-button navigation includes slide animation:
   - Forward (drilling in):  content slides right-to-left
   - Backward (going back):  content slides left-to-right
   - Uses o9ds motion tokens for duration and easing

   Also supports legacy mode: if no structured props are
   provided, renders children directly (backward compat).
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const PLACEMENT_STYLES = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  'top-start': 'bottom-full left-0 mb-2',
  'top-end': 'bottom-full right-0 mb-2',
  'bottom-start': 'top-full left-0 mt-2',
  'bottom-end': 'top-full right-0 mt-2',
};

/* ── Slide animation duration (matches --o9ds-motion-duration-short) ── */
const SLIDE_DURATION_MS = 200;

/**
 * Popover — a floating structured panel with header, body, and footer.
 *
 * @param {ReactElement}  trigger           — element that opens the popover on click
 * @param {string}        placement         — position relative to trigger
 * @param {boolean}       open              — controlled open state
 * @param {function}      onOpenChange      — callback when open changes
 *
 * — Header (Section 1) —
 * @param {string}        title             — popover title
 * @param {boolean}       hasBackBtn        — show back arrow button
 * @param {function}      onBack            — back button callback
 * @param {ReactNode}     headerActions     — action elements between title and close (Switch, DropdownButton, etc.)
 * @param {function}      onClose           — close button callback (also closes popover)
 *
 * — Sticky Header (Section 2) —
 * @param {ReactNode}     stickyHeader      — non-scrolling content below header
 *
 * — Body (Section 3) —
 * @param {'space'|'edge'} variant          — "space" = padded body, "edge" = full-width body
 * @param {ReactNode}     children          — body content
 *
 * — Footer (Section 4) —
 * @param {string}        primaryLabel      — primary CTA label
 * @param {function}      onPrimaryClick    — primary CTA handler (popover closes after callback)
 * @param {string}        secondaryLabel    — secondary CTA label
 * @param {function}      onSecondaryClick  — secondary CTA handler (popover closes after callback)
 * @param {string}        tertiaryIcon      — tertiary icon SVG (raw string)
 * @param {function}      onTertiaryClick   — tertiary icon button handler
 * @param {string}        tertiaryLabel     — accessible label for the tertiary icon button (default "Additional action")
 * @param {ReactNode}     footer            — custom footer content (overrides individual footer props)
 *
 * @param {number|string} width             — popover width (default auto, max 700px)
 * @param {string}        className         — additional CSS for the panel
 */
const Popover = forwardRef(function Popover(
  {
    trigger,
    placement = 'bottom',
    open: controlledOpen,
    onOpenChange,

    /* Header */
    title,
    hasBackBtn = false,
    onBack,
    headerActions,
    onClose,

    /* Sticky header */
    stickyHeader,

    /* Body */
    variant = 'space',
    children,

    /* Footer */
    primaryLabel,
    onPrimaryClick,
    secondaryLabel,
    onSecondaryClick,
    tertiaryIcon,
    onTertiaryClick,
    tertiaryLabel = 'Additional action',
    footer: customFooter,

    /* Layout */
    width,
    className,
    ...rest
  },
  ref
) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const containerRef = useRef(null);

  /* ── Stable IDs for ARIA linking ── */
  const popoverId = useRef(`popover-${Math.random().toString(36).slice(2, 8)}`).current;
  const titleId = `${popoverId}-title`;

  /* ── Refs for focus management ── */
  const closeBtnRef = useRef(null);
  const prevIsOpenRef = useRef(false);

  const setOpen = (val) => {
    if (!isControlled) setInternalOpen(val);
    onOpenChange?.(val);
  };

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  /* ── Click outside to close ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  /* ── Escape to close ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

  /* ── Focus management ──
     On open:  move focus to the close button (first interactive element in header)
     On close: return focus to the trigger element
  ── */
  useEffect(() => {
    if (isOpen && !prevIsOpenRef.current) {
      // Popover just opened — focus the close button after DOM renders
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus();
      });
    } else if (!isOpen && prevIsOpenRef.current) {
      // Popover just closed — return focus to trigger
      const trigger = containerRef.current?.querySelector(
        'button, [tabindex]:not([tabindex="-1"]), a[href], input, select, textarea'
      );
      trigger?.focus();
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen]);

  /* ── Slide animation for back-button navigation ──
     Detects changes to hasBackBtn while popover is open:
     - false → true  = "forward"  (drilling in)  → slide from right
     - true → false  = "backward" (going back)   → slide from left
     Uses rAF two-phase pattern (same as Toast) with o9ds motion tokens.
  ── */
  const contentRef = useRef(null);
  const prevHasBackRef = useRef(hasBackBtn);
  const slideRafRef = useRef(null);
  const slideTimerRef = useRef(null);

  const runSlideAnimation = useCallback((direction) => {
    const el = contentRef.current;
    if (!el) return;

    // Respect prefers-reduced-motion — skip animation entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Cancel any in-flight animation
    if (slideRafRef.current) cancelAnimationFrame(slideRafRef.current);
    if (slideTimerRef.current) clearTimeout(slideTimerRef.current);

    // Phase 1: set initial off-screen position (no transition)
    const startX = direction === 'forward' ? '40%' : '-40%';
    el.style.transform = `translateX(${startX})`;
    el.style.opacity = '0';
    el.style.transition = 'none';

    // Phase 2: on next frame, enable transition and slide to final position
    slideRafRef.current = requestAnimationFrame(() => {
      slideRafRef.current = requestAnimationFrame(() => {
        el.style.transition = [
          'transform var(--o9ds-motion-duration-short) var(--o9ds-motion-ease-out)',
          'opacity var(--o9ds-motion-duration-short) var(--o9ds-motion-ease-out)',
        ].join(', ');
        el.style.transform = 'translateX(0)';
        el.style.opacity = '1';
      });
    });

    // Phase 3: clean up inline styles after animation completes
    slideTimerRef.current = setTimeout(() => {
      el.style.transform = '';
      el.style.opacity = '';
      el.style.transition = '';
      slideTimerRef.current = null;
    }, SLIDE_DURATION_MS + 50);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      prevHasBackRef.current = hasBackBtn;
      return;
    }
    if (prevHasBackRef.current !== hasBackBtn) {
      const direction = hasBackBtn ? 'forward' : 'backward';
      prevHasBackRef.current = hasBackBtn;
      runSlideAnimation(direction);
    }
  }, [hasBackBtn, isOpen, runSlideAnimation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (slideRafRef.current) cancelAnimationFrame(slideRafRef.current);
      if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
    };
  }, []);

  // Reset tracking when popover closes
  useEffect(() => {
    if (!isOpen) {
      prevHasBackRef.current = false;
    }
  }, [isOpen]);

  /* ── Trigger clone ── */
  const triggerElement = cloneElement(trigger, {
    onClick: (e) => {
      trigger.props.onClick?.(e);
      setOpen(!isOpen);
    },
    'aria-expanded': isOpen,
    'aria-haspopup': 'dialog',
  });

  /* ── Determine if structured or legacy mode ── */
  const isStructured = !!(title || stickyHeader || primaryLabel || secondaryLabel || customFooter);
  const hasFooter = !!(primaryLabel || secondaryLabel || tertiaryIcon || customFooter);

  return (
    <div ref={containerRef} className="relative inline-flex">
      {triggerElement}

      {isOpen && (
        <div
          ref={ref}
          role="dialog"
          aria-labelledby={title ? titleId : undefined}
          aria-modal="false"
          className={cn(
            'absolute z-50',
            'bg-surface-popover shadow-[0px_10px_20px_0px_rgba(16,16,16,0.14)]',
            'border border-border/40',
            'max-h-[900px] max-w-[700px]',
            isStructured ? 'flex flex-col min-w-[280px] overflow-hidden' : 'p-4 min-w-[200px]',
            PLACEMENT_STYLES[placement],
            className
          )}
          style={width ? { width: typeof width === 'number' ? `${width}px` : width } : undefined}
          {...rest}
        >
          {/* ─────── LEGACY MODE (no structured props) ─────── */}
          {!isStructured && children}

          {/* ─────── STRUCTURED MODE ─────── */}
          {isStructured && (
            <>
              {/* ── Section 1: Header ── */}
              {title && (
                <div className="flex items-center gap-2 px-3 py-2 overflow-hidden shrink-0">
                  {/* Left: back button + title */}
                  <div className="flex flex-1 items-center gap-1 min-w-0">
                    {hasBackBtn && (
                      <IconButton
                        icon={<O9Icon svg={arrowLeftSvg} />}
                        variant="secondary"
                        size="sm"
                        aria-label="Go back"
                        onClick={onBack}
                      />
                    )}
                    <h3 id={titleId} className="flex-1 text-base font-medium text-text truncate leading-6 min-w-0">
                      {title}
                    </h3>
                  </div>

                  {/* Right: action buttons + close */}
                  <div className="flex items-center gap-1 shrink-0">
                    {headerActions}
                    <IconButton
                      ref={closeBtnRef}
                      icon={<O9Icon svg={closeSvg} />}
                      variant="secondary"
                      size="sm"
                      aria-label="Close popover"
                      onClick={handleClose}
                    />
                  </div>
                </div>
              )}

              {/* ── Content area (sticky header + body + footer) ──
                   Animated on back-button navigation transitions.
                   overflow-hidden clips content during slide animation.
              ── */}
              <div ref={contentRef} className="flex flex-col flex-1 min-h-0 overflow-hidden">
                {/* ── Section 2: Sticky Header ── */}
                {stickyHeader && (
                  <div className="px-3 pt-2 shrink-0 overflow-hidden">
                    {stickyHeader}
                  </div>
                )}

                {/* ── Section 3: Body ── */}
                {children && (
                  <div
                    role="region"
                    aria-label={title ? `${title} content` : 'Popover content'}
                    tabIndex={0}
                    className={cn(
                      'flex-1 overflow-y-auto min-h-0 pt-2 pb-4',
                      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-interactive-border/50',
                      variant === 'edge' ? 'w-full' : 'px-3'
                    )}
                  >
                    {children}
                  </div>
                )}

                {/* ── Section 4: Footer ── */}
                {hasFooter && (
                  <div className="flex items-center justify-end gap-1.5 px-3 pt-2 pb-4 shrink-0 overflow-hidden">
                    {customFooter || (
                      <div className="flex flex-1 items-center justify-end gap-1.5 h-8">
                        {/* Tertiary icon button — left-aligned if alone */}
                        {tertiaryIcon && (
                          <IconButton
                            icon={<O9Icon svg={tertiaryIcon} />}
                            variant="secondary"
                            size="md"
                            aria-label={tertiaryLabel}
                            onClick={onTertiaryClick}
                            className="mr-auto"
                          />
                        )}

                        {/* Secondary button */}
                        {secondaryLabel && (
                          <Button
                            variant="outline"
                            size="md"
                            onClick={() => {
                              onSecondaryClick?.();
                              handleClose();
                            }}
                            className="min-w-[112px]"
                          >
                            {secondaryLabel}
                          </Button>
                        )}

                        {/* Primary button */}
                        {primaryLabel && (
                          <Button
                            variant="primary"
                            size="md"
                            onClick={() => {
                              onPrimaryClick?.();
                              handleClose();
                            }}
                            className="min-w-[112px]"
                          >
                            {primaryLabel}
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
});

export default Popover;
