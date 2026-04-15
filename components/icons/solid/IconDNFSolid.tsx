// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconDNFSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M4 3.25a.75.75 0 01.75.75v16a.75.75 0 01-1.5 0V4a.75.75 0 01.75-.75zm16 0a.75.75 0 01.75.75v16a.75.75 0 01-1.5 0V4a.75.75 0 01.75-.75z"/><path d="M4.75 7.25h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 010-1.5zm9 2h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5z"/><path d="M10.5 8.25l1.5.75 1.5-.75" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="2 2"/>
  </IconBaseSolid>
))
IconDNFSolid.displayName = 'IconDNFSolid'
