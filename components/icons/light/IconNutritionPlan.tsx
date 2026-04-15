// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconNutritionPlan = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M3 4v16"/><path d="M3 8h18"/><path d="M3 14h18"/><circle cx="8" cy="8" r="1.5"/><circle cx="14" cy="8" r="1.5"/><circle cx="18" cy="8" r="1.5"/><circle cx="10" cy="14" r="1.5"/><circle cx="16" cy="14" r="1.5"/>
  </IconBaseLight>
))
IconNutritionPlan.displayName = 'IconNutritionPlan'
