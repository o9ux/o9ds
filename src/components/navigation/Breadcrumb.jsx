import { forwardRef, Children, isValidElement } from 'react';
import { cn } from '@/utils/cn';

const ChevronSeparator = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-text-tertiary"
  >
    <path d="M4.5 2.5l3 3.5-3 3.5" />
  </svg>
);

const SlashSeparator = () => (
  <span className="text-text-tertiary text-xs select-none">/</span>
);

const separatorMap = {
  chevron: ChevronSeparator,
  slash: SlashSeparator,
};

/* ─────────────────────────────────────────────
   Breadcrumb Root
   ───────────────────────────────────────────── */
const Breadcrumb = forwardRef(function Breadcrumb(
  {
    separator = 'chevron',
    maxItems,
    className,
    children,
    ...rest
  },
  ref
) {
  const items = Children.toArray(children).filter(isValidElement);
  const SeparatorComponent = separatorMap[separator] || ChevronSeparator;

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

  return (
    <nav ref={ref} aria-label="Breadcrumb" className={cn('', className)} {...rest}>
      <ol className="flex items-center gap-1.5">
        {displayItems.map((item, i) => {
          if (item === 'ellipsis') {
            return (
              <li key="ellipsis" className="flex items-center gap-1.5">
                <span className="text-text-tertiary text-xs px-1 select-none">...</span>
                <SeparatorComponent />
              </li>
            );
          }

          const isLast =
            i === displayItems.length - 1 ||
            (collapsed && i === displayItems.length - 1);

          return (
            <li key={i} className="flex items-center gap-1.5">
              {isLast ? (
                <span className="text-xs text-text font-medium truncate max-w-[200px]">
                  {item.props?.children || item}
                </span>
              ) : (
                item
              )}
              {!isLast && <SeparatorComponent />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});

/* ─────────────────────────────────────────────
   BreadcrumbItem
   ───────────────────────────────────────────── */
const BreadcrumbItem = forwardRef(function BreadcrumbItem(
  { href, className, children, ...rest },
  ref
) {
  const Tag = href ? 'a' : 'span';

  return (
    <Tag
      ref={ref}
      href={href}
      className={cn(
        'text-xs truncate max-w-[200px]',
        href
          ? 'text-text-secondary hover:text-text transition-colors cursor-pointer'
          : 'text-text-tertiary',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
});

export { Breadcrumb, BreadcrumbItem };
