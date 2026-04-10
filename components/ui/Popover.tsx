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
import { cn, BORDER, TRANSITION } from '@/lib/ui'

// ─── Context ───

interface PopoverContextValue {
  open: boolean
  setOpen: (v: boolean) => void
  triggerRef: React.RefObject<HTMLDivElement | null>
}

const PopoverContext = createContext<PopoverContextValue | null>(null)

function usePopover() {
  const ctx = useContext(PopoverContext)
  if (!ctx) throw new Error('Popover compound components must be used within <Popover>')
  return ctx
}

// ─── Root ───

interface PopoverProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
  className?: string
}

const PopoverRoot = forwardRef<HTMLDivElement, PopoverProps>(
  ({ open: controlledOpen, onOpenChange, children, className }, ref) => {
    const [internalOpen, setInternalOpen] = useState(false)
    const open = controlledOpen !== undefined ? controlledOpen : internalOpen
    const setOpen = useCallback(
      (v: boolean) => {
        if (onOpenChange) onOpenChange(v)
        else setInternalOpen(v)
      },
      [onOpenChange],
    )
    const triggerRef = useRef<HTMLDivElement>(null)
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
    }, [open, setOpen])

    // Close on Escape
    useEffect(() => {
      if (!open) return
      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
          setOpen(false)
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, setOpen])

    return (
      <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
        <div ref={containerRef} className={cn('relative inline-block', className)}>
          {children}
        </div>
      </PopoverContext.Provider>
    )
  },
)
PopoverRoot.displayName = 'Popover'

// ─── Trigger ───

function PopoverTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const { open, setOpen, triggerRef } = usePopover()

  return (
    <div
      ref={triggerRef}
      className={className}
      onClick={() => setOpen(!open)}
    >
      {children}
    </div>
  )
}
PopoverTrigger.displayName = 'Popover.Trigger'

// ─── Content ───

interface PopoverContentProps {
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'bottom'
  sideOffset?: number
  className?: string
  children: ReactNode
}

function PopoverContent({ align = 'center', side = 'bottom', sideOffset = 4, className, children }: PopoverContentProps) {
  const { open } = usePopover()

  if (!open) return null

  const alignClass =
    align === 'start' ? 'left-0' : align === 'end' ? 'right-0' : 'left-1/2 -translate-x-1/2'
  const sideClass = side === 'bottom' ? 'top-full' : 'bottom-full'

  return (
    <div
      className={cn(
        'absolute z-50',
        alignClass,
        sideClass,
        'bg-[var(--n50)]',
        BORDER.default,
        'rounded-[8px]',
        'min-w-[200px] max-h-[400px] overflow-y-auto',
        'animate-[ramtt-dropdown-enter_120ms_var(--ease-out-expo)]',
        className,
      )}
      style={{ [side === 'bottom' ? 'marginTop' : 'marginBottom']: sideOffset }}
    >
      {children}
    </div>
  )
}
PopoverContent.displayName = 'Popover.Content'

// ─── Export ───

export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
})
