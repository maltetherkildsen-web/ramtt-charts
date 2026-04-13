// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTrashSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M4 6H20" />
    <path fill="currentColor" d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" />
    <path fill="currentColor" d="M6 6L7 20C7 21 8 22 9 22H15C16 22 17 21 17 20L18 6" />
    <path fill="currentColor" d="M10 10V17" />
    <path fill="currentColor" d="M14 10V17" />
    </IconBaseSolid>
))
IconTrashSolid.displayName = 'IconTrashSolid'
