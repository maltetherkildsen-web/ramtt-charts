// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSettingsSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle fill="currentColor" cx="12" cy="12" r="3" />
    {/* 6 gear teeth — simplified for clarity at small sizes */}
    <path fill="currentColor" d="M12 2V5" />
    <path fill="currentColor" d="M12 19V22" />
    <path fill="currentColor" d="M4.93 4.93L7.05 7.05" />
    <path fill="currentColor" d="M16.95 16.95L19.07 19.07" />
    <path fill="currentColor" d="M2 12H5" />
    <path fill="currentColor" d="M19 12H22" />
    <path fill="currentColor" d="M4.93 19.07L7.05 16.95" />
    <path fill="currentColor" d="M16.95 7.05L19.07 4.93" />
    </IconBaseSolid>
))
IconSettingsSolid.displayName = 'IconSettingsSolid'
