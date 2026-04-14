// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCreditCardDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="2" y="5" width="20" height="14" rx="2" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10H22" />
  </IconBaseDuo>
))
IconCreditCardDuo.displayName = 'IconCreditCardDuo'
