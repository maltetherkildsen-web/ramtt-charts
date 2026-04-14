'use client'

import { useState } from 'react'
import { cn, FONT, WEIGHT, TRANSITION, HOVER_SAND } from '@/lib/ui'
import { DocsSidebar } from '@/components/docs/DocsSidebar'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      {/* Sidebar — desktop: fixed, mobile: overlay */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-[240px] bg-[var(--bg)]',
          'border-r-[0.5px] border-r-[var(--n400)]',
          'flex flex-col',
          // Mobile: hidden by default, shown via state
          'max-md:translate-x-[-100%] max-md:transition-transform max-md:duration-200',
          sidebarOpen && 'max-md:translate-x-0',
          // Desktop: always visible
          'md:translate-x-0',
        )}
      >
        <DocsSidebar />
      </aside>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-[var(--n1150)]/20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile hamburger */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={cn(
          'fixed top-3 left-3 z-50 md:hidden',
          'w-8 h-8 flex items-center justify-center rounded-[6px]',
          'bg-[var(--bg)]',
          'border-[0.5px] border-[var(--n400)]',
          TRANSITION.background,
          HOVER_SAND,
        )}
        aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          {sidebarOpen ? (
            <path d="M4 4l8 8M12 4l-8 8" stroke="var(--n1150)" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            <>
              <path d="M2 4h12M2 8h12M2 12h12" stroke="var(--n1150)" strokeWidth="1.5" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>

      {/* Content area */}
      <main className="flex-1 md:ml-[240px]">
        <div className="mx-auto max-w-[800px] px-8 py-10 max-md:px-5 max-md:pt-14">
          {children}
        </div>
      </main>
    </div>
  )
}
