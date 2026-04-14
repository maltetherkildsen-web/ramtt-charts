// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import { cn, FONT, WEIGHT } from '@/lib/ui'

// ─── Types ───

export interface AuthLayoutProps {
  title: string
  subtitle?: string
  /** Logo element (default: RAMTT text) */
  logo?: ReactNode
  children: ReactNode
  className?: string
}

// ─── Divider ───

function AuthDivider({ text = 'or continue with', className }: { text?: string; className?: string }) {
  return (
    <div className={cn('flex items-center gap-3 my-5', className)}>
      <div className="flex-1 h-[0.5px] bg-[var(--n400)]" />
      <span className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)] whitespace-nowrap')}>
        {text}
      </span>
      <div className="flex-1 h-[0.5px] bg-[var(--n400)]" />
    </div>
  )
}
AuthDivider.displayName = 'AuthLayout.Divider'

// ─── Footer ───

function AuthFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)] text-center mt-5', className)}>
      {children}
    </div>
  )
}
AuthFooter.displayName = 'AuthLayout.Footer'

// ─── Root ───

const AuthLayoutRoot = forwardRef<HTMLDivElement, AuthLayoutProps>(
  function AuthLayout({ title, subtitle, logo, children, className }, ref) {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center bg-[var(--bg)]', className)}
        style={{ minHeight: '100vh' }}
      >
        <div className="w-full" style={{ maxWidth: 400, padding: 32 }}>
          {/* Logo */}
          <div className="text-center mb-8">
            {logo ?? (
              <span className={cn(FONT.body, 'text-[20px]', WEIGHT.strong, 'text-[var(--n1150)]')}>
                RAMTT
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className={cn(FONT.body, 'text-[20px]', WEIGHT.strong, 'text-[var(--n1150)] text-center')}>
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className={cn(FONT.body, 'text-[14px]', WEIGHT.normal, 'text-[var(--n800)] text-center mt-1 mb-6')}>
              {subtitle}
            </p>
          )}
          {!subtitle && <div className="mb-6" />}

          {/* Form content */}
          <div className="flex flex-col gap-4">
            {children}
          </div>
        </div>
      </div>
    )
  },
)
AuthLayoutRoot.displayName = 'AuthLayout'

// ─── Export ───

export const AuthLayout = Object.assign(AuthLayoutRoot, {
  Divider: AuthDivider,
  Footer: AuthFooter,
})
