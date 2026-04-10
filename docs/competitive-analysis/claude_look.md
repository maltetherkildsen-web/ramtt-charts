Claude.ai UI – Dybdegående Analyse til ramtt-ui

# 1\. Farve-system & Design Tokens
Claude bruger **HSL-farvemodellen** (modsat Perplexity's oklch) med et **numerisk skala-system** (000–900) og egne custom fonts.
### Baggrunds-lag (Elevation system)


--bg-000: #ffffff       ← Ren hvid – input-felter, kort
--bg-100: #faf9f5       ← Varm off-white – sidens grundflade (kremen)
--bg-200: #f5f4ed       ← Lidt mørkere – subtile hover-overflader
--bg-300: #f0eee6       ← Lys beige – sekundære baggrunde
--bg-400: #e8e6dc       ← Beige – inaktive/disabled states
--bg-500: #e8e6dc       ← Identisk med 400 (aliased)
### bg-100 (#faf9f5) er **næsten identisk** med Perplexity's #faf8f5 — begge Anthropic-produkter deler den samme varm-beige farvesignatur. Det er en bevidst brandidentitet.
**Særlig detalje:** Baggrundsfladen har et subtilt **grid-mønster** (background-image: linear-gradient(to right, rgb(245,244,237) 1px, transparent) 32px/32px) — en meget lys 1px linjegrid i bg-200-farven over bg-100. Næsten usynligt, men giver en papirstruktur.
### Tekst-tokens


--text-000: #141413     ← Næsten sort (warm charcoal) – primær tekst
--text-100: #141413     ← Identisk med 000
--text-200: #3d3d3a     ← Mørkegrå – sekundær tekst
--text-300: #3d3d3a     ← Identisk med 200
--text-400: #73726c     ← Mellemgrå – dæmpet/quiet tekst
--text-500: #73726c     ← Identisk med 400
Observeret i praksis:
* Primær tekst: rgb(20, 20, 19) = #141413
* Sekundær tekst: rgb(61, 61, 58) = #3d3d3a
* Dæmpet tekst: rgb(115, 114, 108) = #73726c

⠀Border-tokens


--border-100 / 200 / 300 / 400: alle → #1f1e1d
Det er én enkelt mørk kantfarve, men bruges konsekvent i **lav opacity** i praksis: rgba(31, 30, 29, 0.15) (15%) for de fleste grænser, rgba(31, 30, 29, 0.3) (30%) for "medium", og rgba(31, 30, 29, 0.4) (40%) for den mere markerede variant.
### Brand/Accent farver


--brand-000: #c6613f    ← Mørk terracotta
--brand-100: #c6613f    ← Identisk
--brand-200: #d97757    ← Coral/terracotta – logofarven
--accent-brand: #d97757  ← Direkte alias for brand-200

--accent-000: #1b67b2   ← Dyb blå
--accent-100: #2c84db   ← Primær blå
--accent-200: #2c84db   ← Identisk med 100
--accent-900: #d3e5f8   ← Lys blå tint (badge-baggrunde)
### Semantiske farver


--success-000: #005c08 / -100: #2f7613 / -200: #2f7613 / -900: #e7f1da
--danger-000:  #8a2424 / -100: #b53333 / -200: #b53333 / -900: #f9ecec
--warning-100: #875a08 / -200: #875a08 / -900: #f8eedd
### Brand Glow – den unikke visuelle signatur
Claude har en karakteristisk **glowing brand effekt** på visse interaktive elementer:


box-shadow: 
  rgba(217, 119, 87, 0.24) 0px 40px 80px 0px,   ← stor diffus glow
  rgba(217, 119, 87, 0.24) 0px 4px 14px 0px       ← tæt, skarp glow
### #d97757 = --brand-200 (coral). Og hele baggrundslaget har en inset radial glow:


rgba(217, 119, 87, 0.54) 0px 0px 10.98px 0px inset,
rgba(217, 119, 87, 0.34) 0px 0px 20.98px 0px inset,
rgba(217, 119, 87, 0.12) 0px 0px 30.98px 0px inset
Det er det * i logoet og de subtile orange glows man kan se bag input-boksen. En meget distinkt og genkenelig effekt.

# 2\. Typografi
Claude har **tre custom fonts** — hele en font-familie til sin egen brug:


--font-anthropic-sans:  "Anthropic Sans"  ← UI, brødtekst, knapper
--font-anthropic-serif: "Anthropic Serif" ← Overskrifter (page titles)
--font-anthropic-mono:  "Anthropic Mono"  ← Kode
--font-dyslexia: "OpenDyslexic"           ← Tilgængeligheds-font
### Font-weight systemet
Meget interessant: Claude bruger 430 som gennemgående "standard" weight:


430  ← Standard/regular (de fleste nav-items, body, knapper)
500  ← Medium (headings, model selector, aktive items)
600  ← Semi-bold (section headings h2, "Stop Claude")
### 430 er **ikke en standard CSS-weight** – det er et variabelt font-punkt som kun virker med en variable font (Anthropic Sans er sandsynligvis en variable font). Det giver teksten en ultraraffineret "between regular and medium" tyngde.
### Type-skala (observeret live)
| **Størrelse** | **Weight** | **Line-height** | **Brug** | **Farve** |
|:-:|:-:|:-:|:-:|:-:|
| 24px | 500 | 31.2px | Page title (Settings, Projects) | #141413 |
| 16px | 600 | 22.4px | Section headings (h2: Profile, Notifications) | #141413 |
| 14px | 600 | 21px | Strong labels (Stop Claude) | #141413 |
| 14px | 500 | 20px | Medium labels (Malte Therkildsen, Activity) | #3d3d3a |
| 14px | 430 | 20px | Default UI-tekst (nav items, cards) | #3d3d3a |
| 14px | 430 | 19.6px | Settings labels, card descriptions | #141413 |
| 12px | 400 | 16px | Metadata, plan badge | #73726c |
| 10px | 430 | 12.5px | Beta-badge | #3d3d3a |
**Nøgle-observation:** Page titles (Projects, Settings) bruger **Anthropic Serif** (24px/500) — ikke sans-serif. Section-headings (h2) bruger **Anthropic Sans** (16px/600). Det skaber en meget elegant to-font-hierarki.

# 3\. Border Radius System


6px   ← Sidebar nav-items, model dropdown (lille radius)
8px   ← Prompt chips (Code/Write/Create), sort dropdown, "New project" knap
9.6px ← Form inputs og søgefelt (≈ 0.6rem ved 16px base)
12px  ← "Stop Claude" knap, project-kortenes hjørner
20px  ← Hoved-input-boksen (markant rund container)
9999px ← Toggle, avatar-cirkel, pills
### 9.6px til inputs er karakteristisk — det er rounded-xl / 0.6rem og giver en blød men ikke-fuldt-rund fornemmelse til felterne.

# 4\. Komponent-Analyse
### Sidebar Navigation
**Kollapset (default):** 80px bred, ikonerne alene i en lodret strip. Ingen labels synlige.
**Ekspanderet (hover/pinned):** 288px bred, med labels.
Sidebar egenskaber:


bg: #faf9f5 (bg-100) – samme som siden
border-right: 0.5px solid rgba(31, 30, 29, 0.15)
box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)
transition: background-color, border-color, box-shadow — 35ms cubic-bezier(0.4,0,0.2,1) med 75ms delay
Den sene transition (75ms delay) gør at sidbaren ikke animerer med det samme man svæver over – et lille venteøjeblik der forhindrer "accidental" opens.
**Nav-items:**
* Padding: 6px 16px
* Højde: 32px
* Font: 12px / 430 / Anthropic Sans
* Farve: #3d3d3a
* Border radius: 6px
* Transparent baggrund

⠀**Aktiv state:** bg: rgb(240, 238, 230) = en let mørkere beige end sidens baggrund. Identisk med --bg-300 / #f0eee6 – subtilt, ikke blå/akzent-farvet.
**Sektions-separator:** Tom pt-4 og gap-px (1px) mellem items.
**Recents-liste:** Chat-titler i 14px / 430, trunkeret med ..., ingen farve-highlight, bare tekstliste.
**Bottom user-widget:** Cirkulær avatar 36×36px, mørk charcoal baggrund #3d3d3a med hvid tekst (initialer), side-by-side med brugernavn (14px/500) + plan-navn (12px/400/quiet).
### Hoved-input (Homepage Search)


wrapper:
  bg: #ffffff (bg-000)
  border-radius: 20px
  border: 1px solid transparent
  box-shadow:
    rgba(0,0,0,0.035) 0px 4px 20px 0px  ← subtil depth shadow
    rgba(31,30,29,0.15) 0px 0px 0px 0.5px ← 0.5px inset border erstatning

textarea:
  bg: transparent
  font-size: 16px
  line-height: 22.4px (1.4)
  resize: none
  editor: TipTap ProseMirror
Inputtet er implementeret med **TipTap/ProseMirror** – ikke en simpel <textarea>. Det giver rig-tekst-understøttelse og markup.
**Toolbar i input (neden):**
* + tilføj-knap: 32×32px, 8px radius
* Model selector ("Opus 4.6"): 32×32px, 6px radius, 12px/430, transparent bg
* Voice-knap: 32×32px, 8px radius, 500 weight

⠀Prompt-chips (Code, Write, Create, Learn, From Drive)


height: 32px
padding: 0px 10px
bg: #faf9f5 (bg-100) ← samme som sidens bg!
border: 0.5px solid rgba(31,30,29,0.15)
border-radius: 8px
font-size: 14px
font-weight: 430
color: #3d3d3a
Har et inline ikon til venstre (SVG). "From Drive" har Google Drive-favicon.
### Primær knap ("+ New project")


color: #ffffff
bg: transparent (bruges --button-bg via ::before pseudo)
--button-bg: hsl(60 2.6% 7.6%) = #141413 ← næsten sort charcoal
border-radius: 8px
font-size: 14px
font-weight: 500
padding: 8px 12px 8px 8px
height: 36px
Primærknappen er en **mørk charcoal** (næsten sort), ikke brand-farvet. Understregede at brand-farven bruges som accent/glow, ikke til primær handling.
**Knap-animation:** ::before pseudo-element med --button-bg baggrund + spring-animation:


transition: transform 0.3s linear(0 0%, 0.35 11%, 0.74 22%, 0.93 33%, 0.99 44%, 
  1.006 55%, 1.004 66%, 1.002 77%, 1.001 89%, 1 100%)
Dette er en **custom spring-funktion** via linear() easing (CSS ny-syntax) – giver et blødt spring-klik.
Active state: scale(0.96) via :active på ::before.
### "Stop Claude"-knap


bg: #faf9f5 (bg-100)
border: 0.5px solid rgba(31,30,29,0.4)
border-radius: 12px
font-size: 14px
font-weight: 600
padding: 12px 16px
height: 46px
box-shadow: rgba(217,119,87,0.24) 0px 40px 80px + 0px 4px 14px ← brand glow!
### Sort dropdown-knap


height: 36px
bg: transparent
border: 0.5px solid rgba(31,30,29,0.3)
border-radius: 8px
font-size: 14px / weight 500
padding: 8px 8px 8px 12px
### Project-kort


width: 346px (i 2-kolonne grid)
height: 172px
bg: transparent
border: 0.5px solid rgba(31,30,29,0.15)
border-radius: 12px
padding: 16px 16px 16px 20px (lidt mere til venstre = venstre-accent følelse)
box-shadow: none
Kortene har **ingen baggrundsfyld** – de er transparente og viser baggrundens beige igennem, med kun en 0.5px border. Det er meget minimalistisk og skaber ikke en "card-stack" fornemmelse.


Kortene har **ingen baggrundsfyld** – de er transparente og viser baggrundens beige igennem, med kun en 0.5px border. Det er meget minimalistisk og skaber ikke en "card-stack" fornemmelse.
### Form-inputs


height: 44px
bg: #ffffff
border: 1px solid rgba(31,30,29,0.15)
border-radius: 9.6px
font-size: 14px
