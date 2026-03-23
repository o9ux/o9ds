import { forwardRef, useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/utils/cn';
import IconButton from '@/components/buttons/IconButton';
import O9Icon from '@/components/O9Icon';

import minusSvg from '@/assets/icons/o9con-minus.svg?raw';
import plusSvg from '@/assets/icons/o9con-plus.svg?raw';

/* Visual track thickness in pixels */
const trackH = { sm: 2, md: 3, lg: 4 };

/* Box thumb pixel dimensions — square knob */
const thumbDim = {
  sm: { w: 8, h: 14 },
  md: { w: 10, h: 16 },
  lg: { w: 12, h: 20 },
};

/* Interactive hit-area height */
const areaH = { sm: 24, md: 28, lg: 32 };

/* Map slider sizes to IconButton sizes */
const ibSize = { sm: 'sm', md: 'md', lg: 'lg' };

/* Pixel widths of each IconButton size + gap-2 (8px) for range-label indent */
const btnWidth = { sm: 24, md: 32, lg: 36 };
const gapPx = 8;

const Slider = forwardRef(function Slider(
  {
    size = 'md',
    min = 0,
    max = 100,
    step = 1,
    value: controlledValue,
    defaultValue,
    onChange,
    label,
    showValue = false,
    showRange = false,
    showButtons = true,
    tooltipFormat,
    disabled = false,
    className,
    id,
    ...rest
  },
  ref
) {
  const inputId =
    id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const [internalValue, setInternalValue] = useState(
    () => defaultValue ?? min
  );
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const valueRef = useRef(value);
  valueRef.current = value;

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

  const percentage = max === min ? 0 : ((value - min) / (max - min)) * 100;

  const updateValue = useCallback(
    (newVal) => {
      const clamped = Math.min(max, Math.max(min, newVal));
      const rounded = Math.round(clamped / step) * step;
      const final = Math.min(
        max,
        Math.max(min, parseFloat(rounded.toFixed(10)))
      );
      if (!isControlled) setInternalValue(final);
      onChange?.({ target: { value: final } });
    },
    [min, max, step, isControlled, onChange]
  );

  const handleRangeChange = (e) => {
    const num = Number(e.target.value);
    if (!isControlled) setInternalValue(num);
    onChange?.(e);
  };

  /* Press-and-hold: first tick, then after 400ms repeat every 80ms */
  const startHold = useCallback(
    (delta) => {
      updateValue(valueRef.current + delta);
      timeoutRef.current = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          updateValue(valueRef.current + delta);
        }, 80);
      }, 400);
    },
    [updateValue]
  );

  const atMin = value <= min;
  const atMax = value >= max;

  /* ── Tooltip on thumb when showValue is off ── */
  const showThumbTooltip = !showValue && !disabled;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const tw = thumbDim[size].w;
  const th = thumbDim[size].h;

  /* Indent for range labels to align with track start/end */
  const rangeIndent = showButtons ? btnWidth[size] + gapPx : 0;

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Optional label and value header — aligned with track edges */}
      {(label || showValue) && (
        <div
          className="flex items-center justify-between mb-1"
          style={{
            paddingLeft: rangeIndent,
            paddingRight: rangeIndent,
          }}
        >
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
          {showValue && (
            <span
              className={cn(
                'text-xs tabular-nums',
                disabled ? 'text-text-disabled' : 'text-text'
              )}
            >
              {value}
            </span>
          )}
        </div>
      )}

      {/* Slider row: optional minus button, track, optional plus button */}
      <div className="flex items-center gap-2">
        {/* Minus button */}
        {showButtons && (
          <IconButton
            variant="secondary"
            size={ibSize[size]}
            type="button"
            tabIndex={-1}
            disabled={disabled || atMin}
            onClick={() => updateValue(value - step)}
            onMouseDown={(e) => {
              e.preventDefault();
              if (!atMin) startHold(-step);
            }}
            onMouseUp={clearTimers}
            onMouseLeave={clearTimers}
            onTouchStart={() => {
              if (!atMin) startHold(-step);
            }}
            onTouchEnd={clearTimers}
            aria-label="Decrease"
          >
            <O9Icon svg={minusSvg} />
          </IconButton>
        )}

        {/* Track area */}
        <div
          className={cn(
            'relative flex-1 flex items-center',
            disabled && 'opacity-50'
          )}
          style={{ height: areaH[size] }}
        >
          {/* Native range input — transparent overlay for drag + keyboard */}
          <input
            ref={ref}
            type="range"
            id={inputId}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleRangeChange}
            disabled={disabled}
            onMouseEnter={() => showThumbTooltip && setTooltipOpen(true)}
            onMouseLeave={() => setTooltipOpen(false)}
            onFocus={() => showThumbTooltip && setTooltipOpen(true)}
            onBlur={() => setTooltipOpen(false)}
            className={cn(
              'peer absolute inset-0 w-full opacity-0 cursor-pointer z-10',
              'disabled:pointer-events-none'
            )}
            style={{ height: areaH[size] }}
            {...rest}
          />

          {/* Background track — subtle */}
          <div
            className="absolute bg-border-form"
            style={{
              left: tw / 2,
              right: tw / 2,
              height: trackH[size],
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />

          {/* Progress bar — interactive color */}
          <div
            className="absolute bg-interactive"
            style={{
              left: tw / 2,
              width: `calc(${percentage}% - ${(tw * percentage) / 100}px)`,
              height: trackH[size],
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />

          {/* Box thumb — square knob */}
          <div
            className={cn(
              'absolute bg-interactive pointer-events-none',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-interactive-border/50 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-surface'
            )}
            style={{
              width: tw,
              height: th,
              left: `calc(${percentage}% - ${(tw * percentage) / 100}px)`,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />

          {/* Value tooltip — positioned above thumb, uses Tooltip design tokens */}
          {showThumbTooltip && tooltipOpen && (
            <div
              className="absolute pointer-events-none"
              style={{
                left: `calc(${percentage}% - ${(tw * percentage) / 100}px + ${tw / 2}px)`,
                top: `calc(50% - ${th / 2}px - 6px)`,
                transform: 'translate(-50%, -100%)',
                zIndex: 20,
              }}
            >
              <span
                role="tooltip"
                className="inline-flex items-center whitespace-nowrap px-1.5 py-1 text-xs font-medium tabular-nums bg-[var(--color-tooltip)] text-[var(--color-tooltip-fg)] shadow-[0px_2px_4px_0px_rgba(16,16,16,0.14),0px_0px_2px_0px_rgba(16,16,16,0.12)]"
              >
                {tooltipFormat ? tooltipFormat(value) : value}
              </span>
            </div>
          )}
        </div>

        {/* Plus button */}
        {showButtons && (
          <IconButton
            variant="secondary"
            size={ibSize[size]}
            type="button"
            tabIndex={-1}
            disabled={disabled || atMax}
            onClick={() => updateValue(value + step)}
            onMouseDown={(e) => {
              e.preventDefault();
              if (!atMax) startHold(step);
            }}
            onMouseUp={clearTimers}
            onMouseLeave={clearTimers}
            onTouchStart={() => {
              if (!atMax) startHold(step);
            }}
            onTouchEnd={clearTimers}
            aria-label="Increase"
          >
            <O9Icon svg={plusSvg} />
          </IconButton>
        )}
      </div>

      {/* Min / Max range labels — aligned with track edges */}
      {showRange && (
        <div
          className="flex justify-between"
          style={{
            paddingLeft: rangeIndent,
            paddingRight: rangeIndent,
          }}
        >
          <span
            className={cn(
              'text-[10px] tabular-nums',
              disabled ? 'text-text-disabled' : 'text-text-tertiary'
            )}
          >
            {min}
          </span>
          <span
            className={cn(
              'text-[10px] tabular-nums',
              disabled ? 'text-text-disabled' : 'text-text-tertiary'
            )}
          >
            {max}
          </span>
        </div>
      )}
    </div>
  );
});

export default Slider;
