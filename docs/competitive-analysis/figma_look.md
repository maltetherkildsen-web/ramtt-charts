# Figma UI – Dybdegående Analyse til ramtt-ui

# 1\. Farve-system & Design Tokens
Figma bruger et **semantisk token-system med ~817 farvetokens**, organiseret i et fladere, underkategoriseret navngivningssystem. Det er med afstand det mest omfangsrige af de tre.
### Primær farvepalette


--color-bg-brand:       #0d99ff   ← Figma-blå (primær brand)
--color-bg-secondary:   #f5f5f5   ← Lys grå (hover, searchbar, sekundær overflade)
--color-bg-tertiary:    #e6e6e6   ← Medium grå (dividers, disabled)
--color-bg-hover:       #f5f5f5   ← Identisk med secondary (hover state)
--color-bg-selected:    #e5f4ff   ← Lys blå tint (active sidebar item)
--color-bg-inverse:     #2c2c2c   ← Dark charcoal (toolbar, dark menus)
--color-bg-toolbar:     #2c2c2c   ← Identisk med inverse
--color-bg-disabled:    #d9d9d9   ← Lys grå
**Grundfarver:**
* Hvid: rgb(255,255,255) = #ffffff — sidebar, file browser, kort-footer
* Hvid sekundær: rgb(245,245,245) = #f5f5f5 — searchbar, hover-states, create-dropdown knapper
* Near-black: rgb(30,30,30) = #1e1e1e — dropdown menus

⠀Tekst-tokens


--color-text-primary:   #000000   ← Ren sort (primær tekst — ingen warm toning)
--color-text-secondary: #00000080 ← 50% opacity sort
--color-text-tertiary:  #0000004d ← 30% opacity sort
--color-text-disabled:  #0000004d ← Identisk med tertiary
--color-text-brand:     #007be5   ← Blå tekst (links, badges)
Observeret i praksis:
* Primær: rgba(0, 0, 0, 0.9) — næsten sort (90%)
* Sekundær: rgba(0, 0, 0, 0.5) — halvtransparent
* Quiet: rgba(0, 0, 0, 0.5) — til inaktive tabs

⠀**Bemærk:** Modsat Claude og Perplexity er Figma's tekstfarver **kold sort** uden warm undertone. Det giver en mere teknisk/neutral fornemmelse.
### Semantiske farver


--color-bg-success: #14ae5c   ← Grøn
--color-bg-danger:  #f24822   ← Figmas orange-rød (også Figma-logoets farve!)
--color-bg-warning: #ffcd29   ← Gul
--color-bg-measure: #f24822   ← Identisk med danger (bruges til spacing-annotations)
### Produkt-specifikke farver


--color-bg-component: #9747ff   ← Lilla – component-ikoner og merker
--color-bg-figjam:    #9747ff   ← Identisk – FigJam branding
Figma design blå:     #0d99ff   ← Brand
### Multiplayer / Cursor farver


--color-multiplayeryellow:           #ffcd29
--color-multiplayeryellowsecondary:  #eba611
### Badge farver


"Professional"-badge:
  bg:     #f2f9ff   ← meget lys blå
  color:  #007be5   ← brand blå
  radius: 4px
  padding: 0px 6px
  font:   11px/500

# 2\. Typografi
### Font Families


--font-family-default:  "Inter", ui-sans-serif, system-ui, ...
--font-family-ui:       "Inter", sans-serif
--font-family-mono:     "Roboto Mono", "Monaco", "Courier New", monospace
--font-family-display:  "Whyte", ui-sans-serif, system-ui, ...
**Vigtig opdagelse:** Body-font er Satoshi (fra getComputedStyle(document.body)) — men CSS-tokens definerer Inter som standard. Det betyder at Figma **overskriver** font-familien gennem et stylesheet eller runtime, sandsynligvis med Satoshi som en nyere iteration. Satoshi er en **premium display/UI font** fra Fontshare — geometrisk sans-serif med humanistiske detaljer, meget populær i moderne produktdesign.
### Font-weight systemet


--font-weight-default: 450    ← Standard (ml. regular og medium)
--font-weight-strong:  550    ← Bold (headings, labels)
Samme mønster som Claude og Perplexity: bruger **variabel font med 450/550** frem for traditionelle 400/500/600/700.
### Type-skala (observeret live)


11px / 550 / 16px  ← Section headers, aktive tabs ("Recently viewed", "Starred")
11px / 450 / 16px  ← Inaktive tabs, filter labels ("Shared files", "All organizations")
11px / 400 / 16px  ← Default nav-items, kort-tekst
13px / 500 / 24px  ← Bruger-navn i sidebar header
13px / 400 / 22px  ← Sidebar-section overskrifter
### Token-systemets type-skala


display:       3rem / 400 / 3.5rem lh / -0.09rem tracking  
heading-large: 1.5rem / 550 / 2rem lh / -0.0255rem tracking
heading-medium: 0.9375rem (15px) / 550 / 1.5625rem lh / -0.00469rem
heading-small: 0.8125rem (13px) / 550 / 1.375rem lh / -0.002rem
body-large:    0.8125rem (13px) / 450 / 1.375rem lh / -0.002rem
body-medium:   0.6875rem (11px) / 450 / 1rem lh / +0.00344rem
body-small:    0.5625rem (9px)  / 450 / 0.875rem lh / +0.00281rem
body-small-strong: 0.5625rem (9px) / 500 / 0.875rem
UI-systemet bruger **pixel-præcise rem-størrelser** baseret på 16px base: 11px, 13px, 15px er de primære størrelser.
**Letter-spacing:** Headings har **negativ** tracking (-0.0255rem), body-medium/small har **positiv** tracking (+0.003rem). Det er karakteristisk for Figmas type-system — display-tekst komprimeres, brødtekst åbnes.

# 3\. Border Radius System
Token-systemet definerer kun 4 radii:


--radius-none:   0
--radius-small:  0.125rem = 2px    ← skarp kant
--radius-medium: 0.3125rem = 5px   ← standard (bruges overalt)
--radius-large:  0.8125rem = 13px  ← kort, modals, dropdowns
--radius-full:   9999px            ← cirkel/pill
Observeret i praksis:
* 4px — "Professional"-badge, bruger-dropdown
* 5px — **dominerende**: nav-items (active), tabs, knapper, icon-knapper, search input, alle interaktive elementer
* 8px — Search input (8px radius! Lidt afvigende fra tokenerne)
* 13px — **Fil-kort** (border-radius: 13px), Dropdown-menus, Create-menu popup
* 100% — Avatar-billeder
* 9999px — Fuldt runde knapper (Create-dropdown, quick-create buttons)

⠀5px og 13px er de to nøgle-radii i systemet.

# 4\. Elevation / Shadow System
Figma har et **nummereret elevation-system (100–500)**:


--elevation-100: 0 1px 3px 0 #00000026, 0 0 0.5px 0 #0000004d
  ← Mindste skygge, f.eks. hoverede elementer

--elevation-200: 0 1px 3px 0 #0000001a, 0 3px 8px 0 #0000001a, 0 0 0.5px 0 #0000002e
  ← Standard kort-skygge

--elevation-300: 0 1px 3px 0 #0000001a, 0 5px 12px 0 #00000021, 0 0 0.5px 0 #00000026
  ← Tooltips

--elevation-400: 0 2px 5px 0 #00000026, 0 10px 16px 0 #0000001f, 0 0 0.5px 0 #0000001f
  ← Menu panels

--elevation-500: 0 2px 5px 0 #00000026, 0 10px 24px 0 #0000002e, 0 0 0.5px 0 #00000014
  ← Modals/windows
**Nøgle-mønster:** Alle Figma-skygger er **tre-lagede**:
1. En lille, skarp nær-skygge (depth)
2. En diffus bred skygge (ambient/spread)
3. En 0.5px ultra-subtil outline-skygge (border definition)

⠀Dropdown-menu shadow observeret direkte:


rgba(0,0,0,0.15) 0px 2px 5px 0px,
rgba(0,0,0,0.12) 0px 10px 16px 0px,
rgba(0,0,0,0.12) 0px 0px 0.5px 0px
Det matcher elevation-400 mønsteret.

# 5\. Z-Index Layering System
Figma har et eksplicit og navngivet layering-system:


--z-index-canvas-base:         0
--z-index-canvas-pin:          2
--z-index-cursor-multiplayer:  3
--z-index-canvas-pin-active:   4
--z-index-cursor-multiplayer-emote: 5
--z-index-sidebar:             6
--z-index-toolbar-widgets:     8
--z-index-context-editing:     9
--z-index-window:              9
--z-index-nav:                 10
--z-index-visual-bell:         11
--z-index-assistant:           11
--z-index-modal:               12
--z-index-dropdown:            13
--z-index-tooltip:             13
--z-index-cursor-user-emote:   14
--z-index-cursor-user:         15
--z-index-scrub-cursor:        2147483647 ← Max int! Scrub cursor er altid øverst

# 6\. Komponent-analyse
### Sidebar Navigation


bredde: 241px (en statisk bredde – ikke hover-expand)
bg: #ffffff (ren hvid)
border-right: 1px solid #e6e6e6
**Sidebar-opbygning:**
* **Header** (88px høj): Bruger-avatar + navn + dropdown + notifikations-klokke
* **Global navigation**: Recents, Community (24/28px rows)
* **Sektion-header**: "Malte Ther..." med "Professional"-badge (13px/500)
* **Sub-navigation**: Drafts, All projects, Resources, Trash, Games, Admin (alle 11px/400)
* **Collapsible sektion**: "Starred" med arrow (11px/550), project items under

⠀**Active state:** bg: #e5f4ff (lys blå), border-radius: 5px, 28px høj, fuld bredde
**Divider:** 1px høj div, bg: #e6e6e6
**Nav-items:** 11px/400, transparent baggrund, 32px hitbox, tekst rgba(0,0,0,0.9), 5px radius
### Fil-kort (grid view)


bredde: ~475px (full-width i single-column mode)
thumbnail: #f5f5f5, radius 0px
card wrapper: border-radius 13px, border 1px solid #e6e6e6, overflow hidden
footer: bg #ffffff, padding 12px 16px, height 59px

footer tekst:
  Filnavn: 11px / 400 / rgba(0,0,0,0.9) 
  "Edited X ago": 11px / 400 / (mørkere grå)

hover state: outline 2px solid #0d99ff (brand blå) på card wrapper
**Vigtig detalje:** Der er INGEN box-shadow på kortene. Hover-signaler med en 2px **outline** frem for border-change eller shadow. Det er atypisk og meget responsivt (outline ændrer ikke layout).
### Primær knap ("Create")


bg: #0d99ff (brand blå)
color: #ffffff
height: 32px
border-radius: 5px
font: 11px / 400
padding: 4px (via flex)
Knappen er faktisk **todelt** – "Create" + chevron ▾ i samme knap-række (split button pattern via + Create og ▾ dropdown).
### Quick-create knapper (New Design file, New FigJam, osv.)


height: 32px
width: 88-94px
bg: #f5f5f5
border-radius: 9999px (fuldt rund)
icon-only med aria-label
### Tabs (Recently viewed / Shared files / Shared projects)


Aktiv:
  bg: #f5f5f5
  color: rgba(0,0,0,0.9)
  font-weight: 550
  height: 24px, padding 0px 8px
  radius: 5px

Inaktiv:
  bg: #ffffff (transparent)
  color: rgba(0,0,0,0.5)
  font-weight: 450
### Filter-dropdowns (All organizations, All files, Last viewed)


height: 24px
radius: 5px
bg: #ffffff
border: 1px solid #e6e6e6 (synlig i screenshot, men computed viser 0px – kan være via outline eller parent)
font: 11px / 450
padding: 0px 8px
color: rgba(0,0,0,0.9)
chevron ikon til højre
### Dropdown Menu (mørk popup)


bg: #1e1e1e (near-black)
color: rgba(0,0,0,0.9) – teksten er faktisk lys (CSS context er mørkt)
border-radius: 13px
padding: 8px 0px
box-shadow: elevation-400
font: 11px / 400
Menu-items i dark popup bruger #ffffff-tekst (ikke fanget i computed color pga. context).
### Search bar


height: 32px
width: 224px
bg: #f5f5f5
border-radius: 8px
border: ingen (ingen synlig border)
font: 11px / 400
placeholder-color: rgba(0,0,0,0.5)


