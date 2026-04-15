// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSoupSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M4 12c0 5 3.5 8 8 8s8-3 8-8H4z" fill="currentColor"/><path d="M2 12h20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M8 8c0-1 .5-2 1.5-2M12 7c0-1.5.5-2 1.5-3M16 8c0-1 .5-2 1.5-2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>
  </IconBaseSolid>
))
IconSoupSolid.displayName = 'IconSoupSolid'
