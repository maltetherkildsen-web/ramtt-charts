// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconLinkSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M10 13A5 5 0 0 0 13.5 14.9L16.4 12C18 10.4 18 7.8 16.4 6.2C14.8 4.6 12.2 4.6 10.6 6.2L9 7.8" />
    <path fill="currentColor" d="M14 11A5 5 0 0 0 10.5 9.1L7.6 12C6 13.6 6 16.2 7.6 17.8C9.2 19.4 11.8 19.4 13.4 17.8L15 16.2" />
    </IconBaseSolid>
))
IconLinkSolid.displayName = 'IconLinkSolid'
