// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconSunrise = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M12 2v4"/><path d="M4.93 5.93l2.83 2.83"/><path d="M19.07 5.93l-2.83 2.83"/><path d="M2 16h20"/><path d="M5 20a7 7 0 0114 0"/>
  </IconBaseLight>
))
IconSunrise.displayName = 'IconSunrise'
