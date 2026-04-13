// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactiveMail = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="ramtt-reactive-mail" {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <g className="flap">
      <path d="M3 7L12 13L21 7" />
    </g>
  </ReactiveBase>
))
IconReactiveMail.displayName = 'IconReactiveMail'
