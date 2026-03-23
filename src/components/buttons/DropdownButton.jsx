import { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';
import Tooltip from '@/components/containers/Tooltip';
import { DropdownPortalContext } from '@/components/containers/DropdownList';
import angleDownSvg from '@/assets/icons/o9con-angle-down.svg?raw';
import angleUpSvg from '@/assets/icons/o9con-angle-up.svg?raw';

/* ─────────────────────────────────────────────
   Helpers for keyboard navigation
   ───────────────────────────────────────────── */

/** All visible menu items across every portalled panel for this dropdown */
function getMenuItems(dropdownId) {
  if (!dropdownId) return [];
  return Array.from(
    document.querySelectorAll(
      `[data-dropdown-id="${dropdownId}"] [role="menuitem"]:not([disabled])`
    )
  );
}

/**
 * Items scoped to the SAME [role="menu"] panel as `el`.
 * Because submenus are portalled, querySelectorAll on a
 * menu panel only returns its own direct items — not items
 * inside other portalled sub-panels.  We still filter by
 * closest [role="menu"] to be safe against non-portalled nesting.
 */
function getItemsInMenu(el) {
  const menu = el?.closest('[role="menu"]');
  if (!menu) return [];
  const all = Array.from(
    menu.querySelectorAll('[role="menuitem"]:not([disabled])')
  );
  return all.filter((item) => item.closest('[role="menu"]') === menu);
}

/* ─────────────────────────────────────────────
   Shortcut key matching
   ───────────────────────────────────────────── */

/**
 * Parse a display shortcut string into modifier+key object.
 *   "⌘C"   → { meta: true, shift: false, ctrl: false, alt: false, key: 'c' }
 *   "⌘⇧E"  → { meta: true, shift: true,  ctrl: false, alt: false, key: 'e' }
 */
function parseShortcut(s) {
  if (!s) return null;
  let meta = false, ctrl = false, shift = false, alt = false;
  let key = '';
  for (const ch of s) {
    switch (ch) {
      case '⌘': meta = true; break;
      case '⇧': shift = true; break;
      case '⌃': ctrl = true; break;
      case '⌥': alt = true; break;
      default:   key = ch.toLowerCase();
    }
  }
  if (!key) return null;
  return { meta, ctrl, shift, alt, key };
}

/**
 * Check if a KeyboardEvent matches a display shortcut string.
 * ⌘ matches both metaKey (Mac) and ctrlKey (Windows/Linux).
 */
function matchesShortcut(shortcutStr, event) {
  const parsed = parseShortcut(shortcutStr);
  if (!parsed) return false;
  const eventKey = event.key.toLowerCase();
  if (eventKey !== parsed.key) return false;

  /* ⌘ matches Meta OR Ctrl for cross-platform support */
  const needsCmdOrCtrl = parsed.meta || parsed.ctrl;
  const hasCmdOrCtrl = event.metaKey || event.ctrlKey;
  if (needsCmdOrCtrl && !hasCmdOrCtrl) return false;
  if (!needsCmdOrCtrl && hasCmdOrCtrl) return false;

  if (parsed.shift !== event.shiftKey) return false;
  if (parsed.alt !== event.altKey) return false;

  return true;
}

/* ─────────────────────────────────────────────
   Variant styles — mirrors Button.jsx
   ───────────────────────────────────────────── */
const variantStyles = {
  primary:
    'bg-interactive text-on-interactive border border-interactive hover:bg-interactive-hover active:bg-interactive-active focus-visible:ring-1 focus-visible:ring-interactive-border focus-visible:ring-offset-1 focus-visible:ring-offset-surface',
  secondary:
    'bg-surface-raised text-text border border-transparent hover:bg-interactive-muted active:bg-interactive-muted-hover focus-visible:ring-1 focus-visible:ring-interactive-border/50',
  outline:
    'bg-transparent text-text border border-border-strong hover:border-interactive-border hover:bg-interactive-subtle active:bg-interactive-muted focus-visible:ring-1 focus-visible:ring-interactive-border/50',
  ghost:
    'bg-transparent text-text border border-transparent hover:bg-interactive-subtle active:bg-interactive-muted focus-visible:ring-1 focus-visible:ring-interactive-border/50',
  danger:
    'bg-danger text-white-static border border-danger hover:bg-danger-hover hover:border-danger-hover active:bg-danger-active focus-visible:ring-1 focus-visible:ring-danger focus-visible:ring-offset-1 focus-visible:ring-offset-surface',
};

/* ─────────────────────────────────────────────
   Size styles
   xm  20px  |  sm  24px  |  md  32px  |  lg  36px
   ───────────────────────────────────────────── */
const sizeStyles = {
  xm: 'h-5 text-2xs',
  sm: 'h-6 text-xs',
  md: 'h-8 text-sm',
  lg: 'h-9 text-base',
};

/* Label-zone horizontal padding */
const labelPadding = {
  xm: 'pl-1.5 gap-1',
  sm: 'pl-2 gap-1',
  md: 'pl-3 gap-1.5',
  lg: 'pl-3.5 gap-1.5',
};

/* Arrow-zone horizontal padding — balanced with label-zone left padding */
const arrowPadding = {
  xm: 'px-1',
  sm: 'px-1.5',
  md: 'px-2',
  lg: 'px-2.5',
};

/* Leading-icon sizes — o9con token sizes per tier */
const iconSizeStyles = {
  xm: '[&>*]:w-[var(--o9con-14)] [&>*]:h-[var(--o9con-14)]',
  sm: '[&>*]:w-[var(--o9con-16)] [&>*]:h-[var(--o9con-16)]',
  md: '[&>*]:w-[var(--o9con-20)] [&>*]:h-[var(--o9con-20)]',
  lg: '[&>*]:w-[var(--o9con-24)] [&>*]:h-[var(--o9con-24)]',
};

/* Arrow icon sizes — match or step down from leading icon */
const arrowIconSize = {
  xm: '[&>*]:w-[var(--o9con-14)] [&>*]:h-[var(--o9con-14)]',
  sm: '[&>*]:w-[var(--o9con-14)] [&>*]:h-[var(--o9con-14)]',
  md: '[&>*]:w-[var(--o9con-16)] [&>*]:h-[var(--o9con-16)]',
  lg: '[&>*]:w-[var(--o9con-20)] [&>*]:h-[var(--o9con-20)]',
};

/* Icon-only mode — left padding for the icon zone (no label, no gap) */
const iconOnlyPadding = {
  xm: 'pl-1',
  sm: 'pl-1.5',
  md: 'pl-2',
  lg: 'pl-2.5',
};

/**
 * DropdownButton — button with an integrated dropdown arrow zone
 * that reveals a menu when clicked.
 *
 * The dropdown panel is portalled to document.body so it is never
 * clipped by ancestor overflow containers.
 *
 * Layout:
 * ┌──────────────────────────────────────────────┐
 * │  [Icon]  [Label]            [▼/▲]   [•]      │
 * └──────────────────────────────────────────────┘
 *  Indicator dot is positioned at the top-right corner overlay.
 *
 * Icon-only mode (when leadingIcon is provided but no children):
 * ┌──────────────┐
 * │  [Icon] [▼/▲]│
 * └──────────────┘
 *  Pass an aria-label for accessibility when using icon-only mode.
 *
 * @param {'primary'|'secondary'|'outline'|'danger'} props.variant
 * @param {'xm'|'sm'|'md'|'lg'} props.size
 * @param {ReactNode}  props.leadingIcon  — O9Icon element
 * @param {boolean}    props.indicator    — show notification/unsaved dot
 * @param {boolean}    props.disabled
 * @param {boolean}    props.open         — controlled open state
 * @param {function}   props.onOpenChange
 * @param {ReactNode}  props.menu         — composable <DropdownList> content
 * @param {Array}      props.menuItems    — legacy flat array (backward compat)
 * @param {string}     props.className
 * @param {ReactNode}  props.children     — button label
 */
const DropdownButton = forwardRef(function DropdownButton(
  {
    variant = 'primary',
    size = 'md',
    leadingIcon,
    tooltip,
    tooltipPlacement = 'top',
    indicator = false,
    disabled = false,
    open: controlledOpen,
    onOpenChange,
    menu,
    menuItems = [],
    className,
    children,
    ...rest
  },
  ref
) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const containerRef = useRef(null);
  const menuRef = useRef(null);

  /* Stable unique ID for linking portalled panels */
  const dropdownId = useRef(
    `dd-${Math.random().toString(36).slice(2, 8)}`
  ).current;

  /* Position state for the portalled dropdown panel */
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, minWidth: 0 });

  const setOpen = (val) => {
    if (!isControlled) setInternalOpen(val);
    onOpenChange?.(val);
  };

  /* ── Track dropdown panel position relative to button ── */
  useEffect(() => {
    if (!isOpen) return;
    const updatePosition = () => {
      const btn = containerRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + 4,
        left: rect.left,
        minWidth: rect.width,
      });
    };
    updatePosition();
    /* Listen on capture phase for nested scroll containers */
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  /* ── Close on outside click ──
     Checks if the click target is inside ANY element with this
     dropdown's data-dropdown-id — covers the button, main panel,
     and all portalled submenus. */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.target.closest(`[data-dropdown-id="${dropdownId}"]`)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, dropdownId]);

  /* ── Keyboard navigation ──
     ArrowDown / ArrowUp  — move focus within the current menu level
     ArrowRight           — open submenu and focus its first item
     ArrowLeft            — close submenu, return focus to parent trigger
     Enter / Space        — activate the focused item
     Escape               — close the entire dropdown
     Home / End           — jump to first/last item in current level

     Key design decisions for portal-based menus:
     ─ Up/Down are SCOPED to the [role="menu"] panel the focused
       item belongs to, so navigation stays within one level.
     ─ Each Item stores its onMouseEnter callback on the DOM element
       as `_onMenuItemEnter`. The keyboard handler calls it directly
       when focus moves, so React state updates exactly as it would
       on hover (opening/closing submenus automatically).
     ─ ArrowRight uses `data-submenu-trigger` / `data-submenu-id` on
       the trigger and `data-submenu-parent` on the portalled panel
       to locate the correct submenu after it renders.
     ─ ArrowLeft reads `data-submenu-parent` from the panel the
       focused item is in, then finds the matching trigger.
  */
  const focusedIndexRef = useRef(-1);

  /** Focus a menu item and sync the global focusedIndexRef */
  const focusItem = useCallback(
    (el) => {
      if (!el) return;
      el.focus();
      const allItems = getMenuItems(dropdownId);
      focusedIndexRef.current = allItems.indexOf(el);
    },
    [dropdownId]
  );

  /* Focus first item when dropdown opens */
  useEffect(() => {
    if (!isOpen) {
      focusedIndexRef.current = -1;
      return;
    }
    /* Small delay to let the DOM render the portalled menu */
    const timer = setTimeout(() => {
      const items = getMenuItems(dropdownId);
      if (items[0]) focusItem(items[0]);
    }, 30);
    return () => clearTimeout(timer);
  }, [isOpen, focusItem, dropdownId]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      const focused = document.activeElement;
      /* Only handle when focus is inside our dropdown panels */
      if (!focused?.closest(`[data-dropdown-id="${dropdownId}"]`)) {
        if (e.key === 'Escape') { e.preventDefault(); setOpen(false); }
        return;
      }

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          setOpen(false);
          break;

        /* ── Up / Down — scoped to current menu level ── */
        case 'ArrowDown': {
          e.preventDefault();
          const scopedItems = getItemsInMenu(focused);
          const idx = scopedItems.indexOf(focused);
          const next = idx < scopedItems.length - 1 ? idx + 1 : 0;
          const target = scopedItems[next];
          if (target) {
            focusItem(target);
            target._onMenuItemEnter?.();
          }
          break;
        }

        case 'ArrowUp': {
          e.preventDefault();
          const scopedItems = getItemsInMenu(focused);
          const idx = scopedItems.indexOf(focused);
          const prev = idx > 0 ? idx - 1 : scopedItems.length - 1;
          const target = scopedItems[prev];
          if (target) {
            focusItem(target);
            target._onMenuItemEnter?.();
          }
          break;
        }

        /* ── Right — open submenu & focus its first item ── */
        case 'ArrowRight': {
          e.preventDefault();
          if (!focused.hasAttribute('data-submenu-trigger')) break;

          /* Call the stored onMouseEnter to open the submenu via React state */
          focused._onMenuItemEnter?.();

          /* Wait for the portalled submenu to render, then focus first child */
          const submenuId = focused.getAttribute('data-submenu-id');
          setTimeout(() => {
            const panel = document.querySelector(
              `[data-submenu-parent="${submenuId}"]`
            );
            if (panel) {
              const first = panel.querySelector(
                '[role="menuitem"]:not([disabled])'
              );
              if (first) focusItem(first);
            }
          }, 60);
          break;
        }

        /* ── Left — close submenu & return focus to trigger ── */
        case 'ArrowLeft': {
          e.preventDefault();
          /* Find the portalled submenu panel this item lives in */
          const panel = focused.closest('[data-submenu-panel]');
          if (!panel) break; /* already at root level — nothing to do */

          const parentId = panel.getAttribute('data-submenu-parent');
          const trigger = document.querySelector(
            `[data-submenu-id="${parentId}"]`
          );
          if (trigger) {
            focusItem(trigger);
            /* The trigger's _onMenuItemEnter keeps the parent level
               active — React state hasn't changed so the submenu will
               close on the NEXT navigation or hover away. */
          }
          break;
        }

        /* ── Home / End — scoped to current level ── */
        case 'Home': {
          e.preventDefault();
          const scopedItems = getItemsInMenu(focused);
          if (scopedItems[0]) {
            focusItem(scopedItems[0]);
            scopedItems[0]._onMenuItemEnter?.();
          }
          break;
        }
        case 'End': {
          e.preventDefault();
          const scopedItems = getItemsInMenu(focused);
          const last = scopedItems[scopedItems.length - 1];
          if (last) {
            focusItem(last);
            last._onMenuItemEnter?.();
          }
          break;
        }

        case 'Enter':
        case ' ':
          e.preventDefault();
          focused.click();
          break;

        /* ── Shortcut key matching ──
           When a modifier key combo is pressed (⌘+key, Ctrl+key, etc.),
           scan all visible menu items for a matching `data-shortcut`
           attribute and click the matched item. */
        default: {
          if (e.metaKey || e.ctrlKey) {
            const items = getMenuItems(dropdownId);
            for (const item of items) {
              const shortcut = item.getAttribute('data-shortcut');
              if (shortcut && matchesShortcut(shortcut, e)) {
                e.preventDefault();
                e.stopPropagation();
                item.click();
                return;
              }
            }
          }
          break;
        }
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, focusItem, dropdownId]);

  const hasMenu = menu || menuItems.length > 0;
  const isIconOnly = !children && !!leadingIcon;

  const dropdownContent = (
    <DropdownPortalContext.Provider value={dropdownId}>
      <div
        ref={containerRef}
        data-dropdown-id={dropdownId}
        className="relative inline-flex"
      >
        {/* ── Button ── */}
        <button
          ref={ref}
          type="button"
          id={`${dropdownId}-btn`}
          disabled={disabled}
          onClick={() => setOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-controls={isOpen ? `${dropdownId}-menu` : undefined}
          className={cn(
            'inline-flex items-center font-medium leading-none',
            'transition-colors duration-100',
            'focus-visible:outline-none',
            'disabled:opacity-35 disabled:pointer-events-none',
            'cursor-pointer select-none',
            variantStyles[variant],
            sizeStyles[size],
            className
          )}
          {...rest}
        >
          {/* ── Label zone (collapses to icon-only when no children) ── */}
          <span
            className={cn(
              'inline-flex items-center',
              isIconOnly
                ? iconOnlyPadding[size]
                : ['flex-1 min-w-0', labelPadding[size]]
            )}
          >
            {leadingIcon && (
              <span
                className={cn(
                  'shrink-0 flex items-center',
                  iconSizeStyles[size]
                )}
              >
                {leadingIcon}
              </span>
            )}
            {!isIconOnly && <span className="truncate">{children}</span>}
          </span>

          {/* ── Arrow zone ── */}
          <span
            className={cn(
              'shrink-0 flex items-center justify-center',
              arrowPadding[size],
              arrowIconSize[size]
            )}
            aria-hidden="true"
          >
            <O9Icon svg={isOpen ? angleUpSvg : angleDownSvg} />
          </span>
        </button>

        {/* ── Indicator dot — top-right corner overlay ── */}
        {indicator && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center pointer-events-none z-10" aria-hidden="true">
            <span className="h-2 w-2 rounded-circle bg-warning ring-2 ring-surface" />
          </span>
        )}
      </div>

      {/* ── Dropdown panel — portalled to body ──
          Uses position:fixed so it escapes all ancestor
          overflow containers (scroll, hidden, auto). */}
      {isOpen &&
        hasMenu &&
        createPortal(
          <div
            ref={menuRef}
            id={`${dropdownId}-menu`}
            data-dropdown-id={dropdownId}
            aria-labelledby={`${dropdownId}-btn`}
            style={{
              position: 'fixed',
              top: `${menuPos.top}px`,
              left: `${menuPos.left}px`,
              minWidth: `${menuPos.minWidth}px`,
              zIndex: 9999,
            }}
          >
            {menu || (
              /* Legacy menuItems fallback */
              <div className="bg-surface-raised border border-border py-1 min-w-full shadow-down">
                {menuItems.map((item, i) => (
                  <button
                    key={i}
                    role="menuitem"
                    className="w-full text-left px-3 py-2 text-sm text-text hover:bg-interactive-subtle transition-colors cursor-pointer disabled:opacity-35 disabled:pointer-events-none"
                    onClick={() => {
                      item.onClick?.();
                      setOpen(false);
                    }}
                    disabled={item.disabled}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>,
          document.body
        )}
    </DropdownPortalContext.Provider>
  );

  if (tooltip && isIconOnly) {
    return (
      <Tooltip label={tooltip} placement={tooltipPlacement}>
        {dropdownContent}
      </Tooltip>
    );
  }

  return dropdownContent;
});

export default DropdownButton;
