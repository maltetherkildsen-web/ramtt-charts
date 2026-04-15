// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * PMC (Performance Management Chart) — ATL, CTL, TSB calculations.
 *
 * Pure TypeScript, zero dependencies.
 *
 * Uses exponentially weighted moving averages (EWMA):
 *   CTL (Chronic Training Load / "fitness"):  42-day time constant
 *   ATL (Acute Training Load / "fatigue"):      7-day time constant
 *   TSB (Training Stress Balance / "form"):    CTL − ATL
 *
 * Standard formulas (same as TrainingPeaks, Intervals.icu, WKO):
 *   EWMAₙ = EWMAₙ₋₁ + (TSSₙ − EWMAₙ₋₁) × (1 − e^(−1/τ))
 *   simplified: EWMAₙ = EWMAₙ₋₁ × k + TSSₙ × (1 − k) where k = e^(−1/τ)
 */

export interface PMCResult {
  /** Chronic Training Load per day (42-day EWMA). */
  ctl: number[]
  /** Acute Training Load per day (7-day EWMA). */
  atl: number[]
  /** Training Stress Balance per day (CTL − ATL). */
  tsb: number[]
}

export interface PMCOptions {
  /** CTL time constant in days. Default: 42. */
  ctlDays?: number
  /** ATL time constant in days. Default: 7. */
  atlDays?: number
  /** Starting CTL value. Default: 0. */
  initialCtl?: number
  /** Starting ATL value. Default: 0. */
  initialAtl?: number
}

/**
 * Compute PMC from daily training load values (TSS, hrTSS, etc.).
 *
 * @param dailyLoads  Array of daily load values (one per day, chronological).
 * @param options     Time constants and initial values.
 * @returns           { ctl, atl, tsb } — each same length as dailyLoads.
 */
export function computePMC(
  dailyLoads: number[],
  options: PMCOptions = {},
): PMCResult {
  const {
    ctlDays = 42,
    atlDays = 7,
    initialCtl = 0,
    initialAtl = 0,
  } = options

  const n = dailyLoads.length
  const ctl = new Array<number>(n)
  const atl = new Array<number>(n)
  const tsb = new Array<number>(n)

  // Decay factors: k = e^(−1/τ)
  const kCtl = Math.exp(-1 / ctlDays)
  const kAtl = Math.exp(-1 / atlDays)

  let prevCtl = initialCtl
  let prevAtl = initialAtl

  for (let i = 0; i < n; i++) {
    const load = dailyLoads[i]
    prevCtl = prevCtl * kCtl + load * (1 - kCtl)
    prevAtl = prevAtl * kAtl + load * (1 - kAtl)
    ctl[i] = Math.round(prevCtl * 10) / 10
    atl[i] = Math.round(prevAtl * 10) / 10
    tsb[i] = Math.round((prevCtl - prevAtl) * 10) / 10
  }

  return { ctl, atl, tsb }
}

/**
 * Compute TSS (Training Stress Score) from a ride's Normalized Power.
 *
 * TSS = (duration_seconds × NP × IF) / (FTP × 3600) × 100
 * where IF = NP / FTP
 */
export function computeTSS(
  durationSeconds: number,
  normalizedPower: number,
  ftp: number,
): number {
  if (ftp <= 0 || durationSeconds <= 0) return 0
  const intensity = normalizedPower / ftp
  return Math.round((durationSeconds * normalizedPower * intensity) / (ftp * 3600) * 100)
}
