// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSleepSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M21 12.8A9 9 0 1 1 11.2 3C12.7 4.5 13.6 6.5 13.6 8.8C13.6 13.1 10.2 16.6 5.9 16.6" />
    <circle fill="currentColor" cx="17" cy="6" r="1" />
    <circle fill="currentColor" cx="20" cy="9" r="0.8" />
    </IconBaseSolid>
))
IconSleepSolid.displayName = 'IconSleepSolid'
