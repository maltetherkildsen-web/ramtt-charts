// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import {
  createContext,
  useContext,
  useCallback,
  useId,
  forwardRef,
  type ReactNode,
} from 'react'
import { cn, FONT, WEIGHT, TRANSITION, FOCUS_RING } from '@/lib/ui'

// ─── Context ───

interface AccordionContextValue {
  openValues: Set<string>
  toggle: (value: string) => void
  type: 'single' | 'multiple'
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

function useAccordion() {
  const ctx = useContext(AccordionContext)
  if (!ctx) throw new Error('Accordion compound components must be used within <Accordion>')
  return ctx
}

// ─── Item context ───

interface ItemContextValue {
  value: string
  isOpen: boolean
  disabled: boolean
}

const ItemContext = createContext<ItemContextValue | null>(null)

function useItem() {
  const ctx = useContext(ItemContext)
  if (!ctx) throw new Error('Accordion.Trigger/Content must be used within <Accordion.Item>')
  return ctx
}

// ─── Root ───

interface AccordionProps {
  type?: 'single' | 'multiple'
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  children: ReactNode
  className?: string
}

const AccordionRoot = forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = 'single', value, onChange, children, className }, ref) => {
    const openValues = new Set(
      value === undefined
        ? []
        : typeof value === 'string'
          ? [value]
          : value,
    )

    const toggle = useCallback(
      (itemValue: string) => {
        if (!onChange) return

        if (type === 'single') {
          onChange(openValues.has(itemValue) ? '' : itemValue)
        } else {
          const next = new Set(openValues)
          if (next.has(itemValue)) {
            next.delete(itemValue)
          } else {
            next.add(itemValue)
          }
          onChange(Array.from(next))
        }
      },
      [type, onChange, openValues],
    )

    return (
      <AccordionContext.Provider value={{ openValues, toggle, type }}>
        <div ref={ref} className={className}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  },
)
AccordionRoot.displayName = 'Accordion'

// ─── Item ───

interface AccordionItemProps {
  value: string
  children: ReactNode
  disabled?: boolean
  className?: string
}

function AccordionItem({ value, children, disabled = false, className }: AccordionItemProps) {
  const { openValues } = useAccordion()
  const isOpen = openValues.has(value)

  return (
    <ItemContext.Provider value={{ value, isOpen, disabled }}>
      <div
        className={cn(
          'border-b-[0.5px] border-b-[var(--n200)]',
          className,
        )}
      >
        {children}
      </div>
    </ItemContext.Provider>
  )
}
AccordionItem.displayName = 'Accordion.Item'

// ─── Trigger ───

function AccordionTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const { toggle } = useAccordion()
  const { value, isOpen, disabled } = useItem()
  const baseId = useId()
  const triggerId = `${baseId}-trigger`
  const contentId = `${baseId}-content`

  return (
    <button
      id={triggerId}
      type="button"
      aria-expanded={isOpen}
      aria-controls={contentId}
      disabled={disabled}
      onClick={() => toggle(value)}
      className={cn(
        'flex w-full items-center justify-between',
        'py-3',
        FONT.body,
        'text-[14px]',
        WEIGHT.strong,
        'text-[var(--n1150)]',
        TRANSITION.colors,
        FOCUS_RING,
        disabled && 'opacity-50 pointer-events-none',
        className,
      )}
    >
      <span>{children}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className={cn(
          'shrink-0 text-[var(--n600)]',
          'transition-transform duration-150',
        )}
        style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transitionTimingFunction: 'var(--ease-out-expo)',
        }}
      >
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
AccordionTrigger.displayName = 'Accordion.Trigger'

// ─── Content ───

function AccordionContent({ children, className }: { children: ReactNode; className?: string }) {
  const { isOpen } = useItem()

  return (
    <div
      className="ramtt-accordion-content"
      data-open={isOpen || undefined}
      role="region"
    >
      <div>
        <div className={cn('pb-3', className)}>
          {children}
        </div>
      </div>
    </div>
  )
}
AccordionContent.displayName = 'Accordion.Content'

// ─── Export ───

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
})
