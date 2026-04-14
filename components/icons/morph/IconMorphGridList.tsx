// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphGridListProps extends MorphIconProps {
  state: 'grid' | 'list'
}

// Grid: 4 squares (2x2). List: 4 horizontal lines.
// Matched: each path is M L L L Z — a rectangle that morphs shape
const PATHS = {
  grid: {
    row1left:  'M3 3 L10 3 L10 10 L3 10 Z',
    row1right: 'M14 3 L21 3 L21 10 L14 10 Z',
    row2left:  'M3 14 L10 14 L10 21 L3 21 Z',
    row2right: 'M14 14 L21 14 L21 21 L14 21 Z',
  },
  list: {
    row1left:  'M3 4 L21 4 L21 6 L3 6 Z',
    row1right: 'M3 9 L21 9 L21 11 L3 11 Z',
    row2left:  'M3 14 L21 14 L21 16 L3 16 Z',
    row2right: 'M3 19 L21 19 L21 21 L3 21 Z',
  },
}

const TRANSITION = 'd var(--morph-duration) var(--ease-out-expo)'

export const IconMorphGridList = forwardRef<SVGSVGElement, IconMorphGridListProps>(
  ({ state, ...props }, ref) => {
    const paths = PATHS[state]
    return (
      <MorphBase ref={ref} {...props}>
        <path d={paths.row1left} style={{ transition: TRANSITION }} fill="none" />
        <path d={paths.row1right} style={{ transition: TRANSITION }} fill="none" />
        <path d={paths.row2left} style={{ transition: TRANSITION }} fill="none" />
        <path d={paths.row2right} style={{ transition: TRANSITION }} fill="none" />
      </MorphBase>
    )
  },
)
IconMorphGridList.displayName = 'IconMorphGridList'
