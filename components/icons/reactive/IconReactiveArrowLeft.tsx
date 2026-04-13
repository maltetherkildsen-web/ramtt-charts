// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactiveArrowLeft = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="ramtt-reactive-arrow-left" {...props}>
    <g className="arrow-body">
      <path d="M20 12H4" />
      <path d="M10 18L4 12L10 6" />
    </g>
  </ReactiveBase>
))
IconReactiveArrowLeft.displayName = 'IconReactiveArrowLeft'
