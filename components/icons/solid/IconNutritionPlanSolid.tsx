// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconNutritionPlanSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M3.75 3.25a.75.75 0 00-1.5 0v17.5a.75.75 0 001.5 0V14.75h17.5a.75.75 0 000-1.5H13.68a2.25 2.25 0 10-5.36 0H3.75V8.75h4.57a2.25 2.25 0 105.86 0h1.14a2.25 2.25 0 105.86 0h.07a.75.75 0 000-1.5H3.75V3.25z"/>
  </IconBaseSolid>
))
IconNutritionPlanSolid.displayName = 'IconNutritionPlanSolid'
