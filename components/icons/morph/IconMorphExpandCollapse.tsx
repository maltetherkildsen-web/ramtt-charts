// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphExpandCollapseProps extends MorphIconProps {
  state: 'expand' | 'collapse'
}

// Matched: each path has M L L and M L (corner arrow with diagonal)
const PATHS = {
  expand: {
    topRight: 'M14 3 L21 3 L21 10',
    topRightDiag: 'M21 3 L14 10',
    bottomLeft: 'M10 21 L3 21 L3 14',
    bottomLeftDiag: 'M3 21 L10 14',
  },
  collapse: {
    topRight: 'M21 10 L14 10 L14 3',
    topRightDiag: 'M14 10 L21 3',
    bottomLeft: 'M3 14 L10 14 L10 21',
    bottomLeftDiag: 'M10 14 L3 21',
  },
}

const TRANSITION = 'd var(--morph-duration) var(--ease-out-expo)'

export const IconMorphExpandCollapse = forwardRef<SVGSVGElement, IconMorphExpandCollapseProps>(
  ({ state, ...props }, ref) => {
    const paths = PATHS[state]
    return (
      <MorphBase ref={ref} {...props}>
        <path d={paths.topRight} style={{ transition: TRANSITION }} />
        <path d={paths.topRightDiag} style={{ transition: TRANSITION }} />
        <path d={paths.bottomLeft} style={{ transition: TRANSITION }} />
        <path d={paths.bottomLeftDiag} style={{ transition: TRANSITION }} />
      </MorphBase>
    )
  },
)
IconMorphExpandCollapse.displayName = 'IconMorphExpandCollapse'
