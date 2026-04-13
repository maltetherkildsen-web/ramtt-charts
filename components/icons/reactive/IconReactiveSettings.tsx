// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactiveSettings = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="ramtt-reactive-settings" {...props}>
    <g className="gear-body">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2V5" />
      <path d="M12 19V22" />
      <path d="M4.93 4.93L7.05 7.05" />
      <path d="M16.95 16.95L19.07 19.07" />
      <path d="M2 12H5" />
      <path d="M19 12H22" />
      <path d="M4.93 19.07L7.05 16.95" />
      <path d="M16.95 7.05L19.07 4.93" />
    </g>
  </ReactiveBase>
))
IconReactiveSettings.displayName = 'IconReactiveSettings'
