// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCrownSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M1.38 16.55l2.93-9.76a.75.75 0 011.27-.32L9.5 10.6l2.08-6.65a.75.75 0 011.42.01L15 10.53l3.55-4.07a.75.75 0 011.28.37l2.55 9.72a.75.75 0 01-.73.95H2.11a.75.75 0 01-.73-.95zM3.25 19a.75.75 0 01.75-.75h16a.75.75 0 010 1.5H4a.75.75 0 01-.75-.75z"/>
  </IconBaseSolid>
))
IconCrownSolid.displayName = 'IconCrownSolid'
