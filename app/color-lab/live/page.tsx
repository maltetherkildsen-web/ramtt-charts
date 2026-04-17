'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { oklchToHex, oklchToRGB, oklchToHSL, findMaxChroma, oklchCSS } from '@/lib/oklch'
import { cn, FONT, WEIGHT, TRANSITION, SLIDER_TRACK_HEIGHT } from '@/lib/ui'
import { Button, Checkbox } from '@/components/ui'

/* ═══════════════════════════════════════════════════════════════════════════
   RAMTT Color Lab — Live OKLCH Explorer
   Interactive sliders for Hue, Lightness, Chroma with OKLCH gradients.
   ═══════════════════════════════════════════════════════════════════════════ */

const FIGMA = { L: 0.67, C: 0.183, H: 249.26 }

const PRESETS = [
  { name: 'Figma ref',       ...FIGMA },
  { name: 'Matched red',     L: 0.67, C: 0.183, H: 29 },
  { name: 'Matched violet',  L: 0.67, C: 0.183, H: 295 },
  { name: 'Matched teal',    L: 0.67, C: 0.126, H: 175 },
  { name: 'Matched magenta', L: 0.67, C: 0.183, H: 328 },
  { name: 'Matched pink',    L: 0.67, C: 0.183, H: 355 },
  { name: 'Deep blue',       L: 0.55, C: 0.20,  H: 249.26 },
  { name: 'Soft violet',     L: 0.80, C: 0.12,  H: 295 },
  { name: 'Tint pink',       L: 0.93, C: 0.05,  H: 355 },
] as const

// ── Lock icon (inline SVG) ──

function LockButton({ locked, onToggle }: { locked: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'flex items-center justify-center w-5 h-5 rounded-[3px]',
        locked ? 'text-[var(--n1150)] bg-[var(--n200)]' : 'text-[var(--n400)]',
        'hover:bg-[var(--n200)]',
        TRANSITION.colors,
      )}
      aria-label={locked ? 'Unlock' : 'Lock'}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <rect x="2.5" y="6" width="7" height="4.5" rx="1" />
        {locked
          ? <path d="M4 6V4a2 2 0 014 0v2" />
          : <path d="M8 6V4a2 2 0 00-4 0" />
        }
      </svg>
    </button>
  )
}

// ── Color slider with gradient track ──

function ColorSlider({ value, onChange, min, max, step, gradient, label, valueDisplay, locked, onToggleLock, warning }: {
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  gradient: string
  label: string
  valueDisplay: string
  locked: boolean
  onToggleLock: () => void
  warning?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LockButton locked={locked} onToggle={onToggleLock} />
          <span className={cn(FONT.body, WEIGHT.strong, 'text-[12px] text-[var(--n600)]')}>
            {label}
          </span>
        </div>
        <span className={cn(FONT.body, WEIGHT.strong, 'text-[13px] tabular-nums text-[var(--n1150)]')}>
          {valueDisplay}
        </span>
      </div>
      <div className="relative" style={{ height: 24 }}>
        {/* Gradient track */}
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-[2px] pointer-events-none"
          style={{ height: SLIDER_TRACK_HEIGHT, background: gradient }}
        />
        {/* Range input (transparent bg, visible thumb via .ramtt-slider) */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="ramtt-slider w-full absolute top-1/2 -translate-y-1/2"
          style={{ background: 'transparent', height: SLIDER_TRACK_HEIGHT }}
        />
      </div>
      {warning && (
        <span className={cn(FONT.body, 'text-[11px] text-[var(--warning)]')}>
          {warning}
        </span>
      )}
    </div>
  )
}

// ── Copyable output row ──

function OutputRow({ label, value, copied, onCopy }: {
  label: string; value: string; copied: boolean; onCopy: () => void
}) {
  return (
    <button
      onClick={onCopy}
      className={cn(
        'flex items-center justify-between w-full py-2 px-3 rounded-[2px] text-left',
        'hover:bg-[var(--n200)]',
        TRANSITION.colors,
      )}
    >
      <span className={cn(FONT.body, WEIGHT.normal, 'text-[11px] text-[var(--n600)]')}>
        {label}
      </span>
      <span className={cn(FONT.body, WEIGHT.medium, 'text-[13px] tabular-nums', copied ? 'text-[var(--positive)]' : 'text-[var(--n1150)]')}>
        {copied ? 'Kopieret' : value}
      </span>
    </button>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function LiveColorLab() {
  const [H, setH] = useState(FIGMA.H)
  const [L, setL] = useState(FIGMA.L)
  const [C, setC] = useState(FIGMA.C)
  const [lockH, setLockH] = useState(false)
  const [lockL, setLockL] = useState(false)
  const [lockC, setLockC] = useState(false)
  const [showFigma, setShowFigma] = useState(false)
  const [history, setHistory] = useState<Array<{ L: number; C: number; H: number; hex: string }>>([])
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const historyTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  // ── Computed values ──
  const { hex, inGamut } = oklchToHex(L, C, H)
  const rgb = oklchToRGB(L, C, H)
  const hsl = oklchToHSL(L, C, H)
  const oklchStr = `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${Math.round(H)})`
  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`

  // ── Slider gradients ──
  const hueGrad = useMemo(() => {
    const stops = Array.from({ length: 25 }, (_, i) => `oklch(${L} ${C} ${(i / 24) * 360})`)
    return `linear-gradient(to right, ${stops.join(', ')})`
  }, [L, C])

  const lGrad = useMemo(() => {
    const stops = [0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90, 0.95]
    return `linear-gradient(to right, ${stops.map(l => `oklch(${l} ${C} ${H})`).join(', ')})`
  }, [H, C])

  const cGrad = useMemo(() => {
    const maxC = findMaxChroma(L, H)
    const stops = Array.from({ length: 10 }, (_, i) => `oklch(${L} ${(i / 9) * Math.max(maxC, 0.01)} ${H})`)
    return `linear-gradient(to right, ${stops.join(', ')})`
  }, [L, H])

  // ── History (debounced) ──
  useEffect(() => {
    clearTimeout(historyTimer.current)
    historyTimer.current = setTimeout(() => {
      setHistory(prev => {
        const last = prev[0]
        if (last && last.H === H && last.L === L && last.C === C) return prev
        const { hex: h } = oklchToHex(L, C, H)
        return [{ H, L, C, hex: h }, ...prev].slice(0, 8)
      })
    }, 800)
    return () => clearTimeout(historyTimer.current)
  }, [H, L, C])

  // ── Presets ──
  const applyPreset = useCallback((p: { L: number; C: number; H: number }) => {
    if (!lockH) setH(p.H)
    if (!lockL) setL(p.L)
    if (!lockC) setC(p.C)
  }, [lockH, lockL, lockC])

  // ── Copy ──
  const copy = useCallback(async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 1500)
  }, [])

  // ── Keyboard shortcuts ──
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      const shift = e.shiftKey
      switch (e.key) {
        case 'ArrowLeft':
          if (!lockH) { e.preventDefault(); setH(prev => ((prev - (shift ? 10 : 1)) % 360 + 360) % 360) }
          break
        case 'ArrowRight':
          if (!lockH) { e.preventDefault(); setH(prev => (prev + (shift ? 10 : 1)) % 360) }
          break
        case 'ArrowUp':
          if (!lockL) { e.preventDefault(); setL(prev => Math.min(0.95, prev + (shift ? 0.05 : 0.01))) }
          break
        case 'ArrowDown':
          if (!lockL) { e.preventDefault(); setL(prev => Math.max(0.20, prev - (shift ? 0.05 : 0.01))) }
          break
        case '[':
          if (!lockC) { e.preventDefault(); setC(prev => Math.max(0, prev - (shift ? 0.02 : 0.005))) }
          break
        case ']':
          if (!lockC) { e.preventDefault(); setC(prev => Math.min(0.37, prev + (shift ? 0.02 : 0.005))) }
          break
        case 'r':
          if (!e.metaKey && !e.ctrlKey) { applyPreset(FIGMA) }
          break
        case 'c':
          if (!e.metaKey && !e.ctrlKey) { copy(hex, 'hex') }
          break
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lockH, lockL, lockC, hex, applyPreset, copy])

  // ── Gamut warning ──
  const gamutWarning = !inGamut ? 'Out of sRGB gamut — hex er clamped' : undefined

  return (
    <main className="h-screen bg-[var(--bg)] overflow-hidden">
      <div className="flex flex-col lg:flex-row h-full">

        {/* ── Color preview (left) ── */}
        <div className={cn('h-[60vh] lg:h-full lg:flex-[6]', showFigma && 'flex')}>
          <div
            className={cn(showFigma ? 'flex-1' : 'w-full h-full')}
            style={{ backgroundColor: oklchCSS(L, C, H) }}
          />
          {showFigma && (
            <div
              className="flex-1 relative"
              style={{ backgroundColor: oklchCSS(FIGMA.L, FIGMA.C, FIGMA.H) }}
            >
              <span
                className={cn(FONT.body, WEIGHT.normal, 'text-[11px] absolute bottom-4 right-4')}
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                Figma ref
              </span>
            </div>
          )}
        </div>

        {/* ── Control panel (right) ── */}
        <div className="flex-1 lg:flex-[4] overflow-y-auto p-6 lg:p-8 flex flex-col gap-8">

          {/* Title */}
          <div>
            <h1 className={cn(FONT.body, WEIGHT.medium, 'text-[18px] text-[var(--n1150)]')}>
              Live OKLCH Explorer
            </h1>
            <p className={cn(FONT.body, WEIGHT.normal, 'text-[12px] text-[var(--n600)] mt-1')}>
              Drag sliders or use keyboard shortcuts
            </p>
          </div>

          {/* ── Sliders ── */}
          <div className="flex flex-col gap-5">
            <ColorSlider
              label="Hue (H)"
              value={H}
              onChange={v => setH(v)}
              min={0} max={360} step={1}
              gradient={hueGrad}
              valueDisplay={`${Math.round(H)}°`}
              locked={lockH}
              onToggleLock={() => setLockH(p => !p)}
            />
            <ColorSlider
              label="Lightness (L)"
              value={L}
              onChange={v => setL(Math.round(v * 100) / 100)}
              min={0.20} max={0.95} step={0.01}
              gradient={lGrad}
              valueDisplay={`${L.toFixed(2)} (${Math.round(L * 100)}%)`}
              locked={lockL}
              onToggleLock={() => setLockL(p => !p)}
            />
            <ColorSlider
              label="Chroma (C)"
              value={C}
              onChange={v => setC(Math.round(v * 1000) / 1000)}
              min={0} max={0.37} step={0.005}
              gradient={cGrad}
              valueDisplay={C.toFixed(3)}
              locked={lockC}
              onToggleLock={() => setLockC(p => !p)}
              warning={gamutWarning}
            />
          </div>

          {/* ── Figma comparison toggle ── */}
          <Checkbox
            checked={showFigma}
            onChange={setShowFigma}
            label="Vis Figma blå ved siden af"
          />

          {/* ── Output values (click to copy) ── */}
          <div>
            <p className={cn(FONT.body, WEIGHT.strong, 'text-[11px] text-[var(--n600)] mb-2')}>
              Output — klik for at kopiere
            </p>
            <div className="flex flex-col">
              <OutputRow label="OKLCH" value={oklchStr} copied={copiedKey === 'oklch'} onCopy={() => copy(oklchStr, 'oklch')} />
              <OutputRow label="Hex" value={hex + (!inGamut ? ' (clamped)' : '')} copied={copiedKey === 'hex'} onCopy={() => copy(hex, 'hex')} />
              <OutputRow label="RGB" value={rgbStr} copied={copiedKey === 'rgb'} onCopy={() => copy(rgbStr, 'rgb')} />
              <OutputRow label="HSL" value={hslStr} copied={copiedKey === 'hsl'} onCopy={() => copy(hslStr, 'hsl')} />
            </div>
          </div>

          {/* ── Presets ── */}
          <div>
            <p className={cn(FONT.body, WEIGHT.strong, 'text-[11px] text-[var(--n600)] mb-2')}>
              Presets
            </p>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map(p => (
                <Button
                  key={p.name}
                  variant="outline"
                  size="sm"
                  onClick={() => applyPreset(p)}
                >
                  {p.name}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => applyPreset(FIGMA)}
              >
                Reset
              </Button>
            </div>
          </div>

          {/* ── History ── */}
          {history.length > 0 && (
            <div>
              <p className={cn(FONT.body, WEIGHT.strong, 'text-[11px] text-[var(--n600)] mb-2')}>
                Historie
              </p>
              <div className="flex gap-1.5">
                {history.map((entry, i) => (
                  <button
                    key={i}
                    onClick={() => applyPreset(entry)}
                    className={cn('flex flex-col items-center gap-1 rounded-[2px]', 'hover:bg-[var(--n200)] p-1.5', TRANSITION.colors)}
                  >
                    <div
                      className="rounded-[2px]"
                      style={{ width: 32, height: 32, backgroundColor: oklchCSS(entry.L, entry.C, entry.H) }}
                    />
                    <span className={cn(FONT.body, 'text-[9px] tabular-nums text-[var(--n600)]')}>
                      {entry.hex}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Keyboard shortcuts ── */}
          <div className="mt-auto pt-4">
            <p className={cn(FONT.body, WEIGHT.strong, 'text-[10px] text-[var(--n400)] mb-1.5')}>
              Keyboard shortcuts
            </p>
            <div className={cn(FONT.body, 'text-[10px] text-[var(--n400)] leading-relaxed tabular-nums')}>
              <span className="inline-block w-24">← → / shift</span> H ±1 / ±10<br/>
              <span className="inline-block w-24">↑ ↓ / shift</span> L ±0.01 / ±0.05<br/>
              <span className="inline-block w-24">[ ] / shift</span> C ±0.005 / ±0.02<br/>
              <span className="inline-block w-24">R</span> Reset to Figma ref<br/>
              <span className="inline-block w-24">C</span> Copy hex
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
