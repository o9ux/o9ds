import {
  forwardRef,
  Children,
  cloneElement,
  isValidElement,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';
import Tooltip from '@/components/containers/Tooltip';
import DropdownList from '@/components/containers/DropdownList';
import ellipsisHSvg from '@/assets/icons/o9con-ellipsis-h.svg?raw';
import ellipsisVSvg from '@/assets/icons/o9con-ellipsis-v.svg?raw';

/* ─────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────── */

/** Extract display text from a React element tree */
function extractText(node) {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (!node) return '';
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (node.props?.children) return extractText(node.props.children);
  return '';
}

/* ─────────────────────────────────────────────
   ButtonGroup
   ───────────────────────────────────────────── */

const ButtonGroup = forwardRef(function ButtonGroup(
  {
    orientation = 'horizontal',
    overflow,
    toggle,
    selectionVariant = 'primary',
    disabled = false,
    value,
    onValueChange,
    className,
    children,
    'aria-label': ariaLabel,
    ...rest
  },
  ref
) {
  const isHorizontal = orientation === 'horizontal';
  const isToggle = toggle === 'single' || toggle === 'multi';
  const containerRole = isToggle ? 'toolbar' : 'group';

  /* ── Roving tabindex state for toggle/toolbar mode ── */
  const [focusedIndex, setFocusedIndex] = useState(0);
  const itemRefs = useRef([]);

  /* ── Overflow state ── */
  const [overflowOpen, setOverflowOpen] = useState(false);
  const overflowBtnRef = useRef(null);
  const overflowMenuRef = useRef(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const dropdownId = useRef(
    `bg-${Math.random().toString(36).slice(2, 8)}`
  ).current;

  const childArray = Children.toArray(children).filter(isValidElement);
  const totalCount = childArray.length;
  const hasOverflow = typeof overflow === 'number' && totalCount > overflow;
  const visibleChildren = hasOverflow ? childArray.slice(0, overflow) : childArray;
  const hiddenChildren = hasOverflow ? childArray.slice(overflow) : [];

  /* ── Overflow: position & outside-click ── */
  const updateMenuPos = useCallback(() => {
    if (!overflowBtnRef.current) return;
    const rect = overflowBtnRef.current.getBoundingClientRect();
    setMenuPos({
      top: rect.bottom + 4,
      left: rect.right,
    });
  }, []);

  useEffect(() => {
    if (!overflowOpen) return;
    updateMenuPos();

    const onClickOutside = (e) => {
      if (
        overflowBtnRef.current?.contains(e.target) ||
        overflowMenuRef.current?.contains(e.target)
      )
        return;
      setOverflowOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOverflowOpen(false);
    };
    const onScroll = () => updateMenuPos();

    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
    };
  }, [overflowOpen, updateMenuPos]);

  /* ── Toggle: check if a child value is active ── */
  const isActive = (childValue) => {
    if (!isToggle || childValue === undefined) return false;
    if (toggle === 'single') return value === childValue;
    if (toggle === 'multi') return Array.isArray(value) && value.includes(childValue);
    return false;
  };

  /* ── Toggle: handle selection ── */
  const handleToggle = (childValue, originalOnClick, e) => {
    if (originalOnClick) originalOnClick(e);
    if (!onValueChange || childValue === undefined) return;
    if (toggle === 'single') {
      onValueChange(childValue);
    } else if (toggle === 'multi') {
      const arr = Array.isArray(value) ? value : [];
      onValueChange(
        arr.includes(childValue)
          ? arr.filter((v) => v !== childValue)
          : [...arr, childValue]
      );
    }
  };

  /* ── Roving tabindex: keyboard handler ── */
  const handleKeyDown = useCallback(
    (e) => {
      if (!isToggle) return;
      const count = visibleChildren.length;
      const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
      const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
      let next = focusedIndex;

      if (e.key === nextKey) {
        e.preventDefault();
        next = (focusedIndex + 1) % count;
      } else if (e.key === prevKey) {
        e.preventDefault();
        next = (focusedIndex - 1 + count) % count;
      } else if (e.key === 'Home') {
        e.preventDefault();
        next = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        next = count - 1;
      } else {
        return;
      }

      setFocusedIndex(next);
      itemRefs.current[next]?.focus();
    },
    [isToggle, isHorizontal, focusedIndex, visibleChildren.length]
  );

  /* ── Active styles based on selectionVariant ── */
  const activeStyles =
    selectionVariant === 'secondary'
      ? 'z-10 bg-interactive !border-interactive text-on-interactive hover:bg-interactive-hover hover:!border-interactive-hover hover:text-on-interactive [&_svg]:text-on-interactive'
      : 'z-10 bg-interactive-subtle !border-interactive-border text-text';

  /* ── Render a child with injected styles ── */
  const renderChild = (child, index) => {
    const isFirst = index === 0;
    const childValue = child.props.value;
    const active = isActive(childValue);
    const isChildDisabled = disabled || child.props.disabled;

    const injectedProps = {
      className: cn(
        child.props.className,
        'relative hover:z-10',
        isHorizontal ? (!isFirst && '-ml-px') : (!isFirst && '-mt-px'),
        active && activeStyles,
      ),
      disabled: isChildDisabled || undefined,
    };

    /* Toggle: inject aria-pressed, onClick override, tabIndex */
    if (isToggle && childValue !== undefined) {
      injectedProps['aria-pressed'] = active;
      injectedProps.onClick = isChildDisabled
        ? undefined
        : (e) => handleToggle(childValue, child.props.onClick, e);
      injectedProps.tabIndex = index === focusedIndex ? 0 : -1;
      injectedProps.onFocus = () => setFocusedIndex(index);
    }

    injectedProps.ref = (el) => {
      itemRefs.current[index] = el;
    };

    return cloneElement(child, injectedProps);
  };

  /* ── Detect size from first visible child for the ellipsis button ── */
  const firstChild = visibleChildren[0];
  const childSize = firstChild?.props?.size || 'md';

  /* Overflow button matches the child button height.
     For text Button children: use the same h but a fixed square width.
     For IconButton children: use the same h×w square. */
  const isIconOnlyGroup = firstChild?.type?.displayName === 'IconButton' || firstChild?.type?.name === 'IconButton';

  const ellipsisSizeStyles = {
    xm: 'h-5 min-w-5',
    sm: 'h-6 min-w-6',
    md: 'h-8 min-w-8',
    lg: 'h-9 min-w-9',
  };

  const ellipsisIconSize = {
    xm: 'text-[14px]',
    sm: 'text-[16px]',
    md: 'text-[20px]',
    lg: 'text-[24px]',
  };

  /* Ellipsis icon: vertical dots for horizontal layout, horizontal dots for vertical layout */
  const ellipsisIcon = isHorizontal ? ellipsisVSvg : ellipsisHSvg;

  return (
    <>
      <div
        ref={ref}
        role={containerRole}
        aria-label={ariaLabel}
        aria-orientation={orientation}
        className={cn(
          'inline-flex',
          isHorizontal ? 'flex-row' : 'flex-col',
          className
        )}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {visibleChildren.map((child, i) => renderChild(child, i))}

        {/* Overflow ellipsis button */}
        {hasOverflow && (
          <Tooltip label="More actions" placement="bottom">
            <button
              ref={overflowBtnRef}
              type="button"
              aria-label="More actions"
              aria-haspopup="menu"
              aria-expanded={overflowOpen}
              aria-controls={overflowOpen ? `${dropdownId}-menu` : undefined}
              onClick={() => setOverflowOpen((o) => !o)}
              className={cn(
                'inline-flex items-center justify-center leading-none',
                'transition-colors duration-100 cursor-pointer select-none',
                'bg-transparent text-text border border-border-strong',
                'hover:border-interactive-border hover:bg-interactive-subtle',
                'active:bg-interactive-muted',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-border/50',
                'relative hover:z-10',
                isHorizontal ? '-ml-px' : '-mt-px',
                ellipsisSizeStyles[childSize],
              )}
            >
              <span className={cn('flex items-center justify-center', ellipsisIconSize[childSize])}>
                <O9Icon svg={ellipsisIcon} />
              </span>
            </button>
          </Tooltip>
        )}
      </div>

      {/* Overflow dropdown portal */}
      {hasOverflow &&
        overflowOpen &&
        createPortal(
          <div
            ref={overflowMenuRef}
            id={`${dropdownId}-menu`}
            data-dropdown-id={dropdownId}
            style={{
              position: 'fixed',
              top: `${menuPos.top}px`,
              left: `${menuPos.left}px`,
              transform: 'translateX(-100%)',
              zIndex: 9999,
            }}
          >
            <DropdownList aria-label="More actions">
              {hiddenChildren.map((child, i) => {
                const label = extractText(child.props.children) || `Action ${overflow + i + 1}`;
                const icon = child.props.icon || child.props.leadingIcon;
                return (
                  <DropdownList.Item
                    key={i}
                    icon={icon}
                    disabled={child.props.disabled}
                    onClick={() => {
                      child.props.onClick?.();
                      setOverflowOpen(false);
                    }}
                  >
                    {label}
                  </DropdownList.Item>
                );
              })}
            </DropdownList>
          </div>,
          document.body
        )}
    </>
  );
});

export default ButtonGroup;
