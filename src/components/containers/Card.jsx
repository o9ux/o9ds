import { cn } from '@/utils/cn';

/**
 * Card — a contained surface that groups related content.
 *
 * @param {'default'|'raised'|'outlined'|'sunken'} props.variant
 * @param {boolean} props.interactive — adds hover/active states for clickable cards
 * @param {string}  props.className
 */
export function Card({ variant = 'default', interactive = false, className, children, ...rest }) {
  const variantStyles = {
    default:  'bg-surface-raised border border-border',
    raised:   'bg-surface-overlay border border-border shadow-md',
    outlined: 'bg-transparent border border-border',
    sunken:   'bg-surface-sunken border border-border-subtle',
  };

  return (
    <div
      className={cn(
        variantStyles[variant],
        interactive && 'cursor-pointer transition-colors duration-100 hover:border-border-hover hover:bg-surface-overlay active:bg-surface-menu',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

/**
 * CardHeader — top section with title and optional action.
 */
export function CardHeader({ title, description, action, className }) {
  return (
    <div className={cn('flex items-start justify-between gap-4 px-5 pt-5 pb-4', className)}>
      <div className="min-w-0 flex-1">
        {title && <h3 className="text-sm font-semibold text-text truncate">{title}</h3>}
        {description && <p className="mt-0.5 text-xs text-text-tertiary">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/**
 * CardBody — padded content area.
 */
export function CardBody({ className, children }) {
  return (
    <div className={cn('px-5 py-4', className)}>
      {children}
    </div>
  );
}

/**
 * CardFooter — bottom section, typically holds action buttons.
 */
export function CardFooter({ className, children }) {
  return (
    <div className={cn('flex items-center justify-end gap-3 border-t border-border px-5 py-3', className)}>
      {children}
    </div>
  );
}

/**
 * CardDivider — thin horizontal rule between card sections.
 */
export function CardDivider({ className }) {
  return <hr className={cn('border-t border-border', className)} />;
}

export default Card;
