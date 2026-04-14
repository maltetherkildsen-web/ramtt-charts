// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, RADIUS, BORDER } from '@/lib/ui'
import { Avatar } from './Avatar'

// ─── Types ───

export interface FeedItem {
  id: string
  type: 'event' | 'comment'
  /** For events: icon/dot on the timeline */
  icon?: ReactNode
  /** For comments: author avatar */
  avatar?: string
  /** For comments: author name */
  author?: string
  /** Event title */
  title?: string
  /** Event description or comment text */
  description?: string
  /** Alias for description (comment-style) */
  content?: string
  /** Timestamp text */
  timestamp: string
  /** Optional action button */
  action?: ReactNode
}

export interface FeedProps {
  items: FeedItem[]
  /** Show the connecting timeline line */
  showLine?: boolean
  className?: string
}

// ─── Default dot ───

function DefaultDot() {
  return (
    <div
      className="rounded-full bg-[var(--n400)]"
      style={{ width: 8, height: 8 }}
    />
  )
}

// ─── Component ───

const Feed = forwardRef<HTMLDivElement, FeedProps>(
  function Feed({ items, showLine = true, className }, ref) {
    return (
      <div ref={ref} className={cn('relative', className)}>
        {/* Timeline line */}
        {showLine && (
          <div
            className="absolute top-0 bottom-0 bg-[var(--n200)]"
            style={{ left: 11, width: 2 }}
            aria-hidden="true"
          />
        )}

        {/* Items */}
        {items.map((item, i) => {
          const isComment = item.type === 'comment'
          const text = item.content ?? item.description

          return (
            <div key={item.id} className="relative" style={{ paddingLeft: 36, paddingBottom: 20 }}>
              {/* Icon / avatar on timeline */}
              <div
                className="absolute flex items-center justify-center bg-[var(--bg)]"
                style={{ left: 0, top: 0, width: 24, height: 24 }}
              >
                {isComment && item.avatar ? (
                  <Avatar src={item.avatar} name={item.author ?? ''} size="sm" />
                ) : (
                  item.icon ?? <DefaultDot />
                )}
              </div>

              {/* Content */}
              {isComment ? (
                <>
                  {/* Comment header */}
                  <div className="flex items-center gap-2 mb-1.5">
                    {item.author && (
                      <span className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)]')}>
                        {item.author}
                      </span>
                    )}
                    <span className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)]')}>
                      {item.timestamp}
                    </span>
                  </div>
                  {/* Comment bubble */}
                  {text && (
                    <div
                      className={cn('bg-[var(--n50)]', BORDER.default, RADIUS.lg)}
                      style={{ padding: 12, maxWidth: 500 }}
                    >
                      <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)] leading-relaxed')}>
                        {text}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Event header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {item.title && (
                          <span className={cn(FONT.body, 'text-[14px]', WEIGHT.book, 'text-[var(--n1150)]')}>
                            {item.title}
                          </span>
                        )}
                        <span className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)]')}>
                          {item.timestamp}
                        </span>
                      </div>
                      {text && (
                        <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)] mt-0.5')}>
                          {text}
                        </p>
                      )}
                    </div>
                    {item.action && <div className="shrink-0">{item.action}</div>}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    )
  },
)

Feed.displayName = 'Feed'
export { Feed }
