// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphBookmarkToggleProps extends MorphIconProps {
  state: 'empty' | 'filled'
}

// Bookmark shape — same path for both states, fill opacity toggles
const BOOKMARK_D = 'M5 3 L19 3 L19 21 L12 15 L5 21 Z'

export const IconMorphBookmarkToggle = forwardRef<SVGSVGElement, IconMorphBookmarkToggleProps>(
  ({ state, ...props }, ref) => (
    <MorphBase ref={ref} {...props}>
      <path
        d={BOOKMARK_D}
        fill={state === 'filled' ? 'currentColor' : 'none'}
        style={{
          transition: `fill-opacity var(--morph-duration) var(--ease-out-expo)`,
          fillOpacity: state === 'filled' ? 1 : 0,
        }}
      />
    </MorphBase>
  ),
)
IconMorphBookmarkToggle.displayName = 'IconMorphBookmarkToggle'
