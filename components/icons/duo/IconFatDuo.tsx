// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconFatDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M12 2.69S5 10.69 5 15a7 7 0 0 0 14 0c0-4.31-7-12.31-7-12.31Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M12 2.69S5 10.69 5 15a7 7 0 0 0 14 0c0-4.31-7-12.31-7-12.31Z"/>
    <path d="M7 16c1.5-1 3.5 1 5 0s3.5-1 5 0"/>
  </IconBaseDuo>
))
IconFatDuo.displayName = 'IconFatDuo'
