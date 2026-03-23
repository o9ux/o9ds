import { forwardRef, useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';
import Label from './Label';

import uploadSvg from '@/assets/icons/o9con-upload.svg?raw';
import binAltSvg from '@/assets/icons/o9con-bin-alt.svg?raw';
import blockerSvg from '@/assets/icons/o9con-blocker-action-filled-alt.svg?raw';
import exclamationSvg from '@/assets/icons/o9con-exclamation-triangle-filled.svg?raw';

/* ── Status config (matches Textbox) ── */
const statusIcons = { error: blockerSvg, warning: exclamationSvg };
const focusBorderColors = {
  default: 'var(--color-interactive-border)',
  error: 'var(--color-danger)',
  warning: 'var(--color-warning)',
};
const statusBorder = {
  default: 'border-border-hover hover:border-border-strong',
  error: 'border-danger',
  warning: 'border-warning/60 hover:border-warning',
};
const statusText = {
  default: 'text-text-tertiary',
  error: 'text-danger',
  warning: 'text-warning',
};

/* ── Size variants (matches Textbox: sm=24, md=32, lg=40) ── */
const sizeH = { sm: 'h-6', md: 'h-8', lg: 'h-10' };
const sizeText = { sm: 'text-xs', md: 'text-xs', lg: 'text-sm' };
const sizePx = { sm: 'px-2', md: 'px-3', lg: 'px-3' };
const sizeBtnW = { sm: 'w-6', md: 'w-8', lg: 'w-10' };
/* Font-size controls O9Icon span (w-[1em] h-[1em]) so icon + span are the same size */
const sizeIconFont = {
  sm: 'text-[12px]',
  md: 'text-[14px]',
  lg: 'text-[16px]',
};

/* ── File icon dimensions per size ── */
const fileIconDims = { sm: 14, md: 18, lg: 22 };
const fileIconFs = { sm: 4.5, md: 5.5, lg: 6.5 };

/* ── Custom file icon with extension text in CAPS ── */
function FileExtIcon({ extension, size = 'md' }) {
  const ext = extension ? extension.toUpperCase().slice(0, 4) : '';
  const d = fileIconDims[size];

  return (
    <svg
      width={d}
      height={d}
      viewBox="0 0 16 20"
      fill="none"
      className="shrink-0 text-interactive"
      aria-hidden="true"
    >
      <path
        d="M10 0.5H2C1.17 0.5 0.5 1.17 0.5 2V18C0.5 18.83 1.17 19.5 2 19.5H14C14.83 19.5 15.5 18.83 15.5 18V6L10 0.5Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M10 0.5V6H15.5" stroke="currentColor" strokeWidth="1" />
      {ext && (
        <text
          x="8"
          y="15.5"
          textAnchor="middle"
          fill="currentColor"
          fontSize={fileIconFs[size]}
          fontWeight="800"
          fontFamily="system-ui, sans-serif"
        >
          {ext}
        </text>
      )}
    </svg>
  );
}

/* ── Helpers ── */
function getExtension(filename) {
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop() : '';
}

function getFileName(pathOrUrl) {
  return pathOrUrl.split('/').pop().split('\\').pop().split('?')[0] || pathOrUrl;
}

/**
 * FileInput — file selection field with Textbox-style bottom-border styling.
 *
 * Supports file dialog, paste path/link + Enter, drag & drop.
 * Shows custom file icon with extension and delete button when a file is selected.
 */
const FileInput = forwardRef(function FileInput(
  {
    size = 'md',
    status = 'default',
    label,
    labelRequired = false,
    labelOptional = false,
    helperText,
    errorText,
    accept,
    allowedExtensions,
    excludedExtensions,
    disabled = false,
    readOnly = false,
    placeholder = 'Choose or drop a file\u2026',
    onReject,
    onChange,
    className,
    id,
    ...rest
  },
  ref
) {
  const inputId =
    id || (label ? `file-input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const fileRef = useRef(null);
  const textRef = useRef(null);
  const blurTimerRef = useRef(null);

  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [textValue, setTextValue] = useState('');

  /* Clean up blur timer */
  useEffect(() => () => clearTimeout(blurTimerRef.current), []);

  /* ── Extension validation ── */
  const isExtensionAllowed = useCallback(
    (ext) => {
      const e = ext.toLowerCase();
      if (excludedExtensions?.length && excludedExtensions.some((x) => x.toLowerCase().replace(/^\./, '') === e)) return false;
      if (allowedExtensions?.length && !allowedExtensions.some((x) => x.toLowerCase().replace(/^\./, '') === e)) return false;
      return true;
    },
    [allowedExtensions, excludedExtensions]
  );

  /* ── Select file from any source ── */
  const selectFile = useCallback(
    (info) => {
      if (info.extension && !isExtensionAllowed(info.extension)) {
        onReject?.({ ...info, reason: 'extension' });
        return;
      }
      setSelectedFile(info);
      setTextValue('');
      onChange?.(info);
    },
    [onChange, onReject, isExtensionAllowed]
  );

  /* ── File dialog ── */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    selectFile({ name: file.name, extension: getExtension(file.name), file });
  };

  /* ── Text input: paste path / link, confirm with Enter ── */
  const handleTextKeyDown = (e) => {
    if (e.key === 'Enter' && textValue.trim()) {
      e.preventDefault();
      submitText();
    }
  };

  const submitText = () => {
    const val = textValue.trim();
    if (!val) return;
    const name = getFileName(val);
    selectFile({ name, extension: getExtension(name), path: val });
  };

  const handleTextBlur = (e) => {
    /* Delay so button clicks fire before blur submission */
    blurTimerRef.current = setTimeout(() => {
      setFocused(false);
      if (textValue.trim()) submitText();
    }, 150);
  };

  const handleTextFocus = (e) => {
    clearTimeout(blurTimerRef.current);
    setFocused(true);
  };

  /* ── Clipboard file paste ── */
  const handlePaste = (e) => {
    const files = e.clipboardData?.files;
    if (files?.length > 0) {
      e.preventDefault();
      const file = files[0];
      selectFile({ name: file.name, extension: getExtension(file.name), file });
    }
  };

  /* ── Drag & drop ── */
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !readOnly) setDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (disabled || readOnly) return;
    const file = e.dataTransfer.files?.[0];
    if (file) {
      selectFile({ name: file.name, extension: getExtension(file.name), file });
    }
  };

  /* ── Clear selection ── */
  const handleClear = () => {
    setSelectedFile(null);
    setTextValue('');
    if (fileRef.current) fileRef.current.value = '';
    onChange?.(null);
    /* Refocus text input */
    requestAnimationFrame(() => textRef.current?.focus());
  };

  /* ── Open native file dialog ── */
  const openDialog = () => {
    if (!disabled && !readOnly) fileRef.current?.click();
  };

  const messageText = status === 'error' ? errorText : helperText;
  const messageIconSvg = statusIcons[status] || null;
  const helperId = messageText ? `${inputId}-helper` : undefined;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {/* Label */}
      {label && (
        <Label
          size={size}
          htmlFor={inputId}
          required={labelRequired}
          optional={labelOptional}
          disabled={disabled}
        >
          {label}
        </Label>
      )}

      {/* Hidden native file input */}
      <input
        ref={fileRef}
        type="file"
        accept={accept}
        disabled={disabled}
        onChange={handleFileChange}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Main container */}
      <div
        className={cn(
          'flex items-stretch border-b',
          sizeH[size],
          'bg-surface-input transition-[background-color] duration-100',
          !dragging && !focused && !disabled && 'hover:bg-surface-input-hover',
          !focused && !dragging && statusBorder[status],
          dragging && 'border-interactive-border bg-interactive/5',
          disabled && 'opacity-50 pointer-events-none border-border-disabled bg-surface-input',
          readOnly && 'border-dashed border-border-strong'
        )}
        style={
          (focused || dragging) && !disabled
            ? { borderBottomColor: dragging ? undefined : focusBorderColors[status] }
            : undefined
        }
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="group"
        aria-label={label || 'File input'}
      >
        {/* Content area */}
        <div className={cn('flex-1 flex items-center gap-2 min-w-0', sizePx[size])}>
          {selectedFile ? (
            <>
              <FileExtIcon extension={selectedFile.extension} size={size} />
              <span
                className={cn('truncate', sizeText[size], 'text-text')}
                title={selectedFile.name}
              >
                {selectedFile.name}
              </span>
            </>
          ) : (
            <input
              ref={(node) => {
                textRef.current = node;
                if (typeof ref === 'function') ref(node);
                else if (ref) ref.current = node;
              }}
              id={inputId}
              type="text"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              onKeyDown={handleTextKeyDown}
              onFocus={handleTextFocus}
              onBlur={handleTextBlur}
              onPaste={handlePaste}
              disabled={disabled}
              readOnly={readOnly}
              placeholder={placeholder}
              style={{ outline: 'none' }}
              className={cn(
                'w-full h-full bg-transparent text-text placeholder:text-text-placeholder',
                sizeText[size]
              )}
              aria-label={label ? undefined : 'File path or URL'}
              aria-describedby={helperId}
            />
          )}
        </div>

        {/* Trailing buttons */}
        <div className="flex items-stretch" role="toolbar" aria-label="File actions">
          {/* Delete button — visible when file selected & editable */}
          {selectedFile && !readOnly && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className={cn(
                'flex items-center justify-center cursor-pointer',
                'text-text-tertiary hover:text-danger transition-colors',
                sizeBtnW[size],
                sizeIconFont[size],
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-border focus-visible:ring-inset'
              )}
              aria-label="Remove file"
            >
              <O9Icon svg={binAltSvg} />
            </button>
          )}

          {/* Upload button — always visible when not readonly */}
          {!readOnly && (
            <button
              type="button"
              onClick={openDialog}
              disabled={disabled}
              className={cn(
                'flex items-center justify-center cursor-pointer',
                'bg-surface-input-hover/60 hover:bg-interactive/10 transition-colors border-l border-border',
                sizeBtnW[size],
                sizeIconFont[size],
                'text-text-secondary hover:text-interactive',
                disabled && 'cursor-not-allowed',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-border focus-visible:ring-inset'
              )}
              aria-label="Browse files"
            >
              <O9Icon svg={uploadSvg} />
            </button>
          )}
        </div>
      </div>

      {/* Helper / error message */}
      {messageText && (
        <p id={helperId} className={cn('text-xs flex items-center gap-1', statusText[status])}>
          {messageIconSvg && (
            <span className="shrink-0 w-3 h-3 [&_svg]:h-3 [&_svg]:w-3 flex items-center justify-center">
              <O9Icon svg={messageIconSvg} />
            </span>
          )}
          <span>{messageText}</span>
        </p>
      )}
    </div>
  );
});

export default FileInput;
