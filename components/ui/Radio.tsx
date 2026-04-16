// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import {
  createContext,
  useContext,
  useId,
  forwardRef,
  type ReactNode,
} from 'react'
import { cn, FONT, WEIGHT, LABEL_STYLE, TRANSITION, FOCUS_RING } from '@/lib/ui'

// ─── Context ───

interface RadioGroupContextValue {
  value: string
  onChange: (value: string) => void
  name: string
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

function useRadioGroup() {
  const ctx = useContext(RadioGroupContext)
  if (!ctx) throw new Error('Radio must be used within <Radio.Group>')
  return ctx
}

// ─── Group ───

interface RadioGroupProps {
  value: string
  onChange: (value: string) => void
  label?: string
  children: ReactNode
  className?: string
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ value, onChange, label, children, className }, ref) => {
    const name = useId()

    return (
      <div ref={ref} role="radiogroup" aria-label={label} className={className}>
        {label && (
          <div className={cn(LABEL_STYLE, 'mb-2')}>
            {label}
          </div>
        )}
        <RadioGroupContext.Provider value={{ value, onChange, name }}>
          <div className="flex flex-col gap-2">
            {children}
          </div>
        </RadioGroupContext.Provider>
      </div>
    )
  },
)
RadioGroup.displayName = 'Radio.Group'

// ─── Radio ───

interface RadioProps {
  value: string
  label: string
  description?: string
  disabled?: boolean
  className?: string
}

function RadioItem({ value, label, description, disabled = false, className }: RadioProps) {
  const { value: groupValue, onChange, name } = useRadioGroup()
  const id = useId()
  const isSelected = groupValue === value

  return (
    <div className={cn('flex items-start gap-2', disabled && 'opacity-50 pointer-events-none', className)}>
      <span className="relative inline-flex shrink-0 mt-px">
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={isSelected}
          onChange={() => onChange(value)}
          disabled={disabled}
          className="sr-only peer"
        />
        <span
          className={cn(
            'flex items-center justify-center rounded-full',
            'border-[0.5px]',
            TRANSITION.colors,
            'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--n600)]',
            isSelected
              ? 'border-[var(--n1150)]'
              : 'border-[var(--n400)] bg-[var(--n50)] hover:border-[var(--n800)]',
          )}
          style={{ width: 16, height: 16 }}
        >
          {isSelected && (
            <span
              className="rounded-full bg-[var(--n1150)]"
              style={{ width: 8, height: 8 }}
            />
          )}
        </span>
      </span>
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n1150)]')}
        >
          {label}
        </label>
        {description && (
          <span className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)] mt-0.5')}>
            {description}
          </span>
        )}
      </div>
    </div>
  )
}
RadioItem.displayName = 'Radio'

// ─── Export ───

export const Radio = Object.assign(RadioItem, {
  Group: RadioGroup,
})
