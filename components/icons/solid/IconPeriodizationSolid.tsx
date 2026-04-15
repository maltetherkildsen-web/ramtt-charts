// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPeriodizationSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M2 16.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3zm5.5-4a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v7a.5.5 0 01-.5.5H8a.5.5 0 01-.5-.5v-7zM13 8.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v11a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-11zm5.5-4a.5.5 0 01.5-.5h2.5a.5.5 0 01.5.5v15a.5.5 0 01-.5.5H19a.5.5 0 01-.5-.5v-15z"/>
  </IconBaseSolid>
))
IconPeriodizationSolid.displayName = 'IconPeriodizationSolid'
