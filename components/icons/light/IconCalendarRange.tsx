// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconCalendarRange = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <rect x="4" y="5" width="16" height="16" rx="2"/>
    <path d="M8 2v3"/>
    <path d="M16 2v3"/>
    <path d="M4 10h16"/>
    <rect x="7" y="13" width="4" height="3" rx=".5" fill="currentColor" fillOpacity={0.15} stroke="none"/>
    <rect x="13" y="13" width="4" height="3" rx=".5" fill="currentColor" fillOpacity={0.15} stroke="none"/>
  </IconBaseLight>
))
IconCalendarRange.displayName = 'IconCalendarRange'
