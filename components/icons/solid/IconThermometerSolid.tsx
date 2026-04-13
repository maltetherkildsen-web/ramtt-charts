// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconThermometerSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M14 14.8V4C14 2.9 13.1 2 12 2C10.9 2 10 2.9 10 4V14.8C8.8 15.5 8 16.8 8 18.2C8 20.3 9.8 22 12 22C14.2 22 16 20.3 16 18.2C16 16.8 15.2 15.5 14 14.8Z" />
    <path fill="currentColor" d="M12 18V10" />
    </IconBaseSolid>
))
IconThermometerSolid.displayName = 'IconThermometerSolid'
