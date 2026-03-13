import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/utils/cn';

/**
 * Tooltip — a small informational label that appears on hover/focus.
 *
 * @param {ReactNode} props.content   — tooltip text or node
 * @param {'top'|'bottom'|'left'|'right'} props.placement
 * @param {number}   props.delay      — show delay in ms (default 400)
 * @param {string}   props.className  — applied to the trigger wrapper
 * @param {ReactNode} props.children  — the trigger element
 */
export default function Tooltip({
  content,
  placement = 'top',
  delay = 400,
  className,
  children,
}) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const placementStyles = {
    top:    'bottom-full left-1/2 -translate-x-1/2 mb-1.5',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-1.5',
    left:   'right-full top-1/2 -translate-y-1/2 mr-1.5',
    right:  'left-full top-1/2 -translate-y-1/2 ml-1.5',
  };

  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}

      {visible && content && (
        <span
          role="tooltip"
          className={cn(
            'pointer-events-none absolute z-50 whitespace-nowrap',
            'bg-surface-menu border border-border px-2.5 py-1.5',
            'text-xs text-text shadow-lg',
            placementStyles[placement]
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}
