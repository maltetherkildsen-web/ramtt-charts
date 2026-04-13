'use client'

import { useState, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, RADIUS, BORDER, TRANSITION, HOVER_SAND, SIDEBAR_ITEM_STYLE, SIDEBAR_ITEM_ACTIVE, SIDEBAR_WIDTH, DROPDOWN_ITEM, WIDGET_ICON_SIZE, WIDGET_ICON_COLOR, WIDGET_ICON_HOVER, ACTIVE_BLACK, FOCUS_RING } from '@/lib/ui'
import {
  // Navigation
  IconToday,
  IconCalendar,
  IconAnalytics,
  IconFuel,
  IconSettings,
  // Actions
  IconPlus,
  IconClose,
  IconSearch,
  IconFilter,
  IconEdit,
  IconTrash,
  IconCopy,
  IconDownload,
  IconUpload,
  IconExpand,
  IconCollapse,
  IconMoreHorizontal,
  IconGrip,
  // Arrows
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
  IconChevronUp,
  IconArrowLeft,
  IconArrowRight,
  // Status
  IconCheck,
  IconAlertTriangle,
  IconInfo,
  IconAlertCircle,
  // Domain
  IconPower,
  IconHeartRate,
  IconCadence,
  IconSpeed,
  IconElevation,
  IconGel,
  IconGlycogen,
  IconGut,
  // Types
  type IconProps,
} from '@/components/icons'

// ─── Icon Cell ───

function IconCell({ icon, name }: { icon: ReactNode; name: string }) {
  const [copied, setCopied] = useState(false)

  function handleClick() {
    navigator.clipboard.writeText(`<${name} />`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex flex-col items-center justify-center gap-2',
        'w-[80px] h-[80px]',
        'border-[0.5px] border-[var(--n200)] rounded-[8px]',
        TRANSITION.background,
        'hover:bg-[var(--n200)]',
        'relative',
      )}
    >
      <span className="text-[var(--n1150)]">{icon}</span>
      <span className={cn(FONT.body, 'text-[11px] font-[400] text-[var(--n600)]')}>
        {copied ? 'Copied!' : name.replace('Icon', '')}
      </span>
    </button>
  )
}

// ─── Section Header ───

function Section({ title, count, children }: { title: string; count?: number; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-2">
        <h2 className={cn(FONT.body, 'text-[15px] font-[550] text-[var(--n1150)]')}>{title}</h2>
        {count !== undefined && (
          <span className={cn(FONT.body, 'text-[12px] font-[400] text-[var(--n600)]')}>({count})</span>
        )}
      </div>
      {children}
    </div>
  )
}

// ─── Main Page ───

export default function IconDemoPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] p-8">
      <div className="max-w-[960px] mx-auto space-y-10">

        {/* ── Header ── */}
        <div className="space-y-1">
          <h1 className={cn(FONT.body, 'text-[18px] font-[550] text-[var(--n1150)]')}>
            RAMTT Icons
          </h1>
          <p className={cn(FONT.body, 'text-[13px] font-[400] text-[var(--n600)]')}>
            36 custom SVG icons. 1.5px stroke. Satoshi-calibrated. Click to copy.
          </p>
        </div>

        {/* ── Size Comparison Strip ── */}
        <Section title="Size Comparison">
          <div className="flex items-end gap-6">
            {[12, 14, 16, 20, 24].map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <IconAnalytics size={size} color="var(--n1150)" />
                <span className={cn(FONT.body, 'text-[11px] font-[400] text-[var(--n600)]')}>{size}px</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Color Comparison Strip ── */}
        <Section title="Color Scale">
          <div className="flex items-center gap-6">
            {[
              { token: '--n1150', label: 'n1150' },
              { token: '--n800', label: 'n800' },
              { token: '--n600', label: 'n600' },
              { token: '--n400', label: 'n400' },
              { token: '--positive', label: 'positive' },
            ].map(({ token, label }) => (
              <div key={token} className="flex flex-col items-center gap-2">
                <IconFuel size={20} color={`var(${token})`} />
                <span className={cn(FONT.body, 'text-[11px] font-[400] text-[var(--n600)]')}>{label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Navigation Icons ── */}
        <Section title="Navigation" count={5}>
          <div className="flex flex-wrap gap-2">
            <IconCell icon={<IconToday size={20} />} name="IconToday" />
            <IconCell icon={<IconCalendar size={20} />} name="IconCalendar" />
            <IconCell icon={<IconAnalytics size={20} />} name="IconAnalytics" />
            <IconCell icon={<IconFuel size={20} />} name="IconFuel" />
            <IconCell icon={<IconSettings size={20} />} name="IconSettings" />
          </div>
        </Section>

        {/* ── Action Icons ── */}
        <Section title="Actions" count={13}>
          <div className="flex flex-wrap gap-2">
            <IconCell icon={<IconPlus size={20} />} name="IconPlus" />
            <IconCell icon={<IconClose size={20} />} name="IconClose" />
            <IconCell icon={<IconSearch size={20} />} name="IconSearch" />
            <IconCell icon={<IconFilter size={20} />} name="IconFilter" />
            <IconCell icon={<IconEdit size={20} />} name="IconEdit" />
            <IconCell icon={<IconTrash size={20} />} name="IconTrash" />
            <IconCell icon={<IconCopy size={20} />} name="IconCopy" />
            <IconCell icon={<IconDownload size={20} />} name="IconDownload" />
            <IconCell icon={<IconUpload size={20} />} name="IconUpload" />
            <IconCell icon={<IconExpand size={20} />} name="IconExpand" />
            <IconCell icon={<IconCollapse size={20} />} name="IconCollapse" />
            <IconCell icon={<IconMoreHorizontal size={20} />} name="IconMoreHorizontal" />
            <IconCell icon={<IconGrip size={20} />} name="IconGrip" />
          </div>
        </Section>

        {/* ── Arrow Icons ── */}
        <Section title="Arrows / Navigation" count={6}>
          <div className="flex flex-wrap gap-2">
            <IconCell icon={<IconChevronLeft size={20} />} name="IconChevronLeft" />
            <IconCell icon={<IconChevronRight size={20} />} name="IconChevronRight" />
            <IconCell icon={<IconChevronDown size={20} />} name="IconChevronDown" />
            <IconCell icon={<IconChevronUp size={20} />} name="IconChevronUp" />
            <IconCell icon={<IconArrowLeft size={20} />} name="IconArrowLeft" />
            <IconCell icon={<IconArrowRight size={20} />} name="IconArrowRight" />
          </div>
        </Section>

        {/* ── Status Icons ── */}
        <Section title="Status / Feedback" count={4}>
          <div className="flex flex-wrap gap-2">
            <IconCell icon={<IconCheck size={20} />} name="IconCheck" />
            <IconCell icon={<IconAlertTriangle size={20} />} name="IconAlertTriangle" />
            <IconCell icon={<IconInfo size={20} />} name="IconInfo" />
            <IconCell icon={<IconAlertCircle size={20} />} name="IconAlertCircle" />
          </div>
        </Section>

        {/* ── Domain Icons ── */}
        <Section title="Sport / Domain" count={8}>
          <div className="flex flex-wrap gap-2">
            <IconCell icon={<IconPower size={20} />} name="IconPower" />
            <IconCell icon={<IconHeartRate size={20} />} name="IconHeartRate" />
            <IconCell icon={<IconCadence size={20} />} name="IconCadence" />
            <IconCell icon={<IconSpeed size={20} />} name="IconSpeed" />
            <IconCell icon={<IconElevation size={20} />} name="IconElevation" />
            <IconCell icon={<IconGel size={20} />} name="IconGel" />
            <IconCell icon={<IconGlycogen size={20} />} name="IconGlycogen" />
            <IconCell icon={<IconGut size={20} />} name="IconGut" />
          </div>
        </Section>

        {/* ═══════════════════════════════════════
            In-Context Demos
            ═══════════════════════════════════════ */}

        <div className="pt-4 border-t-[0.5px] border-[var(--n200)]" />

        <div className="space-y-1">
          <h2 className={cn(FONT.body, 'text-[15px] font-[550] text-[var(--n1150)]')}>
            In-Context Demos
          </h2>
          <p className={cn(FONT.body, 'text-[13px] font-[400] text-[var(--n600)]')}>
            How the icons look in actual RAMTT UI components.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">

          {/* ── 1. Sidebar Preview ── */}
          <div className="space-y-2">
            <h3 className={cn(FONT.body, 'text-[12px] font-[550] text-[var(--n600)] uppercase tracking-wide')}>
              Sidebar — 20px icons
            </h3>
            <div
              className="border-[0.5px] border-[var(--n400)] rounded-[12px] bg-[var(--bg)] overflow-hidden"
              style={{ width: SIDEBAR_WIDTH.expanded }}
            >
              <div className="px-3 py-4">
                <span className={cn(FONT.body, 'text-[15px] font-[550] text-[var(--n1150)]')}>RAMTT</span>
              </div>
              <nav className="flex flex-col gap-0.5 px-2 pb-3">
                {[
                  { icon: <IconToday size={20} />, label: 'Today', active: true },
                  { icon: <IconCalendar size={20} />, label: 'Calendar', active: false },
                  { icon: <IconAnalytics size={20} />, label: 'Analytics', active: false },
                  { icon: <IconFuel size={20} />, label: 'Nutrition', active: false },
                  { icon: <IconSettings size={20} />, label: 'Settings', active: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={cn(
                      'flex items-center gap-2.5',
                      SIDEBAR_ITEM_STYLE,
                      item.active ? SIDEBAR_ITEM_ACTIVE : HOVER_SAND,
                    )}
                  >
                    <span
                      className={cn(
                        'shrink-0 flex items-center justify-center',
                        item.active ? 'text-[var(--n1150)]' : 'text-[var(--n600)]',
                      )}
                      style={{ width: 20, height: 20 }}
                    >
                      {item.icon}
                    </span>
                    <span className={cn(FONT.body, 'truncate')}>{item.label}</span>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* ── 2. Dropdown Preview ── */}
          <div className="space-y-2">
            <h3 className={cn(FONT.body, 'text-[12px] font-[550] text-[var(--n600)] uppercase tracking-wide')}>
              Dropdown — 16px icons
            </h3>
            <div className={cn(
              'w-[200px] border-[0.5px] border-[var(--n400)] rounded-[8px] bg-white p-1',
              'shadow-[0_4px_16px_rgba(0,0,0,0.08)]',
            )}>
              {[
                { icon: <IconEdit size={16} />, label: 'Edit' },
                { icon: <IconCopy size={16} />, label: 'Duplicate' },
                { icon: <IconDownload size={16} />, label: 'Export' },
                { icon: <IconTrash size={16} />, label: 'Delete', danger: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    'flex items-center gap-2',
                    DROPDOWN_ITEM,
                    TRANSITION.background,
                    HOVER_SAND,
                    item.danger && 'text-[var(--negative)]',
                  )}
                >
                  <span className="shrink-0">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* ── 3. Button Row ── */}
          <div className="space-y-2">
            <h3 className={cn(FONT.body, 'text-[12px] font-[550] text-[var(--n600)] uppercase tracking-wide')}>
              Icon Buttons — ghost variant
            </h3>
            <div className="flex items-center gap-1">
              {[
                <IconPlus key="plus" size={16} />,
                <IconSearch key="search" size={16} />,
                <IconFilter key="filter" size={16} />,
                <IconDownload key="download" size={16} />,
                <IconSettings key="settings" size={16} />,
                <IconMoreHorizontal key="more" size={16} />,
              ].map((icon, i) => (
                <button
                  key={i}
                  className={cn(
                    'w-7 h-7 inline-flex items-center justify-center',
                    RADIUS.md,
                    TRANSITION.background,
                    HOVER_SAND,
                    'text-[var(--n800)]',
                  )}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* ── 4. WidgetCard Header Preview ── */}
          <div className="space-y-2">
            <h3 className={cn(FONT.body, 'text-[12px] font-[550] text-[var(--n600)] uppercase tracking-wide')}>
              Widget Header — 14px icons
            </h3>
            <div className={cn(
              'border-[0.5px] border-[var(--n400)] rounded-[12px] bg-white p-4',
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconGrip size={14} color="var(--n400)" />
                  <span className={cn(FONT.body, 'text-[13px] font-[550] text-[var(--n1150)]')}>
                    Weekly Power
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[
                    <IconInfo key="info" size={WIDGET_ICON_SIZE} />,
                    <IconSettings key="settings" size={WIDGET_ICON_SIZE} />,
                    <IconExpand key="expand" size={WIDGET_ICON_SIZE} />,
                  ].map((icon, i) => (
                    <span
                      key={i}
                      className={cn(
                        WIDGET_ICON_COLOR,
                        `hover:${WIDGET_ICON_HOVER}`,
                        TRANSITION.colors,
                        'p-0.5',
                      )}
                    >
                      {icon}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-3 h-[60px] bg-[var(--n200)] rounded-[6px]" />
            </div>
          </div>

          {/* ── 5. Metric Strip with Domain Icons ── */}
          <div className="col-span-2 space-y-2">
            <h3 className={cn(FONT.body, 'text-[12px] font-[550] text-[var(--n600)] uppercase tracking-wide')}>
              Metric Cards — domain icons as indicators
            </h3>
            <div className="flex gap-3">
              {[
                { icon: <IconPower size={16} />, label: 'Power', value: '285', unit: 'W', color: 'var(--color-sig-power)' },
                { icon: <IconHeartRate size={16} />, label: 'Heart Rate', value: '162', unit: 'BPM', color: 'var(--color-sig-hr)' },
                { icon: <IconCadence size={16} />, label: 'Cadence', value: '92', unit: 'RPM', color: 'var(--color-sig-cadence)' },
                { icon: <IconSpeed size={16} />, label: 'Speed', value: '38.4', unit: 'km/h', color: 'var(--color-sig-speed)' },
                { icon: <IconElevation size={16} />, label: 'Elevation', value: '1,240', unit: 'm', color: 'var(--color-sig-altitude)' },
                { icon: <IconFuel size={16} />, label: 'Energy', value: '2,180', unit: 'kJ', color: 'var(--color-sig-cho)' },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className={cn(
                    'flex-1 border-[0.5px] border-[var(--n200)] rounded-[8px] bg-white p-3',
                    'flex flex-col gap-1.5',
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <span style={{ color: metric.color }}>{metric.icon}</span>
                    <span className={cn(FONT.body, 'text-[11px] font-[450] text-[var(--n600)]')}>
                      {metric.label}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className={cn(FONT.body, 'text-[18px] font-[550] text-[var(--n1150)] tabular-nums')}>
                      {metric.value}
                    </span>
                    <span className={cn(FONT.body, 'text-[11px] font-[450] text-[var(--n600)]')}>
                      {metric.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
