import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import TableOfContents from './TableOfContents';
import { cn } from '@/utils/cn';

export default function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
