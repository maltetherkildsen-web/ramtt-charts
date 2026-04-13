// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCadenceSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M12 4A8 8 0 1 1 4.5 8.5" />
    {/* Arrow head at the arc start */}
    <path fill="currentColor" d="M4.5 4V8.5H9" />
    </IconBaseSolid>
))
IconCadenceSolid.displayName = 'IconCadenceSolid'
