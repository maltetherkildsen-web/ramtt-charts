// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconWalletDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="2" y="6" width="20" height="14" rx="2"/>
    </g>
    {/* Foreground */}
    <rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M16 14h2"/>
  </IconBaseDuo>
))
IconWalletDuo.displayName = 'IconWalletDuo'
