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
import { cn, BORDER, TRANSITION, HOVER_SAND, DROPDOWN_ITEM } from '@/lib/ui'

// ─── Contexts ───

interface DropdownContextValue {
  open: boolean
  setOpen: (v: boolean) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

const DropdownContext = createContext<DropdownContextValue | null>(null)

function useDropdown() {
  const ctx = useContext(DropdownContext)
  if (!ctx) throw new Error('Dropdown compound components must be used within <Dropdown>')
  return ctx
}

interface ContentContextValue {
  itemRefs: React.MutableRefObject<HTMLButtonElement[]>
  closeMenu: () => void
}

const ContentContext = createContext<ContentContextValue | null>(null)

// ─── Root ───

interface DropdownProps {
  children: ReactNode
  className?: string
}

const DropdownRoot = forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, className }, ref) => {
    const [open, setOpen] = useState(false)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Close on outside click
    useEffect(() => {
      if (!open) return
      function handlePointerDown(e: PointerEvent) {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false)
        }
      }
      document.addEventListener('pointerdown', handlePointerDown)
      return () => document.removeEventListener('pointerdown', handlePointerDown)
    }, [open])

    // Close on Escape
    useEffect(() => {
      if (!open) return
      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
          setOpen(false)
          triggerRef.current?.focus()
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open])

    return (
      <DropdownContext.Provider value={{ open, setOpen, triggerRef }}>
        <div ref={containerRef} className={cn('relative inline-block', className)}>
          {children}
        </div>
      </DropdownContext.Provider>
    )
  },
)
DropdownRoot.displayName = 'Dropdown'

// ─── Trigger ───

function DropdownTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const { open, setOpen, triggerRef } = useDropdown()

  return (
    <div
      className={className}
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      aria-haspopup="menu"
      ref={(el) => {
        const btn = el?.querySelector('button') as HTMLButtonElement | null
        if (btn) {
          (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = btn
        }
      }}
    >
      {children}
    </div>
  )
}
DropdownTrigger.displayName = 'Dropdown.Trigger'

// ─── Content ───

interface DropdownContentProps {
  align?: 'start' | 'end'
  side?: 'bottom' | 'top'
  className?: string
  children: ReactNode
}

function DropdownContent({ align = 'start', side = 'bottom', className, children }: DropdownContentProps) {
  const { open, setOpen } = useDropdown()
  const menuRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<HTMLButtonElement[]>([])
  const focusIndexRef = useRef(-1)

  // Reset item refs each render
  itemRefs.current = []

  // Reset focus index when opened
  useEffect(() => {
    if (open) {
      focusIndexRef.current = -1
    }
  }, [open])

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
    <ContentContext.Provider value={{ itemRefs, closeMenu: () => setOpen(false) }}>
      <div
        ref={menuRef}
        role="menu"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={cn(
          'absolute z-50',
          align === 'start' ? 'left-0' : 'right-0',
          side === 'bottom' ? 'top-full mt-1' : 'bottom-full mb-1',
          'bg-[var(--n50)]',
          BORDER.default,
          'rounded-[8px]',
          'p-1 min-w-[180px] max-h-[320px] overflow-y-auto',
          'animate-[ramtt-dropdown-enter_120ms_var(--ease-out-expo)]',
          className,
        )}
      >
        {children}
      </div>
    </ContentContext.Provider>
  )
}
DropdownContent.displayName = 'Dropdown.Content'

// ─── Item ───

interface DropdownItemProps {
  children: ReactNode
  onClick?: () => void
  icon?: ReactNode
  variant?: 'default' | 'danger'
  disabled?: boolean
  className?: string
}

function DropdownItem({ children, onClick, icon, variant = 'default', disabled = false, className }: DropdownItemProps) {
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
DropdownItem.displayName = 'Dropdown.Item'

// ─── Separator ───

function DropdownSeparator({ className }: { className?: string }) {
  return (
    <div
      role="separator"
      className={cn('h-px bg-[var(--n200)] my-1', className)}
    />
  )
}
DropdownSeparator.displayName = 'Dropdown.Separator'

// ─── Export ───

export const Dropdown = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
  Separator: DropdownSeparator,
})
