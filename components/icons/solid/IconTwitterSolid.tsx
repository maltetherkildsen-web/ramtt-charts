// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTwitterSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M4 4h4.5l11.5 16h-4.5L4 4ZM4 20l6.5-7.5M20 4l-6.5 7.5"/>
  </IconBaseSolid>
))
IconTwitterSolid.displayName = 'IconTwitterSolid'
