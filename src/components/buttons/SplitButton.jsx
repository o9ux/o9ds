import { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';
import chevronDownSvg from '@/assets/icons/o9con-chevron-down.svg?raw';

const variantStyles = {
  primary:
    'bg-interactive text-on-interactive border border-interactive hover:bg-interactive-hover active:bg-interactive-active focus-visible:ring-1 focus-visible:ring-interactive-border focus-visible:ring-offset-1 focus-visible:ring-offset-surface',
  tertiary:
    'bg-transparent text-text border border-transparent hover:bg-interactive-muted active:bg-interactive-muted-hover focus-visible:ring-1 focus-visible:ring-interactive-border/50',
  outline:
    'bg-transparent text-text border border-border-strong hover:border-interactive-border hover:bg-interactive-subtle active:bg-interactive-muted focus-visible:ring-1 focus-visible:ring-interactive-border/50',
  danger:
    'bg-danger text-white-static border border-danger hover:bg-danger-hover hover:border-danger-hover active:bg-danger-active focus-visible:ring-1 focus-visible:ring-danger focus-visible:ring-offset-1 focus-visible:ring-offset-surface',
};

/* SplitButton sizes — matches Button size spec
   xm 20px | sm 24px | md 32px | lg 36px */
const sizeStyles = {
  xm: 'h-5 px-1.5 text-2xs gap-1',          /* 20px  6px */
  sm: 'h-6 px-2 text-xs gap-1',              /* 24px  8px */
  md: 'h-8 px-3 text-sm gap-1.5',            /* 32px 12px */
  lg: 'h-9 px-3.5 text-base gap-1.5',        /* 36px 14px */
};

const triggerSizeStyles = {
  xm: 'h-5 w-5',     /* 20px */
  sm: 'h-6 w-6',     /* 24px */
  md: 'h-8 w-8',     /* 32px */
  lg: 'h-9 w-9',     /* 36px */
};

/* Icon sizes map to o9con icon tokens
   Uses [&>*] to support both SVG icons and mask-image <span> icons */
const iconSizeStyles = {
  xm: '[&>*]:w-[var(--o9con-14)] [&>*]:h-[var(--o9con-14)]',
  sm: '[&>*]:w-[var(--o9con-16)] [&>*]:h-[var(--o9con-16)]',
  md: '[&>*]:w-[var(--o9con-20)] [&>*]:h-[var(--o9con-20)]',
  lg: '[&>*]:w-[var(--o9con-24)] [&>*]:h-[var(--o9con-24)]',
};

/* Chevron icon sizes — slightly smaller than main icon */
const chevronSizeMap = {
  xm: { width: 'var(--o9con-14)', height: 'var(--o9con-14)' },
  sm: { width: 'var(--o9con-14)', height: 'var(--o9con-14)' },
  md: { width: 'var(--o9con-16)', height: 'var(--o9con-16)' },
  lg: { width: 'var(--o9con-20)', height: 'var(--o9con-20)' },
};

const dividerStyles = {
  primary: 'bg-divider-on-interactive',
  tertiary: 'bg-interactive-muted-hover',
  outline: 'bg-border-strong',
  danger: 'bg-white-static/20',
};

/* Process the raw SVG: replace fill color and set to 100% size */
const processedChevron = chevronDownSvg
  .replace(/fill="#[0-9a-fA-F]{3,8}"/g, 'fill="currentColor"')
  .replace(/width="\d+"/, 'width="100%"')
  .replace(/height="\d+"/, 'height="100%"');

const SplitButton = forwardRef(function SplitButton(
  {
    variant = 'primary',
    size = 'md',
    leadingIcon,
    disabled = false,
    onClick,
    onOpenChange,
    className,
    children,
    menuItems = [],
    ...rest
  },
  ref
) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const handleOpenChange = (val) => {
    setIsOpen(val);
    onOpenChange?.(val);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        handleOpenChange(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  const chevronSize = chevronSizeMap[size];

  return (
    <div ref={containerRef} className="relative inline-flex">
      <div className="inline-flex items-stretch">
        {/* Main action */}
        <button
          ref={ref}
          disabled={disabled}
          onClick={onClick}
          className={cn(
            'inline-flex items-center justify-center font-medium leading-none',
            'transition-colors duration-100',
            'focus-visible:outline-none',
            'disabled:opacity-35 disabled:pointer-events-none',
            'cursor-pointer select-none',
            variantStyles[variant],
            sizeStyles[size],
            'border-r-0',
            className
          )}
          {...rest}
        >
          {leadingIcon && (
            <span className={cn('shrink-0 flex items-center', iconSizeStyles[size])}>
              {leadingIcon}
            </span>
          )}
          {children}
        </button>

        {/* Divider */}
        <div
          className={cn(
            'w-px self-stretch',
            disabled ? 'opacity-35' : '',
            dividerStyles[variant]
          )}
        />

        {/* Dropdown trigger */}
        <button
          disabled={disabled}
          onClick={() => handleOpenChange(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="More options"
          className={cn(
            'inline-flex items-center justify-center leading-none',
            'transition-colors duration-100',
            'focus-visible:outline-none',
            'disabled:opacity-35 disabled:pointer-events-none',
            'cursor-pointer select-none',
            variantStyles[variant],
            triggerSizeStyles[size],
            'border-l-0'
          )}
        >
          <span
            className={cn(
              'transition-transform duration-150',
              isOpen && 'rotate-180'
            )}
          >
            <span
              aria-hidden="true"
              style={{ display: 'inline-block', width: chevronSize.width, height: chevronSize.height }}
              dangerouslySetInnerHTML={{ __html: processedChevron }}
            />
          </span>
        </button>
      </div>

      {isOpen && menuItems.length > 0 && (
        <div className="absolute top-full left-0 mt-1 min-w-full z-50 bg-surface-raised border border-border py-1">
          {menuItems.map((item, i) => (
            <button
              key={i}
              className="w-full text-left px-4 py-2 text-sm text-text hover:bg-interactive-subtle transition-colors cursor-pointer disabled:opacity-35 disabled:pointer-events-none"
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
    </div>
  );
});

export default SplitButton;
