// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPowerSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M3 16l3-2 2.5 2L11 7l3 7 2.5-4 2 2.5L21 8v12H3Z"/>
  </IconBaseSolid>
))
IconPowerSolid.displayName = 'IconPowerSolid'
