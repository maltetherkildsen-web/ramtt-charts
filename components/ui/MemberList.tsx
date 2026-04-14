// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef } from 'react'
import { cn, FONT, WEIGHT, TRANSITION } from '@/lib/ui'
import { Avatar } from './Avatar'
import { Button } from './Button'
import { Select } from './Select'
import { Dropdown } from './Dropdown'
import { ColorDot } from './ColorDot'

// ─── Types ───

export interface Member {
  id: string
  name?: string
  email: string
  avatar?: string
  role: string
  status: 'active' | 'invited' | 'inactive'
  lastActive?: string
}

export interface MemberListProps {
  title?: string
  members: Member[]
  roles?: string[]
  onRoleChange?: (memberId: string, newRole: string) => void
  onRemove?: (memberId: string) => void
  onInvite?: () => void
  className?: string
}

// ─── Status map ───

const STATUS_CONFIG = {
  active: { color: 'positive' as const, label: 'Active' },
  invited: { color: 'var(--n600)' as const, label: 'Invited' },
  inactive: { color: 'negative' as const, label: 'Inactive' },
} as const

const DEFAULT_ROLES = ['Athlete', 'Coach', 'Admin']

// ─── Placeholder avatar for invites ───

function InviteAvatar() {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-[var(--n200)] shrink-0"
      style={{ width: 36, height: 36 }}
    >
      <span className={cn(FONT.body, 'text-[14px]', WEIGHT.medium, 'text-[var(--n600)]')}>?</span>
    </div>
  )
}

// ─── More actions icon (three dots) ───

function MoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="4" cy="8" r="1.25" fill="currentColor" />
      <circle cx="8" cy="8" r="1.25" fill="currentColor" />
      <circle cx="12" cy="8" r="1.25" fill="currentColor" />
    </svg>
  )
}

// ─── Plus icon ───

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 2.5V11.5M2.5 7H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── Component ───

const MemberList = forwardRef<HTMLDivElement, MemberListProps>(
  function MemberList(
    { title, members, roles = DEFAULT_ROLES, onRoleChange, onRemove, onInvite, className },
    ref,
  ) {
    const roleOptions = roles.map((r) => ({ value: r, label: r }))

    return (
      <div ref={ref} className={cn(className)}>
        {/* Header */}
        {(title || onInvite) && (
          <div className="flex items-center justify-between mb-4">
            {title && (
              <h3 className={cn(FONT.body, 'text-[14px]', WEIGHT.strong, 'text-[var(--n1150)]')}>
                {title}
              </h3>
            )}
            {onInvite && (
              <Button variant="outline" size="sm" onClick={onInvite}>
                <PlusIcon /> Invite
              </Button>
            )}
          </div>
        )}

        {/* Members */}
        <div role="list">
          {members.map((member, i) => {
            const isLast = i === members.length - 1
            const config = STATUS_CONFIG[member.status]
            const displayName = member.name || member.email

            return (
              <div
                key={member.id}
                role="listitem"
                className={cn(
                  'flex items-center gap-3',
                  !isLast && 'border-b-[0.5px] border-b-[var(--n200)]',
                )}
                style={{ padding: '12px 0' }}
              >
                {/* Avatar */}
                {member.name && member.status !== 'invited' ? (
                  <Avatar
                    src={member.avatar}
                    name={member.name}
                    size="lg"
                  />
                ) : (
                  <InviteAvatar />
                )}

                {/* Name + email */}
                <div className="flex-1 min-w-0">
                  {member.name ? (
                    <>
                      <span className={cn(FONT.body, 'text-[14px]', WEIGHT.strong, 'text-[var(--n1150)] truncate block')}>
                        {member.name}
                      </span>
                      <span className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)]')}>
                        {member.email}
                      </span>
                    </>
                  ) : (
                    <span className={cn(FONT.body, 'text-[14px]', WEIGHT.book, 'text-[var(--n1150)] truncate block')}>
                      {member.email}
                    </span>
                  )}
                </div>

                {/* Role selector */}
                {onRoleChange && (
                  <div style={{ width: 120 }}>
                    <Select
                      options={roleOptions}
                      value={member.role}
                      onChange={(val) => onRoleChange(member.id, val)}
                    />
                  </div>
                )}

                {/* Status */}
                <ColorDot color={config.color} label={config.label} />

                {/* Actions */}
                {onRemove && (
                  <Dropdown>
                    <Dropdown.Trigger>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn('text-[var(--n600)] hover:text-[var(--n1150)]', TRANSITION.colors)}
                      >
                        <MoreIcon />
                      </Button>
                    </Dropdown.Trigger>
                    <Dropdown.Content align="end">
                      <Dropdown.Item onClick={() => {}}>View profile</Dropdown.Item>
                      {member.status === 'invited' && (
                        <Dropdown.Item onClick={() => {}}>Resend invite</Dropdown.Item>
                      )}
                      <Dropdown.Separator />
                      <Dropdown.Item variant="danger" onClick={() => onRemove(member.id)}>
                        Remove
                      </Dropdown.Item>
                    </Dropdown.Content>
                  </Dropdown>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  },
)

MemberList.displayName = 'MemberList'
export { MemberList }
