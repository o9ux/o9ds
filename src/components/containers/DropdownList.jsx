import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';
import angleRightSvg from '@/assets/icons/o9con-angle-right.svg?raw';
import searchSvg from '@/assets/icons/o9con-search.svg?raw';

/* ─────────────────────────────────────────────
   Shared context — DropdownButton provides a
   unique ID so portalled panels can be linked
   for outside-click detection & keyboard nav.
   ───────────────────────────────────────────── */
export const DropdownPortalContext = createContext(null);

/* ─────────────────────────────────────────────
   DropdownList — composable dropdown menu panel
   ───────────────────────────────────────────── */

/**
 * DropdownList — the container panel for dropdown menus.
 *
 * Compose with sub-components:
 *   <DropdownList>
 *     <DropdownList.Search />
 *     <DropdownList.Section>
 *       <DropdownList.Header>Title</DropdownList.Header>
 *       <DropdownList.Item icon={…} shortcut="⌘R">Label</DropdownList.Item>
 *     </DropdownList.Section>
 *     <DropdownList.Divider />
 *   </DropdownList>
 */
function DropdownList({ className, children, 'aria-label': ariaLabel }) {
  return (
    <div
      role="menu"
      aria-orientation="vertical"
      aria-label={ariaLabel || 'Menu'}
      className={cn(
        'bg-surface-raised border border-border py-1 min-w-[220px] shadow-down max-h-80 overflow-y-auto',
        className
      )}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   DropdownList.Search — optional search input
   ───────────────────────────────────────────── */
function Search({ value, onChange, placeholder = 'Search…' }) {
  const inputRef = useRef(null);

  /* Focus the search input on mount */
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div role="search" className="px-2 pt-1.5 pb-1 border-b border-border">
      <div className="flex items-center gap-2 px-2 py-1.5 bg-surface-input border border-border-form">
        <span className="shrink-0 [&_svg]:h-3.5 [&_svg]:w-3.5 text-text-tertiary" aria-hidden="true">
          <O9Icon svg={searchSvg} />
        </span>
        <input
          ref={inputRef}
          type="text"
          role="searchbox"
          aria-label="Filter menu items"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-xs text-text placeholder:text-text-placeholder min-w-0"
        />
        <kbd className="shrink-0 text-[9px] text-text-tertiary border border-border px-1 py-0.5 leading-none font-mono" aria-hidden="true">
          /
        </kbd>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DropdownList.Section — groups items together
   ───────────────────────────────────────────── */
function Section({ children, className, 'aria-label': ariaLabel }) {
  /* Generate a stable ID for linking the Header (if any) to the group via aria-labelledby */
  const sectionId = useRef(
    `sec-${Math.random().toString(36).slice(2, 8)}`
  ).current;

  return (
    <div
      role="group"
      aria-labelledby={ariaLabel ? undefined : sectionId}
      aria-label={ariaLabel}
      className={className}
    >
      {/* Inject sectionId into the first Header child for aria-labelledby linking */}
      {Array.isArray(children)
        ? children.map((child, i) =>
            i === 0 && child?.type === Header
              ? { ...child, props: { ...child.props, id: sectionId } }
              : child
          )
        : children?.type === Header
          ? { ...children, props: { ...children.props, id: sectionId } }
          : children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   DropdownList.Header — section title
   ───────────────────────────────────────────── */
function Header({ children, className, id }) {
  return (
    <div
      id={id}
      role="presentation"
      className={cn(
        'px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-text-tertiary select-none',
        className
      )}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   DropdownList.Item — clickable menu item

   Stores its onMouseEnter callback on the DOM
   element as `_onMenuItemEnter` so the keyboard
   navigation handler in DropdownButton can call
   it directly (native DOM events don't reliably
   trigger React synthetic onMouseEnter).
   ───────────────────────────────────────────── */

/**
 * @param {ReactNode}  props.icon       — O9Icon element (leading)
 * @param {string}     props.shortcut   — keyboard shortcut label (e.g. "⌘R")
 * @param {boolean}    props.hasSubmenu  — shows ">" arrow for drill-down
 * @param {boolean}    props.active      — highlighted / selected state
 * @param {boolean}    props.disabled
 * @param {function}   props.onClick
 * @param {function}   props.onMouseEnter
 * @param {string}     props.className
 * @param {ReactNode}  props.children   — label text
 */
/**
 * Convert a display shortcut string to a WAI-ARIA `aria-keyshortcuts` value.
 *   "⌘C"   → "Meta+C"
 *   "⌘⇧E"  → "Meta+Shift+E"
 *   "⌃S"   → "Control+S"
 */
function toAriaShortcut(s) {
  if (!s) return undefined;
  const parts = [];
  let key = '';
  for (const ch of s) {
    switch (ch) {
      case '⌘': parts.push('Meta'); break;
      case '⇧': parts.push('Shift'); break;
      case '⌃': parts.push('Control'); break;
      case '⌥': parts.push('Alt'); break;
      default:   key = ch;
    }
  }
  if (key) parts.push(key.toUpperCase());
  return parts.join('+');
}

function Item({
  icon,
  shortcut,
  hasSubmenu = false,
  active = false,
  disabled = false,
  onClick,
  onMouseEnter,
  className,
  children,
  ...rest
}) {
  const itemRef = useRef(null);

  /* Expose onMouseEnter on DOM for keyboard nav access */
  useEffect(() => {
    if (itemRef.current) {
      itemRef.current._onMenuItemEnter = onMouseEnter || null;
    }
  }, [onMouseEnter]);

  return (
    <button
      ref={itemRef}
      role="menuitem"
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-current={active ? 'true' : undefined}
      aria-haspopup={hasSubmenu ? 'menu' : undefined}
      aria-keyshortcuts={toAriaShortcut(shortcut)}
      data-shortcut={shortcut || undefined}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={cn(
        'w-full flex items-center gap-2 px-3 py-1.5 text-sm transition-colors cursor-pointer text-left',
        'disabled:opacity-35 disabled:pointer-events-none',
        'outline-none focus-visible:bg-interactive-subtle',
        active
          ? 'bg-interactive-subtle text-text'
          : 'text-text hover:bg-interactive-subtle',
        className
      )}
      {...rest}
    >
      {icon && (
        <span className="shrink-0 [&_svg]:h-4 [&_svg]:w-4 text-text-tertiary" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="flex-1 truncate">{children}</span>
      {shortcut && (
        <span className="shrink-0 inline-flex items-center text-xs leading-none text-text-tertiary font-mono tracking-wide bg-surface-overlay border border-border px-2 py-1 rounded-sm" aria-hidden="true">
          {shortcut}
        </span>
      )}
      {hasSubmenu && (
        <span className="shrink-0 inline-flex items-center [&_svg]:h-4 [&_svg]:w-4 text-text-tertiary ml-1" aria-hidden="true">
          <O9Icon svg={angleRightSvg} />
        </span>
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────
   DropdownList.Divider — horizontal separator
   ───────────────────────────────────────────── */
function Divider() {
  return <div className="h-px bg-border my-1" role="separator" aria-hidden="true" />;
}

/* ─────────────────────────────────────────────
   DropdownList.Submenu — drill-down sub-panel
   (Legacy — kept for backward compatibility.
    Prefer SubmenuItem for portal-based rendering.)
   ───────────────────────────────────────────── */
function Submenu({ className, children }) {
  return (
    <div
      role="menu"
      className={cn(
        'absolute left-full top-0 ml-0.5 z-50',
        'bg-surface-raised border border-border py-1 min-w-[200px] shadow-down max-h-80 overflow-y-auto',
        className
      )}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   DropdownList.SubmenuItem — item wrapper that
   portals the submenu to document.body so it
   escapes all ancestor overflow clipping.

   Data-attribute linking for keyboard nav:
     trigger button:  data-submenu-trigger  data-submenu-id="sm-xxx"
     portalled panel: data-submenu-panel    data-submenu-parent="sm-xxx"

   This lets DropdownButton's ArrowRight find
   the submenu panel for a trigger, and ArrowLeft
   find the trigger from inside a submenu.
   ───────────────────────────────────────────── */
function SubmenuItem({
  label,
  icon,
  active = false,
  disabled = false,
  onMouseEnter,
  submenuOpen = false,
  children,
  className,
}) {
  const triggerRef = useRef(null);
  const ddId = useContext(DropdownPortalContext);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const submenuId = useRef(
    `sm-${Math.random().toString(36).slice(2, 8)}`
  ).current;

  /* Track trigger element position for the portalled submenu */
  useEffect(() => {
    if (!submenuOpen || !triggerRef.current) return;
    const updatePos = () => {
      const el = triggerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPos({ top: rect.top, left: rect.right + 2 });
    };
    updatePos();
    window.addEventListener('scroll', updatePos, true);
    window.addEventListener('resize', updatePos);
    return () => {
      window.removeEventListener('scroll', updatePos, true);
      window.removeEventListener('resize', updatePos);
    };
  }, [submenuOpen]);

  return (
    <div ref={triggerRef}>
      <Item
        icon={icon}
        hasSubmenu
        active={active}
        disabled={disabled}
        onMouseEnter={onMouseEnter}
        aria-expanded={submenuOpen}
        data-submenu-trigger=""
        data-submenu-id={submenuId}
        className={className}
      >
        {label}
      </Item>
      {submenuOpen &&
        createPortal(
          <div
            role="menu"
            aria-orientation="vertical"
            aria-label={`${label} submenu`}
            data-dropdown-id={ddId}
            data-submenu-panel=""
            data-submenu-parent={submenuId}
            className="bg-surface-raised border border-border py-1 min-w-[200px] shadow-down max-h-80 overflow-y-auto"
            style={{
              position: 'fixed',
              top: `${pos.top}px`,
              left: `${pos.left}px`,
              zIndex: 9999,
            }}
          >
            {children}
          </div>,
          document.body
        )}
    </div>
  );
}

/* ── Attach sub-components ── */
DropdownList.Search = Search;
DropdownList.Section = Section;
DropdownList.Header = Header;
DropdownList.Item = Item;
DropdownList.Divider = Divider;
DropdownList.Submenu = Submenu;
DropdownList.SubmenuItem = SubmenuItem;

export default DropdownList;
