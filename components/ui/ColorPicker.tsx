// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ColorPicker — hue/saturation pad + lightness slider + hex input.
 *
 * Uses HSL color model internally, outputs hex string.
 * Includes RAMTT preset swatches for quick selection.
 */

import { forwardRef, useState, useRef, useCallback, useEffect, type ChangeEvent } from 'react'
import { cn } from '@/lib/utils'
import { WEIGHT, RADIUS, BORDER, TRANSITION } from '@/lib/ui'

export interface ColorPickerProps {
  /** Current color in hex (e.g. "#4A90D9"). */
  value?: string
  /** Called when color changes. */
  onChange?: (hex: string) => void
  /** Preset color swatches. Defaults to RAMTT palette. */
  presets?: string[]
  /** Width in px. Default: 240. */
  width?: number
  className?: string
}

const DEFAULT_PRESETS = [
  '#4A90D9', '#22c55e', '#eab308', '#f97316', '#ef4444', '#dc2626',
  '#8b5cf6', '#ec4899', '#14b8a6', '#94a3b8', '#1e293b', '#ffffff',
]

// ─── Color conversion helpers ───

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100
  const ln = l / 100
  const a = sn * Math.min(ln, 1 - ln)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function isValidHex(hex: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(hex)
}

// ─── Component ───

const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  ({ value = '#4A90D9', onChange, presets = DEFAULT_PRESETS, width = 240, className }, ref) => {
    const [hsl, setHsl] = useState<[number, number, number]>(() => hexToHsl(value))
    const [hexInput, setHexInput] = useState(value)
    const padRef = useRef<HTMLDivElement>(null)
    const isDragging = useRef(false)

    // Sync external value changes
    useEffect(() => {
      if (isValidHex(value)) {
        setHsl(hexToHsl(value))
        setHexInput(value)
      }
    }, [value])

    const emitColor = useCallback(
      (h: number, s: number, l: number) => {
        const hex = hslToHex(h, s, l)
        setHexInput(hex)
        onChange?.(hex)
      },
      [onChange],
    )

    // Pad interaction (hue = X, saturation = Y)
    const handlePadPointer = useCallback(
      (e: React.PointerEvent | PointerEvent) => {
        const pad = padRef.current
        if (!pad) return
        const rect = pad.getBoundingClientRect()
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
        const h = Math.round(x * 360)
        const s = Math.round((1 - y) * 100)
        const newHsl: [number, number, number] = [h, s, hsl[2]]
        setHsl(newHsl)
        emitColor(h, s, hsl[2])
      },
      [hsl, emitColor],
    )

    const handlePadDown = useCallback(
      (e: React.PointerEvent) => {
        isDragging.current = true
        handlePadPointer(e)
        const handleMove = (ev: PointerEvent) => {
          if (isDragging.current) handlePadPointer(ev)
        }
        const handleUp = () => {
          isDragging.current = false
          document.removeEventListener('pointermove', handleMove)
          document.removeEventListener('pointerup', handleUp)
        }
        document.addEventListener('pointermove', handleMove)
        document.addEventListener('pointerup', handleUp)
      },
      [handlePadPointer],
    )

    // Lightness slider
    const handleLightness = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const l = parseInt(e.target.value, 10)
        const newHsl: [number, number, number] = [hsl[0], hsl[1], l]
        setHsl(newHsl)
        emitColor(hsl[0], hsl[1], l)
      },
      [hsl, emitColor],
    )

    // Hex input
    const handleHexChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value
        setHexInput(v)
        if (isValidHex(v)) {
          const newHsl = hexToHsl(v)
          setHsl(newHsl)
          onChange?.(v)
        }
      },
      [onChange],
    )

    // Preset click
    const handlePreset = useCallback(
      (hex: string) => {
        const newHsl = hexToHsl(hex)
        setHsl(newHsl)
        setHexInput(hex)
        onChange?.(hex)
      },
      [onChange],
    )

    const currentHex = hslToHex(hsl[0], hsl[1], hsl[2])

    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-2', className)}
        style={{ width }}
      >
        {/* Hue/Saturation pad */}
        <div
          ref={padRef}
          className={cn('relative cursor-default', RADIUS.md)}
          style={{
            width: '100%',
            height: width * 0.6,
            background: `linear-gradient(to bottom, white, transparent),
              linear-gradient(to right,
                hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%),
                hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%)
              )`,
            border: BORDER.default,
            touchAction: 'none',
          }}
          onPointerDown={handlePadDown}
        >
          {/* Cursor indicator */}
          <div
            className="absolute w-3 h-3 rounded-full border-2 border-white shadow-sm pointer-events-none"
            style={{
              left: `${(hsl[0] / 360) * 100}%`,
              top: `${(1 - hsl[1] / 100) * 100}%`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: currentHex,
            }}
          />
        </div>

        {/* Lightness slider */}
        <div className="flex items-center gap-2">
          <span className={cn('text-[11px] text-(--n600)', WEIGHT.book)}>L</span>
          <input
            type="range"
            min={0}
            max={100}
            value={hsl[2]}
            onChange={handleLightness}
            className="flex-1 h-1.5 appearance-none rounded-full bg-(--n200) cursor-default"
            style={{ accentColor: currentHex }}
          />
          <span className={cn('text-[11px] text-(--n700) tabular-nums w-7 text-right', WEIGHT.book)}>
            {hsl[2]}%
          </span>
        </div>

        {/* Hex input + preview */}
        <div className="flex items-center gap-2">
          <div
            className={cn('w-7 h-7 shrink-0', RADIUS.md)}
            style={{ backgroundColor: currentHex, border: BORDER.default }}
          />
          <input
            type="text"
            value={hexInput}
            onChange={handleHexChange}
            maxLength={7}
            className={cn(
              'flex-1 h-7 px-2 text-[12px] tabular-nums bg-(--n100) text-(--n1150)',
              RADIUS.md,
              TRANSITION.colors,
              WEIGHT.book,
              'focus:outline-none focus:ring-1 focus:ring-(--n400)',
            )}
            style={{ border: BORDER.default }}
            spellCheck={false}
          />
        </div>

        {/* Preset swatches */}
        {presets.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {presets.map((hex) => (
              <button
                key={hex}
                onClick={() => handlePreset(hex)}
                className={cn(
                  'w-5 h-5 rounded-full cursor-default',
                  TRANSITION.colors,
                  hex === currentHex && 'ring-1.5 ring-(--n500) ring-offset-1 ring-offset-(--n50)',
                )}
                style={{ backgroundColor: hex, border: BORDER.default }}
                title={hex}
              />
            ))}
          </div>
        )}
      </div>
    )
  },
)

ColorPicker.displayName = 'ColorPicker'

export { ColorPicker }
