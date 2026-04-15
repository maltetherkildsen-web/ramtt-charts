// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconMicroscope = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <rect x="9" y="2" width="3" height="3" rx=".5"/>
    <path d="M12 5h3v15H9"/>
    <path d="M7 13h7"/>
    <circle cx="10.5" cy="15" r="1" fill="currentColor" stroke="none"/>
  </IconBaseLight>
))
IconMicroscope.displayName = 'IconMicroscope'
