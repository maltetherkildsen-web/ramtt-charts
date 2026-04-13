// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMessageSquareSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M4 4H20C21.1 4 22 4.9 22 6V16C22 17.1 21.1 18 20 18H8L2 22V6C2 4.9 2.9 4 4 4Z" />
    </IconBaseSolid>
))
IconMessageSquareSolid.displayName = 'IconMessageSquareSolid'
