// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCHOSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M12 3L17 6V12L12 15L7 12V6L12 3Z" />
    <path fill="currentColor" d="M12 15V21" />
    </IconBaseSolid>
))
IconCHOSolid.displayName = 'IconCHOSolid'
