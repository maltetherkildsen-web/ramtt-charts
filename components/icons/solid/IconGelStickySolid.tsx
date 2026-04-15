// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconGelStickySolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M8 5.25A1.75 1.75 0 016.25 7v4a.75.75 0 01-1.5 0v-1a1.75 1.75 0 00-3.5 0v4A5.75 5.75 0 007 19.75h3a6.75 6.75 0 006.75-6.75V8a1.75 1.75 0 00-3.5 0v2a.75.75 0 01-1.5 0V5a1.75 1.75 0 00-3.5 0v5a.75.75 0 01-1.5 0V7A1.75 1.75 0 008 5.25z"/><path d="M8 18l-.5 3M11 19v2.5M14 18l.5 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>
  </IconBaseSolid>
))
IconGelStickySolid.displayName = 'IconGelStickySolid'
