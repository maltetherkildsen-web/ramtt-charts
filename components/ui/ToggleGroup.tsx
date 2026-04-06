'use client'

import { cn } from '@/lib/utils'

type OptionItem = string | { value: string; label: string }

function normalizeOption(opt: OptionItem): { value: string; label: string } {
  return typeof opt === 'string' ? { value: opt, label: opt } : opt
}

export interface ToggleGroupProps {
  options: OptionItem[]
  value: string | string[]
  onChange: (value: string | string[]) => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'pill' | 'underline'
  multi?: boolean
  className?: string
}

export function ToggleGroup({ options, value, onChange, size = 'md', variant = 'default', multi = false, className }: ToggleGroupProps) {
  const selected = new Set(Array.isArray(value) ? value : [value])

  function handleClick(val: string) {
    if (multi) {
      const next = new Set(selected)
      if (next.has(val)) next.delete(val)
      else next.add(val)
      onChange(Array.from(next))
    } else {
      onChange(val)
    }
  }

  // ─── Underline ───
  if (variant === 'underline') {
    return (
      <div className={cn('inline-flex gap-1', className)}>
        {options.map((opt) => {
          const { value: val, label } = normalizeOption(opt)
          const isSelected = selected.has(val)
          return (
            <button key={val} onClick={() => handleClick(val)} className="inline-flex items-center justify-center transition-colors duration-150" style={{
              height: 32, padding: '0 10px', fontSize: 13,
              fontFamily: 'var(--font-label)', fontWeight: isSelected ? 500 : 400,
              color: isSelected ? 'var(--n1150)' : 'var(--n800)',
              borderBottom: isSelected ? '2px solid var(--n1150)' : '2px solid transparent',
            }}>
              {label}
            </button>
          )
        })}
      </div>
    )
  }

  // ─── Pill ───
  if (variant === 'pill') {
    const h = size === 'sm' ? 24 : 28
    const fs = size === 'sm' ? 11 : 12
    return (
      <div className={cn('inline-flex gap-1', className)}>
        {options.map((opt) => {
          const { value: val, label } = normalizeOption(opt)
          const isSelected = selected.has(val)
          return (
            <button key={val} onClick={() => handleClick(val)} className={cn('inline-flex items-center justify-center transition-colors duration-150', !isSelected && 'hover:bg-[var(--n200)]')} style={{
              height: h, padding: '0 10px', fontSize: fs, borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-label)', fontWeight: isSelected ? 500 : 400,
              backgroundColor: isSelected ? 'var(--n400)' : 'transparent',
              color: isSelected ? 'var(--n1150)' : 'var(--n800)',
              border: '0.5px solid var(--n400)',
            }}>
              {label}
            </button>
          )
        })}
      </div>
    )
  }

  // ─── Default connected ───
  const h = size === 'sm' ? 24 : size === 'lg' ? 32 : 28
  const fs = size === 'sm' ? 11 : 12
  const px = size === 'sm' ? 8 : 10

  return (
    <div className={cn('inline-flex overflow-hidden', className)} style={{ border: '0.5px solid var(--n400)', borderRadius: 'var(--radius-md)' }}>
      {options.map((opt, i) => {
        const { value: val, label } = normalizeOption(opt)
        const isSelected = selected.has(val)
        const isLast = i === options.length - 1
        return (
          <button key={val} onClick={() => handleClick(val)} className="inline-flex items-center justify-center transition-colors duration-150" style={{
            height: h, padding: `0 ${px}px`, fontSize: fs,
            fontFamily: 'var(--font-label)', fontWeight: isSelected ? 500 : 400,
            backgroundColor: isSelected ? 'var(--n400)' : 'transparent',
            color: isSelected ? 'var(--n1150)' : 'var(--n800)',
            borderRight: isLast ? 'none' : '0.5px solid var(--n400)',
          }}>
            {label}
          </button>
        )
      })}
    </div>
  )
}
