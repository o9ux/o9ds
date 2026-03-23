import { forwardRef, useState } from 'react';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';

import blockerSvg from '@/assets/icons/o9con-blocker-action-filled-alt.svg?raw';
import externalLinkSvg from '@/assets/icons/o9con-external-link.svg?raw';

/**
 * UrlInput — single-line URL input with link styling and external-link action.
 *
 * Figma node 33648-24964:
 *  - Sizes: sm (24px) | md (32px) | lg (36px)
 *  - States: enable, filled, hover, focus, error, disabled, read-only, visited
 *  - Filled text styled as link (info blue), external-link icon opens URL in new tab
 *  - Visited state: purple text after link click
 *
 * A11Y:
 *  - Native <input> with label linked via htmlFor/id
 *  - aria-invalid for error state
 *  - aria-readonly for read-only state
 *  - External link uses target="_blank" rel="noopener noreferrer"
 *  - Focus ring via React state border highlight
 */
const UrlInput = forwardRef(function UrlInput(
  {
    size = 'md',
    status = 'default',
    label,
    helperText,
    errorText,
    maxLength,
    showCount = false,
    disabled = false,
    readOnly = false,
    placeholder,
    className,
    id,
    ...rest
  },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const [focused, setFocused] = useState(false);
  const [visited, setVisited] = useState(false);

  const [internalLength, setInternalLength] = useState(
    () => (rest.value ?? rest.defaultValue ?? '').length
  );
  const currentLength = rest.value !== undefined ? String(rest.value).length : internalLength;
  const hasValue = rest.value !== undefined ? String(rest.value).length > 0 : internalLength > 0;
  const urlValue = rest.value !== undefined ? String(rest.value) : '';

  const handleChange = (e) => {
    setInternalLength(e.target.value.length);
    setVisited(false);
    rest.onChange?.(e);
  };

  const handleFocus = (e) => {
    setFocused(true);
    rest.onFocus?.(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    rest.onBlur?.(e);
  };

  const handleLinkClick = () => {
    setVisited(true);
  };

  /* ── Size variants (matching Textbox) ── */
  const sizeStyles = {
    sm: 'h-6 px-2 text-xs',
    md: 'h-8 px-3 text-xs',
    lg: 'h-9 px-3 text-sm',
  };

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

  const iconRight = { sm: 'right-2', md: 'right-3', lg: 'right-3' };
  const inputPadRight = { sm: 'pr-6', md: 'pr-8', lg: 'pr-9' };

  /* ── Status border colors ── */
  const focusBorderColors = {
    default: 'var(--color-interactive-border)',
    error: 'var(--color-danger)',
  };

  const statusBorder = {
    default: 'border-border-hover hover:border-border-strong',
    error: 'border-danger',
  };

  const statusText = {
    default: 'text-text-tertiary',
    error: 'text-danger',
  };

  const messageIconSvg = status === 'error' ? blockerSvg : null;
  const messageText = status === 'error' ? errorText : helperText;
  const hasFooter = messageText || (showCount && maxLength);
  const isError = status === 'error';

  /* ── Input text color: visited purple > filled info blue > default ── */
  const inputTextColor = hasValue && !isError
    ? (visited ? 'text-utility-purple' : 'text-info')
    : 'text-text';

  /* ── Show trailing icon when value present and not error ── */
  const showTrailingLink = hasValue && !isError && !disabled;
  const showTrailingError = isError;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
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

      <div
        className={cn(
          'relative flex items-center border-b',
          'bg-surface-input hover:bg-surface-input-hover transition-[background-color] duration-100',
          !focused && statusBorder[status],
          disabled && 'opacity-50 pointer-events-none border-border-disabled bg-surface-input',
          readOnly && 'border-dashed border-border-strong cursor-default'
        )}
        style={focused && !disabled ? { borderBottomColor: focusBorderColors[status] } : undefined}
      >
        <input
          ref={ref}
          id={inputId}
          type="text"
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          placeholder={placeholder}
          aria-invalid={isError || undefined}
          aria-readonly={readOnly || undefined}
          style={{ outline: 'none' }}
          className={cn(
            'w-full bg-transparent placeholder:text-text-placeholder',
            inputTextColor,
            sizeStyles[size],
            (showTrailingLink || showTrailingError) && inputPadRight[size]
          )}
          {...rest}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {/* External link action — visible when value is present */}
        {showTrailingLink && (
          <a
            href={urlValue}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            onClick={handleLinkClick}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 flex shrink-0 items-center justify-center cursor-pointer',
              visited ? 'text-utility-purple' : 'text-info hover:text-info-hover',
              iconRight[size],
              iconContainerSize[size],
              iconSize[size]
            )}
            aria-label="Open URL in new tab"
          >
            <O9Icon svg={externalLinkSvg} />
          </a>
        )}

        {/* Error trailing icon */}
        {showTrailingError && (
          <span
            className={cn(
              'pointer-events-none absolute top-1/2 -translate-y-1/2 flex shrink-0 items-center justify-center text-danger',
              iconRight[size],
              iconContainerSize[size],
              iconSize[size]
            )}
          >
            <O9Icon svg={blockerSvg} />
          </span>
        )}
      </div>

      {hasFooter && (
        <div className="flex items-start justify-between gap-2">
          {messageText ? (
            <p className={cn('text-xs flex items-center gap-1', statusText[status])}>
              {messageIconSvg && (
                <span className="shrink-0 w-3 h-3 [&_svg]:h-3 [&_svg]:w-3 flex items-center justify-center">
                  <O9Icon svg={messageIconSvg} />
                </span>
              )}
              <span>{messageText}</span>
            </p>
          ) : (
            <span />
          )}
          {showCount && maxLength != null && (
            <span className="text-xs text-text-tertiary tabular-nums shrink-0">
              {String(currentLength).padStart(2, '0')}/{String(maxLength).padStart(2, '0')}
            </span>
          )}
        </div>
      )}
    </div>
  );
});

export default UrlInput;
