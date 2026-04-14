// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSodiumSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M12 2l8 6v8l-8 6-8-6V8l8-6Z"/>
    <path d="M12 8l4 3v5l-4 3-4-3v-5l4-3Z"/>
  </IconBaseSolid>
))
IconSodiumSolid.displayName = 'IconSodiumSolid'
