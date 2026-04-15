// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  type ReactNode,
} from 'react'
import { cn, TRANSITION, FOCUS_RING } from '@/lib/ui'

// ─── Context ───

interface ResizableContextValue {
  direction: 'horizontal' | 'vertical'
  containerRef: React.RefObject<HTMLDivElement | null>
  panelRefs: React.MutableRefObject<HTMLDivElement[]>
  panelSizes: React.MutableRefObject<number[]>
  panelMins: React.MutableRefObject<number[]>
  panelMaxes: React.MutableRefObject<number[]>
  registerPanel: (el: HTMLDivElement, index: number, defaultSize: number, min: number, max: number) => void
}

const ResizableContext = createContext<ResizableContextValue | null>(null)

function useResizable() {
  const ctx = useContext(ResizableContext)
  if (!ctx) throw new Error('Resizable compound components must be used within <Resizable>')
  return ctx
}

// ─── Root ───

interface ResizableProps {
  direction: 'horizontal' | 'vertical'
  children: ReactNode
  className?: string
}

const ResizableRoot = forwardRef<HTMLDivElement, ResizableProps>(
  ({ direction, children, className }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const panelRefs = useRef<HTMLDivElement[]>([])
    const panelSizes = useRef<number[]>([])
    const panelMins = useRef<number[]>([])
    const panelMaxes = useRef<number[]>([])

    const registerPanel = useCallback(
      (el: HTMLDivElement, index: number, defaultSize: number, min: number, max: number) => {
        panelRefs.current[index] = el
        panelSizes.current[index] = defaultSize
        panelMins.current[index] = min
        panelMaxes.current[index] = max
        el.style.flexBasis = `${defaultSize}%`
      },
      [],
    )

    return (
      <ResizableContext.Provider
        value={{ direction, containerRef, panelRefs, panelSizes, panelMins, panelMaxes, registerPanel }}
      >
        <div
          ref={(el) => {
            (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el
            if (typeof ref === 'function') ref(el)
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el
          }}
          className={cn(
            'flex w-full h-full',
            direction === 'vertical' ? 'flex-col' : 'flex-row',
            className,
          )}
        >
          {children}
        </div>
      </ResizableContext.Provider>
    )
  },
)
ResizableRoot.displayName = 'Resizable'

// ─── Panel ───

interface ResizablePanelProps {
  defaultSize: number
  minSize?: number
  maxSize?: number
  children: ReactNode
  className?: string
}

let panelCounter = 0

function ResizablePanel({
  defaultSize,
  minSize = 10,
  maxSize = 90,
  children,
  className,
}: ResizablePanelProps) {
  const { registerPanel } = useResizable()
  const indexRef = useRef(-1)
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (indexRef.current === -1) {
      indexRef.current = panelCounter++
    }
    if (elRef.current) {
      registerPanel(elRef.current, indexRef.current, defaultSize, minSize, maxSize)
    }
    // Reset counter when component unmounts fully (page nav)
    return () => { panelCounter = 0 }
  // Only register once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={elRef}
      className={cn('overflow-hidden shrink-0 grow-0', className)}
      style={{ flexBasis: `${defaultSize}%` }}
    >
      {children}
    </div>
  )
}
ResizablePanel.displayName = 'Resizable.Panel'

// ─── Handle ───

interface ResizableHandleProps {
  className?: string
}

function ResizableHandle({ className }: ResizableHandleProps) {
  const { direction, containerRef, panelRefs, panelSizes, panelMins, panelMaxes } = useResizable()
  const handleRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef(-1)

  // Determine which pair of panels this handle sits between
  useEffect(() => {
    if (!handleRef.current || !containerRef.current) return
    const children = Array.from(containerRef.current.children)
    const handleIdx = children.indexOf(handleRef.current)
    // Handle sits between panel at floor(handleIdx/2) and ceil(handleIdx/2)
    // But panels and handles alternate: P H P H P
    // So handle at index 1 is between panels 0 and 1, handle at index 3 between 1 and 2
    indexRef.current = Math.floor(handleIdx / 2)
  }, [containerRef])

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault()
      const handleEl = handleRef.current
      if (!handleEl) return

      const idx = indexRef.current
      const panelA = panelRefs.current[idx]
      const panelB = panelRefs.current[idx + 1]
      if (!panelA || !panelB) return

      const container = containerRef.current
      if (!container) return

      const isH = direction === 'horizontal'
      const containerSize = isH ? container.offsetWidth : container.offsetHeight
      const startPos = isH ? e.clientX : e.clientY
      const startSizeA = panelSizes.current[idx]
      const startSizeB = panelSizes.current[idx + 1]

      handleEl.dataset.dragging = 'true'

      const onMove = (ev: PointerEvent) => {
        const delta = isH ? ev.clientX - startPos : ev.clientY - startPos
        const deltaPct = (delta / containerSize) * 100

        let newA = startSizeA + deltaPct
        let newB = startSizeB - deltaPct

        // Clamp to min/max
        const minA = panelMins.current[idx]
        const maxA = panelMaxes.current[idx]
        const minB = panelMins.current[idx + 1]
        const maxB = panelMaxes.current[idx + 1]

        if (newA < minA) { newB += newA - minA; newA = minA }
        if (newA > maxA) { newB += newA - maxA; newA = maxA }
        if (newB < minB) { newA += newB - minB; newB = minB }
        if (newB > maxB) { newA += newB - maxB; newB = maxB }

        panelSizes.current[idx] = newA
        panelSizes.current[idx + 1] = newB
        panelA.style.flexBasis = `${newA}%`
        panelB.style.flexBasis = `${newB}%`
      }

      const onUp = () => {
        handleEl.dataset.dragging = 'false'
        document.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerup', onUp)
      }

      document.addEventListener('pointermove', onMove)
      document.addEventListener('pointerup', onUp)
    },
    [direction, containerRef, panelRefs, panelSizes, panelMins, panelMaxes],
  )

  // Keyboard: arrow keys adjust by 1%
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const idx = indexRef.current
      const panelA = panelRefs.current[idx]
      const panelB = panelRefs.current[idx + 1]
      if (!panelA || !panelB) return

      const isH = direction === 'horizontal'
      let delta = 0

      if (isH && e.key === 'ArrowRight') delta = 1
      else if (isH && e.key === 'ArrowLeft') delta = -1
      else if (!isH && e.key === 'ArrowDown') delta = 1
      else if (!isH && e.key === 'ArrowUp') delta = -1
      else return

      e.preventDefault()

      let newA = panelSizes.current[idx] + delta
      let newB = panelSizes.current[idx + 1] - delta

      const minA = panelMins.current[idx]
      const maxA = panelMaxes.current[idx]
      const minB = panelMins.current[idx + 1]
      const maxB = panelMaxes.current[idx + 1]

      if (newA < minA || newA > maxA || newB < minB || newB > maxB) return

      panelSizes.current[idx] = newA
      panelSizes.current[idx + 1] = newB
      panelA.style.flexBasis = `${newA}%`
      panelB.style.flexBasis = `${newB}%`
    },
    [direction, panelRefs, panelSizes, panelMins, panelMaxes],
  )

  const isH = direction === 'horizontal'

  return (
    <div
      ref={handleRef}
      data-resize-handle
      role="separator"
      aria-orientation={isH ? 'vertical' : 'horizontal'}
      tabIndex={0}
      className={cn(
        'relative shrink-0 flex items-center justify-center group',
        isH ? 'w-2' : 'h-2',
        FOCUS_RING,
        className,
      )}
      style={{ touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
    >
      {/* Visible line */}
      <div
        className={cn(
          isH ? 'w-px h-full' : 'h-px w-full',
          'bg-[var(--n400)]',
          'group-hover:bg-[var(--n800)]',
          'group-[[data-dragging=true]]:bg-[var(--n1150)]',
          'transition-[background-color] duration-100',
        )}
      />
      {/* Grip dots */}
      <div
        className={cn(
          'absolute',
          isH ? 'flex flex-col gap-0.5' : 'flex gap-0.5',
        )}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'w-[3px] h-[3px] rounded-[30%]',
              'bg-[var(--n400)]',
              'group-hover:bg-[var(--n600)]',
            )}
          />
        ))}
      </div>
    </div>
  )
}
ResizableHandle.displayName = 'Resizable.Handle'

// ─── Export ───

export const Resizable = Object.assign(ResizableRoot, {
  Panel: ResizablePanel,
  Handle: ResizableHandle,
})
