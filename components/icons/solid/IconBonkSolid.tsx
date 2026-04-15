// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconBonkSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M6 6.25A2.75 2.75 0 003.25 9v6A2.75 2.75 0 006 17.75h10A2.75 2.75 0 0018.75 15v-1.25H20a.75.75 0 00.75-.75v-2a.75.75 0 00-.75-.75h-1.25V9A2.75 2.75 0 0016 6.25H6zm5.6.93a.75.75 0 00-1.35.27l-1.5 5a.75.75 0 00.72.97h1.66l-1.07 3.57a.75.75 0 001.34.52l2-4a.75.75 0 00-.67-1.09h-1.56l1.07-3.57a.75.75 0 00-.24-.67z"/>
  </IconBaseSolid>
))
IconBonkSolid.displayName = 'IconBonkSolid'
