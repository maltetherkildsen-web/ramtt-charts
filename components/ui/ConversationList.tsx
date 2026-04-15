// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import {
  cn,
  FONT,
  WEIGHT,
  RADIUS,
  TRANSITION,
  HOVER_SAND,
  ACTIVE_SAND,
  FOCUS_RING,
  LABEL_STYLE,
  CONVERSATION_ITEM_HEIGHT,
} from '@/lib/ui'

// ─── Types ───

export interface ConversationListItemData {
  id: string
  icon?: ReactNode
  title: string
  subtitle?: string
  timestamp?: string
  active?: boolean
  pinned?: boolean
  unread?: boolean
}

export interface ConversationListProps {
  children: ReactNode
  className?: string
}

export interface ConversationListItemProps {
  icon?: ReactNode
  title: string
  subtitle?: string
  timestamp?: string
  active?: boolean
  pinned?: boolean
  unread?: boolean
  onClick?: () => void
  className?: string
}

export interface ConversationListGroupProps {
  label: string
  children: ReactNode
  className?: string
}

// ─── Icons ───

function ChatBubbleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        d="M2.5 3.5h11a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5l-2.5 2V4.5a1 1 0 0 1 1-1Z"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        d="M7.5 1.5L10.5 4.5L7.5 7.5L6.75 10.5L1.5 5.25L4.5 4.5L7.5 1.5Z"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Root ───

const ConversationListRoot = forwardRef<HTMLDivElement, ConversationListProps>(
  function ConversationList({ children, className }, ref) {
    return (
      <div ref={ref} role="list" className={cn('flex flex-col', className)}>
        {children}
      </div>
    )
  },
)
ConversationListRoot.displayName = 'ConversationList'

// ─── Group ───

const ConversationListGroup = forwardRef<HTMLDivElement, ConversationListGroupProps>(
  function ConversationListGroup({ label, children, className }, ref) {
    return (
      <div ref={ref} className={cn('mt-2 first:mt-0', className)}>
        <div className={cn(LABEL_STYLE, 'px-2 py-1.5')}>{label}</div>
        {children}
      </div>
    )
  },
)
ConversationListGroup.displayName = 'ConversationList.Group'

// ─── Item ───

const ConversationListItem = forwardRef<HTMLButtonElement, ConversationListItemProps>(
  function ConversationListItem(
    { icon, title, subtitle, timestamp, active = false, pinned = false, unread = false, onClick, className },
    ref,
  ) {
    return (
      <button
        ref={ref}
        role="listitem"
        type="button"
        onClick={onClick}
        className={cn(
          'flex items-center w-full gap-2.5 px-2 py-1.5 cursor-default',
          RADIUS.md,
          TRANSITION.background,
          FOCUS_RING,
          HOVER_SAND,
          active && ACTIVE_SAND,
          className,
        )}
        style={{ height: CONVERSATION_ITEM_HEIGHT }}
      >
        {/* Icon */}
        <span
          className="shrink-0 flex items-center justify-center text-[var(--n600)]"
          style={{ width: 18, height: 18 }}
        >
          {icon ?? <ChatBubbleIcon />}
        </span>

        {/* Title + subtitle */}
        <span className="flex-1 min-w-0 flex flex-col items-start">
          <span
            className={cn(
              FONT.body,
              'text-[13px] text-[var(--n1150)] truncate w-full text-left',
              unread ? WEIGHT.strong : WEIGHT.normal,
            )}
          >
            {title}
          </span>
          {subtitle && (
            <span
              className={cn(
                FONT.body,
                'text-[11px] text-[var(--n800)] truncate w-full text-left',
                WEIGHT.book,
              )}
            >
              {subtitle}
            </span>
          )}
        </span>

        {/* Timestamp + pin */}
        <span className="shrink-0 flex items-center gap-1">
          {timestamp && (
            <span
              className={cn(
                FONT.body,
                'text-[11px] text-[var(--n600)]',
                WEIGHT.book,
              )}
            >
              {timestamp}
            </span>
          )}
          {pinned && (
            <span className="text-[var(--n600)]">
              <PinIcon />
            </span>
          )}
        </span>
      </button>
    )
  },
)
ConversationListItem.displayName = 'ConversationList.Item'

// ─── Export ───

export const ConversationList = Object.assign(ConversationListRoot, {
  Group: ConversationListGroup,
  Item: ConversationListItem,
})
