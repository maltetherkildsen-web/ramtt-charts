// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconWalletSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M4 5.25A2.75 2.75 0 001.25 8v10A2.75 2.75 0 004 20.75h16A2.75 2.75 0 0022.75 18V8A2.75 2.75 0 0020 5.25H4zM2.75 10.75v7.25c0 .69.56 1.25 1.25 1.25h16c.69 0 1.25-.56 1.25-1.25v-7.25H2.75zM16 13.25a.75.75 0 000 1.5h2a.75.75 0 000-1.5h-2z"/>
  </IconBaseSolid>
))
IconWalletSolid.displayName = 'IconWalletSolid'
