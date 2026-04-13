// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSendSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M22 2L11 13" />
    <path fill="currentColor" d="M22 2L15 22L11 13L2 9L22 2Z" />
    </IconBaseSolid>
))
IconSendSolid.displayName = 'IconSendSolid'
