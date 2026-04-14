// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconAlertCircleSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-.75 5a.75.75 0 0 1 1.5 0v5a.75.75 0 0 1-1.5 0V8ZM12 16a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>
  </IconBaseSolid>
))
IconAlertCircleSolid.displayName = 'IconAlertCircleSolid'
