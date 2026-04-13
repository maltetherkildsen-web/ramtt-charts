// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCaffeineSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <ellipse fill="currentColor" cx="12" cy="12" rx="6" ry="8" />
    <path fill="currentColor" d="M12 4C10 7 10 17 12 20" />
    </IconBaseSolid>
))
IconCaffeineSolid.displayName = 'IconCaffeineSolid'
