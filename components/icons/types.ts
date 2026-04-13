// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

export interface IconProps {
  size?: number
  color?: string
  className?: string
  'aria-label'?: string
  'aria-hidden'?: boolean
}

export interface IconDuoProps extends IconProps {
  accent?: string
}
