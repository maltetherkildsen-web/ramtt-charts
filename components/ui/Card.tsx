import { forwardRef, type ReactNode } from 'react'
import { cn, RADIUS, BORDER, FONT, TRANSITION, WHITE_LIFT, WEIGHT } from '@/lib/ui'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingMap = {
  none: '',
  sm: 'p-2.5',
  md: 'p-3.5',
  lg: 'p-5',
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  ({ padding = 'md', className, children, onClick, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-[var(--n50)]',
        BORDER.default,
        RADIUS.lg,
        paddingMap[padding],
        onClick && cn(TRANSITION.background, WHITE_LIFT, 'cursor-default'),
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
)
CardRoot.displayName = 'Card'

const CardHeader = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn('flex items-center justify-between mb-3', className)}>{children}</div>
)
CardHeader.displayName = 'Card.Header'

const CardTitle = ({ children, className }: { children: ReactNode; className?: string }) => (
  <h3 className={cn(FONT.body, 'text-[14px]', WEIGHT.strong, 'text-[var(--n1150)]', className)}>{children}</h3>
)
CardTitle.displayName = 'Card.Title'

const CardBody = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn(className)}>{children}</div>
)
CardBody.displayName = 'Card.Body'

const CardAction = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn(className)}>{children}</div>
)
CardAction.displayName = 'Card.Action'

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Body: CardBody,
  Action: CardAction,
})
