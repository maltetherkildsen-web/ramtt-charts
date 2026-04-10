// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  forwardRef,
  type ReactNode,
} from 'react'
import { cn, BORDER } from '@/lib/ui'

// ─── Context ───

interface HoverCardContextValue {
  open: boolean
  setOpen: (v: boolean) => void
  openDelay: number
  closeDelay: number
  openTimerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
  closeTimerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
}

const HoverCardContext = createContext<HoverCardContextValue | null>(null)

function useHoverCard() {
  const ctx = useContext(HoverCardContext)
  if (!ctx) throw new Error('HoverCard compound components must be used within <HoverCard>')
  return ctx
}

// ─── Root ───

interface HoverCardProps {
  openDelay?: number
  closeDelay?: number
  children: ReactNode
  className?: string
}

const HoverCardRoot = forwardRef<HTMLDivElement, HoverCardProps>(
  ({ openDelay = 300, closeDelay = 200, children, className }, ref) => {
    const [open, setOpen] = useState(false)
    const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    return (
      <HoverCardContext.Provider
        value={{ open, setOpen, openDelay, closeDelay, openTimerRef, closeTimerRef }}
      >
        <div ref={ref} className={cn('relative inline-block', className)}>
          {children}
        </div>
      </HoverCardContext.Provider>
    )
  },
)
HoverCardRoot.displayName = 'HoverCard'

// ─── Trigger ───

function HoverCardTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const { setOpen, openDelay, closeDelay, openTimerRef, closeTimerRef } = useHoverCard()

  const handleEnter = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    openTimerRef.current = setTimeout(() => setOpen(true), openDelay)
  }, [setOpen, openDelay, openTimerRef, closeTimerRef])

  const handleLeave = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current)
      openTimerRef.current = null
    }
    closeTimerRef.current = setTimeout(() => setOpen(false), closeDelay)
  }, [setOpen, closeDelay, openTimerRef, closeTimerRef])

  return (
    <span
      className={className}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
    </span>
  )
}
HoverCardTrigger.displayName = 'HoverCard.Trigger'

// ─── Content ───

interface HoverCardContentProps {
  side?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
  className?: string
  children: ReactNode
}

const SIDE_CLASSES = {
  top: 'bottom-full mb-1.5',
  bottom: 'top-full mt-1.5',
  left: 'right-full mr-1.5',
  right: 'left-full ml-1.5',
} as const

const ALIGN_CLASSES_H = {
  start: 'left-0',
  center: 'left-1/2 -translate-x-1/2',
  end: 'right-0',
} as const

const ALIGN_CLASSES_V = {
  start: 'top-0',
  center: 'top-1/2 -translate-y-1/2',
  end: 'bottom-0',
} as const

function HoverCardContent({ side = 'bottom', align = 'center', className, children }: HoverCardContentProps) {
  const { open, setOpen, closeDelay, openTimerRef, closeTimerRef } = useHoverCard()

  const handleEnter = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [closeTimerRef])

  const handleLeave = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current)
      openTimerRef.current = null
    }
    closeTimerRef.current = setTimeout(() => setOpen(false), closeDelay)
  }, [setOpen, closeDelay, openTimerRef, closeTimerRef])

  if (!open) return null

  const isVertical = side === 'top' || side === 'bottom'
  const alignClass = isVertical ? ALIGN_CLASSES_H[align] : ALIGN_CLASSES_V[align]

  return (
    <div
      className={cn(
        'absolute z-50',
        SIDE_CLASSES[side],
        alignClass,
        'bg-[var(--n50)]',
        BORDER.default,
        'rounded-[8px]',
        'min-w-[200px] max-w-[320px]',
        'animate-[ramtt-dropdown-enter_150ms_var(--ease-out-expo)]',
        className,
      )}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  )
}
HoverCardContent.displayName = 'HoverCard.Content'

// ─── Export ───

export const HoverCard = Object.assign(HoverCardRoot, {
  Trigger: HoverCardTrigger,
  Content: HoverCardContent,
})
