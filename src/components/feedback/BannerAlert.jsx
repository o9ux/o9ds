import { forwardRef, useState } from 'react';
import { cn } from '@/utils/cn';

const variantStyles = {
  info: 'bg-info/10 border-info/30 text-info',
  success: 'bg-success/10 border-success/30 text-success',
  warning: 'bg-warning/10 border-warning/30 text-warning',
  danger: 'bg-danger/10 border-danger/30 text-danger',
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
};

const BannerAlert = forwardRef(function BannerAlert(
  {
    variant = 'info',
    title,
    dismissible = false,
    onDismiss,
    action,
    className,
    children,
    ...rest
  },
  ref
) {
  const [visible, setVisible] = useState(true);

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
      className={cn(
        'flex items-start gap-3 px-4 py-3 border',
        variantStyles[variant],
        className
      )}
      {...rest}
    >
      <span className="shrink-0 mt-px">
        <IconComponent />
      </span>

      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-xs font-bold text-text">{title}</p>
        )}
        {children && (
          <div className="text-xs text-text-secondary mt-0.5 leading-relaxed">
            {children}
          </div>
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

export default BannerAlert;
