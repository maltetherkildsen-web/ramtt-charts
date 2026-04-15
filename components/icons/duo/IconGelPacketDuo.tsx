// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconGelPacketDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M8 4h8l1 2v12a2 2 0 01-2 2H9a2 2 0 01-2-2V6l1-2z"/>
    </g>
    {/* Foreground */}
    <path d="M8 4h8l1 2v12a2 2 0 01-2 2H9a2 2 0 01-2-2V6l1-2z"/><path d="M8 4l-1-1.5h2L8 4"/><path d="M8 8h8"/><path d="M10 12v4" opacity="0.3"/><path d="M12 11v5" opacity="0.3"/><path d="M14 12v4" opacity="0.3"/>
  </IconBaseDuo>
))
IconGelPacketDuo.displayName = 'IconGelPacketDuo'
