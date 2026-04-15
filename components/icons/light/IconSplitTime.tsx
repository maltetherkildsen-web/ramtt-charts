// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconSplitTime = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <circle cx="12" cy="14" r="7"/>
    <path d="M10 3h4"/>
    <path d="M12 3v4"/>
    <path d="M12 11v3l2 2"/>
  </IconBaseLight>
))
IconSplitTime.displayName = 'IconSplitTime'
