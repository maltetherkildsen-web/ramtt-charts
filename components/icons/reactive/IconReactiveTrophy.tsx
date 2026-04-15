// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactiveTrophy = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="ramtt-reactive-trophy" {...props}>
    <g className="trophy-body">
      <path d="M6 4h12v6a6 6 0 01-12 0V4z"/><path d="M6 7H4a2 2 0 00-2 2v1a3 3 0 003 3h1.1"/><path d="M18 7h2a2 2 0 012 2v1a3 3 0 01-3 3h-1.1"/><path d="M9 17h6"/><path d="M10 21h4"/><path d="M12 14v3"/>
    </g>
  </ReactiveBase>
))
IconReactiveTrophy.displayName = 'IconReactiveTrophy'
