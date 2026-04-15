// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useState, useCallback, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, STEP_DOT_SIZE, STEP_DOT_COMPLETED, STEP_DOT_UPCOMING } from '@/lib/ui'
import { Button } from './Button'

// ─── Types ───

export interface OnboardingStep {
  title: string
  description?: string
  content: ReactNode
  /** If false, "Next" button is disabled until this resolves */
  isValid?: boolean
  /** Custom label for the next button on this step */
  nextLabel?: string
}

export interface OnboardingLayoutProps {
  steps: OnboardingStep[]
  /** Called when the final step's "Complete" is clicked */
  onComplete: () => void
  /** Called when any step changes */
  onStepChange?: (stepIndex: number) => void
  /** Allow going back to previous steps */
  allowBack?: boolean
  /** Show step indicators */
  showProgress?: boolean
  className?: string
}

// ─── Component ───

const OnboardingLayout = forwardRef<HTMLDivElement, OnboardingLayoutProps>(
  function OnboardingLayout(
    { steps, onComplete, onStepChange, allowBack = true, showProgress = true, className },
    ref,
  ) {
    const [currentStep, setCurrentStep] = useState(0)

    const goTo = useCallback(
      (idx: number) => {
        setCurrentStep(idx)
        onStepChange?.(idx)
      },
      [onStepChange],
    )

    const goNext = useCallback(() => {
      if (currentStep >= steps.length - 1) {
        onComplete()
      } else {
        goTo(currentStep + 1)
      }
    }, [currentStep, steps.length, onComplete, goTo])

    const goBack = useCallback(() => {
      if (currentStep > 0) {
        goTo(currentStep - 1)
      }
    }, [currentStep, goTo])

    const step = steps[currentStep]
    const isFirst = currentStep === 0
    const isLast = currentStep === steps.length - 1

    return (
      <div
        ref={ref}
        className={cn('mx-auto', className)}
        style={{ maxWidth: 600, padding: '40px 0' }}
      >
        {/* Progress indicator */}
        {showProgress && (
          <div className="flex items-center justify-center mb-8">
            {steps.map((s, i) => {
              const isCompleted = i < currentStep
              const isCurrent = i === currentStep

              return (
                <div key={i} className="flex items-center">
                  {/* Connecting line */}
                  {i > 0 && (
                    <div
                      className={cn(
                        'h-[1px]',
                        isCompleted || isCurrent ? 'bg-[var(--n1150)]' : 'bg-[var(--n400)]',
                      )}
                      style={{ width: 24 }}
                    />
                  )}

                  {/* Dot + label */}
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'rounded-[30%]',
                        i <= currentStep ? STEP_DOT_COMPLETED : STEP_DOT_UPCOMING,
                      )}
                      style={{ width: STEP_DOT_SIZE, height: STEP_DOT_SIZE }}
                    />
                    <span
                      className={cn(
                        FONT.body,
                        'text-[11px] mt-1.5 whitespace-nowrap',
                        isCurrent
                          ? cn(WEIGHT.strong, 'text-[var(--n1150)]')
                          : cn(WEIGHT.normal, 'text-[var(--n600)]'),
                      )}
                    >
                      {s.title}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Step title */}
        <h2 className={cn(FONT.body, 'text-[20px]', WEIGHT.strong, 'text-[var(--n1150)]')}>
          {step.title}
        </h2>

        {/* Step description */}
        {step.description && (
          <p className={cn(FONT.body, 'text-[14px]', WEIGHT.normal, 'text-[var(--n800)] mt-1')}>
            {step.description}
          </p>
        )}

        {/* Content area — no animation, instant swap */}
        <div className="mt-6">
          {step.content}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {allowBack && !isFirst ? (
            <Button variant="ghost" onClick={goBack}>
              Back
            </Button>
          ) : (
            <div />
          )}

          <Button
            variant="primary"
            onClick={goNext}
            disabled={step.isValid === false}
          >
            {isLast
              ? (step.nextLabel ?? 'Complete')
              : (step.nextLabel ?? 'Continue')}
          </Button>
        </div>
      </div>
    )
  },
)

OnboardingLayout.displayName = 'OnboardingLayout'
export { OnboardingLayout }
