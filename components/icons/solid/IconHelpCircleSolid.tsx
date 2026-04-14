// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconHelpCircleSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM10.25 9a1.75 1.75 0 0 1 3.5 0c0 .9-1 1.4-1.7 2-.3.3-.55.6-.55 1v.5a.75.75 0 0 0 1.5 0v-.3c.1-.2.4-.5.8-.8.7-.6 1.45-1.3 1.45-2.4a3.25 3.25 0 0 0-6.5 0 .75.75 0 0 0 1.5 0ZM12 15.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>
  </IconBaseSolid>
))
IconHelpCircleSolid.displayName = 'IconHelpCircleSolid'
