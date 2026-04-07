'use client'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RAMTT — 4-Font System Specification
// React/Next.js version of the typography system spec
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/* ─── Helper: inline style shorthands for the 4 fonts ─── */
const f = {
  display: (size: number, weight = 300, tracking = '-0.02em') =>
    ({
      fontFamily: 'var(--font-display, "Cormorant Garamond", Georgia, serif)',
      fontSize: size,
      fontWeight: weight,
      letterSpacing: tracking,
      lineHeight: size > 50 ? 1.05 : size > 36 ? 1.15 : 1.2,
      fontFeatureSettings: "'onum' 1",
    }) as React.CSSProperties,

  label: (size: number, weight = 600, tracking = '0.10em') =>
    ({
      fontFamily: 'var(--font-label, "Space Grotesk", sans-serif)',
      fontSize: size,
      fontWeight: weight,
      letterSpacing: tracking,
      textTransform: 'uppercase' as const,
      lineHeight: 1.2,
    }) as React.CSSProperties,

  body: (size = 16, weight = 400) =>
    ({
      fontFamily: 'var(--font-sans, "Satoshi", system-ui, sans-serif)',
      fontSize: size,
      fontWeight: weight,
      lineHeight: size >= 16 ? 1.65 : 1.6,
    }) as React.CSSProperties,

  mono: (size: number, weight = 400, tracking = '0') =>
    ({
      fontFamily: 'var(--font-space, "JetBrains Mono", monospace)',
      fontSize: size,
      fontWeight: weight,
      letterSpacing: tracking,
      fontFeatureSettings: "'tnum' 1",
    }) as React.CSSProperties,

  editorial: (size = 17, weight = 400) =>
    ({
      fontFamily: "var(--font-editorial, 'Lora', Georgia, serif)",
      fontSize: size,
      fontWeight: weight,
      lineHeight: 1.75,
    }) as React.CSSProperties,
}

/* ─── Color tokens ─── */
const c = {
  canvas: 'var(--bg)',
  n50: '#FBFBF8',
  n400: 'var(--n400)',
  n600: 'var(--n600)',
  n800: 'var(--n800)',
  n1050: 'var(--n1050)',
  n1150: 'var(--n1150)',
  z1: '#7CA3BE',
  z2: '#14B8A2',
  z3: '#E8B020',
  z4: '#E36B30',
  z5: '#E83B52',
  z6: '#9B40E8',
  fluid: '#2AACCC',
}

/* ─── Reusable layout pieces ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ ...f.label(11, 600, '0.10em'), color: c.n800, marginBottom: 32 }}>{children}</div>
}

function SectionIntro({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ ...f.body(15), color: c.n800, maxWidth: 640, marginBottom: 48, lineHeight: 1.7 }}>
      {children}
    </p>
  )
}

function MetaItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ ...f.label(9, 600, '0.10em'), color: c.n600, marginBottom: 6 }}>{label}</div>
      <div style={{ ...f.mono(12), color: c.n1050, lineHeight: 1.5 }}>{children}</div>
    </div>
  )
}

function FontCard({
  name,
  role,
  accentColor,
  meta,
  children,
}: {
  name: string
  role: string
  accentColor: string
  meta: { label: string; lines: string[] }[]
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        background: 'white',
        border: `1px solid ${c.n400}`,
        borderRadius: 12,
        padding: 48,
        marginBottom: 32,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accentColor }} />

      {/* header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
        <div style={{ ...f.body(20, 600), color: c.n1150 }}>{name}</div>
        <div
          style={{
            ...f.label(10, 600, '0.10em'),
            color: c.n600,
            background: c.n50,
            padding: '4px 12px',
            borderRadius: 4,
            border: `1px solid ${c.n400}`,
          }}
        >
          {role}
        </div>
      </div>

      {/* specimen */}
      <div style={{ marginBottom: 36 }}>{children}</div>

      {/* meta grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 20,
          paddingTop: 28,
          borderTop: `1px solid ${c.n400}`,
        }}
      >
        {meta.map((m) => (
          <MetaItem key={m.label} label={m.label}>
            {m.lines.map((line, i) => (
              <span key={i}>
                {line}
                {i < m.lines.length - 1 && <br />}
              </span>
            ))}
          </MetaItem>
        ))}
      </div>
    </div>
  )
}

function ZoneTag({ zone, color }: { zone: string; color: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        ...f.label(10, 600, '0.10em'),
        color,
        padding: '5px 12px',
        borderRadius: 6,
        border: `1px solid ${color}`,
        background: `${color}14`,
      }}
    >
      {zone}
    </span>
  )
}

function CodeTag({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        ...f.mono(12),
        background: 'rgba(0,0,0,0.04)',
        padding: '1px 5px',
        borderRadius: 3,
      }}
    >
      {children}
    </code>
  )
}

function FontTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        ...f.mono(11),
        color: c.n600,
        background: c.n50,
        padding: '2px 8px',
        borderRadius: 3,
        border: `1px solid ${c.n400}`,
      }}
    >
      {children}
    </span>
  )
}

function RuleTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        ...f.mono(11),
        color: c.z4,
        background: `${c.z4}0F`,
        padding: '2px 8px',
        borderRadius: 3,
        border: `1px solid ${c.z4}33`,
      }}
    >
      {children}
    </span>
  )
}

/* ─── Combo demo wrapper ─── */
function ComboDemo({ label, children, dark }: { label: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <div style={{ background: 'white', border: `1px solid ${c.n400}`, borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
      <div style={{ padding: '12px 24px', borderBottom: `1px solid ${c.n400}`, background: c.n50 }}>
        <span style={{ ...f.label(9, 600, '0.10em'), color: c.n600 }}>{label}</span>
      </div>
      <div style={{ padding: dark ? 0 : 40 }}>{children}</div>
    </div>
  )
}

/* ─── Anti-pattern card ─── */
function AntiCard({ type, children }: { type: 'do' | 'dont'; children: React.ReactNode }) {
  const color = type === 'do' ? c.z2 : c.z5
  return (
    <div
      style={{
        padding: 24,
        borderRadius: 10,
        border: `1px solid ${color}33`,
        background: `${color}0A`,
      }}
    >
      <div style={{ ...f.label(10, 600, '0.10em'), color, marginBottom: 16 }}>
        {type === 'do' ? '\u2713 Gor dette' : '\u2717 Aldrig dette'}
      </div>
      <div style={{ ...f.body(14), color: c.n1050, lineHeight: 1.6 }}>{children}</div>
    </div>
  )
}

/* ─── Token block (dark code) ─── */
function TokenLine({ k, v, comment }: { k?: string; v?: string; comment?: string }) {
  if (comment) {
    return (
      <div style={{ color: c.n800, fontStyle: 'italic' }}>{comment}</div>
    )
  }
  return (
    <div>
      <span style={{ color: c.z2 }}>{k}</span>: <span style={{ color: c.canvas }}>{v}</span>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function TypeSystemPage() {
  return (
    <div style={{ background: c.canvas, color: c.n1150, minHeight: '100vh' }}>
      {/* ════════ HEADER ════════ */}
      <header style={{ padding: '80px 60px 60px', borderBottom: `1px solid ${c.n400}` }}>
        <div style={{ ...f.label(11, 500, '0.10em'), color: c.n800, marginBottom: 16 }}>Typography System</div>
        <h1 style={{ ...f.display(52, 300, '-0.02em'), color: c.n1150, marginBottom: 12 }}>4-Font System</h1>
        <p style={{ ...f.body(18), color: c.n800, maxWidth: 600 }}>
          Cormorant Garamond &middot; Space Grotesk &middot; Satoshi &middot; JetBrains Mono — med Lora til editorial body.
        </p>
        <div style={{ ...f.mono(12), color: c.n600, marginTop: 20 }}>v1.0 — Locked March 2026 &middot; &alpha; Warm Electric</div>
      </header>

      {/* ════════ SECTION 1: FONT STACK ════════ */}
      <section style={{ padding: '60px', borderBottom: `1px solid ${c.n400}` }}>
        <SectionLabel>01 — Font Stack Overview</SectionLabel>
        <SectionIntro>
          Fire fonte, fire adskilte roller. Ingen overlapper. Hver font har et job — og regler der forhindrer misbrug.
          Lora tilfojes som femte font udelukkende til editorial/Letters brodtekst.
        </SectionIntro>

        {/* Cormorant Garamond */}
        <FontCard
          name="Cormorant Garamond"
          role="Special Moments &middot; Display"
          accentColor={c.n1150}
          meta={[
            { label: 'Rolle', lines: ['Reserveret til "special moments"', 'i appen — velkomst, milestones,', 'science-sider, onboarding'] },
            { label: 'Weights', lines: ['Display (48–68px): 300', 'H1 (36–44px): 300', 'H2 (24–32px): 400', 'H3 (18–22px): 500'] },
            { label: 'Tracking', lines: ['Display: \u22120.03em', 'H1: \u22120.02em', 'H2/H3: \u22120.02em'] },
            { label: 'Regler', lines: ['Altid oldstyle numerals', 'Storre = lettere weight', 'Aldrig til funktionel UI', 'Maks ~3–5 steder i appen'] },
          ]}
        >
          <div style={f.display(68, 300, '-0.03em')}>
            Din krop,<br />dine zoner
          </div>
          <div style={{ height: 20 }} />
          <div style={f.display(44, 300, '-0.02em')}>Velkommen tilbage, Malte</div>
          <div style={{ height: 16 }} />
          <div style={f.display(32, 400, '-0.02em')}>Milestone: 1.000 km lobet i 2026</div>
        </FontCard>

        {/* Space Grotesk */}
        <FontCard
          name="Space Grotesk"
          role="Labels &middot; Section Headers"
          accentColor={c.z3}
          meta={[
            { label: 'Rolle', lines: ['Alle labels, tags, badges,', 'section headers, tab-bars,', 'sidebar-kategorier, nav-items'] },
            { label: 'Storrelse', lines: ['Section headers: 14–16px / 500', 'Labels: 11–12px / 600', 'Micro-labels: 9–10px / 600'] },
            { label: 'Tracking', lines: ['Section headers: 0.08em', 'Labels: 0.10em', 'Micro: 0.12em'] },
            { label: 'Regler', lines: ['ALTID uppercase', 'ALTID tracked', 'Aldrig mixed case', 'Aldrig til brodtekst'] },
          ]}
        >
          {/* Section header specimen */}
          <div
            style={{
              ...f.label(14, 500, '0.08em'),
              color: c.n1050,
              paddingBottom: 12,
              borderBottom: `1px solid ${c.n400}`,
              marginBottom: 16,
            }}
          >
            Traeningshistorik
          </div>
          <div style={{ height: 20 }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <span style={{ ...f.label(16, 500, '0.10em'), color: c.n1150 }}>Aktive zoner</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <span style={{ ...f.label(12, 600, '0.10em'), color: c.n1150 }}>Naeringsstof &middot; Anbefaling &middot; Status</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 20 }}>
            <span style={{ ...f.label(10, 600, '0.12em'), color: c.n800 }}>Sidst opdateret 28. mar 2026</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <ZoneTag zone="Zone 1" color={c.z1} />
            <ZoneTag zone="Zone 2" color={c.z2} />
            <ZoneTag zone="Zone 3" color={c.z3} />
            <ZoneTag zone="Zone 4" color={c.z4} />
            <ZoneTag zone="Zone 5" color={c.z5} />
          </div>
        </FontCard>

        {/* Satoshi */}
        <FontCard
          name="Satoshi"
          role="Body &middot; UI &middot; Primary"
          accentColor={c.n800}
          meta={[
            { label: 'Rolle', lines: ['Alt funktionelt: brodtekst,', 'knapper, inputs, tooltips,', 'navigation, fejlbeskeder'] },
            { label: 'Storrelse', lines: ['Body: 16px / 400', 'Secondary: 14px / 400', 'Small: 13px / 400', 'Buttons: 14–15px / 500–600'] },
            { label: 'Tracking', lines: ['Standard (0)', 'Ingen manipulation'] },
            { label: 'Regler', lines: ['Normal case (sentence/title)', 'Aldrig uppercase', 'Aldrig til labels/tags', 'Preload denne forst'] },
          ]}
        >
          <div style={{ ...f.body(16), color: c.n1050, maxWidth: 560 }}>
            Satoshi er RAMTTs hverdagsfont. Den bruges til alt funktionelt indhold — brodtekst, knapper,
            inputs, tooltips, fejlbeskeder, onboarding-tekst og navigation. Den er luftig nok til sma storrelser og
            neutral nok til at aldrig stjaele opmaerksomhed fra indholdet.
          </div>
          <div style={{ ...f.body(14), color: c.n800, maxWidth: 560, marginTop: 12 }}>
            Sekundaer tekst i 14px — bruges til hjaelpetekst, placeholders, og understottende information der ikke
            skal dominere hierarkiet.
          </div>
        </FontCard>

        {/* JetBrains Mono */}
        <FontCard
          name="JetBrains Mono"
          role="Data &middot; Numbers"
          accentColor={c.z2}
          meta={[
            { label: 'Rolle', lines: ['Alle numeriske vaerdier,', 'data displays, tidsformater,', 'units, kode-snippets'] },
            { label: 'Storrelse', lines: ['Hero data: 24–32px / 500', 'Inline data: 14–16px / 400', 'Units/labels: 11–12px / 400', 'Micro: 10px / 400'] },
            { label: 'Tracking', lines: ['Hero: \u22120.02em', 'Standard: 0', 'Units: 0.02em'] },
            { label: 'Regler', lines: ['Kun til tal og data', 'Aldrig til brodtekst', 'Tabular figures aktive', 'Parres med Space Grotesk units'] },
          ]}
        >
          <div style={{ display: 'flex', gap: 48, alignItems: 'baseline' }}>
            {[
              { val: '72', unit: 'g/h CHO' },
              { val: '580', unit: 'ml/h fluid' },
              { val: '164', unit: 'bpm avg' },
              { val: '3:42', unit: 'min/km pace' },
            ].map((d) => (
              <div key={d.unit} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ ...f.mono(28, 500, '-0.02em'), color: c.n1150 }}>{d.val}</div>
                <div style={{ ...f.mono(11), color: c.n600, letterSpacing: '0.02em' }}>{d.unit}</div>
              </div>
            ))}
          </div>
          <div style={{ height: 20 }} />
          <div style={{ ...f.mono(13), color: c.n800 }}>
            0123456789 &middot; 3:42:18 &middot; 72.4g &middot; 164bpm &middot; &minus;0.03em &middot; var(--bg)
          </div>
        </FontCard>

        {/* Lora */}
        <FontCard
          name="Lora"
          role="Editorial Body &middot; Letters Only"
          accentColor={c.z5}
          meta={[
            { label: 'Rolle', lines: ['Kun editorial/Letters', 'brodtekst — aldrig i appen'] },
            { label: 'Storrelse', lines: ['Body: 17px / 400', 'Italic for emphasis'] },
            { label: 'Tracking', lines: ['Standard (0)'] },
            { label: 'Regler', lines: ['Kun til Letters/artikler', 'Aldrig i app UI', 'Parres med Cormorant headlines'] },
          ]}
        >
          <div style={{ ...f.editorial(17), color: c.n1050, maxWidth: 560 }}>
            Nar du traener i zone 3, er kroppen i en delikat balance mellem aerob og anaerob energiomsaetning. Det er
            her kulhydratindtaget spiller den mest kritiske rolle — for lidt, og du rammer muren; for meget, og
            mave-tarm-systemet protesterer. Forskningen peger pa et sweet spot omkring 60–90 gram pr. time.
          </div>
        </FontCard>
      </section>

      {/* ════════ SECTION 2: ROLE MATRIX ════════ */}
      <section style={{ padding: '60px', borderBottom: `1px solid ${c.n400}` }}>
        <SectionLabel>02 — Role Matrix</SectionLabel>
        <SectionIntro>Enhver tekst i RAMTT falder i en af disse kategorier. Matrixen eliminerer tvetydighed.</SectionIntro>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
          <thead>
            <tr>
              {['Element', 'Font', 'Storrelse', 'Weight', 'Case', 'Regler'].map((h) => (
                <th
                  key={h}
                  style={{
                    ...f.label(9, 600, '0.10em'),
                    color: c.n600,
                    textAlign: 'left',
                    padding: '12px 16px',
                    borderBottom: `2px solid ${c.n400}`,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { el: 'Display headline', font: 'Cormorant', size: '48–68px', w: '300', case_: 'Sentence', rule: 'Special moments only' },
              { el: 'H1 headline', font: 'Cormorant', size: '36–44px', w: '300', case_: 'Sentence', rule: 'Special moments only' },
              { el: 'Section header', font: 'Space Grotesk', size: '14–16px', w: '500', case_: 'UPPERCASE', rule: 'tracking: 0.08em' },
              { el: 'Tab bar / Nav', font: 'Space Grotesk', size: '12–14px', w: '500–600', case_: 'UPPERCASE', rule: 'tracking: 0.10em' },
              { el: 'Label / Tag', font: 'Space Grotesk', size: '10–12px', w: '600', case_: 'UPPERCASE', rule: 'tracking: 0.10em' },
              { el: 'Micro-label', font: 'Space Grotesk', size: '9–10px', w: '600', case_: 'UPPERCASE', rule: 'tracking: 0.12em' },
              { el: 'Body text', font: 'Satoshi', size: '16px', w: '400', case_: 'Sentence', rule: '' },
              { el: 'Secondary text', font: 'Satoshi', size: '14px', w: '400', case_: 'Sentence', rule: '' },
              { el: 'Button', font: 'Satoshi', size: '14–15px', w: '500–600', case_: 'Sentence', rule: '' },
              { el: 'Input / Placeholder', font: 'Satoshi', size: '15px', w: '400', case_: 'Sentence', rule: '' },
              { el: 'Tooltip / Help', font: 'Satoshi', size: '13px', w: '400', case_: 'Sentence', rule: '' },
              { el: 'Data value (hero)', font: 'JetBrains Mono', size: '24–32px', w: '500', case_: '—', rule: 'tabular figures' },
              { el: 'Data value (inline)', font: 'JetBrains Mono', size: '14–16px', w: '400', case_: '—', rule: '' },
              { el: 'Unit label', font: 'JetBrains Mono', size: '11–12px', w: '400', case_: 'lowercase', rule: '' },
              { el: 'Editorial body', font: 'Lora', size: '17px', w: '400', case_: 'Sentence', rule: 'Letters only' },
            ].map((row) => (
              <tr key={row.el}>
                <td style={{ ...f.body(14, 600), color: c.n1150, padding: '14px 16px', borderBottom: `1px solid ${c.n400}`, whiteSpace: 'nowrap' }}>
                  {row.el}
                </td>
                <td style={{ ...f.body(14), color: c.n1050, padding: '14px 16px', borderBottom: `1px solid ${c.n400}` }}>
                  <FontTag>{row.font}</FontTag>
                </td>
                <td style={{ ...f.body(14), color: c.n1050, padding: '14px 16px', borderBottom: `1px solid ${c.n400}` }}>{row.size}</td>
                <td style={{ ...f.body(14), color: c.n1050, padding: '14px 16px', borderBottom: `1px solid ${c.n400}` }}>{row.w}</td>
                <td style={{ ...f.body(14), color: c.n1050, padding: '14px 16px', borderBottom: `1px solid ${c.n400}` }}>{row.case_}</td>
                <td style={{ ...f.body(14), color: c.n1050, padding: '14px 16px', borderBottom: `1px solid ${c.n400}` }}>
                  {row.rule && <RuleTag>{row.rule}</RuleTag>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ════════ SECTION 3: LIVE COMBOS ════════ */}
      <section style={{ padding: '60px', borderBottom: `1px solid ${c.n400}` }}>
        <SectionLabel>03 — Live Combinations</SectionLabel>
        <SectionIntro>
          Sadan spiller fontene sammen i realistiske kontekster. Laeg maerke til hvordan hver font har sin egen bane
          — de krydser aldrig.
        </SectionIntro>

        {/* Dashboard Card */}
        <ComboDemo label="App &middot; Dashboard Card">
          <div
            style={{
              ...f.label(14, 500, '0.08em'),
              color: c.n1050,
              paddingBottom: 12,
              borderBottom: `1px solid ${c.n400}`,
              marginBottom: 20,
            }}
          >
            Dagens oversigt
          </div>
          <div style={{ display: 'flex', gap: 40, alignItems: 'baseline', marginBottom: 16 }}>
            <div>
              <div style={{ ...f.mono(28, 500, '-0.02em'), color: c.n1150 }}>72</div>
              <div style={{ ...f.mono(11), color: c.n600, letterSpacing: '0.02em' }}>g/h mal</div>
            </div>
            <div>
              <div style={{ ...f.mono(22, 500, '-0.02em'), color: c.n1150 }}>48</div>
              <div style={{ ...f.mono(11), color: c.n600, letterSpacing: '0.02em' }}>g/h aktuelt</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <ZoneTag zone="Zone 2" color={c.z2} />
            <ZoneTag zone="Zone 3" color={c.z3} />
          </div>
          <div style={{ ...f.body(14), color: c.n800, marginTop: 0 }}>
            Du ligger 24 g/h under dit mal. Overvej at tilfoeje en gel ved naeste interval.
          </div>
        </ComboDemo>

        {/* Special Moment */}
        <ComboDemo label="App &middot; Special Moment">
          <div style={{ textAlign: 'center', padding: '60px 40px' }}>
            <div style={{ ...f.label(10, 600, '0.12em'), color: c.n800, marginBottom: 16 }}>MILESTONE</div>
            <div style={{ ...f.display(68, 300, '-0.03em'), marginBottom: 20 }}>1.000 km</div>
            <div style={{ ...f.body(16), color: c.n800, maxWidth: 400, margin: '0 auto' }}>
              Du har lobet tusind kilometer med RAMTT. Det er fra Kobenhavn til Firenze.
            </div>
          </div>
        </ComboDemo>

        {/* Dark Data Card */}
        <ComboDemo label="App &middot; Dark Data Card" dark>
          <div style={{ background: c.n1150, borderRadius: 0, padding: 40 }}>
            <div style={{ ...f.label(10, 600, '0.12em'), color: c.n600, marginBottom: 24 }}>RACE DAY PROTOCOL</div>
            <div style={{ ...f.display(44, 300, '-0.02em'), color: c.canvas, marginBottom: 32 }}>
              Copenhagen<br />Marathon 2026
            </div>
            <div style={{ display: 'flex', gap: 48, marginBottom: 24 }}>
              {[
                { val: '90', unit: 'g/h CHO' },
                { val: '720', unit: 'ml/h fluid' },
                { val: '200', unit: 'mg caffeine' },
              ].map((d) => (
                <div key={d.unit}>
                  <div style={{ ...f.mono(28, 500, '-0.02em'), color: c.canvas }}>{d.val}</div>
                  <div style={{ ...f.mono(11), color: c.n600, letterSpacing: '0.02em' }}>{d.unit}</div>
                </div>
              ))}
            </div>
            <div style={{ ...f.body(14), color: c.n600 }}>
              Baseret pa din sveddrate og zone 3–4 fordeling over 42.2 km.
            </div>
          </div>
        </ComboDemo>

        {/* Editorial */}
        <ComboDemo label="Letters &middot; Editorial">
          <div style={{ padding: 8 }}>
            <div style={{ ...f.label(10, 600, '0.12em'), color: c.z5, marginBottom: 20 }}>
              LETTER #12 &middot; FORDOJELSE
            </div>
            <div style={{ ...f.display(44, 300, '-0.02em'), marginBottom: 24 }}>
              Hvorfor din mave<br />siger stop i zone 4
            </div>
            <div style={{ ...f.editorial(17), color: c.n1050, maxWidth: 520 }}>
              Nar intensiteten stiger, omdirigerer kroppen blod fra fordojelsessystemet til de arbejdende muskler.
              Det er en overlevelsesmekanisme — men for en atlet midt i et lob betyder det, at den gel du lige
              slugte, nu sidder som en klump i maven.
            </div>
          </div>
        </ComboDemo>
      </section>

      {/* ════════ SECTION 4: ANTI-PATTERNS ════════ */}
      <section style={{ padding: '60px', borderBottom: `1px solid ${c.n400}` }}>
        <SectionLabel>04 — Anti-Patterns</SectionLabel>
        <SectionIntro>Regler der aldrig brydes. Hvis du er i tvivl, er svaret sandsynligvis her.</SectionIntro>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <AntiCard type="do">
            Space Grotesk label: <CodeTag>AKTIVE ZONER</CodeTag>
            <br />
            Uppercase, tracked, 10–16px
          </AntiCard>
          <AntiCard type="dont">
            Space Grotesk i mixed case: <CodeTag>Aktive Zoner</CodeTag>
            <br />
            Space Grotesk til brodtekst
          </AntiCard>

          <AntiCard type="do">
            Cormorant kun pa &ldquo;special moment&rdquo; sider
            <br />
            Weight 300 ved 44px+
          </AntiCard>
          <AntiCard type="dont">
            Cormorant som hverdags-headline i appen
            <br />
            Cormorant i bold (700) ved store storrelser
          </AntiCard>

          <AntiCard type="do">
            JetBrains Mono til <CodeTag>72 g/h</CodeTag>
            <br />
            Tal, data, units, tidsformater
          </AntiCard>
          <AntiCard type="dont">
            JetBrains Mono til labels: <CodeTag>ZONE 2</CodeTag>
            <br />
            Det er Space Grotesks job
          </AntiCard>

          <AntiCard type="do">
            Satoshi til knapper, inputs, hjaelpetekst
            <br />
            Normal case, ingen tracking
          </AntiCard>
          <AntiCard type="dont">
            Satoshi i uppercase som label
            <br />
            Det er Space Grotesks job
          </AntiCard>
        </div>
      </section>

      {/* ════════ SECTION 5: CSS TOKENS ════════ */}
      <section style={{ padding: '60px', borderBottom: `1px solid ${c.n400}` }}>
        <SectionLabel>05 — CSS Custom Properties</SectionLabel>
        <SectionIntro>
          Copy-paste tokens til implementering. Tailwind 4-kompatibel via <CodeTag>@theme</CodeTag> directive.
        </SectionIntro>

        <div
          style={{
            background: c.n1150,
            borderRadius: 10,
            padding: 32,
            overflowX: 'auto',
            ...f.mono(13),
            lineHeight: 1.8,
            color: c.n600,
          }}
        >
          <TokenLine comment="/* --- Font Families --- */" />
          <TokenLine k="--font-display" v="'Cormorant Garamond', Georgia, serif;" />
          <TokenLine k="--font-body" v="'Satoshi', -apple-system, sans-serif;" />
          <TokenLine k="--font-label" v="'Space Grotesk', sans-serif;" />
          <TokenLine k="--font-mono" v="'JetBrains Mono', 'SF Mono', monospace;" />
          <TokenLine k="--font-editorial" v="'Lora', Georgia, serif;" />
          <div style={{ height: 12 }} />
          <TokenLine comment="/* --- Space Grotesk Label Utilities --- */" />
          <TokenLine k="--label-section" v="500 14px/1.2 var(--font-label); letter-spacing: 0.08em; text-transform: uppercase;" />
          <TokenLine k="--label-default" v="600 11px/1.2 var(--font-label); letter-spacing: 0.10em; text-transform: uppercase;" />
          <TokenLine k="--label-micro" v="600 10px/1.2 var(--font-label); letter-spacing: 0.12em; text-transform: uppercase;" />
          <div style={{ height: 12 }} />
          <TokenLine comment="/* --- Cormorant Display Scale --- */" />
          <TokenLine k="--type-display" v="300 68px/1.05 var(--font-display); letter-spacing: -0.03em;" />
          <TokenLine k="--type-h1" v="300 44px/1.15 var(--font-display); letter-spacing: -0.02em;" />
          <TokenLine k="--type-h2" v="400 32px/1.2 var(--font-display); letter-spacing: -0.02em;" />
          <TokenLine k="--type-h3" v="500 22px/1.3 var(--font-display); letter-spacing: -0.02em;" />
          <div style={{ height: 12 }} />
          <TokenLine comment="/* --- Satoshi Body Scale --- */" />
          <TokenLine k="--type-body" v="400 16px/1.65 var(--font-body);" />
          <TokenLine k="--type-body-sm" v="400 14px/1.6 var(--font-body);" />
          <TokenLine k="--type-small" v="400 13px/1.5 var(--font-body);" />
          <TokenLine k="--type-button" v="500 14px/1.2 var(--font-body);" />
          <div style={{ height: 12 }} />
          <TokenLine comment="/* --- JetBrains Mono Data Scale --- */" />
          <TokenLine k="--data-hero" v="500 28px/1.1 var(--font-mono); letter-spacing: -0.02em;" />
          <TokenLine k="--data-default" v="400 16px/1.3 var(--font-mono);" />
          <TokenLine k="--data-unit" v="400 11px/1.2 var(--font-mono); letter-spacing: 0.02em;" />
        </div>
      </section>

      {/* ════════ SECTION 6: PERFORMANCE ════════ */}
      <section style={{ padding: '60px', borderBottom: `1px solid ${c.n400}` }}>
        <SectionLabel>06 — Performance &amp; Loading</SectionLabel>
        <SectionIntro>
          Fire fonte i woff2 er under 200 KB samlet, subsetted. Denne strategi sikrer at intet blokerer rendering.
        </SectionIntro>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 32 }}>
          {[
            {
              title: 'Preload',
              text: 'Kun Satoshi preloades — det er den forste font brugeren ser. Alle andre loader asynkront med font-display: swap.',
            },
            {
              title: 'Subset',
              text: 'Cormorant Garamond subsettes til Latin. Space Grotesk subsettes til uppercase Latin + tal. JetBrains Mono til tal + fa tegn (:./\u2212+).',
            },
            {
              title: 'Format',
              text: 'Alt i woff2. Ingen woff1/ttf fallbacks nodvendige for moderne browsers. Variable fonts hvor tilgaengelige.',
            },
            {
              title: 'Self-Host',
              text: 'Self-host alle fonte — en DNS-request mindre pr. font vs. Google Fonts. Server fra samme domaene/CDN som appen.',
            },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                background: c.n50,
                border: `1px solid ${c.n400}`,
                borderRadius: 10,
                padding: 32,
              }}
            >
              <div style={{ ...f.label(10, 600, '0.10em'), color: c.n600, marginBottom: 20 }}>{card.title}</div>
              <div style={{ ...f.body(14), color: c.n800, lineHeight: 1.6, margin: 0 }}>{card.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════ SECTION 7: DECISION GUIDE ════════ */}
      <section style={{ padding: '60px', borderBottom: `1px solid ${c.n400}` }}>
        <SectionLabel>07 — Decision Guide</SectionLabel>
        <SectionIntro>Nar du er i tvivl om hvilken font du skal bruge, folg dette flowchart.</SectionIntro>

        <div
          style={{
            background: c.n50,
            border: `1px solid ${c.n400}`,
            borderRadius: 12,
            padding: 48,
          }}
        >
          <div style={{ ...f.body(15), color: c.n1050, lineHeight: 2.2 }}>
            <strong>Er det et tal eller en datavaerdi?</strong>
            <br />
            &rarr;{' '}
            <span style={{ ...f.mono(13), background: `${c.z2}1A`, padding: '2px 8px', borderRadius: 3 }}>
              JetBrains Mono
            </span>
            <br />
            <br />
            <strong>Er det en label, tag, badge, section header, tab, eller kategori?</strong>
            <br />
            &rarr;{' '}
            <span style={{ ...f.mono(13), background: `${c.z3}1A`, padding: '2px 8px', borderRadius: 3 }}>
              Space Grotesk &middot; UPPERCASE &middot; tracked
            </span>
            <br />
            <br />
            <strong>Er det en &ldquo;special moment&rdquo; — velkomst, milestone, onboarding, science-side?</strong>
            <br />
            &rarr;{' '}
            <span style={{ ...f.mono(13), background: `${c.n1150}14`, padding: '2px 8px', borderRadius: 3 }}>
              Cormorant Garamond &middot; wt 300 &middot; oldstyle nums
            </span>
            <br />
            <br />
            <strong>Er det editorial/Letters brodtekst?</strong>
            <br />
            &rarr;{' '}
            <span style={{ ...f.mono(13), background: `${c.z5}1A`, padding: '2px 8px', borderRadius: 3 }}>
              Lora
            </span>
            <br />
            <br />
            <strong>Alt andet?</strong>
            <br />
            &rarr;{' '}
            <span style={{ ...f.mono(13), background: `${c.n800}1A`, padding: '2px 8px', borderRadius: 3 }}>
              Satoshi
            </span>
          </div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer style={{ padding: '40px 60px', textAlign: 'center' }}>
        <p style={{ ...f.label(10, 500, '0.10em'), color: c.n600 }}>
          RAMTT &middot; &alpha; Warm Electric &middot; 4-Font System v1.0 &middot; March 2026
        </p>
      </footer>
    </div>
  )
}
