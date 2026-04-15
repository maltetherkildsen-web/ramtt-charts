// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconChainTattooDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="7" y="2" width="8" height="18" rx="1"/>
    </g>
    {/* Foreground */}
    <path d="M8 2c0 6 0 12 0 18"/><path d="M14 2c0 6 0 12 0 18"/><path d="M8 4h6"/><path d="M8 20h6"/><path d="M15 10c1 0 2 .5 2.5 1.5s.5 2-.5 2.5-2 .5-2.5-.5-.5-2 .5-2.5c.3-.2.6-.4 1-.5"/><path d="M15 13c1 0 2 .5 2.5 1.5s.5 2-.5 2.5-2 .5-2.5-.5"/>
  </IconBaseDuo>
))
IconChainTattooDuo.displayName = 'IconChainTattooDuo'
