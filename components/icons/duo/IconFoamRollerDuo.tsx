// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconFoamRollerDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="3" y="8" width="18" height="8" rx="4" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <rect x="3" y="8" width="18" height="8" rx="4"/>
    <path d="M8 8v8M12 8v8M16 8v8"/>
  </IconBaseDuo>
))
IconFoamRollerDuo.displayName = 'IconFoamRollerDuo'
