// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useState, useRef, useEffect, useCallback, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, TRANSITION, HOVER_SAND, BORDER, RADIUS, FOCUS_RING } from '@/lib/ui'

// ─── Tag ───

export interface TagProps {
  children: ReactNode
  color?: string
  onRemove?: () => void
  className?: string
}

const TagComponent = forwardRef<HTMLSpanElement, TagProps>(
  ({ children, color, onRemove, className }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1',
          'bg-[var(--n200)] rounded-[4px] px-2 py-0.5',
          FONT.body,
          'text-[12px]',
          WEIGHT.book,
          'text-[var(--n1050)]',
          className,
        )}
      >
        {color && (
          <span
            className="shrink-0 rounded-full"
            style={{ width: 6, height: 6, backgroundColor: color }}
          />
        )}
        {children}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove"
            className={cn(
              'shrink-0 ml-0.5',
              FONT.body,
              'text-[var(--n600)] hover:text-[var(--n1150)]',
              TRANSITION.colors,
            )}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </span>
    )
  },
)
TagComponent.displayName = 'Tag'

// ─── TagInput ───

export interface TagInputProps {
  tags: string[]
  onAdd: (tag: string) => void
  onRemove: (tag: string) => void
  placeholder?: string
  suggestions?: string[]
  className?: string
}

const TagInput = forwardRef<HTMLDivElement, TagInputProps>(
  ({ tags, onAdd, onRemove, placeholder = 'Add tag...', suggestions = [], className }, ref) => {
    const [inputValue, setInputValue] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const filtered = suggestions.filter(
      (s) => !tags.includes(s) && s.toLowerCase().includes(inputValue.toLowerCase()),
    )

    const addTag = useCallback(
      (tag: string) => {
        const trimmed = tag.trim()
        if (trimmed && !tags.includes(trimmed)) {
          onAdd(trimmed)
        }
        setInputValue('')
        setShowSuggestions(false)
      },
      [tags, onAdd],
    )

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && inputValue.trim()) {
          e.preventDefault()
          addTag(inputValue)
        } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
          onRemove(tags[tags.length - 1])
        } else if (e.key === 'Escape') {
          setShowSuggestions(false)
        }
      },
      [inputValue, tags, addTag, onRemove],
    )

    // Close suggestions on outside click
    useEffect(() => {
      if (!showSuggestions) return
      function handlePointerDown(e: PointerEvent) {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setShowSuggestions(false)
        }
      }
      document.addEventListener('pointerdown', handlePointerDown)
      return () => document.removeEventListener('pointerdown', handlePointerDown)
    }, [showSuggestions])

    return (
      <div ref={containerRef} className={cn('relative', className)}>
        <div
          ref={ref}
          className={cn(
            'flex flex-wrap items-center gap-1.5',
            'bg-white min-h-[32px] px-2 py-1',
            BORDER.default,
            RADIUS.md,
            TRANSITION.colors,
            'focus-within:border-[var(--n800)]',
          )}
          onClick={() => inputRef.current?.focus()}
        >
          {tags.map((tag) => (
            <TagComponent key={tag} onRemove={() => onRemove(tag)}>
              {tag}
            </TagComponent>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? placeholder : ''}
            className={cn(
              'flex-1 min-w-[80px] bg-transparent outline-none',
              FONT.body,
              'text-[13px]',
              WEIGHT.normal,
              'text-[var(--n1150)]',
              'placeholder:text-[var(--n600)]',
            )}
          />
        </div>

        {showSuggestions && filtered.length > 0 && (
          <div
            className={cn(
              'absolute z-50 top-full mt-1 left-0 right-0',
              'bg-[var(--n50)]',
              BORDER.default,
              'rounded-[8px]',
              'p-1 max-h-[200px] overflow-y-auto',
              'animate-[ramtt-dropdown-enter_120ms_var(--ease-out-expo)]',
            )}
          >
            {filtered.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => addTag(suggestion)}
                className={cn(
                  'flex w-full items-center px-2.5 py-1.5',
                  RADIUS.sm,
                  FONT.body,
                  'text-[13px]',
                  WEIGHT.normal,
                  'text-[var(--n1150)]',
                  TRANSITION.background,
                  HOVER_SAND,
                )}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  },
)
TagInput.displayName = 'TagInput'

export const Tag = Object.assign(TagComponent, {
  Input: TagInput,
})
