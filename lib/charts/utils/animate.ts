// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Animation utilities for chart entry animations.
 *
 * Pure helpers — no React, no DOM. Components use these to resolve
 * the `animate` prop into concrete CSS values.
 */

export type AnimateConfig =
  | boolean
  | { duration?: number; delay?: number; easing?: string }

export const EASE_OUT_EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)'
export const EASE_SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

export interface ResolvedAnimate {
  enabled: boolean
  duration: number
  delay: number
  easing: string
}

export function resolveAnimate(
  animate: AnimateConfig | undefined,
  defaults: { duration: number; delay: number; easing: string },
): ResolvedAnimate {
  if (animate === false || animate === undefined)
    return { enabled: false, ...defaults }
  if (animate === true) return { enabled: true, ...defaults }
  return {
    enabled: true,
    duration: animate.duration ?? defaults.duration,
    delay: animate.delay ?? defaults.delay,
    easing: animate.easing ?? defaults.easing,
  }
}
