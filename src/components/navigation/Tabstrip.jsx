import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  Children,
  isValidElement,
  cloneElement,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';
import DropdownList from '@/components/containers/DropdownList';
import ellipsisHSvg from '@/assets/icons/o9con-ellipsis-h.svg?raw';
import pushPinSvg from '@/assets/icons/o9con-push-pin.svg?raw';
import pushPinnedSvg from '@/assets/icons/o9con-push-pinned.svg?raw';
import closeSvg from '@/assets/icons/o9con-close.svg?raw';
import angleDownSvg from '@/assets/icons/o9con-angle-down.svg?raw';

/* ─────────────────────────────────────────────
   Tabstrip Context
   ───────────────────────────────────────────── */
const TabContext = createContext(null);

/* ─────────────────────────────────────────────
   Icon size helpers
   ───────────────────────────────────────────── */
const iconSizeMap = {
  sm: '[&_svg]:h-3.5 [&_svg]:w-3.5',
  md: '[&_svg]:h-4 [&_svg]:w-4',
  lg: '[&_svg]:h-5 [&_svg]:w-5',
};

const actionIconSize = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-4.5 h-4.5',
};

/* ─────────────────────────────────────────────
   Tabstrip Root
   ───────────────────────────────────────────── */
export function Tabstrip({
  value,
  onChange,
  variant = 'underline',
  size = 'md',
  overflow,
  className,
  children,
}) {
  const childArray = Children.toArray(children).filter(isValidElement);
  const hasOverflow = typeof overflow === 'number' && childArray.length > overflow;
  const visibleChildren = hasOverflow ? childArray.slice(0, overflow) : childArray;
  const hiddenChildren = hasOverflow ? childArray.slice(overflow) : [];

  /* ── Overflow state ── */
  const [overflowOpen, setOverflowOpen] = useState(false);
  const overflowBtnRef = useRef(null);
  const overflowMenuRef = useRef(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const updateMenuPos = useCallback(() => {
    if (!overflowBtnRef.current) return;
    const rect = overflowBtnRef.current.getBoundingClientRect();
    setMenuPos({ top: rect.bottom + 4, left: rect.right });
  }, []);

  useEffect(() => {
    if (!overflowOpen) return;
    updateMenuPos();
    const onClickOutside = (e) => {
      if (
        overflowBtnRef.current?.contains(e.target) ||
        overflowMenuRef.current?.contains(e.target)
      ) return;
      setOverflowOpen(false);
    };
    const onKeyDown = (e) => { if (e.key === 'Escape') setOverflowOpen(false); };
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

  /* ── Overflow button sizing ── */
  const overflowSizeMap = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  /* Check if any hidden tab is active */
  const hiddenActiveLabel = hiddenChildren.find(
    (child) => child.props.value === value
  )?.props.label;

  return (
    <TabContext.Provider value={{ value, onChange, variant, size }}>
      <div
        role="tablist"
        className={cn(
          'flex items-end',
          variant === 'underline' && 'border-b border-border',
          variant === 'filled' && 'gap-1 bg-surface-sunken p-1',
          variant === 'outline' && 'gap-0',
          className
        )}
      >
        {visibleChildren}

        {/* Overflow button */}
        {hasOverflow && (
          <>
            <button
              ref={overflowBtnRef}
              type="button"
              aria-label="More tabs"
              aria-haspopup="menu"
              aria-expanded={overflowOpen}
              onClick={() => setOverflowOpen((o) => !o)}
              className={cn(
                'inline-flex items-center justify-center cursor-pointer select-none',
                'transition-colors duration-100',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-border/50',
                overflowSizeMap[size],
                iconSizeMap[size],
                variant === 'underline' && cn(
                  'relative border-b-2 -mb-px',
                  hiddenActiveLabel
                    ? 'border-interactive-border text-text'
                    : 'border-transparent text-text-secondary hover:text-text hover:border-border-hover',
                ),
                variant === 'filled' && cn(
                  hiddenActiveLabel
                    ? 'bg-surface-overlay text-text'
                    : 'bg-transparent text-text-secondary hover:bg-interactive-subtle hover:text-text',
                ),
                variant === 'outline' && cn(
                  'border border-b-0',
                  hiddenActiveLabel
                    ? 'border-border bg-surface text-text -mb-px'
                    : 'border-transparent text-text-secondary hover:text-text',
                ),
              )}
            >
              <O9Icon svg={ellipsisHSvg} />
            </button>

            {/* Overflow dropdown portal */}
            {overflowOpen &&
              createPortal(
                <div
                  ref={overflowMenuRef}
                  style={{
                    position: 'fixed',
                    top: `${menuPos.top}px`,
                    left: `${menuPos.left}px`,
                    transform: 'translateX(-100%)',
                    zIndex: 9999,
                  }}
                >
                  <DropdownList aria-label="More tabs">
                    {hiddenChildren.map((child) => {
                      const tabValue = child.props.value;
                      const tabLabel = child.props.label || tabValue;
                      const tabIcon = child.props.icon;
                      const isTabActive = value === tabValue;
                      return (
                        <DropdownList.Item
                          key={tabValue}
                          icon={tabIcon}
                          disabled={child.props.disabled}
                          className={isTabActive ? 'font-semibold' : ''}
                          onClick={() => {
                            onChange?.(tabValue);
                            setOverflowOpen(false);
                          }}
                        >
                          {tabLabel}
                        </DropdownList.Item>
                      );
                    })}
                  </DropdownList>
                </div>,
                document.body
              )}
          </>
        )}
      </div>
    </TabContext.Provider>
  );
}

/* ─────────────────────────────────────────────
   Tab Item
   ───────────────────────────────────────────── */
export function Tab({
  value,
  label,
  icon,
  badge,
  disabled = false,
  pinned,
  onPin,
  closable,
  onClose,
  moreActions,
  className,
}) {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error('<Tab> must be inside <Tabstrip>');
  const { value: selected, onChange, variant, size } = ctx;
  const isActive = selected === value;
  const isIconOnly = icon && !label;

  /* ── Dropdown state for more-actions ── */
  const [moreOpen, setMoreOpen] = useState(false);
  const moreBtnRef = useRef(null);
  const moreMenuRef = useRef(null);
  const [morePos, setMorePos] = useState({ top: 0, left: 0 });

  const updateMorePos = useCallback(() => {
    if (!moreBtnRef.current) return;
    const rect = moreBtnRef.current.getBoundingClientRect();
    setMorePos({ top: rect.bottom + 4, left: rect.left });
  }, []);

  useEffect(() => {
    if (!moreOpen) return;
    updateMorePos();
    const onClickOutside = (e) => {
      if (
        moreBtnRef.current?.contains(e.target) ||
        moreMenuRef.current?.contains(e.target)
      ) return;
      setMoreOpen(false);
    };
    const onKeyDown = (e) => { if (e.key === 'Escape') setMoreOpen(false); };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', updateMorePos, true);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', updateMorePos, true);
    };
  }, [moreOpen, updateMorePos]);

  const sizeMap = {
    sm: isIconOnly ? 'h-8 w-8' : 'h-8 px-3 text-xs gap-1.5',
    md: isIconOnly ? 'h-10 w-10' : 'h-10 px-4 text-sm gap-2',
    lg: isIconOnly ? 'h-12 w-12' : 'h-12 px-5 text-sm gap-2',
  };

  const hasActions = onPin || closable || moreActions;

  const variantStyles = {
    underline: cn(
      'relative border-b-2 -mb-px',
      isActive
        ? 'border-interactive-border text-text font-semibold'
        : 'border-transparent text-text-secondary hover:text-text hover:border-border-hover',
      disabled && 'opacity-40 pointer-events-none border-transparent text-text-disabled'
    ),
    filled: cn(
      isIconOnly ? '' : 'flex-1',
      isActive
        ? 'bg-surface-overlay text-text font-semibold'
        : 'bg-transparent text-text-secondary hover:bg-interactive-subtle hover:text-text',
      disabled && 'opacity-40 pointer-events-none'
    ),
    outline: cn(
      'border',
      isActive
        ? 'border-border border-b-transparent bg-surface text-text font-semibold -mb-px'
        : 'border-transparent text-text-secondary hover:text-text',
      disabled && 'opacity-40 pointer-events-none'
    ),
  };

  return (
    <div className="group/tab inline-flex items-center relative">
      <button
        role="tab"
        aria-selected={isActive}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(value)}
        className={cn(
          'inline-flex shrink-0 cursor-pointer items-center justify-center transition-colors duration-100',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-border/50',
          sizeMap[size],
          variantStyles[variant],
          hasActions && !isIconOnly && 'pr-1.5',
          className
        )}
      >
        {icon && (
          <span className={cn('shrink-0 flex items-center justify-center', iconSizeMap[size])}>
            {icon}
          </span>
        )}
        {label && <span className="truncate">{label}</span>}
        {badge != null && (
          <span className="ml-0.5 min-w-[18px] rounded-full bg-interactive-muted-hover px-1 py-px text-[10px] font-bold leading-none text-text">
            {badge}
          </span>
        )}
      </button>

      {/* ── Action buttons (pin / close / more) ── */}
      {hasActions && !disabled && (
        <div className={cn(
          'inline-flex items-center gap-0.5',
          /* Show on hover or when active */
          !isActive && 'opacity-0 group-hover/tab:opacity-100 transition-opacity',
          variant === 'underline' && '-mb-px',
          variant === 'outline' && isActive && '-mb-px',
        )}>
          {/* Pin button */}
          {onPin && (
            <button
              type="button"
              aria-label={pinned ? 'Unpin tab' : 'Pin tab'}
              onClick={(e) => { e.stopPropagation(); onPin(value); }}
              className={cn(
                'inline-flex items-center justify-center rounded-sm cursor-pointer',
                'hover:bg-interactive-subtle transition-colors',
                actionIconSize[size],
                iconSizeMap[size],
                pinned ? 'text-interactive-border' : 'text-text-tertiary hover:text-text',
              )}
            >
              <O9Icon svg={pinned ? pushPinnedSvg : pushPinSvg} />
            </button>
          )}

          {/* More-actions dropdown button */}
          {moreActions && (
            <>
              <button
                ref={moreBtnRef}
                type="button"
                aria-label="Tab options"
                aria-haspopup="menu"
                aria-expanded={moreOpen}
                onClick={(e) => { e.stopPropagation(); setMoreOpen((o) => !o); }}
                className={cn(
                  'inline-flex items-center justify-center rounded-sm cursor-pointer',
                  'hover:bg-interactive-subtle transition-colors',
                  actionIconSize[size],
                  iconSizeMap[size],
                  'text-text-tertiary hover:text-text',
                )}
              >
                <O9Icon svg={angleDownSvg} />
              </button>

              {moreOpen &&
                createPortal(
                  <div
                    ref={moreMenuRef}
                    style={{
                      position: 'fixed',
                      top: `${morePos.top}px`,
                      left: `${morePos.left}px`,
                      zIndex: 9999,
                    }}
                  >
                    {moreActions}
                  </div>,
                  document.body
                )}
            </>
          )}

          {/* Close button */}
          {closable && (
            <button
              type="button"
              aria-label="Close tab"
              onClick={(e) => { e.stopPropagation(); onClose?.(value); }}
              className={cn(
                'inline-flex items-center justify-center rounded-sm cursor-pointer',
                'hover:bg-interactive-subtle transition-colors',
                actionIconSize[size],
                iconSizeMap[size],
                'text-text-tertiary hover:text-text',
              )}
            >
              <O9Icon svg={closeSvg} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Tab Panel (content area)
   ───────────────────────────────────────────── */
export function TabPanel({ value, children, className }) {
  const ctx = useContext(TabContext);
  if (ctx?.value !== value) return null;
  return (
    <div role="tabpanel" className={cn('pt-4', className)}>
      {children}
    </div>
  );
}

export default Tabstrip;
