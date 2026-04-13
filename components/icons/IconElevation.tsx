// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from './IconBase'

/** Mountain profile — two peaks, a miniature elevation trace. */
export const IconElevation = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M3 19L7 10L10 14L14 5L18.5 13L21 19" />
  </IconBase>
))
IconElevation.displayName = 'IconElevation'
