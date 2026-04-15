// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTransitionSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="2" y="7" width="6" height="10" rx="1"/>
    <rect x="16" y="7" width="6" height="10" rx="1"/>
    <path d="M9 10h4v-2l3 4-3 4v-2H9v-4Z"/>
  </IconBaseSolid>
))
IconTransitionSolid.displayName = 'IconTransitionSolid'
