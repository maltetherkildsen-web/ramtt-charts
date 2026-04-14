// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconLogOutSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4v-2H5V5h4V3H5Z"/>
    <path d="M16 17l5-5-5-5v3.5H9v3h7V17Z"/>
  </IconBaseSolid>
))
IconLogOutSolid.displayName = 'IconLogOutSolid'
