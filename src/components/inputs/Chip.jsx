import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const variantStyles = {
  filled:
    'bg-interactive-muted text-text border border-transparent hover:bg-interactive-muted-hover',
  outline:
    'bg-transparent text-text border border-border-strong hover:border-interactive-border hover:bg-interactive-subtle',
};

const sizeStyles = {
  sm: 'h-6 px-2 text-xs gap-1',
  md: 'h-7 px-2.5 text-xs gap-1.5',
  lg: 'h-8 px-3 text-sm gap-1.5',
};

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 3l6 6M9 3l-6 6" />
  </svg>
);

const Chip = forwardRef(function Chip(
  {
    variant = 'filled',
    size = 'md',
    leadingIcon,
    selected = false,
    removable = false,
    onRemove,
    disabled = false,
    className,
    children,
    ...rest
  },
  ref
) {
  return (
    <span
      ref={ref}
      role={rest.onClick ? 'button' : undefined}
      tabIndex={rest.onClick && !disabled ? 0 : undefined}
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        'transition-colors duration-100',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-border/50',
        disabled
          ? 'opacity-35 pointer-events-none'
          : rest.onClick
            ? 'cursor-pointer select-none'
            : '',
        selected
          ? 'bg-interactive text-on-interactive border border-interactive'
          : variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...rest}
    >
      {leadingIcon && (
        <span className="shrink-0 [&_svg]:h-3.5 [&_svg]:w-3.5">
          {leadingIcon}
        </span>
      )}
      <span className="truncate">{children}</span>
      {removable && (
        <button
          type="button"
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          disabled={disabled}
          className="shrink-0 -mr-0.5 rounded-full p-0.5 hover:bg-divider-on-interactive transition-colors cursor-pointer"
          aria-label="Remove"
        >
          <CloseIcon />
        </button>
      )}
    </span>
  );
});

export default Chip;
