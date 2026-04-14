// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconDownloadSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M12 4v8.5l-3.5-3.5-1.4 1.4L12 15.3l4.9-4.9-1.4-1.4L12 12.5V4Z"/>
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2h-2v2H6v-2H4Z"/>
  </IconBaseSolid>
))
IconDownloadSolid.displayName = 'IconDownloadSolid'
