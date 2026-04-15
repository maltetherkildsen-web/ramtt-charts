// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconChainTattooSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M8 2v18M14 2v18" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M8 4h6M8 20h6" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M15 9.5c2.5-.5 4 1.5 3.5 3.5s-2.5 3-4 2.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5"/><path d="M15 12.5c2.5-.5 4 1.5 3.5 3.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5"/>
  </IconBaseSolid>
))
IconChainTattooSolid.displayName = 'IconChainTattooSolid'
