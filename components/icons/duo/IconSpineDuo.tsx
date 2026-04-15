// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSpineDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="7" y="2" width="10" height="20" rx="2" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M12 2v20"/>
    <rect x="7.5" y="3" width="9" height="2.5" rx="1.25"/>
    <rect x="8" y="8" width="8" height="2.5" rx="1.25"/>
    <rect x="8.5" y="13" width="7" height="2.5" rx="1.25"/>
    <rect x="8" y="18" width="8" height="2.5" rx="1.25"/>
  </IconBaseDuo>
))
IconSpineDuo.displayName = 'IconSpineDuo'
