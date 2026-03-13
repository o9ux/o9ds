import { forwardRef, useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

const variantStyles = {
  info: 'border-l-info bg-info/5',
  success: 'border-l-success bg-success/5',
  warning: 'border-l-warning bg-warning/5',
  danger: 'border-l-danger bg-danger/5',
  neutral: 'border-l-interactive-border/40 bg-interactive-subtle',
};

const variantIconColors = {
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
  neutral: 'text-text-secondary',
};

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="8" cy="8" r="6" />
    <path d="M8 7.5v3M8 5.5v0" strokeLinecap="round" />
  </svg>
);

const SuccessIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="8" cy="8" r="6" />
    <path d="M5.5 8l2 2 3-4" />
  </svg>
);

const WarningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M8 2L1.5 14h13L8 2z" />
    <path d="M8 6.5v3M8 11.5v0" strokeLinecap="round" />
  </svg>
);

const DangerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="8" cy="8" r="6" />
    <path d="M6 6l4 4M10 6l-4 4" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4l6 6M10 4l-6 6" />
  </svg>
);

const variantIcons = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon,
  neutral: InfoIcon,
};

const Toast = forwardRef(function Toast(
  {
    variant = 'neutral',
    title,
    description,
    dismissible = true,
    duration = 5000,
    onDismiss,
    action,
    className,
    ...rest
  },
  ref
) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onDismiss?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  if (!visible) return null;

  const IconComponent = variantIcons[variant];

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <div
      ref={ref}
      role="alert"
      aria-live="polite"
      className={cn(
        'flex items-start gap-3 p-3 border border-border bg-surface-raised border-l-[3px]',
        'min-w-[320px] max-w-md shadow-lg',
        variantStyles[variant],
        className
      )}
      {...rest}
    >
      <span className={cn('shrink-0 mt-0.5', variantIconColors[variant])}>
        <IconComponent />
      </span>

      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-xs font-bold text-text">{title}</p>
        )}
        {description && (
          <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
            {description}
          </p>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>

      {dismissible && (
        <button
          onClick={handleDismiss}
          className="shrink-0 p-0.5 text-text-tertiary hover:text-text transition-colors cursor-pointer"
          aria-label="Dismiss"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
});

export default Toast;
