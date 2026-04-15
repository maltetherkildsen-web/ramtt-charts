// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconNegativeSplitSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M3 8a.75.75 0 01.75.75V20H6V8.75A.75.75 0 013 8zm5 3a.75.75 0 01.75.75V20H11v-8.25A.75.75 0 018 11zm5 3a.75.75 0 01.75.75V20H16v-5.25A.75.75 0 0113 14zm5 3a.75.75 0 01.75.75V20H21v-2.25A.75.75 0 0118 17z"/>
  </IconBaseSolid>
))
IconNegativeSplitSolid.displayName = 'IconNegativeSplitSolid'
