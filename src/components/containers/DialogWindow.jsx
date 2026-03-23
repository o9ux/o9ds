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
import expandSvg from '@/assets/icons/o9con-expand.svg?raw';
import compressSvg from '@/assets/icons/o9con-compress.svg?raw';
import dragHandleSvg from '@/assets/icons/o9con-drag-handle.svg?raw';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DIALOG WINDOW COMPONENT
   Figma: 🟡 o9ds-dialog-window [BETA 2.0]

   A centered dialog window with four-section layout:

   1. Header  — back button, title, header actions (Switch,
                IconButton, DropdownButton overflow menu),
                expand/compress, close.
                Draggable from anywhere in the header bar
                except interactive controls.
   2. Sticky Header — non-scrolling content area
   3. Body    — scrollable content (space or edge variant)
   4. Footer  — CTA buttons (tertiary, secondary, primary)

   Two types:
   - "modal"     — overlay backdrop, focus trap, body scroll lock
   - "non-modal" — no overlay, page remains interactive

   Overlay variants (modal only):
   - "dim"         — semi-transparent dark overlay (default)
   - "blur"        — blurred overlay with transparency
   - "transparent" — fully transparent overlay (click-to-dismiss only)

   Responsive size presets:
   - height: sm (52vh), md (70vh), lg (84vh), xl (96vh)
   - width:  sm (440px), md (720px), lg (960px), xl (1440px)

   Accessibility:
   - role="dialog" with aria-modal, aria-labelledby
   - Focus trap for modal type
   - Escape key closes dialog
   - Body scroll lock for modal type
   - Tooltips on all header icon buttons
   - Respects prefers-reduced-motion
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* ── Size mappings ── */
const HEIGHT_MAP = {
  sm: '52vh',
  md: '70vh',
  lg: '84vh',
  xl: '96vh',
};

const WIDTH_MAP = {
  sm: '440px',
  md: '720px',
  lg: '960px',
  xl: '1440px',
};

/* ── Resize constraints (px) ── */
const MIN_WIDTH = 320;
const MIN_HEIGHT = 200;
const MAX_VW_RATIO = 0.96;
const MAX_VH_RATIO = 0.96;
const RESIZE_EDGE = 6; // px — invisible resize zone width

/* ── Resize handle definitions ── */
const RESIZE_HANDLES = [
  { key: 'top',          cursor: 'ns-resize',   style: { top: 0, left: RESIZE_EDGE, right: RESIZE_EDGE, height: RESIZE_EDGE } },
  { key: 'bottom',       cursor: 'ns-resize',   style: { bottom: 0, left: RESIZE_EDGE, right: RESIZE_EDGE, height: RESIZE_EDGE } },
  { key: 'left',         cursor: 'ew-resize',   style: { left: 0, top: RESIZE_EDGE, bottom: RESIZE_EDGE, width: RESIZE_EDGE } },
  { key: 'right',        cursor: 'ew-resize',   style: { right: 0, top: RESIZE_EDGE, bottom: RESIZE_EDGE, width: RESIZE_EDGE } },
  { key: 'top-left',     cursor: 'nwse-resize', style: { top: 0, left: 0, width: RESIZE_EDGE * 2, height: RESIZE_EDGE * 2 } },
  { key: 'top-right',    cursor: 'nesw-resize', style: { top: 0, right: 0, width: RESIZE_EDGE * 2, height: RESIZE_EDGE * 2 } },
  { key: 'bottom-left',  cursor: 'nesw-resize', style: { bottom: 0, left: 0, width: RESIZE_EDGE * 2, height: RESIZE_EDGE * 2 } },
  { key: 'bottom-right', cursor: 'nwse-resize', style: { bottom: 0, right: 0, width: RESIZE_EDGE * 2, height: RESIZE_EDGE * 2 } },
];

/* ── Sticky snap margin from viewport edge (px) ── */
const SNAP_MARGIN = 16;

/* ── Animation duration (matches --o9ds-motion-duration-short) ── */
const ANIM_DURATION_MS = 200;

/**
 * DialogWindow — a centered dialog with overlay and structured layout.
 *
 * @param {boolean}       open              — controlled open state (required)
 * @param {function}      onClose           — callback to close the dialog (required)
 * @param {'modal'|'non-modal'} type        — dialog type (default "modal")
 * @param {'dim'|'blur'|'transparent'} overlay — overlay variant for modal type (default "dim")
 *
 * — Size —
 * @param {'sm'|'md'|'lg'|'xl'} height     — dialog height preset (default "md")
 * @param {'sm'|'md'|'lg'|'xl'} width      — dialog width preset (default "md")
 *
 * — Header (Section 1) —
 * @param {string}        title             — dialog title
 * @param {boolean}       hasBackBtn        — show back arrow button
 * @param {function}      onBack            — back button callback
 * @param {ReactNode}     headerActions     — action elements between title and window controls
 * @param {boolean}       headerSwitch      — show an optional Switch toggle in the header
 * @param {boolean}       headerSwitchChecked — controlled checked state for the header Switch
 * @param {function}      onHeaderSwitchChange — callback when header Switch value changes
 * @param {string}        headerSwitchLabel — aria-label for the header Switch (default "Toggle")
 * @param {ReactNode}     overflowMenu      — overflow DropdownButton for additional header actions
 * @param {boolean}       draggable         — enable drag from header bar to reposition
 * @param {boolean}       sticky            — snap to nearest corner/edge when drag ends (requires draggable)
 * @param {boolean}       showDragHandle    — show a drag handle icon button in the header
 * @param {boolean}       resizable         — allow resizing from edges/corners (non-modal only)
 * @param {boolean}       expandable        — show expand/compress toggle
 *
 * — Sticky Header (Section 2) —
 * @param {ReactNode}     stickyHeader      — non-scrolling content below header
 *
 * — Body (Section 3) —
 * @param {'space'|'edge'} variant          — body padding variant (default "space")
 * @param {ReactNode}     children          — body content
 *
 * — Footer (Section 4) —
 * @param {string}        primaryLabel      — primary CTA label
 * @param {function}      onPrimaryClick    — primary CTA handler (dialog closes after callback)
 * @param {string}        secondaryLabel    — secondary CTA label
 * @param {function}      onSecondaryClick  — secondary CTA handler (dialog closes after callback)
 * @param {string}        tertiaryIcon      — tertiary icon SVG (raw string), renders an icon button
 * @param {string}        tertiaryText      — tertiary text label, renders a text button (alternative to tertiaryIcon)
 * @param {function}      onTertiaryClick   — tertiary button click handler
 * @param {string}        tertiaryLabel     — aria-label/tooltip for the tertiary icon button
 * @param {ReactNode}     footer            — custom footer content (overrides individual footer props)
 *
 * @param {string}        className         — additional CSS for the dialog panel
 */
const DialogWindow = forwardRef(function DialogWindow(
  {
    open = false,
    onClose,
    type = 'modal',
    overlay = 'dim',

    /* Size */
    height = 'md',
    width = 'md',

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
    draggable = false,
    sticky = false,
    showDragHandle = false,
    resizable = false,
    expandable = false,

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
    tertiaryText,
    onTertiaryClick,
    tertiaryLabel = 'Additional action',
    footer: customFooter,

    /* Layout */
    className,
    ...rest
  },
  ref
) {
  /* ── State ── */
  const [isExpanded, setIsExpanded] = useState(false);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [resizeSize, setResizeSize] = useState(null); // { width, height } | null
  const [isResizing, setIsResizing] = useState(false);

  /* ── Refs ── */
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const headerRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0, startX: 0, startY: 0 });
  const resizeStartRef = useRef(null);
  const prevOpenRef = useRef(false);

  /* Resizable only for non-modal type */
  const isResizable = resizable && type === 'non-modal' && !isExpanded;

  /* ── Stable IDs for ARIA ── */
  const dialogId = useRef(`dialog-${Math.random().toString(36).slice(2, 8)}`).current;
  const titleId = `${dialogId}-title`;

  const hasFooter = !!(primaryLabel || secondaryLabel || tertiaryIcon || tertiaryText || customFooter);

  /* ── Slide animation for back-button navigation ── */
  const contentRef = useRef(null);
  const prevHasBackRef = useRef(hasBackBtn);
  const slideRafRef = useRef(null);
  const slideTimerRef = useRef(null);

  const runSlideAnimation = useCallback((direction) => {
    const el = contentRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (slideRafRef.current) cancelAnimationFrame(slideRafRef.current);
    if (slideTimerRef.current) clearTimeout(slideTimerRef.current);

    const startX = direction === 'forward' ? '40%' : '-40%';
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
    }, ANIM_DURATION_MS + 50);
  }, []);

  useEffect(() => {
    if (!open) {
      prevHasBackRef.current = hasBackBtn;
      return;
    }
    if (prevHasBackRef.current !== hasBackBtn) {
      const direction = hasBackBtn ? 'forward' : 'backward';
      prevHasBackRef.current = hasBackBtn;
      runSlideAnimation(direction);
    }
  }, [hasBackBtn, open, runSlideAnimation]);

  useEffect(() => {
    if (!open) prevHasBackRef.current = false;
  }, [open]);

  /* ── Body scroll lock (modal only) ── */
  useEffect(() => {
    if (open && type === 'modal') {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, type]);

  /* ── Focus management ──
     Focus the dialog panel on open — NOT the close button,
     to avoid triggering its Tooltip on initial open.
     The close button is the first Tab stop via focus trap.
  ── */
  useEffect(() => {
    if (open && !prevOpenRef.current) {
      requestAnimationFrame(() => {
        dialogRef.current?.focus();
      });
    }
    prevOpenRef.current = open;
  }, [open]);

  /* ── Focus trap (modal only) ── */
  useEffect(() => {
    if (!open || type !== 'modal') return;

    const handler = (e) => {
      if (e.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, type]);

  /* ── Escape to close ── */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  /* ── Click outside for non-modal ── */
  useEffect(() => {
    if (!open || type !== 'non-modal') return;
    const handler = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, type, onClose]);

  /* ── Header-bar drag logic ──
     Dragging is initiated from any point on the header bar
     EXCEPT interactive elements (buttons, inputs, switches,
     labels with inputs, elements with role="switch", etc.)
     This lets action buttons, overflow menus, and switches
     work normally while the header bar itself is the drag handle.
  ── */
  const isInteractiveTarget = useCallback((target) => {
    if (!headerRef.current) return false;
    // Walk up from target to header — if we hit any interactive element, it's not a drag
    let el = target;
    while (el && el !== headerRef.current) {
      const tag = el.tagName?.toLowerCase();
      if (
        tag === 'button' ||
        tag === 'input' ||
        tag === 'select' ||
        tag === 'textarea' ||
        tag === 'a' ||
        tag === 'label' ||
        el.getAttribute('role') === 'switch' ||
        el.getAttribute('role') === 'menuitem' ||
        el.getAttribute('role') === 'menu' ||
        el.hasAttribute('data-no-drag')
      ) {
        return true;
      }
      el = el.parentElement;
    }
    return false;
  }, []);

  const handleHeaderMouseDown = useCallback((e) => {
    if (!draggable) return;
    if (isInteractiveTarget(e.target)) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startX: dragPos.x,
      startY: dragPos.y,
    };
  }, [draggable, dragPos, isInteractiveTarget]);

  /* ── Snap to nearest corner/edge ── */
  const snapToNearestCorner = useCallback(() => {
    if (!dialogRef.current) return;
    const rect = dialogRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Center of the dialog
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // Target position: nearest corner with SNAP_MARGIN gap
    const targetLeft = cx < vw / 2 ? SNAP_MARGIN : vw - rect.width - SNAP_MARGIN;
    const targetTop = cy < vh / 2 ? SNAP_MARGIN : vh - rect.height - SNAP_MARGIN;

    // Current center position without drag (the dialog's natural center)
    const naturalLeft = (vw - rect.width) / 2;
    const naturalTop = (vh - rect.height) / 2;

    // New dragPos to reach target
    const newX = targetLeft - naturalLeft;
    const newY = targetTop - naturalTop;

    setIsSnapping(true);
    setDragPos({ x: newX, y: newY });

    // Clear snapping state after transition
    setTimeout(() => setIsSnapping(false), ANIM_DURATION_MS + 50);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e) => {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setDragPos({
        x: dragStartRef.current.startX + dx,
        y: dragStartRef.current.startY + dy,
      });
    };

    const handleUp = () => {
      setIsDragging(false);
      if (sticky) {
        // Defer snap so the final drag position is applied first
        requestAnimationFrame(() => snapToNearestCorner());
      }
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };
  }, [isDragging, sticky, snapToNearestCorner]);

  /* ── Resize logic (non-modal only) ──
     Resizing is initiated from invisible edge/corner zones around
     the dialog panel. Each zone has its own cursor and adjusts
     width/height (and drag position for left/top edges) on mousemove.
  ── */
  const handleResizeMouseDown = useCallback((handle, e) => {
    if (!isResizable || !dialogRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    const rect = dialogRef.current.getBoundingClientRect();
    setIsResizing(true);
    resizeStartRef.current = {
      handle,
      mouseX: e.clientX,
      mouseY: e.clientY,
      width: rect.width,
      height: rect.height,
      dragX: dragPos.x,
      dragY: dragPos.y,
    };
  }, [isResizable, dragPos]);

  useEffect(() => {
    if (!isResizing || !resizeStartRef.current) return;

    const maxW = window.innerWidth * MAX_VW_RATIO;
    const maxH = window.innerHeight * MAX_VH_RATIO;

    const handleMove = (e) => {
      const s = resizeStartRef.current;
      const dx = e.clientX - s.mouseX;
      const dy = e.clientY - s.mouseY;
      const h = s.handle;

      let newW = s.width;
      let newH = s.height;
      let newDragX = s.dragX;
      let newDragY = s.dragY;

      /* Horizontal */
      if (h.includes('right')) {
        newW = s.width + dx;
      } else if (h.includes('left')) {
        newW = s.width - dx;
        newDragX = s.dragX + dx;
      }

      /* Vertical */
      if (h.includes('bottom')) {
        newH = s.height + dy;
      } else if (h.includes('top')) {
        newH = s.height - dy;
        newDragY = s.dragY + dy;
      }

      /* Clamp */
      if (newW < MIN_WIDTH) { newDragX = s.dragX + (s.width - MIN_WIDTH) * (h.includes('left') ? 1 : 0); newW = MIN_WIDTH; }
      if (newH < MIN_HEIGHT) { newDragY = s.dragY + (s.height - MIN_HEIGHT) * (h.includes('top') ? 1 : 0); newH = MIN_HEIGHT; }
      if (newW > maxW) { newW = maxW; }
      if (newH > maxH) { newH = maxH; }

      setResizeSize({ width: newW, height: newH });
      setDragPos({ x: newDragX, y: newDragY });
    };

    const handleUp = () => setIsResizing(false);

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };
  }, [isResizing]);

  /* ── Reset state when dialog closes ── */
  useEffect(() => {
    if (!open) {
      setIsExpanded(false);
      setDragPos({ x: 0, y: 0 });
      setIsDragging(false);
      setIsSnapping(false);
      setResizeSize(null);
      setIsResizing(false);
    }
  }, [open]);

  /* ── Cleanup on unmount ── */
  useEffect(() => {
    return () => {
      if (slideRafRef.current) cancelAnimationFrame(slideRafRef.current);
      if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
    };
  }, []);

  /* ── Handle footer actions ── */
  const handlePrimary = () => {
    onPrimaryClick?.();
    onClose?.();
  };

  const handleSecondary = () => {
    onSecondaryClick?.();
    onClose?.();
  };

  if (!open) return null;

  /* ── Compute dimensions ── */
  const panelHeight = isExpanded ? '96vh' : resizeSize ? `${resizeSize.height}px` : (HEIGHT_MAP[height] || HEIGHT_MAP.md);
  const panelWidth = isExpanded ? '96vw' : resizeSize ? `${resizeSize.width}px` : (WIDTH_MAP[width] || WIDTH_MAP.md);

  const dialogContent = (
    <div
      className={cn(
        'fixed inset-0 z-50',
        type === 'modal' ? 'flex items-center justify-center' : 'flex items-center justify-center pointer-events-none'
      )}
    >
      {/* ── Backdrop (modal only) ── */}
      {type === 'modal' && (
        <div
          className={cn(
            'absolute inset-0',
            overlay === 'blur'
              ? 'bg-backdrop/40 backdrop-blur-md'
              : overlay === 'transparent'
                ? 'bg-transparent'
                : 'bg-backdrop'
          )}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* ── Dialog Panel ── */}
      <div
        ref={(node) => {
          dialogRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        role="dialog"
        aria-modal={type === 'modal' ? 'true' : 'false'}
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className={cn(
          'relative z-10 flex flex-col outline-none',
          'bg-surface-popover shadow-[0px_10px_30px_0px_rgba(16,16,16,0.24)]',
          'border border-border/40',
          'overflow-hidden pointer-events-auto',
          (isDragging || isResizing) && 'select-none',
          className
        )}
        style={{
          height: panelHeight,
          width: panelWidth,
          maxWidth: '96vw',
          maxHeight: '96vh',
          transform: `translate(${dragPos.x}px, ${dragPos.y}px)`,
          transition: (isDragging || isResizing)
            ? 'none'
            : isSnapping
              ? 'transform var(--o9ds-motion-duration-short) var(--o9ds-motion-ease-out), width var(--o9ds-motion-duration-short) var(--o9ds-motion-ease-out), height var(--o9ds-motion-duration-short) var(--o9ds-motion-ease-out)'
              : 'width var(--o9ds-motion-duration-short) var(--o9ds-motion-ease-out), height var(--o9ds-motion-duration-short) var(--o9ds-motion-ease-out)',
        }}
        {...rest}
      >
        {/* ── Resize handles (non-modal only) ── */}
        {isResizable && RESIZE_HANDLES.map((h) => (
          <div
            key={h.key}
            aria-hidden="true"
            style={{ ...h.style, position: 'absolute', zIndex: 20, cursor: h.cursor }}
            onMouseDown={(e) => handleResizeMouseDown(h.key, e)}
          />
        ))}

        {/* ── Section 1: Header ──
            When draggable, the entire header bar is the drag surface.
            Interactive elements (buttons, switches, menus) are excluded
            from drag initiation via isInteractiveTarget().
        ── */}
        {title && (
          <div
            ref={headerRef}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 shrink-0 border-b border-border/30',
              draggable && !isDragging && 'cursor-grab',
              isDragging && 'cursor-grabbing'
            )}
            onMouseDown={handleHeaderMouseDown}
          >
            {/* Left: back button + title */}
            <div className="flex flex-1 items-center gap-1.5 min-w-0">
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
              <h2 id={titleId} className="flex-1 text-sm font-semibold text-text truncate leading-6 min-w-0">
                {title}
              </h2>
            </div>

            {/* Right: header actions + overflow menu + window controls */}
            <div className="flex items-center gap-0.5 shrink-0">
              {headerActions}

              {/* Optional Switch toggle */}
              {headerSwitch && (
                <Switch
                  size="sm"
                  checked={headerSwitchChecked}
                  onChange={onHeaderSwitchChange}
                  aria-label={headerSwitchLabel}
                  data-no-drag
                />
              )}

              {/* Overflow menu (DropdownButton) */}
              {overflowMenu}

              {/* Drag handle (optional) — directly initiates dragging */}
              {showDragHandle && draggable && (
                <Tooltip label="Drag to reposition" placement="bottom">
                  <IconButton
                    icon={<O9Icon svg={dragHandleSvg} />}
                    variant="secondary"
                    size="sm"
                    aria-label="Drag to reposition"
                    className="cursor-grab active:cursor-grabbing"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDragging(true);
                      dragStartRef.current = {
                        x: e.clientX,
                        y: e.clientY,
                        startX: dragPos.x,
                        startY: dragPos.y,
                      };
                    }}
                  />
                </Tooltip>
              )}

              {/* Expand/compress */}
              {expandable && (
                <Tooltip label={isExpanded ? 'Restore' : 'Expand'} placement="bottom">
                  <IconButton
                    icon={<O9Icon svg={isExpanded ? compressSvg : expandSvg} />}
                    variant="secondary"
                    size="sm"
                    aria-label={isExpanded ? 'Restore window size' : 'Expand window'}
                    onClick={() => {
                      setIsExpanded((v) => !v);
                      if (!isExpanded) {
                        setDragPos({ x: 0, y: 0 });
                        setResizeSize(null);
                      }
                    }}
                  />
                </Tooltip>
              )}

              {/* Close */}
              <Tooltip label="Close" shortcut="Esc" placement="bottom">
                <IconButton
                  ref={closeBtnRef}
                  icon={<O9Icon svg={closeSvg} />}
                  variant="secondary"
                  size="sm"
                  aria-label="Close dialog"
                  onClick={onClose}
                />
              </Tooltip>
            </div>
          </div>
        )}

        {/* ── Content area (animated on back-button navigation) ── */}
        <div ref={contentRef} className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {/* ── Section 2: Sticky Header ── */}
          {stickyHeader && (
            <div className="px-4 pt-3 shrink-0 overflow-hidden">
              {stickyHeader}
            </div>
          )}

          {/* ── Section 3: Body ──
              - "space" variant: padded content area (default)
              - "edge" variant: full-width, no horizontal padding
              Vertical scroll ONLY when content overflows.
          ── */}
          {children && (
            <div
              role="region"
              aria-label={title ? `${title} content` : 'Dialog content'}
              tabIndex={0}
              className={cn(
                'flex-1 overflow-y-auto overflow-x-hidden min-h-0 pt-3 pb-4',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-interactive-border/50',
                variant === 'edge' ? 'w-full' : 'px-4'
              )}
            >
              {children}
            </div>
          )}

          {/* ── Section 4: Footer ──
              Left:  tertiary icon button OR text button
              Right: secondary + primary CTA buttons
          ── */}
          {hasFooter && (
            <div className="flex items-center gap-2 px-4 py-3 shrink-0 border-t border-border/30">
              {customFooter || (
                <>
                  {/* Left-aligned tertiary action */}
                  <div className="flex items-center gap-2 mr-auto">
                    {tertiaryIcon && (
                      <Tooltip label={tertiaryLabel} placement="top">
                        <IconButton
                          icon={<O9Icon svg={tertiaryIcon} />}
                          variant="secondary"
                          size="md"
                          aria-label={tertiaryLabel}
                          onClick={onTertiaryClick}
                        />
                      </Tooltip>
                    )}
                    {tertiaryText && !tertiaryIcon && (
                      <Button
                        variant="secondary"
                        size="md"
                        onClick={onTertiaryClick}
                      >
                        {tertiaryText}
                      </Button>
                    )}
                  </div>

                  {/* Right-aligned primary/secondary actions */}
                  <div className="flex items-center gap-2">
                    {secondaryLabel && (
                      <Button
                        variant="outline"
                        size="md"
                        onClick={handleSecondary}
                        className="min-w-[112px]"
                      >
                        {secondaryLabel}
                      </Button>
                    )}
                    {primaryLabel && (
                      <Button
                        variant="primary"
                        size="md"
                        onClick={handlePrimary}
                        className="min-w-[112px]"
                      >
                        {primaryLabel}
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(dialogContent, document.body);
});

export default DialogWindow;
