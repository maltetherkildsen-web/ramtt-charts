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
          <input
            ref={ref}
            type={type}
            className={cn(
              'w-full rounded-[var(--radius-md)] bg-white outline-none transition-colors duration-150',
              'placeholder:text-[var(--n600)]',
              'focus:border-[var(--n800)]',
              unit && 'pr-10',
            )}
            style={{
              border: '0.5px solid var(--n400)',
              height: 40,
              padding: '8px 12px',
              fontFamily: isNumber ? 'var(--font-mono)' : 'var(--font-sans)',
              fontWeight: isNumber ? 400 : 450,
              fontVariantNumeric: isNumber ? 'tabular-nums' : undefined,
              fontSize: 14,
              color: 'var(--n1150)',
            }}
            {...props}
          />
          {unit && (
            <span
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[12px]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--n600)' }}
            >
              {unit}
            </span>
          )}
        </div>
      </div>
    )
  },
)
