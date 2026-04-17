'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn, FONT, WEIGHT, TRANSITION } from '@/lib/ui'
import { ACCENTS, DEFAULT_ACCENT_ID, getAccentById, applyAccentTokens, type AccentDefinition } from './accents'
import { AccentPicker } from './AccentPicker'
import { TokenPanel } from './TokenPanel'
import { SettingsReplica } from './SettingsReplica'

/** Read accent ID from URL hash (e.g. #figma-blue) */
function readHash(): string {
  if (typeof window === 'undefined') return DEFAULT_ACCENT_ID
  const hash = window.location.hash.slice(1)
  return hash && getAccentById(hash) ? hash : DEFAULT_ACCENT_ID
}

export default function AccentDemoPage() {
  const [accentId, setAccentId] = useState(DEFAULT_ACCENT_ID)
  const [showTokens, setShowTokens] = useState(true)
  const accent = getAccentById(accentId) ?? ACCENTS[0]

  // On mount, read hash
  useEffect(() => {
    setAccentId(readHash())
  }, [])

  // Apply CSS custom properties when accent changes
  useEffect(() => {
    applyAccentTokens(accent.tokens)
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
      {/* Inject ::selection override for entire page */}
      <style>{`
        ::selection {
          background-color: var(--accent-selection) !important;
          color: var(--n1150) !important;
        }
      `}</style>

      <div
        className={cn('min-h-screen', FONT.body)}
        style={{ backgroundColor: 'var(--bg)' }}
      >
        {/* Sticky picker bar */}
        <AccentPicker activeId={accentId} onSelect={handleSelect} />

        {/* Content area: Token panel + Settings replica */}
        <div className="flex gap-6 px-6 pt-5 pb-10">
          {showTokens ? (
            <TokenPanel tokens={accent.tokens} onCollapse={() => setShowTokens(false)} />
          ) : (
            <button
              onClick={() => setShowTokens(true)}
              className={cn(
                'sticky top-[72px] flex h-7 w-7 shrink-0 items-center justify-center self-start cursor-default',
                'rounded-full border-[0.5px] border-[var(--n300)] bg-[var(--n50)]',
                'text-[var(--n600)] hover:bg-[var(--n100)]', TRANSITION.colors,
                FONT.body, 'text-[11px]',
              )}
              aria-label="Show token panel"
              title="Show tokens"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          <SettingsReplica accent={accent} />
        </div>

        {/* Footer hint */}
        <div className="flex justify-center pb-5">
          <span className={cn('text-[11px]', WEIGHT.normal, 'text-[var(--n600)]')}>
            Use arrow keys to cycle accents
          </span>
        </div>
      </div>
    </>
  )
}
