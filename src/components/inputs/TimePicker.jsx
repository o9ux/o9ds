import { forwardRef, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import Label from '@/components/inputs/Label';
import O9Icon from '@/components/O9Icon';

import clockSvg from '@/assets/icons/o9con-clock-o.svg?raw';
import closeSvg from '@/assets/icons/o9con-close.svg?raw';
import blockerSvg from '@/assets/icons/o9con-blocker-action-filled-alt.svg?raw';
import exclamationSvg from '@/assets/icons/o9con-exclamation-triangle-filled.svg?raw';

/**
 * TimePicker — time selection input with scrollable dropdown.
 *
 * Extension of the Textbox / NumberInput / SelectDropdown bottom-border
 * design language.
 *
 * Features:
 *  - Optional Label component
 *  - Three sizes: sm (24px), md (32px), lg (40px)
 *  - Two format modes: 12-hour (HH:MM:SS AM/PM) and 24-hour
 *  - Two time formats: HH:MM:SS (showSeconds) and HH:MM
 *  - Two input variants: "input" (typeable) and "dropdown" (select only)
 *  - Separate scrollable columns for Hour, Minute, and Second
 *  - AM/PM toggle for 12-hour mode
 *  - Configurable minuteStep
 *  - Clear button on value selection
 *  - Error / Warning validation states
 *  - Disabled / ReadOnly states
 *  - Portal-based dropdown (escapes overflow:hidden parents)
 *  - Default to current system time via "Now" button
 */

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */

const focusBorderColors = {
  default: 'var(--color-interactive-border)',
  error:   'var(--color-danger)',
  warning: 'var(--color-warning)',
};

const statusBorder = {
  default: 'border-border-hover hover:border-border-strong',
  error:   'border-danger',
  warning: 'border-warning/60 hover:border-warning',
};

const statusText = {
  default: 'text-text-tertiary',
  error:   'text-danger',
  warning: 'text-warning',
};

const statusIcons = {
  error:   blockerSvg,
  warning: exclamationSvg,
};

/* Size styles — sm=24px, md=32px, lg=40px */
const sizeStyles = {
  sm: 'h-6 px-2 text-[10px]',
  md: 'h-8 px-3 text-xs',
  lg: 'h-10 px-3 text-sm',
};

/* Icon sizing — targets both the O9Icon wrapper span (w-[1em]) and the SVG inside */
const iconSize = {
  sm: '[&_span]:w-3.5 [&_span]:h-3.5 [&_svg]:h-3.5 [&_svg]:w-3.5',   // 14px
  md: '[&_span]:w-5 [&_span]:h-5 [&_svg]:h-5 [&_svg]:w-5',             // 20px
  lg: '[&_span]:w-6 [&_span]:h-6 [&_svg]:h-6 [&_svg]:w-6',             // 24px
};

const iconContainerSize = {
  sm: 'w-3.5 h-3.5',   // 14px
  md: 'w-5 h-5',         // 20px
  lg: 'w-6 h-6',         // 24px
};

/* Clock button = square filling the input height; clear button sits to its left */
const clockBtnSize = {
  sm: 'w-6 h-6',   // 24×24
  md: 'w-8 h-8',   // 32×32
  lg: 'w-10 h-10', // 40×40
};
/* Input right padding = clock button width + clear button space if any */
const inputPadRight = { sm: 'pr-10', md: 'pr-14', lg: 'pr-16' };

/* ─────────────────────────────────────────────
   Utility helpers
   ───────────────────────────────────────────── */

function generateHours(is24Hour) {
  const items = [];
  if (is24Hour) {
    for (let h = 0; h < 24; h++) items.push(String(h).padStart(2, '0'));
  } else {
    for (let h = 1; h <= 12; h++) items.push(String(h).padStart(2, '0'));
  }
  return items;
}

function generateMinutes(step = 0) {
  const items = [];
  const inc = step > 0 ? step : 1;
  for (let m = 0; m < 60; m += inc) items.push(String(m).padStart(2, '0'));
  return items;
}

function generateSeconds() {
  const items = [];
  for (let s = 0; s < 60; s++) items.push(String(s).padStart(2, '0'));
  return items;
}

/** Parse a time string into { hour24, hour12, minute, second, period } or null */
function parseTimeStr(str, is24Hour) {
  if (!str) return null;
  const cleaned = str.trim().toUpperCase();

  if (is24Hour) {
    const match = cleaned.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
    if (!match) return null;
    const h = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    const s = match[3] ? parseInt(match[3], 10) : 0;
    if (h < 0 || h > 23 || m < 0 || m > 59 || s < 0 || s > 59) return null;
    return {
      hour24: String(h).padStart(2, '0'),
      minute: String(m).padStart(2, '0'),
      second: String(s).padStart(2, '0'),
    };
  }

  const match = cleaned.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)$/);
  if (!match) return null;
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const s = match[3] ? parseInt(match[3], 10) : 0;
  const period = match[4];
  if (h < 1 || h > 12 || m < 0 || m > 59 || s < 0 || s > 59) return null;

  let h24 = h;
  if (period === 'AM' && h === 12) h24 = 0;
  else if (period === 'PM' && h !== 12) h24 = h + 12;

  return {
    hour24: String(h24).padStart(2, '0'),
    hour12: String(h).padStart(2, '0'),
    minute: String(m).padStart(2, '0'),
    second: String(s).padStart(2, '0'),
    period,
  };
}

/** Build a time string from individual parts */
function buildTimeStr(hour, minute, second, is24Hour, showSeconds, period) {
  if (is24Hour) {
    return showSeconds ? `${hour}:${minute}:${second}` : `${hour}:${minute}`;
  }
  const timePart = showSeconds ? `${hour}:${minute}:${second}` : `${hour}:${minute}`;
  return `${timePart} ${period}`;
}

/** Get current system time as a formatted string */
function getCurrentTimeStr(is24Hour, showSeconds) {
  const now = new Date();
  const h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  if (is24Hour) {
    const hh = String(h).padStart(2, '0');
    return showSeconds ? `${hh}:${m}:${s}` : `${hh}:${m}`;
  }
  const period = h < 12 ? 'AM' : 'PM';
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  const hh12 = String(h12).padStart(2, '0');
  const timePart = showSeconds ? `${hh12}:${m}:${s}` : `${hh12}:${m}`;
  return `${timePart} ${period}`;
}

/* ─────────────────────────────────────────────
   Scrollable column sub-component
   ───────────────────────────────────────────── */

function TimeColumn({ label, items, selectedValue, onSelect }) {
  const colRef = useRef(null);

  useEffect(() => {
    if (!colRef.current) return;
    const sel = colRef.current.querySelector('[data-selected="true"]');
    if (sel) sel.scrollIntoView({ block: 'center', behavior: 'instant' });
  }, [selectedValue]);

  return (
    <div className="flex flex-col min-w-0 flex-1">
      <div className="px-2 py-1 text-[10px] font-bold uppercase text-text-tertiary text-center shrink-0 border-b border-border/50">
        {label}
      </div>
      <div ref={colRef} className="max-h-[200px] overflow-auto">
        {items.map((val) => {
          const selected = val === selectedValue;
          return (
            <button
              key={val}
              type="button"
              tabIndex={-1}
              data-selected={selected || undefined}
              onClick={() => onSelect(val)}
              className={cn(
                'w-full h-7 px-2 text-xs text-center transition-colors cursor-pointer flex items-center justify-center',
                selected
                  ? 'bg-interactive text-on-interactive font-medium'
                  : 'text-text-secondary hover:bg-surface-overlay hover:text-text'
              )}
            >
              {val}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TimePicker Component
   ───────────────────────────────────────────── */

const TimePicker = forwardRef(function TimePicker(
  {
    size = 'md',
    status = 'default',
    is24Hour = true,
    showSeconds = false,
    variant = 'input',
    minuteStep = 0,
    label,
    required = false,
    optional = false,
    helperText,
    errorText,
    warningText,
    value: controlledValue,
    defaultValue,
    onChange,
    placeholder,
    disabled = false,
    readOnly = false,
    className,
    id,
  },
  ref
) {
  const inputId = id || (label ? `tp-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownId = useRef(`tp-${Math.random().toString(36).slice(2, 8)}`).current;

  /* ── Controlled / uncontrolled ── */
  const [internalValue, setInternalValue] = useState(() => defaultValue || '');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  /* ── State ── */
  const [focused, setFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 280 });
  const [activePeriod, setActivePeriod] = useState('AM');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  /* ── Column selections (track independently for column UI) ── */
  const [selHour, setSelHour] = useState('');
  const [selMinute, setSelMinute] = useState('');
  const [selSecond, setSelSecond] = useState('00');

  /* ── Derived ── */
  const isInputVariant = variant === 'input';
  const effectiveStatus = status;
  const messageText =
    effectiveStatus === 'error' ? errorText
    : effectiveStatus === 'warning' ? warningText
    : helperText;
  const messageIconSvg = statusIcons[effectiveStatus] || null;
  const showClear = !!value && !disabled && !readOnly;

  const displayPlaceholder = placeholder ?? (
    is24Hour
      ? (showSeconds ? 'HH:mm:ss' : 'HH:mm')
      : (showSeconds ? 'HH:mm:ss AM/PM' : 'HH:mm AM/PM')
  );

  /* ── Ref merge ── */
  const setInputRef = useCallback(
    (node) => {
      inputRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  /* ── Parse current value ── */
  const parsedValue = useMemo(() => parseTimeStr(value, is24Hour), [value, is24Hour]);

  /* ── Keep column selections and activePeriod in sync with value ── */
  useEffect(() => {
    if (!parsedValue) return;
    if (is24Hour) {
      setSelHour(parsedValue.hour24);
    } else {
      setSelHour(parsedValue.hour12 || parsedValue.hour24);
      if (parsedValue.period) setActivePeriod(parsedValue.period);
    }
    setSelMinute(parsedValue.minute);
    setSelSecond(parsedValue.second || '00');
  }, [parsedValue, is24Hour]);

  /* ── Generate column items ── */
  const hours = useMemo(() => generateHours(is24Hour), [is24Hour]);
  const minutes = useMemo(() => generateMinutes(minuteStep), [minuteStep]);
  const seconds = useMemo(() => generateSeconds(), []);

  /* ── Commit a value from column selections ── */
  const commitFromColumns = useCallback(
    (hour, minute, second, period) => {
      const timeStr = buildTimeStr(hour, minute, second, is24Hour, showSeconds, period);
      if (!isControlled) setInternalValue(timeStr);
      onChange?.(timeStr);
    },
    [is24Hour, showSeconds, isControlled, onChange]
  );

  /* ── Column select handlers ── */
  const handleHourSelect = useCallback(
    (h) => {
      setSelHour(h);
      const min = selMinute || '00';
      const sec = selSecond || '00';
      commitFromColumns(h, min, sec, activePeriod);
    },
    [selMinute, selSecond, activePeriod, commitFromColumns]
  );

  const handleMinuteSelect = useCallback(
    (m) => {
      setSelMinute(m);
      const hr = selHour || (is24Hour ? '00' : '12');
      const sec = selSecond || '00';
      commitFromColumns(hr, m, sec, activePeriod);
    },
    [selHour, selSecond, activePeriod, is24Hour, commitFromColumns]
  );

  const handleSecondSelect = useCallback(
    (s) => {
      setSelSecond(s);
      const hr = selHour || (is24Hour ? '00' : '12');
      const min = selMinute || '00';
      commitFromColumns(hr, min, s, activePeriod);
    },
    [selHour, selMinute, activePeriod, is24Hour, commitFromColumns]
  );

  const handlePeriodToggle = useCallback(
    (period) => {
      setActivePeriod(period);
      /* If we already have hour/minute selected, re-commit with new period */
      if (selHour) {
        const min = selMinute || '00';
        const sec = selSecond || '00';
        commitFromColumns(selHour, min, sec, period);
      }
    },
    [selHour, selMinute, selSecond, commitFromColumns]
  );

  /* ── Open / close ── */
  const openDropdown = useCallback(() => {
    if (disabled || readOnly) return;
    setIsOpen(true);
  }, [disabled, readOnly]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  /* ── Position tracking ── */
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    const updatePosition = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMenuPos({
        top: rect.bottom + 4,
        left: rect.left,
        width: Math.max(rect.width, showSeconds ? 200 : 140),
      });
    };
    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, showSeconds]);

  /* ── Click-outside ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (containerRef.current?.contains(e.target)) return;
      if (e.target.closest(`[data-dropdown-id="${dropdownId}"]`)) return;
      closeDropdown();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, dropdownId, closeDropdown]);

  /* ── Escape key ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') {
        closeDropdown();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, closeDropdown]);

  /* ── Clear ── */
  const handleClear = useCallback(
    (e) => {
      e.stopPropagation();
      if (!isControlled) setInternalValue('');
      onChange?.('');
      setInputText('');
      setIsTyping(false);
      setSelHour('');
      setSelMinute('');
      setSelSecond('00');
      requestAnimationFrame(() => inputRef.current?.focus());
    },
    [isControlled, onChange]
  );

  /* ── Set to current system time ── */
  const handleSetNow = useCallback(() => {
    const nowStr = getCurrentTimeStr(is24Hour, showSeconds);
    if (!isControlled) setInternalValue(nowStr);
    onChange?.(nowStr);
    setIsTyping(false);
    closeDropdown();
  }, [is24Hour, showSeconds, isControlled, onChange, closeDropdown]);

  /* ── Focus handlers ── */
  const handleFocus = useCallback(() => {
    setFocused(true);
    if (isInputVariant) {
      setIsTyping(true);
      setInputText(value || '');
    }
  }, [isInputVariant, value]);

  const handleBlur = useCallback((e) => {
    if (containerRef.current?.contains(e.relatedTarget)) return;
    setFocused(false);
    if (isInputVariant && isTyping) {
      setIsTyping(false);
      const trimmed = inputText.trim();
      if (!trimmed) {
        if (!isControlled) setInternalValue('');
        onChange?.('');
      } else {
        const parsed = parseTimeStr(trimmed, is24Hour);
        if (parsed) {
          const formatted = buildTimeStr(
            is24Hour ? parsed.hour24 : parsed.hour12 || parsed.hour24,
            parsed.minute,
            parsed.second || '00',
            is24Hour,
            showSeconds,
            parsed.period || activePeriod
          );
          if (!isControlled) setInternalValue(formatted);
          onChange?.(formatted);
        }
      }
    }
  }, [isInputVariant, isTyping, inputText, is24Hour, showSeconds, activePeriod, isControlled, onChange]);

  /* ── Typeable input ── */
  const handleInputChange = useCallback((e) => {
    const text = e.target.value;
    setInputText(text);
    const parsed = parseTimeStr(text, is24Hour);
    if (parsed) {
      const formatted = buildTimeStr(
        is24Hour ? parsed.hour24 : parsed.hour12 || parsed.hour24,
        parsed.minute,
        parsed.second || '00',
        is24Hour,
        showSeconds,
        parsed.period || activePeriod
      );
      if (!isControlled) setInternalValue(formatted);
      onChange?.(formatted);
      if (parsed.period) setActivePeriod(parsed.period);
    }
  }, [is24Hour, showSeconds, activePeriod, isControlled, onChange]);

  /* ── Keyboard on input ── */
  const handleInputKeyDown = useCallback(
    (e) => {
      if (disabled || readOnly) return;
      if (isInputVariant) {
        if (e.key === 'Enter') {
          const parsed = parseTimeStr(inputText, is24Hour);
          if (parsed) {
            const formatted = buildTimeStr(
              is24Hour ? parsed.hour24 : parsed.hour12 || parsed.hour24,
              parsed.minute,
              parsed.second || '00',
              is24Hour,
              showSeconds,
              parsed.period || activePeriod
            );
            if (!isControlled) setInternalValue(formatted);
            onChange?.(formatted);
            setIsTyping(false);
            if (isOpen) closeDropdown();
          }
          return;
        }
        if (e.key === 'ArrowDown' && !isOpen) {
          e.preventDefault();
          openDropdown();
          return;
        }
      } else {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!isOpen) openDropdown();
        }
      }
    },
    [disabled, readOnly, isInputVariant, isOpen, openDropdown, closeDropdown, inputText, is24Hour, showSeconds, activePeriod, isControlled, onChange]
  );

  /* ── Display value ── */
  const displayValue = isInputVariant && isTyping ? inputText : value;

  return (
    <>
      <div className={cn('flex flex-col gap-1', className)}>
        {/* Label */}
        {label && (
          <Label
            htmlFor={inputId}
            size={size}
            required={required}
            optional={optional}
            disabled={disabled}
          >
            {label}
          </Label>
        )}

        {/* Input container — bottom-border pattern */}
        <div
          ref={containerRef}
          className={cn(
            'relative flex items-center border-b',
            'bg-surface-input hover:bg-surface-input-hover transition-[background-color] duration-100',
            !focused && statusBorder[effectiveStatus],
            disabled && 'opacity-50 pointer-events-none border-border-disabled bg-surface-input',
            readOnly && 'border-dashed border-border-strong cursor-default'
          )}
          style={
            focused && !disabled
              ? { borderBottomColor: focusBorderColors[effectiveStatus] }
              : undefined
          }
        >
          <input
            ref={setInputRef}
            id={inputId}
            type="text"
            readOnly={!isInputVariant || readOnly}
            value={displayValue}
            onChange={isInputVariant ? handleInputChange : undefined}
            placeholder={displayPlaceholder}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleInputKeyDown}
            onClick={() => {
              if (disabled || readOnly) return;
              if (!isInputVariant) {
                isOpen ? closeDropdown() : openDropdown();
              }
            }}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls={isOpen ? `${dropdownId}-panel` : undefined}
            style={{ outline: 'none' }}
            className={cn(
              'w-full bg-transparent text-text placeholder:text-text-placeholder',
              !isInputVariant && 'cursor-pointer',
              sizeStyles[size],
              inputPadRight[size],
              readOnly && 'cursor-default'
            )}
          />

          {/* Clear button — positioned to the left of the clock button */}
          {showClear && (
            <button
              type="button"
              tabIndex={-1}
              onClick={handleClear}
              className={cn(
                'absolute flex items-center justify-center text-text-tertiary hover:text-text cursor-pointer transition-colors',
                iconContainerSize[size],
                iconSize[size],
                /* Position to the left of the clock button */
                size === 'sm' && 'right-7',
                size === 'md' && 'right-10',
                size === 'lg' && 'right-12',
              )}
              aria-label="Clear time"
            >
              <span className={cn('shrink-0 flex items-center justify-center', iconContainerSize[size], iconSize[size])}>
                <O9Icon svg={closeSvg} />
              </span>
            </button>
          )}

          {/* Clock icon button — square, fills input height, flush right */}
          {!readOnly && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => {
                if (disabled) return;
                isOpen ? closeDropdown() : openDropdown();
              }}
              className={cn(
                'absolute right-0 top-0 flex items-center justify-center text-text-tertiary hover:text-text hover:bg-surface-input-hover cursor-pointer transition-colors',
                clockBtnSize[size],
                iconSize[size]
              )}
              aria-label="Open time picker"
            >
              <O9Icon svg={clockSvg} />
            </button>
          )}
        </div>

        {/* Footer message */}
        {messageText && (
          <p className={cn('text-xs flex items-center gap-1', statusText[effectiveStatus])}>
            {messageIconSvg && (
              <span className="shrink-0 w-3 h-3 [&_svg]:h-3 [&_svg]:w-3 flex items-center justify-center">
                <O9Icon svg={messageIconSvg} />
              </span>
            )}
            <span>{messageText}</span>
          </p>
        )}
      </div>

      {/* ── Portal dropdown ── */}
      {isOpen &&
        !disabled &&
        !readOnly &&
        createPortal(
          <div
            ref={dropdownRef}
            id={`${dropdownId}-panel`}
            data-dropdown-id={dropdownId}
            role="listbox"
            aria-label="Select a time"
            className="bg-surface-raised border border-border shadow-down"
            style={{
              position: 'fixed',
              top: `${menuPos.top}px`,
              left: `${menuPos.left}px`,
              width: `${menuPos.width}px`,
              zIndex: 9999,
            }}
          >
            {/* ── AM/PM toggle (12-hour mode only) ── */}
            {!is24Hour && (
              <div className="flex items-center px-2 py-2 border-b border-border">
                <div className="flex h-7 rounded overflow-hidden border border-border">
                  {['AM', 'PM'].map((period) => (
                    <button
                      key={period}
                      type="button"
                      tabIndex={-1}
                      onClick={() => handlePeriodToggle(period)}
                      className={cn(
                        'px-3 text-xs font-medium transition-colors cursor-pointer',
                        activePeriod === period
                          ? 'bg-interactive text-on-interactive'
                          : 'bg-transparent text-text-secondary hover:bg-surface-overlay hover:text-text'
                      )}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Separate columns for Hr / Min / Sec ── */}
            <div className="flex divide-x divide-border">
              <TimeColumn
                label="Hr"
                items={hours}
                selectedValue={selHour}
                onSelect={handleHourSelect}
              />
              <TimeColumn
                label="Min"
                items={minutes}
                selectedValue={selMinute}
                onSelect={handleMinuteSelect}
              />
              {showSeconds && (
                <TimeColumn
                  label="Sec"
                  items={seconds}
                  selectedValue={selSecond}
                  onSelect={handleSecondSelect}
                />
              )}
            </div>

            {/* ── Now quick-select footer ── */}
            <div className="px-3 py-2 border-t border-border">
              <button
                type="button"
                tabIndex={-1}
                onClick={handleSetNow}
                className="text-xs text-primary hover:underline cursor-pointer"
              >
                Now
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
});

export default TimePicker;
