// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactiveCreditCard = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="ramtt-reactive-credit-card" {...props}>
    <g className="card-body">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10H22" />
    </g>
  </ReactiveBase>
))
IconReactiveCreditCard.displayName = 'IconReactiveCreditCard'
