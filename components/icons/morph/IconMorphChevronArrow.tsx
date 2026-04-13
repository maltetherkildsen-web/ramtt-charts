// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphChevronArrowProps extends MorphIconProps {
  state: 'chevron' | 'arrow'
}

// Matched structure: M L L for head, M L for shaft
const PATHS = {
  chevron: {
    head: 'M9 5 L16 12 L9 19',
    shaft: 'M12 12 L12 12',
  },
  arrow: {
    head: 'M14 5 L21 12 L14 19',
    shaft: 'M3 12 L21 12',
  },
}

const TRANSITION = 'd var(--morph-duration) var(--ease-out-expo)'

export const IconMorphChevronArrow = forwardRef<SVGSVGElement, IconMorphChevronArrowProps>(
  ({ state, ...props }, ref) => {
    const paths = PATHS[state]
    return (
      <MorphBase ref={ref} {...props}>
        <path d={paths.head} style={{ transition: TRANSITION }} />
        <path d={paths.shaft} style={{ transition: TRANSITION }} />
      </MorphBase>
    )
  },
)
IconMorphChevronArrow.displayName = 'IconMorphChevronArrow'
