// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconTerminal = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2"/>
    <path d="M7 9l3 3-3 3"/>
    <path d="M13 15h4"/>
  </IconBaseLight>
))
IconTerminal.displayName = 'IconTerminal'
