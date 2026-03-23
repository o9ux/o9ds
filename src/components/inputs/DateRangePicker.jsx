import { forwardRef, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import Label from '@/components/inputs/Label';
import O9Icon from '@/components/O9Icon';
import ButtonGroup from '@/components/buttons/ButtonGroup';
import IconButton from '@/components/buttons/IconButton';

import calendarRangeSvg from '@/assets/icons/o9con-calendar-range.svg?raw';
import closeSvg from '@/assets/icons/o9con-close.svg?raw';
import angleLeftSvg from '@/assets/icons/o9con-angle-left.svg?raw';
import angleRightSvg from '@/assets/icons/o9con-angle-right.svg?raw';
import arrowRightSvg from '@/assets/icons/o9con-arrow-right.svg?raw';
import blockerSvg from '@/assets/icons/o9con-blocker-action-filled-alt.svg?raw';
import exclamationSvg from '@/assets/icons/o9con-exclamation-triangle-filled.svg?raw';

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

const sizeStyles = {
  sm: 'h-6 px-2 text-[10px]',
  md: 'h-8 px-3 text-xs',
  lg: 'h-10 px-3 text-sm',
};

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

const trailingRight = { sm: 'right-2', md: 'right-3', lg: 'right-3' };

const inputPadRight = { sm: 'pr-14', md: 'pr-16', lg: 'pr-18' };

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const RANGE_MODES = [
  { key: 'date', label: 'Date' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'year', label: 'Year' },
];

/* ─────────────────────────────────────────────
   Date Utility Functions
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
   Range Utility Functions
   ───────────────────────────────────────────── */

function parseRangeStr(str, fmt) {
  if (!str) return { start: null, end: null };
  const parts = str.split(' > ');
  if (parts.length !== 2) return { start: null, end: null };
  return { start: parseDateStr(parts[0].trim(), fmt), end: parseDateStr(parts[1].trim(), fmt) };
}

function formatRangeStr(start, end, fmt) {
  if (!start || !end) return '';
  return `${formatDateStr(start, fmt)} > ${formatDateStr(end, fmt)}`;
}

function isInRange(date, start, end) {
  if (!date || !start || !end) return false;
  const t = date.getTime();
  return t >= start.getTime() && t <= end.getTime();
}

function getWeekStart(date) {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

function getWeekEnd(date) {
  const d = new Date(date);
  d.setDate(d.getDate() + (6 - d.getDay()));
  return d;
}

/* ─────────────────────────────────────────────
   Build week rows for a given month
   ───────────────────────────────────────────── */

function buildWeekRows(year, month) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const rows = [];
  for (let i = 0; i < cells.length; i += 7) {
    const row = cells.slice(i, i + 7);
    const firstDayInRow = row.find((d) => d !== null);
    const weekNum = firstDayInRow ? getISOWeekNumber(new Date(year, month, firstDayInRow)) : null;
    rows.push({ weekNum, days: row });
  }
  return rows;
}

/* ─────────────────────────────────────────────
   DateRangePicker Component
   ───────────────────────────────────────────── */

const DateRangePicker = forwardRef(function DateRangePicker(
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
  const inputId = id || (label ? `drp-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownId = useRef(`drp-${Math.random().toString(36).slice(2, 8)}`).current;

  /* ── Controlled / uncontrolled ── */
  const [internalValue, setInternalValue] = useState(() => defaultValue || '');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  /* ── State ── */
  const [focused, setFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  /* Range mode tab */
  const [rangeMode, setRangeMode] = useState('date');

  /* Calendar view (left month; right = left + 1) */
  const today = useMemo(() => new Date(), []);
  const [leftViewYear, setLeftViewYear] = useState(today.getFullYear());
  const [leftViewMonth, setLeftViewMonth] = useState(today.getMonth());

  const rightViewMonth = leftViewMonth === 11 ? 0 : leftViewMonth + 1;
  const rightViewYear = leftViewMonth === 11 ? leftViewYear + 1 : leftViewYear;

  /* Range selection */
  const [selectionPhase, setSelectionPhase] = useState('idle');
  const [pendingStart, setPendingStart] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  /* Month picker overlay (per panel) */
  const [showLeftMonthPicker, setShowLeftMonthPicker] = useState(false);
  const [showRightMonthPicker, setShowRightMonthPicker] = useState(false);

  /* Typeable input state */
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  /* ── Derived ── */
  const isInputVariant = variant === 'input';
  const effectiveStatus = status;
  const messageText = effectiveStatus === 'error' ? errorText : effectiveStatus === 'warning' ? warningText : helperText;
  const messageIconSvg = statusIcons[effectiveStatus] || null;
  const showClear = !!value && !disabled && !readOnly;
  const displayPlaceholder = placeholder ?? `${format} > ${format}`;

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

  /* ── Parse current value ── */
  const { start: selectedStart, end: selectedEnd } = useMemo(
    () => parseRangeStr(value, format),
    [value, format]
  );

  /* ── Sync calendar view with value ── */
  useEffect(() => {
    if (selectedStart) {
      setLeftViewYear(selectedStart.getFullYear());
      setLeftViewMonth(selectedStart.getMonth());
    }
  }, [selectedStart]);

  /* ── Build week rows for both calendars ── */
  const leftWeekRows = useMemo(() => buildWeekRows(leftViewYear, leftViewMonth), [leftViewYear, leftViewMonth]);
  const rightWeekRows = useMemo(() => buildWeekRows(rightViewYear, rightViewMonth), [rightViewYear, rightViewMonth]);

  /* ── Year grid ranges ── */
  const leftYearStart = leftViewYear;
  const rightYearStart = leftYearStart + 12;

  /* ── Auto-focus input when entering typing mode ── */
  useEffect(() => {
    if (isInputVariant && isTyping) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isInputVariant, isTyping]);

  /* ── Commit range ── */
  const commitRange = useCallback(
    (startDate, endDate) => {
      const rangeStr = formatRangeStr(startDate, endDate, format);
      if (!isControlled) setInternalValue(rangeStr);
      onChange?.({ start: formatDateStr(startDate, format), end: formatDateStr(endDate, format) });
      setIsTyping(false);
      setSelectionPhase('idle');
      setPendingStart(null);
      setHoverDate(null);
      setIsOpen(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    },
    [format, isControlled, onChange]
  );

  /* ── Date mode click (two-click) ── */
  const handleDateClick = useCallback(
    (dateObj) => {
      if (selectionPhase === 'idle') {
        setPendingStart(dateObj);
        setSelectionPhase('start-selected');
      } else {
        let start = pendingStart;
        let end = dateObj;
        if (end < start) [start, end] = [end, start];
        commitRange(start, end);
      }
    },
    [selectionPhase, pendingStart, commitRange]
  );

  /* ── Week mode click (two-click) ── */
  const handleWeekClick = useCallback(
    (dateObj) => {
      const ws = getWeekStart(dateObj);
      if (selectionPhase === 'idle') {
        setPendingStart(ws);
        setSelectionPhase('start-selected');
      } else {
        const clickWs = getWeekStart(dateObj);
        const clickWe = getWeekEnd(dateObj);
        const a = pendingStart <= clickWs ? pendingStart : clickWs;
        const b = pendingStart <= clickWs ? clickWe : getWeekEnd(pendingStart);
        commitRange(a, b);
      }
    },
    [selectionPhase, pendingStart, commitRange]
  );

  /* ── Month mode click (two-click) ── */
  const handleMonthRangeClick = useCallback(
    (year, month) => {
      const mStart = new Date(year, month, 1);
      if (selectionPhase === 'idle') {
        setPendingStart(mStart);
        setSelectionPhase('start-selected');
      } else {
        const mEnd = new Date(year, month + 1, 0);
        let start, end;
        if (mStart < pendingStart) {
          start = mStart;
          end = new Date(pendingStart.getFullYear(), pendingStart.getMonth() + 1, 0);
        } else {
          start = pendingStart;
          end = mEnd;
        }
        commitRange(start, end);
      }
    },
    [selectionPhase, pendingStart, commitRange]
  );

  /* ── Year mode click (two-click) ── */
  const handleYearRangeClick = useCallback(
    (year) => {
      const yrStart = new Date(year, 0, 1);
      if (selectionPhase === 'idle') {
        setPendingStart(yrStart);
        setSelectionPhase('start-selected');
      } else {
        const pendingYear = pendingStart.getFullYear();
        let start, end;
        if (year < pendingYear) {
          start = yrStart;
          end = new Date(pendingYear, 11, 31);
        } else {
          start = pendingStart;
          end = new Date(year, 11, 31);
        }
        commitRange(start, end);
      }
    },
    [selectionPhase, pendingStart, commitRange]
  );

  /* ── Hover for preview ── */
  const handleDayHover = useCallback(
    (dateObj) => { if (selectionPhase === 'start-selected' || rangeMode === 'week') setHoverDate(dateObj); },
    [selectionPhase, rangeMode]
  );

  const handleDayLeave = useCallback(() => { setHoverDate(null); }, []);

  /* ── Open / close ── */
  const openDropdown = useCallback(() => {
    if (disabled || readOnly) return;
    const ref = selectedStart || today;
    setLeftViewYear(ref.getFullYear());
    setLeftViewMonth(ref.getMonth());
    setSelectionPhase('idle');
    setPendingStart(null);
    setHoverDate(null);
    setShowLeftMonthPicker(false);
    setShowRightMonthPicker(false);
    setIsOpen(true);
  }, [disabled, readOnly, selectedStart, today]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setSelectionPhase('idle');
    setPendingStart(null);
    setHoverDate(null);
    setShowLeftMonthPicker(false);
    setShowRightMonthPicker(false);
  }, []);

  /* ── Position tracking ── */
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    const updatePosition = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMenuPos({ top: rect.bottom + 4, left: rect.left });
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
      if (e.key === 'Escape') { closeDropdown(); inputRef.current?.focus(); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, closeDropdown]);

  /* ── Clear ── */
  const handleClear = useCallback(
    (e) => {
      e.stopPropagation();
      if (!isControlled) setInternalValue('');
      onChange?.({ start: '', end: '' });
      setInputText('');
      setIsTyping(false);
      setSelectionPhase('idle');
      setPendingStart(null);
      setHoverDate(null);
      requestAnimationFrame(() => inputRef.current?.focus());
    },
    [isControlled, onChange]
  );

  /* ── Focus handlers ── */
  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur = useCallback((e) => {
    if (containerRef.current?.contains(e.relatedTarget)) return;
    setFocused(false);
    if (isInputVariant && isTyping) {
      setIsTyping(false);
      const trimmed = inputText.trim();
      if (!trimmed) {
        if (!isControlled) setInternalValue('');
        onChange?.({ start: '', end: '' });
      } else {
        const { start, end } = parseRangeStr(trimmed, format);
        if (start && end && !isDateDisabledFn(start) && !isDateDisabledFn(end)) {
          const rangeStr = formatRangeStr(start, end, format);
          if (!isControlled) setInternalValue(rangeStr);
          onChange?.({ start: formatDateStr(start, format), end: formatDateStr(end, format) });
        }
      }
    }
  }, [isInputVariant, isTyping, inputText, format, isControlled, onChange, isDateDisabledFn]);

  /* ── Typeable input change ── */
  const handleInputChange = useCallback((e) => {
    const text = e.target.value;
    setInputText(text);
    const { start, end } = parseRangeStr(text, format);
    if (start && end && !isDateDisabledFn(start) && !isDateDisabledFn(end)) {
      setLeftViewYear(start.getFullYear());
      setLeftViewMonth(start.getMonth());
      const rangeStr = formatRangeStr(start, end, format);
      if (!isControlled) setInternalValue(rangeStr);
      onChange?.({ start: formatDateStr(start, format), end: formatDateStr(end, format) });
    }
  }, [format, isControlled, onChange, isDateDisabledFn]);

  /* ── Keyboard on input ── */
  const handleInputKeyDown = useCallback(
    (e) => {
      if (disabled || readOnly) return;
      if (isInputVariant) {
        if (e.key === 'Enter') {
          const { start, end } = parseRangeStr(inputText, format);
          if (start && end && !isDateDisabledFn(start) && !isDateDisabledFn(end)) {
            const rangeStr = formatRangeStr(start, end, format);
            if (!isControlled) setInternalValue(rangeStr);
            onChange?.({ start: formatDateStr(start, format), end: formatDateStr(end, format) });
            setIsTyping(false);
            if (isOpen) closeDropdown();
          }
          return;
        }
        if (e.key === 'ArrowDown' && !isOpen) { e.preventDefault(); openDropdown(); return; }
      } else {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!isOpen) openDropdown();
        }
      }
    },
    [disabled, readOnly, isInputVariant, isOpen, openDropdown, closeDropdown, inputText, format, isControlled, onChange, isDateDisabledFn]
  );

  /* ── Navigation ── */
  const prevMonth = useCallback(() => {
    setLeftViewMonth((m) => { if (m === 0) { setLeftViewYear((y) => y - 1); return 11; } return m - 1; });
  }, []);
  const nextMonth = useCallback(() => {
    setLeftViewMonth((m) => { if (m === 11) { setLeftViewYear((y) => y + 1); return 0; } return m + 1; });
  }, []);
  const decrementYear = useCallback(() => setLeftViewYear((y) => y - 1), []);
  const incrementYear = useCallback(() => setLeftViewYear((y) => y + 1), []);

  /* ── Year input handler ── */
  const handleCalendarYearChange = useCallback((e, panelSide) => {
    const v = parseInt(e.target.value, 10);
    if (!isNaN(v)) {
      if (panelSide === 'right') setLeftViewYear(v - 1);
      else setLeftViewYear(v);
    }
  }, []);

  const handleCalendarYearBlur = useCallback(() => {
    if (leftViewYear < 1900) setLeftViewYear(1900);
    else if (leftViewYear > 2100) setLeftViewYear(2100);
  }, [leftViewYear]);

  /* ── Year input handler for month/year grid views ── */
  const handleGridYearChange = useCallback((e, isLeftPanel) => {
    const v = parseInt(e.target.value, 10);
    if (!isNaN(v)) {
      setLeftViewYear(isLeftPanel ? v : v - 1);
    }
  }, []);

  const handleGridYearBlur = useCallback((e, isLeftPanel) => {
    let y = parseInt(e.target.value, 10);
    if (isNaN(y)) y = today.getFullYear();
    y = Math.max(1900, Math.min(2100, y));
    setLeftViewYear(isLeftPanel ? y : y - 1);
  }, [today]);

  /* ── Compute effective range for highlighting ── */
  const getEffectiveRange = useCallback(() => {
    if (selectionPhase === 'start-selected' && pendingStart && hoverDate) {
      if (rangeMode === 'week') {
        const hWs = getWeekStart(hoverDate);
        const hWe = getWeekEnd(hoverDate);
        const a = pendingStart <= hWs ? pendingStart : hWs;
        const b = pendingStart <= hWs ? hWe : getWeekEnd(pendingStart);
        return { start: a, end: b };
      }
      if (rangeMode === 'month') {
        const hm = hoverDate;
        const ps = pendingStart;
        if (hm < ps) {
          return { start: hm, end: new Date(ps.getFullYear(), ps.getMonth() + 1, 0) };
        }
        return { start: ps, end: new Date(hm.getFullYear(), hm.getMonth() + 1, 0) };
      }
      if (rangeMode === 'year') {
        const hy = hoverDate.getFullYear();
        const py = pendingStart.getFullYear();
        if (hy < py) {
          return { start: new Date(hy, 0, 1), end: new Date(py, 11, 31) };
        }
        return { start: pendingStart, end: new Date(hy, 11, 31) };
      }
      const a = pendingStart < hoverDate ? pendingStart : hoverDate;
      const b = pendingStart < hoverDate ? hoverDate : pendingStart;
      return { start: a, end: b };
    }
    if (selectionPhase === 'start-selected' && pendingStart) {
      if (rangeMode === 'week') return { start: pendingStart, end: getWeekEnd(pendingStart) };
      if (rangeMode === 'month') return { start: pendingStart, end: new Date(pendingStart.getFullYear(), pendingStart.getMonth() + 1, 0) };
      if (rangeMode === 'year') return { start: pendingStart, end: new Date(pendingStart.getFullYear(), 11, 31) };
      return { start: pendingStart, end: null };
    }
    if (rangeMode === 'week' && hoverDate && selectionPhase === 'idle') {
      return { start: getWeekStart(hoverDate), end: getWeekEnd(hoverDate) };
    }
    return { start: selectedStart, end: selectedEnd };
  }, [selectionPhase, pendingStart, hoverDate, rangeMode, selectedStart, selectedEnd]);

  /* ── Day cell renderer ── */
  const renderDayCell = (day, key, calYear, calMonth) => {
    if (day === null) return <div key={key} role="gridcell" className="h-8" />;
    const dateObj = new Date(calYear, calMonth, day);
    const dateDisabled = isDateDisabledFn(dateObj);
    const isToday = isSameDay(dateObj, today);
    const { start: effStart, end: effEnd } = getEffectiveRange();
    const isStart = isSameDay(dateObj, effStart);
    const isEnd = isSameDay(dateObj, effEnd);
    const inRange = effStart && effEnd && isInRange(dateObj, effStart, effEnd);
    const isSingleDay = isStart && isEnd;
    const isPreview = selectionPhase === 'start-selected' || (rangeMode === 'week' && hoverDate);
    const fullDateLabel = dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
      <div
        key={key}
        role="gridcell"
        className={cn(
          'flex items-center justify-center',
          inRange && !isStart && !isEnd && (isPreview ? 'bg-interactive/10' : 'bg-interactive/15'),
          isStart && effEnd && !isSingleDay && (isPreview ? 'bg-gradient-to-r from-transparent from-50% to-interactive/10 to-50%' : 'bg-gradient-to-r from-transparent from-50% to-interactive/15 to-50%'),
          isEnd && effStart && !isSingleDay && (isPreview ? 'bg-gradient-to-l from-transparent from-50% to-interactive/10 to-50%' : 'bg-gradient-to-l from-transparent from-50% to-interactive/15 to-50%'),
        )}
      >
        <button
          type="button"
          tabIndex={-1}
          disabled={dateDisabled}
          aria-label={fullDateLabel}
          aria-selected={isStart || isEnd || inRange}
          aria-disabled={dateDisabled}
          onClick={() => rangeMode === 'week' ? handleWeekClick(dateObj) : handleDateClick(dateObj)}
          onMouseEnter={() => handleDayHover(dateObj)}
          onMouseLeave={handleDayLeave}
          className={cn(
            'h-8 w-8 flex items-center justify-center text-xs transition-colors cursor-pointer',
            (isStart || isEnd)
              ? 'bg-interactive text-on-interactive font-bold rounded'
              : isToday && !inRange
                ? 'border border-interactive-border/30 text-text hover:bg-surface-overlay rounded'
                : !inRange
                  ? 'text-text-secondary hover:bg-surface-overlay hover:text-text rounded'
                  : 'text-text',
            dateDisabled && 'opacity-30 pointer-events-none'
          )}
        >
          {day}
        </button>
      </div>
    );
  };

  /* ── Calendar panel renderer ── */
  const renderCalendarPanel = (year, month, weekRows, showPrev, showNext, panelSide) => {
    const showMp = panelSide === 'left' ? showLeftMonthPicker : showRightMonthPicker;
    const setShowMp = panelSide === 'left' ? setShowLeftMonthPicker : setShowRightMonthPicker;

    const handleMonthSelect = (idx) => {
      if (panelSide === 'left') {
        setLeftViewMonth(idx);
      } else {
        const newLeft = idx === 0 ? 11 : idx - 1;
        if (idx === 0) setLeftViewYear((y) => y - 1);
        setLeftViewMonth(newLeft);
      }
      setShowMp(false);
    };

    return (
      <div className="flex-shrink-0">
        {/* Header */}
        <div className="flex items-center px-3 py-2 border-b border-border gap-2">
          <div className="flex-1 flex items-center gap-4">
            <IconButton variant="outline" size="xm" onClick={prevMonth} aria-label="Previous month"
              className={cn(!showPrev && 'invisible')}>
              <O9Icon svg={angleLeftSvg} />
            </IconButton>
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowMp((v) => !v)}
              className="flex-1 text-center text-xs font-semibold text-text hover:text-interactive cursor-pointer select-none transition-colors whitespace-nowrap"
            >
              {MONTHS[month]}
            </button>
            <IconButton variant="outline" size="xm" onClick={nextMonth} aria-label="Next month"
              className={cn(!showNext && 'invisible')}>
              <O9Icon svg={angleRightSvg} />
            </IconButton>
          </div>
          <div className="w-px h-5 bg-border shrink-0" />
          <div className="flex-1 flex items-center justify-between gap-2">
            <input
              type="number"
              value={year}
              onChange={(e) => handleCalendarYearChange(e, panelSide)}
              onBlur={handleCalendarYearBlur}
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
        {showMp ? (
          <div className="px-3 py-3">
            <div className="grid grid-cols-3 gap-1" role="listbox" aria-label="Select month">
              {MONTHS.map((monthName, idx) => (
                <button
                  key={monthName}
                  type="button"
                  role="option"
                  tabIndex={-1}
                  aria-selected={idx === month}
                  onClick={() => handleMonthSelect(idx)}
                  className={cn(
                    'py-2 text-xs text-center rounded transition-colors cursor-pointer',
                    idx === month
                      ? 'bg-interactive text-on-interactive font-bold'
                      : idx === today.getMonth() && year === today.getFullYear()
                        ? 'border border-interactive-border/30 text-text hover:bg-surface-overlay'
                        : 'text-text-secondary hover:bg-surface-overlay hover:text-text'
                  )}
                >
                  {monthName.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="px-3 pt-2 pb-1" role="grid" aria-label={`${MONTHS[month]} ${year}`}>
            <div className="grid grid-cols-8 mb-1" role="row">
              <div role="columnheader" className="h-7 flex items-center justify-center text-[9px] font-bold uppercase text-text-tertiary">Wk</div>
              {DAYS.map((d) => (
                <div key={d} role="columnheader" className="h-7 flex items-center justify-center text-[9px] font-bold uppercase text-text-tertiary">{d}</div>
              ))}
            </div>
            <div>
              {weekRows.map((row, rowIdx) => (
                <div key={rowIdx} role="row" className="grid grid-cols-8">
                  <div role="rowheader" className="h-8 flex items-center justify-center text-[9px] font-medium text-text-tertiary select-none">{row.weekNum}</div>
                  {row.days.map((day, dayIdx) => renderDayCell(day, `${rowIdx}-${dayIdx}`, year, month))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  /* ── Month grid renderer (for month range mode) ── */
  const renderMonthGrid = (year, isLeftPanel) => (
    <div className="flex-shrink-0 px-3 py-3" style={{ minWidth: 200 }}>
      <div className="flex items-center justify-between mb-2">
        <input
          type="number"
          value={year}
          onChange={(e) => handleGridYearChange(e, isLeftPanel)}
          onBlur={(e) => handleGridYearBlur(e, isLeftPanel)}
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
      <div className="grid grid-cols-3 gap-1" role="listbox" aria-label={`Months of ${year}`}>
        {MONTHS.map((month, idx) => {
          const mStart = new Date(year, idx, 1);
          const mEnd = new Date(year, idx + 1, 0);
          const { start: effStart, end: effEnd } = getEffectiveRange();
          const isStart = effStart && isSameDay(mStart, effStart);
          const isEnd = effEnd && isSameDay(mEnd, effEnd);
          const isEndpoint = isStart || isEnd;
          const mInRange = effStart && effEnd && isInRange(mStart, effStart, effEnd);
          const isCurrent = idx === today.getMonth() && year === today.getFullYear();
          return (
            <button
              key={month}
              type="button"
              role="option"
              tabIndex={-1}
              aria-selected={isEndpoint || mInRange}
              aria-label={`${month} ${year}`}
              onClick={() => handleMonthRangeClick(year, idx)}
              onMouseEnter={() => { if (selectionPhase === 'start-selected') setHoverDate(new Date(year, idx, 1)); }}
              onMouseLeave={() => { if (selectionPhase === 'start-selected') setHoverDate(null); }}
              className={cn(
                'py-2 text-xs text-center rounded transition-colors cursor-pointer',
                isEndpoint
                  ? 'bg-interactive text-on-interactive font-bold'
                  : mInRange
                    ? 'bg-interactive/15 text-text'
                    : isCurrent
                      ? 'border border-interactive-border/30 text-text hover:bg-surface-overlay'
                      : 'text-text-secondary hover:bg-surface-overlay hover:text-text'
              )}
            >
              {month.slice(0, 3)}
            </button>
          );
        })}
      </div>
    </div>
  );

  /* ── Year grid renderer (for year range mode) ── */
  const renderYearGrid = (startYear, isLeftPanel) => (
    <div className="flex-shrink-0 px-3 py-3" style={{ minWidth: 200 }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-text flex items-center gap-1.5">
          <input
            type="number"
            value={startYear}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              if (!isNaN(v)) setLeftViewYear(isLeftPanel ? v : v - 12);
            }}
            onBlur={(e) => {
              let y = parseInt(e.target.value, 10);
              if (isNaN(y)) y = today.getFullYear();
              y = Math.max(1900, Math.min(2100, y));
              setLeftViewYear(isLeftPanel ? y : y - 12);
            }}
            className="w-12 text-xs font-semibold text-text text-center bg-transparent outline-none tabular-nums appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="text-text-tertiary select-none">–</span>
          <input
            type="number"
            value={startYear + 11}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              if (!isNaN(v)) setLeftViewYear(isLeftPanel ? v - 11 : v - 11 - 12);
            }}
            onBlur={(e) => {
              let y = parseInt(e.target.value, 10);
              if (isNaN(y)) y = today.getFullYear() + 11;
              y = Math.max(1911, Math.min(2111, y));
              setLeftViewYear(isLeftPanel ? y - 11 : y - 11 - 12);
            }}
            className="w-12 text-xs font-semibold text-text text-center bg-transparent outline-none tabular-nums appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </span>
        <ButtonGroup aria-label="Decade navigation">
          <IconButton variant="outline" size="xm" onClick={() => setLeftViewYear((y) => y - 12)} aria-label="Previous decade">
            <O9Icon svg={angleLeftSvg} />
          </IconButton>
          <IconButton variant="outline" size="xm" onClick={() => setLeftViewYear((y) => y + 12)} aria-label="Next decade">
            <O9Icon svg={angleRightSvg} />
          </IconButton>
        </ButtonGroup>
      </div>
      <div className="grid grid-cols-3 gap-1" role="listbox" aria-label={`Years ${startYear} to ${startYear + 11}`}>
        {Array.from({ length: 12 }, (_, i) => startYear + i).map((yr) => {
          const yrStart = new Date(yr, 0, 1);
          const yrEnd = new Date(yr, 11, 31);
          const { start: effStart, end: effEnd } = getEffectiveRange();
          const isStart = effStart && isSameDay(yrStart, effStart);
          const isEnd = effEnd && isSameDay(yrEnd, effEnd);
          const isEndpoint = isStart || isEnd;
          const yrInRange = effStart && effEnd && isInRange(yrStart, effStart, effEnd);
          const isCurrent = yr === today.getFullYear();
          return (
            <button
              key={yr}
              type="button"
              role="option"
              tabIndex={-1}
              aria-selected={isEndpoint || yrInRange}
              aria-label={String(yr)}
              onClick={() => handleYearRangeClick(yr)}
              onMouseEnter={() => { if (selectionPhase === 'start-selected') setHoverDate(new Date(yr, 0, 1)); }}
              onMouseLeave={() => { if (selectionPhase === 'start-selected') setHoverDate(null); }}
              className={cn(
                'py-2 text-xs text-center rounded transition-colors cursor-pointer',
                isEndpoint
                  ? 'bg-interactive text-on-interactive font-bold'
                  : yrInRange
                    ? 'bg-interactive/15 text-text'
                    : isCurrent
                      ? 'border border-interactive-border/30 text-text hover:bg-surface-overlay'
                      : 'text-text-secondary hover:bg-surface-overlay hover:text-text'
              )}
            >
              {yr}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <div className={cn('flex flex-col gap-1', className)}>
        {label && (
          <Label htmlFor={inputId} size={size} required={required} optional={optional} disabled={disabled}>
            {label}
          </Label>
        )}

        {/* Input container */}
        <div
          ref={containerRef}
          className={cn(
            'relative flex items-center border-b',
            'bg-surface-input hover:bg-surface-input-hover transition-[background-color] duration-100',
            !focused && statusBorder[effectiveStatus],
            disabled && 'opacity-50 pointer-events-none border-border-disabled bg-surface-input',
            readOnly && 'border-dashed border-border-strong cursor-default'
          )}
          style={focused && !disabled ? { borderBottomColor: focusBorderColors[effectiveStatus] } : undefined}
        >
          {/* Visual display — always rendered for consistent width sizing */}
          <div
            ref={(node) => { if (!isTyping) setInputRef(node); }}
            id={isTyping ? undefined : inputId}
            tabIndex={!isTyping && !disabled ? 0 : -1}
            role={!isTyping ? 'combobox' : undefined}
            aria-haspopup={!isTyping ? 'dialog' : undefined}
            aria-expanded={!isTyping ? isOpen : undefined}
            aria-controls={!isTyping && isOpen ? `${dropdownId}-panel` : undefined}
            aria-describedby={!isTyping && messageText ? `${dropdownId}-msg` : undefined}
            onFocus={!isTyping ? handleFocus : undefined}
            onBlur={!isTyping ? handleBlur : undefined}
            onKeyDown={!isTyping ? handleInputKeyDown : undefined}
            onClick={!isTyping ? () => {
              if (disabled || readOnly) return;
              if (isInputVariant) { setIsTyping(true); setInputText(value || ''); }
              else { isOpen ? closeDropdown() : openDropdown(); }
            } : undefined}
            style={{ outline: 'none' }}
            className={cn(
              'w-full flex items-center gap-1 bg-transparent',
              isTyping && 'invisible',
              !isInputVariant && 'cursor-pointer',
              sizeStyles[size],
              inputPadRight[size],
              readOnly && 'cursor-default',
              value ? 'text-text' : 'text-text-placeholder'
            )}
          >
            {value && selectedStart && selectedEnd ? (
              <>
                <span className="whitespace-nowrap">{formatDateStr(selectedStart, format)}</span>
                <span className="shrink-0 w-3.5 h-3.5 flex items-center justify-center text-text-tertiary [&_span]:w-3 [&_span]:h-3 [&_svg]:w-3 [&_svg]:h-3">
                  <O9Icon svg={arrowRightSvg} />
                </span>
                <span className="whitespace-nowrap">{formatDateStr(selectedEnd, format)}</span>
              </>
            ) : (
              <>
                <span className="whitespace-nowrap">{format}</span>
                <span className="shrink-0 w-3.5 h-3.5 flex items-center justify-center text-text-tertiary [&_span]:w-3 [&_span]:h-3 [&_svg]:w-3 [&_svg]:h-3">
                  <O9Icon svg={arrowRightSvg} />
                </span>
                <span className="whitespace-nowrap">{format}</span>
              </>
            )}
          </div>

          {/* Text input overlay — absolutely positioned over the visual div when typing */}
          {isInputVariant && isTyping && (
            <input
              ref={setInputRef}
              id={inputId}
              type="text"
              value={inputText}
              onChange={handleInputChange}
              disabled={disabled}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleInputKeyDown}
              aria-haspopup="dialog"
              aria-expanded={isOpen}
              aria-controls={isOpen ? `${dropdownId}-panel` : undefined}
              aria-describedby={messageText ? `${dropdownId}-msg` : undefined}
              style={{ outline: 'none' }}
              className={cn(
                'absolute inset-0 bg-transparent text-text placeholder:text-text-placeholder',
                sizeStyles[size],
                inputPadRight[size],
              )}
            />
          )}

          {/* Trailing area: clear + calendar icon */}
          <span className={cn('absolute top-0 bottom-0 flex items-center gap-1.5', trailingRight[size])}>
            {showClear && (
              <button
                type="button"
                tabIndex={-1}
                onClick={handleClear}
                className={cn(
                  'shrink-0 flex items-center justify-center text-text-tertiary hover:text-text cursor-pointer transition-colors',
                  iconContainerSize[size], iconSize[size]
                )}
                aria-label="Clear date range"
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
                onClick={() => { if (disabled) return; isOpen ? closeDropdown() : openDropdown(); }}
                className={cn(
                  'shrink-0 flex items-center justify-center text-text-tertiary hover:text-text cursor-pointer transition-colors',
                  iconContainerSize[size], iconSize[size]
                )}
                aria-label="Open date range picker"
              >
                <span className={cn('shrink-0 flex items-center justify-center', iconContainerSize[size], iconSize[size])}>
                  <O9Icon svg={calendarRangeSvg} />
                </span>
              </button>
            )}
          </span>
        </div>

        {/* Footer message */}
        {messageText && (
          <p id={`${dropdownId}-msg`} className={cn('text-xs flex items-center gap-1', statusText[effectiveStatus])}>
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
      {isOpen && !disabled && !readOnly && createPortal(
        <div
          ref={dropdownRef}
          id={`${dropdownId}-panel`}
          data-dropdown-id={dropdownId}
          role="dialog"
          aria-label="Choose a date range"
          className="bg-surface-raised border border-border shadow-down"
          style={{ position: 'fixed', top: `${menuPos.top}px`, left: `${menuPos.left}px`, zIndex: 9999 }}
        >
          {/* Range mode tabs */}
          <div className="flex items-center border-b border-border" role="tablist" aria-label="Range selection mode">
            {RANGE_MODES.map((mode) => (
              <button
                key={mode.key}
                type="button"
                role="tab"
                tabIndex={-1}
                aria-selected={rangeMode === mode.key}
                onClick={() => { setRangeMode(mode.key); setSelectionPhase('idle'); setPendingStart(null); setHoverDate(null); }}
                className={cn(
                  'px-4 py-2 text-xs font-medium transition-colors cursor-pointer',
                  rangeMode === mode.key
                    ? 'bg-interactive text-on-interactive'
                    : 'text-text-secondary hover:bg-surface-overlay hover:text-text'
                )}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Dual-panel body */}
          {(rangeMode === 'date' || rangeMode === 'week') && (
            <div className="flex">
              {renderCalendarPanel(leftViewYear, leftViewMonth, leftWeekRows, true, false, 'left')}
              <div className="w-px bg-border" />
              {renderCalendarPanel(rightViewYear, rightViewMonth, rightWeekRows, false, true, 'right')}
            </div>
          )}

          {rangeMode === 'month' && (
            <div className="flex">
              {renderMonthGrid(leftViewYear, true)}
              <div className="w-px bg-border" />
              {renderMonthGrid(leftViewYear + 1, false)}
            </div>
          )}

          {rangeMode === 'year' && (
            <div className="flex">
              {renderYearGrid(leftYearStart, true)}
              <div className="w-px bg-border" />
              {renderYearGrid(rightYearStart, false)}
            </div>
          )}

          {/* Footer */}
          <div className="px-3 py-2 border-t border-border flex items-center justify-between">
            <button
              type="button"
              tabIndex={-1}
              onClick={() => { setLeftViewYear(today.getFullYear()); setLeftViewMonth(today.getMonth()); }}
              className="text-xs text-primary hover:underline cursor-pointer"
            >
              Today
            </button>
            <span aria-live="polite" className="text-[10px] text-text-tertiary">
              {selectionPhase === 'start-selected' && pendingStart
                ? `From: ${formatDateStr(pendingStart, format)} — click end date`
                : ''}
            </span>
          </div>
        </div>,
        document.body
      )}
    </>
  );
});

export default DateRangePicker;
