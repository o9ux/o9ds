import { forwardRef, useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';

import minusSvg from '@/assets/icons/o9con-minus.svg?raw';
import plusSvg from '@/assets/icons/o9con-plus.svg?raw';
import blockerSvg from '@/assets/icons/o9con-blocker-action-filled-alt.svg?raw';
import checkCircleSvg from '@/assets/icons/o9con-check-circle.svg?raw';
import exclamationSvg from '@/assets/icons/o9con-exclamation-triangle-filled.svg?raw';

/**
 * NumberInput — numeric input with horizontal -/+ stepper buttons.
 *
 * Interactions:
 *  • Click -/+ buttons to step value
 *  • Press-and-hold -/+ for smooth continuous adjustment
 *  • Keyboard: ArrowUp / ArrowDown / + / - to step while focused
 *  • Mouse drag left-right on the input to scrub the value
 *
 * Built on the same visual patterns as the Textbox component.
 */

/* ── Status trailing icons ── */
const statusIcons = {
  error: blockerSvg,
  success: checkCircleSvg,
  warning: exclamationSvg,
};

/* ── Focus border colors per status (matches Textbox) ── */
const focusBorderColors = {
  default: 'var(--color-interactive-border)',
  error:   'var(--color-danger)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
};

/* ── Size variants (identical to Textbox) ── */
const sizeStyles = {
  sm: 'h-6 px-2 text-xs',
  md: 'h-8 px-3 text-xs',
  lg: 'h-10 px-3 text-sm',
};

/* ── Icon sizes per input size (uses text-[size] so O9Icon's 1em sizing works) ── */
const iconSize = {
  sm: 'text-[12px]',
  md: 'text-[14px]',
  lg: 'text-[16px]',
};

/* ── Stepper button sizes (square, matching input height) ── */
const btnSize = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

/* ── Right padding on input: status-icon space + 4px gap + two buttons ── */
const padRightWithStatus = { sm: 'pr-[64px]', md: 'pr-[80px]', lg: 'pr-[96px]' };
const padRightNoStatus   = { sm: 'pr-[48px]', md: 'pr-[64px]', lg: 'pr-[80px]' };

/* ── Status icon position from right: two buttons width + 4px gap ── */
const statusIconRight = { sm: 'right-[52px]', md: 'right-[68px]', lg: 'right-[84px]' };

/* ── Status border colors (matches Textbox) ── */
const statusBorder = {
  default: 'border-border-hover hover:border-border-strong',
  error:   'border-danger',
  success: 'border-success/60 hover:border-success',
  warning: 'border-warning/60 hover:border-warning',
};

/* ── Status text colors (matches Textbox) ── */
const statusText = {
  default: 'text-text-tertiary',
  error:   'text-danger',
  success: 'text-success',
  warning: 'text-warning',
};

/* ── Drag sensitivity: pixels per step ── */
const DRAG_PX_PER_STEP = 4;

const NumberInput = forwardRef(function NumberInput(
  {
    size = 'md',
    status = 'default',
    label,
    helperText,
    errorText,
    min,
    max,
    step = 1,
    value: controlledValue,
    defaultValue = 0,
    onChange,
    disabled = false,
    readOnly = false,
    placeholder,
    className,
    id,
    ...rest
  },
  ref
) {
  const inputId =
    id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  /* ── Focus tracking ── */
  const [focused, setFocused] = useState(false);

  /* ── Drag state ── */
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startVal: 0, accumulated: 0 });

  /* ── Hold-to-repeat refs ── */
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const valueRef = useRef(value);
  valueRef.current = value;

  const inputRef = useRef(null);
  const mergedRef = useCallback(
    (node) => {
      inputRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  /* ── Clamp + round + emit ── */
  const updateValue = useCallback(
    (newVal) => {
      let clamped = newVal;
      if (min !== undefined) clamped = Math.max(min, clamped);
      if (max !== undefined) clamped = Math.min(max, clamped);
      const rounded = Math.round(clamped / step) * step;
      const final = parseFloat(Math.min(max ?? Infinity, Math.max(min ?? -Infinity, rounded)).toFixed(10));
      if (!isControlled) setInternalValue(final);
      onChange?.({ target: { value: final } });
    },
    [min, max, step, isControlled, onChange]
  );

  /* ── Press-and-hold ── */
  const startHold = useCallback(
    (delta) => {
      updateValue(Number(valueRef.current) + delta);
      timeoutRef.current = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          updateValue(Number(valueRef.current) + delta);
        }, 80);
      }, 400);
    },
    [updateValue]
  );

  /* ── Input change ── */
  const handleChange = (e) => {
    const num = parseFloat(e.target.value);
    if (!isNaN(num)) {
      updateValue(num);
    } else if (e.target.value === '' || e.target.value === '-') {
      if (!isControlled) setInternalValue(e.target.value);
    }
  };

  /* ── Focus / blur ── */
  const handleFocus = (e) => {
    setFocused(true);
    rest.onFocus?.(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    rest.onBlur?.(e);
  };

  /* ── Keyboard: ArrowUp/Down and +/- keys ── */
  const handleKeyDown = (e) => {
    if (readOnly || disabled) return;

    let handled = false;
    if (e.key === 'ArrowUp' || e.key === '+') {
      e.preventDefault();
      updateValue(Number(valueRef.current) + step);
      handled = true;
    } else if (e.key === 'ArrowDown' || e.key === '-') {
      // Allow '-' when the field is empty or at start for negative numbers
      if (e.key === '-' && (e.target.value === '' || e.target.selectionStart === 0)) {
        return; // let the minus character be typed normally
      }
      e.preventDefault();
      updateValue(Number(valueRef.current) - step);
      handled = true;
    }

    if (handled) return;
    rest.onKeyDown?.(e);
  };

  /* ── Mouse drag left/right to scrub value ── */
  const handleMouseDown = (e) => {
    if (readOnly || disabled || e.button !== 0) return;
    // Only initiate drag on middle part of input (not on text selection)
    // We'll track the drag and only activate after a small threshold
    dragRef.current = {
      startX: e.clientX,
      startVal: Number(valueRef.current) || 0,
      accumulated: 0,
      active: false,
    };

    const onMouseMove = (ev) => {
      const dx = ev.clientX - dragRef.current.startX;
      // Activate drag after 3px threshold to avoid conflicts with text selection
      if (!dragRef.current.active && Math.abs(dx) > 3) {
        dragRef.current.active = true;
        setDragging(true);
        // Prevent text selection during drag
        ev.preventDefault();
        document.body.style.cursor = 'ew-resize';
        document.body.style.userSelect = 'none';
      }

      if (dragRef.current.active) {
        ev.preventDefault();
        const steps = Math.trunc(dx / DRAG_PX_PER_STEP);
        const newVal = dragRef.current.startVal + steps * step;
        updateValue(newVal);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragRef.current.active) {
        setDragging(false);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const atMin = min !== undefined && Number(value) <= min;
  const atMax = max !== undefined && Number(value) >= max;

  const hasStatusIcon = statusIcons[status] !== undefined;
  const messageIconSvg = statusIcons[status] || null;
  const messageText = status === 'error' ? errorText : helperText;
  const showStepper = !readOnly && !disabled;

  /* Pick the right padding — accounts for status icon + two buttons */
  const inputPadRight = showStepper
    ? (hasStatusIcon ? padRightWithStatus[size] : padRightNoStatus[size])
    : undefined;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            'text-xs font-medium',
            disabled ? 'text-text-disabled' : 'text-text-secondary'
          )}
        >
          {label}
        </label>
      )}

      {/* Input container — bottom-border, same as Textbox */}
      <div
        className={cn(
          'relative flex items-center border-b',
          'bg-surface-input hover:bg-surface-input-hover transition-[background-color] duration-100',
          !focused && statusBorder[status],
          disabled && 'opacity-50 pointer-events-none border-border-disabled bg-surface-input',
          readOnly && 'border-dashed border-border-strong cursor-default',
          dragging && 'cursor-ew-resize'
        )}
        style={
          focused && !disabled
            ? { borderBottomColor: focusBorderColors[status] }
            : undefined
        }
      >
        <input
          ref={mergedRef}
          id={inputId}
          type="number"
          inputMode="numeric"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          role="spinbutton"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={typeof value === 'number' ? value : undefined}
          aria-invalid={status === 'error' || undefined}
          aria-describedby={messageText ? `${inputId}-msg` : undefined}
          style={{ outline: 'none' }}
          className={cn(
            'w-full bg-transparent text-text placeholder:text-text-placeholder tabular-nums',
            'appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
            '[&::-moz-appearance]:textfield',
            sizeStyles[size],
            inputPadRight,
            dragging && 'cursor-ew-resize select-none'
          )}
          {...rest}
        />

        {/* Status icon — sits between input text and buttons */}
        {hasStatusIcon && showStepper && (
          <span
            className={cn(
              'pointer-events-none absolute flex shrink-0 items-center justify-center',
              statusText[status],
              statusIconRight[size],
              iconSize[size]
            )}
          >
            <O9Icon svg={statusIcons[status]} />
          </span>
        )}

        {/* Horizontal -/+ stepper buttons */}
        {showStepper && (
          <div className="absolute right-0 top-0 bottom-0 flex items-stretch">
            {/* Minus button */}
            <button
              type="button"
              tabIndex={-1}
              disabled={atMin}
              onClick={() => updateValue(Number(value) - step)}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!atMin) startHold(-step);
              }}
              onMouseUp={clearTimers}
              onMouseLeave={clearTimers}
              onTouchStart={() => {
                if (!atMin) startHold(-step);
              }}
              onTouchEnd={clearTimers}
              className={cn(
                'flex items-center justify-center border-l border-border-form',
                'text-text-tertiary hover:text-text hover:bg-interactive-subtle transition-colors cursor-pointer',
                'disabled:opacity-35 disabled:pointer-events-none',
                btnSize[size]
              )}
              aria-label="Decrease value"
            >
              <span className={cn('flex items-center justify-center', iconSize[size])}>
                <O9Icon svg={minusSvg} />
              </span>
            </button>

            {/* Separator */}
            <div className="w-px bg-border-form self-stretch" />

            {/* Plus button */}
            <button
              type="button"
              tabIndex={-1}
              disabled={atMax}
              onClick={() => updateValue(Number(value) + step)}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!atMax) startHold(step);
              }}
              onMouseUp={clearTimers}
              onMouseLeave={clearTimers}
              onTouchStart={() => {
                if (!atMax) startHold(step);
              }}
              onTouchEnd={clearTimers}
              className={cn(
                'flex items-center justify-center',
                'text-text-tertiary hover:text-text hover:bg-interactive-subtle transition-colors cursor-pointer',
                'disabled:opacity-35 disabled:pointer-events-none',
                btnSize[size]
              )}
              aria-label="Increase value"
            >
              <span className={cn('flex items-center justify-center', iconSize[size])}>
                <O9Icon svg={plusSvg} />
              </span>
            </button>
          </div>
        )}

        {/* Status icon when stepper is hidden (readOnly / disabled) */}
        {hasStatusIcon && !showStepper && (
          <span
            className={cn(
              'pointer-events-none absolute flex shrink-0 items-center justify-center',
              statusText[status],
              size === 'sm' ? 'right-2' : 'right-3',
              iconSize[size]
            )}
          >
            <O9Icon svg={statusIcons[status]} />
          </span>
        )}
      </div>

      {/* Status / helper message */}
      {messageText && (
        <p
          id={messageText ? `${inputId}-msg` : undefined}
          className={cn('text-xs flex items-center gap-1', statusText[status])}
          role={status === 'error' ? 'alert' : undefined}
        >
          {messageIconSvg && (
            <span className="shrink-0 w-3 h-3 [&_svg]:h-3 [&_svg]:w-3 flex items-center justify-center">
              <O9Icon svg={messageIconSvg} />
            </span>
          )}
          <span>{messageText}</span>
        </p>
      )}
    </div>
  );
});

export default NumberInput;
