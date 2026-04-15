// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconMapleSyrup = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M12 2v2l-2 2 3 1-2 3 4-1v3l3-3-1-3 3-1-2-2V2l-3 2-3-2z"/><path d="M12 14v8"/><path d="M9 19h6"/>
  </IconBase>
))
IconMapleSyrup.displayName = 'IconMapleSyrup'
