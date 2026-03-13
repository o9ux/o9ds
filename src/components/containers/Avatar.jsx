import { cn } from '@/utils/cn';

const SIZE_MAP = {
  xs:  { outer: 'h-5 w-5',  text: 'text-[8px]',   ring: 'ring-1' },
  sm:  { outer: 'h-7 w-7',  text: 'text-[10px]',   ring: 'ring-1' },
  md:  { outer: 'h-8 w-8',  text: 'text-xs',        ring: 'ring-1' },
  lg:  { outer: 'h-10 w-10', text: 'text-sm',       ring: 'ring-2' },
  xl:  { outer: 'h-12 w-12', text: 'text-sm',       ring: 'ring-2' },
  '2xl': { outer: 'h-16 w-16', text: 'text-base',   ring: 'ring-2' },
};

/**
 * Avatar — user or entity representation.
 *
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|'2xl'} props.size
 * @param {string} props.src    — image URL
 * @param {string} props.name   — full name (used for initials fallback)
 * @param {string} props.alt
 * @param {boolean} props.ring  — show a ring border
 * @param {'online'|'away'|'busy'|'offline'} props.status — presence dot
 * @param {string} props.className
 */
export default function Avatar({
  size = 'md',
  src,
  name,
  alt,
  ring = false,
  status,
  className,
}) {
  const cfg = SIZE_MAP[size] || SIZE_MAP.md;

  const initials = name
    ? name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
    : '?';

  const statusColor = {
    online:  'bg-success',
    away:    'bg-warning',
    busy:    'bg-danger',
    offline: 'bg-text-muted',
  };

  const statusDotSize = ['xs', 'sm'].includes(size) ? 'h-1.5 w-1.5' : 'h-2.5 w-2.5';

  return (
    <span className={cn('relative inline-flex shrink-0', cfg.outer, className)}>
      {src ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className={cn(
            'h-full w-full rounded-full object-cover',
            ring && `${cfg.ring} ring-border ring-offset-1 ring-offset-surface`
          )}
        />
      ) : (
        <span
          aria-label={alt || name || 'Avatar'}
          className={cn(
            'flex h-full w-full items-center justify-center rounded-full bg-surface-overlay font-semibold text-text-secondary select-none',
            cfg.text,
            ring && `${cfg.ring} ring-border ring-offset-1 ring-offset-surface`
          )}
        >
          {initials}
        </span>
      )}

      {status && (
        <span
          aria-label={status}
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-1 ring-surface',
            statusDotSize,
            statusColor[status]
          )}
        />
      )}
    </span>
  );
}
