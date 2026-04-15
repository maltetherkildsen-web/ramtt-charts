// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactiveBike = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="ramtt-reactive-bike" {...props}>
    <g className="bike-body">
      <circle cx="5.5" cy="17" r="3.5"/><circle cx="18.5" cy="17" r="3.5"/><path d="M5.5 17L9 9h3"/><path d="M14 9l4.5 8"/><path d="M9 9l5 8"/><path d="M9 9h5l1.5 3"/>
    </g>
  </ReactiveBase>
))
IconReactiveBike.displayName = 'IconReactiveBike'
