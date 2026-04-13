// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactiveArrowRight = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="ramtt-reactive-arrow-right" {...props}>
    <g className="arrow-body">
      <path d="M4 12H20" />
      <path d="M14 6L20 12L14 18" />
    </g>
  </ReactiveBase>
))
IconReactiveArrowRight.displayName = 'IconReactiveArrowRight'
