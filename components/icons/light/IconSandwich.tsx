// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconSandwich = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M3 14l9-10 9 10"/><path d="M3 14h18"/><rect x="3" y="14" width="18" height="3" rx="0.5"/><path d="M3 17h18v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"/>
  </IconBaseLight>
))
IconSandwich.displayName = 'IconSandwich'
