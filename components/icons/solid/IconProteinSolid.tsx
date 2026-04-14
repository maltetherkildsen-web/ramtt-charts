// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconProteinSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle cx="5" cy="12" r="3.5"/>
    <circle cx="12" cy="12" r="3.5"/>
    <circle cx="19" cy="12" r="3.5"/>
  </IconBaseSolid>
))
IconProteinSolid.displayName = 'IconProteinSolid'
