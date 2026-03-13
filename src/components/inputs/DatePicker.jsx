import { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="3" width="12" height="11" rx="1" />
    <path d="M5 1v3M11 1v3M2 7h12" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 3L5 7l4 4" />
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M5 3l4 4-4 4" />
  </svg>
);

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay();
}

function formatDate(date) {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseDate(str) {
  if (!str) return null;
  const [y, m, d] = str.split('-').map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

const DatePicker = forwardRef(function DatePicker(
  {
    value,
    onChange,
    placeholder = 'YYYY-MM-DD',
    disabled = false,
    error = false,
    min,
    max,
    className,
    ...rest
  },
  ref
) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const containerRef = useRef(null);

  const selectedDate = parseDate(value);
  const today = new Date();
  const [viewYear, setViewYear] = useState(selectedDate?.getFullYear() || today.getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDate?.getMonth() ?? today.getMonth());

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  // Outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const selectDay = (day) => {
    const date = new Date(viewYear, viewMonth, day);
    const formatted = formatDate(date);
    onChange?.(formatted);
    setInputValue(formatted);
    setIsOpen(false);
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getFullYear() === viewYear &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getDate() === day
    );
  };

  const isToday = (day) => {
    return (
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      today.getDate() === day
    );
  };

  const isDisabledDate = (day) => {
    const date = new Date(viewYear, viewMonth, day);
    if (min && date < parseDate(min)) return true;
    if (max && date > parseDate(max)) return true;
    return false;
  };

  // Build grid
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div ref={containerRef} className={cn('relative inline-block', className)} {...rest}>
      <div
        className={cn(
          'flex items-center gap-1 h-9 px-3',
          'border rounded bg-surface-overlay text-sm',
          'transition-colors',
          error
            ? 'border-danger focus-within:ring-1 focus-within:ring-danger'
            : 'border-border-strong focus-within:border-interactive-border focus-within:ring-1 focus-within:ring-interactive-border',
          disabled && 'opacity-35 pointer-events-none'
        )}
      >
        <input
          ref={ref}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            const parsed = parseDate(e.target.value);
            if (parsed) {
              onChange?.(e.target.value);
              setViewYear(parsed.getFullYear());
              setViewMonth(parsed.getMonth());
            }
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent outline-none text-text placeholder:text-text-tertiary w-[100px]"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className="shrink-0 text-text-tertiary cursor-pointer"
        >
          <CalendarIcon />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-[280px] rounded border border-border bg-surface-raised shadow-lg p-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={prevMonth}
              className="h-7 w-7 flex items-center justify-center rounded hover:bg-surface-overlay text-text-secondary cursor-pointer"
            >
              <ChevronLeft />
            </button>
            <span className="text-sm font-semibold text-text">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="h-7 w-7 flex items-center justify-center rounded hover:bg-surface-overlay text-text-secondary cursor-pointer"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map((d) => (
              <div key={d} className="h-8 flex items-center justify-center text-[10px] font-bold uppercase text-text-tertiary">
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7">
            {cells.map((day, idx) =>
              day === null ? (
                <div key={`e-${idx}`} className="h-8" />
              ) : (
                <button
                  key={day}
                  type="button"
                  disabled={isDisabledDate(day)}
                  onClick={() => selectDay(day)}
                  className={cn(
                    'h-8 w-8 flex items-center justify-center rounded text-xs transition-colors cursor-pointer mx-auto',
                    isSelected(day)
                      ? 'bg-interactive text-on-interactive font-bold'
                      : isToday(day)
                        ? 'border border-interactive-border/30 text-text hover:bg-surface-overlay'
                        : 'text-text-secondary hover:bg-surface-overlay hover:text-text',
                    isDisabledDate(day) && 'opacity-30 pointer-events-none'
                  )}
                >
                  {day}
                </button>
              )
            )}
          </div>

          {/* Today button */}
          <div className="mt-2 pt-2 border-t border-border">
            <button
              type="button"
              onClick={() => {
                setViewYear(today.getFullYear());
                setViewMonth(today.getMonth());
                selectDay(today.getDate());
              }}
              className="text-xs text-primary hover:underline cursor-pointer"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default DatePicker;
