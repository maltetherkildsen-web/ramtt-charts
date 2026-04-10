// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useId,
  forwardRef,
  type ReactNode,
} from 'react'
import { cn, FONT, WEIGHT, TRANSITION, FOCUS_RING } from '@/lib/ui'

// ─── Context ───

interface CollapsibleContextValue {
  open: boolean
  toggle: () => void
  triggerId: string
  contentId: string
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null)

function useCollapsible() {
  const ctx = useContext(CollapsibleContext)
  if (!ctx) throw new Error('Collapsible compound components must be used within <Collapsible>')
  return ctx
}

// ─── Root ───

interface CollapsibleProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
  className?: string
}

const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ open: controlledOpen, defaultOpen = false, onOpenChange, children, className }, ref) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : internalOpen
    const baseId = useId()

    const toggle = useCallback(() => {
      const next = !open
      if (onOpenChange) onOpenChange(next)
      if (!isControlled) setInternalOpen(next)
    }, [open, onOpenChange, isControlled])

    return (
      <CollapsibleContext.Provider
        value={{
          open,
          toggle,
          triggerId: `${baseId}-trigger`,
          contentId: `${baseId}-content`,
        }}
      >
        <div ref={ref} className={className}>
          {children}
        </div>
      </CollapsibleContext.Provider>
    )
  },
)
CollapsibleRoot.displayName = 'Collapsible'

// ─── Trigger ───

function CollapsibleTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const { open, toggle, triggerId, contentId } = useCollapsible()

  return (
    <button
      id={triggerId}
      type="button"
      aria-expanded={open}
      aria-controls={contentId}
      onClick={toggle}
      className={cn(
        'flex w-full items-center justify-between',
        'py-2',
        FONT.body,
        'text-[13px]',
        WEIGHT.strong,
        'text-[var(--n1150)]',
        TRANSITION.colors,
        FOCUS_RING,
        className,
      )}
    >
      <span>{children}</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className="shrink-0 text-[var(--n600)]"
        style={{
          transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 150ms var(--ease-out-expo)',
        }}
      >
        <path
          d="M5 3l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
CollapsibleTrigger.displayName = 'Collapsible.Trigger'

// ─── Content ───

function CollapsibleContent({ children, className }: { children: ReactNode; className?: string }) {
  const { open, triggerId, contentId } = useCollapsible()

  return (
    <div
      id={contentId}
      className="ramtt-accordion-content"
      data-open={open || undefined}
      role="region"
      aria-labelledby={triggerId}
    >
      <div>
        <div className={cn('pb-2', className)}>
          {children}
        </div>
      </div>
    </div>
  )
}
CollapsibleContent.displayName = 'Collapsible.Content'

// ─── Export ───

export const Collapsible = Object.assign(CollapsibleRoot, {
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
})
