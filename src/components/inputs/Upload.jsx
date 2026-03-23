import { forwardRef, useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';
import Label from './Label';

import uploadSvg from '@/assets/icons/o9con-upload.svg?raw';
import binAltSvg from '@/assets/icons/o9con-bin-alt.svg?raw';
import closeSvg from '@/assets/icons/o9con-close.svg?raw';
import rotateLeftSvg from '@/assets/icons/o9con-rotate-left.svg?raw';
import blockerSvg from '@/assets/icons/o9con-blocker-action-filled-alt.svg?raw';
import exclamationSvg from '@/assets/icons/o9con-exclamation-triangle-filled.svg?raw';
import checkCircleSvg from '@/assets/icons/o9con-check-circle.svg?raw';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FILE TYPE ICON — colored file shape + extension label
   Uses o9ds brand palette CSS variables for theming.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* Category → brand color mapping (CSS variables for theme-awareness) */
const FILE_CAT_COLORS = {
  pdf:          { bg: 'var(--color-global-scarlet-d1)',     fold: 'var(--color-global-scarlet-d2)' },
  presentation: { bg: 'var(--color-global-sienna-accent)',   fold: 'var(--color-global-sienna-d1)' },
  image:        { bg: 'var(--color-global-indigo-l1)',       fold: 'var(--color-global-indigo-d1)' },
  spreadsheet:  { bg: 'var(--color-global-grass-d1)',        fold: 'var(--color-global-grass-d2)' },
  document:     { bg: 'var(--color-global-shock-l1)',        fold: 'var(--color-global-shock-d1)' },
  data:         { bg: 'var(--color-global-juice-accent)',    fold: 'var(--color-global-juice-d1)' },
  web:          { bg: 'var(--color-global-glacier-accent)',  fold: 'var(--color-global-glacier-d1)' },
  code:         { bg: 'var(--color-global-lavender-accent)', fold: 'var(--color-global-lavender-d1)' },
  design:       { bg: 'var(--color-global-plum-accent)',     fold: 'var(--color-global-plum-d1)' },
  archive:      { bg: 'var(--color-global-o9gray-d5)',       fold: 'var(--color-global-o9gray-d4)' },
  media:        { bg: 'var(--color-global-plum-d1)',         fold: 'var(--color-global-plum-d2)' },
  audio:        { bg: 'var(--color-global-ocra-accent)',     fold: 'var(--color-global-ocra-d1)' },
};

/* Extension → category lookup */
const EXT_TO_CATEGORY = {
  /* scarlet — PDF */
  pdf: 'pdf',
  /* sienna — presentations */
  ppt: 'presentation', pptx: 'presentation', key: 'presentation', odp: 'presentation',
  /* indigo — images */
  img: 'image', jpeg: 'image', jpg: 'image', png: 'image', svg: 'image',
  gif: 'image', bmp: 'image', webp: 'image', tiff: 'image', ico: 'image', heic: 'image',
  /* grass — spreadsheets */
  csv: 'spreadsheet', xlsx: 'spreadsheet', xls: 'spreadsheet', ods: 'spreadsheet', tsv: 'spreadsheet',
  /* shock — documents */
  docx: 'document', doc: 'document', odt: 'document', rtf: 'document', pages: 'document',
  /* juice — data / config */
  json: 'data', xml: 'data', yaml: 'data', yml: 'data', toml: 'data', ini: 'data', env: 'data',
  /* glacier — web / markup */
  html: 'web', htm: 'web', css: 'web', scss: 'web', less: 'web', md: 'web', mdx: 'web',
  /* lavender — code */
  js: 'code', ts: 'code', jsx: 'code', tsx: 'code', py: 'code', java: 'code',
  c: 'code', cpp: 'code', h: 'code', rs: 'code', go: 'code', rb: 'code',
  php: 'code', sh: 'code', sql: 'code', swift: 'code', kt: 'code', r: 'code',
  /* plum — design */
  psd: 'design', ai: 'design', sketch: 'design', fig: 'design', xd: 'design',
  /* o9gray — archives */
  zip: 'archive', rar: 'archive', '7z': 'archive', tar: 'archive', gz: 'archive', bz2: 'archive',
  /* o9gray — plain text */
  txt: 'archive', log: 'archive',
  /* plum — video */
  mp4: 'media', avi: 'media', mov: 'media', mkv: 'media', wmv: 'media', webm: 'media',
  /* ocra — audio */
  mp3: 'audio', wav: 'audio', ogg: 'audio', flac: 'audio', aac: 'audio', wma: 'audio', m4a: 'audio',
};

const DEFAULT_CAT_COLORS = FILE_CAT_COLORS.archive;

function getExtColors(ext) {
  if (!ext) return DEFAULT_CAT_COLORS;
  const cat = EXT_TO_CATEGORY[ext.toLowerCase()];
  return cat ? FILE_CAT_COLORS[cat] : DEFAULT_CAT_COLORS;
}

function FileTypeIcon({ extension }) {
  const ext = (extension || '').toLowerCase();
  const label = ext.toUpperCase().slice(0, 4);
  const colors = getExtColors(ext);

  return (
    <span className="relative inline-flex items-center justify-center w-6 h-6 shrink-0" aria-hidden="true">
      <svg width="18" height="23" viewBox="0 0 18 23" fill="none">
        <path
          d="M11.5 0H2C0.9 0 0 0.9 0 2V21C0 22.1 0.9 23 2 23H16C17.1 23 18 22.1 18 21V6.5L11.5 0Z"
          style={{ fill: colors.bg }}
        />
        <path d="M11.5 0V6.5H18L11.5 0Z" style={{ fill: colors.fold }} />
        {label && (
          <text
            x="9"
            y="18"
            textAnchor="middle"
            fill="white"
            fontSize="6"
            fontWeight="500"
            fontFamily="system-ui, sans-serif"
          >
            {label}
          </text>
        )}
      </svg>
    </span>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HELPERS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function getExtension(filename) {
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : '';
}

function formatFileSize(bytes) {
  if (bytes == null) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

let _fileUid = 0;
function nextId() {
  return `file-${++_fileUid}-${Date.now()}`;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ICON BUTTON — small 24×24 action button (tertiary)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function IconBtn({ svg, label, onClick, className: extra }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center justify-center w-6 h-6 shrink-0 cursor-pointer',
        'text-text-tertiary hover:text-text transition-colors',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-border',
        extra
      )}
      aria-label={label}
    >
      <span className="w-4 h-4 text-[16px] flex items-center justify-center">
        <O9Icon svg={svg} />
      </span>
    </button>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROGRESS BAR
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function ProgressBar({ percent = 0 }) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className="w-full h-1 bg-border-disabled rounded-none overflow-hidden" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
      <div
        className="h-full bg-text transition-[width] duration-200 ease-linear"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FILE ITEM — single file row with status variants
   Figma variants: uploaded, progress, failed, success
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function FileItem({ file, onRemove, onRetry, onDismissStatus, readOnly, disabled }) {
  const isUploading = file.status === 'uploading';
  const isFailed = file.status === 'failed';
  const isSuccess = file.status === 'success';
  const isUploaded = file.status === 'uploaded';

  return (
    <div className="flex flex-col gap-1">
      {/* ── Main row: icon + info + action buttons ── */}
      <div className="flex items-center gap-2">
        {/* File icon */}
        <FileTypeIcon extension={file.extension} />

        {/* File name + status text / alert */}
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-xs text-text truncate leading-[14px]" title={file.name}>
            {file.name}
          </span>

          {/* Status line — varies by file.status */}
          {isUploaded && (
            <span className="text-xs text-text-tertiary truncate leading-[14px]">
              {formatFileSize(file.size)}
            </span>
          )}

          {isUploading && (
            <span className="text-xs text-text-tertiary truncate leading-[14px]">
              {formatFileSize(file.size)}
              {file.remaining ? ` - ${file.remaining}` : ''}
            </span>
          )}

          {isFailed && (
            <span className="text-xs text-danger flex items-center gap-1 leading-[16px]">
              <span className="shrink-0 w-4 h-4 text-[16px] flex items-center justify-center">
                <O9Icon svg={blockerSvg} />
              </span>
              <span className="truncate">{file.error || 'File failed to upload.'}</span>
            </span>
          )}

          {isSuccess && (
            <span className="text-xs text-success flex items-center gap-1 leading-[16px]">
              <span className="shrink-0 w-4 h-4 text-[16px] flex items-center justify-center">
                <O9Icon svg={checkCircleSvg} />
              </span>
              <span className="truncate">{file.successMessage || 'File successfully uploaded.'}</span>
            </span>
          )}
        </div>

        {/* ── Action buttons — depend on status ── */}
        {!readOnly && !disabled && (
          <div className="flex items-center gap-0.5 shrink-0">
            {/* Uploaded: delete button */}
            {isUploaded && (
              <IconBtn
                svg={binAltSvg}
                label={`Remove ${file.name}`}
                onClick={() => onRemove(file.id)}
                className="hover:text-danger"
              />
            )}

            {/* Uploading: cancel (close) button */}
            {isUploading && (
              <IconBtn
                svg={closeSvg}
                label={`Cancel upload of ${file.name}`}
                onClick={() => onRemove(file.id)}
                className="hover:text-danger"
              />
            )}

            {/* Failed: retry + remove buttons */}
            {isFailed && (
              <>
                <IconBtn
                  svg={rotateLeftSvg}
                  label={`Retry upload of ${file.name}`}
                  onClick={() => onRetry(file.id)}
                />
                <IconBtn
                  svg={closeSvg}
                  label={`Remove ${file.name}`}
                  onClick={() => onRemove(file.id)}
                  className="hover:text-danger"
                />
              </>
            )}

            {/* Success: delete button */}
            {isSuccess && (
              <IconBtn
                svg={binAltSvg}
                label={`Remove ${file.name}`}
                onClick={() => onRemove(file.id)}
                className="hover:text-danger"
              />
            )}
          </div>
        )}
      </div>

      {/* ── Progress bar — only for uploading status ── */}
      {isUploading && (
        <ProgressBar percent={file.progress ?? 0} />
      )}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SIZE VARIANTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const sizeDropH = { sm: 'min-h-14', lg: 'min-h-40' };
const sizeLayout = { sm: 'flex-row items-center', lg: 'flex-col items-center justify-center' };
const sizeDropText = { sm: 'text-xs', lg: 'text-sm' };
const sizeHintText = { sm: 'text-[10px]', lg: 'text-xs' };

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/**
 * Upload — drag-and-drop file upload component.
 *
 * Matches the Figma o9ds-upload / o9ds-file-status design:
 * - Two sizes: sm (compact horizontal) and lg (full drop zone)
 * - Multi-file support with color-coded file type icons
 * - Drag & drop, file dialog, paste
 * - Per-file status: uploaded, uploading (with progress bar), success, failed
 * - Per-file actions: remove, cancel, retry
 * - Extension allow/block list validation
 * - Max file size and max files constraints
 * - Optional onUpload handler for async upload with progress
 */
const Upload = forwardRef(function Upload(
  {
    size = 'lg',
    label,
    labelRequired = false,
    labelOptional = false,
    status = 'default',
    errorText,
    helperText,
    accept,
    allowedExtensions,
    excludedExtensions,
    multiple = true,
    maxFileSize,
    maxFiles,
    disabled = false,
    readOnly = false,
    dropText,
    hintText,
    buttonLabel = 'Select Files',
    showButton = true,
    autoUpload = true,
    onUpload,
    onChange,
    onReject,
    className,
    id,
    ...rest
  },
  ref
) {
  const inputId = id || (label ? `upload-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const fileRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const abortControllers = useRef(new Map());

  /* Clean up abort controllers on unmount */
  useEffect(() => {
    return () => {
      abortControllers.current.forEach((ctrl) => ctrl.abort());
      abortControllers.current.clear();
    };
  }, []);

  /* ── Computed hint text ── */
  const computedHintText = hintText ?? (() => {
    const parts = [];
    if (maxFileSize) parts.push(`Max file size is ${formatFileSize(maxFileSize)}`);
    if (allowedExtensions?.length) {
      parts.push(`Only ${allowedExtensions.map((e) => `.${e}`).join(', ')} files are supported`);
    }
    return parts.length ? parts.join('. ') + '.' : null;
  })();

  const computedDropText = dropText ?? 'Drop files here to upload';

  /* ── Extension validation ── */
  const isExtensionAllowed = useCallback(
    (ext) => {
      const e = ext.toLowerCase();
      if (excludedExtensions?.length && excludedExtensions.some((x) => x.toLowerCase().replace(/^\./, '') === e))
        return false;
      if (allowedExtensions?.length && !allowedExtensions.some((x) => x.toLowerCase().replace(/^\./, '') === e))
        return false;
      return true;
    },
    [allowedExtensions, excludedExtensions]
  );

  /* ── Update a single file entry ── */
  const updateFile = useCallback((fileId, updates) => {
    setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, ...updates } : f)));
  }, []);

  /* ── Start upload for a file entry ── */
  const startUpload = useCallback(
    (fileEntry) => {
      if (!onUpload) return;

      const abortCtrl = new AbortController();
      abortControllers.current.set(fileEntry.id, abortCtrl);

      updateFile(fileEntry.id, { status: 'uploading', progress: 0, error: null, remaining: null });

      const callbacks = {
        /** Update progress (0-100) and optional time remaining string */
        onProgress: (percent, remaining) => {
          if (abortCtrl.signal.aborted) return;
          updateFile(fileEntry.id, {
            progress: Math.max(0, Math.min(100, percent)),
            remaining: remaining || null,
          });
        },
        /** Mark upload as succeeded */
        onSuccess: (message) => {
          if (abortCtrl.signal.aborted) return;
          abortControllers.current.delete(fileEntry.id);
          updateFile(fileEntry.id, {
            status: 'success',
            progress: 100,
            successMessage: message || 'File successfully uploaded.',
            remaining: null,
          });
        },
        /** Mark upload as failed */
        onError: (errorMsg) => {
          if (abortCtrl.signal.aborted) return;
          abortControllers.current.delete(fileEntry.id);
          updateFile(fileEntry.id, {
            status: 'failed',
            error: errorMsg || 'File failed to upload.',
            remaining: null,
          });
        },
        /** Abort signal for cancellation */
        signal: abortCtrl.signal,
      };

      try {
        onUpload(fileEntry.file, callbacks);
      } catch (err) {
        callbacks.onError(err?.message || 'Upload failed.');
      }
    },
    [onUpload, updateFile]
  );

  /* ── Add files ── */
  const addFiles = useCallback(
    (newFiles) => {
      const accepted = [];
      const rejected = [];

      for (const f of newFiles) {
        const ext = getExtension(f.name);

        if (ext && !isExtensionAllowed(ext)) {
          rejected.push({ name: f.name, extension: ext, reason: 'extension', file: f });
          continue;
        }

        if (maxFileSize && f.size > maxFileSize) {
          rejected.push({ name: f.name, extension: ext, reason: 'size', file: f });
          continue;
        }

        const initialStatus = onUpload && autoUpload ? 'uploading' : 'uploaded';

        accepted.push({
          id: nextId(),
          name: f.name,
          extension: ext,
          size: f.size,
          file: f,
          status: initialStatus,
          progress: initialStatus === 'uploading' ? 0 : undefined,
          error: null,
          successMessage: null,
          remaining: null,
        });
      }

      rejected.forEach((r) => onReject?.(r));

      if (accepted.length === 0) return;

      setFiles((prev) => {
        const next = multiple ? [...prev, ...accepted] : accepted.slice(0, 1);
        const limited = maxFiles ? next.slice(0, maxFiles) : next;
        return limited;
      });

      /* Auto-start upload for accepted files */
      if (onUpload && autoUpload) {
        accepted.forEach((entry) => {
          /* Defer so state is committed first */
          requestAnimationFrame(() => startUpload(entry));
        });
      }
    },
    [isExtensionAllowed, maxFileSize, maxFiles, multiple, onReject, onUpload, autoUpload, startUpload]
  );

  /* Notify parent */
  useEffect(() => {
    onChange?.(files.length ? files : null);
  }, [files]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── File dialog ── */
  const handleFileChange = (e) => {
    const fileList = e.target.files;
    if (!fileList?.length) return;
    addFiles([...fileList]);
    e.target.value = '';
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
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles?.length) addFiles([...droppedFiles]);
  };

  /* ── Clipboard paste ── */
  const handlePaste = (e) => {
    const clipFiles = e.clipboardData?.files;
    if (clipFiles?.length) {
      e.preventDefault();
      addFiles([...clipFiles]);
    }
  };

  /* ── Remove file (also cancels in-progress uploads) ── */
  const handleRemove = useCallback((fileId) => {
    const ctrl = abortControllers.current.get(fileId);
    if (ctrl) {
      ctrl.abort();
      abortControllers.current.delete(fileId);
    }
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  }, []);

  /* ── Retry a failed upload ── */
  const handleRetry = useCallback(
    (fileId) => {
      const fileEntry = files.find((f) => f.id === fileId);
      if (!fileEntry || !onUpload) return;
      startUpload(fileEntry);
    },
    [files, onUpload, startUpload]
  );

  /* ── Open native file dialog ── */
  const openDialog = () => {
    if (!disabled && !readOnly) fileRef.current?.click();
  };

  const effectiveStatus = status === 'error' || status === 'warning' ? status : 'default';
  const messageText = effectiveStatus === 'error' ? errorText : helperText;
  const messageIcon = effectiveStatus === 'error' ? blockerSvg : effectiveStatus === 'warning' ? exclamationSvg : null;

  return (
    <div className={cn('flex flex-col gap-2', className)} ref={ref}>
      {/* ── Label ── */}
      {label && (
        <Label
          size="sm"
          htmlFor={inputId}
          required={labelRequired}
          optional={labelOptional}
          disabled={disabled}
        >
          {label}
        </Label>
      )}

      {/* ── Hidden native file input ── */}
      <input
        ref={fileRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleFileChange}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* ── Drop area ── */}
      <div
        className={cn(
          'flex border rounded-none p-2 gap-2.5 transition-colors',
          sizeDropH[size],
          disabled && 'opacity-50 pointer-events-none',
          readOnly && 'border-dashed',
          /* normal */
          !dragging && effectiveStatus === 'default' && 'bg-surface-input border-border hover:bg-surface-input-hover hover:border-border-strong',
          /* error */
          !dragging && effectiveStatus === 'error' && 'bg-surface-input border-danger',
          /* warning */
          !dragging && effectiveStatus === 'warning' && 'bg-surface-input border-warning/60 hover:border-warning',
          /* dragging */
          dragging && 'bg-surface-input-hover border-border-strong'
        )}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onPaste={handlePaste}
        role="region"
        aria-label={label || 'File upload area'}
        tabIndex={disabled ? undefined : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openDialog();
          }
        }}
      >
        {/* Inner container — layout depends on size */}
        <div className={cn('flex gap-2 w-full', sizeLayout[size])}>
          {/* Button — top for lg, right for sm */}
          {size === 'lg' && showButton && !readOnly && (
            <button
              type="button"
              onClick={openDialog}
              disabled={disabled}
              className={cn(
                'inline-flex items-center gap-1 px-3 py-1.5 border border-text/40',
                'text-sm text-text cursor-pointer',
                'hover:bg-surface-input-hover transition-colors',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-border',
                disabled && 'cursor-not-allowed opacity-50'
              )}
              aria-label={buttonLabel}
            >
              <span className="text-[16px]">
                <O9Icon svg={uploadSvg} />
              </span>
              <span>{buttonLabel}</span>
            </button>
          )}

          {/* Text area */}
          <div className={cn(size === 'sm' ? 'flex flex-col flex-1 min-w-0' : 'flex flex-col items-center')}>
            <p className={cn(sizeDropText[size], 'text-text-secondary')}>{computedDropText}</p>
            {computedHintText && (
              <p className={cn(sizeHintText[size], 'text-text-tertiary')}>{computedHintText}</p>
            )}
          </div>

          {/* Button — right side for sm */}
          {size === 'sm' && showButton && !readOnly && (
            <button
              type="button"
              onClick={openDialog}
              disabled={disabled}
              className={cn(
                'inline-flex items-center gap-1 px-3 py-1.5 border border-text/40 shrink-0',
                'text-sm text-text cursor-pointer',
                'hover:bg-surface-input-hover transition-colors',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-border',
                disabled && 'cursor-not-allowed opacity-50'
              )}
              aria-label={buttonLabel}
            >
              <span className="text-[16px]">
                <O9Icon svg={uploadSvg} />
              </span>
              <span>{buttonLabel}</span>
            </button>
          )}
        </div>
      </div>

      {/* ── File list ── */}
      {files.length > 0 && (
        <div className="flex flex-col gap-2" role="list" aria-label="Selected files">
          {files.map((f) => (
            <div key={f.id} role="listitem">
              <FileItem
                file={f}
                onRemove={handleRemove}
                onRetry={handleRetry}
                readOnly={readOnly}
                disabled={disabled}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── Inline error / helper message ── */}
      {messageText && (
        <div className={cn(
          'flex items-center gap-1 text-xs',
          effectiveStatus === 'error' ? 'text-danger' : effectiveStatus === 'warning' ? 'text-warning' : 'text-text-tertiary'
        )}>
          {messageIcon && (
            <span className="shrink-0 w-4 h-4 text-[16px] flex items-center justify-center">
              <O9Icon svg={messageIcon} />
            </span>
          )}
          <span>{messageText}</span>
        </div>
      )}
    </div>
  );
});

export default Upload;
