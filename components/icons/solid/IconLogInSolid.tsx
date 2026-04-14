// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconLogInSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4v-2h4V5h-4V3h4Z"/>
    <path d="M10 17l5-5-5-5v3.5H3v3h7V17Z"/>
  </IconBaseSolid>
))
IconLogInSolid.displayName = 'IconLogInSolid'
