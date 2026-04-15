// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconHeadwind = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <circle cx="16" cy="5" r="2"/><path d="M14 8l-4 5 4 3v6"/><path d="M10 13l-2 3"/><path d="M2 8h6"/><path d="M2 12h5"/><path d="M2 16h4"/>
  </IconBase>
))
IconHeadwind.displayName = 'IconHeadwind'
