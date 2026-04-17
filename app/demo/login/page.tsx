'use client'

import { useState, useMemo, type CSSProperties } from 'react'
import {
  cn,
  FONT,
  WEIGHT,
  RADIUS,
  BORDER,
  TRANSITION,
  ACTIVE_BLACK,
  HOVER_SAND,
  FOCUS_RING,
  SIZE_HEIGHTS,
  SIZE_TEXT,
} from '@/lib/ui'
import { RamttWordmark } from '@/components/ui/ramtt-logo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { generateAccentTokens, type AccentTokens } from '@/app/accent-demo/accents'

// ─── Accent scoping ───
// Each variant gets its own accent color. We override the CSS custom properties
// that Button, Input, and other @ramtt/ui components already read.

function accentVars(tokens: AccentTokens): CSSProperties {
  return {
    '--accent': tokens.primary,
    '--accent-hover': tokens.hover,
    '--accent-pressed': tokens.pressed,
    '--accent-text': tokens.text,
    '--accent-icon': tokens.icon,
    '--accent-icon-light': tokens.iconLight,
    '--accent-icon-lightest': tokens.iconLightest,
    '--accent-border': tokens.border,
    '--accent-wash': tokens.wash,
    '--accent-badge': tokens.badgeBg,
    '--accent-selection': tokens.selection,
    '--accent-toggle': tokens.toggleTrack,
    '--accent-soft': `${tokens.primary}20`,
    '--accent-light': `${tokens.primary}30`,
  } as CSSProperties
}

// ─── Accent definitions per variant ───
const ACCENT_A = '#7A02CD'       // Violet
const ACCENT_B = '#DD4170'       // Rose/Pink
const ACCENT_C = '#4D49FC'       // Electric Indigo

// ─── Shared: Google + Apple SVG icons (inline, no deps) ───

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-4', className)} fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09a6.96 6.96 0 0 1 0-4.17V7.07H2.18a11.97 11.97 0 0 0 0 9.86l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-4', className)} fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  )
}

// ─── Shared: OAuth Row (side-by-side) ───

function OAuthRow() {
  return (
    <div className="flex gap-3">
      <Button variant="outline" className="flex-1 gap-2">
        <GoogleIcon />
        Google
      </Button>
      <Button variant="outline" className="flex-1 gap-2">
        <AppleIcon />
        Apple
      </Button>
    </div>
  )
}

// ─── Shared: Divider ───

function AuthDivider({ text = 'or' }: { text?: string }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-[var(--n400)]" />
      <span className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)]')}>
        {text}
      </span>
      <div className="flex-1 h-px bg-[var(--n400)]" />
    </div>
  )
}


// ═══════════════════════════════════════════════════════
// VARIANT A — Minimal Centered (accent: #7A02CD violet)
// ═══════════════════════════════════════════════════════

function LoginMinimal() {
  const tokens = useMemo(() => generateAccentTokens(ACCENT_A), [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg)] px-4" style={accentVars(tokens)}>
      <div className="w-full max-w-[380px]">
        {/* Logo — wordmark only */}
        <div className="flex justify-center mb-10">
          <RamttWordmark className="h-6 w-auto text-[var(--n1150)]" />
        </div>

        {/* Heading */}
        <h1 className={cn(FONT.body, 'text-[20px]', WEIGHT.strong, 'text-[var(--n1150)] text-center')}>
          Sign in to RAMTT
        </h1>
        <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)] text-center mt-1 mb-6')}>
          Welcome back. Enter your credentials to continue.
        </p>

        {/* OAuth */}
        <OAuthRow />

        {/* Divider */}
        <AuthDivider />

        {/* Form */}
        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input label="Password" type="password" placeholder="Enter your password" />

          <div className="flex justify-end">
            <button className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n800)] hover:text-[var(--n1150)]', TRANSITION.colors)}>
              Forgot password?
            </button>
          </div>

          <Button className="w-full">Sign in</Button>
        </form>

        {/* Footer */}
        <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)] text-center mt-6')}>
          Don&apos;t have an account?{' '}
          <button className={cn(WEIGHT.medium, 'text-[var(--accent-text)] hover:underline')}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}


// ═══════════════════════════════════════════════════════
// VARIANT B — Split Screen (accent: #DD4170 rose)
// ═══════════════════════════════════════════════════════

function LoginSplit() {
  const [isSignUp, setIsSignUp] = useState(true)
  const tokens = useMemo(() => generateAccentTokens(ACCENT_B), [])

  return (
    <div className="flex min-h-screen" style={accentVars(tokens)}>
      {/* Left: Brand panel */}
      <div className="hidden lg:flex flex-col justify-between w-[480px] shrink-0 bg-[var(--n1150)] px-10 py-10">
        {/* Logo — wordmark only */}
        <RamttWordmark className="h-5 w-auto text-[var(--n50)]" />

        {/* Tagline */}
        <div>
          <h2 className={cn(
            FONT.body,
            'text-[28px]/[1.2]',
            WEIGHT.strong,
            'text-[var(--n50)] max-w-[320px]',
          )}>
            Train smarter.
            <br />
            Fuel better.
            <br />
            Race faster.
          </h2>
          <p className={cn(FONT.body, 'text-[14px]', WEIGHT.normal, 'text-[var(--n700)] mt-4 max-w-[300px]')}>
            The endurance platform that connects training, nutrition, and recovery into one system.
          </p>
        </div>

        {/* Bottom quote */}
        <div>
          <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n700)]')}>
            &ldquo;RAMTT changed how I approach race day nutrition. My last marathon was my fastest.&rdquo;
          </p>
          <p className={cn(FONT.body, 'text-[12px]', WEIGHT.book, 'text-[var(--n700)] mt-2')}>
            Sarah K. &mdash; Marathon runner
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center bg-[var(--bg)] px-6">
        <div className="w-full max-w-[380px]">
          {/* Mobile logo — wordmark only */}
          <div className="flex justify-center mb-8 lg:hidden">
            <RamttWordmark className="h-6 w-auto text-[var(--n1150)]" />
          </div>

          {/* Toggle */}
          <div className="flex justify-center gap-1 mb-8">
            <button
              onClick={() => setIsSignUp(false)}
              className={cn(
                'px-4 py-1.5',
                RADIUS.md,
                FONT.body,
                SIZE_TEXT.md,
                WEIGHT.medium,
                TRANSITION.colors,
                !isSignUp ? ACTIVE_BLACK : cn('text-[var(--n800)]', HOVER_SAND),
              )}
            >
              Sign in
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={cn(
                'px-4 py-1.5',
                RADIUS.md,
                FONT.body,
                SIZE_TEXT.md,
                WEIGHT.medium,
                TRANSITION.colors,
                isSignUp ? ACTIVE_BLACK : cn('text-[var(--n800)]', HOVER_SAND),
              )}
            >
              Sign up
            </button>
          </div>

          {/* Heading */}
          <h1 className={cn(FONT.body, 'text-[20px]', WEIGHT.strong, 'text-[var(--n1150)]')}>
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)] mt-1 mb-6')}>
            {isSignUp ? 'Start your 14-day free trial. No credit card required.' : 'Enter your credentials to continue.'}
          </p>

          {/* OAuth */}
          <OAuthRow />

          {/* Divider */}
          <AuthDivider text="or continue with email" />

          {/* Form */}
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            {isSignUp && (
              <Input label="Full name" placeholder="Jane Doe" />
            )}
            <Input label="Email" type="email" placeholder="you@example.com" />
            <Input
              label="Password"
              type="password"
              placeholder={isSignUp ? 'Create a password' : 'Enter your password'}
            />

            {!isSignUp && (
              <div className="flex justify-end">
                <button className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n800)] hover:text-[var(--n1150)]', TRANSITION.colors)}>
                  Forgot password?
                </button>
              </div>
            )}

            <Button className="w-full mt-1">
              {isSignUp ? 'Create account' : 'Sign in'}
            </Button>
          </form>

          {/* Terms */}
          {isSignUp && (
            <p className={cn(FONT.body, 'text-[11px]', WEIGHT.normal, 'text-[var(--n600)] text-center mt-4 max-w-[320px] mx-auto')}>
              By creating an account, you agree to our{' '}
              <button className="underline hover:text-[var(--n1150)]">Terms of Service</button>
              {' '}and{' '}
              <button className="underline hover:text-[var(--n1150)]">Privacy Policy</button>.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}


// ═══════════════════════════════════════════════════════
// VARIANT C — Floating Card (accent: #4D49FC electric indigo)
// ═══════════════════════════════════════════════════════

function LoginCard() {
  const [mode, setMode] = useState<'magic' | 'password'>('magic')
  const tokens = useMemo(() => generateAccentTokens(ACCENT_C), [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg)] px-4" style={accentVars(tokens)}>
      {/* Top bar — wordmark only */}
      <div className="fixed top-0 left-0 right-0 flex items-center px-6 h-14">
        <RamttWordmark className="h-4 w-auto text-[var(--n1150)]" />
      </div>

      {/* Card */}
      <div className={cn(
        'w-full max-w-[420px] bg-[var(--n50)] p-8',
        BORDER.default,
        RADIUS.lg,
      )}>
        {/* Heading */}
        <h1 className={cn(FONT.body, 'text-[20px]', WEIGHT.strong, 'text-[var(--n1150)] text-center')}>
          Sign in
        </h1>
        <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)] text-center mt-1 mb-6')}>
          Choose your preferred sign in method
        </p>

        {/* OAuth: full-width stacked */}
        <div className="flex flex-col gap-2">
          <Button variant="outline" className="w-full gap-2">
            <GoogleIcon />
            Continue with Google
          </Button>
          <button
            className={cn(
              'w-full inline-flex items-center justify-center gap-2',
              SIZE_HEIGHTS.md,
              SIZE_TEXT.md,
              FONT.body,
              WEIGHT.medium,
              RADIUS.md,
              TRANSITION.colors,
              FOCUS_RING,
              ACTIVE_BLACK,
              'hover:bg-[var(--n1050)]',
            )}
          >
            <AppleIcon className="text-[var(--n50)]" />
            Continue with Apple
          </button>
        </div>

        {/* Divider */}
        <div className="my-6">
          <AuthDivider />
        </div>

        {/* Mode toggle */}
        <div className={cn('flex p-0.5 mb-4 bg-[var(--n200)]', RADIUS.md)}>
          <button
            onClick={() => setMode('magic')}
            className={cn(
              'flex-1 py-1.5 text-center',
              RADIUS.sm,
              FONT.body,
              'text-[12px]',
              WEIGHT.medium,
              TRANSITION.colors,
              mode === 'magic' ? 'bg-white text-[var(--n1150)] border-[0.5px] border-[var(--n400)]' : 'text-[var(--n800)]',
            )}
          >
            Magic link
          </button>
          <button
            onClick={() => setMode('password')}
            className={cn(
              'flex-1 py-1.5 text-center',
              RADIUS.sm,
              FONT.body,
              'text-[12px]',
              WEIGHT.medium,
              TRANSITION.colors,
              mode === 'password' ? 'bg-white text-[var(--n1150)] border-[0.5px] border-[var(--n400)]' : 'text-[var(--n800)]',
            )}
          >
            Password
          </button>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
          <Input label="Email address" type="email" placeholder="you@example.com" />

          {mode === 'password' && (
            <Input label="Password" type="password" placeholder="Enter your password" />
          )}

          <Button className="w-full mt-1">
            {mode === 'magic' ? 'Send magic link' : 'Sign in'}
          </Button>
        </form>

        {mode === 'password' && (
          <div className="flex justify-center mt-3">
            <button className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n800)] hover:text-[var(--n1150)]', TRANSITION.colors)}>
              Forgot password?
            </button>
          </div>
        )}
      </div>

      {/* Footer below card */}
      <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)] mt-6')}>
        Don&apos;t have an account?{' '}
        <button className={cn(WEIGHT.medium, 'text-[var(--accent-text)] hover:underline')}>
          Sign up
        </button>
      </p>

      {/* Bottom links */}
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-4 h-12">
        <button className={cn(FONT.body, 'text-[11px]', WEIGHT.normal, 'text-[var(--n600)] hover:text-[var(--n1150)]', TRANSITION.colors)}>
          Privacy
        </button>
        <button className={cn(FONT.body, 'text-[11px]', WEIGHT.normal, 'text-[var(--n600)] hover:text-[var(--n1150)]', TRANSITION.colors)}>
          Terms
        </button>
        <button className={cn(FONT.body, 'text-[11px]', WEIGHT.normal, 'text-[var(--n600)] hover:text-[var(--n1150)]', TRANSITION.colors)}>
          Help
        </button>
      </div>
    </div>
  )
}


// ═══════════════════════════════════════════════════════
// DEMO PAGE — tabbed layout for all 3 variants
// ═══════════════════════════════════════════════════════

export default function LoginDemoPage() {
  const [active, setActive] = useState<'minimal' | 'split' | 'card'>('minimal')

  const tabs = [
    { id: 'minimal' as const, label: 'A — Minimal', accent: ACCENT_A },
    { id: 'split' as const, label: 'B — Split Screen', accent: ACCENT_B },
    { id: 'card' as const, label: 'C — Floating Card', accent: ACCENT_C },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Tab bar */}
      <div className="sticky top-0 z-50 flex items-center justify-center gap-1 h-12 bg-[var(--bg)] border-b-[0.5px] border-[var(--n400)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              'px-4 py-1.5',
              RADIUS.md,
              FONT.body,
              'text-[12px]',
              WEIGHT.medium,
              TRANSITION.colors,
              active === tab.id
                ? ACTIVE_BLACK
                : cn('text-[var(--n800)]', HOVER_SAND),
            )}
          >
            <span className="flex items-center gap-2">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: tab.accent }}
              />
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1">
        {active === 'minimal' && <LoginMinimal />}
        {active === 'split' && <LoginSplit />}
        {active === 'card' && <LoginCard />}
      </div>
    </div>
  )
}
