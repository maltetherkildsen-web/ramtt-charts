// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import {
  createContext,
  useContext,
  forwardRef,
  type ReactNode,
} from 'react'
import { cn, FONT, WEIGHT, TRANSITION, HOVER_SAND, FOCUS_RING, SIDEBAR_WIDTH, SIDEBAR_ITEM_STYLE, SIDEBAR_ITEM_ACTIVE } from '@/lib/ui'

// ─── Context ───

interface SidebarContextValue {
  collapsed: boolean
}

const SidebarContext = createContext<SidebarContextValue>({ collapsed: false })

function useSidebar() {
  return useContext(SidebarContext)
}

// ─── Root ───

interface SidebarProps {
  children: ReactNode
  collapsed?: boolean
  className?: string
}

const SidebarRoot = forwardRef<HTMLElement, SidebarProps>(
  ({ children, collapsed = false, className }, ref) => {
    return (
      <SidebarContext.Provider value={{ collapsed }}>
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
      </SidebarContext.Provider>
    )
  },
)
SidebarRoot.displayName = 'Sidebar'

// ─── Logo ───

function SidebarLogo({ children, className }: { children: ReactNode; className?: string }) {
  const { collapsed } = useSidebar()

  return (
    <div className={cn('px-3 py-4 shrink-0', collapsed && 'flex justify-center px-0', className)}>
      {children}
    </div>
  )
}
SidebarLogo.displayName = 'Sidebar.Logo'

// ─── Nav ───

function SidebarNav({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <nav className={cn('flex flex-col gap-0.5 px-2', className)}>
      {children}
    </nav>
  )
}
SidebarNav.displayName = 'Sidebar.Nav'

// ─── Item ───

interface SidebarItemProps {
  href?: string
  icon?: ReactNode
  active?: boolean
  children: ReactNode
  onClick?: () => void
  className?: string
}

function SidebarItem({ href, icon, active = false, children, onClick, className }: SidebarItemProps) {
  const { collapsed } = useSidebar()
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
          style={{ width: 20, height: 20 }}
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
SidebarItem.displayName = 'Sidebar.Item'

// ─── Separator ───

function SidebarSeparator({ className }: { className?: string }) {
  return <div className={cn('h-px bg-[var(--n200)] mx-3 my-2', className)} />
}
SidebarSeparator.displayName = 'Sidebar.Separator'

// ─── Footer ───

function SidebarFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('mt-auto px-2 pb-3', className)}>
      {children}
    </div>
  )
}
SidebarFooter.displayName = 'Sidebar.Footer'

// ─── Export ───

export const Sidebar = Object.assign(SidebarRoot, {
  Logo: SidebarLogo,
  Nav: SidebarNav,
  Item: SidebarItem,
  Separator: SidebarSeparator,
  Footer: SidebarFooter,
})
