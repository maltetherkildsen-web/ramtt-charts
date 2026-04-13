// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconRecovery = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M16 3C16 3 14 6 14 9C14 12.3 16.7 15 20 15" />
    <path d="M12 3C12 3 14 6 14 9" />
    <path d="M17 9L19 7" />
    <path d="M15 7L17 5" />
  </IconBase>
))
IconRecovery.displayName = 'IconRecovery'
