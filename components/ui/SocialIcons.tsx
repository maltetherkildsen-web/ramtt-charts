// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { cn, TRANSITION } from '@/lib/ui'

type Platform = 'linkedin' | 'x' | 'youtube' | 'github' | 'strava'

export interface SocialIconsProps {
  links: { platform: Platform; href: string }[]
  /** Dark surfaces invert colors */
  dark?: boolean
  className?: string
}

const ICONS: Record<Platform, React.ReactNode> = {
  linkedin: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.73-3.96 4.73 0V21H22v-7.93c0-6.17-7-5.94-8.72-2.91l.04-1.68Z"
        fill="currentColor"
      />
    </svg>
  ),
  x: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"
        fill="currentColor"
      />
    </svg>
  ),
  youtube: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z"
        fill="currentColor"
      />
    </svg>
  ),
  github: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
        fill="currentColor"
      />
    </svg>
  ),
  strava: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066l-2.084 4.116ZM7.478 14.556L12 4.68l2.195 4.328h3.066L12 0 6.754 9.008h6.489l-2.195 4.328L7.478 14.556h5.93"
        fill="currentColor"
      />
    </svg>
  ),
}

const SocialIcons = forwardRef<HTMLDivElement, SocialIconsProps>(
  function SocialIcons({ links, dark = false, className }, ref) {
    return (
      <div ref={ref} className={cn('flex items-center gap-3', className)}>
        {links.map(({ platform, href }) => (
          <a
            key={platform}
            href={href}
            aria-label={platform}
            className={cn(
              TRANSITION.colors,
              dark
                ? 'text-[var(--dark-muted)] hover:text-[var(--dark-text)]'
                : 'text-[var(--n600)] hover:text-[var(--n1150)]',
            )}
          >
            {ICONS[platform]}
          </a>
        ))}
      </div>
    )
  },
)

SocialIcons.displayName = 'SocialIcons'
export { SocialIcons }
