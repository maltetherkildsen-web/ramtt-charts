// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMicSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect fill="currentColor" x="9" y="2" width="6" height="11" rx="3" />
    <path fill="currentColor" d="M5 10C5 13.9 8.1 17 12 17C15.9 17 19 13.9 19 10" />
    <path fill="currentColor" d="M12 17V21" />
    <path fill="currentColor" d="M8 21H16" />
    </IconBaseSolid>
))
IconMicSolid.displayName = 'IconMicSolid'
