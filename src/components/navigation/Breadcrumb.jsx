import { forwardRef, Children, isValidElement, cloneElement } from 'react';
import { cn } from '@/utils/cn';

/* ── Size configuration ── */
const SIZE_CONFIG = {
  sm: {
    text: 'text-[10px]',
    icon: 'w-3 h-3 [&_svg]:h-3 [&_svg]:w-3',
    gap: 'gap-1',
    itemGap: 'gap-0.5',
    ellipsis: 'text-[10px]',
    svgSize: 10,
    maxW: 'max-w-[160px]',
  },
  md: {
    text: 'text-xs',
    icon: 'w-3.5 h-3.5 [&_svg]:h-3.5 [&_svg]:w-3.5',
    gap: 'gap-1.5',
    itemGap: 'gap-1',
    ellipsis: 'text-xs',
    svgSize: 12,
    maxW: 'max-w-[200px]',
  },
  lg: {
    text: 'text-sm',
    icon: 'w-4 h-4 [&_svg]:h-4 [&_svg]:w-4',
    gap: 'gap-2',
    itemGap: 'gap-1.5',
    ellipsis: 'text-sm',
    svgSize: 14,
    maxW: 'max-w-[240px]',
  },
};

/* ── Chevron separator (size-aware) ── */
const ChevronSeparator = ({ size = 12 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-text-tertiary shrink-0"
    aria-hidden="true"
  >
    <path d="M4.5 2.5l3 3.5-3 3.5" />
  </svg>
);

/* ── Slash separator (size-aware) ── */
const SlashSeparator = ({ sizeClass = 'text-xs' }) => (
  <span className={cn('text-text-tertiary select-none', sizeClass)} aria-hidden="true">/</span>
);

/* ── Link-secondary styles for breadcrumb items ── */
const linkStyles = cn(
  'text-text',
  'no-underline hover:underline hover:text-info-hover hover:underline-offset-2',
  'active:font-medium active:text-info',
  'visited:text-utility-purple',
  'transition-colors duration-100 cursor-pointer',
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-border focus-visible:ring-offset-1 focus-visible:ring-offset-surface',
);

/* ─────────────────────────────────────────────
   Breadcrumb Root
   Three sizes: sm (10px), md (12px), lg (14px)
   ───────────────────────────────────────────── */
const Breadcrumb = forwardRef(function Breadcrumb(
  {
    separator = 'chevron',
    size = 'md',
    maxItems,
    className,
    children,
    ...rest
  },
  ref
) {
  const items = Children.toArray(children).filter(isValidElement);
  const sizeConfig = SIZE_CONFIG[size] || SIZE_CONFIG.md;

  let displayItems = items;
  let collapsed = false;

  if (maxItems && items.length > maxItems && maxItems >= 2) {
    collapsed = true;
    displayItems = [
      items[0],
      'ellipsis',
      ...items.slice(items.length - (maxItems - 1)),
    ];
  }

  const renderSeparator = () => {
    if (separator === 'slash') {
      return <SlashSeparator sizeClass={sizeConfig.text} />;
    }
    return <ChevronSeparator size={sizeConfig.svgSize} />;
  };

  return (
    <nav ref={ref} aria-label="Breadcrumb" className={cn('', className)} {...rest}>
      <ol className={cn('flex items-center', sizeConfig.gap)}>
        {displayItems.map((item, i) => {
          if (item === 'ellipsis') {
            return (
              <li key="ellipsis" className={cn('flex items-center', sizeConfig.gap)}>
                <span className={cn('text-text-tertiary px-1 select-none', sizeConfig.ellipsis)} aria-hidden="true">...</span>
                {renderSeparator()}
              </li>
            );
          }

          const isLast =
            i === displayItems.length - 1 ||
            (collapsed && i === displayItems.length - 1);

          return (
            <li key={i} className={cn('flex items-center', sizeConfig.gap)} aria-current={isLast ? 'page' : undefined}>
              {isLast ? (
                /* Current page — non-interactive, medium weight */
                <span className={cn('inline-flex items-center text-text font-medium', sizeConfig.text, sizeConfig.itemGap, sizeConfig.maxW)}>
                  {item.props?.icon && (
                    <span className={cn('shrink-0 flex items-center justify-center', sizeConfig.icon)}>
                      {item.props.icon}
                    </span>
                  )}
                  {item.props?.children && <span className="truncate">{item.props.children}</span>}
                </span>
              ) : (
                /* Pass size down to BreadcrumbItem */
                cloneElement(item, { _size: size })
              )}
              {!isLast && renderSeparator()}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});

/* ─────────────────────────────────────────────
   BreadcrumbItem
   Uses Link Secondary variant styles:
   - Default: text-text (black/white)
   - Hover: text-info-hover with underline
   - Active: font-medium text-info
   - Visited: text-utility-purple
   ───────────────────────────────────────────── */
const BreadcrumbItem = forwardRef(function BreadcrumbItem(
  { href, icon, className, children, _size = 'md', ...rest },
  ref
) {
  const Tag = href ? 'a' : 'span';
  const isIconOnly = icon && !children;
  const sizeConfig = SIZE_CONFIG[_size] || SIZE_CONFIG.md;

  return (
    <Tag
      ref={ref}
      href={href}
      aria-label={isIconOnly && rest['aria-label'] ? rest['aria-label'] : undefined}
      className={cn(
        'inline-flex items-center',
        sizeConfig.text,
        sizeConfig.itemGap,
        sizeConfig.maxW,
        href ? linkStyles : 'text-text-tertiary',
        className
      )}
      {...rest}
    >
      {icon && (
        <span className={cn('shrink-0 flex items-center justify-center', sizeConfig.icon)}>
          {icon}
        </span>
      )}
      {children && <span className="truncate">{children}</span>}
    </Tag>
  );
});

export { Breadcrumb, BreadcrumbItem };
