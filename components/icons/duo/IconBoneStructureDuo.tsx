// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconBoneStructureDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M8 5c0-1.7 1.8-3 4-3s4 1.3 4 3v14c0 1.7-1.8 3-4 3s-4-1.3-4-3V5Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <ellipse cx="12" cy="5" rx="4" ry="3"/>
    <rect x="10" y="7" width="4" height="10" rx="1"/>
    <ellipse cx="12" cy="19" rx="4" ry="3"/>
  </IconBaseDuo>
))
IconBoneStructureDuo.displayName = 'IconBoneStructureDuo'
