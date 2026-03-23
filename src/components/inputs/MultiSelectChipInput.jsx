import { forwardRef, useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import Chip from '@/components/inputs/Chip';
import Label from '@/components/inputs/Label';
import Button from '@/components/buttons/Button';
import Checkbox from '@/components/inputs/Checkbox';
import O9Icon from '@/components/O9Icon';

import blockerSvg from '@/assets/icons/o9con-blocker-action-filled-alt.svg?raw';
import exclamationSvg from '@/assets/icons/o9con-exclamation-triangle-filled.svg?raw';
import closeSvg from '@/assets/icons/o9con-close.svg?raw';


/**
 * MultiSelectChipInput — enhanced multi-select input that renders
 * selected items as Chip components inside a Textbox-style container
 * with a portal-based dropdown menu.
 *
 * Features:
 *  - Textbox bottom-border styling
 *  - Real Chip components for selections (primary/secondary/tertiary)
 *  - Overflow with "+N more" / "Show less" toggle (via maxVisible)

 *  - Optional "Select All"
 *  - Optional category grouping via `group` property on options
 *  - Error/warning/helper messages (Textbox pattern)
 *  - Disabled / ReadOnly states
 *  - Clear All button
 *
 * Figma reference: node 26482-67446
 */

/* ── Inline SVGs ── */
const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 6l4 4 4-4" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2.5 6l2.5 2.5 4.5-4.5" />
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

/* ── Input size mapping ── */
const inputSizeStyles = {
  sm: 'min-h-7 px-1.5 text-xs',
  md: 'min-h-8 px-2 text-xs',
  lg: 'min-h-10 px-2 text-sm',
};

/* ── Chip size inside input (1:1 mapping) ── */
const chipSizeMap = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

/* ── Overflow button size ── */
const overflowBtnSize = { sm: 'sm', md: 'sm', lg: 'sm' };

/* ── Trailing area: first-row height (keeps clear/chevron pinned) ── */
const inputMinH = { sm: 'min-h-7', md: 'min-h-8', lg: 'min-h-10' };

/* ── Checkbox size for Select All inside input ── */
const checkboxSizeMap = { sm: 'sm', md: 'sm', lg: 'lg' };

const MultiSelectChipInput = forwardRef(function MultiSelectChipInput(
  {
    options = [],
    value = [],
    onChange,

    variant = 'primary',
    size = 'md',
    placeholder = 'Select...',

    label,
    required = false,
    optional = false,

    maxVisible,

    status = 'default',
    helperText,
    errorText,
    warningText,

    disabled = false,
    readOnly = false,

    selectAll = false,
    emptyMessage = 'No options found',

    className,
    id,
    ...rest
  },
  ref
) {
  const inputId = id || (label ? `msci-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  /* ── State ── */
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [focused, setFocused] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, minWidth: 0 });

  /* ── Refs ── */
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownId = useRef(
    `msci-${Math.random().toString(36).slice(2, 8)}`
  ).current;

  /* ── Normalize options ── */
  const normalizedOptions = useMemo(
    () => options.map((opt) => (typeof opt === 'string' ? { value: opt, label: opt } : opt)),
    [options]
  );

  /* ── Filter by search ── */
  const filteredOptions = useMemo(
    () =>
      normalizedOptions.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
      ),
    [normalizedOptions, search]
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

  /* ── Selected set for fast lookup ── */
  const selectedSet = useMemo(() => new Set(value), [value]);

  /* ── Select All logic ── */
  const selectableOptions = useMemo(
    () => filteredOptions.filter((o) => !o.disabled),
    [filteredOptions]
  );
  const allSelected =
    selectableOptions.length > 0 &&
    selectableOptions.every((o) => selectedSet.has(o.value));
  const someSelected =
    !allSelected && selectableOptions.some((o) => selectedSet.has(o.value));

  /* ── Overflow ── */
  const hasOverflow = maxVisible != null && value.length > maxVisible;
  const visibleValues = hasOverflow && !expanded ? value.slice(0, maxVisible) : value;
  const hiddenCount = hasOverflow ? value.length - maxVisible : 0;

  /* ── Message resolution ── */
  const messageText =
    status === 'error'
      ? errorText
      : status === 'warning'
        ? warningText
        : helperText;
  const messageIconSvg = statusIcons[status] || null;
  const hasFooter = !!messageText;

  /* ── Handlers ── */
  const toggleOption = (optValue) => {
    const next = selectedSet.has(optValue)
      ? value.filter((v) => v !== optValue)
      : [...value, optValue];
    onChange?.(next);
  };

  const removeValue = (optValue) => {
    onChange?.(value.filter((v) => v !== optValue));
  };

  const clearAll = () => {
    onChange?.([]);
  };

  const handleSelectAll = () => {
    if (allSelected) {
      /* Deselect all selectable options (keep non-filtered / disabled selections) */
      const selectableValues = new Set(selectableOptions.map((o) => o.value));
      onChange?.(value.filter((v) => !selectableValues.has(v)));
    } else {
      /* Select all selectable options (merge with existing) */
      const existing = new Set(value);
      selectableOptions.forEach((o) => existing.add(o.value));
      onChange?.([...existing]);
    }
  };

  const openDropdown = () => {
    if (disabled || readOnly) return;
    setIsOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setSearch('');
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
        minWidth: rect.width,
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
      /* Check if click is inside the container or the portalled dropdown */
      if (containerRef.current?.contains(e.target)) return;
      if (e.target.closest(`[data-dropdown-id="${dropdownId}"]`)) return;
      closeDropdown();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, dropdownId]);

  /* ── Keyboard handling ── */
  const handleInputKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeDropdown();
      e.preventDefault();
    }
    if (e.key === 'Backspace' && search === '' && value.length > 0) {
      /* Remove last chip on Backspace when search is empty */
      removeValue(value[value.length - 1]);
    }
  };

  /* ── Render option item ── */
  const renderOption = (opt) => {
    const isSelected = selectedSet.has(opt.value);
    return (
      <button
        key={opt.value}
        type="button"
        role="option"
        aria-selected={isSelected}
        aria-disabled={opt.disabled || undefined}
        disabled={opt.disabled}
        onClick={() => toggleOption(opt.value)}
        className={cn(
          'w-full flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer transition-colors text-left',
          'disabled:opacity-35 disabled:pointer-events-none',
          isSelected
            ? 'text-text bg-interactive-subtle'
            : 'text-text-secondary hover:bg-interactive-subtle hover:text-text'
        )}
      >
        {/* Checkbox indicator */}
        <span
          className={cn(
            'h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-colors',
            isSelected
              ? 'bg-interactive border-interactive text-on-interactive'
              : 'border-border-strong'
          )}
        >
          {isSelected && <CheckIcon />}
        </span>
        {/* Optional icon */}
        {opt.icon && (
          <span className="shrink-0 [&_svg]:h-4 [&_svg]:w-4 text-text-tertiary" aria-hidden="true">
            {opt.icon}
          </span>
        )}
        <span className="flex-1 truncate">{opt.label}</span>
      </button>
    );
  };

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
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled || undefined}
        aria-invalid={status === 'error' || undefined}
        onClick={openDropdown}
        className={cn(
          'relative border-b transition-[background-color] duration-100',
          'bg-surface-input hover:bg-surface-input-hover',
          !focused && statusBorder[status],
          disabled && 'opacity-50 pointer-events-none border-border-disabled bg-surface-input',
          readOnly && 'border-dashed border-border-strong cursor-default'
        )}
        style={
          focused && !disabled
            ? { borderBottomColor: focusBorderColors[status] || focusBorderColors.default }
            : undefined
        }
      >
        {selectAll ? (
          /* ── Select All layout: single flex-wrap so chips wrap full-width ── */
          <div
            className={cn(
              'flex flex-wrap items-center gap-1',
              size === 'lg' ? 'py-1' : 'py-0.5',
              inputSizeStyles[size],
              !readOnly && 'pr-12'
            )}
          >
            {/* Select All checkbox */}
            <Checkbox
              size={checkboxSizeMap[size]}
              checked={allSelected}
              indeterminate={!allSelected && someSelected}
              onChange={handleSelectAll}
              label="Select all"
              disabled={disabled}
              readOnly={readOnly}
              className="shrink-0 whitespace-nowrap"
            />
            {visibleValues.map((val) => {
              const opt = normalizedOptions.find((o) => o.value === val);
              if (!opt) return null;
              return (
                <Chip
                  key={val}
                  variant={variant}
                  size={chipSizeMap[size]}
                  removable={!readOnly && !disabled}
                  onRemove={() => removeValue(val)}
                >
                  {opt.label}
                </Chip>
              );
            })}
            {hasOverflow && (
              <Button
                variant="secondary"
                size={overflowBtnSize[size] || 'sm'}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
                className="shrink-0"
              >
                {expanded ? 'Show less' : `+${hiddenCount} more`}
              </Button>
            )}
            {!readOnly && !disabled && (
              <input
                ref={inputRef}
                id={inputId}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (!isOpen) setIsOpen(true);
                }}
                onFocus={() => {
                  setFocused(true);
                  if (!readOnly) setIsOpen(true);
                }}
                onBlur={() => setFocused(false)}
                onKeyDown={handleInputKeyDown}
                placeholder={value.length === 0 ? placeholder : ''}
                disabled={disabled}
                style={{ outline: 'none' }}
                className={cn(
                  'flex-1 min-w-[40px] bg-transparent text-text placeholder:text-text-placeholder',
                  size === 'lg' ? 'text-sm' : 'text-xs'
                )}
                aria-label={label || 'Search options'}
              />
            )}
          </div>
        ) : (
          /* ── Standard layout: chips only ── */
          <div
            className={cn(
              'flex flex-wrap items-center gap-1',
              size === 'lg' ? 'py-1' : 'py-0.5',
              inputSizeStyles[size],
              !readOnly && 'pr-12'
            )}
          >
            {visibleValues.map((val) => {
              const opt = normalizedOptions.find((o) => o.value === val);
              if (!opt) return null;
              return (
                <Chip
                  key={val}
                  variant={variant}
                  size={chipSizeMap[size]}
                  removable={!readOnly && !disabled}
                  onRemove={() => removeValue(val)}
                >
                  {opt.label}
                </Chip>
              );
            })}
            {hasOverflow && (
              <Button
                variant="secondary"
                size={overflowBtnSize[size] || 'sm'}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
                className="shrink-0"
              >
                {expanded ? 'Show less' : `+${hiddenCount} more`}
              </Button>
            )}
            {!readOnly && !disabled && (
              <input
                ref={inputRef}
                id={inputId}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (!isOpen) setIsOpen(true);
                }}
                onFocus={() => {
                  setFocused(true);
                  if (!readOnly) setIsOpen(true);
                }}
                onBlur={() => setFocused(false)}
                onKeyDown={handleInputKeyDown}
                placeholder={value.length === 0 ? placeholder : ''}
                disabled={disabled}
                style={{ outline: 'none' }}
                className={cn(
                  'flex-1 min-w-[40px] bg-transparent text-text placeholder:text-text-placeholder',
                  size === 'lg' ? 'text-sm' : 'text-xs'
                )}
                aria-label={label || 'Search options'}
              />
            )}
          </div>
        )}

        {/* ── Trailing area: clear all + chevron (pinned to first row) ── */}
        {!readOnly && (
          <span
            className={cn(
              'absolute top-0 right-0 flex items-center gap-1',
              size === 'lg' ? 'py-1' : 'py-0.5',
              inputMinH[size],
              size === 'sm' ? 'pr-1.5' : 'pr-2'
            )}
          >
            {/* Clear all button */}
            {value.length > 0 && !disabled && (
              <button
                type="button"
                tabIndex={-1}
                onClick={(e) => {
                  e.stopPropagation();
                  clearAll();
                }}
                className="shrink-0 flex items-center justify-center w-4 h-4 text-text-tertiary hover:text-text cursor-pointer transition-colors"
                aria-label="Clear all selections"
              >
                <O9Icon svg={closeSvg} />
              </button>
            )}
            {/* Chevron */}
            <span
              className={cn(
                'shrink-0 text-text-tertiary transition-transform duration-150',
                isOpen && 'rotate-180'
              )}
            >
              <ChevronIcon />
            </span>
          </span>
        )}
      </div>

      {/* ── Portal dropdown ── */}
      {isOpen &&
        !disabled &&
        !readOnly &&
        createPortal(
          <div
            data-dropdown-id={dropdownId}
            role="listbox"
            aria-multiselectable="true"
            aria-label={label || 'Options'}
            className="bg-surface-raised border border-border py-1 max-h-60 overflow-y-auto shadow-down"
            style={{
              position: 'fixed',
              top: `${menuPos.top}px`,
              left: `${menuPos.left}px`,
              minWidth: `${menuPos.minWidth}px`,
              zIndex: 9999,
            }}
          >
            {/* ── Grouped options ── */}
            {hasGroups && groupedOptions
              ? groupedOptions.map(([groupName, items]) => (
                  <div role="group" aria-label={groupName} key={groupName}>
                    <div
                      role="presentation"
                      className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-text-tertiary select-none"
                    >
                      {groupName}
                    </div>
                    {items.map(renderOption)}
                  </div>
                ))
              : /* ── Flat options ── */
                filteredOptions.map(renderOption)}

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
              statusText[status] || statusText.default
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

export default MultiSelectChipInput;
