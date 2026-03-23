import { forwardRef, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import Label from '@/components/inputs/Label';
import O9Icon from '@/components/O9Icon';
import ButtonGroup from '@/components/buttons/ButtonGroup';
import IconButton from '@/components/buttons/IconButton';

import datetimeSvg from '@/assets/icons/o9con-datetime.svg?raw';
import closeSvg from '@/assets/icons/o9con-close.svg?raw';
import angleLeftSvg from '@/assets/icons/o9con-angle-left.svg?raw';
import angleRightSvg from '@/assets/icons/o9con-angle-right.svg?raw';
import blockerSvg from '@/assets/icons/o9con-blocker-action-filled-alt.svg?raw';
import exclamationSvg from '@/assets/icons/o9con-exclamation-triangle-filled.svg?raw';

/**
 * DateTimePicker — combined date and time selection input.
 *
 * Merges DatePicker (calendar grid) and TimePicker (scrollable columns)
 * into a single input with a unified portal dropdown.
 *
 * Features:
 *  - Optional Label component
 *  - Three sizes: sm (24px), md (32px), lg (40px)
 *  - Date formats: DD-MM-YYYY, MM-DD-YYYY
 *  - Time formats: 24-hour, 12-hour (AM/PM), with/without seconds
 *  - Two input variants: "input" (typeable) and "dropdown" (select only)
 *  - Calendar with month picker overlay, week numbers, min/max constraints
 *  - Separate scrollable columns for Hour, Minute, Second
 *  - AM/PM toggle for 12-hour mode
 *  - Configurable minuteStep
 *  - Clear button, "Now" quick-select
 *  - Error / Warning validation states
 *  - Disabled / ReadOnly states
 *  - Portal-based dropdown
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

/* Icon sizing — targets both the O9Icon wrapper span and the SVG inside */
const iconSize = {
  sm: '[&_span]:w-3.5 [&_span]:h-3.5 [&_svg]:h-3.5 [&_svg]:w-3.5',
  md: '[&_span]:w-5 [&_span]:h-5 [&_svg]:h-5 [&_svg]:w-5',
  lg: '[&_span]:w-6 [&_span]:h-6 [&_svg]:h-6 [&_svg]:w-6',
};

const iconContainerSize = {
  sm: 'w-3.5 h-3.5',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

/* Trigger button = square filling the input height */
const triggerBtnSize = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

const inputPadRight = { sm: 'pr-10', md: 'pr-14', lg: 'pr-16' };

/* Calendar constants */
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/* ─────────────────────────────────────────────
   Date Utility Functions (from DatePicker)
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
   Time Utility Functions (from TimePicker)
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
    return { hour24: String(h).padStart(2, '0'), minute: String(m).padStart(2, '0'), second: String(s).padStart(2, '0') };
  }
  const match = cleaned.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)$/);
  if (!match) return null;
  const h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const s = match[3] ? parseInt(match[3], 10) : 0;
  const period = match[4];
  if (h < 1 || h > 12 || m < 0 || m > 59 || s < 0 || s > 59) return null;
  let h24 = h;
  if (period === 'AM' && h === 12) h24 = 0;
  else if (period === 'PM' && h !== 12) h24 = h + 12;
  return { hour24: String(h24).padStart(2, '0'), hour12: String(h).padStart(2, '0'), minute: String(m).padStart(2, '0'), second: String(s).padStart(2, '0'), period };
}

function buildTimeStr(hour, minute, second, is24Hour, showSeconds, period) {
  if (is24Hour) {
    return showSeconds ? `${hour}:${minute}:${second}` : `${hour}:${minute}`;
  }
  const timePart = showSeconds ? `${hour}:${minute}:${second}` : `${hour}:${minute}`;
  return `${timePart} ${period}`;
}

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
   Combined DateTime Utilities
   ───────────────────────────────────────────── */

/** Split a combined "DD-MM-YYYY HH:MM" string into { dateStr, timeStr } */
function splitDateTimeStr(str) {
  if (!str || str.length < 11) return null;
  /* Date portion is always 10 chars (DD-MM-YYYY or MM-DD-YYYY) */
  const dateStr = str.substring(0, 10);
  const timeStr = str.substring(11);
  return { dateStr, timeStr };
}

/* ─────────────────────────────────────────────
   TimeColumn sub-component (from TimePicker)
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
   DateTimePicker Component
   ───────────────────────────────────────────── */

const DateTimePicker = forwardRef(function DateTimePicker(
  {
    size = 'md',
    status = 'default',
    format = 'DD-MM-YYYY',
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
    min,
    max,
    className,
    id,
  },
  ref
) {
  const inputId = id || (label ? `dtp-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownId = useRef(`dtp-${Math.random().toString(36).slice(2, 8)}`).current;

  /* ── Controlled / uncontrolled ── */
  const [internalValue, setInternalValue] = useState(() => defaultValue || '');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  /* ── State ── */
  const [focused, setFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 300 });

  /* Calendar state */
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  /* Time column state */
  const [activePeriod, setActivePeriod] = useState('AM');
  const [selHour, setSelHour] = useState('');
  const [selMinute, setSelMinute] = useState('');
  const [selSecond, setSelSecond] = useState('00');

  /* Typeable input state */
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  /* ── Derived ── */
  const isInputVariant = variant === 'input';
  const effectiveStatus = status;
  const messageText =
    effectiveStatus === 'error' ? errorText
    : effectiveStatus === 'warning' ? warningText
    : helperText;
  const messageIconSvg = statusIcons[effectiveStatus] || null;
  const showClear = !!value && !disabled && !readOnly;

  const timeFormatHint = is24Hour
    ? (showSeconds ? 'HH:mm:ss' : 'HH:mm')
    : (showSeconds ? 'HH:mm:ss AM/PM' : 'HH:mm AM/PM');
  const displayPlaceholder = placeholder ?? `${format} ${timeFormatHint}`;

  /* ── Min / Max ── */
  const minDate = useMemo(() => parseDateStr(min, format), [min, format]);
  const maxDate = useMemo(() => parseDateStr(max, format), [max, format]);

  const isDateDisabledFn = useCallback(
    (dateObj) => {
      if (minDate && dateObj < minDate) return true;
      if (maxDate && dateObj > maxDate) return true;
      return false;
    },
    [minDate, maxDate]
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

  /* ── Parse current value into date + time parts ── */
  const parsedParts = useMemo(() => {
    const parts = splitDateTimeStr(value);
    if (!parts) return null;
    const date = parseDateStr(parts.dateStr, format);
    const time = parseTimeStr(parts.timeStr, is24Hour);
    if (!date || !time) return null;
    return { date, time };
  }, [value, format, is24Hour]);

  const selectedDate = parsedParts?.date || null;

  /* ── Sync calendar view and time columns with value ── */
  useEffect(() => {
    if (!parsedParts) return;
    const { date, time } = parsedParts;
    setViewYear(date.getFullYear());
    setViewMonth(date.getMonth());
    if (is24Hour) {
      setSelHour(time.hour24);
    } else {
      setSelHour(time.hour12 || time.hour24);
      if (time.period) setActivePeriod(time.period);
    }
    setSelMinute(time.minute);
    setSelSecond(time.second || '00');
  }, [parsedParts, is24Hour]);

  /* ── Generate column items ── */
  const hours = useMemo(() => generateHours(is24Hour), [is24Hour]);
  const minutes = useMemo(() => generateMinutes(minuteStep), [minuteStep]);
  const seconds = useMemo(() => generateSeconds(), []);

  /* ── Commit combined value ── */
  const commitValue = useCallback(
    (dateObj, hour, minute, second, period) => {
      const dateStr = formatDateStr(dateObj, format);
      const timeStr = buildTimeStr(hour, minute, second, is24Hour, showSeconds, period);
      const combined = `${dateStr} ${timeStr}`;
      if (!isControlled) setInternalValue(combined);
      onChange?.(combined);
    },
    [format, is24Hour, showSeconds, isControlled, onChange]
  );

  /* ── Get current date or today as fallback ── */
  const getDateOrToday = useCallback(() => {
    return selectedDate || today;
  }, [selectedDate, today]);

  /* ── Get current time parts or defaults ── */
  const getTimeParts = useCallback(() => {
    const hour = selHour || (is24Hour ? '00' : '12');
    const minute = selMinute || '00';
    const second = selSecond || '00';
    const period = activePeriod;
    return { hour, minute, second, period };
  }, [selHour, selMinute, selSecond, activePeriod, is24Hour]);

  /* ── Date selection (does NOT close dropdown) ── */
  const handleSelectDate = useCallback(
    (dateObj) => {
      const { hour, minute, second, period } = getTimeParts();
      commitValue(dateObj, hour, minute, second, period);
    },
    [getTimeParts, commitValue]
  );

  /* ── Time column handlers ── */
  const handleHourSelect = useCallback(
    (h) => {
      setSelHour(h);
      const dateObj = getDateOrToday();
      const min = selMinute || '00';
      const sec = selSecond || '00';
      commitValue(dateObj, h, min, sec, activePeriod);
    },
    [getDateOrToday, selMinute, selSecond, activePeriod, commitValue]
  );

  const handleMinuteSelect = useCallback(
    (m) => {
      setSelMinute(m);
      const dateObj = getDateOrToday();
      const hr = selHour || (is24Hour ? '00' : '12');
      const sec = selSecond || '00';
      commitValue(dateObj, hr, m, sec, activePeriod);
    },
    [getDateOrToday, selHour, selSecond, activePeriod, is24Hour, commitValue]
  );

  const handleSecondSelect = useCallback(
    (s) => {
      setSelSecond(s);
      const dateObj = getDateOrToday();
      const hr = selHour || (is24Hour ? '00' : '12');
      const min = selMinute || '00';
      commitValue(dateObj, hr, min, s, activePeriod);
    },
    [getDateOrToday, selHour, selMinute, activePeriod, is24Hour, commitValue]
  );

  const handlePeriodToggle = useCallback(
    (period) => {
      setActivePeriod(period);
      if (selHour) {
        const dateObj = getDateOrToday();
        const min = selMinute || '00';
        const sec = selSecond || '00';
        commitValue(dateObj, selHour, min, sec, period);
      }
    },
    [getDateOrToday, selHour, selMinute, selSecond, commitValue]
  );

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

  /* ── Set to current system datetime ── */
  const handleSetNow = useCallback(() => {
    const now = new Date();
    const dateStr = formatDateStr(now, format);
    const timeStr = getCurrentTimeStr(is24Hour, showSeconds);
    const combined = `${dateStr} ${timeStr}`;
    if (!isControlled) setInternalValue(combined);
    onChange?.(combined);
    setIsTyping(false);
    closeDropdown();
  }, [format, is24Hour, showSeconds, isControlled, onChange, closeDropdown]);

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
        const parts = splitDateTimeStr(trimmed);
        if (parts) {
          const date = parseDateStr(parts.dateStr, format);
          const time = parseTimeStr(parts.timeStr, is24Hour);
          if (date && time && !isDateDisabledFn(date)) {
            const dateStr = formatDateStr(date, format);
            const timeStr = buildTimeStr(
              is24Hour ? time.hour24 : time.hour12 || time.hour24,
              time.minute, time.second || '00',
              is24Hour, showSeconds, time.period || activePeriod
            );
            const combined = `${dateStr} ${timeStr}`;
            if (!isControlled) setInternalValue(combined);
            onChange?.(combined);
          }
        }
      }
    }
  }, [isInputVariant, isTyping, inputText, format, is24Hour, showSeconds, activePeriod, isControlled, onChange, isDateDisabledFn]);

  /* ── Typeable input change ── */
  const handleInputChange = useCallback((e) => {
    const text = e.target.value;
    setInputText(text);
    const parts = splitDateTimeStr(text);
    if (parts) {
      const date = parseDateStr(parts.dateStr, format);
      const time = parseTimeStr(parts.timeStr, is24Hour);
      if (date && time && !isDateDisabledFn(date)) {
        setViewYear(date.getFullYear());
        setViewMonth(date.getMonth());
        const dateStr = formatDateStr(date, format);
        const timeStr = buildTimeStr(
          is24Hour ? time.hour24 : time.hour12 || time.hour24,
          time.minute, time.second || '00',
          is24Hour, showSeconds, time.period || activePeriod
        );
        const combined = `${dateStr} ${timeStr}`;
        if (!isControlled) setInternalValue(combined);
        onChange?.(combined);
        if (time.period) setActivePeriod(time.period);
      }
    }
  }, [format, is24Hour, showSeconds, activePeriod, isControlled, onChange, isDateDisabledFn]);

  /* ── Keyboard on input ── */
  const handleInputKeyDown = useCallback(
    (e) => {
      if (disabled || readOnly) return;
      if (isInputVariant) {
        if (e.key === 'Enter') {
          const parts = splitDateTimeStr(inputText);
          if (parts) {
            const date = parseDateStr(parts.dateStr, format);
            const time = parseTimeStr(parts.timeStr, is24Hour);
            if (date && time && !isDateDisabledFn(date)) {
              const dateStr = formatDateStr(date, format);
              const timeStr = buildTimeStr(
                is24Hour ? time.hour24 : time.hour12 || time.hour24,
                time.minute, time.second || '00',
                is24Hour, showSeconds, time.period || activePeriod
              );
              const combined = `${dateStr} ${timeStr}`;
              if (!isControlled) setInternalValue(combined);
              onChange?.(combined);
              setIsTyping(false);
              if (isOpen) closeDropdown();
            }
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
    [disabled, readOnly, isInputVariant, isOpen, openDropdown, closeDropdown, inputText, format, is24Hour, showSeconds, activePeriod, isControlled, onChange, isDateDisabledFn]
  );

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

  const handleYearChange = useCallback((e) => {
    const v = parseInt(e.target.value, 10);
    if (!isNaN(v)) setViewYear(v);
  }, []);

  const handleYearBlur = useCallback(() => {
    if (viewYear < 1900) setViewYear(1900);
    else if (viewYear > 2100) setViewYear(2100);
  }, [viewYear]);

  /* ── Build calendar grid ── */
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

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

          {/* Clear button — positioned to the left of the trigger button */}
          {showClear && (
            <button
              type="button"
              tabIndex={-1}
              onClick={handleClear}
              className={cn(
                'absolute flex items-center justify-center text-text-tertiary hover:text-text cursor-pointer transition-colors',
                iconContainerSize[size],
                iconSize[size],
                size === 'sm' && 'right-7',
                size === 'md' && 'right-10',
                size === 'lg' && 'right-12',
              )}
              aria-label="Clear date and time"
            >
              <span className={cn('shrink-0 flex items-center justify-center', iconContainerSize[size], iconSize[size])}>
                <O9Icon svg={closeSvg} />
              </span>
            </button>
          )}

          {/* Datetime icon trigger button — square, fills input height, flush right */}
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
                triggerBtnSize[size],
                iconSize[size]
              )}
              aria-label="Open date time picker"
            >
              <O9Icon svg={datetimeSvg} />
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
            role="dialog"
            aria-label="Choose a date and time"
            className="bg-surface-raised border border-border shadow-down"
            style={{
              position: 'fixed',
              top: `${menuPos.top}px`,
              left: `${menuPos.left}px`,
              zIndex: 9999,
            }}
          >
            {/* ── Horizontal layout: Calendar | Time ── */}
            <div className="flex">
              {/* ── Left: Calendar Section ── */}
              <div className="flex-shrink-0">
                {/* Calendar Header: Month [◄►] | Year [◄►] */}
                <div className="flex items-center px-3 py-2 border-b border-border gap-2">
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
                  <div className="w-px h-5 bg-border shrink-0" />
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

                {/* Month picker overlay OR Calendar grid */}
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
                    <div>
                      {weekRows.map((row, rowIdx) => (
                        <div key={rowIdx} className="grid grid-cols-8">
                          <div className="h-8 flex items-center justify-center text-[9px] font-medium text-text-tertiary select-none">
                            {row.weekNum}
                          </div>
                          {row.days.map((day, dayIdx) => renderDayCell(day, `${rowIdx}-${dayIdx}`))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ── Right: Time Section ── */}
              <div className="border-l border-border flex flex-col">
                {/* AM/PM toggle (12-hour mode only) */}
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

                {/* Time columns: Hr | Min | Sec */}
                <div className="flex divide-x divide-border flex-1">
                  <TimeColumn label="Hr" items={hours} selectedValue={selHour} onSelect={handleHourSelect} />
                  <TimeColumn label="Min" items={minutes} selectedValue={selMinute} onSelect={handleMinuteSelect} />
                  {showSeconds && (
                    <TimeColumn label="Sec" items={seconds} selectedValue={selSecond} onSelect={handleSecondSelect} />
                  )}
                </div>

                {/* Now quick-select footer */}
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
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
});

export default DateTimePicker;
