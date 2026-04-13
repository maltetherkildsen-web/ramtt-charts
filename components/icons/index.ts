// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

// @ramtt/icons — 126 icons × 3 variants + 8 animated + 12 context + 11 morph = 409 components

// Shared types
export type { IconProps, IconDuoProps } from './types'

// Base components
export { IconBase } from './IconBase'
export { IconBaseSolid } from './IconBaseSolid'
export { IconBaseDuo } from './IconBaseDuo'

// Line variants (default)
export * from './line'

// Solid variants
export * from './solid'

// Duo variants
export * from './duo'

// Animated
export * from './animated'

// Context-aware (data-driven)
export * from './context'

// Morphing transitions
export * from './morph'

// Catalog metadata
export { ICON_CATALOG, ICON_CATEGORIES, type IconMeta } from './catalog'
