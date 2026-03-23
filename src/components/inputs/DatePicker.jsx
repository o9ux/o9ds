import { forwardRef, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import Label from '@/components/inputs/Label';
import O9Icon from '@/components/O9Icon';
import ButtonGroup from '@/components/buttons/ButtonGroup';
import IconButton from '@/components/buttons/IconButton';

import calendarSvg from '@/assets/icons/o9con-calendar-o.svg?raw';
import closeSvg from '@/assets/icons/o9con-close.svg?raw';
import angleLeftSvg from '@/assets/icons/o9con-angle-left.svg?raw';
import angleRightSvg from '@/assets/icons/o9con-angle-right.svg?raw';
import blockerSvg from '@/assets/icons/o9con-blocker-action-filled-alt.svg?raw';
import exclamationSvg from '@/assets/icons/o9con-exclamation-triangle-filled.svg?raw';

/**
 * DatePicker — calendar dropdown for date selection.
 *
 * Built on the Textbox/SelectDropdown bottom-border design language.
 * Supports DD-MM-YYYY / MM-DD-YYYY formats, three sizes, validation
 * states, min/max constraints, and input/calendar variants.
 *
 * variant="input"    — user can type dates directly AND use calendar
 * variant="calendar" — input is readOnly, select from calendar only
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

/* Size styles — match SelectDropdown (sm=28px, md=32px, lg=40px) */
const sizeStyles = {
  sm: 'h-7 px-2 text-xs',
  md: 'h-8 px-3 text-xs',
  lg: 'h-10 px-3 text-sm',
};

/* Icon sizes per input size */
const iconSize = {
  sm: '[&_svg]:h-3 [&_svg]:w-3',
  md: '[&_svg]:h-3.5 [&_svg]:w-3.5',
  lg: '[&_svg]:h-4 [&_svg]:w-4',
};

const iconContainerSize = {
  sm: 'w-3 h-3',
  md: 'w-3.5 h-3.5',
  lg: 'w-4 h-4',
};

/* Trailing area positioning */
const trailingRight = { sm: 'right-2', md: 'right-3', lg: 'right-3' };
const inputPadRight = { sm: 'pr-14', md: 'pr-16', lg: 'pr-18' };

/* Calendar constants */
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/* ─────────────────────────────────────────────
   Utility Functions
   ───────────────────────────────────────────── */

function formatDateStr(date, fmt) {
  if (!date) return '';
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return fmt === 'MM-DD-YYYY' ? `${m}-${d}-${y}` : `${d}-${m}-${y}`;
}

function parseDateStr(str, fmt) {
  if (!str) return null;
  const parts = str.split('-').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return null;
  const [a, b, y] = parts;
  const [day, month] = fmt === 'MM-DD-YYYY' ? [b, a] : [a, b];
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const date = new Date(y, month - 1, day);
  /* Validate — e.g. reject Feb 30 */
  if (date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return date;
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay();
}

function getISOWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/* ─────────────────────────────────────────────
   DatePicker Component
   ───────────────────────────────────────────── */

const DatePicker = forwardRef(function DatePicker(
  {
    size = 'md',
    status = 'default',
    format = 'DD-MM-YYYY',
    variant = 'input',
    label,
    required = false,
    optional = false,
    helperText,
    errorText,
    warningText,
    value: controlledValue,
    onChange,
    placeholder,
    disabled = false,
    readOnly = false,
    min,
    max,
    className,
    id,
  },
  ref
) {
  const inputId = id || (label ? `dp-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownId = useRef(`dp-${Math.random().toString(36).slice(2, 8)}`).current;

  /* ── Controlled / uncontrolled ── */
  const [internalValue, setInternalValue] = useState('');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  /* ── Focus & dropdown state ── */
  const [focused, setFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 280 });

  /* ── Calendar view state ── */
  const today = useMemo(() => new Date(), []);
  const selectedDate = useMemo(() => parseDateStr(value, format), [value, format]);
  const [viewYear, setViewYear] = useState(selectedDate?.getFullYear() || today.getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDate?.getMonth() ?? today.getMonth());
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  /* ── Typeable input state (variant="input") ── */
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  /* ── Min/Max ── */
  const minDate = useMemo(() => parseDateStr(min, format), [min, format]);
  const maxDate = useMemo(() => parseDateStr(max, format), [max, format]);

  /* ── Ref merge ── */
  const setInputRef = useCallback(
    (node) => {
      inputRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  /* ── Derived ── */
  const effectiveStatus = status;
  const messageText =
    effectiveStatus === 'error' ? errorText
    : effectiveStatus === 'warning' ? warningText
    : helperText;
  const messageIconSvg = statusIcons[effectiveStatus] || null;
  const showClear = !!value && !disabled && !readOnly;
  const displayPlaceholder = placeholder ?? format;
  const isInputVariant = variant === 'input';

  /* ── Open / close ── */
  const openDropdown = useCallback(() => {
    if (disabled || readOnly) return;
    const ref = selectedDate || today;
    setViewYear(ref.getFullYear());
    setViewMonth(ref.getMonth());
    setShowMonthPicker(false);
    setIsOpen(true);
  }, [disabled, readOnly, selectedDate, today]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setShowMonthPicker(false);
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
        width: Math.max(rect.width, 300),
      });
    };
    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

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
        if (showMonthPicker) {
          setShowMonthPicker(false);
        } else {
          closeDropdown();
          inputRef.current?.focus();
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, showMonthPicker, closeDropdown]);

  /* ── Date selection ── */
  const handleSelectDate = useCallback(
    (dateObj) => {
      const formatted = formatDateStr(dateObj, format);
      if (!isControlled) setInternalValue(formatted);
      onChange?.(formatted);
      setIsTyping(false);
      closeDropdown();
      requestAnimationFrame(() => inputRef.current?.focus());
    },
    [format, isControlled, onChange, closeDropdown]
  );

  /* ── Clear ── */
  const handleClear = useCallback(
    (e) => {
      e.stopPropagation();
      if (!isControlled) setInternalValue('');
      onChange?.('');
      setInputText('');
      setIsTyping(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    },
    [isControlled, onChange]
  );

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
      /* Commit typed value */
      const trimmed = inputText.trim();
      if (!trimmed) {
        /* User cleared the field */
        if (!isControlled) setInternalValue('');
        onChange?.('');
      } else {
        const parsed = parseDateStr(trimmed, format);
        if (parsed && !isDateDisabledFn(parsed)) {
          const formatted = formatDateStr(parsed, format);
          if (!isControlled) setInternalValue(formatted);
          onChange?.(formatted);
        }
        /* If invalid, revert silently (value stays unchanged) */
      }
    }
  }, [isInputVariant, isTyping, inputText, format, isControlled, onChange]);

  /* ── Typeable input change ── */
  const handleInputChange = useCallback((e) => {
    const text = e.target.value;
    setInputText(text);
    /* Try to parse as-you-type: if valid, sync calendar and emit */
    const parsed = parseDateStr(text, format);
    if (parsed && !isDateDisabledFn(parsed)) {
      setViewYear(parsed.getFullYear());
      setViewMonth(parsed.getMonth());
      const formatted = formatDateStr(parsed, format);
      if (!isControlled) setInternalValue(formatted);
      onChange?.(formatted);
    }
  }, [format, isControlled, onChange]);

  /* ── Month/year navigation ── */
  const prevMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 0) { setViewYear((y) => y - 1); return 11; }
      return m - 1;
    });
  }, []);

  const nextMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 11) { setViewYear((y) => y + 1); return 0; }
      return m + 1;
    });
  }, []);

  const incrementYear = useCallback(() => setViewYear((y) => y + 1), []);
  const decrementYear = useCallback(() => setViewYear((y) => y - 1), []);

  /* ── Keyboard on input ── */
  const handleInputKeyDown = useCallback(
    (e) => {
      if (disabled || readOnly) return;
      if (isInputVariant) {
        if (e.key === 'Enter') {
          /* Commit typed value */
          const parsed = parseDateStr(inputText, format);
          if (parsed && !isDateDisabledFn(parsed)) {
            const formatted = formatDateStr(parsed, format);
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
        /* variant="calendar" — open on Enter/Space/ArrowDown */
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!isOpen) openDropdown();
        }
      }
    },
    [disabled, readOnly, isInputVariant, isOpen, openDropdown, closeDropdown, inputText, format, isControlled, onChange]
  );

  /* ── Check if date is disabled ── */
  const isDateDisabledFn = useCallback(
    (dateObj) => {
      if (minDate && dateObj < minDate) return true;
      if (maxDate && dateObj > maxDate) return true;
      return false;
    },
    [minDate, maxDate]
  );

  /* ── Build calendar grid ── */
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  /* ── Week rows (always shown) ── */
  const weekRows = useMemo(() => {
    const rows = [];
    const total = [...cells];
    while (total.length % 7 !== 0) total.push(null);
    for (let i = 0; i < total.length; i += 7) {
      const row = total.slice(i, i + 7);
      const firstDayInRow = row.find((d) => d !== null);
      const weekNum = firstDayInRow
        ? getISOWeekNumber(new Date(viewYear, viewMonth, firstDayInRow))
        : null;
      rows.push({ weekNum, days: row });
    }
    return rows;
  }, [cells, viewYear, viewMonth]);

  /* ── Day cell renderer ── */
  const renderDayCell = (day, key) => {
    if (day === null) return <div key={key} className="h-8" />;
    const dateObj = new Date(viewYear, viewMonth, day);
    const selected = isSameDay(dateObj, selectedDate);
    const isToday = isSameDay(dateObj, today);
    const dateDisabled = isDateDisabledFn(dateObj);

    return (
      <button
        key={key}
        type="button"
        tabIndex={-1}
        disabled={dateDisabled}
        onClick={() => handleSelectDate(dateObj)}
        className={cn(
          'h-8 w-8 flex items-center justify-center rounded text-xs transition-colors cursor-pointer mx-auto',
          selected
            ? 'bg-interactive text-on-interactive font-bold'
            : isToday
              ? 'border border-interactive-border/30 text-text hover:bg-surface-overlay'
              : 'text-text-secondary hover:bg-surface-overlay hover:text-text',
          dateDisabled && 'opacity-30 pointer-events-none'
        )}
      >
        {day}
      </button>
    );
  };

  /* ── Year input handler ── */
  const handleYearChange = useCallback((e) => {
    const v = parseInt(e.target.value, 10);
    if (!isNaN(v)) setViewYear(v);
  }, []);

  const handleYearBlur = useCallback(() => {
    if (viewYear < 1900) setViewYear(1900);
    else if (viewYear > 2100) setViewYear(2100);
  }, [viewYear]);

  /* ── Determine input display value ── */
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

        {/* Input container — Textbox bottom-border pattern */}
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
            aria-haspopup="dialog"
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

          {/* Trailing area: clear + calendar icon */}
          <span
            className={cn(
              'absolute flex items-center gap-1.5',
              trailingRight[size]
            )}
          >
            {showClear && (
              <button
                type="button"
                tabIndex={-1}
                onClick={handleClear}
                className={cn(
                  'shrink-0 flex items-center justify-center text-text-tertiary hover:text-text cursor-pointer transition-colors',
                  iconContainerSize[size],
                  iconSize[size]
                )}
                aria-label="Clear date"
              >
                <span className={cn('shrink-0 flex items-center justify-center', iconContainerSize[size], iconSize[size])}>
                  <O9Icon svg={closeSvg} />
                </span>
              </button>
            )}
            {!readOnly && (
              <button
                type="button"
                tabIndex={-1}
                onClick={() => {
                  if (disabled) return;
                  isOpen ? closeDropdown() : openDropdown();
                }}
                className={cn(
                  'shrink-0 flex items-center justify-center text-text-tertiary hover:text-text cursor-pointer transition-colors',
                  iconContainerSize[size],
                  iconSize[size]
                )}
                aria-label="Open calendar"
              >
                <span className={cn('shrink-0 flex items-center justify-center', iconContainerSize[size], iconSize[size])}>
                  <O9Icon svg={calendarSvg} />
                </span>
              </button>
            )}
          </span>
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

      {/* ── Portal calendar dropdown ── */}
      {isOpen &&
        !disabled &&
        !readOnly &&
        createPortal(
          <div
            ref={dropdownRef}
            id={`${dropdownId}-panel`}
            data-dropdown-id={dropdownId}
            role="dialog"
            aria-label="Choose a date"
            className="bg-surface-raised border border-border shadow-down"
            style={{
              position: 'fixed',
              top: `${menuPos.top}px`,
              left: `${menuPos.left}px`,
              width: `${menuPos.width}px`,
              zIndex: 9999,
            }}
          >
            {/* ── Calendar Header: Month [◄►] | Year [◄►] ── */}
            <div className="flex items-center px-3 py-2 border-b border-border gap-2">
              {/* Month section — flex-1 so ButtonGroup stays right-aligned */}
              <div className="flex-1 flex items-center justify-between gap-2">
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowMonthPicker((v) => !v)}
                  className="text-xs font-semibold text-text hover:text-interactive cursor-pointer select-none transition-colors whitespace-nowrap"
                >
                  {MONTHS[viewMonth]}
                </button>
                <ButtonGroup aria-label="Month navigation">
                  <IconButton variant="outline" size="xm" onClick={prevMonth} aria-label="Previous month">
                    <O9Icon svg={angleLeftSvg} />
                  </IconButton>
                  <IconButton variant="outline" size="xm" onClick={nextMonth} aria-label="Next month">
                    <O9Icon svg={angleRightSvg} />
                  </IconButton>
                </ButtonGroup>
              </div>

              {/* Separator */}
              <div className="w-px h-5 bg-border shrink-0" />

              {/* Year section — flex-1 so ButtonGroup stays right-aligned */}
              <div className="flex-1 flex items-center justify-between gap-2">
                <input
                  type="number"
                  value={viewYear}
                  onChange={handleYearChange}
                  onBlur={handleYearBlur}
                  className="w-12 text-xs font-semibold text-text text-center bg-transparent outline-none tabular-nums appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <ButtonGroup aria-label="Year navigation">
                  <IconButton variant="outline" size="xm" onClick={decrementYear} aria-label="Previous year">
                    <O9Icon svg={angleLeftSvg} />
                  </IconButton>
                  <IconButton variant="outline" size="xm" onClick={incrementYear} aria-label="Next year">
                    <O9Icon svg={angleRightSvg} />
                  </IconButton>
                </ButtonGroup>
              </div>
            </div>

            {/* ── Month picker overlay OR Calendar grid ── */}
            {showMonthPicker ? (
              <div className="px-3 py-3">
                <div className="grid grid-cols-3 gap-1">
                  {MONTHS.map((month, idx) => (
                    <button
                      key={month}
                      type="button"
                      tabIndex={-1}
                      onClick={() => {
                        setViewMonth(idx);
                        setShowMonthPicker(false);
                      }}
                      className={cn(
                        'py-2 text-xs text-center rounded transition-colors cursor-pointer',
                        idx === viewMonth
                          ? 'bg-interactive text-on-interactive font-bold'
                          : idx === today.getMonth() && viewYear === today.getFullYear()
                            ? 'border border-interactive-border/30 text-text hover:bg-surface-overlay'
                            : 'text-text-secondary hover:bg-surface-overlay hover:text-text'
                      )}
                    >
                      {month.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="px-3 pt-2 pb-1">
                {/* 8-column header: Wk + 7 day names */}
                <div className="grid grid-cols-8 mb-1">
                  <div className="h-7 flex items-center justify-center text-[9px] font-bold uppercase text-text-tertiary">
                    Wk
                  </div>
                  {DAYS.map((d) => (
                    <div key={d} className="h-7 flex items-center justify-center text-[9px] font-bold uppercase text-text-tertiary">
                      {d}
                    </div>
                  ))}
                </div>
                {/* Week rows with week numbers + day cells */}
                <div>
                  {weekRows.map((row, rowIdx) => (
                    <div key={rowIdx} className="grid grid-cols-8">
                      {/* Week number cell — non-clickable, subtle color */}
                      <div className="h-8 flex items-center justify-center text-[9px] font-medium text-text-tertiary select-none">
                        {row.weekNum}
                      </div>
                      {row.days.map((day, dayIdx) => renderDayCell(day, `${rowIdx}-${dayIdx}`))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Today quick-select footer ── */}
            <div className="px-3 py-2 border-t border-border">
              <button
                type="button"
                tabIndex={-1}
                onClick={() => {
                  const now = new Date();
                  setViewYear(now.getFullYear());
                  setViewMonth(now.getMonth());
                  handleSelectDate(now);
                }}
                className="text-xs text-primary hover:underline cursor-pointer"
              >
                Today
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
});

export default DatePicker;
