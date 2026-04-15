// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconBowlSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M3 10c0 5 4 9 9 9s9-4 9-9H3z" fill="currentColor"/><path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><circle cx="8" cy="13" r="1.75" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/><circle cx="12" cy="12" r="1.75" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/><circle cx="16" cy="13" r="1.75" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
  </IconBaseSolid>
))
IconBowlSolid.displayName = 'IconBowlSolid'
