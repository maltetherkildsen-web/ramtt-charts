// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { cn, CATEGORY_COLORS, type CategoryType } from '@/lib/ui'

export interface CategoryIconProps {
  /** Content type — determines color and icon glyph */
  category: CategoryType
  /** sm=16px, md=20px */
  size?: 'sm' | 'md'
  className?: string
}

const ICON_SIZES = { sm: 16, md: 20 } as const
const GLYPH_SIZES = { sm: 10, md: 12 } as const

/** SVG glyphs — simple white paths for each category */
function Glyph({ category, size }: { category: CategoryType; size: number }) {
  const vb = `0 0 ${size} ${size}`
  const common = { width: size, height: size, viewBox: vb, fill: 'none', 'aria-hidden': true as const }

  switch (category) {
    case 'session':
      // Lightning bolt — single zigzag
      return (
        <svg {...common}>
          <path
            d={size === 10
              ? 'M5.5 1L2 5.5h2.5L3.5 9l4-4.5H5L5.5 1z'
              : 'M6.5 1L2 7h3.5L4 11l5-5.5H6L6.5 1z'}
            fill="#FFFFFF"
          />
        </svg>
      )
    case 'plan':
      // Calendar grid — top bar + 2×2 squares
      return (
        <svg {...common}>
          {size === 10 ? (
            <>
              <rect x="1.5" y="1.5" width="7" height="1.5" rx="0.5" fill="#FFFFFF" />
              <rect x="1.5" y="4" width="3" height="2.5" rx="0.5" fill="#FFFFFF" />
              <rect x="5.5" y="4" width="3" height="2.5" rx="0.5" fill="#FFFFFF" />
              <rect x="1.5" y="7" width="3" height="1.5" rx="0.5" fill="#FFFFFF" />
              <rect x="5.5" y="7" width="3" height="1.5" rx="0.5" fill="#FFFFFF" />
            </>
          ) : (
            <>
              <rect x="1.5" y="1.5" width="9" height="2" rx="0.5" fill="#FFFFFF" />
              <rect x="1.5" y="4.5" width="4" height="3" rx="0.5" fill="#FFFFFF" />
              <rect x="6.5" y="4.5" width="4" height="3" rx="0.5" fill="#FFFFFF" />
              <rect x="1.5" y="8.5" width="4" height="2" rx="0.5" fill="#FFFFFF" />
              <rect x="6.5" y="8.5" width="4" height="2" rx="0.5" fill="#FFFFFF" />
            </>
          )}
        </svg>
      )
    case 'analysis':
      // Bar chart — 3 vertical bars
      return (
        <svg {...common}>
          {size === 10 ? (
            <>
              <rect x="1.5" y="5" width="2" height="3.5" rx="0.5" fill="#FFFFFF" />
              <rect x="4" y="2.5" width="2" height="6" rx="0.5" fill="#FFFFFF" />
              <rect x="6.5" y="4" width="2" height="4.5" rx="0.5" fill="#FFFFFF" />
            </>
          ) : (
            <>
              <rect x="1.5" y="6" width="2.5" height="4.5" rx="0.5" fill="#FFFFFF" />
              <rect x="4.75" y="2.5" width="2.5" height="8" rx="0.5" fill="#FFFFFF" />
              <rect x="8" y="4.5" width="2.5" height="6" rx="0.5" fill="#FFFFFF" />
            </>
          )}
        </svg>
      )
    case 'nutrition':
      // Droplet — single teardrop
      return (
        <svg {...common}>
          <path
            d={size === 10
              ? 'M5 1.5C5 1.5 2 4.5 2 6.2C2 7.8 3.3 9 5 9s3-1.2 3-2.8C8 4.5 5 1.5 5 1.5z'
              : 'M6 1.5C6 1.5 2 5.5 2 7.5C2 9.5 3.8 11 6 11s4-1.5 4-3.5C10 5.5 6 1.5 6 1.5z'}
            fill="#FFFFFF"
          />
        </svg>
      )
    case 'coaching':
      // Speech bubble — rounded rect with tail
      return (
        <svg {...common}>
          <path
            d={size === 10
              ? 'M2 2.5C2 2 2.5 1.5 3 1.5h4c.5 0 1 .5 1 1v3c0 .5-.5 1-1 1H4.5L3 7.5V6.5H3c-.5 0-1-.5-1-1v-3z'
              : 'M2 3c0-.6.5-1 1-1h6c.6 0 1 .4 1 1v4c0 .6-.4 1-1 1H5.5L3.5 9.5V8H3c-.6 0-1-.4-1-1V3z'}
            fill="#FFFFFF"
          />
        </svg>
      )
  }
}

const CategoryIcon = forwardRef<HTMLDivElement, CategoryIconProps>(
  function CategoryIcon({ category, size = 'sm', className }, ref) {
    const px = ICON_SIZES[size]
    const glyphPx = GLYPH_SIZES[size]

    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center justify-center shrink-0 rounded-[4px]', className)}
        style={{
          width: px,
          height: px,
          backgroundColor: CATEGORY_COLORS[category],
        }}
        aria-hidden="true"
      >
        <Glyph category={category} size={glyphPx} />
      </div>
    )
  }
)

CategoryIcon.displayName = 'CategoryIcon'
export { CategoryIcon }
