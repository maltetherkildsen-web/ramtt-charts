// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconRecovery = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M12 22v-10"/>
    <path d="M12 12C12 8 8 4 4 4c0 4 4 8 8 8"/>
    <path d="M12 16c0-3 3-6 6-6 0 3-3 6-6 6"/>
  </IconBaseLight>
))
IconRecovery.displayName = 'IconRecovery'
