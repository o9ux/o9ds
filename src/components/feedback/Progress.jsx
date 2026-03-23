import { forwardRef, useMemo } from 'react';
import { cn } from '@/utils/cn';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROGRESS COMPONENT
   Inspired by MUI Progress patterns, built with o9ds tokens.

   Two types:
   - "linear"   — horizontal progress bar (sharp/rectangular ends)
   - "circular" — SVG-based circular arc

   Three variants:
   - "determinate"    — shows actual progress (0–100%)
   - "indeterminate"  — continuous animation for unknown duration
   - "buffer"         — two-layer bar (linear only)

   Five semantic colors:
   - primary, info, success, warning, danger

   Three sizes:
   - sm, md, lg

   Accessibility:
   - role="progressbar" with aria-valuenow/min/max
   - aria-label for screen readers
   - prefers-reduced-motion support
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* ── Color maps ── */
const LINEAR_COLOR = {
  primary: 'bg-interactive',
  info:    'bg-info',
  success: 'bg-success',
  warning: 'bg-warning',
  danger:  'bg-danger',
};

const LINEAR_BUFFER_COLOR = {
  primary: 'bg-interactive/30',
  info:    'bg-info/30',
  success: 'bg-success/30',
  warning: 'bg-warning/30',
  danger:  'bg-danger/30',
};

const STROKE_COLOR = {
  primary: 'var(--color-interactive)',
  info:    'var(--color-info)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  danger:  'var(--color-danger)',
};

/* ── Linear size (track height) ── */
const LINEAR_SIZE = {
  sm: 'h-0.5',    /* 2px */
  md: 'h-1',      /* 4px */
  lg: 'h-2',      /* 8px */
};

/* ── Linear label font size ── */
const LINEAR_LABEL_FONT = {
  sm: 'text-[9px]',
  md: 'text-[10px]',
  lg: 'text-xs',
};

/* ── Circular size (SVG diameter + stroke width) ── */
const CIRCULAR_SIZE = {
  sm: { diameter: 24, stroke: 2.5 },
  md: { diameter: 40, stroke: 3.5 },
  lg: { diameter: 56, stroke: 4 },
};

/* ── Circular value label font size ── */
const CIRCULAR_FONT = {
  sm: 'text-[8px]',
  md: 'text-xs',
  lg: 'text-sm',
};

/* ── CSS keyframes (injected once) ── */
const KEYFRAMES_ID = 'o9ds-progress-keyframes';

function ensureKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KEYFRAMES_ID)) return;
  const style = document.createElement('style');
  style.id = KEYFRAMES_ID;
  style.textContent = `
    @keyframes o9ds-linear-indeterminate-1 {
      0%   { left: -35%; right: 100%; }
      60%  { left: 100%; right: -90%; }
      100% { left: 100%; right: -90%; }
    }
    @keyframes o9ds-linear-indeterminate-2 {
      0%   { left: -200%; right: 100%; }
      60%  { left: 107%; right: -8%; }
      100% { left: 107%; right: -8%; }
    }
    @keyframes o9ds-circular-rotate {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes o9ds-circular-dash {
      0%   { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
      50%  { stroke-dasharray: 100, 200; stroke-dashoffset: -15; }
      100% { stroke-dasharray: 100, 200; stroke-dashoffset: -120; }
    }
    @media (prefers-reduced-motion: reduce) {
      .o9ds-progress-animate { animation: none !important; }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Progress — linear or circular progress indicator.
 *
 * @param {'linear'|'circular'}         props.type        — indicator type
 * @param {'determinate'|'indeterminate'|'buffer'} props.variant — animation mode
 * @param {number}                      props.value       — progress 0–100 (determinate/buffer)
 * @param {number}                      props.bufferValue — buffer progress 0–100 (buffer only)
 * @param {'primary'|'info'|'success'|'warning'|'danger'} props.color
 * @param {'sm'|'md'|'lg'}             props.size
 * @param {string}                      props.label       — accessible label
 * @param {boolean}                     props.showValue   — show % text (linear: right side, circular: center)
 * @param {string}                      props.className
 */
const Progress = forwardRef(function Progress(
  {
    type = 'linear',
    variant = 'determinate',
    value = 0,
    bufferValue = 0,
    color = 'primary',
    size = 'md',
    label = 'Loading…',
    showValue = false,
    className,
    ...rest
  },
  ref
) {
  /* Inject keyframes on first render */
  useMemo(() => ensureKeyframes(), []);

  const clampedValue = Math.max(0, Math.min(100, value));
  const clampedBuffer = Math.max(0, Math.min(100, bufferValue));
  const isDeterminate = variant === 'determinate';
  const isIndeterminate = variant === 'indeterminate';
  const isBuffer = variant === 'buffer';

  /* ── ARIA props ── */
  const ariaProps = {
    role: 'progressbar',
    'aria-label': label,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    ...(isDeterminate || isBuffer ? { 'aria-valuenow': clampedValue } : {}),
  };

  /* ━━━ LINEAR ━━━ */
  if (type === 'linear') {
    const track = (
      <div
        className={cn('flex-1 bg-surface-raised overflow-hidden relative', LINEAR_SIZE[size])}
        {...(!showValue ? ariaProps : {})}
      >
        {/* Buffer bar (behind primary) */}
        {isBuffer && (
          <div
            className={cn('absolute inset-y-0 left-0', LINEAR_BUFFER_COLOR[color])}
            style={{
              width: `${clampedBuffer}%`,
              transition: 'width var(--o9ds-motion-duration-normal) var(--o9ds-motion-ease-out)',
            }}
          />
        )}

        {/* Determinate / buffer primary bar */}
        {(isDeterminate || isBuffer) && (
          <div
            className={cn('h-full', LINEAR_COLOR[color])}
            style={{
              width: `${clampedValue}%`,
              transition: 'width var(--o9ds-motion-duration-normal) var(--o9ds-motion-ease-out)',
            }}
          />
        )}

        {/* Indeterminate — two animated bars */}
        {isIndeterminate && (
          <>
            <div
              className={cn('absolute inset-y-0 o9ds-progress-animate', LINEAR_COLOR[color])}
              style={{
                animation: 'o9ds-linear-indeterminate-1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite',
              }}
            />
            <div
              className={cn('absolute inset-y-0 o9ds-progress-animate', LINEAR_COLOR[color])}
              style={{
                animation: 'o9ds-linear-indeterminate-2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite',
              }}
            />
          </>
        )}
      </div>
    );

    /* With label: wrap track + percentage text */
    if (showValue && isDeterminate) {
      return (
        <div
          ref={ref}
          className={cn('flex items-center gap-2 w-full', className)}
          {...ariaProps}
          {...rest}
        >
          {track}
          <span className={cn('shrink-0 font-medium text-text tabular-nums', LINEAR_LABEL_FONT[size])}>
            {Math.round(clampedValue)}%
          </span>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('w-full', className)} {...rest}>
        {track}
      </div>
    );
  }

  /* ━━━ CIRCULAR ━━━ */
  const { diameter, stroke } = CIRCULAR_SIZE[size] || CIRCULAR_SIZE.md;
  const radius = (diameter - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = isDeterminate ? circumference - (clampedValue / 100) * circumference : 0;

  return (
    <div
      ref={ref}
      className={cn('inline-flex items-center justify-center relative', className)}
      style={{ width: diameter, height: diameter }}
      {...ariaProps}
      {...rest}
    >
      <svg
        viewBox={`0 0 ${diameter} ${diameter}`}
        width={diameter}
        height={diameter}
        className={cn(isIndeterminate && 'o9ds-progress-animate')}
        style={isIndeterminate ? {
          animation: 'o9ds-circular-rotate 1.8s linear infinite',
        } : undefined}
      >
        {/* Track circle */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke="var(--color-surface-raised)"
          strokeWidth={stroke}
        />

        {/* Progress arc */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke={STROKE_COLOR[color]}
          strokeWidth={stroke}
          strokeLinecap={isIndeterminate ? 'round' : 'butt'}
          strokeDasharray={isDeterminate ? circumference : '200'}
          strokeDashoffset={isDeterminate ? dashOffset : undefined}
          className={cn(isIndeterminate && 'o9ds-progress-animate')}
          style={{
            transformOrigin: 'center',
            transform: 'rotate(-90deg)',
            ...(isDeterminate ? {
              transition: 'stroke-dashoffset var(--o9ds-motion-duration-normal) var(--o9ds-motion-ease-out)',
            } : {
              animation: 'o9ds-circular-dash 1.4s ease-in-out infinite',
            }),
          }}
        />
      </svg>

      {/* Center percentage label */}
      {showValue && isDeterminate && (
        <span className={cn('absolute font-medium text-text', CIRCULAR_FONT[size])}>
          {Math.round(clampedValue)}%
        </span>
      )}
    </div>
  );
});

export default Progress;
