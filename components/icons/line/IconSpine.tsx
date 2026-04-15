// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconSpine = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <path d="M12 2v20"/>
    <rect x="7.5" y="3" width="9" height="2.5" rx="1.25"/>
    <rect x="8" y="8" width="8" height="2.5" rx="1.25"/>
    <rect x="8.5" y="13" width="7" height="2.5" rx="1.25"/>
    <rect x="8" y="18" width="8" height="2.5" rx="1.25"/>
  </IconBase>
))
IconSpine.displayName = 'IconSpine'
