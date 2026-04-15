// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconKidneyDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M14 3c3 0 6 3.5 6 9s-3 9-6 9-4-2-5-5c-.5-2-.5-4 0-6 1-4 3-7 5-7Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M14 3c3 0 6 3.5 6 9s-3 9-6 9-4-2-5-5c-.5-2-.5-4 0-6 1-4 3-7 5-7Z"/>
    <path d="M9 12c-1 .5-2.5 2-3.5 4"/>
    <path d="M5.5 16L5 21"/>
  </IconBaseDuo>
))
IconKidneyDuo.displayName = 'IconKidneyDuo'
