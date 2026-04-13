// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactiveAlertCircle = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="ramtt-reactive-alert-circle" {...props}>
    <g className="alert-circle-body">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8V13" />
      <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
    </g>
  </ReactiveBase>
))
IconReactiveAlertCircle.displayName = 'IconReactiveAlertCircle'
