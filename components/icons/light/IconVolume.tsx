// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconVolume = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M11 5L6 9H2V15H6L11 19V5Z" />
    <path d="M15.5 8.5C16.7 9.7 17.5 11.3 17.5 13C17.5 14.7 16.7 16.3 15.5 17.5" />
    <path d="M19 5C21.2 7.2 22.5 10.2 22.5 13C22.5 15.8 21.2 18.8 19 21" />
  </IconBaseLight>
))
IconVolume.displayName = 'IconVolume'
