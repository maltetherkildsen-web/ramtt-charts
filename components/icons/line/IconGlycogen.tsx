// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

/** Battery/tank — horizontal battery with partial fill level. */
export const IconGlycogen = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    {/* Battery body */}
    <rect x="3" y="8" width="16" height="8" rx="2" />
    {/* Terminal nub */}
    <path d="M19 11H21V13H19" />
    {/* Fill level (~60%) */}
    <path d="M6 11H12V13H6Z" fill="currentColor" fillOpacity={0.15} stroke="none" />
  </IconBase>
))
IconGlycogen.displayName = 'IconGlycogen'
