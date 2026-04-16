// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

// @ramtt/icons — 400 icons × 4 variants (line, light, solid, duo) + 20 animated + 26 context + 25 morph + 46 reactive = 1717 files

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

// Reactive (hover reactions)
export * from './reactive'

// Catalog metadata
export { ICON_CATALOG, ICON_CATEGORIES, type IconMeta } from './catalog'
