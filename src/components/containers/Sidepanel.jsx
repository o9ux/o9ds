import { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';
import IconButton from '@/components/buttons/IconButton';
import Button from '@/components/buttons/Button';
import Switch from '@/components/inputs/Switch';
import Tooltip from '@/components/containers/Tooltip';

import arrowLeftSvg from '@/assets/icons/o9con-arrow-left.svg?raw';
import closeSvg from '@/assets/icons/o9con-close.svg?raw';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SIDEPANEL COMPONENT
   Figma: 🟡 o9ds-side-panel [BETA 2.0]

   A slide-in panel anchored to a screen edge with four-section
   structured layout (mirroring Popover):

   1. Header       — back button, title, headerActions (Switch,
                      DropdownButton, overflow), close
   2. Sticky Header — non-scrolling slot (InlineAlert, Tabstrip,
                      Search, BadgeAlert)
   3. Body          — scrollable content (space or edge variant)
   4. Footer        — CTA buttons (secondary + primary)

   Three slide directions:
   - "right"  — slides in from right edge (default)
   - "left"   — slides in from left edge
   - "bottom" — slides up from bottom edge

   Two panel types:
   - "overlay" — portal to body, backdrop overlay, focus trap
   - "layout"  — inline render, no overlay, border, resizable

   Overlay variants (overlay type only):
   - "dim"         — semi-transparent dark backdrop
   - "blur"        — frosted glass backdrop
   - "transparent" — invisible backdrop (page interactive)

   Resizable: single-axis edge resize via mouse drag.

   Animations use o9ds motion tokens:
   - Enter: --o9ds-motion-duration-normal + ease-out
   - Exit:  --o9ds-motion-duration-normal + ease-in-out
   - Respects prefers-reduced-motion
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* ── Constants ── */
const PANEL_ANIM_MS = 400;       // --o9ds-motion-duration-normal
const BACK_SLIDE_MS = 200;       // --o9ds-motion-duration-short
const RESIZE_EDGE = 6;           // px — invisible resize zone
const DEFAULT_WIDTH = 290;       // px — Figma spec
const DEFAULT_HEIGHT = '50%';    // for bottom direction
const MIN_W = 200;
const MIN_H = 150;

/* ── Direction → off-screen transform ── */
const TRANSFORM_MAP = {
  right:  { axis: 'X', sign: '' },
  left:   { axis: 'X', sign: '-' },
  bottom: { axis: 'Y', sign: '' },
};

/* ── Direction → shadow (faces content, not edge) ── */
const SHADOW_MAP = {
  right:  'shadow-[-10px_0px_10px_0px_var(--o9ds-color-s-shadow-static-2)]',
  left:   'shadow-[10px_0px_10px_0px_var(--o9ds-color-s-shadow-static-2)]',
  bottom: 'shadow-[0px_-10px_10px_0px_var(--o9ds-color-s-shadow-static-2)]',
};

/* ── Overlay backdrop classes ── */
const OVERLAY_MAP = {
  dim: 'bg-backdrop',
  blur: 'bg-backdrop/40 backdrop-blur-md',
  transparent: 'bg-transparent',
};

/**
 * Sidepanel — a slide-in structured panel anchored to a screen edge.
 */
const Sidepanel = forwardRef(function Sidepanel(
  {
    open,
    onClose,

    /* Variant & Direction */
    direction = 'right',
    panelType = 'overlay',
    overlay = 'dim',

    /* Sizing */
    defaultWidth = DEFAULT_WIDTH,
    defaultHeight = DEFAULT_HEIGHT,
    minWidth = MIN_W,
    maxWidth = '80vw',
    minHeight = MIN_H,
    maxHeight = '80vh',

    /* Resizable */
    resizable = false,

    /* Header */
    title,
    hasBackBtn = false,
    onBack,
    headerActions,
    headerSwitch = false,
    headerSwitchChecked,
    onHeaderSwitchChange,
    headerSwitchLabel = 'Toggle',
    overflowMenu,

    /* Sticky header */
    stickyHeader,

    /* Body */
    bodyVariant = 'space',
    children,

    /* Footer */
    primaryLabel,
    onPrimaryClick,
    secondaryLabel,
    onSecondaryClick,
    footer: customFooter,

    className,
    ...rest
  },
  ref
) {
  /* ── Animation phase state machine ── */
  const [phase, setPhase] = useState('closed');
  // closed → mount → entering → open → exiting → closed

  /* ── Resize state ── */
  const [resizeSize, setResizeSize] = useState(null);
  const [isResizing, setIsResizing] = useState(false);

  /* ── Refs ── */
  const panelRef = useRef(null);
  const contentRef = useRef(null);
  const prevOpenRef = useRef(false);
  const prevHasBackRef = useRef(hasBackBtn);
  const slideRafRef = useRef(null);
  const slideTimerRef = useRef(null);

  /* ── Stable IDs ── */
  const panelId = useRef(`sidepanel-${Math.random().toString(36).slice(2, 8)}`).current;
  const titleId = `${panelId}-title`;

  /* ── Derived ── */
  const isOverlay = panelType === 'overlay';
  const isHorizontal = direction === 'right' || direction === 'left';
  const hasFooter = !!(primaryLabel || secondaryLabel || customFooter);

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     ANIMATION LIFECYCLE
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

  useEffect(() => {
    if (open && phase === 'closed') {
      setPhase('mount');
    } else if (!open && (phase === 'open' || phase === 'entering')) {
      setPhase('exiting');
    }
  }, [open, phase]);

  /* mount → entering (after one rAF for DOM paint) */
  useEffect(() => {
    if (phase !== 'mount') return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPhase('entering');
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  /* entering → open (after transition completes) */
  useEffect(() => {
    if (phase !== 'entering') return;
    const timer = setTimeout(() => {
      setPhase('open');
    }, PANEL_ANIM_MS + 50);
    return () => clearTimeout(timer);
  }, [phase]);

  /* exiting → closed (after transition completes) */
  useEffect(() => {
    if (phase !== 'exiting') return;
    const timer = setTimeout(() => {
      setPhase('closed');
      setResizeSize(null);
    }, PANEL_ANIM_MS + 50);
    return () => clearTimeout(timer);
  }, [phase]);

  /* ── Compute panel transform ── */
  const getTransform = () => {
    const { axis, sign } = TRANSFORM_MAP[direction] || TRANSFORM_MAP.right;
    if (phase === 'mount' || phase === 'closed') {
      return `translate${axis}(${sign}100%)`;
    }
    if (phase === 'exiting') {
      return `translate${axis}(${sign}100%)`;
    }
    return `translate${axis}(0)`;
  };

  const getOpacity = () => {
    if (phase === 'exiting') return 0.6;
    if (phase === 'mount') return 0;
    return 1;
  };

  const getTransition = () => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || phase === 'mount' || phase === 'closed') return 'none';
    if (phase === 'entering') {
      return 'transform var(--o9ds-motion-duration-normal) var(--o9ds-motion-ease-out), opacity var(--o9ds-motion-duration-normal) var(--o9ds-motion-ease-out)';
    }
    if (phase === 'exiting') {
      return 'transform var(--o9ds-motion-duration-normal) var(--o9ds-motion-ease-in-out), opacity var(--o9ds-motion-duration-normal) var(--o9ds-motion-ease-in-out)';
    }
    return 'none';
  };

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     KEYBOARD & FOCUS
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

  /* Escape to close */
  useEffect(() => {
    if (phase === 'closed') return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [phase, onClose]);

  /* Focus the panel on open */
  useEffect(() => {
    if (phase === 'entering' && !prevOpenRef.current) {
      requestAnimationFrame(() => {
        panelRef.current?.focus();
      });
    }
    prevOpenRef.current = open;
  }, [phase, open]);

  /* Focus trap (overlay only) */
  useEffect(() => {
    if (phase === 'closed' || !isOverlay) return;
    const handler = (e) => {
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [phase, isOverlay]);

  /* Body scroll lock (overlay only) */
  useEffect(() => {
    if (phase !== 'closed' && isOverlay) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [phase, isOverlay]);

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     BACK-BUTTON SLIDE ANIMATION (from Popover)
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

  const runSlideAnimation = useCallback((dir) => {
    const el = contentRef.current;
    if (!el) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (slideRafRef.current) cancelAnimationFrame(slideRafRef.current);
    if (slideTimerRef.current) clearTimeout(slideTimerRef.current);

    const startX = dir === 'forward' ? '40%' : '-40%';
    el.style.transform = `translateX(${startX})`;
    el.style.opacity = '0';
    el.style.transition = 'none';

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

    slideTimerRef.current = setTimeout(() => {
      el.style.transform = '';
      el.style.opacity = '';
      el.style.transition = '';
      slideTimerRef.current = null;
    }, BACK_SLIDE_MS + 50);
  }, []);

  useEffect(() => {
    if (phase === 'closed') { prevHasBackRef.current = hasBackBtn; return; }
    if (prevHasBackRef.current !== hasBackBtn) {
      const dir = hasBackBtn ? 'forward' : 'backward';
      prevHasBackRef.current = hasBackBtn;
      runSlideAnimation(dir);
    }
  }, [hasBackBtn, phase, runSlideAnimation]);

  useEffect(() => {
    if (phase === 'closed') prevHasBackRef.current = false;
  }, [phase]);

  useEffect(() => {
    return () => {
      if (slideRafRef.current) cancelAnimationFrame(slideRafRef.current);
      if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
    };
  }, []);

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     RESIZE LOGIC
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

  const handleResizeStart = useCallback((e) => {
    e.preventDefault();
    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startW = panelRef.current?.offsetWidth || DEFAULT_WIDTH;
    const startH = panelRef.current?.offsetHeight || 300;

    const prevCursor = document.body.style.cursor;
    const prevSelect = document.body.style.userSelect;
    document.body.style.cursor = isHorizontal ? 'ew-resize' : 'ns-resize';
    document.body.style.userSelect = 'none';

    const mwPx = typeof maxWidth === 'string' ? window.innerWidth * 0.8 : maxWidth;
    const mhPx = typeof maxHeight === 'string' ? window.innerHeight * 0.8 : maxHeight;

    const onMove = (me) => {
      if (isHorizontal) {
        const delta = direction === 'right' ? startX - me.clientX : me.clientX - startX;
        const newW = Math.max(minWidth, Math.min(mwPx, startW + delta));
        setResizeSize({ width: newW, height: startH });
      } else {
        const delta = startY - me.clientY;
        const newH = Math.max(minHeight, Math.min(mhPx, startH + delta));
        setResizeSize({ width: startW, height: newH });
      }
    };

    const onUp = () => {
      document.body.style.cursor = prevCursor;
      document.body.style.userSelect = prevSelect;
      setIsResizing(false);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [direction, isHorizontal, minWidth, maxWidth, minHeight, maxHeight]);

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     FOOTER HANDLERS
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

  const handlePrimary = () => { onPrimaryClick?.(); onClose?.(); };
  const handleSecondary = () => { onSecondaryClick?.(); onClose?.(); };
  const handleClose = () => { onClose?.(); };

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     RENDER
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

  if (phase === 'closed') return null;

  /* ── Compute panel dimensions ── */
  const sizeStyle = {};
  if (isHorizontal) {
    sizeStyle.width = resizeSize ? `${resizeSize.width}px` : (typeof defaultWidth === 'number' ? `${defaultWidth}px` : defaultWidth);
    sizeStyle.maxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
    sizeStyle.minWidth = `${minWidth}px`;
  } else {
    sizeStyle.height = resizeSize ? `${resizeSize.height}px` : (typeof defaultHeight === 'number' ? `${defaultHeight}px` : defaultHeight);
    sizeStyle.maxHeight = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;
    sizeStyle.minHeight = `${minHeight}px`;
  }

  /* ── Resize handle position ── */
  const resizeHandlePosition = direction === 'right' ? 'left' : direction === 'left' ? 'right' : 'top';
  const resizeHandleStyle = {
    position: 'absolute',
    [resizeHandlePosition]: 0,
    ...(isHorizontal
      ? { top: 0, bottom: 0, width: RESIZE_EDGE, cursor: 'ew-resize' }
      : { left: 0, right: 0, height: RESIZE_EDGE, cursor: 'ns-resize' }),
    zIndex: 10,
  };

  /* ── Panel positioning classes ── */
  const positionClasses = cn(
    'absolute',
    direction === 'right' && 'top-0 right-0 h-full',
    direction === 'left' && 'top-0 left-0 h-full',
    direction === 'bottom' && 'bottom-0 left-0 w-full',
  );

  /* ── Panel content ── */
  const panelContent = (
    <div
      ref={(node) => {
        panelRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      role="dialog"
      aria-modal={isOverlay ? 'true' : 'false'}
      aria-labelledby={title ? titleId : undefined}
      tabIndex={-1}
      className={cn(
        'flex flex-col outline-none overflow-hidden',
        'bg-surface-popover',
        isOverlay ? SHADOW_MAP[direction] : 'border border-border/40',
        isOverlay && positionClasses,
        !isOverlay && 'h-full',
        isResizing && 'select-none',
        className
      )}
      style={{
        ...sizeStyle,
        ...(isOverlay ? {
          transform: getTransform(),
          opacity: getOpacity(),
          transition: getTransition(),
        } : {}),
      }}
      {...rest}
    >
      {/* ── Section 1: Header ── */}
      {title && (
        <div className="flex items-center gap-2 px-3 py-1 overflow-hidden shrink-0">
          {/* Left: back button + title */}
          <div className="flex flex-1 items-center gap-1 min-w-0">
            {hasBackBtn && (
              <Tooltip label="Go back" placement="bottom">
                <IconButton
                  icon={<O9Icon svg={arrowLeftSvg} />}
                  variant="secondary"
                  size="sm"
                  aria-label="Go back"
                  onClick={onBack}
                />
              </Tooltip>
            )}
            <h2 id={titleId} className="flex-1 text-base font-medium text-text truncate leading-8 min-w-0">
              {title}
            </h2>
          </div>

          {/* Right: switch + headerActions + overflow + close */}
          <div className="flex items-center gap-0.5 shrink-0">
            {headerSwitch && (
              <Switch
                size="sm"
                checked={headerSwitchChecked}
                onChange={onHeaderSwitchChange}
                aria-label={headerSwitchLabel}
              />
            )}
            {headerActions}
            {overflowMenu}
            <Tooltip label="Close" shortcut="Esc" placement="bottom">
              <IconButton
                icon={<O9Icon svg={closeSvg} />}
                variant="secondary"
                size="sm"
                aria-label="Close sidepanel"
                onClick={handleClose}
              />
            </Tooltip>
          </div>
        </div>
      )}

      {/* ── Content area (animated on back-button navigation) ── */}
      <div ref={contentRef} className="flex flex-col flex-1 min-h-0 overflow-hidden">
        {/* ── Section 2: Sticky Header ── */}
        {stickyHeader && (
          <div className="px-3 pt-2 shrink-0 overflow-hidden">
            {stickyHeader}
          </div>
        )}

        {/* ── Section 3: Body (scrollable) ── */}
        {children && (
          <div
            role="region"
            aria-label={title ? `${title} content` : 'Sidepanel content'}
            tabIndex={0}
            className={cn(
              'flex-1 overflow-y-auto overflow-x-hidden min-h-0 pt-2 pb-4',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-interactive-border/50',
              bodyVariant === 'edge' ? 'w-full' : 'px-3'
            )}
          >
            {children}
          </div>
        )}

        {/* ── Section 4: Footer ── */}
        {hasFooter && (
          <div className="flex items-center gap-[6px] px-3 pt-2 pb-4 shrink-0 overflow-hidden">
            {customFooter || (
              <>
                {secondaryLabel && (
                  <Button
                    variant="outline"
                    size="md"
                    onClick={handleSecondary}
                    className="flex-1"
                  >
                    {secondaryLabel}
                  </Button>
                )}
                {primaryLabel && (
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handlePrimary}
                    className="flex-1"
                  >
                    {primaryLabel}
                  </Button>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* ── Resize handle ── */}
      {resizable && (
        <div
          style={resizeHandleStyle}
          onMouseDown={handleResizeStart}
          role="separator"
          aria-orientation={isHorizontal ? 'vertical' : 'horizontal'}
          aria-label="Resize sidepanel"
          tabIndex={0}
          className="hover:bg-interactive-border/30 transition-colors duration-100"
        />
      )}
    </div>
  );

  /* ── Overlay mode: portal with backdrop ── */
  if (isOverlay) {
    return createPortal(
      <div className={cn('fixed inset-0 z-50', overlay === 'transparent' && 'pointer-events-none')}>
        {/* Backdrop (dim / blur only) */}
        {overlay !== 'transparent' && (
          <div
            className={cn('absolute inset-0', OVERLAY_MAP[overlay])}
            style={{
              opacity: phase === 'mount' ? 0 : phase === 'exiting' ? 0 : 1,
              transition: phase === 'mount' ? 'none' : `opacity var(--o9ds-motion-duration-normal) var(--o9ds-motion-ease-in-out)`,
            }}
            onClick={handleClose}
            aria-hidden="true"
          />
        )}
        {/* Panel — re-enable pointer events for transparent so the panel itself is interactive */}
        <div className={cn(overlay === 'transparent' && 'pointer-events-auto')}>
          {panelContent}
        </div>
      </div>,
      document.body
    );
  }

  /* ── Layout mode: inline render ── */
  return panelContent;
});

export default Sidepanel;
