'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn, FONT, WEIGHT } from '@/lib/ui'
import { ACCENTS, DEFAULT_ACCENT_ID, getAccentById, applyAccentTokens, type AccentDefinition } from './accents'
import { AccentPicker } from './AccentPicker'
import { TokenPanel } from './TokenPanel'
import { DemoSections } from './DemoSections'

/** Read accent ID from URL hash (e.g. #figma-blue) */
function readHash(): string {
  if (typeof window === 'undefined') return DEFAULT_ACCENT_ID
  const hash = window.location.hash.slice(1)
  return hash && getAccentById(hash) ? hash : DEFAULT_ACCENT_ID
}

export default function AccentDemoPage() {
  const [accentId, setAccentId] = useState(DEFAULT_ACCENT_ID)
  const accent = getAccentById(accentId) ?? ACCENTS[0]

  // On mount, read hash
  useEffect(() => {
    setAccentId(readHash())
  }, [])

  // Apply CSS custom properties when accent changes
  useEffect(() => {
    applyAccentTokens(accent.tokens)
    // Update hash without scrolling
    const newHash = `#${accent.id}`
    if (window.location.hash !== newHash) {
      history.replaceState(null, '', newHash)
    }
  }, [accent])

  // Keyboard navigation: left/right to cycle accents
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      const currentIndex = ACCENTS.findIndex((a) => a.id === accentId)
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        const prev = (currentIndex - 1 + ACCENTS.length) % ACCENTS.length
        setAccentId(ACCENTS[prev].id)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        const next = (currentIndex + 1) % ACCENTS.length
        setAccentId(ACCENTS[next].id)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [accentId])

  // Handle hash changes from browser navigation
  useEffect(() => {
    function onHashChange() {
      setAccentId(readHash())
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const handleSelect = useCallback((a: AccentDefinition) => {
    setAccentId(a.id)
  }, [])

  return (
    <>
      {/* Inject ::selection override for the accent selection color */}
      <style>{`
        .accent-selection ::selection {
          background-color: var(--accent-selection);
          color: var(--n1150);
        }
        /* Override input focus ring to use accent */
        .accent-input-override input:focus-visible {
          box-shadow: 0 0 0 2px var(--accent);
          border-color: var(--accent);
        }
      `}</style>

      <div
        className={cn('min-h-screen', FONT.body)}
        style={{ backgroundColor: 'var(--bg)' }}
      >
        {/* Sticky picker bar */}
        <AccentPicker activeId={accentId} onSelect={handleSelect} />

        {/* Content area: Token panel + Demo sections */}
        <div className="flex gap-8 px-8 pt-6">
          <TokenPanel tokens={accent.tokens} />
          <DemoSections accent={accent} />
        </div>

        {/* Footer hint */}
        <div className="flex justify-center pb-6">
          <span className={cn('text-[11px]', WEIGHT.normal, 'text-[var(--n600)]')}>
            ← → arrow keys to cycle accents
          </span>
        </div>
      </div>
    </>
  )
}
