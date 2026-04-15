// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSplitArrowDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M5 5l7 7 7-7v4l-7 7-7-7V5z"/>
    </g>
    {/* Foreground */}
    <path d="M12 22v-10"/><path d="M5 5l7 7 7-7"/><path d="M5 5v4"/><path d="M19 5v4"/>
  </IconBaseDuo>
))
IconSplitArrowDuo.displayName = 'IconSplitArrowDuo'
