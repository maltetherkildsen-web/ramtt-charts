// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconProteinDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="2" y="8.5" width="20" height="7" rx="3.5" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <circle cx="5" cy="12" r="3" />
    <circle cx="12" cy="12" r="3" />
    <circle cx="19" cy="12" r="3" />
    <path d="M8 12H9" />
    <path d="M15 12H16" />
  </IconBaseDuo>
))
IconProteinDuo.displayName = 'IconProteinDuo'
