import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const location = useLocation();
  const navRef = useRef(null);

  /* ── Gather headings and reset active to first on route change ── */
  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;
    const elements = article.querySelectorAll('h2[id]');
    const items = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent,
    }));
    setHeadings(items);
    /* Reset active to first heading on page change */
    setActiveId(items.length > 0 ? items[0].id : '');
  }, [location.pathname]);

  /* ── Scroll the TOC nav to top on route change ── */
  useEffect(() => {
    if (navRef.current) {
      navRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  /* ── Observe headings for scroll-based active tracking ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );
    const article = document.querySelector('article');
    if (!article) return;
    const elements = article.querySelectorAll('h2[id]');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname, headings]);

  if (headings.length === 0) return null;

  return (
    <nav ref={navRef} className="space-y-0">
      <p className="mb-3 text-[10px] font-bold tracking-widest uppercase text-text-disabled">
        On this page
      </p>
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={cn(
            'block truncate border-l py-1.5 pl-3 text-xs transition-colors',
            activeId === heading.id
              ? 'border-interactive-border text-text font-semibold'
              : 'border-border text-text-tertiary hover:text-text-secondary hover:border-border-strong'
          )}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );
}
