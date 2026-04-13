// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSodiumSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M12 2L20 8V16L12 22L4 16V8L12 2Z" />
    <path fill="currentColor" d="M12 8L16 11V15L12 18L8 15V11L12 8Z" />
    </IconBaseSolid>
))
IconSodiumSolid.displayName = 'IconSodiumSolid'
