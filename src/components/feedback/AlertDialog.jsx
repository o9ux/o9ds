import { forwardRef, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';
import Button from '@/components/buttons/Button';

const intentStyles = {
  info: 'border-info/30',
  warning: 'border-warning/30',
  danger: 'border-danger/30',
  confirm: 'border-interactive-border/20',
};

const intentIconColors = {
  info: 'text-info',
  warning: 'text-warning',
  danger: 'text-danger',
  confirm: 'text-text',
};

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="10" cy="10" r="8" />
    <path d="M10 9v5M10 6.5v0" strokeLinecap="round" />
  </svg>
);

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10 2L1 18h18L10 2z" />
    <path d="M10 8v4M10 14.5v0" strokeLinecap="round" />
  </svg>
);

const DangerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="10" cy="10" r="8" />
    <path d="M7 7l6 6M13 7l-6 6" />
  </svg>
);

const intentIcons = {
  info: InfoIcon,
  warning: WarningIcon,
  danger: DangerIcon,
  confirm: InfoIcon,
};

const AlertDialog = forwardRef(function AlertDialog(
  {
    open = false,
    onClose,
    intent = 'confirm',
    title,
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
    className,
    ...rest
  },
  ref
) {
  const dialogRef = useRef(null);
  const combinedRef = ref || dialogRef;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const IconComponent = intentIcons[intent];

  const handleCancel = () => {
    onCancel?.();
    onClose?.();
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-backdrop backdrop-blur-sm"
        onClick={handleCancel}
      />

      {/* Dialog */}
      <div
        ref={combinedRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-desc"
        className={cn(
          'relative z-10 w-full max-w-md bg-surface-raised border p-6',
          'animate-in fade-in zoom-in-95',
          intentStyles[intent],
          className
        )}
        {...rest}
      >
        <div className="flex gap-4">
          {IconComponent && (
            <span className={cn('shrink-0 mt-0.5', intentIconColors[intent])}>
              <IconComponent />
            </span>
          )}
          <div className="flex-1 min-w-0">
            {title && (
              <h2
                id="alert-dialog-title"
                className="text-sm font-bold text-text mb-1"
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                id="alert-dialog-desc"
                className="text-xs text-text-secondary leading-relaxed"
              >
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <Button variant="secondary" size="sm" onClick={handleCancel}>
            {cancelLabel}
          </Button>
          <Button
            variant={intent === 'danger' ? 'danger' : 'primary'}
            size="sm"
            onClick={handleConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
});

export default AlertDialog;
