// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from './IconBase'

/** Circular arrow — the pedal stroke cycle. */
export const IconCadence = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M12 4A8 8 0 1 1 4.5 8.5" />
    {/* Arrow head at the arc start */}
    <path d="M4.5 4V8.5H9" />
  </IconBase>
))
IconCadence.displayName = 'IconCadence'
