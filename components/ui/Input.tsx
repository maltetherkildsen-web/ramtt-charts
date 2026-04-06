import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  unit?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, unit, className, type, ...props }, ref) {
    const isNumber = type === 'number'
    return (
      <div className={cn('flex flex-col', className)}>
        {label && (
          <label style={{ fontFamily: 'var(--font-label)', fontWeight: 600, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--n600)', marginBottom: 4 }}>
            {label}
          </label>
        )}
        <div className="relative">
          <input ref={ref} type={type} className={cn(
            'w-full bg-white outline-none transition-colors duration-150',
            'placeholder:text-[var(--n600)] focus:border-[var(--n800)]',
            unit && 'pr-10',
          )} style={{
            border: '0.5px solid var(--n400)', borderRadius: 'var(--radius-md)',
            height: 32, padding: '0 10px',
            fontFamily: isNumber ? 'var(--font-label)' : 'var(--font-sans)',
            fontWeight: 450, fontVariantNumeric: isNumber ? 'tabular-nums' : undefined,
            fontSize: 13, color: 'var(--n1150)',
          }} {...props} />
          {unit && (
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" style={{ fontFamily: 'var(--font-label)', fontWeight: 400, fontSize: 11, fontVariantNumeric: 'tabular-nums', color: 'var(--n600)' }}>
              {unit}
            </span>
          )}
        </div>
      </div>
    )
  },
)
