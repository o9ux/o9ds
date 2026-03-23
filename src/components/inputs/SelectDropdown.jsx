import { forwardRef, useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import Label from '@/components/inputs/Label';
import O9Icon from '@/components/O9Icon';

import blockerSvg from '@/assets/icons/o9con-blocker-action-filled-alt.svg?raw';
import exclamationSvg from '@/assets/icons/o9con-exclamation-triangle-filled.svg?raw';
import closeSvg from '@/assets/icons/o9con-close.svg?raw';

/**
 * SelectDropdown — single-select dropdown with Textbox bottom-border styling.
 *
 * Figma reference: node 29111-14429
 *
 * Two interaction variants:
 *  - select-only (default):  Button trigger — click to open, click to select
 *  - searchable:             Input trigger — type to filter, then select
 *
 * Features:
 *  - Textbox bottom-border design language (border-b, bg-surface-input)
 *  - Three sizes: sm (28px), md (32px), lg (40px)
 *  - Optional category grouping via `group` property on options
 *  - Keyboard navigation (ArrowUp/Down, Enter, Escape, Home, End)
 *  - Error/warning/helper footer messages with status icons
 *  - Disabled / ReadOnly states
 *  - Portal-based dropdown (escapes overflow:hidden parents)
 *  - Optional leading icon per option
 */

/* ── Inline SVGs ── */
const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 6l4 4 4-4" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 7l3 3 5-5" />
  </svg>
);

/* ── Status text colors ── */
const statusText = {
  default: 'text-text-tertiary',
  error:   'text-danger',
  warning: 'text-warning',
};

/* ── Status message icons ── */
const statusIcons = {
  error:   blockerSvg,
  warning: exclamationSvg,
};

/* ── Focus border colors per status ── */
const focusBorderColors = {
  default: 'var(--color-interactive-border)',
  error:   'var(--color-danger)',
  warning: 'var(--color-warning)',
};

/* ── Status border colors (default/hover — focus handled via React state) ── */
const statusBorder = {
  default: 'border-border-hover hover:border-border-strong',
  error:   'border-danger',
  warning: 'border-warning/60 hover:border-warning',
};

/* ── Size styles: sm=28px, md=32px, lg=40px ── */
const sizeStyles = {
  sm: 'h-7 px-2 text-xs',
  md: 'h-8 px-3 text-xs',
  lg: 'h-10 px-3 text-sm',
};

/* ── Chevron positioning per size ── */
const chevronRight = { sm: 'right-2', md: 'right-3', lg: 'right-3' };

/* ── Input right padding (for trailing icons clearance) ── */
const trailingPadRight = { sm: 'pr-6', md: 'pr-8', lg: 'pr-9' };
const trailingPadRightClearable = { sm: 'pr-10', md: 'pr-12', lg: 'pr-14' };

const SelectDropdown = forwardRef(function SelectDropdown(
  {
    options = [],
    value: controlledValue,
    onChange,
    searchable = false,
    clearable = false,
    size = 'md',
    status = 'default',
    label,
    required = false,
    optional = false,
    placeholder = 'Select...',
    helperText,
    errorText,
    warningText,
    emptyMessage = 'No results found',
    disabled = false,
    readOnly = false,
    className,
    id,
    ...rest
  },
  ref
) {
  const inputId = id || (label ? `sd-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  /* ── State ── */
  const [internalValue, setInternalValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 0 });

  /* ── Refs ── */
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const dropdownId = useRef(
    `sd-${Math.random().toString(36).slice(2, 8)}`
  ).current;

  /* ── Controlled / uncontrolled value ── */
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  /* ── Normalize options ── */
  const normalizedOptions = useMemo(
    () => options.map((opt) => (typeof opt === 'string' ? { value: opt, label: opt } : opt)),
    [options]
  );

  /* ── Selected option ── */
  const selectedOption = useMemo(
    () => normalizedOptions.find((o) => o.value === value),
    [normalizedOptions, value]
  );

  /* ── Filter by search (only when searchable) ── */
  const filteredOptions = useMemo(
    () =>
      searchable && search
        ? normalizedOptions.filter((opt) =>
            opt.label.toLowerCase().includes(search.toLowerCase())
          )
        : normalizedOptions,
    [normalizedOptions, search, searchable]
  );

  /* ── Flat list of non-disabled options for keyboard nav ── */
  const navigableOptions = useMemo(
    () => filteredOptions.filter((o) => !o.disabled),
    [filteredOptions]
  );

  /* ── Grouping ── */
  const hasGroups = useMemo(
    () => normalizedOptions.some((o) => o.group),
    [normalizedOptions]
  );

  const groupedOptions = useMemo(() => {
    if (!hasGroups) return null;
    const groups = {};
    const order = [];
    filteredOptions.forEach((opt) => {
      const key = opt.group || 'Other';
      if (!groups[key]) {
        groups[key] = [];
        order.push(key);
      }
      groups[key].push(opt);
    });
    return order.map((key) => [key, groups[key]]);
  }, [hasGroups, filteredOptions]);

  /* ── Required-empty auto-error ── */
  const isEmpty = !value;
  const requiredError = required && isEmpty && !disabled && !readOnly;
  const effectiveStatus = requiredError ? 'error' : status;

  /* ── Message resolution ── */
  const messageText =
    requiredError
      ? (errorText || 'This field is required')
      : effectiveStatus === 'error'
        ? errorText
        : effectiveStatus === 'warning'
          ? warningText
          : helperText;
  const messageIconSvg = statusIcons[effectiveStatus] || null;
  const hasFooter = !!messageText;

  /* ── Resolve trailing right padding ── */
  const showClear = clearable && value && !disabled && !readOnly;
  const inputPadRight = showClear ? trailingPadRightClearable : trailingPadRight;

  /* ── Handlers ── */
  const handleClear = (e) => {
    e.stopPropagation();
    if (!isControlled) setInternalValue('');
    onChange?.('');
    setSearch('');
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const handleSelect = (optValue) => {
    if (!isControlled) setInternalValue(optValue);
    onChange?.(optValue);
    setIsOpen(false);
    setSearch('');
    setHighlightIndex(-1);
    /* Return focus to trigger */
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const openDropdown = () => {
    if (disabled || readOnly) return;
    setIsOpen(true);
    /* Set highlight to current selection */
    const idx = navigableOptions.findIndex((o) => o.value === value);
    setHighlightIndex(idx >= 0 ? idx : -1);
    if (searchable) {
      setSearch('');
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setSearch('');
    setHighlightIndex(-1);
  };

  /* ── Position tracking for portal dropdown ── */
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const updatePosition = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMenuPos({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
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

  /* ── Click-outside detection ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (containerRef.current?.contains(e.target)) return;
      if (e.target.closest(`[data-dropdown-id="${dropdownId}"]`)) return;
      closeDropdown();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, dropdownId]);

  /* ── Keyboard handling ── */
  const handleKeyDown = (e) => {
    if (disabled || readOnly) return;

    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDropdown();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightIndex((i) => {
          const next = i + 1;
          return next < navigableOptions.length ? next : i;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightIndex((i) => {
          const prev = i - 1;
          return prev >= 0 ? prev : i;
        });
        break;
      case 'Home':
        e.preventDefault();
        setHighlightIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setHighlightIndex(navigableOptions.length - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightIndex >= 0 && navigableOptions[highlightIndex]) {
          handleSelect(navigableOptions[highlightIndex].value);
        }
        break;
      case 'Escape':
        e.preventDefault();
        closeDropdown();
        triggerRef.current?.focus();
        break;
      case 'Tab':
        closeDropdown();
        break;
      default:
        break;
    }
  };

  /* ── Search input change (searchable only) ── */
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setHighlightIndex(-1);
    if (!isOpen) setIsOpen(true);
  };

  /* ── Render a single option ── */
  const renderOption = (opt, flatIdx) => {
    const isSelected = opt.value === value;
    const navIdx = navigableOptions.findIndex((o) => o.value === opt.value);
    const isHighlighted = navIdx >= 0 && navIdx === highlightIndex;

    return (
      <button
        key={opt.value}
        type="button"
        role="option"
        aria-selected={isSelected}
        aria-disabled={opt.disabled || undefined}
        disabled={opt.disabled}
        onClick={() => handleSelect(opt.value)}
        className={cn(
          'w-full flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer transition-colors text-left',
          'disabled:opacity-35 disabled:pointer-events-none',
          isHighlighted && 'bg-surface-overlay',
          isSelected
            ? 'text-text bg-interactive-subtle'
            : !isHighlighted && 'text-text-secondary hover:bg-interactive-subtle hover:text-text'
        )}
      >
        {/* Optional leading icon */}
        {opt.icon && (
          <span className="shrink-0 [&_svg]:h-4 [&_svg]:w-4 text-text-tertiary" aria-hidden="true">
            {opt.icon}
          </span>
        )}
        <span className="flex-1 truncate">{opt.label}</span>
        {isSelected && (
          <span className="shrink-0 ml-2 text-text">
            <CheckIcon />
          </span>
        )}
      </button>
    );
  };

  /* ── Display text for select-only trigger ── */
  const displayLabel = selectedOption?.label || '';

  return (
    <div className={cn('flex flex-col gap-1', className)} {...rest}>
      {/* ── Label ── */}
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

      {/* ── Input container (Textbox-style bottom-border) ── */}
      <div
        ref={containerRef}
        className={cn(
          'relative border-b transition-[background-color] duration-100',
          'bg-surface-input hover:bg-surface-input-hover',
          !focused && statusBorder[effectiveStatus],
          disabled && 'opacity-50 pointer-events-none border-border-disabled bg-surface-input',
          readOnly && 'border-dashed border-border-strong cursor-default'
        )}
        style={
          focused && !disabled
            ? { borderBottomColor: focusBorderColors[effectiveStatus] || focusBorderColors.default }
            : undefined
        }
      >
        {searchable ? (
          /* ── Searchable: input element ── */
          <input
            ref={(node) => {
              triggerRef.current = node;
              if (typeof ref === 'function') ref(node);
              else if (ref) ref.current = node;
            }}
            id={inputId}
            type="text"
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            value={isOpen ? search : displayLabel}
            onChange={handleSearchChange}
            onFocus={() => {
              setFocused(true);
              if (!readOnly && !disabled) {
                openDropdown();
              }
            }}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            style={{ outline: 'none' }}
            className={cn(
              'w-full bg-transparent text-text placeholder:text-text-placeholder',
              sizeStyles[size],
              inputPadRight[size]
            )}
          />
        ) : (
          /* ── Select-only: button element ── */
          <button
            ref={(node) => {
              triggerRef.current = node;
              if (typeof ref === 'function') ref(node);
              else if (ref) ref.current = node;
            }}
            id={inputId}
            type="button"
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            onClick={() => {
              if (readOnly) return;
              isOpen ? closeDropdown() : openDropdown();
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className={cn(
              'w-full flex items-center text-left bg-transparent',
              sizeStyles[size],
              inputPadRight[size],
              readOnly && 'pointer-events-none'
            )}
          >
            <span
              className={cn(
                'flex-1 truncate',
                displayLabel ? 'text-text' : 'text-text-placeholder'
              )}
            >
              {displayLabel || placeholder}
            </span>
          </button>
        )}

        {/* ── Trailing area: clear + chevron ── */}
        <span
          className={cn(
            'absolute top-0 bottom-0 flex items-center gap-1',
            chevronRight[size]
          )}
        >
          {/* Clear button */}
          {showClear && (
            <button
              type="button"
              tabIndex={-1}
              onClick={handleClear}
              className="shrink-0 flex items-center justify-center w-4 h-4 text-text-tertiary hover:text-text cursor-pointer transition-colors"
              aria-label="Clear selection"
            >
              <O9Icon svg={closeSvg} />
            </button>
          )}
          {/* Chevron — clickable to toggle dropdown */}
          <button
            type="button"
            tabIndex={-1}
            onClick={() => {
              if (disabled || readOnly) return;
              isOpen ? closeDropdown() : openDropdown();
              triggerRef.current?.focus();
            }}
            className={cn(
              'shrink-0 flex items-center justify-center text-text-tertiary hover:text-text cursor-pointer transition-all duration-150',
              isOpen && 'rotate-180'
            )}
            aria-label={isOpen ? 'Close dropdown' : 'Open dropdown'}
          >
            <ChevronIcon />
          </button>
        </span>
      </div>

      {/* ── Portal dropdown ── */}
      {isOpen &&
        !disabled &&
        !readOnly &&
        createPortal(
          <div
            data-dropdown-id={dropdownId}
            role="listbox"
            aria-label={label || 'Options'}
            className="bg-surface-raised border border-border py-1 max-h-60 overflow-y-auto shadow-down"
            style={{
              position: 'fixed',
              top: `${menuPos.top}px`,
              left: `${menuPos.left}px`,
              width: `${menuPos.width}px`,
              zIndex: 9999,
            }}
          >
            {/* ── Grouped options ── */}
            {hasGroups && groupedOptions
              ? groupedOptions.map(([groupName, items], groupIdx) => (
                  <div role="group" aria-label={groupName} key={groupName}>
                    {/* Separator between categories */}
                    {groupIdx > 0 && (
                      <div className="mx-3 my-1 border-t border-border" role="separator" />
                    )}
                    <div
                      role="presentation"
                      className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-text-tertiary select-none"
                    >
                      {groupName}
                    </div>
                    {items.map((opt, idx) => renderOption(opt, idx))}
                  </div>
                ))
              : /* ── Flat options ── */
                filteredOptions.map((opt, idx) => renderOption(opt, idx))}

            {/* ── Empty state ── */}
            {filteredOptions.length === 0 && (
              <div className="px-3 py-2 text-xs text-text-tertiary">
                {emptyMessage}
              </div>
            )}
          </div>,
          document.body
        )}

      {/* ── Footer message (error/warning/helper) ── */}
      {hasFooter && (
        <div className="flex items-start justify-between gap-2">
          <p
            className={cn(
              'text-xs flex items-center gap-1',
              statusText[effectiveStatus] || statusText.default
            )}
          >
            {messageIconSvg && (
              <span className="shrink-0 w-3 h-3 flex items-center justify-center text-xs">
                <O9Icon svg={messageIconSvg} />
              </span>
            )}
            <span>{messageText}</span>
          </p>
        </div>
      )}
    </div>
  );
});

export default SelectDropdown;
