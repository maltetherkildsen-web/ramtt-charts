// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSupplementsSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect fill="currentColor" x="6" y="4" width="12" height="16" rx="6" />
    <path fill="currentColor" d="M6 12H18" />
    </IconBaseSolid>
))
IconSupplementsSolid.displayName = 'IconSupplementsSolid'
