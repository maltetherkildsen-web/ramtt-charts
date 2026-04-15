// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSuperCompensationSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M2 14h3c1 0 1.5 1 2 3s1.5 3 2 3h1c1 0 1.5-2 2-5s1.5-5 2.5-5 1.5 1 2 2.5 1.5 3 3 3H22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12h20" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2 2" opacity="0.4"/>
  </IconBaseSolid>
))
IconSuperCompensationSolid.displayName = 'IconSuperCompensationSolid'
