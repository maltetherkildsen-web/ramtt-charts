// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSmartphoneSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect fill="currentColor" x="5" y="2" width="14" height="20" rx="3" />
    <path fill="currentColor" d="M12 18H12.01" />
    </IconBaseSolid>
))
IconSmartphoneSolid.displayName = 'IconSmartphoneSolid'
