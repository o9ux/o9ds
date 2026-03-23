import { forwardRef, useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';

import infoCircleFilledSvg from '@/assets/icons/o9con-info-circle-filled.svg?raw';
import checkCircleSvg from '@/assets/icons/o9con-check-circle.svg?raw';
import exclamationTriangleFilledSvg from '@/assets/icons/o9con-exclamation-triangle-filled.svg?raw';
import blockerActionFilledAltSvg from '@/assets/icons/o9con-blocker-action-filled-alt.svg?raw';
import blockerActionFilledSvg from '@/assets/icons/o9con-blocker-action-filled.svg?raw';
import speakerSvg from '@/assets/icons/o9con-speaker.svg?raw';
import closeSvg from '@/assets/icons/o9con-close.svg?raw';
import Link from '@/components/navigation/Link';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   VARIANT CONFIG — icon + accent color per semantic type
   Matches Figma 🟠 o9ds-toast [ALPHA 2.0]
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const VARIANT_CONFIG = {
  negative: {
    icon: blockerActionFilledAltSvg,
    accent: 'border-l-[var(--color-global-scarlet-l1)]',
    titleColor: 'text-[var(--color-global-scarlet-l1)]',
    iconColor: 'text-[var(--color-global-scarlet-l1)]',
    canAutoFade: false,
  },
  warning: {
    icon: exclamationTriangleFilledSvg,
    accent: 'border-l-warning',
    titleColor: 'text-warning',
    iconColor: 'text-warning',
    canAutoFade: true,
  },
  info: {
    icon: infoCircleFilledSvg,
    accent: 'border-l-[var(--color-info-hover)]',
    titleColor: 'text-[var(--color-info-hover)]',
    iconColor: 'text-[var(--color-info-hover)]',
    canAutoFade: true,
  },
  success: {
    icon: checkCircleSvg,
    accent: 'border-l-success',
    titleColor: 'text-success',
    iconColor: 'text-success',
    canAutoFade: true,
  },
  block: {
    icon: blockerActionFilledSvg,
    accent: 'border-l-[var(--color-global-scarlet-d1)]',
    titleColor: 'text-[var(--color-global-scarlet-d1)]',
    iconColor: 'text-[var(--color-global-scarlet-d1)]',
    canAutoFade: false,
  },
  neutral: {
    icon: speakerSvg,
    accent: 'border-l-text',
    titleColor: 'text-text',
    iconColor: 'text-text',
    canAutoFade: true,
  },
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ANIMATION CONSTANTS
   Uses design system motion tokens for smooth CSS transitions:
   - Enter: translateX(30%) opacity(0) → translateX(0) opacity(1)  (fade-in-left style)
   - Exit:  translateX(0) opacity(1) → translateX(30%) opacity(0)  (fade-out-right style)
   - Duration: --o9ds-motion-duration-normal (0.4s)
   - Easing:   --o9ds-motion-ease-in-out
   - Fade:     ~1s over 4 steps (100→75→50→25→0) — each ~200ms
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const FADE_STEP_DURATION = 200; // ms per opacity step
const FADE_STEPS = [1, 0.75, 0.5, 0.25, 0]; // opacity values
const EXIT_TRANSITION_MS = 400; // matches --o9ds-motion-duration-normal

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TOAST COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/**
 * Toast — lightweight, non-blocking alert with contextual feedback.
 *
 * Figma: 🟠 o9ds-toast [ALPHA 2.0]
 *
 * Features:
 * - Six semantic variants: negative, warning, info, success, block, neutral
 * - Smooth enter transition: slide-in from right + fade in (fade-in-left style)
 * - Smooth exit transition: slide-out to right + fade out (fade-out-right style)
 * - Fade-away lifecycle: timeout → step-based opacity fade → exit transition → removal
 * - Hover pauses: opacity returns to 100% while hovered, resumes on leave
 * - Error types (negative, block) cannot auto-dismiss — require explicit close
 * - Title truncation after 2 lines
 * - Optional action link
 * - Custom icon override for neutral variant
 * - Uses design system motion tokens for timing/easing
 */
const Toast = forwardRef(function Toast(
  {
    variant = 'neutral',
    title,
    message,
    // Legacy compat: accept `description` as alias for `message`
    description,
    link,
    linkHref,
    onLinkClick,
    icon: customIcon,
    dismissible = true,
    hasFadeAway = true,
    duration = 5000,
    onDismiss,
    action,
    className,
    ...rest
  },
  ref
) {
  const config = VARIANT_CONFIG[variant] || VARIANT_CONFIG.neutral;
  const displayMessage = message || description || '';

  /* ── Lifecycle phases ──
     'mount'     → first render frame, element at off-screen position
     'entering'  → transitioning to visible position
     'visible'   → fully visible, timeout/fade running
     'dismissing'→ transitioning out (slide right + fade out)
     'removed'   → unmounted
  ── */
  const [phase, setPhase] = useState('mount');
  const [opacity, setOpacity] = useState(1);

  /* ── Refs for timer management ── */
  const timeoutRef = useRef(null);
  const fadeIntervalRef = useRef(null);
  const fadeStepRef = useRef(0);
  const isPausedRef = useRef(false);
  const toastRef = useRef(null);
  const exitTimerRef = useRef(null);

  /* ── Merge refs ── */
  const setRefs = useCallback(
    (node) => {
      toastRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  /* ── Determine if this toast can auto-fade ── */
  const canFade = useMemo(() => {
    return config.canAutoFade && hasFadeAway && duration > 0;
  }, [config.canAutoFade, hasFadeAway, duration]);

  /* ── ARIA role: status for non-blocking, alert for block/negative ── */
  const ariaRole = variant === 'negative' || variant === 'block' ? 'alert' : 'status';

  /* ── Cleanup all timers ── */
  const clearAllTimers = useCallback(() => {
    if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
    if (fadeIntervalRef.current) { clearInterval(fadeIntervalRef.current); fadeIntervalRef.current = null; }
    if (exitTimerRef.current) { clearTimeout(exitTimerRef.current); exitTimerRef.current = null; }
  }, []);

  /* ── Trigger enter transition on mount ── */
  useEffect(() => {
    // Use rAF to ensure the initial off-screen position is painted first,
    // then trigger transition to visible position on the next frame
    const raf = requestAnimationFrame(() => {
      setPhase('entering');
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ── Handle transition between entering → visible ── */
  const handleTransitionEnd = useCallback((e) => {
    if (e.target !== toastRef.current) return;
    if (e.propertyName !== 'transform' && e.propertyName !== 'opacity') return;

    if (phase === 'entering') {
      setPhase('visible');
    }
  }, [phase]);

  /* ── Start exit → then remove ── */
  const startDismiss = useCallback(() => {
    clearAllTimers();
    setPhase('dismissing');
    // Remove after transition completes
    exitTimerRef.current = setTimeout(() => {
      exitTimerRef.current = null;
      setPhase('removed');
    }, EXIT_TRANSITION_MS + 50); // small buffer
  }, [clearAllTimers]);

  /* ── Start fade sequence ── */
  const startFade = useCallback(() => {
    fadeStepRef.current = 0;
    fadeIntervalRef.current = setInterval(() => {
      if (isPausedRef.current) return;
      fadeStepRef.current += 1;
      if (fadeStepRef.current >= FADE_STEPS.length) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
        startDismiss();
        return;
      }
      setOpacity(FADE_STEPS[fadeStepRef.current]);
    }, FADE_STEP_DURATION);
  }, [startDismiss]);

  /* ── Start timeout → fade lifecycle ── */
  const startLifecycle = useCallback(() => {
    if (!canFade) return;
    clearAllTimers();
    fadeStepRef.current = 0;
    setOpacity(1);
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      startFade();
    }, duration);
  }, [canFade, duration, clearAllTimers, startFade]);

  /* ── Start lifecycle once enter completes ── */
  useEffect(() => {
    if (phase === 'visible') {
      startLifecycle();
    }
    return () => {
      if (phase === 'visible') clearAllTimers();
    };
  }, [phase, startLifecycle, clearAllTimers]);

  /* ── Call onDismiss when removed ── */
  useEffect(() => {
    if (phase === 'removed') {
      onDismiss?.();
    }
  }, [phase, onDismiss]);

  /* ── Cleanup on unmount ── */
  useEffect(() => clearAllTimers, [clearAllTimers]);

  /* ── Hover pause / resume ── */
  const handleMouseEnter = useCallback(() => {
    if (phase === 'dismissing' || phase === 'removed') return;
    isPausedRef.current = true;
    setOpacity(1);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [phase]);

  const handleMouseLeave = useCallback(() => {
    if (phase === 'dismissing' || phase === 'removed') return;
    isPausedRef.current = false;
    if (!canFade) return;
    clearAllTimers();
    fadeStepRef.current = 0;
    setOpacity(1);
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      startFade();
    }, duration);
  }, [phase, canFade, duration, clearAllTimers, startFade]);

  /* ── Manual dismiss ── */
  const handleDismiss = useCallback(() => {
    startDismiss();
  }, [startDismiss]);

  /* ── Don't render once fully removed ── */
  if (phase === 'removed') return null;

  /* ── Icon selection ── */
  const iconSvg = (variant === 'neutral' && customIcon) ? customIcon : config.icon;

  /* ── Compute transform + opacity for each phase ── */
  const isOffScreen = phase === 'mount' || phase === 'dismissing';
  const currentOpacity = isOffScreen ? 0 : (phase === 'visible' ? opacity : 1);
  const currentTranslateX = isOffScreen ? '30%' : '0%';
  const shouldTransition = phase !== 'mount'; // no transition on first paint

  return (
    <div
      ref={setRefs}
      role={ariaRole}
      aria-live={ariaRole === 'alert' ? 'assertive' : 'polite'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTransitionEnd={handleTransitionEnd}
      className={cn(
        'flex items-start gap-1 p-3 border-l-2',
        'bg-surface min-w-[300px] max-w-md shadow-center',
        config.accent,
        className
      )}
      style={{
        opacity: currentOpacity,
        transform: `translateX(${currentTranslateX})`,
        transitionProperty: shouldTransition ? 'opacity, transform' : 'none',
        transitionDuration: shouldTransition
          ? (phase === 'visible'
              ? 'var(--o9ds-motion-duration-short), var(--o9ds-motion-duration-short)'
              : 'var(--o9ds-motion-duration-normal), var(--o9ds-motion-duration-normal)')
          : undefined,
        transitionTimingFunction: shouldTransition
          ? 'var(--o9ds-motion-ease-in-out), var(--o9ds-motion-ease-in-out)'
          : undefined,
      }}
      {...rest}
    >
      {/* Type icon */}
      <span className={cn('shrink-0 mt-0.5 w-4 h-4 flex items-center justify-center', config.iconColor)}>
        <O9Icon svg={iconSvg} />
      </span>

      {/* Content area */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        {/* Title + message wrapper */}
        <div className="flex flex-col gap-0.5">
          {title && (
            <p
              className={cn(
                'text-sm font-medium leading-snug',
                config.titleColor
              )}
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {title}
            </p>
          )}
          {displayMessage && (
            <p className="text-xs text-text-secondary leading-relaxed">
              {displayMessage}
            </p>
          )}
        </div>

        {/* Action link */}
        {link && (
          <Link
            size="sm"
            variant="primary"
            href={linkHref || '#'}
            onClick={(e) => {
              if (onLinkClick) { e.preventDefault(); onLinkClick(); }
            }}
          >
            {link}
          </Link>
        )}

        {/* Legacy action slot */}
        {action && <div className="mt-1">{action}</div>}
      </div>

      {/* Close button */}
      {dismissible && (
        <button
          type="button"
          tabIndex={0}
          onClick={handleDismiss}
          className="shrink-0 w-4 h-4 flex items-center justify-center text-text-tertiary hover:text-text transition-colors cursor-pointer"
          aria-label="Dismiss toast"
        >
          <O9Icon svg={closeSvg} />
        </button>
      )}
    </div>
  );
});

export default Toast;
