// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconLeafyGreensDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M5 5c0 4 3 7 7 7V10C11 8 8 5 5 5zM19 7c0 4-3 7-7 7v-2c1-3 4-5 7-5z"/>
    </g>
    {/* Foreground */}
    <path d="M12 22v-10"/><path d="M12 12c-4 0-7-3-7-7 3 0 6 2 7 5"/><path d="M12 14c4 0 7-3 7-7-3 0-6 2-7 5"/><path d="M12 10c-2.5-.5-4-2-4.5-4" opacity="0.4"/><path d="M12 12c2.5-.5 4-2 4.5-4" opacity="0.4"/>
  </IconBaseDuo>
))
IconLeafyGreensDuo.displayName = 'IconLeafyGreensDuo'
