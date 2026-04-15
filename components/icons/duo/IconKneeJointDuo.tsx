// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconKneeJointDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="7" y="2" width="10" height="20" rx="5" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M10 2v3h4V2"/>
    <ellipse cx="12" cy="7.5" rx="4" ry="2.5"/>
    <path d="M7 12h10"/>
    <ellipse cx="12" cy="16.5" rx="4" ry="2.5"/>
    <path d="M10 19v3h4v-3"/>
  </IconBaseDuo>
))
IconKneeJointDuo.displayName = 'IconKneeJointDuo'
