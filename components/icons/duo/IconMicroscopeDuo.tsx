// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconMicroscopeDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M12 5h3v15H9V5Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <rect x="9" y="2" width="3" height="3" rx=".5"/>
    <path d="M12 5h3v15H9"/>
    <path d="M7 13h7"/>
    <circle cx="10.5" cy="15" r="1" fill="currentColor" stroke="none"/>
  </IconBaseDuo>
))
IconMicroscopeDuo.displayName = 'IconMicroscopeDuo'
