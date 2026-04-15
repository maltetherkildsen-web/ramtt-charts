// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconSplitArrow = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M12 22v-10"/><path d="M5 5l7 7 7-7"/><path d="M5 5v4"/><path d="M19 5v4"/>
  </IconBaseLight>
))
IconSplitArrow.displayName = 'IconSplitArrow'
