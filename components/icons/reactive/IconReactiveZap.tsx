// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactiveZap = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="ramtt-reactive-zap" {...props}>
    <g className="zap-body">
      <path d="M13 2L4.5 13H12l-1 9L20 10h-8l1-8z"/>
    </g>
  </ReactiveBase>
))
IconReactiveZap.displayName = 'IconReactiveZap'
