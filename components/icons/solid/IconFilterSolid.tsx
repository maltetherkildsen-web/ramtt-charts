// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconFilterSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M4 7H20" />
    <path fill="currentColor" d="M7 12H17" />
    <path fill="currentColor" d="M10 17H14" />
    </IconBaseSolid>
))
IconFilterSolid.displayName = 'IconFilterSolid'
