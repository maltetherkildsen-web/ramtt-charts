// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconFlowState = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M12 2c-3 0-5 2-6 4s-1 5 1 7c1 1.5 1.5 3 1.5 5h7c0-2 .5-3.5 1.5-5 2-2 2-5 1-7S15 2 12 2z"/><path d="M8.5 18h7"/><path d="M9 21h6"/><path d="M8 10c1-1 2-1 3 0s2 1 3 0 2-1 3 0"/>
  </IconBaseLight>
))
IconFlowState.displayName = 'IconFlowState'
