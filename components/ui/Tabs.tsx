'use client'

import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useId,
  forwardRef,
  type ReactNode,
} from 'react'
import {
  cn,
  FONT,
  WEIGHT,
  SIZE_HEIGHTS,
  SIZE_TEXT,
  SIZE_PADDING_X,
  BORDER,
  RADIUS,
  TRANSITION,
  FOCUS_RING,
  HOVER_SAND,
  ACTIVE_SAND,
  ACTIVE_UNDERLINE,
} from '@/lib/ui'

// ─── Context ───

interface TabsContextValue {
  activeValue: string
  onChange: (value: string) => void
  variant: 'underline' | 'pill' | 'default'
  baseId: string
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabs() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs compound components must be used within <Tabs>')
  return ctx
}

// ─── Root ───

interface TabsProps {
  value: string
  onChange: (value: string) => void
  variant?: 'underline' | 'pill' | 'default'
  children: ReactNode
  className?: string
}

const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(
  ({ value, onChange, variant = 'underline', children, className }, ref) => {
    const baseId = useId()

    return (
      <TabsContext.Provider value={{ activeValue: value, onChange, variant, baseId }}>
        <div ref={ref} className={className}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  },
)
TabsRoot.displayName = 'Tabs'

// ─── List ───

function TabsList({ children, className }: { children: ReactNode; className?: string }) {
  const { variant } = useTabs()
  const tabsRef = useRef<HTMLButtonElement[]>([])

  // Reset refs each render
  tabsRef.current = []

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const tabs = tabsRef.current
      if (!tabs.length) return

      const currentIndex = tabs.findIndex((t) => t === document.activeElement)
      if (currentIndex === -1) return

      let nextIndex = currentIndex

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown': {
          e.preventDefault()
          nextIndex = (currentIndex + 1) % tabs.length
          break
        }
        case 'ArrowLeft':
        case 'ArrowUp': {
          e.preventDefault()
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
          break
        }
        case 'Home': {
          e.preventDefault()
          nextIndex = 0
          break
        }
        case 'End': {
          e.preventDefault()
          nextIndex = tabs.length - 1
          break
        }
        default:
          return
      }

      tabs[nextIndex]?.focus()
      // Automatic activation: moving focus activates the tab
      tabs[nextIndex]?.click()
    },
    [],
  )

  return (
    <TabListContext.Provider value={{ tabsRef }}>
      <div
        role="tablist"
        onKeyDown={handleKeyDown}
        className={cn(
          'inline-flex',
          variant === 'underline' && 'gap-1 border-b-[0.5px] border-b-[var(--n200)]',
          variant === 'pill' && 'gap-1',
          variant === 'default' && cn('overflow-hidden', BORDER.default, RADIUS.md),
          className,
        )}
      >
        {children}
      </div>
    </TabListContext.Provider>
  )
}
TabsList.displayName = 'Tabs.List'

// Internal context for tab registration
const TabListContext = createContext<{ tabsRef: React.MutableRefObject<HTMLButtonElement[]> } | null>(null)

// ─── Tab ───

interface TabsTabProps {
  value: string
  children: ReactNode
  disabled?: boolean
  className?: string
}

function TabsTab({ value, children, disabled = false, className }: TabsTabProps) {
  const { activeValue, onChange, variant, baseId } = useTabs()
  const listCtx = useContext(TabListContext)
  const isActive = activeValue === value

  // ─── Underline variant ───
  if (variant === 'underline') {
    return (
      <button
        ref={(el) => {
          if (el && listCtx) listCtx.tabsRef.current.push(el)
        }}
        role="tab"
        id={`${baseId}-tab-${value}`}
        aria-selected={isActive}
        aria-controls={`${baseId}-panel-${value}`}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        onClick={() => onChange(value)}
        className={cn(
          FONT.body,
          SIZE_HEIGHTS.md,
          SIZE_TEXT.md,
          SIZE_PADDING_X.sm,
          TRANSITION.colors,
          FOCUS_RING,
          'inline-flex items-center justify-center',
          isActive
            ? cn(WEIGHT.strong, 'text-[var(--n1150)]', ACTIVE_UNDERLINE)
            : cn(WEIGHT.normal, 'text-[var(--n600)] hover:text-[var(--n1150)]', 'border-b-2 border-transparent'),
          disabled && 'opacity-40 pointer-events-none',
          className,
        )}
      >
        {children}
      </button>
    )
  }

  // ─── Pill variant ───
  if (variant === 'pill') {
    return (
      <button
        ref={(el) => {
          if (el && listCtx) listCtx.tabsRef.current.push(el)
        }}
        role="tab"
        id={`${baseId}-tab-${value}`}
        aria-selected={isActive}
        aria-controls={`${baseId}-panel-${value}`}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        onClick={() => onChange(value)}
        className={cn(
          FONT.body,
          SIZE_HEIGHTS.md,
          SIZE_TEXT.md,
          SIZE_PADDING_X.sm,
          RADIUS.md,
          BORDER.default,
          TRANSITION.background,
          FOCUS_RING,
          'inline-flex items-center justify-center',
          isActive
            ? cn(WEIGHT.strong, 'text-[var(--n1150)]', ACTIVE_SAND)
            : cn(WEIGHT.normal, 'text-[var(--n800)] bg-transparent', HOVER_SAND),
          disabled && 'opacity-40 pointer-events-none',
          className,
        )}
      >
        {children}
      </button>
    )
  }

  // ─── Default connected variant ───
  return (
    <button
      ref={(el) => {
        if (el && listCtx) listCtx.tabsRef.current.push(el)
      }}
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={isActive}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => onChange(value)}
      className={cn(
        FONT.body,
        SIZE_HEIGHTS.md,
        SIZE_TEXT.md,
        SIZE_PADDING_X.sm,
        TRANSITION.background,
        FOCUS_RING,
        'inline-flex items-center justify-center',
        'border-r-[0.5px] border-r-[var(--n400)] last:border-r-0',
        isActive
          ? cn(WEIGHT.strong, 'text-[var(--n1150)]', ACTIVE_SAND)
          : cn(WEIGHT.normal, 'text-[var(--n800)]', HOVER_SAND),
        disabled && 'opacity-40 pointer-events-none',
        className,
      )}
    >
      {children}
    </button>
  )
}
TabsTab.displayName = 'Tabs.Tab'

// ─── Panel ───

interface TabsPanelProps {
  value: string
  children: ReactNode
  className?: string
}

function TabsPanel({ value, children, className }: TabsPanelProps) {
  const { activeValue, baseId } = useTabs()

  if (activeValue !== value) return null

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      className={cn('mt-3', className)}
    >
      {children}
    </div>
  )
}
TabsPanel.displayName = 'Tabs.Panel'

// ─── Export ───

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
})
