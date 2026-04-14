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
    <path d="M12 2C9 2 6.5 3.5 5.5 6C4 6.5 3 8 3 10C3 11.5 3.5 12.5 4 13.5C3.5 14.5 3 16 3.5 17.5C4 19 5.5 20 7 20C8 20 9 19.5 9.5 19C10 20 11 21 12 21" />
    <path d="M12 2C15 2 17.5 3.5 18.5 6C20 6.5 21 8 21 10C21 11.5 20.5 12.5 20 13.5C20.5 14.5 21 16 20.5 17.5C20 19 18.5 20 17 20C16 20 15 19.5 14.5 19C14 20 13 21 12 21" />
    <path d="M12 2V21" />
  </IconBaseDuo>
))
IconBrainDuo.displayName = 'IconBrainDuo'
