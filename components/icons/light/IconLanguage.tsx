// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconLanguage = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M5 8l7 8"/><path d="M12 8l-7 8"/><path d="M2 8h16"/><path d="M3 12h10"/><path d="M14 4l3 8 3-8"/><path d="M15 8h4"/>
  </IconBaseLight>
))
IconLanguage.displayName = 'IconLanguage'
