// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconMapDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M1 6V22L8 18L16 22L23 18V2L16 6L8 2L1 6Z" />
    <path d="M8 2V18" />
    <path d="M16 6V22" />
  </IconBaseDuo>
))
IconMapDuo.displayName = 'IconMapDuo'
