import { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';
import Button from './Button';
import chevronDownSvg from '@/assets/icons/o9con-chevron-down.svg?raw';

/* Chevron icon sizes — slightly smaller per size tier */
const chevronSizeMap = {
  xm: { width: 'var(--o9con-14)', height: 'var(--o9con-14)' },
  sm: { width: 'var(--o9con-14)', height: 'var(--o9con-14)' },
  md: { width: 'var(--o9con-16)', height: 'var(--o9con-16)' },
  lg: { width: 'var(--o9con-20)', height: 'var(--o9con-20)' },
};

/* Process the raw SVG: replace fill color and set to 100% size */
const processedChevron = chevronDownSvg
  .replace(/fill="#[0-9a-fA-F]{3,8}"/g, 'fill="currentColor"')
  .replace(/width="\d+"/, 'width="100%"')
  .replace(/height="\d+"/, 'height="100%"');

const DropdownButton = forwardRef(function DropdownButton(
  {
    variant = 'primary',
    size = 'md',
    leadingIcon,
    disabled = false,
    open: controlledOpen,
    onOpenChange,
    className,
    children,
    menuItems = [],
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

  const chevronSize = chevronSizeMap[size];

  return (
    <div ref={containerRef} className="relative inline-flex">
      <Button
        ref={ref}
        variant={variant}
        size={size}
        disabled={disabled}
        leadingIcon={leadingIcon}
        trailingIcon={
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
        }
        onClick={() => setOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={className}
        {...rest}
      >
        {children}
      </Button>

      {isOpen && menuItems.length > 0 && (
        <div className="absolute top-full left-0 mt-1 min-w-full z-50 bg-surface-raised border border-border py-1">
          {menuItems.map((item, i) => (
            <button
              key={i}
              className="w-full text-left px-4 py-2 text-sm text-text hover:bg-interactive-subtle transition-colors cursor-pointer disabled:opacity-35 disabled:pointer-events-none"
              onClick={() => {
                item.onClick?.();
                setOpen(false);
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

export default DropdownButton;
