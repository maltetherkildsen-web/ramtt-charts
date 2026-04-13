// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useRef, useEffect, useCallback, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, DRAWER_WIDTHS } from '@/lib/ui'

// ─── Types ───

export interface DrawerProps {
  open: boolean
  onClose: () => void
  side?: 'right' | 'left' | 'bottom'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  className?: string
}

const ANIMATIONS = {
  right: 'ramtt-drawer-right',
  left: 'ramtt-drawer-left',
  bottom: 'ramtt-drawer-bottom',
} as const

// ─── Sub-components ───

function DrawerHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center justify-between px-6 pt-5', className)}>
      {children}
    </div>
  )
}
DrawerHeader.displayName = 'Drawer.Header'

function DrawerTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn(FONT.body, 'text-[15px]', WEIGHT.strong, 'text-[var(--n1150)]', className)}>
      {children}
    </h2>
  )
}
DrawerTitle.displayName = 'Drawer.Title'

function DrawerBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4 flex-1 overflow-y-auto', className)}>
      {children}
    </div>
  )
}
DrawerBody.displayName = 'Drawer.Body'

function DrawerFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center justify-end gap-2 px-6 pb-5', className)}>
      {children}
    </div>
  )
}
DrawerFooter.displayName = 'Drawer.Footer'

// ─── Root ───

const DrawerRoot = forwardRef<HTMLDialogElement, DrawerProps>(
  ({ open, onClose, side = 'right', size = 'md', children, className }, ref) => {
    const internalRef = useRef<HTMLDialogElement>(null)
    const dialogRef = (ref as React.RefObject<HTMLDialogElement>) || internalRef

    useEffect(() => {
      const dialog = dialogRef.current
      if (!dialog) return

      if (open) {
        if (!dialog.open) dialog.showModal()
        document.body.style.overflow = 'hidden'
      } else {
        if (dialog.open) dialog.close()
        document.body.style.overflow = ''
      }

      return () => { document.body.style.overflow = '' }
    }, [open, dialogRef])

    const handleClose = useCallback(() => onClose(), [onClose])

    useEffect(() => {
      const dialog = dialogRef.current
      if (!dialog) return
      dialog.addEventListener('close', handleClose)
      return () => dialog.removeEventListener('close', handleClose)
    }, [dialogRef, handleClose])

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === dialogRef.current) onClose()
      },
      [onClose, dialogRef],
    )

    const isBottom = side === 'bottom'
    const width = isBottom ? undefined : DRAWER_WIDTHS[size]

    const positionStyles: React.CSSProperties = {
      position: 'fixed',
      margin: 0,
      padding: 0,
      maxWidth: isBottom ? '100%' : undefined,
      maxHeight: isBottom ? '85vh' : '100vh',
      width: isBottom ? '100%' : width,
      height: isBottom ? 'auto' : '100vh',
      top: side === 'bottom' ? 'auto' : 0,
      bottom: side === 'bottom' ? 0 : undefined,
      left: side === 'left' ? 0 : side === 'bottom' ? 0 : 'auto',
      right: side === 'right' ? 0 : undefined,
      animation: `${ANIMATIONS[side]} 200ms var(--ease-out-expo)`,
    }

    return (
      <dialog
        ref={dialogRef}
        onClick={handleClick}
        className={cn(
          'bg-[var(--n50)]',
          side === 'right' && 'border-l-[0.5px] border-l-[var(--n400)]',
          side === 'left' && 'border-r-[0.5px] border-r-[var(--n400)]',
          side === 'bottom' && 'border-t-[0.5px] border-t-[var(--n400)] rounded-t-[12px]',
          className,
        )}
        style={positionStyles}
      >
        <div className="flex flex-col h-full">
          {children}
        </div>
      </dialog>
    )
  },
)

DrawerRoot.displayName = 'Drawer'

export const Drawer = Object.assign(DrawerRoot, {
  Header: DrawerHeader,
  Title: DrawerTitle,
  Body: DrawerBody,
  Footer: DrawerFooter,
})
