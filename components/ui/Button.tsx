import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn, SIZE_HEIGHTS, SIZE_TEXT, SIZE_PADDING_X, RADIUS, FONT, BORDER, TRANSITION, HOVER_SAND, ACTIVE_BLACK, FOCUS_RING, WEIGHT } from '@/lib/ui'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

const variantStyles = {
  primary: cn(ACTIVE_BLACK, 'hover:opacity-90 active:opacity-80'),
  outline: cn('bg-transparent text-[var(--n1050)]', BORDER.default, HOVER_SAND, 'active:bg-[var(--n400)]'),
  ghost: cn('bg-transparent text-[var(--n800)]', HOVER_SAND, 'active:bg-[var(--n400)]'),
}

const sizeStyles = {
  sm: cn(SIZE_HEIGHTS.sm, SIZE_TEXT.sm, SIZE_PADDING_X.sm),
  md: cn(SIZE_HEIGHTS.md, SIZE_TEXT.md, SIZE_PADDING_X.md),
  lg: cn(SIZE_HEIGHTS.lg, SIZE_TEXT.lg, SIZE_PADDING_X.lg),
  icon: cn(SIZE_HEIGHTS.sm, 'w-7 p-0'),
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        FONT.body,
        RADIUS.md,
        TRANSITION.colors,
        FOCUS_RING,
        'inline-flex items-center justify-center gap-1.5',
        variant === 'ghost' ? WEIGHT.normal : WEIGHT.medium,
        'disabled:pointer-events-none disabled:opacity-40',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)

Button.displayName = 'Button'
export { Button }
