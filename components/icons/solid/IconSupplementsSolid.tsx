// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSupplementsSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M12 4a6 6 0 0 0-6 6v4a6 6 0 0 0 12 0v-4a6 6 0 0 0-6-6Zm-5.25 8h10.5v-1.5H6.75V12Z"/>
  </IconBaseSolid>
))
IconSupplementsSolid.displayName = 'IconSupplementsSolid'
