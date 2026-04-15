// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTanLinesSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M8 3h8l3 4v2h-3v11H8V9H5V7l3-4z" fill="currentColor"/><path d="M5 7h3v2H5zm11 0h3v2h-3z" fill="currentColor" opacity="0.3"/><path d="M8 9h8v11H8V9z" fill="currentColor" opacity="0.5"/>
  </IconBaseSolid>
))
IconTanLinesSolid.displayName = 'IconTanLinesSolid'
