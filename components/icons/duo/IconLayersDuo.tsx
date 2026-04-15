// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconLayersDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M12 2L2 7l10 5 10-5L12 2z"/>
    </g>
    {/* Foreground */}
    <path d="M12 2L2 7l10 5 10-5L12 2z"/><path d="M2 12l10 5 10-5"/><path d="M2 17l10 5 10-5"/>
  </IconBaseDuo>
))
IconLayersDuo.displayName = 'IconLayersDuo'
