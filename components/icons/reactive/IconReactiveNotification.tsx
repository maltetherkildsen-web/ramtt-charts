// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactiveNotification = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="ramtt-reactive-notification" {...props}>
    <g className="notification-body">
      <path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" />
      <path d="M13.7 21A2 2 0 0 1 10.3 21" />
      <circle cx="18" cy="4" r="3" fill="currentColor" stroke="none" />
    </g>
  </ReactiveBase>
))
IconReactiveNotification.displayName = 'IconReactiveNotification'
