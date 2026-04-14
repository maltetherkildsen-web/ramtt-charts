// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useState, useCallback } from 'react'
import { cn, FONT, WEIGHT, RADIUS, BORDER } from '@/lib/ui'
import { Input } from './Input'
import { Select } from './Select'
import { Button } from './Button'
import { Spinner } from './Spinner'

// ─── Types ───

export interface InviteCardProps {
  /** Called when invite is submitted */
  onInvite: (emails: string | string[], role: string) => void | Promise<void>
  /** Available roles */
  roles?: string[]
  /** Default selected role */
  defaultRole?: string
  /** Allow multiple emails (comma-separated) */
  multiple?: boolean
  /** Card title */
  title?: string
  /** Description text */
  description?: string
  /** Loading state (while sending) */
  loading?: boolean
  className?: string
}

const DEFAULT_ROLES = ['Athlete', 'Coach']

// ─── Validation ───

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// ─── Send icon ───

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M5.25 8.75L12.25 1.75M5.42 9.04L7.18 12.56C7.31 12.82 7.37 12.95 7.46 12.99C7.53 13.03 7.62 13.03 7.69 12.99C7.78 12.94 7.84 12.82 7.96 12.56L12.57 2.34C12.68 2.1 12.73 1.98 12.7 1.9C12.68 1.82 12.6 1.75 12.53 1.72C12.44 1.69 12.32 1.74 12.08 1.85L1.87 6.46C1.6 6.58 1.48 6.64 1.44 6.73C1.4 6.8 1.4 6.89 1.43 6.96C1.48 7.05 1.6 7.12 1.86 7.24L5.39 9C5.48 9.05 5.52 9.07 5.56 9.1C5.59 9.13 5.61 9.16 5.63 9.19C5.66 9.23 5.67 9.27 5.68 9.36L5.42 9.04Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Component ───

const InviteCard = forwardRef<HTMLDivElement, InviteCardProps>(
  function InviteCard(
    {
      onInvite,
      roles = DEFAULT_ROLES,
      defaultRole,
      multiple = false,
      title = 'Invite team member',
      description = 'Enter an email address to send an invitation.',
      loading = false,
      className,
    },
    ref,
  ) {
    const [email, setEmail] = useState('')
    const [role, setRole] = useState(defaultRole ?? roles[0] ?? '')
    const [error, setError] = useState('')

    const roleOptions = roles.map((r) => ({ value: r, label: r }))

    const handleSubmit = useCallback(() => {
      if (multiple) {
        const emails = email.split(',').map((e) => e.trim()).filter(Boolean)
        const invalid = emails.find((e) => !isValidEmail(e))
        if (emails.length === 0 || invalid) {
          setError(invalid ? `Invalid email: ${invalid}` : 'Enter at least one email')
          return
        }
        setError('')
        onInvite(emails, role)
      } else {
        const trimmed = email.trim()
        if (!isValidEmail(trimmed)) {
          setError('Enter a valid email address')
          return
        }
        setError('')
        onInvite(trimmed, role)
      }
    }, [email, role, multiple, onInvite])

    return (
      <div
        ref={ref}
        className={cn(
          'bg-[var(--n50)]',
          BORDER.default,
          RADIUS.lg,
          className,
        )}
        style={{ padding: 20 }}
      >
        {/* Title */}
        <h3 className={cn(FONT.body, 'text-[14px]', WEIGHT.strong, 'text-[var(--n1150)]')}>
          {title}
        </h3>

        {/* Description */}
        <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)] mt-1 mb-4')}>
          {description}
        </p>

        {/* Input row */}
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Input
              placeholder={multiple ? 'name@example.com, ...' : 'name@example.com'}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError('') }}
              disabled={loading}
            />
          </div>
          <div style={{ width: 120 }}>
            <Select
              options={roleOptions}
              value={role}
              onChange={setRole}
            />
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            disabled={loading || !email.trim()}
          >
            {loading ? <Spinner size="sm" /> : <SendIcon />}
          </Button>
        </div>

        {/* Validation error */}
        {error && (
          <p className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--negative)] mt-1.5')}>
            {error}
          </p>
        )}
      </div>
    )
  },
)

InviteCard.displayName = 'InviteCard'
export { InviteCard }
