// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconGripSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle cx="9" cy="7" r="2"/>
    <circle cx="15" cy="7" r="2"/>
    <circle cx="9" cy="12" r="2"/>
    <circle cx="15" cy="12" r="2"/>
    <circle cx="9" cy="17" r="2"/>
    <circle cx="15" cy="17" r="2"/>
  </IconBaseSolid>
))
IconGripSolid.displayName = 'IconGripSolid'
