// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconForkKnifeDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="2" y="2" width="8" height="14" rx="3"/><rect x="16" y="2" width="6" height="11" rx="3"/>
    </g>
    {/* Foreground */}
    <path d="M3 2v8a3 3 0 003 3h1v9"/><path d="M7 2v8a3 3 0 01-3 3"/><path d="M5 2v5"/><path d="M17 2v6a3 3 0 003 3h0v0"/><path d="M20 2v20"/><path d="M17 8h3"/>
  </IconBaseDuo>
))
IconForkKnifeDuo.displayName = 'IconForkKnifeDuo'
