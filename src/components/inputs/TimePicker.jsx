import { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="8" cy="8" r="6" />
    <path d="M8 4v4l2.5 2.5" />
  </svg>
);

function generateHours(is24) {
  const hours = [];
  const max = is24 ? 24 : 12;
  const start = is24 ? 0 : 1;
  for (let i = start; i <= (is24 ? 23 : max); i++) {
    hours.push(String(i).padStart(2, '0'));
  }
  return hours;
}

function generateMinutes(step = 1) {
  const minutes = [];
  for (let i = 0; i < 60; i += step) {
    minutes.push(String(i).padStart(2, '0'));
  }
  return minutes;
}

const TimePicker = forwardRef(function TimePicker(
  {
    value = '',
    onChange,
    placeholder = 'HH:MM',
    disabled = false,
    error = false,
    is24Hour = true,
    minuteStep = 5,
    className,
    ...rest
  },
  ref
) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const containerRef = useRef(null);

  const hours = generateHours(is24Hour);
  const minutes = generateMinutes(minuteStep);

  useEffect(() => {
    setInputValue(value);
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

  const [selectedHour, selectedMinute] = (value || '').split(':');

  const selectTime = (h, m) => {
    const timeStr = `${h}:${m}`;
    onChange?.(timeStr);
    setInputValue(timeStr);
  };

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
            // Validate HH:MM pattern
            if (/^\d{2}:\d{2}$/.test(e.target.value)) {
              onChange?.(e.target.value);
            }
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent outline-none text-text placeholder:text-text-tertiary w-[60px]"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className="shrink-0 text-text-tertiary cursor-pointer"
        >
          <ClockIcon />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 rounded border border-border bg-surface-raised shadow-lg flex">
          {/* Hours */}
          <div className="w-14 max-h-48 overflow-auto border-r border-border py-1">
            <div className="px-2 py-1 text-[10px] font-bold uppercase text-text-tertiary">Hr</div>
            {hours.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => selectTime(h, selectedMinute || '00')}
                className={cn(
                  'w-full px-2 py-1 text-sm text-left transition-colors cursor-pointer',
                  h === selectedHour
                    ? 'bg-interactive text-on-interactive font-medium'
                    : 'text-text-secondary hover:bg-surface-overlay hover:text-text'
                )}
              >
                {h}
              </button>
            ))}
          </div>
          {/* Minutes */}
          <div className="w-14 max-h-48 overflow-auto py-1">
            <div className="px-2 py-1 text-[10px] font-bold uppercase text-text-tertiary">Min</div>
            {minutes.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  selectTime(selectedHour || '00', m);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full px-2 py-1 text-sm text-left transition-colors cursor-pointer',
                  m === selectedMinute
                    ? 'bg-interactive text-on-interactive font-medium'
                    : 'text-text-secondary hover:bg-surface-overlay hover:text-text'
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default TimePicker;
