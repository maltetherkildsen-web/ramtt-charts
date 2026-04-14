// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCadenceDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <circle cx="12" cy="12" r="7" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <circle cx="12" cy="12" r="7"/>
    <path d="M12 12l5-4"/>
    <circle cx="17" cy="8" r="1.5" fill="currentColor" stroke="none"/>
    <path d="M12 12l-5 4"/>
    <circle cx="7" cy="16" r="1.5" fill="currentColor" stroke="none"/>
  </IconBaseDuo>
))
IconCadenceDuo.displayName = 'IconCadenceDuo'
