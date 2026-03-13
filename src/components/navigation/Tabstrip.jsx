import { createContext, useContext } from 'react';
import { cn } from '@/utils/cn';

/* ─────────────────────────────────────────────
   Tabstrip Context
   ───────────────────────────────────────────── */
const TabContext = createContext(null);

/* ─────────────────────────────────────────────
   Tabstrip Root
   ───────────────────────────────────────────── */
export function Tabstrip({
  value,
  onChange,
  variant = 'underline',  // 'underline' | 'filled' | 'outline'
  size = 'md',            // 'sm' | 'md' | 'lg'
  className,
  children,
}) {
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
        {children}
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
  className,
}) {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error('<Tab> must be inside <Tabstrip>');
  const { value: selected, onChange, variant, size } = ctx;
  const isActive = selected === value;

  const sizeMap = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-5 text-sm gap-2',
  };

  const variantStyles = {
    underline: cn(
      'relative border-b-2 -mb-px',
      isActive
        ? 'border-interactive-border text-text font-semibold'
        : 'border-transparent text-text-secondary hover:text-text hover:border-border-hover',
      disabled && 'opacity-40 pointer-events-none border-transparent text-text-disabled'
    ),
    filled: cn(
      'flex-1',
      isActive
        ? 'bg-surface-overlay text-text font-semibold'
        : 'bg-transparent text-text-secondary hover:bg-interactive-subtle hover:text-text',
      disabled && 'opacity-40 pointer-events-none'
    ),
    outline: cn(
      'border border-b-0',
      isActive
        ? 'border-border bg-surface text-text font-semibold -mb-px'
        : 'border-transparent text-text-secondary hover:text-text',
      disabled && 'opacity-40 pointer-events-none'
    ),
  };

  return (
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
        className
      )}
    >
      {icon && <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
      <span>{label}</span>
      {badge != null && (
        <span className="ml-0.5 min-w-[18px] rounded-full bg-interactive-muted-hover px-1 py-px text-[10px] font-bold leading-none text-text">
          {badge}
        </span>
      )}
    </button>
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
