// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconFingerprint = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M12 2a7 7 0 00-7 7v2a7 7 0 003.5 6.06"/><path d="M12 6a3 3 0 00-3 3v3a5 5 0 002 4"/><path d="M12 10v4a3 3 0 003 3"/><path d="M19 9a7 7 0 00-3-5.75"/><path d="M19 11v-1a2 2 0 00-.25-.97"/>
  </IconBaseLight>
))
IconFingerprint.displayName = 'IconFingerprint'
