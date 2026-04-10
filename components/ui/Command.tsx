// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  forwardRef,
  type ReactNode,
} from 'react'
import { cn, FONT, WEIGHT, RADIUS, BORDER, TRANSITION, HOVER_SAND, FOCUS_RING } from '@/lib/ui'

// ─── Context ───

interface CommandContextValue {
  query: string
  setQuery: (q: string) => void
  focusIndex: number
  setFocusIndex: (i: number) => void
  visibleItems: React.MutableRefObject<HTMLButtonElement[]>
}

const CommandContext = createContext<CommandContextValue | null>(null)

function useCommand() {
  const ctx = useContext(CommandContext)
  if (!ctx) throw new Error('Command compound components must be used within <Command>')
  return ctx
}

// ─── Root ───

interface CommandProps {
  children: ReactNode
  className?: string
}

const CommandRoot = forwardRef<HTMLDivElement, CommandProps>(
  ({ children, className }, ref) => {
    const [query, setQuery] = useState('')
    const [focusIndex, setFocusIndex] = useState(0)
    const visibleItems = useRef<HTMLButtonElement[]>([])

    // Reset visible items each render
    visibleItems.current = []

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        const items = visibleItems.current
        if (!items.length) return

        switch (e.key) {
          case 'ArrowDown': {
            e.preventDefault()
            const next = focusIndex < items.length - 1 ? focusIndex + 1 : 0
            setFocusIndex(next)
            items[next]?.scrollIntoView({ block: 'nearest' })
            break
          }
          case 'ArrowUp': {
            e.preventDefault()
            const prev = focusIndex > 0 ? focusIndex - 1 : items.length - 1
            setFocusIndex(prev)
            items[prev]?.scrollIntoView({ block: 'nearest' })
            break
          }
          case 'Enter': {
            e.preventDefault()
            items[focusIndex]?.click()
            break
          }
        }
      },
      [focusIndex],
    )

    // Reset focus when query changes
    useEffect(() => {
      setFocusIndex(0)
    }, [query])

    return (
      <CommandContext.Provider value={{ query, setQuery, focusIndex, setFocusIndex, visibleItems }}>
        <div ref={ref} onKeyDown={handleKeyDown} className={cn('flex flex-col', className)}>
          {children}
        </div>
      </CommandContext.Provider>
    )
  },
)
CommandRoot.displayName = 'Command'

// ─── Input ───

interface CommandInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}

function CommandInput({ placeholder = 'Type a command or search...', value, onChange, className }: CommandInputProps) {
  const { query, setQuery } = useCommand()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className={cn('border-b-[0.5px] border-b-[var(--n200)] px-3 py-2', className)}>
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[var(--n600)]">
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.25" />
          <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={value !== undefined ? value : query}
          onChange={(e) => {
            setQuery(e.target.value)
            onChange?.(e.target.value)
          }}
          placeholder={placeholder}
          className={cn(
            'flex-1 bg-transparent outline-none',
            FONT.body,
            'text-[14px]',
            WEIGHT.normal,
            'text-[var(--n1150)]',
            'placeholder:text-[var(--n600)]',
          )}
        />
      </div>
    </div>
  )
}
CommandInput.displayName = 'Command.Input'

// ─── List ───

function CommandList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('max-h-[300px] overflow-y-auto p-1', className)}>
      {children}
    </div>
  )
}
CommandList.displayName = 'Command.List'

// ─── Group ───

interface CommandGroupProps {
  heading?: string
  children: ReactNode
  className?: string
}

function CommandGroup({ heading, children, className }: CommandGroupProps) {
  return (
    <div className={className}>
      {heading && (
        <div className={cn(FONT.body, 'text-[11px]', WEIGHT.strong, 'text-[var(--n600)] px-2.5 py-1.5')}>
          {heading}
        </div>
      )}
      {children}
    </div>
  )
}
CommandGroup.displayName = 'Command.Group'

// ─── Item ───

interface CommandItemProps {
  onSelect: () => void
  icon?: ReactNode
  keywords?: string
  children: ReactNode
  disabled?: boolean
  className?: string
}

function CommandItem({ onSelect, icon, keywords, children, disabled = false, className }: CommandItemProps) {
  const { query, visibleItems, focusIndex } = useCommand()
  const itemRef = useRef<HTMLButtonElement>(null)

  // Check if this item matches the query
  const textContent = typeof children === 'string' ? children : ''
  const searchable = `${textContent} ${keywords ?? ''}`.toLowerCase()
  const matches = !query || searchable.includes(query.toLowerCase())

  // Register in visible items
  useEffect(() => {
    if (matches && itemRef.current) {
      visibleItems.current.push(itemRef.current)
    }
  })

  if (!matches) return null

  const idx = visibleItems.current.indexOf(itemRef.current!)
  const isFocused = idx === focusIndex

  return (
    <button
      ref={itemRef}
      type="button"
      onClick={onSelect}
      disabled={disabled}
      data-focused={isFocused || undefined}
      className={cn(
        'flex w-full items-center gap-2 px-2.5 py-2',
        'rounded-[6px]',
        FONT.body,
        'text-[13px]',
        WEIGHT.normal,
        'text-[var(--n1150)]',
        TRANSITION.background,
        HOVER_SAND,
        isFocused && 'bg-[var(--n200)] border-l-2 border-l-[var(--n1150)]',
        disabled && 'opacity-40 pointer-events-none',
        className,
      )}
    >
      {icon && (
        <span className="shrink-0 flex items-center justify-center text-[var(--n600)]" style={{ width: 16, height: 16 }}>
          {icon}
        </span>
      )}
      <span className="flex-1 text-left">{children}</span>
    </button>
  )
}
CommandItem.displayName = 'Command.Item'

// ─── Shortcut ───

function CommandShortcut({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.normal, 'text-[var(--n600)] ml-auto flex gap-0.5', className)}>
      {children}
    </span>
  )
}
CommandShortcut.displayName = 'Command.Shortcut'

// ─── Separator ───

function CommandSeparator({ className }: { className?: string }) {
  return <div className={cn('h-px bg-[var(--n200)] my-1', className)} />
}
CommandSeparator.displayName = 'Command.Separator'

// ─── Empty ───

function CommandEmpty({ children, className }: { children: ReactNode; className?: string }) {
  const { query, visibleItems } = useCommand()

  if (!query || visibleItems.current.length > 0) return null

  return (
    <div className={cn('py-6 text-center', FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n600)]', className)}>
      {children}
    </div>
  )
}
CommandEmpty.displayName = 'Command.Empty'

// ─── Export ───

export const Command = Object.assign(CommandRoot, {
  Input: CommandInput,
  List: CommandList,
  Group: CommandGroup,
  Item: CommandItem,
  Shortcut: CommandShortcut,
  Separator: CommandSeparator,
  Empty: CommandEmpty,
})
