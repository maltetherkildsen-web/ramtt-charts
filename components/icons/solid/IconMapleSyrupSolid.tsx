// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMapleSyrupSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 2v2l-2 2 3 1-2 3 4-1v3l3-3-1-3 3-1-2-2V2l-3 2-3-2z" fill="currentColor"/><path d="M12 14v8M9 19h6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconMapleSyrupSolid.displayName = 'IconMapleSyrupSolid'
