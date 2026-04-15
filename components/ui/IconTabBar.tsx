// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useRef, useCallback, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, RADIUS, TRANSITION, HOVER_SAND, FOCUS_RING, ICON_TAB_SIZE } from '@/lib/ui'

export interface IconTabBarItem {
  id: string
  label: string
  icon: ReactNode
}

export interface IconTabBarProps {
  tabs: IconTabBarItem[]
  activeTab: string
  onTabChange: (id: string) => void
  className?: string
}

const IconTabBar = forwardRef<HTMLDivElement, IconTabBarProps>(
  function IconTabBar({ tabs, activeTab, onTabChange, className }, ref) {
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

    const handleKeyDown = useCallback((e: React.KeyboardEvent, currentIndex: number) => {
      let nextIndex = currentIndex
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          nextIndex = (currentIndex + 1) % tabs.length
          break
        case 'ArrowUp':
          e.preventDefault()
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
          break
        case 'Home':
          e.preventDefault()
          nextIndex = 0
          break
        case 'End':
          e.preventDefault()
          nextIndex = tabs.length - 1
          break
        default:
          return
      }
      itemRefs.current[nextIndex]?.focus()
      onTabChange(tabs[nextIndex].id)
    }, [tabs, onTabChange])

    const activeIndex = tabs.findIndex(t => t.id === activeTab)
    const focusableIndex = activeIndex >= 0 ? activeIndex : 0

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation="vertical"
        aria-label="Panel navigation"
        className={cn('flex flex-col', className)}
      >
        {tabs.map((tab, i) => {
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              ref={(el) => { itemRefs.current[i] = el }}
              role="tab"
              aria-selected={isActive}
              tabIndex={i === focusableIndex ? 0 : -1}
              onClick={() => onTabChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5',
                RADIUS.md,
                TRANSITION.background,
                FOCUS_RING,
                isActive
                  ? 'bg-[var(--n200)] text-[var(--n1150)]'
                  : cn('bg-transparent text-[var(--n800)]', HOVER_SAND),
              )}
              style={{ width: ICON_TAB_SIZE, height: ICON_TAB_SIZE }}
            >
              <span className={cn('flex items-center justify-center', isActive && 'text-[var(--n1150)]')} style={{ width: 24, height: 24 }}>
                {tab.icon}
              </span>
              <span className={cn(FONT.body, 'text-[9px]', isActive ? WEIGHT.strong : WEIGHT.book)}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    )
  }
)

IconTabBar.displayName = 'IconTabBar'
export { IconTabBar }
