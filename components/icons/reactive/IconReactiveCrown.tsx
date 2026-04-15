// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactiveCrown = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="ramtt-reactive-crown" {...props}>
    <g className="crown-body">
      <path d="M2 17l3-10 4.5 5L12 4l2.5 8 4.5-5 3 10H2z"/><path d="M4 20h16"/>
    </g>
  </ReactiveBase>
))
IconReactiveCrown.displayName = 'IconReactiveCrown'
