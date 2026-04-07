# @ramtt/ui

12 components. Zero dependencies. RAMTT design tokens baked in.

## Quick Start

```tsx
import { Button, Card, MetricCard, ToggleGroup, DataTable } from '@/components/ui';
```

## Building Custom Components

Import the shared utilities to build components that match the system:

```tsx
import { cn, FONT, LABEL_STYLE, VALUE_STYLE, BORDER, RADIUS, SIZE_HEIGHTS, FOCUS_RING, TRANSITION } from '@/components/ui';

function CustomWidget({ label, value, className }) {
  return (
    <div className={cn(BORDER.default, RADIUS.lg, 'p-3.5', className)}>
      <span className={LABEL_STYLE}>{label}</span>
      <span className={cn(VALUE_STYLE, 'text-[16px] font-medium text-[var(--n1150)]')}>
        {value}
      </span>
    </div>
  );
}
```

## Components

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| Button | Actions | variant, size, disabled |
| Badge | Status pills | variant, color, size |
| ToggleGroup | Selection groups | options, value, variant (default/pill/underline), multi |
| Card | Container | padding, Card.Header/Title/Body/Action |
| DataRow | Key-value pair | label, value, unit, delta, badge |
| DataTable | Tabular data | columns, data, onRowClick |
| MetricCard | Labeled stat | label, value, unit, subtitle, badge |
| Input | Text input | label, unit, + standard input props |
| Select | Dropdown | options, value, label |
| SettingsCard | Nav card | icon, title, description, onClick |
| ProgressBar | Bar indicator | value, max, color, label |
| SectionHeader | Section label | children (auto-uppercased), action |

## Font

Satoshi for everything. Cormorant Garamond for editorial only.

| Weight | Constant | Usage |
|--------|----------|-------|
| 400 | WEIGHT.normal | Body text, nav, inputs, unselected toggles |
| 450 | WEIGHT.book | Units, metadata, descriptions |
| 500 | WEIGHT.medium | Badges, form labels, buttons |
| 550 | WEIGHT.strong | Section headers, card titles, values, active tabs |

## Audit

Run `npm run audit:ui` to verify all components follow system rules.
