// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import {
  createContext,
  useContext,
  forwardRef,
  type ReactNode,
} from 'react'
import {
  cn,
  FONT,
  WEIGHT,
  TRANSITION,
  HOVER_SAND,
  FOCUS_RING,
  SIDEBAR_WIDTH,
  SIDEBAR_ITEM_STYLE,
  SIDEBAR_ITEM_ACTIVE,
  RADIUS,
} from '@/lib/ui'

// ─── Context ───

interface AppSidebarContextValue {
  collapsed: boolean
}

const AppSidebarContext = createContext<AppSidebarContextValue>({ collapsed: false })

function useAppSidebar() {
  return useContext(AppSidebarContext)
}

// ─── Root ───

export interface AppSidebarProps {
  children: ReactNode
  collapsed?: boolean
  className?: string
}

const AppSidebarRoot = forwardRef<HTMLElement, AppSidebarProps>(
  ({ children, collapsed = false, className }, ref) => {
    return (
      <AppSidebarContext.Provider value={{ collapsed }}>
        <aside
          ref={ref}
          className={cn(
            'flex flex-col h-full border-r-[0.5px] border-r-[var(--n400)] bg-[var(--bg)]',
            'overflow-hidden shrink-0',
            className,
          )}
          style={{
            width: collapsed ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.expanded,
            transition: 'width 200ms var(--ease-out-expo)',
          }}
        >
          {children}
        </aside>
      </AppSidebarContext.Provider>
    )
  },
)
AppSidebarRoot.displayName = 'AppSidebar'

// ─── Header (workspace switcher + search + toggle area) ───

interface AppSidebarHeaderProps {
  children: ReactNode
  className?: string
}

function AppSidebarHeader({ children, className }: AppSidebarHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-1 px-2 pt-2 pb-1 shrink-0',
        className,
      )}
    >
      {children}
    </div>
  )
}
AppSidebarHeader.displayName = 'AppSidebar.Header'

// ─── Search trigger button ───

interface AppSidebarSearchProps {
  onClick?: () => void
  className?: string
}

function AppSidebarSearch({ onClick, className }: AppSidebarSearchProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Search"
      className={cn(
        'shrink-0 flex items-center justify-center',
        RADIUS.md,
        TRANSITION.background,
        FOCUS_RING,
        HOVER_SAND,
        className,
      )}
      style={{ width: 32, height: 32 }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="text-[var(--n600)]"
      >
        <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.25" />
        <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    </button>
  )
}
AppSidebarSearch.displayName = 'AppSidebar.Search'

// ─── Nav ───

function AppSidebarNav({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <nav className={cn('flex flex-col gap-0.5 px-2', className)}>
      {children}
    </nav>
  )
}
AppSidebarNav.displayName = 'AppSidebar.Nav'

// ─── Item ───

interface AppSidebarItemProps {
  href?: string
  icon?: ReactNode
  active?: boolean
  children: ReactNode
  onClick?: () => void
  className?: string
}

function AppSidebarItem({ href, icon, active = false, children, onClick, className }: AppSidebarItemProps) {
  const { collapsed } = useAppSidebar()
  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-2.5',
        SIDEBAR_ITEM_STYLE,
        TRANSITION.background,
        FOCUS_RING,
        active ? SIDEBAR_ITEM_ACTIVE : HOVER_SAND,
        collapsed && 'justify-center px-0',
        className,
      )}
    >
      {icon && (
        <span
          className={cn(
            'shrink-0 flex items-center justify-center',
            active ? 'text-[var(--n1150)]' : 'text-[var(--n600)]',
          )}
          style={{ width: 18, height: 18 }}
        >
          {icon}
        </span>
      )}
      {!collapsed && (
        <span className={cn(FONT.body, 'truncate')}>
          {children}
        </span>
      )}
    </Tag>
  )
}
AppSidebarItem.displayName = 'AppSidebar.Item'

// ─── Section (Pinned, Recents, Dispatch, etc.) ───

interface AppSidebarSectionProps {
  label?: string
  children: ReactNode
  className?: string
}

function AppSidebarSection({ label, children, className }: AppSidebarSectionProps) {
  const { collapsed } = useAppSidebar()

  return (
    <div className={cn('mt-2', className)}>
      {label && !collapsed && (
        <div
          className={cn(
            FONT.body,
            'text-[11px]',
            WEIGHT.strong,
            'text-[var(--n600)] px-3 py-1',
          )}
        >
          {label}
        </div>
      )}
      <div className="flex flex-col gap-0.5 px-2">
        {children}
      </div>
    </div>
  )
}
AppSidebarSection.displayName = 'AppSidebar.Section'

// ─── Separator ───

function AppSidebarSeparator({ className }: { className?: string }) {
  return <div className={cn('h-px bg-[var(--n200)] mx-3 my-2', className)} />
}
AppSidebarSeparator.displayName = 'AppSidebar.Separator'

// ─── Scroll area for recents ───

function AppSidebarScroll({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn('flex-1 overflow-y-auto min-h-0', className)}
    >
      {children}
    </div>
  )
}
AppSidebarScroll.displayName = 'AppSidebar.Scroll'

// ─── Footer (user info, settings) ───

interface AppSidebarFooterProps {
  name?: string
  avatar?: ReactNode
  onSettingsClick?: () => void
  children?: ReactNode
  className?: string
}

function AppSidebarFooter({ name, avatar, onSettingsClick, children, className }: AppSidebarFooterProps) {
  const { collapsed } = useAppSidebar()

  return (
    <div className={cn('mt-auto px-2 pb-3 pt-2 shrink-0', className)}>
      {children ?? (
        <div className="flex items-center gap-2.5">
          {avatar && (
            <span className="shrink-0 flex items-center justify-center text-[var(--n600)]" style={{ width: 18, height: 18 }}>
              {avatar}
            </span>
          )}
          {!avatar && (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0 text-[var(--n600)]">
              <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.25" />
              <path d="M3 15.5C3 12.7 5.7 10.5 9 10.5C12.3 10.5 15 12.7 15 15.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
            </svg>
          )}
          {!collapsed && name && (
            <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n1150)] truncate flex-1')}>
              {name}
            </span>
          )}
          {!collapsed && onSettingsClick && (
            <button
              type="button"
              aria-label="Settings"
              onClick={onSettingsClick}
              className={cn(
                'shrink-0 flex items-center justify-center',
                RADIUS.md,
                TRANSITION.background,
                FOCUS_RING,
                HOVER_SAND,
              )}
              style={{ width: 24, height: 24 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="text-[var(--n600)]">
                <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.25" />
                <path d="M7 1V3M7 11V13M1 7H3M11 7H13M2.76 2.76L4.17 4.17M9.83 9.83L11.24 11.24M2.76 11.24L4.17 9.83M9.83 4.17L11.24 2.76" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
AppSidebarFooter.displayName = 'AppSidebar.Footer'

// ─── Export ───

export const AppSidebar = Object.assign(AppSidebarRoot, {
  Header: AppSidebarHeader,
  Search: AppSidebarSearch,
  Nav: AppSidebarNav,
  Item: AppSidebarItem,
  Section: AppSidebarSection,
  Separator: AppSidebarSeparator,
  Scroll: AppSidebarScroll,
  Footer: AppSidebarFooter,
})
