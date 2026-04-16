// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * VirtualList — windowed rendering for large lists.
 *
 * Only renders visible items + overscan, dramatically reducing DOM nodes
 * for lists with 1000+ items.
 *
 * Uses ResizeObserver for container height detection.
 * Keyboard navigation: Arrow Up/Down scrolls by one item.
 */

import {
  forwardRef,
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/ui'

export interface VirtualListProps<T> {
  /** All items in the list. */
  items: readonly T[]
  /** Fixed height per item in px. */
  itemHeight: number
  /** Render function for a single item. */
  renderItem: (item: T, index: number) => ReactNode
  /** Number of extra items to render above/below viewport. Default: 5. */
  overscan?: number
  /** Container height in px. If not set, uses ResizeObserver on parent. */
  height?: number
  /** Item key extractor. Default: index. */
  getKey?: (item: T, index: number) => string | number
  className?: string
}

function VirtualListInner<T>(
  {
    items,
    itemHeight,
    renderItem,
    overscan = 5,
    height: heightProp,
    getKey,
    className,
  }: VirtualListProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState(heightProp ?? 400)
  const [scrollTop, setScrollTop] = useState(0)

  // Merge refs
  const setRef = useCallback(
    (el: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el
      if (typeof ref === 'function') ref(el)
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el
    },
    [ref],
  )

  // ResizeObserver for dynamic height
  useEffect(() => {
    if (heightProp !== undefined) {
      setContainerHeight(heightProp)
      return
    }
    const el = containerRef.current
    if (!el) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height)
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [heightProp])

  // Scroll handler
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const el = containerRef.current
      if (!el) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        el.scrollTop += itemHeight
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        el.scrollTop -= itemHeight
      } else if (e.key === 'Home') {
        e.preventDefault()
        el.scrollTop = 0
      } else if (e.key === 'End') {
        e.preventDefault()
        el.scrollTop = items.length * itemHeight
      }
    },
    [itemHeight, items.length],
  )

  // Compute visible range
  const { startIdx, endIdx, visibleItems } = useMemo(() => {
    const totalHeight = items.length * itemHeight
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
    const visibleCount = Math.ceil(containerHeight / itemHeight) + 2 * overscan
    const end = Math.min(items.length - 1, start + visibleCount)

    return {
      startIdx: start,
      endIdx: end,
      visibleItems: items.slice(start, end + 1),
      totalHeight,
    }
  }, [items, itemHeight, scrollTop, containerHeight, overscan])

  const totalHeight = items.length * itemHeight

  return (
    <div
      ref={setRef}
      className={cn('overflow-auto', className)}
      style={heightProp !== undefined ? { height: heightProp } : undefined}
      onScroll={handleScroll}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="list"
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map((item, i) => {
          const idx = startIdx + i
          const key = getKey ? getKey(item, idx) : idx
          return (
            <div
              key={key}
              role="listitem"
              style={{
                position: 'absolute',
                top: idx * itemHeight,
                left: 0,
                right: 0,
                height: itemHeight,
              }}
            >
              {renderItem(item, idx)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const VirtualList = forwardRef(VirtualListInner) as <T>(
  props: VirtualListProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement

;(VirtualList as any).displayName = 'VirtualList'
