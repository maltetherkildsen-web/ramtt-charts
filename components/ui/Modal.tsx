// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useRef, useEffect, useCallback, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, RADIUS, BORDER, MODAL_WIDTH } from '@/lib/ui'

// ─── Types ───

export interface ModalProps {
  open: boolean
  onClose: () => void
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  className?: string
}

// ─── Compound sub-components ───

function ModalHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center justify-between pt-5 px-6', className)}>
      {children}
    </div>
  )
}
ModalHeader.displayName = 'Modal.Header'

function ModalTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn(FONT.body, 'text-[15px]', WEIGHT.strong, 'text-[var(--n1150)]', className)}>
      {children}
    </h2>
  )
}
ModalTitle.displayName = 'Modal.Title'

function ModalBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4', className)}>
      {children}
    </div>
  )
}
ModalBody.displayName = 'Modal.Body'

function ModalFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center justify-end gap-2 px-6 pb-5', className)}>
      {children}
    </div>
  )
}
ModalFooter.displayName = 'Modal.Footer'

// ─── Modal root ───

const ModalRoot = forwardRef<HTMLDialogElement, ModalProps>(
  ({ open, onClose, size = 'md', children, className }, ref) => {
    const internalRef = useRef<HTMLDialogElement>(null)
    const dialogRef = (ref as React.RefObject<HTMLDialogElement>) || internalRef

    // Sync open state with native dialog
    useEffect(() => {
      const dialog = dialogRef.current
      if (!dialog) return

      if (open) {
        if (!dialog.open) {
          dialog.showModal()
        }
        document.body.style.overflow = 'hidden'
      } else {
        if (dialog.open) {
          dialog.close()
        }
        document.body.style.overflow = ''
      }

      return () => {
        document.body.style.overflow = ''
      }
    }, [open, dialogRef])

    // Handle native close event (Escape key)
    const handleClose = useCallback(() => {
      onClose()
    }, [onClose])

    useEffect(() => {
      const dialog = dialogRef.current
      if (!dialog) return
      dialog.addEventListener('close', handleClose)
      return () => dialog.removeEventListener('close', handleClose)
    }, [dialogRef, handleClose])

    // Close on backdrop click
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === dialogRef.current) {
          onClose()
        }
      },
      [onClose, dialogRef],
    )

    return (
      <dialog
        ref={dialogRef}
        onClick={handleClick}
        className={cn(
          'bg-[var(--n50)]',
          BORDER.default,
          RADIUS.lg,
          MODAL_WIDTH[size],
          'w-full p-0 max-h-[85vh] overflow-y-auto',
          className,
        )}
      >
        {children}
      </dialog>
    )
  },
)

ModalRoot.displayName = 'Modal'

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Title: ModalTitle,
  Body: ModalBody,
  Footer: ModalFooter,
})
