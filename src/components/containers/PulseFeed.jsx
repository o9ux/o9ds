import { forwardRef, useState, useCallback } from 'react';
import { cn } from '@/utils/cn';
import Avatar from '@/components/containers/Avatar';
import Checkbox from '@/components/inputs/Checkbox';
import IconButton from '@/components/buttons/IconButton';
import Button from '@/components/buttons/Button';
import Chip from '@/components/inputs/Chip';
import Pill from '@/components/feedback/Pill';
import O9Icon from '@/components/O9Icon';

import starSvg from '@/assets/icons/o9con-star-o.svg?raw';
import starFilledSvg from '@/assets/icons/o9con-star.svg?raw';
import ellipsisVSvg from '@/assets/icons/o9con-ellipsis-v.svg?raw';
import commentAddSvg from '@/assets/icons/o9con-comment-add.svg?raw';
import createTaskSvg from '@/assets/icons/o9con-create-task.svg?raw';
import userPlusSvg from '@/assets/icons/o9con-user-plus.svg?raw';
import thumbsUpSvg from '@/assets/icons/o9con-thumbs-up.svg?raw';
import tagSvg from '@/assets/icons/o9con-tag.svg?raw';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PULSE FEED COMPONENT
   A social-style feed item for collaboration and communication.

   Three sections:
   1. Header  — Checkbox, Avatar, Name, Folder, Time, Star, More
   2. Content — Title, Description, Rich Text, Tags (ChipList)
   3. Footer  — Action bar (Comment, Create Task, Followers, Like)

   Color tokens used:
   - bg-surface-raised  (#F2F2F2 light / #1A1A1A dark) — default container
   - bg-surface-overlay  (#E5E5E5 light / #202020 dark) — selected container
   - border-border       — separator & selected border
   - text-text           — primary text
   - text-text-secondary — author name secondary
   - text-text-tertiary  — folder, time, description

   All subcomponents from o9ds Design System Library:
   - Avatar, Checkbox, IconButton, Button, Chip, O9Icon
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** Default action config for the footer bar */
const DEFAULT_ACTIONS = [
  { key: 'comment', icon: commentAddSvg, label: 'Comment' },
  { key: 'task', icon: createTaskSvg, label: 'Create task' },
  { key: 'followers', icon: userPlusSvg, label: 'Followers' },
  { key: 'like', icon: thumbsUpSvg, label: 'Like' },
];

/**
 * PulseFeed — a social feed item for pulse-style collaboration.
 *
 * @param {object}    author          — { name, avatarSrc?, variant? } user who authored the post
 * @param {string}    folder          — folder/channel name
 * @param {string}    time            — relative time label (e.g. "1 min ago")
 * @param {string}    title           — post title (single-line, truncated)
 * @param {ReactNode} children        — post body / description (supports rich text)
 * @param {string[]}  tags            — tag labels displayed as Chips
 * @param {number}    maxTags         — max visible tags before overflow (default 6)
 * @param {boolean}   selected        — checkbox selection state
 * @param {function}  onSelectChange  — checkbox change callback
 * @param {boolean}   starred         — star/favorite state
 * @param {function}  onStarChange    — star toggle callback
 * @param {function}  onMoreClick     — overflow/more-actions callback
 * @param {object}    counts          — { comment, task, followers, like } count numbers
 * @param {function}  onActionClick   — (actionKey) => void — footer action callback
 * @param {Array}     actions         — custom footer actions array [{key,icon,label}]
 * @param {function}  onTagToggle     — toggle tags visibility callback
 * @param {function}  onTagAdd        — add tag callback
 * @param {boolean}   showTags        — controlled tags visibility (default true)
 * @param {string}    className       — additional CSS classes
 */
const PulseFeed = forwardRef(function PulseFeed(
  {
    author = { name: 'Unknown User' },
    folder,
    time,
    title,
    children,
    tags = [],
    maxTags = 6,
    selected = false,
    onSelectChange,
    starred = false,
    onStarChange,
    onMoreClick,
    counts = {},
    onActionClick,
    actions = DEFAULT_ACTIONS,
    onTagToggle,
    onTagAdd,
    showTags: controlledShowTags,
    className,
    ...rest
  },
  ref,
) {
  /* ── Internal tags visibility state ── */
  const [internalShowTags, setInternalShowTags] = useState(true);
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const showTags = controlledShowTags !== undefined ? controlledShowTags : internalShowTags;

  const handleTagToggle = useCallback(() => {
    if (controlledShowTags !== undefined) {
      onTagToggle?.();
    } else {
      setInternalShowTags((prev) => !prev);
    }
    setTagsExpanded(false);
  }, [controlledShowTags, onTagToggle]);

  /* ── Visible tags with overflow ── */
  const visibleTags = showTags ? (tagsExpanded ? tags : tags.slice(0, maxTags)) : [];
  const overflowCount = tagsExpanded ? 0 : tags.length - maxTags;

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col w-full transition-colors duration-100',
        /* Default: bg-surface-raised (#F2F2F2 light / #1A1A1A dark)
           Selected: global-gray-02 (#E5E5E5) light / surface-input (#2A2A2A) dark */
        selected
          ? 'bg-[var(--color-pulse-feed-selected)] border border-border-strong'
          : 'bg-surface-raised border border-transparent',
        className,
      )}
      role="article"
      aria-label={title ? `Post by ${author.name}: ${title}` : `Post by ${author.name}`}
      {...rest}
    >
      {/* ═══════════ SECTION 1: HEADER ═══════════ */}
      <div className="flex gap-3 items-start px-2 pt-2">
        {/* Checkbox — flush 8px from top-left, explicit size to prevent height mismatch */}
        <div className="shrink-0 flex items-start leading-none">
          <Checkbox
            size="sm"
            checked={selected}
            onChange={onSelectChange}
            aria-label={`Select post by ${author.name}`}
          />
        </div>

        {/* Avatar + Meta + Actions */}
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          <div className="flex gap-2.5 items-start w-full">
            {/* Avatar */}
            <div className="shrink-0">
              <Avatar
                variant={author.avatarSrc ? 'image' : (author.variant || 'character')}
                name={author.name}
                src={author.avatarSrc}
                size="md"
                readOnly
              />
            </div>

            {/* Name + Folder — tighter gap */}
            <div className="flex-1 min-w-0 flex flex-col self-stretch">
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-medium text-text truncate">{author.name}</span>
                <span className="text-xs text-text-tertiary shrink-0 ml-2">{time}</span>
              </div>
              {folder && (
                <span className="text-xs text-text-tertiary truncate">{folder}</span>
              )}
            </div>

            {/* Star + More — using IconButton from DS */}
            <div className="flex items-center gap-1 shrink-0">
              <IconButton
                icon={<O9Icon svg={starred ? starFilledSvg : starSvg} />}
                variant="ghost"
                size="xm"
                tooltip={starred ? 'Unstar' : 'Star'}
                aria-label={starred ? 'Remove from favorites' : 'Add to favorites'}
                aria-pressed={starred}
                onClick={() => onStarChange?.(!starred)}
                className={starred ? 'text-warning' : ''}
              />
              <IconButton
                icon={<O9Icon svg={ellipsisVSvg} />}
                variant="ghost"
                size="xm"
                tooltip="More actions"
                aria-label="More actions"
                onClick={onMoreClick}
              />
            </div>
          </div>

          {/* ═══════════ SECTION 2: CONTENT ═══════════ */}
          <div className="flex flex-col gap-3 pl-[42px] pr-16">
            {/* Title + Description */}
            <div className="flex flex-col gap-1">
              {title && (
                <h4 className="text-sm font-medium text-text truncate leading-6">{title}</h4>
              )}
              {children && (
                <div className="text-sm text-text-tertiary leading-normal">{children}</div>
              )}
            </div>

            {/* Tags — using Button (ghost) and Chip from DS */}
            {tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1">
                {showTags ? (
                  <>
                    {/* Hide tags button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      leadingIcon={<O9Icon svg={tagSvg} />}
                      onClick={handleTagToggle}
                      className="bg-interactive-muted-hover"
                    >
                      Hide tags
                    </Button>

                    {visibleTags.map((tag, i) => (
                      <Chip
                        key={`${tag}-${i}`}
                        variant="secondary"
                        size="sm"
                      >
                        {tag}
                      </Chip>
                    ))}

                    {overflowCount > 0 && (
                      <button
                        type="button"
                        onClick={() => setTagsExpanded(true)}
                        className="text-xs text-text-secondary hover:text-text cursor-pointer transition-colors px-1"
                      >
                        +{overflowCount} more
                      </button>
                    )}

                    {tagsExpanded && tags.length > maxTags && (
                      <button
                        type="button"
                        onClick={() => setTagsExpanded(false)}
                        className="text-xs text-text-secondary hover:text-text cursor-pointer transition-colors px-1"
                      >
                        Show less
                      </button>
                    )}

                    {onTagAdd && (
                      <Button
                        variant="ghost"
                        size="sm"
                        leadingIcon={<O9Icon svg={tagSvg} />}
                        onClick={onTagAdd}
                      >
                        Add
                      </Button>
                    )}
                  </>
                ) : (
                  /* Collapsed — show "+count more" to expand */
                  <Button
                    variant="ghost"
                    size="sm"
                    leadingIcon={<O9Icon svg={tagSvg} />}
                    onClick={handleTagToggle}
                    className="bg-interactive-muted-hover"
                  >
                    +{tags.length} tags
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ═══════════ SEPARATOR — darker when selected for contrast ═══════════ */}
      <div className={cn('border-t mt-4', selected ? 'border-[var(--color-pulse-feed-separator)]' : 'border-border')} />

      {/* ═══════════ SECTION 3: FOOTER — using Pill (neutral) from DS ═══════════ */}
      <div
        className="flex items-center justify-between px-3 py-2"
        role="toolbar"
        aria-label="Post actions"
      >
        {actions.map((action) => {
          const count = counts[action.key];
          return (
            <button
              key={action.key}
              type="button"
              className={cn(
                'flex flex-1 items-center justify-center gap-1.5 h-8 px-3 py-1.5',
                'text-sm text-text hover:bg-interactive-subtle transition-colors',
                'focus-visible:outline-1 focus-visible:outline focus-visible:-outline-offset-1 focus-visible:outline-interactive-border',
              )}
              onClick={() => onActionClick?.(action.key)}
              aria-label={count != null ? `${action.label} (${count})` : action.label}
            >
              <span className="w-6 h-6 shrink-0 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full">
                <O9Icon svg={action.icon} />
              </span>
              <span className="truncate">{action.label}</span>
              {count != null && (
                <Pill variant="neutral" size="sm">{count}</Pill>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
});

export default PulseFeed;
