// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconDropletDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M12 2.69S5 10.69 5 15a7 7 0 0 0 14 0c0-4.31-7-12.31-7-12.31Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M12 2.7C12 2.7 5 10.7 5 15C5 18.9 8.1 22 12 22C15.9 22 19 18.9 19 15C19 10.7 12 2.7 12 2.7Z" />
  </IconBaseDuo>
))
IconDropletDuo.displayName = 'IconDropletDuo'
