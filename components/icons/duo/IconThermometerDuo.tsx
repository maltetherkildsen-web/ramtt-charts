// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconThermometerDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="2" y="2" width="20" height="20" rx="4" fill={props.accent || 'currentColor'} opacity={0.15} stroke="none" />
    {/* Foreground */}

    <path d="M14 14.8V4C14 2.9 13.1 2 12 2C10.9 2 10 2.9 10 4V14.8C8.8 15.5 8 16.8 8 18.2C8 20.3 9.8 22 12 22C14.2 22 16 20.3 16 18.2C16 16.8 15.2 15.5 14 14.8Z" />
    <path d="M12 18V10" />
    </IconBaseDuo>
))
IconThermometerDuo.displayName = 'IconThermometerDuo'
