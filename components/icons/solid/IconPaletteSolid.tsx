// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPaletteSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M12 1.25a10.75 10.75 0 00-1.07 21.44c.64.07 1.2-.07 1.62-.4.42-.33.7-.84.7-1.54 0-.13-.06-.3-.22-.47-.37-.37-.63-.82-.63-1.53a3 3 0 013-3H16a6.75 6.75 0 006.75-6.28v-.22A10.75 10.75 0 0012 1.25zM7.5 9a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zm2.5-3.25a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zM15 5.75a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zM15.75 11a1.75 1.75 0 113.5 0 1.75 1.75 0 01-3.5 0z"/>
  </IconBaseSolid>
))
IconPaletteSolid.displayName = 'IconPaletteSolid'
