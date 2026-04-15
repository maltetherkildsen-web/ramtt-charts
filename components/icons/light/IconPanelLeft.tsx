// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconPanelLeft = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3V21" />
  </IconBaseLight>
))
IconPanelLeft.displayName = 'IconPanelLeft'
