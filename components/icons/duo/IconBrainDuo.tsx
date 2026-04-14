// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconBrainDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M12 2C9 2 6.5 3.5 5.5 6 4 6.5 3 8 3 10c0 1.5.5 2.5 1 3.5-.5 1-1 2.5-.5 4s2 3 3.5 3c1 0 2-.5 2.5-1 .5 1 1.5 2 2.5 2s2-1 2.5-2c.5.5 1.5 1 2.5 1 1.5 0 3-1 3.5-3s0-3-.5-4c.5-1 1-2 1-3.5 0-2-1-3.5-2.5-4C18.5 3.5 15 2 12 2Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M12 2C9 2 6.5 3.5 5.5 6 4 6.5 3 8 3 10c0 1.5.5 2.5 1 3.5-.5 1-1 2.5-.5 4s2 3 3.5 3c1 0 2-.5 2.5-1 .5 1 1.5 2 2.5 2V2Z"/>
    <path d="M12 2c3 0 5.5 1.5 6.5 4 1.5.5 2.5 2 2.5 4 0 1.5-.5 2.5-1 3.5.5 1 1 2.5.5 4s-2 3-3.5 3c-1 0-2-.5-2.5-1-.5 1-1.5 2-2.5 2V2Z"/>
  </IconBaseDuo>
))
IconBrainDuo.displayName = 'IconBrainDuo'
