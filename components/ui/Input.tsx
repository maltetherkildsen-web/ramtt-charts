import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { cn, SIZE_HEIGHTS, SIZE_TEXT, SIZE_PADDING_X, RADIUS, FONT, BORDER, TRANSITION, FOCUS_RING, LABEL_STYLE, VALUE_STYLE } from '@/lib/ui'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  unit?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, unit, className, type, id: idProp, ...props }, ref) => {
    const autoId = useId()
    const id = idProp ?? autoId
    const isNumber = type === 'number'

    return (
      <div className={cn('flex flex-col', className)}>
        {label && (
          <label htmlFor={id} className={cn(LABEL_STYLE, 'font-semibold mb-1')}>
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={id}
            type={type}
            aria-describedby={unit ? `${id}-unit` : undefined}
            className={cn(
              'w-full bg-white outline-none',
              isNumber ? VALUE_STYLE : FONT.body,
              SIZE_HEIGHTS.md,
              SIZE_TEXT.md,
              RADIUS.md,
              BORDER.default,
              TRANSITION.colors,
              FOCUS_RING,
              'font-[450] text-[var(--n1150)]',
              'placeholder:text-[var(--n600)] focus:border-[var(--n800)]',
              SIZE_PADDING_X.sm,
              unit && 'pr-10',
            )}
            {...props}
          />
          {unit && (
            <span
              id={`${id}-unit`}
              aria-hidden="true"
              className={cn(
                FONT.label,
                'pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2',
                'text-[11px] tabular-nums text-[var(--n600)]',
              )}
            >
              {unit}
            </span>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = 'Input'
export { Input }
