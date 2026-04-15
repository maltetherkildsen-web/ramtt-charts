// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactivePizzaSlice = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="ramtt-reactive-pizza" {...props}>
    <g className="pizza-body">
      <path d="M12 2L3 20h18L12 2z"/><circle cx="10" cy="13" r="1" fill="currentColor" stroke="none"/><circle cx="14" cy="15" r="1" fill="currentColor" stroke="none"/><circle cx="11" cy="17" r="1" fill="currentColor" stroke="none"/><path d="M6 14c2-1 4-1 6 0s4 1 6 0"/>
    </g>
  </ReactiveBase>
))
IconReactivePizzaSlice.displayName = 'IconReactivePizzaSlice'
