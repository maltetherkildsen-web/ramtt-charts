// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import { cn, FONT, WEIGHT, TRANSITION, TOAST_MAX_VISIBLE, TOAST_DEFAULT_DURATION } from '@/lib/ui'

// ─── Types ───

export interface ToastData {
  message: string
  variant?: 'default' | 'success' | 'error' | 'warning'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastEntry extends ToastData {
  id: string
}

type ToastAction =
  | { type: 'ADD'; toast: ToastEntry }
  | { type: 'REMOVE'; id: string }

// ─── Variant dot colors ───

const VARIANT_DOT: Record<string, string | undefined> = {
  default: undefined,
  success: 'bg-[var(--positive)]',
  error: 'bg-[var(--negative)]',
  warning: 'bg-[var(--warning)]',
}

// ─── Context ───

const ToastDispatchContext = createContext<React.Dispatch<ToastAction> | null>(null)

// ─── Reducer ───

function toastReducer(state: ToastEntry[], action: ToastAction): ToastEntry[] {
  switch (action.type) {
    case 'ADD': {
      const next = [...state, action.toast]
      // Trim oldest if exceeding max visible
      if (next.length > TOAST_MAX_VISIBLE) {
        return next.slice(next.length - TOAST_MAX_VISIBLE)
      }
      return next
    }
    case 'REMOVE':
      return state.filter((t) => t.id !== action.id)
    default:
      return state
  }
}

// ─── Individual Toast ───

function ToastItem({ toast, onDismiss }: { toast: ToastEntry; onDismiss: (id: string) => void }) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const remainingRef = useRef(toast.duration ?? TOAST_DEFAULT_DURATION)
  const startRef = useRef(Date.now())
  const elRef = useRef<HTMLDivElement>(null)

  const dismiss = useCallback(() => onDismiss(toast.id), [onDismiss, toast.id])

  // Auto-dismiss timer
  const startTimer = useCallback(() => {
    if (remainingRef.current <= 0) return
    startRef.current = Date.now()
    timerRef.current = setTimeout(dismiss, remainingRef.current)
  }, [dismiss])

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
      remainingRef.current -= Date.now() - startRef.current
    }
  }, [])

  useEffect(() => {
    if ((toast.duration ?? TOAST_DEFAULT_DURATION) > 0) {
      startTimer()
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [startTimer, toast.duration])

  const variant = toast.variant ?? 'default'
  const dotClass = VARIANT_DOT[variant]

  return (
    <div
      ref={elRef}
      role="status"
      aria-live="polite"
      onClick={dismiss}
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
      className={cn(
        'flex items-center gap-2.5',
        'bg-[var(--n1150)] text-[var(--n50)]',
        'rounded-[8px]',
        'px-4 py-2.5',
        'min-w-[280px] max-w-[380px]',
        FONT.body,
        'text-[13px]',
        WEIGHT.normal,
        'animate-[ramtt-toast-enter_200ms_var(--ease-out-expo)]',
      )}
    >
      {dotClass && (
        <span
          className={cn('shrink-0 rounded-full', dotClass)}
          style={{ width: 4, height: 4 }}
        />
      )}
      <span className="flex-1">{toast.message}</span>
      {toast.action && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            toast.action!.onClick()
            dismiss()
          }}
          className={cn(
            'shrink-0 text-[12px]',
            WEIGHT.medium,
            'text-[var(--n400)] hover:underline',
            TRANSITION.opacity,
          )}
        >
          {toast.action.label}
        </button>
      )}
    </div>
  )
}

// ─── Provider ───

function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, dispatch] = useReducer(toastReducer, [])

  const handleDismiss = useCallback(
    (id: string) => dispatch({ type: 'REMOVE', id }),
    [],
  )

  return (
    <ToastDispatchContext.Provider value={dispatch}>
      {children}
      {toasts.length > 0 && (
        <div
          className="fixed bottom-6 right-6 z-[60] flex flex-col-reverse gap-2"
          aria-label="Notifications"
        >
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onDismiss={handleDismiss} />
          ))}
        </div>
      )}
    </ToastDispatchContext.Provider>
  )
}
ToastProvider.displayName = 'ToastProvider'

// ─── Hook ───

function useToast() {
  const dispatch = useContext(ToastDispatchContext)
  if (!dispatch) throw new Error('useToast must be used within ToastProvider')
  return useCallback(
    (data: ToastData) => {
      const id = crypto.randomUUID()
      dispatch({ type: 'ADD', toast: { ...data, id } })
    },
    [dispatch],
  )
}

export { ToastProvider, useToast }
