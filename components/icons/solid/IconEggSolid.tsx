// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconEggSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 2.25c-3.5 0-6.75 4.25-6.75 9.75S8.5 21.75 12 21.75s6.75-4.25 6.75-9.75S15.5 2.25 12 2.25z"/>
  </IconBaseSolid>
))
IconEggSolid.displayName = 'IconEggSolid'
