// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * OAuthButton — branded OAuth connect/disconnect buttons.
 *
 * Supports major fitness platforms: Strava, Garmin, Wahoo, Whoop, Oura, Polar, Fitbit.
 * Shows provider-specific colors and inline SVG logos.
 *
 * Usage:
 *   <OAuthButton provider="strava" onConnect={() => handleStrava()} />
 *   <OAuthButton provider="garmin" connected onDisconnect={() => handleDisconnect()} />
 */

import { forwardRef, type MouseEventHandler } from 'react'
import { cn } from '@/lib/utils'
import { WEIGHT, RADIUS, TRANSITION } from '@/lib/ui'

export type OAuthProvider = 'strava' | 'garmin' | 'wahoo' | 'whoop' | 'oura' | 'polar' | 'fitbit'

export interface OAuthButtonProps {
  /** The OAuth provider. */
  provider: OAuthProvider
  /** Whether the account is currently connected. */
  connected?: boolean
  /** Called when clicking connect. */
  onConnect?: MouseEventHandler<HTMLButtonElement>
  /** Called when clicking disconnect. */
  onDisconnect?: MouseEventHandler<HTMLButtonElement>
  /** Loading state. */
  loading?: boolean
  className?: string
}

interface ProviderConfig {
  name: string
  color: string
  textColor: string
  logo: string
}

const PROVIDERS: Record<OAuthProvider, ProviderConfig> = {
  strava: {
    name: 'Strava',
    color: '#FC4C02',
    textColor: '#ffffff',
    logo: 'M 12 2 L 8 14 h 3 l 1 -4 1 4 h 3 z M 16 14 l -2 4 -2 -4 h -1.5 L 14 22 l 3.5 -8 z',
  },
  garmin: {
    name: 'Garmin',
    color: '#007DC5',
    textColor: '#ffffff',
    logo: 'M 12 4 C 7.58 4 4 7.58 4 12 s 3.58 8 8 8 s 8 -3.58 8 -8 S 16.42 4 12 4 z m 0 14 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 s 6 2.69 6 6 s -2.69 6 -6 6 z m -1 -9 v 4 h 3 v -1.5 h -1.5 v -2.5 z',
  },
  wahoo: {
    name: 'Wahoo',
    color: '#00A3E0',
    textColor: '#ffffff',
    logo: 'M 3 7 l 3 10 l 3 -6 l 3 6 l 3 -6 l 3 6 l 3 -10',
  },
  whoop: {
    name: 'WHOOP',
    color: '#44B76E',
    textColor: '#ffffff',
    logo: 'M 12 4 C 7.58 4 4 7.58 4 12 s 3.58 8 8 8 s 8 -3.58 8 -8 S 16.42 4 12 4 z m 0 14 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 s 6 2.69 6 6 s -2.69 6 -6 6 z',
  },
  oura: {
    name: 'Oura',
    color: '#1A1A1A',
    textColor: '#ffffff',
    logo: 'M 12 3 C 7.03 3 3 7.03 3 12 s 4.03 9 9 9 s 9 -4.03 9 -9 S 16.97 3 12 3 z m 0 16 c -3.87 0 -7 -3.13 -7 -7 s 3.13 -7 7 -7 s 7 3.13 7 7 s -3.13 7 -7 7 z m 0 -11 c -2.21 0 -4 1.79 -4 4 s 1.79 4 4 4 s 4 -1.79 4 -4 s -1.79 -4 -4 -4 z',
  },
  polar: {
    name: 'Polar',
    color: '#D6001C',
    textColor: '#ffffff',
    logo: 'M 12 2 C 6.48 2 2 6.48 2 12 s 4.48 10 10 10 s 10 -4.48 10 -10 S 17.52 2 12 2 z m -2 15 l -5 -5 l 1.41 -1.41 L 10 14.17 l 7.59 -7.59 L 19 8 l -9 9 z',
  },
  fitbit: {
    name: 'Fitbit',
    color: '#00B0B9',
    textColor: '#ffffff',
    logo: 'M 12 6 a 2 2 0 1 0 0 -4 a 2 2 0 0 0 0 4 z m 0 6 a 2 2 0 1 0 0 -4 a 2 2 0 0 0 0 4 z m 0 6 a 2 2 0 1 0 0 -4 a 2 2 0 0 0 0 4 z m 0 6 a 2 2 0 1 0 0 -4 a 2 2 0 0 0 0 4 z m -5 -15 a 1.5 1.5 0 1 0 0 -3 a 1.5 1.5 0 0 0 0 3 z m 0 6 a 1.5 1.5 0 1 0 0 -3 a 1.5 1.5 0 0 0 0 3 z m 0 6 a 1.5 1.5 0 1 0 0 -3 a 1.5 1.5 0 0 0 0 3 z m 10 -12 a 1.5 1.5 0 1 0 0 -3 a 1.5 1.5 0 0 0 0 3 z m 0 6 a 1.5 1.5 0 1 0 0 -3 a 1.5 1.5 0 0 0 0 3 z m 0 6 a 1.5 1.5 0 1 0 0 -3 a 1.5 1.5 0 0 0 0 3 z',
  },
}

const OAuthButton = forwardRef<HTMLButtonElement, OAuthButtonProps>(
  ({ provider, connected = false, onConnect, onDisconnect, loading = false, className }, ref) => {
    const config = PROVIDERS[provider]

    return (
      <button
        ref={ref}
        onClick={connected ? onDisconnect : onConnect}
        disabled={loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 h-10 px-4 cursor-default',
          RADIUS.md,
          TRANSITION.colors,
          WEIGHT.medium,
          'text-[13px] select-none',
          connected
            ? 'bg-(--n100) text-(--n800) hover:bg-(--n200)'
            : '',
          loading && 'opacity-60 pointer-events-none',
          className,
        )}
        style={
          connected
            ? { border: `0.5px solid var(--n300)` }
            : { backgroundColor: config.color, color: config.textColor, border: 'none' }
        }
      >
        {/* Provider logo */}
        <svg
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke={connected ? 'var(--n700)' : config.textColor}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={config.logo} />
        </svg>

        {/* Label */}
        <span>
          {loading
            ? 'Connecting…'
            : connected
              ? `Disconnect ${config.name}`
              : `Connect with ${config.name}`}
        </span>

        {/* Connected indicator */}
        {connected && !loading && (
          <span className="w-1.5 h-1.5 rounded-[30%] bg-green-500 ml-0.5" />
        )}
      </button>
    )
  },
)

OAuthButton.displayName = 'OAuthButton'

export { OAuthButton }
