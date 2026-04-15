// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconGranolaSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <circle cx="6" cy="10" r="3"/><circle cx="13" cy="8" r="3.5"/><circle cx="18" cy="12" r="2.5"/><circle cx="8" cy="16" r="3"/><circle cx="15" cy="15" r="2.5"/><circle cx="11" cy="19" r="2"/>
  </IconBaseSolid>
))
IconGranolaSolid.displayName = 'IconGranolaSolid'
