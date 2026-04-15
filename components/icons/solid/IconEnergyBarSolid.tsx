// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconEnergyBarSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M4.5 7.25A2.25 2.25 0 002.25 9.5v5a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-15z"/><path d="M6 8V6l3-1M6 16v2l3 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconEnergyBarSolid.displayName = 'IconEnergyBarSolid'
