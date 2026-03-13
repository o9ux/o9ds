import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const variantStyles = {
  primary:
    'bg-interactive text-on-interactive border border-interactive hover:bg-interactive-hover active:bg-interactive-active focus-visible:ring-1 focus-visible:ring-interactive-border focus-visible:ring-offset-2 focus-visible:ring-offset-surface shadow-lg',
  danger:
    'bg-danger text-white-static border border-danger hover:bg-danger-hover hover:border-danger-hover active:bg-danger-active focus-visible:ring-1 focus-visible:ring-danger focus-visible:ring-offset-2 focus-visible:ring-offset-surface shadow-lg',
};

/* FAB is larger than standard buttons — uses a proportional scale
   based on Button tier heights with extra visual weight           */
const sizeStyles = {
  sm: 'h-10 min-w-10 text-xs gap-2',
  md: 'h-12 min-w-12 text-sm gap-2',
  lg: 'h-14 min-w-14 text-base gap-2.5',
};

/* Icon sizes map to o9con icon tokens for FAB
   Uses [&>*] to support both SVG icons and mask-image <span> icons */
const iconSizeStyles = {
  sm: '[&>*]:w-[var(--o9con-16)] [&>*]:h-[var(--o9con-16)]',   /* 16px */
  md: '[&>*]:w-[var(--o9con-20)] [&>*]:h-[var(--o9con-20)]',   /* 20px */
  lg: '[&>*]:w-[var(--o9con-24)] [&>*]:h-[var(--o9con-24)]',   /* 24px */
};

const FABButton = forwardRef(function FABButton(
  {
    variant = 'primary',
    size = 'md',
    icon,
    extended = false,
    disabled = false,
    className,
    children,
    ...rest
  },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center font-medium leading-none rounded-full',
        'transition-all duration-150',
        'focus-visible:outline-none',
        'disabled:opacity-35 disabled:pointer-events-none',
        'cursor-pointer select-none',
        variantStyles[variant],
        sizeStyles[size],
        iconSizeStyles[size],
        extended ? 'px-6' : 'aspect-square',
        className
      )}
      {...rest}
    >
      {icon && <span className="shrink-0 flex items-center">{icon}</span>}
      {extended && children}
    </button>
  );
});

export default FABButton;
