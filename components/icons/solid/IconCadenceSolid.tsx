// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCadenceSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M12 4a8 8 0 0 0-7.5 4.5h-2.2A10 10 0 0 1 22 12a10 10 0 0 1-10 10A10 10 0 0 1 2.3 8.5ZM4.5 4v4.5H9l-4.5-4.5Z"/>
  </IconBaseSolid>
))
IconCadenceSolid.displayName = 'IconCadenceSolid'
