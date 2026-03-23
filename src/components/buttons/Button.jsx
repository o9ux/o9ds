import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const variantStyles = {
  primary:
    'bg-interactive text-on-interactive border border-interactive hover:bg-interactive-hover active:bg-interactive-active focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-border focus-visible:ring-offset-1 focus-visible:ring-offset-surface',
  secondary:
    'bg-surface-raised text-text border border-transparent hover:bg-interactive-muted active:bg-interactive-muted-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-border/50',
  outline:
    'bg-transparent text-text border border-border-strong hover:border-interactive-border hover:bg-interactive-subtle active:bg-interactive-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-border/50',
  ghost:
    'bg-transparent text-text border border-transparent hover:bg-interactive-subtle active:bg-interactive-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-border/50',
  danger:
    'bg-danger text-white-static border border-danger hover:bg-danger-hover hover:border-danger-hover active:bg-danger-active focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-danger focus-visible:ring-offset-1 focus-visible:ring-offset-surface',
};

/* ----------------------------------------------------------------
   Button sizes — strict Figma spec
   xm  20px  |  o9con-14  |  --font-size-10 medium  |  px 6
   sm  24px  |  o9con-16  |  --font-size-12          |  px 8
   md  32px  |  o9con-20  |  --font-size-14          |  px 12
   lg  36px  |  o9con-24  |  --font-size-16          |  px 14
   ---------------------------------------------------------------- */
const sizeStyles = {
  xm: 'h-5 px-1.5 text-2xs gap-1',          /* 20px  6px */
  sm: 'h-6 px-2 text-xs gap-1',              /* 24px  8px */
  md: 'h-8 px-3 text-sm gap-1.5',            /* 32px 12px */
  lg: 'h-9 px-3.5 text-base gap-1.5',        /* 36px 14px */
};

/* Icon sizes map to o9con icon tokens per size tier
   Uses [&>*] to support both SVG icons and mask-image <span> icons */
const iconSizeStyles = {
  xm: '[&>*]:w-[var(--o9con-14)] [&>*]:h-[var(--o9con-14)]',   /* 14px */
  sm: '[&>*]:w-[var(--o9con-16)] [&>*]:h-[var(--o9con-16)]',   /* 16px */
  md: '[&>*]:w-[var(--o9con-20)] [&>*]:h-[var(--o9con-20)]',   /* 20px */
  lg: '[&>*]:w-[var(--o9con-24)] [&>*]:h-[var(--o9con-24)]',   /* 24px */
};

const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    leadingIcon,
    trailingIcon,
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
        'inline-flex items-center justify-center font-medium leading-none',
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
      {leadingIcon && (
        <span className={cn('shrink-0 flex items-center', iconSizeStyles[size])}>{leadingIcon}</span>
      )}
      {children}
      {trailingIcon && (
        <span className={cn('shrink-0 flex items-center', iconSizeStyles[size])}>{trailingIcon}</span>
      )}
    </button>
  );
});

export default Button;
