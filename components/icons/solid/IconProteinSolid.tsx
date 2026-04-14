// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconProteinSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="7" y="9" width="10" height="13" rx="2"/>
    <path d="M8 5h8v4H8V5Z"/>
  </IconBaseSolid>
))
IconProteinSolid.displayName = 'IconProteinSolid'
