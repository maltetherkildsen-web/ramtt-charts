// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconVideoSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="2" y="6" width="14" height="12" rx="2"/>
    <path d="M16 10l6-4v12l-6-4v-4Z"/>
  </IconBaseSolid>
))
IconVideoSolid.displayName = 'IconVideoSolid'
