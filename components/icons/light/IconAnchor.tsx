// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconAnchor = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <circle cx="12" cy="5" r="3"/><path d="M12 8v14"/><path d="M5 12H2a10 10 0 0020 0h-3"/><path d="M12 22a10 10 0 01-10-10"/><path d="M12 22a10 10 0 0010-10"/>
  </IconBaseLight>
))
IconAnchor.displayName = 'IconAnchor'
