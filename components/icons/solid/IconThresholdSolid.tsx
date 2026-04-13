// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconThresholdSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M3 14H7" strokeDasharray="2 2" />
    <path fill="currentColor" d="M11 14H15" strokeDasharray="2 2" />
    <path fill="currentColor" d="M19 14H21" strokeDasharray="2 2" />
    <path fill="currentColor" d="M12 20V14" />
    <path fill="currentColor" d="M9 17L12 14L15 17" />
    <path fill="currentColor" d="M12 14V6" />
    <path fill="currentColor" d="M9 9L12 6L15 9" />
    </IconBaseSolid>
))
IconThresholdSolid.displayName = 'IconThresholdSolid'
