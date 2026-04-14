// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconBluetoothSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M12 1v9.17L7.41 5.59 6 7l5 5-5 5 1.41 1.41L12 13.83V23l6.71-5.71a1 1 0 0 0 0-1.58L14.41 12l4.3-3.71a1 1 0 0 0 0-1.58L12 1Zm1.5 14.33l2.59 2.17-2.59 2.2v-4.37Zm0-4.66V5.3l2.59 2.2-2.59 2.17Z"/>
  </IconBaseSolid>
))
IconBluetoothSolid.displayName = 'IconBluetoothSolid'
