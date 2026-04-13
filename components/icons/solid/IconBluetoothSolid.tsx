// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconBluetoothSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M6.5 6.5L17.5 17.5L12 23V1L17.5 6.5L6.5 17.5" />
    </IconBaseSolid>
))
IconBluetoothSolid.displayName = 'IconBluetoothSolid'
