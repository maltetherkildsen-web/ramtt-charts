// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconBrainSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M12 2C9 2 6.5 3.5 5.5 6 4 6.5 3 8 3 10c0 1.5.5 2.5 1 3.5-.5 1-1 2.5-.5 4s2 3 3.5 3c1 0 2-.5 2.5-1 .5 1 1.5 2 2.5 2V2Z"/>
    <path d="M12 2c3 0 5.5 1.5 6.5 4 1.5.5 2.5 2 2.5 4 0 1.5-.5 2.5-1 3.5.5 1 1 2.5.5 4s-2 3-3.5 3c-1 0-2-.5-2.5-1-.5 1-1.5 2-2.5 2V2Z"/>
  </IconBaseSolid>
))
IconBrainSolid.displayName = 'IconBrainSolid'
