// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Barrel export for activity file parsers.
 */

export { parseGPX } from './gpx-parser'
export { parseTCX } from './tcx-parser'
export { resampleToSeconds } from './types'
export type { ParsedActivityData, ActivityPoint, ActivityMeta } from './types'
