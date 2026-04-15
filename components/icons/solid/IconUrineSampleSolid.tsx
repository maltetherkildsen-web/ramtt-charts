// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconUrineSampleSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M7 8h10v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8Z"/>
    <rect x="7" y="5" width="10" height="3" rx=".5"/>
  </IconBaseSolid>
))
IconUrineSampleSolid.displayName = 'IconUrineSampleSolid'
