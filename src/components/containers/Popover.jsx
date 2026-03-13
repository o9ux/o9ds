import { forwardRef, useState, useRef, useEffect, cloneElement } from 'react';
import { cn } from '@/utils/cn';

const placementStyles = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const Popover = forwardRef(function Popover(
  {
    trigger,
    placement = 'bottom',
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
    'aria-haspopup': 'true',
  });

  return (
    <div ref={containerRef} className="relative inline-flex">
      {triggerElement}

      {isOpen && (
        <div
          ref={ref}
          role="dialog"
          className={cn(
            'absolute z-50 bg-surface-raised border border-border shadow-lg p-4',
            'min-w-[200px]',
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

export default Popover;
