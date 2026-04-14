// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconProteinDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="7" y="9" width="10" height="13" rx="2" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <rect x="7" y="9" width="10" height="13" rx="2"/>
    <path d="M8 5h8v4H8V5Z"/>
    <path d="M9 13h6"/>
    <path d="M9 16h4"/>
  </IconBaseDuo>
))
IconProteinDuo.displayName = 'IconProteinDuo'
