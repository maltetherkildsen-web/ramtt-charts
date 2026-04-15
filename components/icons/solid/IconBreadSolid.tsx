// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconBreadSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 4.25c-4 0-7.75 2-7.75 5.75v8A2.75 2.75 0 007 20.75h10a2.75 2.75 0 002.75-2.75v-8c0-3.75-3.75-5.75-7.75-5.75z"/>
  </IconBaseSolid>
))
IconBreadSolid.displayName = 'IconBreadSolid'
