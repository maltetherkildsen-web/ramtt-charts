// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconAlertCircleSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle fill="currentColor" cx="12" cy="12" r="9" />
    <path fill="currentColor" d="M12 8V13" />
    <circle fill="currentColor" cx="12" cy="16" r="1" />
    </IconBaseSolid>
))
IconAlertCircleSolid.displayName = 'IconAlertCircleSolid'
