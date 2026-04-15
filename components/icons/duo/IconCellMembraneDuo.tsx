// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCellMembraneDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="2" y="4" width="20" height="16" rx="2" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <circle cx="5" cy="7" r="1.5"/>
    <circle cx="9" cy="7" r="1.5"/>
    <circle cx="13" cy="7" r="1.5"/>
    <circle cx="17" cy="7" r="1.5"/>
    <line x1="5" y1="8.5" x2="5" y2="11.5"/>
    <line x1="9" y1="8.5" x2="9" y2="11.5"/>
    <line x1="13" y1="8.5" x2="13" y2="11.5"/>
    <line x1="17" y1="8.5" x2="17" y2="11.5"/>
    <line x1="7" y1="12.5" x2="7" y2="15.5"/>
    <line x1="11" y1="12.5" x2="11" y2="15.5"/>
    <line x1="15" y1="12.5" x2="15" y2="15.5"/>
    <line x1="19" y1="12.5" x2="19" y2="15.5"/>
    <circle cx="7" cy="17" r="1.5"/>
    <circle cx="11" cy="17" r="1.5"/>
    <circle cx="15" cy="17" r="1.5"/>
    <circle cx="19" cy="17" r="1.5"/>
  </IconBaseDuo>
))
IconCellMembraneDuo.displayName = 'IconCellMembraneDuo'
