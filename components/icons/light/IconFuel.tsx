// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconFuel = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    {/* Outer flame */}
    <path d="M12 2C12 2 6 9 6 14C6 17.3 8.7 20 12 20C15.3 20 18 17.3 18 14C18 9 12 2 12 2Z" />
    {/* Inner flicker */}
    <path d="M12 11C12 11 9.5 14 9.5 16C9.5 17.4 10.6 18.5 12 18.5C13.4 18.5 14.5 17.4 14.5 16C14.5 14 12 11 12 11Z" />
  </IconBaseLight>
))
IconFuel.displayName = 'IconFuel'
