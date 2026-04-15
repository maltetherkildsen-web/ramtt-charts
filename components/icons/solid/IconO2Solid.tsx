// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconO2Solid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    {/* Two oxygen atoms with double bond knockout */}
    <path fillRule="evenodd" d="M8.5 6.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm7 0a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM10.5 10a.4.4 0 0 0-.4.4v.4a.4.4 0 0 0 .4.4h3a.4.4 0 0 0 .4-.4v-.4a.4.4 0 0 0-.4-.4h-3Zm-.4 3.2a.4.4 0 0 1 .4-.4h3a.4.4 0 0 1 .4.4v.4a.4.4 0 0 1-.4.4h-3a.4.4 0 0 1-.4-.4v-.4Z"/>
  </IconBaseSolid>
))
IconO2Solid.displayName = 'IconO2Solid'
