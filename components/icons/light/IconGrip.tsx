// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconGrip = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <circle cx="9" cy="7" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="15" cy="7" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="9" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="9" cy="17" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="15" cy="17" r="1.5" fill="currentColor" stroke="none" />
  </IconBaseLight>
))
IconGrip.displayName = 'IconGrip'
