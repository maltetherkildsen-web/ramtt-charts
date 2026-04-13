// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconWeightSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M12 3L3 7V9H21V7L12 3Z" />
    <path fill="currentColor" d="M5 9V18C5 19.1 5.9 20 7 20H17C18.1 20 19 19.1 19 18V9" />
    <circle fill="currentColor" cx="12" cy="14" r="3" />
    <path fill="currentColor" d="M12 11V14L14 14.5" />
    </IconBaseSolid>
))
IconWeightSolid.displayName = 'IconWeightSolid'
