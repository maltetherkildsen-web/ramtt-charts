// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconNutritionPlanDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="3" y="6" width="18" height="10" rx="2"/>
    </g>
    {/* Foreground */}
    <path d="M3 4v16"/><path d="M3 8h18"/><path d="M3 14h18"/><circle cx="8" cy="8" r="1.5"/><circle cx="14" cy="8" r="1.5"/><circle cx="18" cy="8" r="1.5"/><circle cx="10" cy="14" r="1.5"/><circle cx="16" cy="14" r="1.5"/>
  </IconBaseDuo>
))
IconNutritionPlanDuo.displayName = 'IconNutritionPlanDuo'
