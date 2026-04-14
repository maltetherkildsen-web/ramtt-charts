// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, Children, type ReactNode, type ButtonHTMLAttributes } from 'react'
import { cn, FONT, WEIGHT, TRANSITION, HOVER_SAND, ACTIVE_BLACK, FOCUS_RING } from '@/lib/ui'

// ─── Types ───

export interface ButtonGroupProps {
  children: ReactNode
  size?: 'sm' | 'md'
  className?: string
}

export interface ButtonGroupItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'default' | 'primary'
}

// ─── Size config ───

const SIZES = {
  sm: { height: 28, padding: 'px-2.5', text: 'text-[12px]' },
  md: { height: 32, padding: 'px-3.5', text: 'text-[13px]' },
} as const

// ─── Item ───

const ButtonGroupItem = forwardRef<HTMLButtonElement, ButtonGroupItemProps>(
  function ButtonGroupItem({ children, variant = 'default', className, ...props }, ref) {
    // Styling is applied by the parent via cloneElement — className is composed there.
    // This component provides the ref forwarding and base semantics.
    return (
      <button
        ref={ref}
        type="button"
        className={className}
        {...props}
      >
        {children}
      </button>
    )
  },
)
ButtonGroupItem.displayName = 'ButtonGroup.Item'

// ─── Root ───

const ButtonGroupRoot = forwardRef<HTMLDivElement, ButtonGroupProps>(
  function ButtonGroup({ children, size = 'md', className }, ref) {
    const config = SIZES[size]
    const items = Children.toArray(children)
    const count = items.length

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          'inline-flex border-[0.5px] border-[var(--n400)] rounded-[5px] overflow-hidden',
          className,
        )}
      >
        {items.map((child, i) => {
          // Type-check that child is a valid ReactElement
          if (!child || typeof child !== 'object' || !('props' in child)) return child

          const isFirst = i === 0
          const isLast = i === count - 1
          const itemProps = child.props as ButtonGroupItemProps
          const isPrimary = itemProps.variant === 'primary'

          const itemClassName = cn(
            FONT.body,
            config.text,
            config.padding,
            WEIGHT.book,
            TRANSITION.colors,
            FOCUS_RING,
            'inline-flex items-center justify-center gap-1.5',
            'disabled:pointer-events-none disabled:opacity-40',
            // Variant
            isPrimary
              ? cn(ACTIVE_BLACK, 'hover:opacity-90')
              : cn('bg-transparent text-[var(--n1050)]', HOVER_SAND),
            // Separator
            !isLast && 'border-r-[0.5px] border-r-[var(--n400)]',
            // Radius — only outer edges
            isFirst && !isLast && 'rounded-l-[4px]',
            isLast && !isFirst && 'rounded-r-[4px]',
            isFirst && isLast && 'rounded-[4px]',
            !isFirst && !isLast && 'rounded-none',
            // Merge with child's className
            itemProps.className,
          )

          // Clone element with computed styles
          const { className: _childClass, ...restProps } = itemProps
          return (
            <button
              key={i}
              type="button"
              className={itemClassName}
              style={{ height: config.height }}
              disabled={itemProps.disabled}
              onClick={itemProps.onClick}
            >
              {itemProps.children}
            </button>
          )
        })}
      </div>
    )
  },
)
ButtonGroupRoot.displayName = 'ButtonGroup'

// ─── Export ───

export const ButtonGroup = Object.assign(ButtonGroupRoot, {
  Item: ButtonGroupItem,
})
