import { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';

const Splitter = forwardRef(function Splitter(
  {
    orientation = 'horizontal',
    defaultSize = 50,
    minSize = 10,
    maxSize = 90,
    className,
    children,
    ...rest
  },
  ref
) {
  const [size, setSize] = useState(defaultSize);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const isHorizontal = orientation === 'horizontal';

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      isDragging.current = true;
      document.body.style.cursor = isHorizontal ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';

      const onMouseMove = (e) => {
        if (!isDragging.current || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        let pct;
        if (isHorizontal) {
          pct = ((e.clientX - rect.left) / rect.width) * 100;
        } else {
          pct = ((e.clientY - rect.top) / rect.height) * 100;
        }
        pct = Math.max(minSize, Math.min(maxSize, pct));
        setSize(pct);
      };

      const onMouseUp = () => {
        isDragging.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [isHorizontal, minSize, maxSize]
  );

  const childArray = Array.isArray(children) ? children : [children];
  const firstChild = childArray[0];
  const secondChild = childArray[1];

  return (
    <div
      ref={(node) => {
        containerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={cn(
        'flex overflow-hidden',
        isHorizontal ? 'flex-row' : 'flex-col',
        className
      )}
      {...rest}
    >
      {/* First panel */}
      <div
        style={
          isHorizontal
            ? { width: `${size}%` }
            : { height: `${size}%` }
        }
        className="overflow-auto"
      >
        {firstChild}
      </div>

      {/* Divider handle */}
      <div
        role="separator"
        aria-orientation={orientation}
        aria-valuenow={Math.round(size)}
        aria-valuemin={minSize}
        aria-valuemax={maxSize}
        tabIndex={0}
        onMouseDown={handleMouseDown}
        onKeyDown={(e) => {
          const step = 2;
          if (
            (isHorizontal && e.key === 'ArrowLeft') ||
            (!isHorizontal && e.key === 'ArrowUp')
          ) {
            e.preventDefault();
            setSize((s) => Math.max(minSize, s - step));
          }
          if (
            (isHorizontal && e.key === 'ArrowRight') ||
            (!isHorizontal && e.key === 'ArrowDown')
          ) {
            e.preventDefault();
            setSize((s) => Math.min(maxSize, s + step));
          }
        }}
        className={cn(
          'shrink-0 bg-border hover:bg-primary active:bg-primary transition-colors',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary',
          isHorizontal
            ? 'w-1 cursor-col-resize'
            : 'h-1 cursor-row-resize'
        )}
      />

      {/* Second panel */}
      <div className="flex-1 overflow-auto">
        {secondChild}
      </div>
    </div>
  );
});

export default Splitter;
