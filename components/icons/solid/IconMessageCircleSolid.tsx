// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMessageCircleSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M21 12c0 4.4-4 8-9 8-1.4 0-2.7-.3-3.9-.8L3 21l1.8-5C3.7 14.5 3 12.8 3 11c0-4.4 4-8 9-8s9 3.6 9 8v1Z"/>
  </IconBaseSolid>
))
IconMessageCircleSolid.displayName = 'IconMessageCircleSolid'
