'use client'

import { oklchToHex, findMaxChroma, oklchCSS } from '@/lib/oklch'
import { cn, FONT, WEIGHT } from '@/lib/ui'
import { Button, Badge, Switch, Input, ProgressBar } from '@/components/ui'

/* ═══════════════════════════════════════════════════════════════════════════
   RAMTT Color Lab — Figma-Matched Perceptual Palette Explorer
   Baseline: #0D99FF = OKLCH L=0.67, C=0.183, H=249°
   Canvas: var(--bg) sand
   ═══════════════════════════════════════════════════════════════════════════ */

const BASE_L = 0.67

const HUES = [
  { name: 'Rød',         H: 29,  C: 0.183 },
  { name: 'Orange',      H: 50,  C: 0.177 },
  { name: 'Gul-orange',  H: 70,  C: 0.145 },
  { name: 'Gul',         H: 95,  C: 0.138 },
  { name: 'Gul-grøn',    H: 120, C: 0.159 },
  { name: 'Grøn',        H: 142, C: 0.183 },
  { name: 'Teal',        H: 175, C: 0.126 },
  { name: 'Cyan',        H: 210, C: 0.116 },
  { name: 'Blå (Figma)', H: 249.26, C: 0.183 },
  { name: 'Indigo',      H: 275, C: 0.175 },
  { name: 'Violet',      H: 295, C: 0.183 },
  { name: 'Magenta',     H: 328, C: 0.183 },
  { name: 'Pink',        H: 355, C: 0.183 },
] as const

const L_STOPS = [0.45, 0.55, 0.60, 0.67, 0.75, 0.85, 0.93] as const
const GAMUTS = ['srgb', 'p3', 'rec2020'] as const

// ── Text color helpers ──

function darkText(H: number): string {
  return oklchToHex(0.28, 0.06, H).hex
}

function lightText(H: number): string {
  return oklchToHex(0.92, 0.02, H).hex
}

function textForL(L: number, H: number): string {
  return L < 0.55 ? lightText(H) : darkText(H)
}

// ── Generate 14-token accent ramp from OKLCH base ──

function accentRamp(H: number, C: number): Record<string, string> {
  const safe = (targetL: number, cRatio: number) => {
    const maxC = findMaxChroma(targetL, H)
    return Math.min(C * cRatio, maxC)
  }
  return {
    '--accent':               oklchCSS(0.67, C, H),
    '--accent-pressed':       oklchCSS(0.35, safe(0.35, 1), H),
    '--accent-hover':         oklchCSS(0.50, safe(0.50, 1), H),
    '--accent-toggle':        oklchCSS(0.67, C, H),
    '--accent-text':          oklchCSS(0.38, safe(0.38, 0.7), H),
    '--accent-icon':          oklchCSS(0.67, C, H),
    '--accent-icon-light':    oklchCSS(0.75, safe(0.75, 0.4), H),
    '--accent-icon-lightest': oklchCSS(0.85, safe(0.85, 0.2), H),
    '--accent-border':        oklchCSS(0.88, safe(0.88, 0.12), H),
    '--accent-selection':     oklchCSS(0.85, safe(0.85, 0.15), H),
    '--accent-wash':          oklchCSS(0.96, safe(0.96, 0.04), H),
    '--accent-badge':         oklchCSS(0.97, safe(0.97, 0.02), H),
    '--accent-soft':          `oklch(0.67 ${C} ${H} / 0.125)`,
    '--accent-light':         `oklch(0.67 ${C} ${H} / 0.19)`,
  }
}

// ── Shared components ──

function SectionHead({ num, title, desc }: { num: number; title: string; desc: string }) {
  return (
    <div className="mb-8">
      <p className={cn(FONT.body, WEIGHT.normal, 'text-[11px] tabular-nums text-[var(--n600)] mb-1')}>
        {String(num).padStart(2, '0')}
      </p>
      <h2 className={cn(FONT.body, WEIGHT.medium, 'text-[18px]')} style={{ color: 'rgba(0,0,0,0.7)' }}>
        {title}
      </h2>
      <p className={cn(FONT.body, WEIGHT.normal, 'text-[13px] mt-1 max-w-[700px]')} style={{ color: 'rgba(0,0,0,0.45)' }}>
        {desc}
      </p>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Section 1: Matched Baseline — L=0.67, C=max
// ═══════════════════════════════════════════════════════════════════════════

function MatchedBaseline() {
  return (
    <section className="mb-24">
      <SectionHead
        num={1}
        title="Matched baseline — L=0.67, C=max"
        desc="Alle farver på samme perceptuelle lysstyrke som Figma-blåen (#0D99FF). Hvert felt viser max chroma i sRGB for den pågældende hue."
      />
      <div className="flex flex-wrap gap-3">
        {HUES.map(h => {
          const { hex } = oklchToHex(BASE_L, h.C, h.H)
          const tc = darkText(h.H)
          return (
            <div
              key={h.H}
              className="rounded-[2px]"
              style={{
                width: 200, height: 200,
                backgroundColor: oklchCSS(BASE_L, h.C, h.H),
                padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              }}
            >
              <span className={cn(FONT.body, WEIGHT.medium, 'text-[12px]')} style={{ color: tc }}>
                {h.name}
              </span>
              <span className={cn(FONT.body, WEIGHT.normal, 'text-[11px] tabular-nums')} style={{ color: tc, opacity: 0.8 }}>
                {hex}
              </span>
              <span className={cn(FONT.body, WEIGHT.normal, 'text-[10px] tabular-nums')} style={{ color: tc, opacity: 0.6 }}>
                oklch({BASE_L} {h.C} {Math.round(h.H)})
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Section 2: Lightness Ladder — each hue in 7 L-values
// ═══════════════════════════════════════════════════════════════════════════

function LightnessLadder() {
  return (
    <section className="mb-24">
      <SectionHead
        num={2}
        title="Lightness ladder — hver farve i flere L-værdier"
        desc="For hver hue, 7 stops fra dyb (L=0.45) til tint (L=0.93). C holdes konstant pr. række. Markeret felt = matched L=0.67."
      />
      <div className="flex flex-col gap-4">
        {HUES.map(h => (
          <div key={h.H} className="flex items-end gap-2">
            <span
              className={cn(FONT.body, WEIGHT.medium, 'text-[11px] text-[var(--n800)] shrink-0')}
              style={{ width: 80 }}
            >
              {h.name}
            </span>
            <div className="flex gap-1.5">
              {L_STOPS.map(L => {
                const isMatched = L === 0.67
                const tc = textForL(L, h.H)
                const maxC = findMaxChroma(L, h.H)
                const C = Math.min(h.C, maxC)
                return (
                  <div key={L} className="flex flex-col items-center gap-1">
                    <div
                      className="rounded-[2px]"
                      style={{
                        width: 110, height: 60,
                        backgroundColor: oklchCSS(L, C, h.H),
                        padding: 6, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                        outline: isMatched ? '2px solid rgba(0,0,0,0.25)' : undefined,
                        outlineOffset: 2,
                      }}
                    >
                      <span className={cn(FONT.body, 'text-[9px] tabular-nums')} style={{ color: tc }}>
                        {oklchToHex(L, C, h.H).hex}
                      </span>
                    </div>
                    <span className={cn(
                      FONT.body, 'text-[10px] tabular-nums',
                      isMatched ? 'text-[var(--n1150)]' : 'text-[var(--n600)]',
                      isMatched && WEIGHT.medium,
                    )}>
                      {isMatched ? 'L=0.67 ●' : `L=${L}`}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Section 3: Chroma Ladder — dæmpning
// ═══════════════════════════════════════════════════════════════════════════

function ChromaLadder() {
  return (
    <section className="mb-24">
      <SectionHead
        num={3}
        title="Chroma ladder — dæmpning"
        desc="For hver hue ved L=0.67, 5 chroma-stops fra næsten grå til overkørsel. Viser hvor meget energi farven har ved forskellige mætninger."
      />
      <div className="flex flex-col gap-4">
        {HUES.map(h => {
          const cStops = [0.05, 0.09, 0.13, h.C, h.C * 1.3]
          return (
            <div key={h.H} className="flex items-end gap-2">
              <span
                className={cn(FONT.body, WEIGHT.medium, 'text-[11px] text-[var(--n800)] shrink-0')}
                style={{ width: 80 }}
              >
                {h.name}
              </span>
              <div className="flex gap-1.5">
                {cStops.map((C, i) => {
                  const isMax = i === 3
                  const isOver = i === 4
                  const { hex, inGamut: ig } = oklchToHex(BASE_L, C, h.H)
                  const tc = darkText(h.H)
                  const labels = ['C=0.05', 'C=0.09', 'C=0.13', `C=${h.C} (max)`, `C=${(h.C * 1.3).toFixed(3)}`]
                  return (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div
                        className="rounded-[2px] relative"
                        style={{
                          width: 130, height: 60,
                          backgroundColor: oklchCSS(BASE_L, C, h.H),
                          padding: 6, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                          outline: isMax ? '2px solid rgba(0,0,0,0.25)' : undefined,
                          outlineOffset: isMax ? 2 : undefined,
                        }}
                      >
                        {isOver && !ig && (
                          <span className={cn(FONT.body, 'text-[8px]', WEIGHT.medium, 'absolute top-1 right-1.5')} style={{ color: tc }}>
                            out of gamut
                          </span>
                        )}
                        <span className={cn(FONT.body, 'text-[9px] tabular-nums')} style={{ color: tc }}>
                          {hex}
                        </span>
                      </div>
                      <span className={cn(
                        FONT.body, 'text-[10px] tabular-nums',
                        isMax ? cn('text-[var(--n1150)]', WEIGHT.medium) : 'text-[var(--n600)]',
                      )}>
                        {labels[i]}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Section 4: Side-by-side — rene flader ved matched L og C
// ═══════════════════════════════════════════════════════════════════════════

function SideBySide() {
  return (
    <section className="mb-24">
      <SectionHead
        num={4}
        title="Side-by-side — hue-rotationer ved matched L og C"
        desc="Hver farve som en ren flade ved L=0.67 og dens max C. Ingen labels inde i feltet. Den reneste test af om de perceptuelt føles ens på sand."
      />
      <div className="flex flex-wrap gap-3">
        {HUES.map(h => {
          const { hex } = oklchToHex(BASE_L, h.C, h.H)
          return (
            <div key={h.H} className="flex flex-col items-start gap-1.5">
              <div
                className="rounded-[2px]"
                style={{
                  width: 300, height: 200,
                  backgroundColor: oklchCSS(BASE_L, h.C, h.H),
                }}
              />
              <div className="flex flex-col">
                <span className={cn(FONT.body, WEIGHT.medium, 'text-[11px] text-[var(--n800)]')}>
                  {h.name}
                </span>
                <span className={cn(FONT.body, WEIGHT.normal, 'text-[10px] tabular-nums text-[var(--n600)]')}>
                  {hex} — oklch({BASE_L} {h.C} {Math.round(h.H)})
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Section 5: Pair test — kombinationer med Figma-blåen
// ═══════════════════════════════════════════════════════════════════════════

function PairTest() {
  const figma = HUES.find(h => h.name.includes('Figma'))!
  const others = HUES.filter(h => !h.name.includes('Figma'))

  return (
    <section className="mb-24">
      <SectionHead
        num={5}
        title="Pair test — kombinationer"
        desc="De 13 farver parret med Figma-blåen side om side. Hvilke hues harmonerer bedst med referencen?"
      />
      <div className="flex flex-wrap gap-4">
        {others.map(h => (
          <div key={h.H} className="flex flex-col gap-1.5">
            <div className="flex rounded-[2px] overflow-hidden">
              <div
                style={{
                  width: 300, height: 300,
                  backgroundColor: oklchCSS(BASE_L, h.C, h.H),
                }}
              />
              <div
                style={{
                  width: 300, height: 300,
                  backgroundColor: oklchCSS(BASE_L, figma.C, figma.H),
                }}
              />
            </div>
            <span className={cn(FONT.body, WEIGHT.medium, 'text-[11px] text-[var(--n800)]')}>
              {h.name} + Blå (Figma)
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Section 6: Mixed L baseline alternatives
// ═══════════════════════════════════════════════════════════════════════════

function MixedBaselines() {
  const variants = [
    { label: 'Deep variant',    L: 0.58, cRatio: 1,     lowC: false },
    { label: 'Matched variant', L: 0.67, cRatio: 1,     lowC: false },
    { label: 'Soft variant',    L: 0.75, cRatio: 1,     lowC: false },
    { label: 'Tint variant',    L: 0.88, cRatio: 0.44,  lowC: true },
  ] as const

  return (
    <section className="mb-24">
      <SectionHead
        num={6}
        title="Mixed L baseline alternatives"
        desc="Fire alternative baselines — deep (L=0.58), matched (L=0.67), soft (L=0.75) og tint (L=0.88, lav C). Sammenlign niveauer."
      />
      <div className="flex flex-col gap-8">
        {variants.map(v => (
          <div key={v.L}>
            <p className={cn(FONT.body, WEIGHT.medium, 'text-[12px] text-[var(--n800)] mb-3')}>
              {v.label} — L={v.L}{v.lowC ? ', C~0.08' : ''}
            </p>
            <div className="flex flex-wrap gap-2">
              {HUES.map(h => {
                const targetC = v.lowC ? 0.08 : h.C
                const maxC = findMaxChroma(v.L, h.H)
                const C = Math.min(targetC, maxC)
                const { hex } = oklchToHex(v.L, C, h.H)
                const tc = textForL(v.L, h.H)
                return (
                  <div
                    key={h.H}
                    className="rounded-[2px]"
                    style={{
                      width: 95, height: 70,
                      backgroundColor: oklchCSS(v.L, C, h.H),
                      padding: 6, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                    }}
                  >
                    <span className={cn(FONT.body, 'text-[9px] tabular-nums')} style={{ color: tc }}>
                      {hex}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Section 7: Dual tone on sand — ren farvekomposition
// ═══════════════════════════════════════════════════════════════════════════

function DualTone() {
  return (
    <section className="mb-24">
      <SectionHead
        num={7}
        title="Dual tone on sand — ren farvekomposition"
        desc="Sand | farve | sand. Ingen tekst, ingen elementer. Bare rene flader for at se hvordan overgangen mellem sand og farve føles."
      />
      <div className="flex flex-col gap-2">
        {HUES.map(h => (
          <div key={h.H} className="flex">
            <div style={{ flex: 1, height: 80, backgroundColor: 'var(--bg)' }} />
            <div style={{ flex: 1, height: 80, backgroundColor: oklchCSS(BASE_L, h.C, h.H) }} />
            <div style={{ flex: 1, height: 80, backgroundColor: 'var(--bg)' }} />
          </div>
        ))}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Section 8: Gamut boundary — teknisk reference
// ═══════════════════════════════════════════════════════════════════════════

function GamutBoundary() {
  return (
    <section className="mb-24">
      <SectionHead
        num={8}
        title="Gamut boundary — teknisk reference"
        desc="For hver hue ved L=0.67: max chroma i sRGB, Display P3 og Rec.2020. Viser hvor meget rum hvert gamut giver."
      />
      <div className="flex flex-col gap-3">
        {HUES.map(h => {
          const gamutData = GAMUTS.map(g => ({
            gamut: g,
            maxC: findMaxChroma(BASE_L, h.H, g),
          }))
          return (
            <div key={h.H} className="flex items-center gap-2">
              <span
                className={cn(FONT.body, WEIGHT.medium, 'text-[11px] text-[var(--n800)] shrink-0')}
                style={{ width: 80 }}
              >
                {h.name}
              </span>
              <div className="flex gap-1.5">
                {gamutData.map(({ gamut, maxC }) => {
                  const tc = darkText(h.H)
                  const labels: Record<string, string> = { srgb: 'sRGB', p3: 'Display P3', rec2020: 'Rec.2020' }
                  return (
                    <div key={gamut} className="flex flex-col items-center gap-1">
                      <div
                        className="rounded-[2px]"
                        style={{
                          width: 140, height: 60,
                          backgroundColor: oklchCSS(BASE_L, maxC, h.H),
                          padding: 6, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                        }}
                      >
                        <span className={cn(FONT.body, 'text-[9px] tabular-nums')} style={{ color: tc }}>
                          C={maxC.toFixed(3)}
                        </span>
                      </div>
                      <span className={cn(FONT.body, 'text-[10px] text-[var(--n600)]')}>
                        {labels[gamut]}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Section 9: UI Component Preview — @ramtt/ui med accent overrides
// ═══════════════════════════════════════════════════════════════════════════

function UIPreview() {
  return (
    <section className="mb-24">
      <SectionHead
        num={9}
        title="UI component preview — @ramtt/ui accent test"
        desc="Hver hue som accent-farve på reelle @ramtt/ui komponenter. Knapper, switches, badges, inputs og progress bars med fuldt 14-token accent ramp."
      />
      <div className="grid grid-cols-2 gap-6">
        {HUES.map(h => {
          const vars = accentRamp(h.H, h.C)
          const { hex } = oklchToHex(BASE_L, h.C, h.H)
          return (
            <div
              key={h.H}
              className="flex flex-col gap-4 p-5 rounded-[2px]"
              style={{
                ...vars,
                backgroundColor: 'var(--bg)',
              } as React.CSSProperties}
            >
              {/* Header: swatch + name */}
              <div className="flex items-center gap-3">
                <div
                  className="rounded-[2px] shrink-0"
                  style={{ width: 40, height: 40, backgroundColor: oklchCSS(BASE_L, h.C, h.H) }}
                />
                <div>
                  <p className={cn(FONT.body, WEIGHT.medium, 'text-[13px] text-[var(--n1150)]')}>
                    {h.name}
                  </p>
                  <p className={cn(FONT.body, WEIGHT.normal, 'text-[11px] tabular-nums text-[var(--n600)]')}>
                    {hex} — H={Math.round(h.H)}°
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2">
                <Button variant="primary" size="sm">Primary</Button>
                <Button variant="outline" size="sm">Outline</Button>
                <Button variant="ghost" size="sm">Ghost</Button>
              </div>

              {/* Switch + Badge */}
              <div className="flex items-center gap-4">
                <Switch checked={true} onChange={() => {}} />
                <Switch checked={false} onChange={() => {}} />
                <Badge color="var(--accent)">Accent</Badge>
                <Badge variant="outline" color="var(--accent)">Outline</Badge>
              </div>

              {/* Input */}
              <Input placeholder="Focus for accent ring..." />

              {/* ProgressBar */}
              <ProgressBar value={67} max={100} color="var(--accent)" label="67%" />
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function ColorLab() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <div style={{ maxWidth: 1400 }} className="mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-16">
          <h1 className={cn(FONT.body, WEIGHT.medium, 'text-[22px]')} style={{ color: 'rgba(0,0,0,0.75)' }}>
            RAMTT Color Lab
          </h1>
          <p className={cn(FONT.body, WEIGHT.normal, 'text-[14px] mt-2 max-w-[660px]')} style={{ color: 'rgba(0,0,0,0.4)' }}>
            Perceptual palette explorer matched to Figma blue (#0D99FF = OKLCH L=0.67, C=0.183, H=249°).
            All colors on sand canvas. Change BASE_L at the top of the file to explore different lightness targets.
          </p>
        </header>

        <MatchedBaseline />
        <LightnessLadder />
        <ChromaLadder />
        <SideBySide />
        <PairTest />
        <MixedBaselines />
        <DualTone />
        <GamutBoundary />
        <UIPreview />
      </div>
    </main>
  )
}
