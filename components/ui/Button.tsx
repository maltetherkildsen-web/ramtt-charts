import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

const SIZE_STYLES: Record<string, React.CSSProperties> = {
  sm: { padding: '0 10px', fontSize: 12, height: 28 },
  md: { padding: '0 14px', fontSize: 13, height: 32 },
  lg: { padding: '0 18px', fontSize: 14, height: 36 },
  icon: { padding: 0, fontSize: 13, height: 28, width: 28 },
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ children, variant = 'primary', size = 'md', className, disabled, ...props }, ref) {
    const variantStyles: React.CSSProperties =
      variant === 'primary'
        ? { backgroundColor: 'var(--n1150)', color: 'var(--n50)', fontWeight: 500 }
        : variant === 'outline'
          ? { backgroundColor: 'transparent', color: 'var(--n1050)', border: '0.5px solid var(--n400)', fontWeight: 500 }
          : { backgroundColor: 'transparent', color: 'var(--n800)', fontWeight: 500 }

    return (
      <button ref={ref} disabled={disabled} className={cn(
        'inline-flex items-center justify-center gap-1.5 transition-colors duration-150',
        'disabled:pointer-events-none disabled:opacity-40',
        variant === 'primary' && 'hover:opacity-[0.88] active:opacity-80',
        variant !== 'primary' && 'hover:bg-[var(--n200)] active:bg-[var(--n400)]',
        className,
      )} style={{ fontFamily: 'var(--font-sans)', borderRadius: 'var(--radius-md)', ...SIZE_STYLES[size], ...variantStyles }} {...props}>
        {children}
      </button>
    )
  },
)
