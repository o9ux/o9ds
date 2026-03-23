import { useState, useEffect, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import TableOfContents from './TableOfContents';
import { cn } from '@/utils/cn';

/* ── Custom smooth scroll with slow ease-out ──
   duration: 900ms (slower than browser default ~300ms)
   easing: cubic ease-out (slow deceleration)
*/
function smoothScrollTo(targetY, duration = 900) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    window.scrollTo(0, targetY);
    return;
  }

  const startY = window.scrollY;
  const diff = targetY - startY;
  if (Math.abs(diff) < 1) return;

  let startTime = null;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);

    window.scrollTo(0, startY + diff * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

export default function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname, hash } = useLocation();

  /* Scroll to top on route change */
  useEffect(() => {
    if (hash) {
      /* If navigating to a hash, scroll to that element */
      requestAnimationFrame(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          smoothScrollTo(top);
        }
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  /* Intercept all anchor clicks for smooth scrolling */
  useEffect(() => {
    function handleClick(e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const id = anchor.getAttribute('href')?.slice(1);
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      smoothScrollTo(top);

      /* Update URL hash without jumping */
      window.history.pushState(null, '', `#${id}`);
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  /* ── Smooth mouse wheel scrolling ──
     Intercepts wheel events and applies lerped scrolling
     for a softer, slower feel.
  */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let rafId = null;
    let isScrolling = false;
    const LERP = 0.12;         /* faster interpolation */
    const DAMPEN = 0.55;       /* 55% of native scroll speed */
    const MAX_DELTA = 80;      /* cap per-tick delta */
    const MAX_AHEAD = 350;     /* target can be up to 350px ahead of current */

    function animate() {
      currentY += (targetY - currentY) * LERP;

      if (Math.abs(targetY - currentY) < 0.5) {
        currentY = targetY;
        isScrolling = false;
        window.scrollTo(0, currentY);
        rafId = null;
        return;
      }

      window.scrollTo(0, currentY);
      rafId = requestAnimationFrame(animate);
    }

    function isInsideScrollable(target) {
      let el = target;
      while (el && el !== document.documentElement) {
        if (
          el.tagName === 'ASIDE' ||
          el.getAttribute('role') === 'dialog' ||
          el.hasAttribute('data-dropdown-id')
        ) {
          return true;
        }
        const style = window.getComputedStyle(el);
        const ovY = style.overflowY;
        const ovX = style.overflowX;
        /* Vertical scrollable */
        if ((ovY === 'auto' || ovY === 'scroll' || ovY === 'overlay') && el.scrollHeight > el.clientHeight) {
          return true;
        }
        /* Horizontal scrollable (tables, code blocks) */
        if ((ovX === 'auto' || ovX === 'scroll' || ovX === 'overlay') && el.scrollWidth > el.clientWidth) {
          return true;
        }
        el = el.parentElement;
      }
      return false;
    }

    function onWheel(e) {
      if (isInsideScrollable(e.target)) return;

      e.preventDefault();

      /* Sync on first event */
      if (!isScrolling) {
        currentY = window.scrollY;
        targetY = currentY;
        isScrolling = true;
      }

      const dampened = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY) * DAMPEN, MAX_DELTA);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      let newTarget = targetY + dampened;

      /* Clamp: target can never race more than MAX_AHEAD px beyond current */
      const diff = newTarget - currentY;
      if (Math.abs(diff) > MAX_AHEAD) {
        newTarget = currentY + Math.sign(diff) * MAX_AHEAD;
      }

      targetY = Math.max(0, Math.min(maxScroll, newTarget));

      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-backdrop lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — fixed on all screen sizes, slides in/out on mobile */}
      <aside
        className={cn(
          'fixed top-14 bottom-0 left-0 z-30 w-60 overflow-y-auto border-r border-border bg-surface-sunken transition-transform lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <Sidebar />
      </aside>

      {/* Content area — offset by sidebar width on desktop */}
      <div className="flex lg:ml-60">
        {/* Main content */}
        <main className="min-w-0 flex-1 px-6 py-10 lg:px-14 lg:py-12">
          <div className="mx-auto max-w-3xl">
            <Outlet />
          </div>
        </main>

        {/* Table of contents */}
        <aside className="hidden w-52 shrink-0 xl:block">
          <div className="sticky top-20 p-6">
            <TableOfContents />
          </div>
        </aside>
      </div>
    </div>
  );
}
