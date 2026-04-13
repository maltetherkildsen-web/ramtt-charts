// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconAlertTriangleSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M12 3L2 21H22L12 3Z" />
    <path fill="currentColor" d="M12 10V14" />
    <circle fill="currentColor" cx="12" cy="17.5" r="1" />
    </IconBaseSolid>
))
IconAlertTriangleSolid.displayName = 'IconAlertTriangleSolid'
