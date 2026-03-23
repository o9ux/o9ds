import { forwardRef, useState, useEffect, useRef, useMemo } from 'react';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';

import searchSvg from '@/assets/icons/o9con-search.svg?raw';
import closeSvg from '@/assets/icons/o9con-close.svg?raw';
import blockerSvg from '@/assets/icons/o9con-blocker-action-filled-alt.svg?raw';
import angleUpSvg from '@/assets/icons/o9con-angle-up.svg?raw';
import angleDownSvg from '@/assets/icons/o9con-angle-down.svg?raw';
import slidersSvg from '@/assets/icons/o9con-sliders.svg?raw';

/**
 * Search — search input with bottom-border styling and multiple variants.
 *
 * Variants:
 *  - filter-search  : leading search icon, clear + count. Supports multiLine.
 *  - enter-search   : no leading icon, trailing search submit button
 *  - find-search    : leading search icon, up/down navigation arrows
 *  - advance-search : no leading icon, sliders filter button + search submit button
 */

/* ── Focus border colors per status ── */
const focusBorderColors = {
  default: 'var(--color-interactive-border)',
  error:   'var(--color-danger)',
};

/* ── Variants with a leading search icon ── */
const leadingIconVariants = new Set(['filter-search', 'find-search']);

/* ── Icon button ── */
function ActionButton({ svg, label, onClick, size, hidden, className: cls }) {
  const iconSz = { sm: '[&_svg]:h-3 [&_svg]:w-3', md: '[&_svg]:h-3.5 [&_svg]:w-3.5', lg: '[&_svg]:h-4 [&_svg]:w-4' };
  const containerSz = { sm: 'w-3 h-3', md: 'w-3.5 h-3.5', lg: 'w-4 h-4' };

  return (
    <button
      type="button"
      tabIndex={-1}
      onClick={onClick}
      className={cn(
        'flex shrink-0 items-center justify-center text-text-tertiary hover:text-text cursor-pointer',
        containerSz[size], iconSz[size],
        hidden && 'invisible',
        cls
      )}
      aria-label={label}
      aria-hidden={hidden || undefined}
    >
      <O9Icon svg={svg} />
    </button>
  );
}

const Search = forwardRef(function Search(
  {
    variant = 'filter-search',
    size = 'md',
    status = 'default',
    placeholder = 'Search',
    multiLine = false,
    errorText,
    maxLength,
    showCount = false,
    disabled = false,
    readOnly = false,
    shortcutKey = '/',
    onClear,
    onSearch,
    onPrev,
    onNext,
    onFilter,
    matchIndex,
    matchTotal,
    className,
    value: controlledValue,
    onChange,
    ...rest
  },
  ref
) {
  const internalRef = useRef(null);
  const inputRef = ref || internalRef;

  const [internalValue, setInternalValue] = useState('');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  /* ── Multiline: parse lines ── */
  const lines = useMemo(() => String(value).split('\n').filter(Boolean), [value]);
  const lineCount = lines.length;

  /* ── Find-search line navigation state ── */
  const [activeLineIndex, setActiveLineIndex] = useState(0);

  const handleChange = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    onClear?.();
    onChange?.({ target: { value: '' } });
    setActiveLineIndex(0);
    if (inputRef?.current) inputRef.current.focus();
  };

  const handleFocus = (e) => {
    setFocused(true);
    rest.onFocus?.(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    rest.onBlur?.(e);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (variant === 'enter-search' || variant === 'advance-search')) {
      e.preventDefault();
      onSearch?.(value);
    }
    rest.onKeyDown?.(e);
  };

  /* ── Find-search: up/down navigate lines in multiline text ── */
  const handlePrev = () => {
    if (multiLine && lineCount > 0) {
      const newIdx = Math.max(0, activeLineIndex - 1);
      setActiveLineIndex(newIdx);
      onPrev?.(newIdx, lines[newIdx]);
    } else {
      onPrev?.();
    }
  };

  const handleNext = () => {
    if (multiLine && lineCount > 0) {
      const newIdx = Math.min(lineCount - 1, activeLineIndex + 1);
      setActiveLineIndex(newIdx);
      onNext?.(newIdx, lines[newIdx]);
    } else {
      onNext?.();
    }
  };

  /* ── Keyboard shortcut to focus ── */
  useEffect(() => {
    if (!shortcutKey) return;
    const handler = (e) => {
      if (e.key === shortcutKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = document.activeElement?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
        e.preventDefault();
        inputRef?.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [shortcutKey, inputRef]);

  /* ── Derived state ── */
  const currentLength = String(value).length;
  const hasValue = currentLength > 0;
  const showLeading = leadingIconVariants.has(variant);
  const isInteracting = focused || hovered;
  const canClear = hasValue && !readOnly && !disabled;

  const showShortcut = !hasValue && !focused && !!shortcutKey;

  /* ── Count display ── */
  const showMatchCount = variant === 'find-search' && matchTotal != null && hasValue;
  const showCountDisplay = showCount && maxLength != null;

  // In multiline mode count shows lines; in single-line mode count shows characters
  const countText = showMatchCount
    ? `${matchIndex ?? 0}/${matchTotal}`
    : showCountDisplay
      ? multiLine
        ? `${lineCount}/${maxLength}`
        : `${currentLength}/${maxLength}`
      : null;

  const hasVariantActions =
    variant === 'enter-search' ||
    variant === 'find-search' ||
    variant === 'advance-search';

  /* ── Size config ── */
  const sizeStyles = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm',
  };

  const heightStyles = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
  };

  const iconSize = {
    sm: 'text-[12px]',
    md: 'text-[14px]',
    lg: 'text-[16px]',
  };

  const padBase = { sm: 8, md: 12, lg: 12 };
  const leadingPad = { sm: 24, md: 32, lg: 36 };
  const iconLeft = { sm: 'left-2', md: 'left-3', lg: 'left-3' };

  const statusBorder = {
    default: 'border-border-hover hover:border-border-strong',
    error:   'border-danger',
  };

  const hasFooter = errorText && status === 'error';
  const isMultiLine = multiLine && variant === 'filter-search';

  /* ── Compute a fixed trailing padding based on variant (always reserves space) ── */
  const trailingSlots = (() => {
    // shortcut/clear + count = 2 slots always reserved
    let slots = 2;
    if (hasVariantActions) slots += 1; // divider
    if (variant === 'find-search') slots += 2; // prev + next
    if (variant === 'advance-search') slots += 2; // filter + search
    if (variant === 'enter-search') slots += 1; // search
    return slots;
  })();
  // Each slot ~18px (icon 14px + gap 4px), plus pr-2
  const fixedTrailingPad = trailingSlots * 18 + 8;

  /* ── Shared input props ── */
  const inputStyle = {
    outline: 'none',
    paddingLeft: showLeading ? leadingPad[size] : padBase[size],
    paddingRight: fixedTrailingPad,
    resize: 'none',
  };

  const inputClasses = cn(
    'w-full bg-transparent text-text placeholder:text-text-placeholder',
    sizeStyles[size],
  );

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div
        className={cn(
          'relative flex border-b',
          isMultiLine ? 'items-start' : 'items-center',
          'bg-surface-input hover:bg-surface-input-hover transition-[background-color] duration-100',
          !focused && statusBorder[status],
          disabled && 'opacity-50 pointer-events-none border-border-disabled bg-surface-input',
          readOnly && 'border-dashed border-border-strong cursor-default'
        )}
        style={focused && !disabled ? { borderBottomColor: focusBorderColors[status] } : undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Leading search icon */}
        {showLeading && (
          <span
            className={cn(
              'pointer-events-none absolute flex shrink-0 items-center justify-center text-text-tertiary',
              iconLeft[size], iconSize[size],
              isMultiLine ? 'top-2' : ''
            )}
          >
            <O9Icon svg={searchSvg} />
          </span>
        )}

        {/* Input: textarea for multiline, input for single-line */}
        {isMultiLine ? (
          <textarea
            ref={inputRef}
            value={value}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            rows={3}
            style={inputStyle}
            className={cn(
              inputClasses,
              'py-2 min-h-[60px] max-h-40 overflow-y-auto',
            )}
            {...rest}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <input
            ref={inputRef}
            type="search"
            value={value}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            placeholder={placeholder}
            style={inputStyle}
            className={cn(
              inputClasses,
              heightStyles[size],
              '[&::-webkit-search-cancel-button]:appearance-none',
            )}
            {...rest}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        )}

        {/* Trailing actions area — always rendered for stable width */}
        <div
          className={cn(
            'absolute right-0 flex items-center gap-1.5 pr-2',
            isMultiLine ? 'top-1.5' : 'top-0 bottom-0'
          )}
        >
          {/* Clear button — always rendered, hidden when not needed for stable width */}
          <ActionButton
            svg={closeSvg}
            label="Clear search"
            onClick={handleClear}
            size={size}
            hidden={!canClear || !isInteracting}
          />

          {/* Count / Shortcut slot — mutually exclusive: "/" when empty+unfocused, count when value present */}
          {showShortcut ? (
            <span className="flex items-center justify-center shrink-0 text-text-tertiary text-[10px] leading-none min-w-[24px] h-4">
              <span className="flex items-center justify-center w-4 h-4 rounded border border-border-form">
                {shortcutKey}
              </span>
            </span>
          ) : countText ? (
            <span className="text-xs tabular-nums shrink-0 min-w-[24px] text-right text-text-tertiary">
              {countText}
            </span>
          ) : null}

          {/* Divider before variant-specific actions */}
          {hasVariantActions && (
            <span className="w-px h-4 bg-border-form shrink-0" />
          )}

          {/* Find-search: prev/next navigation */}
          {variant === 'find-search' && (
            <>
              <ActionButton svg={angleUpSvg} label="Previous match" onClick={handlePrev} size={size} />
              <ActionButton svg={angleDownSvg} label="Next match" onClick={handleNext} size={size} />
            </>
          )}

          {/* Advance-search: sliders filter button */}
          {variant === 'advance-search' && (
            <ActionButton svg={slidersSvg} label="Advanced filter" onClick={() => onFilter?.()} size={size} />
          )}

          {/* Enter-search & advance-search: search submit button */}
          {(variant === 'enter-search' || variant === 'advance-search') && (
            <ActionButton svg={searchSvg} label="Submit search" onClick={() => onSearch?.(value)} size={size} />
          )}
        </div>
      </div>

      {/* Footer: error message */}
      {hasFooter && (
        <p className="text-xs flex items-center gap-1 text-danger">
          <span className="shrink-0 w-3 h-3 [&_svg]:h-3 [&_svg]:w-3 flex items-center justify-center">
            <O9Icon svg={blockerSvg} />
          </span>
          <span>{errorText}</span>
        </p>
      )}
    </div>
  );
});

export default Search;
