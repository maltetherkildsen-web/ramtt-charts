import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { cn, SIZE_HEIGHTS, SIZE_TEXT, SIZE_PADDING_X, RADIUS, FONT, BORDER, TRANSITION, FOCUS_RING_THICK, LABEL_STYLE, UNIT_STYLE, WEIGHT } from '@/lib/ui'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  unit?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, unit, className, id: idProp, ...props }, ref) => {
    const autoId = useId()
    const id = idProp ?? autoId

    return (
      <div className={cn('flex flex-col', className)}>
        {label && (
          <label htmlFor={id} className={cn(LABEL_STYLE, 'mb-1')}>
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={id}
            aria-describedby={unit ? `${id}-unit` : undefined}
            className={cn(
              'w-full bg-white outline-none',
              FONT.body,
              SIZE_HEIGHTS.md,
              SIZE_TEXT.md,
              RADIUS.md,
              BORDER.default,
              TRANSITION.colors,
              FOCUS_RING_THICK,
              WEIGHT.normal, 'text-[var(--n1150)]',
              'tabular-nums',
              'placeholder:text-[var(--n600)] focus:border-[var(--n800)]',
              SIZE_PADDING_X.sm,
              unit && 'pr-8',
            )}
            {...props}
          />
          {unit && (
            <span
              id={`${id}-unit`}
              aria-hidden="true"
              className={cn(
                UNIT_STYLE,
                'pointer-events-none absolute right-2 top-1/2 -translate-y-1/2',
                'text-[11px]',
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
