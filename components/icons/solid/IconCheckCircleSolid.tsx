// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCheckCircleSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm4.06 6.56a.75.75 0 0 0-1.12-1l-4.44 4.96-1.94-1.94a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.09-.03l5-5.58Z"/>
  </IconBaseSolid>
))
IconCheckCircleSolid.displayName = 'IconCheckCircleSolid'
