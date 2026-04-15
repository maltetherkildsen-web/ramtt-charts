// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import {
  forwardRef,
  createContext,
  useContext,
  useCallback,
  useRef,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  cn,
  FONT,
  WEIGHT,
  TRANSITION,
  STEP_DOT_SIZE,
  STEP_DOT_COMPLETED,
  STEP_DOT_UPCOMING,
} from '@/lib/ui'

// ─── Types ───

export interface StepFlowStep {
  label: string
  content: ReactNode
  /** Can be skipped */
  optional?: boolean
}

export interface StepFlowProps {
  /** Declarative API: pass steps array */
  steps?: StepFlowStep[]
  currentStep: number
  onStepChange?: (step: number) => void
  onComplete?: () => void
  /** For compound API when not passing steps */
  totalSteps?: number
  /** For compound API */
  children?: ReactNode
  className?: string
}

// ─── Context ───

interface StepFlowContextValue {
  currentStep: number
  totalSteps: number
  stepLabels: string[]
  goNext: () => void
  goBack: () => void
  isFirst: boolean
  isLast: boolean
}

const StepFlowContext = createContext<StepFlowContextValue | null>(null)

function useStepFlow() {
  const ctx = useContext(StepFlowContext)
  if (!ctx) throw new Error('StepFlow sub-components must be used within <StepFlow>')
  return ctx
}

// ─── Progress dots ───

function StepFlowProgress({ className }: { className?: string }) {
  const { currentStep, totalSteps, stepLabels } = useStepFlow()

  return (
    <div className={cn('flex items-center justify-center', className)}>
      {Array.from({ length: totalSteps }, (_, i) => {
        const isCompleted = i < currentStep
        const isCurrent = i === currentStep
        const isUpcoming = i > currentStep

        return (
          <div key={i} className="flex items-center">
            {/* Connecting line before dot (not on first) */}
            {i > 0 && (
              <div
                className={cn(
                  'h-[1px]',
                  isCompleted || isCurrent ? 'bg-[var(--n1150)]' : 'bg-[var(--n400)]',
                )}
                style={{ width: 24 }}
              />
            )}

            {/* Dot + label column */}
            <div className="flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                {/* Outer ring for current */}
                {isCurrent && (
                  <div
                    className="absolute rounded-full border-[2px] border-[var(--n400)]"
                    style={{
                      width: STEP_DOT_SIZE + 8,
                      height: STEP_DOT_SIZE + 8,
                    }}
                  />
                )}
                {/* Dot */}
                <div
                  className={cn(
                    'rounded-full',
                    isUpcoming ? STEP_DOT_UPCOMING : STEP_DOT_COMPLETED,
                  )}
                  style={{ width: STEP_DOT_SIZE, height: STEP_DOT_SIZE }}
                />
              </div>
              {/* Label below */}
              {stepLabels[i] && (
                <span
                  className={cn(
                    FONT.body,
                    'text-[11px] mt-1.5 whitespace-nowrap',
                    isCurrent
                      ? cn(WEIGHT.strong, 'text-[var(--n1150)]')
                      : cn(WEIGHT.normal, 'text-[var(--n600)]'),
                  )}
                >
                  {stepLabels[i]}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
StepFlowProgress.displayName = 'StepFlow.Progress'

// ─── Content area ───

function StepFlowContent({ children, className }: { children: ReactNode; className?: string }) {
  const { currentStep } = useStepFlow()
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [visible, setVisible] = useState(true)
  const prevStep = useRef(currentStep)

  useEffect(() => {
    if (currentStep !== prevStep.current) {
      setDirection(currentStep > prevStep.current ? 'forward' : 'backward')
      setVisible(false)
      prevStep.current = currentStep
      // Trigger re-entry after a frame
      const raf = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(raf)
    }
  }, [currentStep])

  return (
    <div className={cn('py-6 overflow-hidden', className)}>
      <div
        className={cn(
          'transition-[opacity,transform] duration-150',
          visible
            ? 'opacity-100 translate-x-0'
            : direction === 'forward'
              ? 'opacity-0 translate-x-2'
              : 'opacity-0 -translate-x-2',
        )}
        style={{ transitionTimingFunction: 'var(--ease-out-expo, ease-out)' }}
      >
        {children}
      </div>
    </div>
  )
}
StepFlowContent.displayName = 'StepFlow.Content'

// ─── Navigation bar ───

function StepFlowNavigation({
  onBack,
  onNext,
  onComplete,
  nextLabel,
  completeLabel,
  backLabel,
  className,
}: {
  onBack?: () => void
  onNext?: () => void
  onComplete?: () => void
  nextLabel?: string
  completeLabel?: string
  backLabel?: string
  className?: string
}) {
  const { currentStep, totalSteps, isFirst, isLast, goBack, goNext } = useStepFlow()

  const handleBack = onBack ?? goBack
  const handleNext = isLast ? (onComplete ?? goNext) : (onNext ?? goNext)

  return (
    <div className={cn('flex items-center justify-between pt-4', className)}>
      {/* Back button */}
      {isFirst ? (
        <div />
      ) : (
        <button
          type="button"
          onClick={handleBack}
          className={cn(
            FONT.body,
            'text-[13px]',
            WEIGHT.normal,
            'text-[var(--n800)]',
            'px-3.5 h-8 rounded-[5px]',
            'hover:bg-[var(--n200)]',
            TRANSITION.background,
          )}
        >
          {backLabel || 'Back'}
        </button>
      )}

      {/* Step counter */}
      <span className={cn(FONT.body, 'text-[12px]', WEIGHT.book, 'text-[var(--n600)]')}>
        Step {currentStep + 1} of {totalSteps}
      </span>

      {/* Next / Complete button */}
      <button
        type="button"
        onClick={handleNext}
        className={cn(
          FONT.body,
          'text-[13px]',
          'px-3.5 h-8 rounded-[5px]',
          'bg-[var(--n1150)] text-[var(--n50)]',
          'hover:opacity-90 active:opacity-80',
          TRANSITION.opacity,
          WEIGHT.medium,
        )}
      >
        {isLast ? (completeLabel || 'Complete') : (nextLabel || 'Next')}
      </button>
    </div>
  )
}
StepFlowNavigation.displayName = 'StepFlow.Navigation'

// ─── Root component ───

const StepFlowRoot = forwardRef<HTMLDivElement, StepFlowProps>(
  ({ steps, currentStep, onStepChange, onComplete, totalSteps: totalStepsProp, children, className }, ref) => {
    const total = steps ? steps.length : (totalStepsProp ?? 0)
    const stepLabels = steps ? steps.map((s) => s.label) : []

    const goNext = useCallback(() => {
      if (currentStep >= total - 1) {
        onComplete?.()
      } else {
        onStepChange?.(currentStep + 1)
      }
    }, [currentStep, total, onComplete, onStepChange])

    const goBack = useCallback(() => {
      if (currentStep > 0) {
        onStepChange?.(currentStep - 1)
      }
    }, [currentStep, onStepChange])

    const ctx: StepFlowContextValue = {
      currentStep,
      totalSteps: total,
      stepLabels,
      goNext,
      goBack,
      isFirst: currentStep === 0,
      isLast: currentStep === total - 1,
    }

    // Keyboard: Enter = next, Escape = back
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          goNext()
        } else if (e.key === 'Escape') {
          e.preventDefault()
          goBack()
        }
      },
      [goNext, goBack],
    )

    // ── Declarative API (steps array) ──
    if (steps) {
      return (
        <StepFlowContext.Provider value={ctx}>
          <div ref={ref} className={className} onKeyDown={handleKeyDown}>
            <StepFlowProgress />
            <StepFlowContent>
              {steps[currentStep]?.content}
            </StepFlowContent>
            <StepFlowNavigation onComplete={onComplete} />
          </div>
        </StepFlowContext.Provider>
      )
    }

    // ── Compound API (render children) ──
    return (
      <StepFlowContext.Provider value={ctx}>
        <div ref={ref} className={className} onKeyDown={handleKeyDown}>
          {children}
        </div>
      </StepFlowContext.Provider>
    )
  },
)

StepFlowRoot.displayName = 'StepFlow'

// ─── Export with compound sub-components ───

export const StepFlow = Object.assign(StepFlowRoot, {
  Progress: StepFlowProgress,
  Content: StepFlowContent,
  Navigation: StepFlowNavigation,
})
