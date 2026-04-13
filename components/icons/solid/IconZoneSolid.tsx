// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconZoneSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M3 5H21" />
    <path fill="currentColor" d="M3 9H21" />
    <path fill="currentColor" d="M3 13H21" />
    <path fill="currentColor" d="M3 17H21" />
    <path fill="currentColor" d="M3 21H21" />
    </IconBaseSolid>
))
IconZoneSolid.displayName = 'IconZoneSolid'
