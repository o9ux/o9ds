import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import O9Icon from '@/components/O9Icon';
import Tooltip from '@/components/containers/Tooltip';

import userSvg from '@/assets/icons/o9con-user.svg?raw';
import userSecretSvg from '@/assets/icons/o9con-user-secret.svg?raw';
import pencilSvg from '@/assets/icons/o9con-pencil.svg?raw';
import genaiSvg from '@/assets/icons/o9con-genai.svg?raw';
import o9LogoSvg from '@/assets/icons/o9con-o9-logo.svg?raw';

/* ── Size tokens ──
 * text:    initials font-size (character variant) — ~55% of container height
 * icon:    icon area (icon / genai / o9logo variants) — ~70% of container
 * editBtn: pencil button chip on top-right
 */
const SIZE_MAP = {
  xs:   { px: 16, outer: 'h-4 w-4',   text: 'text-[10px]',   icon: 'text-[12px]',   editBtn: 'w-2 h-2',     editIcon: 'w-1.5 h-1.5' },
  sm:   { px: 20, outer: 'h-5 w-5',   text: 'text-[12px]',   icon: 'text-[14px]',   editBtn: 'w-2 h-2',     editIcon: 'w-1.5 h-1.5' },
  normal: { px: 24, outer: 'h-6 w-6', text: 'text-[14px]',   icon: 'text-[16px]',   editBtn: 'w-2.5 h-2.5', editIcon: 'w-2 h-2' },
  md:   { px: 32, outer: 'h-8 w-8',   text: 'text-[18px]',   icon: 'text-[24px]',   editBtn: 'w-3 h-3',     editIcon: 'w-2 h-2' },
  lg:   { px: 40, outer: 'h-10 w-10', text: 'text-[22px]',   icon: 'text-[28px]',   editBtn: 'w-3.5 h-3.5', editIcon: 'w-2 h-2' },
  xl:   { px: 48, outer: 'h-12 w-12', text: 'text-[26px]',   icon: 'text-[32px]',   editBtn: 'w-4 h-4',     editIcon: 'w-2.5 h-2.5' },
  xxl:  { px: 56, outer: 'h-14 w-14', text: 'text-[30px]',   icon: 'text-[40px]',   editBtn: 'w-4 h-4',     editIcon: 'w-2.5 h-2.5' },
  xxxl: { px: 64, outer: 'h-16 w-16', text: 'text-[34px]',   icon: 'text-[48px]',   editBtn: 'w-5 h-5',     editIcon: 'w-3 h-3' },
};

/* ── Helpers ── */
function getInitials(name) {
  if (!name) return '?';
  // Handle email: take part before @
  const cleaned = name.includes('@') ? name.split('@')[0] : name;
  const parts = cleaned.split(/[\s._-]+/).filter(Boolean);
  return parts.slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

/**
 * Avatar — user or entity representation.
 *
 * Square box-shaped avatars with multiple variant types, sizes, and edit capability.
 * Follows o9ds Figma component spec (o9ds-Avatar).
 *
 * @param {'character'|'icon'|'image'|'genai'|'o9logo'} props.variant — visual type
 * @param {'xs'|'sm'|'normal'|'md'|'lg'|'xl'|'xxl'|'xxxl'} props.size
 * @param {string}  props.name   — full name or email (used for initials in character variant)
 * @param {string}  props.src    — image URL (used in image variant)
 * @param {boolean} props.anonymous — show user-secret icon instead of user icon (icon variant)
 * @param {boolean} props.readOnly — hides edit button (default true)
 * @param {Function} props.onEdit — callback when edit button is clicked; enables edit mode
 * @param {boolean} props.disabled — disabled state
 * @param {string}  props.alt    — accessible alt text
 * @param {string}  props.className
 */
const Avatar = forwardRef(function Avatar(
  {
    variant = 'character',
    size = 'md',
    name,
    src,
    anonymous = false,
    readOnly = true,
    onEdit,
    disabled = false,
    alt,
    className,
    ...rest
  },
  ref,
) {
  const cfg = SIZE_MAP[size] || SIZE_MAP.md;
  const initials = getInitials(name);

  /* Edit button is shown only for character & image variants when not readOnly */
  const showEdit = !readOnly && !disabled && (variant === 'character' || variant === 'image');

  /* ── Variant background & content ── */
  const renderContent = () => {
    switch (variant) {
      case 'character':
        return (
          <span
            className={cn(
              'flex h-full w-full items-center justify-center select-none font-medium text-white-static',
              cfg.text,
            )}
          >
            {/* xs size shows single char */}
            {size === 'xs' ? initials.charAt(0) : initials}
          </span>
        );

      case 'icon':
        return (
          <span className={cn('flex items-center justify-center text-white-static leading-none', cfg.icon)}>
            <O9Icon svg={anonymous ? userSecretSvg : userSvg} />
          </span>
        );

      case 'image':
        return (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="h-full w-full object-cover"
            draggable={false}
          />
        );

      case 'genai':
        return (
          <span className={cn('flex items-center justify-center text-white-static leading-none', cfg.icon)}>
            <O9Icon svg={genaiSvg} />
          </span>
        );

      case 'o9logo':
        return (
          <span className={cn('flex items-center justify-center text-white-static leading-none', cfg.icon)}>
            <O9Icon svg={o9LogoSvg} />
          </span>
        );

      default:
        return null;
    }
  };

  /* ── Container background color per variant ── */
  /* Brand black (#010101) is the default for all non-image variants */
  const bgClass = variant === 'image' ? 'bg-surface-overlay' : 'bg-[var(--color-global-black)]';

  /* ── Hover background for non-readonly (slightly lightened brand black) ── */
  const hoverBg =
    !readOnly && !disabled && variant !== 'image'
      ? 'hover:bg-[var(--color-global-onyxblack-10)]'
      : '';

  /* Tooltip shows the full name (or alt) on hover / focus */
  const tooltipLabel = alt || name;

  const avatarNode = (
    <span
      ref={ref}
      role="img"
      aria-label={tooltipLabel || variant}
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden',
        cfg.outer,
        bgClass,
        hoverBg,
        disabled && 'opacity-40 pointer-events-none',
        !readOnly && !disabled && 'cursor-pointer transition-colors',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-border focus-visible:ring-offset-1 focus-visible:ring-offset-surface',
        className,
      )}
      tabIndex={disabled ? -1 : 0}
      {...rest}
    >
      {renderContent()}

      {/* Edit button overlay — top-right */}
      {showEdit && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Edit avatar"
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
          className={cn(
            'absolute top-0 right-0 flex items-center justify-center',
            'bg-surface-overlay text-text border border-border',
            'hover:bg-interactive hover:text-on-interactive hover:border-interactive',
            'transition-colors cursor-pointer',
            cfg.editBtn,
          )}
        >
          <span className={cn('flex items-center justify-center', cfg.editIcon)}>
            <O9Icon svg={pencilSvg} />
          </span>
        </button>
      )}
    </span>
  );

  /* Wrap with Tooltip when a name or alt is available */
  if (tooltipLabel) {
    return (
      <Tooltip content={tooltipLabel} placement="top">
        {avatarNode}
      </Tooltip>
    );
  }

  return avatarNode;
});

Avatar.displayName = 'Avatar';
export default Avatar;
