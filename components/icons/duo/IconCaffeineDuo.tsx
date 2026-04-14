// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCaffeineDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <ellipse cx="12" cy="12" rx="6" ry="8" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <ellipse cx="12" cy="12" rx="6" ry="8" />
    <path d="M12 4C10 7 10 17 12 20" />
  </IconBaseDuo>
))
IconCaffeineDuo.displayName = 'IconCaffeineDuo'
