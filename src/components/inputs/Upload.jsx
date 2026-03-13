import { forwardRef, useState, useRef } from 'react';
import { cn } from '@/utils/cn';

const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 16V4M12 4l-4 4M12 4l4 4" />
    <path d="M20 16v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2" />
  </svg>
);

const Upload = forwardRef(function Upload(
  {
    accept,
    multiple = false,
    disabled = false,
    maxSize,
    onChange,
    onError,
    title = 'Drag & drop files here',
    subtitle = 'or click to browse',
    className,
    children,
    ...rest
  },
  ref
) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef(null);

  const validateFiles = (files) => {
    if (!files || files.length === 0) return [];
    const valid = [];
    for (const file of files) {
      if (maxSize && file.size > maxSize) {
        onError?.({ type: 'size', file, maxSize });
        continue;
      }
      valid.push(file);
    }
    return valid;
  };

  const handleFiles = (files) => {
    const valid = validateFiles(files);
    if (valid.length > 0) onChange?.(valid);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className={cn(
        'flex flex-col items-center justify-center gap-2 p-8',
        'border-2 border-dashed rounded-lg transition-colors cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white',
        isDragOver
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-text-tertiary',
        disabled && 'opacity-35 pointer-events-none cursor-not-allowed',
        className
      )}
      {...rest}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => handleFiles(Array.from(e.target.files))}
        className="sr-only"
      />
      {children || (
        <>
          <span className="text-text-tertiary">
            <UploadIcon />
          </span>
          <span className="text-sm font-medium text-text">{title}</span>
          <span className="text-xs text-text-tertiary">{subtitle}</span>
          {maxSize && (
            <span className="text-xs text-text-disabled">
              Max size: {(maxSize / 1024 / 1024).toFixed(0)}MB
            </span>
          )}
        </>
      )}
    </div>
  );
});

export default Upload;
