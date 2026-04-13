// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useRef, useEffect, useCallback, type ReactNode } from 'react'
import { cn } from '@/lib/ui'

// ─── Constants ───

const SCROLLBAR_WIDTH = 6
const SCROLLBAR_THUMB_MIN = 30
const AUTO_HIDE_DELAY = 800

// ─── Types ───

export interface ScrollAreaProps {
  orientation?: 'vertical' | 'horizontal' | 'both'
  children: ReactNode
  className?: string
}

// ─── Component ───

const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ orientation = 'vertical', children, className }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const viewportRef = useRef<HTMLDivElement>(null)
    const vThumbRef = useRef<HTMLDivElement>(null)
    const hThumbRef = useRef<HTMLDivElement>(null)
    const vTrackRef = useRef<HTMLDivElement>(null)
    const hTrackRef = useRef<HTMLDivElement>(null)
    const hideTimerRef = useRef<ReturnType<typeof setTimeout>>(null)
    const isDraggingRef = useRef(false)
    const dragAxisRef = useRef<'v' | 'h'>('v')
    const dragStartRef = useRef(0)
    const scrollStartRef = useRef(0)
    const isHoveredRef = useRef(false)

    const showV = orientation === 'vertical' || orientation === 'both'
    const showH = orientation === 'horizontal' || orientation === 'both'

    // ── Show/hide scrollbar ──
    const setScrollbarVisible = useCallback((visible: boolean) => {
      if (vThumbRef.current) vThumbRef.current.style.opacity = visible ? '1' : '0'
      if (hThumbRef.current) hThumbRef.current.style.opacity = visible ? '1' : '0'
    }, [])

    const scheduleHide = useCallback(() => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      hideTimerRef.current = setTimeout(() => {
        if (!isDraggingRef.current && !isHoveredRef.current) {
          setScrollbarVisible(false)
        }
      }, AUTO_HIDE_DELAY)
    }, [setScrollbarVisible])

    // ── Update thumb position + size ──
    const updateThumbs = useCallback(() => {
      const vp = viewportRef.current
      if (!vp) return

      // Vertical
      if (showV && vThumbRef.current && vTrackRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = vp
        if (scrollHeight <= clientHeight) {
          vThumbRef.current.style.display = 'none'
        } else {
          vThumbRef.current.style.display = ''
          const trackH = vTrackRef.current.clientHeight
          const thumbH = Math.max(SCROLLBAR_THUMB_MIN, (clientHeight / scrollHeight) * trackH)
          const thumbTop = (scrollTop / (scrollHeight - clientHeight)) * (trackH - thumbH)
          vThumbRef.current.style.height = `${thumbH}px`
          vThumbRef.current.style.transform = `translateY(${thumbTop}px)`
        }
      }

      // Horizontal
      if (showH && hThumbRef.current && hTrackRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = vp
        if (scrollWidth <= clientWidth) {
          hThumbRef.current.style.display = 'none'
        } else {
          hThumbRef.current.style.display = ''
          const trackW = hTrackRef.current.clientWidth
          const thumbW = Math.max(SCROLLBAR_THUMB_MIN, (clientWidth / scrollWidth) * trackW)
          const thumbLeft = (scrollLeft / (scrollWidth - clientWidth)) * (trackW - thumbW)
          hThumbRef.current.style.width = `${thumbW}px`
          hThumbRef.current.style.transform = `translateX(${thumbLeft}px)`
        }
      }
    }, [showV, showH])

    // ── Scroll handler ──
    const onScroll = useCallback(() => {
      requestAnimationFrame(updateThumbs)
      setScrollbarVisible(true)
      scheduleHide()
    }, [updateThumbs, setScrollbarVisible, scheduleHide])

    // ── Drag handlers ──
    const onPointerDown = useCallback((axis: 'v' | 'h', e: React.PointerEvent) => {
      e.preventDefault()
      e.stopPropagation()
      isDraggingRef.current = true
      dragAxisRef.current = axis
      const vp = viewportRef.current
      if (!vp) return

      if (axis === 'v') {
        dragStartRef.current = e.clientY
        scrollStartRef.current = vp.scrollTop
      } else {
        dragStartRef.current = e.clientX
        scrollStartRef.current = vp.scrollLeft
      }

      const onMove = (ev: PointerEvent) => {
        const vp = viewportRef.current
        if (!vp) return
        requestAnimationFrame(() => {
          if (axis === 'v' && vTrackRef.current) {
            const delta = ev.clientY - dragStartRef.current
            const trackH = vTrackRef.current.clientHeight
            const thumbH = Math.max(SCROLLBAR_THUMB_MIN, (vp.clientHeight / vp.scrollHeight) * trackH)
            const scrollRange = vp.scrollHeight - vp.clientHeight
            const ratio = delta / (trackH - thumbH)
            vp.scrollTop = scrollStartRef.current + ratio * scrollRange
          } else if (axis === 'h' && hTrackRef.current) {
            const delta = ev.clientX - dragStartRef.current
            const trackW = hTrackRef.current.clientWidth
            const thumbW = Math.max(SCROLLBAR_THUMB_MIN, (vp.clientWidth / vp.scrollWidth) * trackW)
            const scrollRange = vp.scrollWidth - vp.clientWidth
            const ratio = delta / (trackW - thumbW)
            vp.scrollLeft = scrollStartRef.current + ratio * scrollRange
          }
        })
      }

      const onUp = () => {
        isDraggingRef.current = false
        document.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerup', onUp)
        scheduleHide()
      }

      document.addEventListener('pointermove', onMove)
      document.addEventListener('pointerup', onUp)
    }, [scheduleHide])

    // ── Track click (jump to position) ──
    const onTrackClick = useCallback((axis: 'v' | 'h', e: React.MouseEvent) => {
      const vp = viewportRef.current
      if (!vp) return
      // Don't handle if we clicked on thumb
      if ((e.target as HTMLElement).dataset.thumb) return

      if (axis === 'v' && vTrackRef.current) {
        const rect = vTrackRef.current.getBoundingClientRect()
        const ratio = (e.clientY - rect.top) / rect.height
        vp.scrollTop = ratio * (vp.scrollHeight - vp.clientHeight)
      } else if (axis === 'h' && hTrackRef.current) {
        const rect = hTrackRef.current.getBoundingClientRect()
        const ratio = (e.clientX - rect.left) / rect.width
        vp.scrollLeft = ratio * (vp.scrollWidth - vp.clientWidth)
      }
    }, [])

    // ── ResizeObserver ──
    useEffect(() => {
      const vp = viewportRef.current
      if (!vp) return

      const ro = new ResizeObserver(() => {
        requestAnimationFrame(updateThumbs)
      })
      ro.observe(vp)
      // Also observe first child if it exists
      if (vp.firstElementChild) ro.observe(vp.firstElementChild)

      // Initial calculation
      updateThumbs()

      return () => ro.disconnect()
    }, [updateThumbs])

    return (
      <div
        ref={containerRef}
        className={cn('relative overflow-hidden', className)}
        onMouseEnter={() => {
          isHoveredRef.current = true
          setScrollbarVisible(true)
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false
          scheduleHide()
        }}
      >
        {/* Viewport */}
        <div
          ref={viewportRef}
          className={cn(
            'ramtt-scroll-viewport',
            'h-full w-full',
            (showV && !showH) && 'overflow-y-auto overflow-x-hidden',
            (showH && !showV) && 'overflow-x-auto overflow-y-hidden',
            (showV && showH) && 'overflow-auto',
          )}
          onScroll={onScroll}
        >
          {children}
        </div>

        {/* Vertical scrollbar */}
        {showV && (
          <div
            ref={vTrackRef}
            className="absolute top-0 right-0 bottom-0 z-10"
            style={{ width: SCROLLBAR_WIDTH + 2, padding: 1 }}
            onClick={(e) => onTrackClick('v', e)}
          >
            <div
              ref={vThumbRef}
              data-thumb="true"
              className="w-full rounded-full opacity-0"
              style={{
                background: 'var(--n400)',
                transition: 'opacity 300ms, background-color 150ms',
                width: SCROLLBAR_WIDTH,
              }}
              onPointerDown={(e) => onPointerDown('v', e)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--n600)'
              }}
              onMouseLeave={(e) => {
                if (!isDraggingRef.current) {
                  (e.currentTarget as HTMLElement).style.background = 'var(--n400)'
                }
              }}
            />
          </div>
        )}

        {/* Horizontal scrollbar */}
        {showH && (
          <div
            ref={hTrackRef}
            className="absolute bottom-0 left-0 right-0 z-10"
            style={{ height: SCROLLBAR_WIDTH + 2, padding: 1 }}
            onClick={(e) => onTrackClick('h', e)}
          >
            <div
              ref={hThumbRef}
              data-thumb="true"
              className="h-full rounded-full opacity-0"
              style={{
                background: 'var(--n400)',
                transition: 'opacity 300ms, background-color 150ms',
                height: SCROLLBAR_WIDTH,
              }}
              onPointerDown={(e) => onPointerDown('h', e)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--n600)'
              }}
              onMouseLeave={(e) => {
                if (!isDraggingRef.current) {
                  (e.currentTarget as HTMLElement).style.background = 'var(--n400)'
                }
              }}
            />
          </div>
        )}
      </div>
    )
  },
)

ScrollArea.displayName = 'ScrollArea'
export { ScrollArea }
