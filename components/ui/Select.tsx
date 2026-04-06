'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  className?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ options, value, onChange, placeholder, label, className }, ref) {
    return (
      <div className={cn('flex flex-col', className)}>
        {label && (
          <label
            className="mb-1.5 text-[10px] uppercase"
            style={{
              fontFamily: 'var(--font-label)',
              fontWeight: 600,
              letterSpacing: '0.10em',
              color: 'var(--n600)',
            }}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            value={value}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
            className={cn(
              'w-full appearance-none rounded-[var(--radius-md)] bg-white pr-8 outline-none transition-colors duration-150',
              'focus:border-[var(--n800)]',
            )}
            style={{
              border: '0.5px solid var(--n400)',
              height: 40,
              padding: '8px 12px',
              paddingRight: 32,
              fontFamily: 'var(--font-sans)',
              fontWeight: 450,
              fontSize: 14,
              color: value ? 'var(--n1150)' : 'var(--n600)',
            }}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* CSS-only chevron */}
          <div
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
            style={{
              width: 0,
              height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '5px solid var(--n600)',
            }}
          />
        </div>
      </div>
    )
  },
)
