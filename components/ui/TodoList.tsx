// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useState, useCallback } from 'react'
import { cn, FONT, WEIGHT, TRANSITION } from '@/lib/ui'
import { Checkbox } from './Checkbox'
import { Input } from './Input'

// ─── Types ───

export interface TodoItem {
  id: string
  text: string
  done: boolean
}

export interface TodoListProps {
  title?: string
  items: TodoItem[]
  onToggle: (id: string) => void
  /** If provided, shows "Add item" input */
  onAdd?: (text: string) => void
  /** If provided, shows remove button on hover */
  onRemove?: (id: string) => void
  /** Show completion count */
  showProgress?: boolean
  className?: string
}

// ─── Plus icon ───

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 2.5V11.5M2.5 7H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── Close icon ───

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

// ─── Component ───

const TodoList = forwardRef<HTMLDivElement, TodoListProps>(
  function TodoList(
    { title, items, onToggle, onAdd, onRemove, showProgress = false, className },
    ref,
  ) {
    const [newText, setNewText] = useState('')

    const doneCount = items.filter((i) => i.done).length

    const handleAdd = useCallback(() => {
      const trimmed = newText.trim()
      if (!trimmed || !onAdd) return
      onAdd(trimmed)
      setNewText('')
    }, [newText, onAdd])

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          handleAdd()
        }
      },
      [handleAdd],
    )

    return (
      <div ref={ref} className={cn(className)}>
        {/* Header */}
        {(title || showProgress) && (
          <div className="flex items-center justify-between mb-3">
            {title && (
              <h3 className={cn(FONT.body, 'text-[14px]', WEIGHT.strong, 'text-[var(--n1150)]')}>
                {title}
              </h3>
            )}
            {showProgress && (
              <span className={cn(FONT.body, 'text-[12px]', WEIGHT.book, 'tabular-nums text-[var(--n600)]')}>
                {doneCount}/{items.length} done
              </span>
            )}
          </div>
        )}

        {/* Items */}
        <div role="list">
          {items.map((item) => (
            <div
              key={item.id}
              role="listitem"
              className="group flex items-center gap-2.5"
              style={{ padding: '6px 0', minHeight: 32 }}
            >
              <Checkbox
                checked={item.done}
                onChange={() => onToggle(item.id)}
              />

              <span
                className={cn(
                  FONT.body,
                  'text-[14px] flex-1',
                  WEIGHT.normal,
                  item.done
                    ? 'text-[var(--n600)] line-through'
                    : 'text-[var(--n1150)]',
                )}
              >
                {item.text}
              </span>

              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className={cn(
                    'shrink-0 flex items-center justify-center text-[var(--n600)]',
                    'opacity-0 group-hover:opacity-100',
                    TRANSITION.opacity,
                  )}
                  style={{ width: 16, height: 16 }}
                  aria-label={`Remove ${item.text}`}
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add input */}
        {onAdd && (
          <div className="flex items-center gap-2 mt-3">
            <span className="shrink-0 text-[var(--n600)]">
              <PlusIcon />
            </span>
            <Input
              placeholder="Add item..."
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}
      </div>
    )
  },
)

TodoList.displayName = 'TodoList'
export { TodoList }
