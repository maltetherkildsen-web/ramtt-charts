// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconBatterySolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M4 6.25A2.75 2.75 0 001.25 9v6A2.75 2.75 0 004 17.75h14A2.75 2.75 0 0020.75 15v-1.25H22a.75.75 0 00.75-.75v-2a.75.75 0 00-.75-.75h-1.25V9A2.75 2.75 0 0018 6.25H4zM4 9a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1V9z"/>
  </IconBaseSolid>
))
IconBatterySolid.displayName = 'IconBatterySolid'
