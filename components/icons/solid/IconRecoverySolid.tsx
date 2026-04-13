// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconRecoverySolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M16 3C16 3 14 6 14 9C14 12.3 16.7 15 20 15" />
    <path fill="currentColor" d="M12 3C12 3 14 6 14 9" />
    <path fill="currentColor" d="M17 9L19 7" />
    <path fill="currentColor" d="M15 7L17 5" />
    </IconBaseSolid>
))
IconRecoverySolid.displayName = 'IconRecoverySolid'
