// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconSleep = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/>
    <circle cx="17" cy="6" r="1" fill="currentColor" stroke="none"/>
    <circle cx="20" cy="9" r=".75" fill="currentColor" stroke="none"/>
  </IconBase>
))
IconSleep.displayName = 'IconSleep'
