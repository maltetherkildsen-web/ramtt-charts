// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconGelPacketSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M8 4h8l1 2v12a2 2 0 01-2 2H9a2 2 0 01-2-2V6l1-2z" fill="currentColor"/><path d="M8 4l-1-1.5h2L8 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconGelPacketSolid.displayName = 'IconGelPacketSolid'
