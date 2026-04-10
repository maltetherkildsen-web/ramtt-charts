// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  type ReactNode,
} from 'react'
import { cn, BORDER, TRANSITION, HOVER_SAND, DROPDOWN_ITEM, RADIUS } from '@/lib/ui'

// ─── Context ───

interface ContextMenuContextValue {
  open: boolean
  position: { x: number; y: number }
  openMenu: (x: number, y: number) => void
  closeMenu: () => void
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null)

function useContextMenu() {
  const ctx = useContext(ContextMenuContext)
  if (!ctx) throw new Error('ContextMenu compound components must be used within <ContextMenu>')
  return ctx
}

interface ContentContextValue {
  itemRefs: React.MutableRefObject<HTMLButtonElement[]>
  closeMenu: () => void
}

const ContentContext = createContext<ContentContextValue | null>(null)

// ─── Root ───

interface ContextMenuProps {
  children: ReactNode
  className?: string
}

const ContextMenuRoot = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ children, className }, ref) => {
    const [open, setOpen] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const openMenu = useCallback((x: number, y: number) => {
      setPosition({ x, y })
      setOpen(true)
    }, [])

    const closeMenu = useCallback(() => setOpen(false), [])

    // Close on outside click
    useEffect(() => {
      if (!open) return
      function handlePointerDown() {
        setOpen(false)
      }
      // Delay to avoid closing immediately from the right-click event
      const timer = setTimeout(() => {
        document.addEventListener('pointerdown', handlePointerDown)
      }, 0)
      return () => {
        clearTimeout(timer)
        document.removeEventListener('pointerdown', handlePointerDown)
      }
    }, [open])

    // Close on Escape
    useEffect(() => {
      if (!open) return
      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape') setOpen(false)
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open])

    return (
      <ContextMenuContext.Provider value={{ open, position, openMenu, closeMenu }}>
        <div ref={ref} className={className}>
          {children}
        </div>
      </ContextMenuContext.Provider>
    )
  },
)
ContextMenuRoot.displayName = 'ContextMenu'

// ─── Trigger ───

function ContextMenuTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const { openMenu } = useContextMenu()

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      openMenu(e.clientX, e.clientY)
    },
    [openMenu],
  )

  return (
    <div className={className} onContextMenu={handleContextMenu}>
      {children}
    </div>
  )
}
ContextMenuTrigger.displayName = 'ContextMenu.Trigger'

// ─── Content ───

interface ContextMenuContentProps {
  className?: string
  children: ReactNode
}

function ContextMenuContent({ className, children }: ContextMenuContentProps) {
  const { open, position, closeMenu } = useContextMenu()
  const menuRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<HTMLButtonElement[]>([])
  const focusIndexRef = useRef(-1)

  // Reset item refs each render
  itemRefs.current = []

  // Viewport clamping + focus first item
  useEffect(() => {
    if (!open || !menuRef.current) return
    focusIndexRef.current = -1

    const menu = menuRef.current
    const rect = menu.getBoundingClientRect()

    let x = position.x
    let y = position.y

    if (x + rect.width > window.innerWidth - 8) {
      x = window.innerWidth - rect.width - 8
    }
    if (y + rect.height > window.innerHeight - 8) {
      y = window.innerHeight - rect.height - 8
    }
    if (x < 8) x = 8
    if (y < 8) y = 8

    menu.style.left = `${x}px`
    menu.style.top = `${y}px`
  }, [open, position])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const items = itemRefs.current
      if (!items.length) return

      let idx = focusIndexRef.current

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault()
          idx = idx < items.length - 1 ? idx + 1 : 0
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          idx = idx > 0 ? idx - 1 : items.length - 1
          break
        }
        case 'Home': {
          e.preventDefault()
          idx = 0
          break
        }
        case 'End': {
          e.preventDefault()
          idx = items.length - 1
          break
        }
        default:
          return
      }

      focusIndexRef.current = idx
      items[idx]?.focus()
    },
    [],
  )

  if (!open) return null

  return (
    <ContentContext.Provider value={{ itemRefs, closeMenu }}>
      <div
        ref={menuRef}
        role="menu"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onPointerDown={(e) => e.stopPropagation()}
        className={cn(
          'fixed z-50',
          'bg-[var(--n50)]',
          BORDER.default,
          'rounded-[8px]',
          'p-1 min-w-[180px] max-h-[320px] overflow-y-auto',
          'animate-[ramtt-dropdown-enter_120ms_var(--ease-out-expo)]',
          className,
        )}
        style={{ left: position.x, top: position.y }}
      >
        {children}
      </div>
    </ContentContext.Provider>
  )
}
ContextMenuContent.displayName = 'ContextMenu.Content'

// ─── Item ───

interface ContextMenuItemProps {
  children: ReactNode
  onClick?: () => void
  icon?: ReactNode
  variant?: 'default' | 'danger'
  disabled?: boolean
  className?: string
}

function ContextMenuItem({ children, onClick, icon, variant = 'default', disabled = false, className }: ContextMenuItemProps) {
  const ctx = useContext(ContentContext)
  const isDanger = variant === 'danger'

  return (
    <button
      ref={(el) => {
        if (el && ctx) ctx.itemRefs.current.push(el)
      }}
      role="menuitem"
      tabIndex={-1}
      disabled={disabled}
      onClick={() => {
        onClick?.()
        ctx?.closeMenu()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
          ctx?.closeMenu()
        }
      }}
      className={cn(
        'flex w-full items-center gap-2',
        DROPDOWN_ITEM,
        TRANSITION.background,
        HOVER_SAND,
        isDanger && 'text-[var(--negative)]',
        disabled && 'opacity-40 pointer-events-none',
        className,
      )}
    >
      {icon && (
        <span
          className={cn(
            'shrink-0 flex items-center justify-center',
            isDanger ? 'text-[var(--negative)]' : 'text-[var(--n600)]',
          )}
          style={{ width: 16, height: 16 }}
        >
          {icon}
        </span>
      )}
      {children}
    </button>
  )
}
ContextMenuItem.displayName = 'ContextMenu.Item'

// ─── Separator ───

function ContextMenuSeparator({ className }: { className?: string }) {
  return (
    <div
      role="separator"
      className={cn('h-px bg-[var(--n200)] my-1', className)}
    />
  )
}
ContextMenuSeparator.displayName = 'ContextMenu.Separator'

// ─── Shortcut ───

function ContextMenuShortcut({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('ml-auto pl-4 text-[11px] text-[var(--n600)] flex items-center gap-0.5', className)}>
      {children}
    </span>
  )
}
ContextMenuShortcut.displayName = 'ContextMenu.Shortcut'

// ─── Export ───

export const ContextMenu = Object.assign(ContextMenuRoot, {
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  Separator: ContextMenuSeparator,
  Shortcut: ContextMenuShortcut,
})
