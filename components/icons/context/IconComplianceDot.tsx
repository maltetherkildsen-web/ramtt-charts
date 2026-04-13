// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

type ComplianceStatus = 'compliant' | 'partial' | 'missed' | 'unscheduled' | 'rest'

interface IconComplianceDotProps extends IconProps {
  status?: ComplianceStatus
}

const STATUS_COLORS: Record<ComplianceStatus, string> = {
  compliant: 'var(--positive)',
  partial: 'var(--warning)',
  missed: 'var(--negative)',
  unscheduled: 'var(--n400)',
  rest: 'var(--n200)',
}

export const IconComplianceDot = forwardRef<SVGSVGElement, IconComplianceDotProps>(
  ({ status, ...props }, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="9" fill="none" />
      <circle
        cx="12"
        cy="12"
        r="6"
        fill={status ? STATUS_COLORS[status] : 'var(--n400)'}
        stroke="none"
      />
    </IconBase>
  ),
)
IconComplianceDot.displayName = 'IconComplianceDot'
