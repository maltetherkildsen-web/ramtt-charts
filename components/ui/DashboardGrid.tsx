// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import {
  forwardRef,
  createContext,
  useContext,
  useRef,
  useEffect,
  useCallback,
  useState,
  type ReactNode,
} from 'react'
import { cn, RADIUS, TRANSITION, GRID_COLUMNS, GRID_ROW_HEIGHT, GRID_GAP } from '@/lib/ui'

// ─── Types ───

export interface GridLayout {
  id: string
  x: number
  y: number
  w: number
  h: number
  minW?: number
  minH?: number
}

export interface DashboardGridProps {
  layout: GridLayout[]
  onLayoutChange: (layout: GridLayout[]) => void
  columns?: number
  rowHeight?: number
  gap?: number
  children: ReactNode
  className?: string
}

export interface DashboardGridItemProps {
  id: string
  x: number
  y: number
  w: number
  h: number
  minW?: number
  minH?: number
  children: ReactNode
  className?: string
}

// ─── Context ───

interface GridContextValue {
  columns: number
  rowHeight: number
  gap: number
  gridRef: React.RefObject<HTMLDivElement | null>
  startDrag: (id: string, e: PointerEvent) => void
  startResize: (id: string, e: PointerEvent) => void
}

const GridContext = createContext<GridContextValue | null>(null)

function useGrid() {
  const ctx = useContext(GridContext)
  if (!ctx) throw new Error('DashboardGrid.Item must be used within <DashboardGrid>')
  return ctx
}

// ─── Collision resolution ───

function itemsOverlap(a: GridLayout, b: GridLayout): boolean {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
}

function resolveCollisions(layout: GridLayout[], moved: GridLayout): GridLayout[] {
  const result = layout.map((item) => ({ ...item }))
  const movedIdx = result.findIndex((it) => it.id === moved.id)
  if (movedIdx >= 0) {
    result[movedIdx] = { ...moved }
  }

  // Simple push-down algorithm: iterate until no collisions
  let changed = true
  let iterations = 0
  while (changed && iterations < 100) {
    changed = false
    iterations++
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        if (itemsOverlap(result[i], result[j])) {
          // Push the lower item (by y) further down
          const upper = result[i].y <= result[j].y ? result[i] : result[j]
          const lower = upper === result[i] ? result[j] : result[i]
          lower.y = upper.y + upper.h
          changed = true
        }
      }
    }
  }

  return result
}

// ─── Compact layout (remove vertical gaps) ───

function compactLayout(layout: GridLayout[], columns: number): GridLayout[] {
  const sorted = [...layout].sort((a, b) => a.y - b.y || a.x - b.x)

  for (const item of sorted) {
    // Move item up as far as possible
    while (item.y > 0) {
      item.y--
      const collision = sorted.some((other) => other.id !== item.id && itemsOverlap(item, other))
      if (collision) {
        item.y++
        break
      }
    }
  }

  return sorted
}

// ─── Resize grip SVG ───

function ResizeGrip() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M8 2l-6 6M8 5l-3 3M8 8l0 0" stroke="var(--n400)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

// ─── Grid Item ───

function DashboardGridItem({ id, x, y, w, h, minW = 3, minH = 1, children, className }: DashboardGridItemProps) {
  const { startDrag, startResize } = useGrid()
  const itemRef = useRef<HTMLDivElement>(null)

  // Listen for pointerdown on [data-drag-handle] descendant
  useEffect(() => {
    const el = itemRef.current
    if (!el) return

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement
      const handle = target.closest('[data-drag-handle]')
      if (handle && el.contains(handle)) {
        startDrag(id, e)
      }
    }

    el.addEventListener('pointerdown', handlePointerDown)
    return () => el.removeEventListener('pointerdown', handlePointerDown)
  }, [id, startDrag])

  return (
    <div
      ref={itemRef}
      data-grid-item={id}
      className={cn('relative', className)}
      style={{
        gridColumn: `${x + 1} / span ${w}`,
        gridRow: `${y + 1} / span ${h}`,
      }}
    >
      {children}

      {/* Resize handle */}
      <div
        data-resize-handle
        className="absolute bottom-1 right-1 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity duration-100"
        style={{
          width: 12,
          height: 12,
          cursor: 'nwse-resize',
          zIndex: 10,
        }}
        onPointerDown={(e) => {
          e.preventDefault()
          e.stopPropagation()
          startResize(id, e.nativeEvent)
        }}
      >
        <ResizeGrip />
      </div>
    </div>
  )
}
DashboardGridItem.displayName = 'DashboardGrid.Item'

// ─── Root ───

const DashboardGridRoot = forwardRef<HTMLDivElement, DashboardGridProps>(
  (
    {
      layout,
      onLayoutChange,
      columns = GRID_COLUMNS,
      rowHeight = GRID_ROW_HEIGHT,
      gap = GRID_GAP,
      children,
      className,
    },
    ref,
  ) => {
    const gridRef = useRef<HTMLDivElement>(null)
    const layoutRef = useRef(layout)
    const placeholderRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null)
    const [placeholder, setPlaceholder] = useState<{ x: number; y: number; w: number; h: number } | null>(null)
    const [dragId, setDragId] = useState<string | null>(null)
    const [isMobile, setIsMobile] = useState(false)

    // Keep refs in sync
    layoutRef.current = layout

    // Responsive: detect mobile
    useEffect(() => {
      const mq = window.matchMedia('(max-width: 768px)')
      setIsMobile(mq.matches)
      const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    }, [])

    // ── Grid cell calculation ──
    const getCellFromPointer = useCallback(
      (clientX: number, clientY: number) => {
        const grid = gridRef.current
        if (!grid) return { col: 0, row: 0 }
        const rect = grid.getBoundingClientRect()
        const cellW = (rect.width - (columns - 1) * gap) / columns
        const col = Math.max(0, Math.min(columns - 1, Math.floor((clientX - rect.left + grid.scrollLeft) / (cellW + gap))))
        const row = Math.max(0, Math.floor((clientY - rect.top + grid.scrollTop) / (rowHeight + gap)))
        return { col, row }
      },
      [columns, rowHeight, gap],
    )

    // ── Start drag ──
    const startDrag = useCallback(
      (id: string, e: PointerEvent) => {
        if (isMobile) return
        e.preventDefault()

        const item = layoutRef.current.find((l) => l.id === id)
        if (!item) return

        const gridEl = gridRef.current
        if (!gridEl) return

        // Find the item DOM element
        const itemEl = gridEl.querySelector<HTMLElement>(`[data-grid-item="${id}"]`)
        if (!itemEl) return

        // Create ghost
        const ghost = itemEl.cloneNode(true) as HTMLElement
        const rect = itemEl.getBoundingClientRect()
        ghost.style.position = 'fixed'
        ghost.style.left = `${rect.left}px`
        ghost.style.top = `${rect.top}px`
        ghost.style.width = `${rect.width}px`
        ghost.style.height = `${rect.height}px`
        ghost.style.opacity = '0.6'
        ghost.style.pointerEvents = 'none'
        ghost.style.zIndex = '9999'
        ghost.style.transition = 'none'
        ghost.removeAttribute('data-grid-item')
        document.body.appendChild(ghost)

        // Dim the original
        itemEl.style.opacity = '0.3'

        setDragId(id)
        setPlaceholder({ x: item.x, y: item.y, w: item.w, h: item.h })

        const offsetX = e.clientX - rect.left
        const offsetY = e.clientY - rect.top

        const onMove = (ev: PointerEvent) => {
          // Move ghost
          ghost.style.left = `${ev.clientX - offsetX}px`
          ghost.style.top = `${ev.clientY - offsetY}px`

          // Calculate grid position
          const { col, row } = getCellFromPointer(ev.clientX, ev.clientY)
          const newX = Math.min(col, columns - item.w)
          const newY = Math.max(0, row)

          setPlaceholder({ x: newX, y: newY, w: item.w, h: item.h })
        }

        const onUp = (ev: PointerEvent) => {
          document.removeEventListener('pointermove', onMove)
          document.removeEventListener('pointerup', onUp)

          // Remove ghost
          ghost.remove()
          itemEl.style.opacity = ''

          // Calculate final position
          const { col, row } = getCellFromPointer(ev.clientX, ev.clientY)
          const newX = Math.min(col, columns - item.w)
          const newY = Math.max(0, row)

          // Update layout
          const movedItem = { ...item, x: newX, y: newY }
          const newLayout = resolveCollisions(layoutRef.current, movedItem)
          const compacted = compactLayout(newLayout, columns)
          onLayoutChange(compacted)

          setDragId(null)
          setPlaceholder(null)
        }

        document.addEventListener('pointermove', onMove)
        document.addEventListener('pointerup', onUp)
      },
      [isMobile, columns, getCellFromPointer, onLayoutChange],
    )

    // ── Start resize ──
    const startResize = useCallback(
      (id: string, e: PointerEvent) => {
        if (isMobile) return
        e.preventDefault()

        const item = layoutRef.current.find((l) => l.id === id)
        if (!item) return

        const gridEl = gridRef.current
        if (!gridEl) return

        const gridRect = gridEl.getBoundingClientRect()
        const cellW = (gridRect.width - (columns - 1) * gap) / columns
        const minW = item.minW ?? 3
        const minH = item.minH ?? 1

        const initPh = { x: item.x, y: item.y, w: item.w, h: item.h }
        placeholderRef.current = initPh
        setDragId(id)
        setPlaceholder(initPh)

        const onMove = (ev: PointerEvent) => {
          const dx = ev.clientX - gridRect.left + gridEl.scrollLeft
          const dy = ev.clientY - gridRect.top + gridEl.scrollTop

          // Calculate new w/h based on pointer position relative to item start
          const itemStartX = item.x * (cellW + gap)
          const itemStartY = item.y * (rowHeight + gap)

          let newW = Math.max(minW, Math.round((dx - itemStartX) / (cellW + gap)))
          let newH = Math.max(minH, Math.round((dy - itemStartY) / (rowHeight + gap)))

          // Clamp to grid bounds
          newW = Math.min(newW, columns - item.x)
          newH = Math.max(1, newH)

          const ph = { x: item.x, y: item.y, w: newW, h: newH }
          placeholderRef.current = ph
          setPlaceholder(ph)
        }

        const onUp = () => {
          document.removeEventListener('pointermove', onMove)
          document.removeEventListener('pointerup', onUp)

          const ph = placeholderRef.current
          if (ph) {
            const resizedItem = { ...item, w: ph.w, h: ph.h }
            const newLayout = resolveCollisions(layoutRef.current, resizedItem)
            const compacted = compactLayout(newLayout, columns)
            onLayoutChange(compacted)
          }

          setDragId(null)
          setPlaceholder(null)
          placeholderRef.current = null
        }

        document.addEventListener('pointermove', onMove)
        document.addEventListener('pointerup', onUp)
      },
      [isMobile, columns, rowHeight, gap, onLayoutChange],
    )

    // Calculate max row for grid height
    const maxRow = layout.reduce((max, item) => Math.max(max, item.y + item.h), 0)

    // Mobile: stack everything
    const effectiveLayout = isMobile
      ? layout.map((item, i) => ({ ...item, x: 0, w: columns, y: i * 2, h: 2 }))
      : layout

    const ctx: GridContextValue = {
      columns,
      rowHeight,
      gap,
      gridRef,
      startDrag,
      startResize,
    }

    return (
      <GridContext.Provider value={ctx}>
        <div
          ref={(el) => {
            (gridRef as React.MutableRefObject<HTMLDivElement | null>).current = el
            if (typeof ref === 'function') ref(el)
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el
          }}
          className={cn('relative', className)}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridAutoRows: rowHeight,
            gap,
            minHeight: (maxRow || 1) * (rowHeight + gap),
          }}
        >
          {children}

          {/* Drop placeholder */}
          {placeholder && dragId && (
            <div
              className={cn(
                'bg-[var(--n200)]',
                'border-[1.5px] border-dashed border-[var(--n400)]',
                RADIUS.lg,
                'pointer-events-none',
              )}
              style={{
                gridColumn: `${placeholder.x + 1} / span ${placeholder.w}`,
                gridRow: `${placeholder.y + 1} / span ${placeholder.h}`,
                zIndex: 1,
              }}
            />
          )}
        </div>
      </GridContext.Provider>
    )
  },
)

DashboardGridRoot.displayName = 'DashboardGrid'

// ─── Export with compound ───

export const DashboardGrid = Object.assign(DashboardGridRoot, {
  Item: DashboardGridItem,
})
