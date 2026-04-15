// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconFingerprintSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 2a7 7 0 00-7 7v2a7 7 0 003.5 6.06" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"/><path d="M12 6a3 3 0 00-3 3v3a5 5 0 002 4" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"/><path d="M12 10v4a3 3 0 003 3" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"/><path d="M19 9a7 7 0 00-3-5.75" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconFingerprintSolid.displayName = 'IconFingerprintSolid'
