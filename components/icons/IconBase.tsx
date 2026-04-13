// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import type { IconProps } from './types'

export type { IconProps } from './types'
export type { IconDuoProps } from './types'

export const IconBase = forwardRef<SVGSVGElement, IconProps & { children: ReactNode }>(
  ({ size = 16, color = 'currentColor', className, children, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={props['aria-label'] ? undefined : true}
      {...props}
    >
      {children}
    </svg>
  ),
)
IconBase.displayName = 'IconBase'
