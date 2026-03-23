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
   (shared logic with DropdownButton)
   ───────────────────────────────────────────── */

function getMenuItems(dropdownId) {
  if (!dropdownId) return [];
  return Array.from(
    document.querySelectorAll(
      `[data-dropdown-id="${dropdownId}"] [role="menuitem"]:not([disabled])`
    )
  );
}

function getItemsInMenu(el) {
  const menu = el?.closest('[role="menu"]');
  if (!menu) return [];
  const all = Array.from(
    menu.querySelectorAll('[role="menuitem"]:not([disabled])')
  );
  return all.filter((item) => item.closest('[role="menu"]') === menu);
}

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

function matchesShortcut(shortcutStr, event) {
  const parsed = parseShortcut(shortcutStr);
  if (!parsed) return false;
  const eventKey = event.key.toLowerCase();
  if (eventKey !== parsed.key) return false;
  const needsCmdOrCtrl = parsed.meta || parsed.ctrl;
  const hasCmdOrCtrl = event.metaKey || event.ctrlKey;
  if (needsCmdOrCtrl && !hasCmdOrCtrl) return false;
  if (!needsCmdOrCtrl && hasCmdOrCtrl) return false;
  if (parsed.shift !== event.shiftKey) return false;
  if (parsed.alt !== event.altKey) return false;
  return true;
}

/* ─────────────────────────────────────────────
   Variant & size style maps
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

/* SplitButton sizes — matches Button size spec
   xm 20px | sm 24px | md 32px | lg 36px */
const sizeStyles = {
  xm: 'h-5 px-1.5 text-2xs gap-1',
  sm: 'h-6 px-2 text-xs gap-1',
  md: 'h-8 px-3 text-sm gap-1.5',
  lg: 'h-9 px-3.5 text-base gap-1.5',
};

const triggerSizeStyles = {
  xm: 'h-5 w-4',
  sm: 'h-6 w-5',
  md: 'h-8 w-6',
  lg: 'h-9 w-7',
};

/* Icon-only main button — square, same as trigger */
const iconOnlySizeStyles = {
  xm: 'h-5 w-5',
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-9 w-9',
};

const iconSizeStyles = {
  xm: '[&>*]:w-[var(--o9con-14)] [&>*]:h-[var(--o9con-14)]',
  sm: '[&>*]:w-[var(--o9con-16)] [&>*]:h-[var(--o9con-16)]',
  md: '[&>*]:w-[var(--o9con-20)] [&>*]:h-[var(--o9con-20)]',
  lg: '[&>*]:w-[var(--o9con-24)] [&>*]:h-[var(--o9con-24)]',
};

const arrowIconSize = {
  xm: '[&>*]:w-[var(--o9con-14)] [&>*]:h-[var(--o9con-14)]',
  sm: '[&>*]:w-[var(--o9con-14)] [&>*]:h-[var(--o9con-14)]',
  md: '[&>*]:w-[var(--o9con-16)] [&>*]:h-[var(--o9con-16)]',
  lg: '[&>*]:w-[var(--o9con-20)] [&>*]:h-[var(--o9con-20)]',
};

const dividerStyles = {
  primary: 'bg-divider-on-interactive',
  secondary: 'bg-interactive-muted-hover',
  outline: 'bg-border-strong',
  ghost: 'bg-border',
  danger: 'bg-white-static/20',
};

/**
 * SplitButton — a two-zone button that separates a primary
 * action from a dropdown of related secondary actions.
 *
 * Layout:
 * ┌────────────────────┬──────┐
 * │ [Icon] [Label]     │ [▼/▲]│
 * └────────────────────┴──────┘
 *
 * Icon-only mode (when leadingIcon is provided but no children):
 * ┌──────┬──────┐
 * │ [Ico]│ [▼/▲]│
 * └──────┴──────┘
 *
 * @param {'primary'|'secondary'|'outline'|'danger'} props.variant
 * @param {'xm'|'sm'|'md'|'lg'}   props.size
 * @param {ReactNode}              props.leadingIcon
 * @param {boolean}                props.disabled       — disables both zones
 * @param {boolean}                props.disabledAction  — disables only the action zone
 * @param {boolean}                props.disabledTrigger — disables only the dropdown trigger
 * @param {function}               props.onClick        — primary action handler
 * @param {function}               props.onOpenChange
 * @param {ReactNode}              props.menu           — composable <DropdownList> content
 * @param {Array}                  props.menuItems      — legacy flat menu items
 * @param {string}                 props.className
 * @param {ReactNode}              props.children       — primary action label
 */
const SplitButton = forwardRef(function SplitButton(
  {
    variant = 'primary',
    size = 'md',
    leadingIcon,
    tooltip,
    tooltipPlacement = 'top',
    triggerTooltip = 'More actions',
    disabled = false,
    disabledAction = false,
    disabledTrigger = false,
    onClick,
    onOpenChange,
    menu,
    menuItems = [],
    className,
    children,
    ...rest
  },
  ref
) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const menuRef = useRef(null);
  const focusedIndexRef = useRef(-1);

  /* Stable unique ID for linking button → menu panel & portalled submenus */
  const dropdownId = useRef(
    `sb-${Math.random().toString(36).slice(2, 8)}`
  ).current;

  /* Position state for the portalled dropdown panel */
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, minWidth: 0 });

  const isActionDisabled = disabled || disabledAction;
  const isTriggerDisabled = disabled || disabledTrigger;

  const handleOpenChange = (val) => {
    setIsOpen(val);
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
      handleOpenChange(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, dropdownId]);

  /* ── Focus helpers ── */
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
    const timer = setTimeout(() => {
      const items = getMenuItems(dropdownId);
      if (items[0]) focusItem(items[0]);
    }, 30);
    return () => clearTimeout(timer);
  }, [isOpen, focusItem, dropdownId]);

  /* ── Keyboard navigation ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      const focused = document.activeElement;
      if (!focused?.closest(`[data-dropdown-id="${dropdownId}"]`)) {
        if (e.key === 'Escape') { e.preventDefault(); handleOpenChange(false); }
        return;
      }

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          handleOpenChange(false);
          break;

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

        case 'ArrowRight': {
          e.preventDefault();
          if (!focused.hasAttribute('data-submenu-trigger')) break;
          focused._onMenuItemEnter?.();
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

        case 'ArrowLeft': {
          e.preventDefault();
          const panel = focused.closest('[data-submenu-panel]');
          if (!panel) break;
          const parentId = panel.getAttribute('data-submenu-parent');
          const trigger = document.querySelector(
            `[data-submenu-id="${parentId}"]`
          );
          if (trigger) focusItem(trigger);
          break;
        }

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
  const isOutline = variant === 'outline' || variant === 'ghost';

  return (
    <DropdownPortalContext.Provider value={dropdownId}>
      <div
        ref={containerRef}
        data-dropdown-id={dropdownId}
        className="relative inline-flex"
      >
        <div className="inline-flex items-stretch" role="group" aria-label="Split button">
          {/* ── Main action ── */}
          {(() => {
            const actionBtn = (
              <button
                ref={ref}
                type="button"
                disabled={isActionDisabled}
                onClick={onClick}
                className={cn(
                  'inline-flex items-center justify-center font-medium leading-none',
                  'transition-colors duration-100',
                  'focus-visible:outline-none',
                  'disabled:opacity-35 disabled:pointer-events-none',
                  'cursor-pointer select-none',
                  variantStyles[variant],
                  isIconOnly ? iconOnlySizeStyles[size] : sizeStyles[size],
                  isOutline ? 'relative hover:z-10' : 'border-r-0',
                  className
                )}
                {...rest}
              >
                {leadingIcon && (
                  <span className={cn('shrink-0 flex items-center justify-center', iconSizeStyles[size])}>
                    {leadingIcon}
                  </span>
                )}
                {!isIconOnly && children}
              </button>
            );
            return tooltip && isIconOnly ? (
              <Tooltip label={tooltip} placement={tooltipPlacement}>{actionBtn}</Tooltip>
            ) : actionBtn;
          })()}

          {/* ── Divider — hidden for outline (overlap approach handles border) ── */}
          {!isOutline && (
            <div
              className={cn(
                'w-px self-stretch',
                (isActionDisabled && isTriggerDisabled) ? 'opacity-35' : '',
                dividerStyles[variant]
              )}
              aria-hidden="true"
            />
          )}

          {/* ── Dropdown trigger ── */}
          <Tooltip label={triggerTooltip} placement="bottom">
            <button
              type="button"
              disabled={isTriggerDisabled}
              onClick={() => handleOpenChange(!isOpen)}
              id={`${dropdownId}-trigger`}
              aria-expanded={isOpen}
              aria-haspopup="menu"
              aria-controls={isOpen ? `${dropdownId}-menu` : undefined}
              aria-label={triggerTooltip}
              className={cn(
                'inline-flex items-center justify-center leading-none',
                'transition-colors duration-100',
                'focus-visible:outline-none',
                'disabled:opacity-35 disabled:pointer-events-none',
                'cursor-pointer select-none',
                variantStyles[variant],
                triggerSizeStyles[size],
                isOutline ? '-ml-px relative hover:z-10' : 'border-l-0'
              )}
            >
              <span
                className={cn(
                  'shrink-0 flex items-center justify-center',
                  arrowIconSize[size],
                )}
                aria-hidden="true"
              >
                <O9Icon svg={isOpen ? angleUpSvg : angleDownSvg} />
              </span>
            </button>
          </Tooltip>
        </div>

        {/* ── Dropdown panel — portalled to body ── */}
        {isOpen &&
          hasMenu &&
          createPortal(
            <div
              ref={menuRef}
              id={`${dropdownId}-menu`}
              data-dropdown-id={dropdownId}
              aria-labelledby={`${dropdownId}-trigger`}
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
                <div
                  role="menu"
                  aria-orientation="vertical"
                  aria-label="More options"
                  className="bg-surface-raised border border-border py-1 min-w-full shadow-down"
                >
                  {menuItems.map((item, i) => (
                    <button
                      key={i}
                      role="menuitem"
                      tabIndex={-1}
                      className="w-full text-left px-3 py-1.5 text-sm text-text hover:bg-interactive-subtle transition-colors cursor-pointer disabled:opacity-35 disabled:pointer-events-none outline-none focus-visible:bg-interactive-subtle"
                      onClick={() => {
                        item.onClick?.();
                        handleOpenChange(false);
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
      </div>
    </DropdownPortalContext.Provider>
  );
});

export default SplitButton;
