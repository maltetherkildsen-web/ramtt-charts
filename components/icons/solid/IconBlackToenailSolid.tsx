// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconBlackToenailSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M4 16c0 2 2 4 6 4h4c4 0 6-2 6-4s-2-3-4-4-4-2-6-2-6 4-6 6z" fill="currentColor" opacity="0.2"/><circle cx="8" cy="14" r="1.75" fill="currentColor" opacity="0.4"/><circle cx="11" cy="13" r="1.75" fill="currentColor" opacity="0.4"/><circle cx="14" cy="13" r="2" fill="currentColor"/><circle cx="17" cy="14" r="1.75" fill="currentColor" opacity="0.4"/><circle cx="12.5" cy="16.5" r="1.25" fill="currentColor" opacity="0.4"/>
  </IconBaseSolid>
))
IconBlackToenailSolid.displayName = 'IconBlackToenailSolid'
