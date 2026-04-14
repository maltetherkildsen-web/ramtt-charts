// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconSupplements = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <rect x="4" y="8" width="16" height="8" rx="4"/>
    <path d="M12 8v8"/>
  </IconBase>
))
IconSupplements.displayName = 'IconSupplements'
