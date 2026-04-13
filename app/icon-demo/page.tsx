'use client'

import { useState, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, RADIUS, BORDER, TRANSITION, HOVER_SAND, SIDEBAR_ITEM_STYLE, SIDEBAR_ITEM_ACTIVE, SIDEBAR_WIDTH, DROPDOWN_ITEM, WIDGET_ICON_SIZE, WIDGET_ICON_COLOR, WIDGET_ICON_HOVER, ACTIVE_BLACK } from '@/lib/ui'

// Line (default)
import {
  IconToday, IconCalendar, IconAnalytics, IconFuel, IconSettings,
  IconPlus, IconClose, IconSearch, IconFilter, IconEdit, IconTrash, IconCopy,
  IconDownload, IconUpload, IconExpand, IconCollapse, IconMoreHorizontal, IconGrip,
  IconChevronLeft, IconChevronRight, IconChevronDown, IconChevronUp, IconArrowLeft, IconArrowRight,
  IconCheck, IconAlertTriangle, IconInfo, IconAlertCircle,
  IconPower, IconHeartRate, IconCadence, IconSpeed, IconElevation, IconGel, IconGlycogen, IconGut,
  IconMail, IconSend, IconMessageCircle, IconMessageSquare, IconPhone, IconVideo, IconShare, IconLink,
  IconImage, IconCamera, IconPlay, IconPause, IconVolume, IconMic,
  IconFile, IconFileText, IconFolder, IconFolderOpen, IconClipboard, IconArchive,
  IconUser, IconUsers, IconUserPlus, IconUserMinus, IconUserCheck,
  IconGrid, IconList, IconColumns, IconRows, IconPanelLeft, IconPanelRight,
  IconBarChart, IconLineChart, IconPieChart, IconTrendingUp, IconTrendingDown, IconDatabase, IconTable, IconHash,
  IconSmartphone, IconLaptop, IconWatch, IconBluetooth,
  IconSun, IconCloud, IconThermometer, IconDroplet,
  IconCreditCard, IconShoppingCart, IconReceipt, IconPriceTag,
  IconEye, IconEyeOff, IconLock, IconUnlock, IconStar, IconStarFilled, IconBookmark,
  IconGlobe, IconMap, IconMapPin, IconClock, IconTimer, IconRefresh, IconExternalLink, IconQrCode,
  IconInterval, IconZone, IconThreshold, IconDurability, IconResilience, IconPeakCurve, IconTrainingLoad, IconRecovery,
  IconCHO, IconProtein, IconFat, IconHydration, IconSodium, IconCaffeine, IconMeal, IconSupplements,
  IconSleep, IconMuscle, IconBrain, IconLungs, IconStomach, IconWeight, IconHRV, IconStress,
} from '@/components/icons/line'

// Solid
import {
  IconTodaySolid, IconCalendarSolid, IconAnalyticsSolid, IconFuelSolid, IconSettingsSolid,
  IconPowerSolid, IconHeartRateSolid, IconCadenceSolid, IconSpeedSolid,
} from '@/components/icons/solid'

// Duo
import {
  IconFuelDuo, IconPowerDuo, IconHeartRateDuo, IconCalendarDuo,
} from '@/components/icons/duo'

// Animated
import {
  IconSpinnerRAMTT, IconLoadingDots, IconCheckAnimated, IconUploadAnimated,
  IconPulseHeart, IconSyncRotate, IconTypingDots, IconWaveform,
} from '@/components/icons/animated'

import type { IconProps } from '@/components/icons'

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
        TRANSITION.background, 'hover:bg-[var(--n200)]', 'relative',
      )}
    >
      <span className="text-[var(--n1150)]">{icon}</span>
      <span className={cn(FONT.body, 'text-[10px] font-[400] text-[var(--n600)] max-w-[72px] truncate')}>
        {copied ? 'Copied!' : name.replace('Icon', '')}
      </span>
    </button>
  )
}

// ─── Section ───

function Section({ title, count, children }: { title: string; count?: number; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-2">
        <h2 className={cn(FONT.body, 'text-[15px] font-[550] text-[var(--n1150)]')}>{title}</h2>
        {count !== undefined && <span className={cn(FONT.body, 'text-[12px] font-[400] text-[var(--n600)]')}>({count})</span>}
      </div>
      {children}
    </div>
  )
}

// ─── Main ───

export default function IconDemoPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] p-8">
      <div className="max-w-[1100px] mx-auto space-y-10">

        {/* Header */}
        <div className="space-y-1">
          <h1 className={cn(FONT.body, 'text-[18px] font-[550] text-[var(--n1150)]')}>RAMTT Icons</h1>
          <p className={cn(FONT.body, 'text-[13px] font-[400] text-[var(--n600)]')}>
            126 icons × 3 variants + 8 animated = 386 components. Click to copy.
          </p>
        </div>

        {/* ── Variant System Demo ── */}
        <Section title="Variant System">
          <div className="flex gap-8">
            <div className="space-y-2">
              <span className={cn(FONT.body, 'text-[11px] font-[550] text-[var(--n600)] uppercase tracking-wide')}>Line (default)</span>
              <div className="flex gap-3">
                <IconCalendar size={24} />
                <IconFuel size={24} />
                <IconPower size={24} />
                <IconHeartRate size={24} />
              </div>
            </div>
            <div className="space-y-2">
              <span className={cn(FONT.body, 'text-[11px] font-[550] text-[var(--n600)] uppercase tracking-wide')}>Solid (active)</span>
              <div className="flex gap-3">
                <IconCalendarSolid size={24} />
                <IconFuelSolid size={24} />
                <IconPowerSolid size={24} />
                <IconHeartRateSolid size={24} />
              </div>
            </div>
            <div className="space-y-2">
              <span className={cn(FONT.body, 'text-[11px] font-[550] text-[var(--n600)] uppercase tracking-wide')}>Duo (accent)</span>
              <div className="flex gap-3">
                <IconCalendarDuo size={24} accent="var(--color-sig-power)" />
                <IconFuelDuo size={24} accent="var(--color-sig-cho)" />
                <IconPowerDuo size={24} accent="var(--color-sig-power)" />
                <IconHeartRateDuo size={24} accent="var(--color-sig-hr)" />
              </div>
            </div>
          </div>
        </Section>

        {/* ── Line → Solid transition (sidebar pattern) ── */}
        <Section title="Sidebar Pattern: Line → Solid on Active">
          <div className="flex gap-4">
            <div
              className="border-[0.5px] border-[var(--n400)] rounded-[12px] bg-[var(--bg)] overflow-hidden"
              style={{ width: SIDEBAR_WIDTH.expanded }}
            >
              <nav className="flex flex-col gap-0.5 px-2 py-3">
                {[
                  { icon: <IconToday size={20} />, iconActive: <IconTodaySolid size={20} />, label: 'Today', active: true },
                  { icon: <IconCalendar size={20} />, iconActive: <IconCalendarSolid size={20} />, label: 'Calendar', active: false },
                  { icon: <IconAnalytics size={20} />, iconActive: <IconAnalyticsSolid size={20} />, label: 'Analytics', active: false },
                  { icon: <IconFuel size={20} />, iconActive: <IconFuelSolid size={20} />, label: 'Nutrition', active: false },
                  { icon: <IconSettings size={20} />, iconActive: <IconSettingsSolid size={20} />, label: 'Settings', active: false },
                ].map((item) => (
                  <div key={item.label} className={cn('flex items-center gap-2.5', SIDEBAR_ITEM_STYLE, item.active ? SIDEBAR_ITEM_ACTIVE : HOVER_SAND)}>
                    <span className={cn('shrink-0 flex items-center justify-center', item.active ? 'text-[var(--n1150)]' : 'text-[var(--n600)]')} style={{ width: 20, height: 20 }}>
                      {item.active ? item.iconActive : item.icon}
                    </span>
                    <span className={cn(FONT.body, 'truncate')}>{item.label}</span>
                  </div>
                ))}
              </nav>
            </div>
            <div className="text-[var(--n600)] text-[12px] font-[400] leading-relaxed max-w-[300px]">
              Active page uses <strong>Solid</strong> variant. Inactive pages use <strong>Line</strong>. Same icon, different weight — the iOS/Figma/Linear pattern.
            </div>
          </div>
        </Section>

        {/* ── Animated Icons ── */}
        <Section title="Animated" count={8}>
          <div className="flex flex-wrap gap-3">
            <IconCell icon={<IconSpinnerRAMTT size={20} />} name="IconSpinnerRAMTT" />
            <IconCell icon={<IconLoadingDots size={20} />} name="IconLoadingDots" />
            <IconCell icon={<IconCheckAnimated size={20} />} name="IconCheckAnimated" />
            <IconCell icon={<IconUploadAnimated size={20} />} name="IconUploadAnimated" />
            <IconCell icon={<IconPulseHeart size={20} />} name="IconPulseHeart" />
            <IconCell icon={<IconSyncRotate size={20} />} name="IconSyncRotate" />
            <IconCell icon={<IconTypingDots size={20} />} name="IconTypingDots" />
            <IconCell icon={<IconWaveform size={20} />} name="IconWaveform" />
          </div>
        </Section>

        {/* ── Size Comparison ── */}
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

        {/* ═══ Full Icon Grid — All 126 ═══ */}

        <div className="pt-4 border-t-[0.5px] border-[var(--n200)]" />

        <Section title="Navigation" count={5}>
          <div className="flex flex-wrap gap-2">
            {[['IconToday',<IconToday key="a" size={20}/>],['IconCalendar',<IconCalendar key="b" size={20}/>],['IconAnalytics',<IconAnalytics key="c" size={20}/>],['IconFuel',<IconFuel key="d" size={20}/>],['IconSettings',<IconSettings key="e" size={20}/>]].map(([n,i])=><IconCell key={n as string} icon={i} name={n as string}/>)}
          </div>
        </Section>

        <Section title="Actions" count={13}>
          <div className="flex flex-wrap gap-2">
            {[IconPlus,IconClose,IconSearch,IconFilter,IconEdit,IconTrash,IconCopy,IconDownload,IconUpload,IconExpand,IconCollapse,IconMoreHorizontal,IconGrip].map((C)=><IconCell key={C.displayName!} icon={<C size={20}/>} name={C.displayName!}/>)}
          </div>
        </Section>

        <Section title="Arrows" count={6}>
          <div className="flex flex-wrap gap-2">
            {[IconChevronLeft,IconChevronRight,IconChevronDown,IconChevronUp,IconArrowLeft,IconArrowRight].map((C)=><IconCell key={C.displayName!} icon={<C size={20}/>} name={C.displayName!}/>)}
          </div>
        </Section>

        <Section title="Status" count={4}>
          <div className="flex flex-wrap gap-2">
            {[IconCheck,IconAlertTriangle,IconInfo,IconAlertCircle].map((C)=><IconCell key={C.displayName!} icon={<C size={20}/>} name={C.displayName!}/>)}
          </div>
        </Section>

        <Section title="Communication" count={8}>
          <div className="flex flex-wrap gap-2">
            {[IconMail,IconSend,IconMessageCircle,IconMessageSquare,IconPhone,IconVideo,IconShare,IconLink].map((C)=><IconCell key={C.displayName!} icon={<C size={20}/>} name={C.displayName!}/>)}
          </div>
        </Section>

        <Section title="Media" count={6}>
          <div className="flex flex-wrap gap-2">
            {[IconImage,IconCamera,IconPlay,IconPause,IconVolume,IconMic].map((C)=><IconCell key={C.displayName!} icon={<C size={20}/>} name={C.displayName!}/>)}
          </div>
        </Section>

        <Section title="Files" count={6}>
          <div className="flex flex-wrap gap-2">
            {[IconFile,IconFileText,IconFolder,IconFolderOpen,IconClipboard,IconArchive].map((C)=><IconCell key={C.displayName!} icon={<C size={20}/>} name={C.displayName!}/>)}
          </div>
        </Section>

        <Section title="Users" count={5}>
          <div className="flex flex-wrap gap-2">
            {[IconUser,IconUsers,IconUserPlus,IconUserMinus,IconUserCheck].map((C)=><IconCell key={C.displayName!} icon={<C size={20}/>} name={C.displayName!}/>)}
          </div>
        </Section>

        <Section title="Layout" count={6}>
          <div className="flex flex-wrap gap-2">
            {[IconGrid,IconList,IconColumns,IconRows,IconPanelLeft,IconPanelRight].map((C)=><IconCell key={C.displayName!} icon={<C size={20}/>} name={C.displayName!}/>)}
          </div>
        </Section>

        <Section title="Data" count={8}>
          <div className="flex flex-wrap gap-2">
            {[IconBarChart,IconLineChart,IconPieChart,IconTrendingUp,IconTrendingDown,IconDatabase,IconTable,IconHash].map((C)=><IconCell key={C.displayName!} icon={<C size={20}/>} name={C.displayName!}/>)}
          </div>
        </Section>

        <Section title="Device" count={4}>
          <div className="flex flex-wrap gap-2">
            {[IconSmartphone,IconLaptop,IconWatch,IconBluetooth].map((C)=><IconCell key={C.displayName!} icon={<C size={20}/>} name={C.displayName!}/>)}
          </div>
        </Section>

        <Section title="Weather" count={4}>
          <div className="flex flex-wrap gap-2">
            {[IconSun,IconCloud,IconThermometer,IconDroplet].map((C)=><IconCell key={C.displayName!} icon={<C size={20}/>} name={C.displayName!}/>)}
          </div>
        </Section>

        <Section title="Commerce" count={4}>
          <div className="flex flex-wrap gap-2">
            {[IconCreditCard,IconShoppingCart,IconReceipt,IconPriceTag].map((C)=><IconCell key={C.displayName!} icon={<C size={20}/>} name={C.displayName!}/>)}
          </div>
        </Section>

        <Section title="Toggle / State" count={7}>
          <div className="flex flex-wrap gap-2">
            {[IconEye,IconEyeOff,IconLock,IconUnlock,IconStar,IconStarFilled,IconBookmark].map((C)=><IconCell key={C.displayName!} icon={<C size={20}/>} name={C.displayName!}/>)}
          </div>
        </Section>

        <Section title="Misc" count={8}>
          <div className="flex flex-wrap gap-2">
            {[IconGlobe,IconMap,IconMapPin,IconClock,IconTimer,IconRefresh,IconExternalLink,IconQrCode].map((C)=><IconCell key={C.displayName!} icon={<C size={20}/>} name={C.displayName!}/>)}
          </div>
        </Section>

        <Section title="Sport / Domain" count={8}>
          <div className="flex flex-wrap gap-2">
            {[IconPower,IconHeartRate,IconCadence,IconSpeed,IconElevation,IconGel,IconGlycogen,IconGut].map((C)=><IconCell key={C.displayName!} icon={<C size={20}/>} name={C.displayName!}/>)}
          </div>
        </Section>

        <Section title="Training" count={8}>
          <div className="flex flex-wrap gap-2">
            {[IconInterval,IconZone,IconThreshold,IconDurability,IconResilience,IconPeakCurve,IconTrainingLoad,IconRecovery].map((C)=><IconCell key={C.displayName!} icon={<C size={20}/>} name={C.displayName!}/>)}
          </div>
        </Section>

        <Section title="Nutrition" count={8}>
          <div className="flex flex-wrap gap-2">
            {[IconCHO,IconProtein,IconFat,IconHydration,IconSodium,IconCaffeine,IconMeal,IconSupplements].map((C)=><IconCell key={C.displayName!} icon={<C size={20}/>} name={C.displayName!}/>)}
          </div>
        </Section>

        <Section title="Body / Wellness" count={8}>
          <div className="flex flex-wrap gap-2">
            {[IconSleep,IconMuscle,IconBrain,IconLungs,IconStomach,IconWeight,IconHRV,IconStress].map((C)=><IconCell key={C.displayName!} icon={<C size={20}/>} name={C.displayName!}/>)}
          </div>
        </Section>

      </div>
    </div>
  )
}
