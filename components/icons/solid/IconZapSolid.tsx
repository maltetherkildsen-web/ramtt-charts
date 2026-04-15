// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconZapSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M13.75 1.25a.75.75 0 00-1.44-.17l-8.5 11a.75.75 0 00.62 1.17h6.72l-.84 7.55a.75.75 0 001.38.47l9-12a.75.75 0 00-.62-1.17h-6.28l.72-5.76a.75.75 0 00-.76-.84z"/>
  </IconBaseSolid>
))
IconZapSolid.displayName = 'IconZapSolid'
