// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import {
  forwardRef,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import {
  cn,
  FONT,
  WEIGHT,
  RADIUS,
  BORDER,
  TRANSITION,
  HOVER_SAND,
  FOCUS_RING,
  FOCUS_WITHIN_RING,
} from '@/lib/ui'

// ─── Types ───

export interface ChatInputProps {
  children: ReactNode
  className?: string
}

export interface ChatInputTextAreaProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSubmit?: () => void
  rows?: number
  maxRows?: number
  className?: string
}

export interface ChatInputActionBarProps {
  children: ReactNode
  className?: string
}

export interface ChatInputActionProps {
  icon?: ReactNode
  label: string
  showLabel?: boolean
  onClick?: () => void
  active?: boolean
  side?: 'left' | 'right'
  className?: string
}

// ─── Constants ───

const LINE_HEIGHT = 20
const ACTION_HEIGHT = 28

// ─── ChatInput.TextArea ───

const TextArea = forwardRef<HTMLTextAreaElement, ChatInputTextAreaProps>(
  function ChatInputTextArea(
    { placeholder = 'Reply...', value, onChange, onSubmit, rows = 1, maxRows = 6, className },
    forwardedRef,
  ) {
    const internalRef = useRef<HTMLTextAreaElement | null>(null)

    const setRefs = useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node
        if (typeof forwardedRef === 'function') forwardedRef(node)
        else if (forwardedRef) forwardedRef.current = node
      },
      [forwardedRef],
    )

    const adjustHeight = useCallback(() => {
      const el = internalRef.current
      if (!el) return
      el.style.height = 'auto'
      const minH = rows * LINE_HEIGHT
      const maxH = maxRows * LINE_HEIGHT
      el.style.height = `${Math.min(Math.max(el.scrollHeight, minH), maxH)}px`
    }, [rows, maxRows])

    useEffect(() => {
      adjustHeight()
    }, [value, adjustHeight])

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value)
      },
      [onChange],
    )

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          onSubmit?.()
        }
      },
      [onSubmit],
    )

    return (
      <textarea
        ref={setRefs}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          'w-full resize-none bg-transparent border-none outline-none cursor-text',
          'px-3 py-2.5',
          FONT.body,
          WEIGHT.normal,
          'text-[13px] leading-[20px] text-[var(--n1150)]',
          'placeholder:text-[var(--n600)]',
          className,
        )}
      />
    )
  },
)

TextArea.displayName = 'ChatInput.TextArea'

// ─── ChatInput.ActionBar ───

const ActionBar = forwardRef<HTMLDivElement, ChatInputActionBarProps>(
  function ChatInputActionBar({ children, className }, ref) {
    return (
      <div
        ref={ref}
        role="toolbar"
        aria-label="Chat actions"
        className={cn(
          'flex items-center justify-between',
          'px-2 py-1.5',
          'border-t-[0.5px] border-t-[var(--n200)]',
          className,
        )}
      >
        {children}
      </div>
    )
  },
)

ActionBar.displayName = 'ChatInput.ActionBar'

// ─── ChatInput.Action ───

const Action = forwardRef<HTMLButtonElement, ChatInputActionProps>(
  function ChatInputAction(
    { icon, label, showLabel = false, onClick, active, side: _side, className },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        onClick={onClick}
        className={cn(
          'inline-flex items-center justify-center gap-1.5 cursor-default',
          FONT.body,
          WEIGHT.medium,
          'text-[12px] text-[var(--n800)]',
          RADIUS.sm,
          TRANSITION.background,
          HOVER_SAND,
          FOCUS_RING,
          showLabel ? 'px-2' : 'px-1.5',
          active && 'bg-[var(--n200)]',
          className,
        )}
        style={{ height: ACTION_HEIGHT }}
      >
        {icon && (
          <span className="shrink-0 flex items-center justify-center" style={{ width: 16, height: 16 }}>
            {icon}
          </span>
        )}
        {showLabel && <span>{label}</span>}
      </button>
    )
  },
)

Action.displayName = 'ChatInput.Action'

// ─── ChatInput (root) ───

const ChatInputRoot = forwardRef<HTMLDivElement, ChatInputProps>(
  function ChatInput({ children, className }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col cursor-default',
          FONT.body,
          BORDER.default,
          RADIUS.xl,
          FOCUS_WITHIN_RING,
          'bg-[var(--n50)]',
          className,
        )}
      >
        {children}
      </div>
    )
  },
)

ChatInputRoot.displayName = 'ChatInput'

// ─── Compound export ───

const ChatInput = Object.assign(ChatInputRoot, {
  TextArea,
  ActionBar,
  Action,
})

export { ChatInput }
