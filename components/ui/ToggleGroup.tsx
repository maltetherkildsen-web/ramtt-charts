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
  variant?: 'default' | 'pill'
  multi?: boolean
  className?: string
}

const SIZE: Record<string, string> = {
  sm: 'px-2.5 py-[4px] text-[12px]',
  md: 'px-3.5 py-[6px] text-[13px]',
  lg: 'px-4 py-[7px] text-[14px]',
}

export function ToggleGroup({
  options,
  value,
  onChange,
  size = 'md',
  variant = 'default',
  multi = false,
  className,
}: ToggleGroupProps) {
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

  const isPill = variant === 'pill'

  if (isPill) {
    return (
      <div className={cn('inline-flex gap-1.5', className)}>
        {options.map((opt) => {
          const { value: val, label } = normalizeOption(opt)
          const isSelected = selected.has(val)
          return (
            <button
              key={val}
              onClick={() => handleClick(val)}
              className={cn(
                'inline-flex items-center justify-center rounded-full transition-colors duration-150',
                SIZE[size],
              )}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: isSelected ? 500 : 450,
                backgroundColor: isSelected ? 'var(--n1150)' : 'transparent',
                color: isSelected ? 'var(--n50)' : 'var(--n800)',
                border: isSelected ? '0.5px solid var(--n1150)' : '0.5px solid var(--n400)',
              }}
            >
              {label}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div
      className={cn('inline-flex overflow-hidden', className)}
      style={{
        border: '0.5px solid var(--n400)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      {options.map((opt, i) => {
        const { value: val, label } = normalizeOption(opt)
        const isSelected = selected.has(val)
        const isLast = i === options.length - 1

        return (
          <button
            key={val}
            onClick={() => handleClick(val)}
            className={cn(
              'inline-flex items-center justify-center transition-colors duration-150',
              SIZE[size],
              !isSelected && 'hover:bg-[var(--n200)]',
            )}
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: isSelected ? 500 : 450,
              backgroundColor: isSelected ? 'var(--n1150)' : 'transparent',
              color: isSelected ? 'var(--n50)' : 'var(--n800)',
              borderRight: isLast ? 'none' : '0.5px solid var(--n400)',
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
