import { forwardRef, useState, useRef, useEffect, cloneElement } from 'react';
import { cn } from '@/utils/cn';

const placementStyles = {
  'bottom-start': 'top-full left-0 mt-1',
  'bottom-end': 'top-full right-0 mt-1',
  'top-start': 'bottom-full left-0 mb-1',
  'top-end': 'bottom-full right-0 mb-1',
};

/* ─────────────────────────────────────────────
   ActionMenu Root
   ───────────────────────────────────────────── */
const ActionMenu = forwardRef(function ActionMenu(
  {
    trigger,
    placement = 'bottom-start',
    open: controlledOpen,
    onOpenChange,
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

  const setOpen = (val) => {
    if (!isControlled) setInternalOpen(val);
    onOpenChange?.(val);
  };

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

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

  const triggerElement = cloneElement(trigger, {
    onClick: (e) => {
      trigger.props.onClick?.(e);
      setOpen(!isOpen);
    },
    'aria-expanded': isOpen,
    'aria-haspopup': 'menu',
  });

  return (
    <div ref={containerRef} className="relative inline-flex">
      {triggerElement}

      {isOpen && (
        <div
          ref={ref}
          role="menu"
          className={cn(
            'absolute z-50 bg-surface-raised border border-border py-1 min-w-[180px] shadow-down',
            placementStyles[placement],
            className
          )}
          {...rest}
        >
          {children}
        </div>
      )}
    </div>
  );
});

/* ─────────────────────────────────────────────
   ActionMenuItem
   ───────────────────────────────────────────── */
function ActionMenuItem({
  icon,
  shortcut,
  danger = false,
  disabled = false,
  onClick,
  className,
  children,
  ...rest
}) {
  return (
    <button
      role="menuitem"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors cursor-pointer text-left',
        'disabled:opacity-35 disabled:pointer-events-none',
        danger
          ? 'text-danger hover:bg-danger/10'
          : 'text-text hover:bg-interactive-subtle',
        className
      )}
      {...rest}
    >
      {icon && (
        <span className="shrink-0 [&_svg]:h-4 [&_svg]:w-4 text-text-tertiary">
          {icon}
        </span>
      )}
      <span className="flex-1 truncate">{children}</span>
      {shortcut && (
        <span className="shrink-0 text-[10px] text-text-tertiary font-mono">
          {shortcut}
        </span>
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────
   ActionMenuDivider
   ───────────────────────────────────────────── */
function ActionMenuDivider() {
  return <div className="h-px bg-border my-1" role="separator" />;
}

export { ActionMenu, ActionMenuItem, ActionMenuDivider };
