// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconVerticalOscillationSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M2 12c2-4 4-4 5 0s3 4 5 0 3-4 5 0 3 4 5 0" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M6.25 7a.75.75 0 01.75-.75.75.75 0 01.75.75v10a.75.75 0 01-1.5 0V7z"/><path d="M5.47 7.53a.75.75 0 011.06-1.06l.97.97.97-.97a.75.75 0 011.06 1.06l-1.5 1.5a.75.75 0 01-1.06 0l-1.5-1.5zM5.47 16.47a.75.75 0 011.06 0l1.5 1.5a.75.75 0 001.06 0l-1.5-1.5a.75.75 0 011.06-1.06l1.5 1.5a.75.75 0 010 1.06l-1.5 1.5a.75.75 0 01-1.06 0l-1.5-1.5a.75.75 0 010-1.06z"/>
  </IconBaseSolid>
))
IconVerticalOscillationSolid.displayName = 'IconVerticalOscillationSolid'
