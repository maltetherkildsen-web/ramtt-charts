// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphMenuCloseProps extends MorphIconProps {
  state: 'menu' | 'close'
}

const PATHS = {
  menu: {
    top: 'M5 7 L19 7',
    mid: 'M5 12 L19 12',
    bot: 'M5 17 L19 17',
  },
  close: {
    top: 'M6 6 L18 18',
    mid: 'M12 12 L12 12',
    bot: 'M18 6 L6 18',
  },
}

const TRANSITION = 'd var(--morph-duration) var(--ease-out-expo)'

export const IconMorphMenuClose = forwardRef<SVGSVGElement, IconMorphMenuCloseProps>(
  ({ state, ...props }, ref) => {
    const paths = PATHS[state]
    return (
      <MorphBase ref={ref} {...props}>
        <path d={paths.top} style={{ transition: TRANSITION }} />
        <path
          d={paths.mid}
          style={{
            transition: `${TRANSITION}, opacity var(--morph-duration) var(--ease-out-expo)`,
            opacity: state === 'close' ? 0 : 1,
          }}
        />
        <path d={paths.bot} style={{ transition: TRANSITION }} />
      </MorphBase>
    )
  },
)
IconMorphMenuClose.displayName = 'IconMorphMenuClose'
