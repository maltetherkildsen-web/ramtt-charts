// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconUploadSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M12 15V6.5l3.5 3.5 1.4-1.4L12 3.7 7.1 8.6l1.4 1.4L12 6.5V15Z"/>
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2h-2v2H6v-2H4Z"/>
  </IconBaseSolid>
))
IconUploadSolid.displayName = 'IconUploadSolid'
