import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

const SIZE_CLASSES: Record<string, string> = {
  sm: 'px-2.5 py-1 text-[12px]',
  md: 'px-4 py-2 text-[13px]',
  lg: 'px-5 py-2.5 text-[14px]',
  icon: 'p-2 text-[14px]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ children, variant = 'primary', size = 'md', className, disabled, ...props }, ref) {
    const base = cn(
      'inline-flex items-center justify-center gap-1.5 rounded-[var(--radius-md)] transition-colors duration-150',
      'disabled:pointer-events-none disabled:opacity-40',
      SIZE_CLASSES[size],
    )

    const variantStyles: React.CSSProperties =
      variant === 'primary'
        ? { backgroundColor: 'var(--n1150)', color: 'var(--n50)', fontWeight: 500 }
        : variant === 'outline'
          ? { backgroundColor: 'transparent', color: 'var(--n1050)', border: '0.5px solid var(--n400)', fontWeight: 450 }
          : { backgroundColor: 'transparent', color: 'var(--n800)', fontWeight: 450 }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          base,
          variant === 'primary' && 'hover:opacity-85',
          variant !== 'primary' && 'hover:bg-[var(--n200)]',
          className,
        )}
        style={{
          fontFamily: 'var(--font-sans)',
          ...variantStyles,
        }}
        {...props}
      >
        {children}
      </button>
    )
  },
)
