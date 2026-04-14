// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPhoneSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M22 16.9v3a1.1 1.1 0 0 1-1.1 1.1C10.6 21 3 13.4 3 3.1A1.1 1.1 0 0 1 4.1 2h3c.5 0 .9.4 1 .9.2 1.2.6 2.3 1 3.3l-2.1 2.1c1.5 3.2 4.2 5.8 7.3 7.3l2.2-2.1c.9.4 1.9.7 3 .9.5.1 1 .6 1 1.1l1.5 1.4Z"/>
  </IconBaseSolid>
))
IconPhoneSolid.displayName = 'IconPhoneSolid'
