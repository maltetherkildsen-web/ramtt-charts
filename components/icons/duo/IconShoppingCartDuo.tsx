// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconShoppingCartDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M6 6h17l-2.5 8H9L6 6Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M1 1H5L7.7 14.4C7.9 15.3 8.7 16 9.6 16H19.4C20.3 16 21 15.3 21.2 14.4L23 6H6" />
    <circle cx="10" cy="20" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="19" cy="20" r="1.5" fill="currentColor" stroke="none" />
  </IconBaseDuo>
))
IconShoppingCartDuo.displayName = 'IconShoppingCartDuo'
