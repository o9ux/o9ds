import { forwardRef, useRef } from 'react';
import { cn } from '@/utils/cn';

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V5L9 1z" />
    <path d="M9 1v4h4" />
  </svg>
);

const FileInput = forwardRef(function FileInput(
  {
    accept,
    multiple = false,
    disabled = false,
    error = false,
    onChange,
    placeholder = 'Choose file...',
    fileName,
    className,
    ...rest
  },
  ref
) {
  const inputRef = useRef(null);

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleChange = (e) => {
    onChange?.(e.target.files);
  };

  return (
    <div className={cn('inline-flex', className)}>
      <input
        ref={(node) => {
          inputRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleChange}
        className="sr-only"
        {...rest}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          'inline-flex items-center gap-2 h-9 px-3',
          'border rounded bg-surface-overlay text-sm text-text',
          'transition-colors cursor-pointer',
          error
            ? 'border-danger'
            : 'border-border-strong hover:border-interactive-border',
          disabled && 'opacity-35 pointer-events-none cursor-not-allowed',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-border'
        )}
      >
        <FileIcon />
        <span className={cn('truncate max-w-[200px]', !fileName && 'text-text-tertiary')}>
          {fileName || placeholder}
        </span>
      </button>
    </div>
  );
});

export default FileInput;
