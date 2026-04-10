Perplexity UI – Dybdegående Analyse til ramtt-ui
Her er alt hvad vi har kunnet udlede fra koden, designsystemet og de visuelle mønstre på tværs af alle sider.

# 1\. Farve-system & Design Tokens
Perplexity bruger **oklch-farvemodellen** kombineret med **semantiske tokens** og et fuldstændigt custom design system.
### Baggrunds-lag (Elevation system)
Der er et tydeligt hierarki af overfladelag:


--bg-base:     #faf8f5   ← Varm off-white. Hele sidens grundflade
--bg-raised:   #fdfbfa   ← Lidt lysere – bruges til kort og panel-overflader
--bg-subtle:   #271a0009 ← Næsten transparent mørk toning – hover-states
--bg-soft:     #271a0012 ← Lidt mørkere end subtle – aktive states
--bg-inverse:  #27251e   ← Mørk charcoal – inverterede komponenter
--bg-backdrop: #d8d4cdb3 ← Halvtransparent sand – modal-backdrop
Den varm off-white (#faf8f5) er kendetegnende. Det er ikke hvid, det er en meget lys varm sand/crème. **Det giver en blød, trykt-side-fornemmelse** – som en avis eller et godt designet produktblad.
### Brand/Accent farve
Primær accent er en dyb teal:


--accent-bg-strong:   #016a71  ← Hoved-teal
--accent-fg-primary:  #016a71
--accent-bg-soft:     #016a7117
--accent-bg-subtle:   #016a710e
--accent-border-strong: #016a71
Hover/active states på solid knapper bruger mørkere teal: #0c4f54 og #0f3639.
### Semantisk farvesystem


Positive (grøn):    --positive-bg-strong: #016b1d, --positive-border-strong: #016b1d
Negative (rød):     --negative-bg-strong: #a23544, --negative-fg-primary: #a23544
Warning (orange):   --warning-bg-strong:  #97431a, --warning-fg-primary: #97431a
Caution:            oklch 49.18% .143 16.18 (amber)
### Foreground tokens


--foreground-color:         oklch(26.42% .013 93.9)   ← Mørk charcoal (næsten sort, men varmt)
--foreground-quiet-color:   oklch(26.42% .013 93.9 / 0.65) ← 65% opacity – sekundær tekst
--foreground-subtle-color:  oklch(26.42% .013 93.9 / 0.14) ← 14% – ekstra dæmpet
--foreground-subtlest-color: oklch(26.42% .013 93.9 / 0.07) ← 7% – næsten usynlig
Det er **en enkelt charcoal-farve brugt i fire opacitetsniveauer** frem for fire separate farver. Smart og kohærent.
### Border tokens


--border-medium:  #271a0024  ← Meget lys (ca. 14% opacity)
--border-heavy:   #27251e    ← Solid mørkebrun/charcoal
--border-inverse: #fdfbfa    ← Hvid til mørke baggrunde

# 2\. Typografi
### Font Family
Perplexity bruger **sin egen font** kaldet pplxSans som primær skrifttype:


font-family: pplxSans, ui-sans-serif, system-ui, -apple-system, ...
Det er en custom sans-serif der er meget lig Inter eller Geist, men med karakteristisk let kontrast. Fallback-stacken er standard web-safe.
### Font Weight System
Interessant nok **komprimerer de font-weights** til kun 3 kategorier:


--font-thin / light / normal / extralight: 400
--font-semimedium / medium / semibold:     500
--font-bold / extrabold / black:           550
De bruger aldrig 600, 700 eller 900. Det er en subtil men vigtig observation – alt ser konsekvent "lettere" og mere raffineret ud.
### Type skala (observeret fra DOM)


12px / 500 / 24px lh  ← Filter labels, metadata, badges
14px / 400 / 20px lh  ← Sekundær brødtekst, preview-tekst
16px / 500 / 24px lh  ← Primær brødtekst, nav-items, korttitler

# 3\. Spacing & Layout
### Global layout


--page-horizontal-padding: 16px
--sidebar-default-width:   56px   (kollapset)
--sidebar-pinned-width:    200px  (ekspanderet) 
--sidebar-width:           220px  (inkl. border)
--thread-width:            1100px (maks indholdsbredde)
--thread-content-width:    720px  (tekst-zone inden i thread)
### Input/Thread area


--thread-input-height-with-padding:       130px
--thread-attachments-height-with-padding: 182px
### Toast positioning


--toast-v-margin: 60px
--toast-h-margin: 24px
### Layout pattern: To-kolonne
Sidelinjen er 200px bred (ekspanderet). Indholdsarealet fylder resten. Der er ingen rigid grid – det er flex-baseret. Sidebar er fixed inset-y-0 og indholdet bruger flex-1.

# 4\. Border Radius System
Fra live element-inspektion:


4px   ← Lille komponenter: dropdown-items, tabel-rækker
6px   ← Standard small buttons (filter chips, Select, Sort)
8px   ← Medium buttons
9999px ← Fuldt runde: "Upgrade plan"-knap, pill-shapes, icon-knapper
12px  ← Primær card/input container (f.eks. "Stop Claude"-knap)
xl (ca. 12px) ← Sidebar-hover states (after::pseudo-element)

# 5\. Animation & Easing
Perplexity har et gennemtænkt sæt custom bezier-kurver:


--ease-in-out-quart: cubic-bezier(.76, 0, .24, 1)   ← Hurtig ind og ud
--ease-out-quint:    cubic-bezier(.22, 1, .36, 1)   ← Blød landing (mest brugt til slide-in)
--ease-in-cubic:     cubic-bezier(.32, 0, .67, 0)   ← Sharp enter
--ease-in-out-cubic: cubic-bezier(.65, 0, .35, 1)   ← Standard smooth
--ease-in-out-sine:  cubic-bezier(.37, 0, .63, 1)   ← Blød, næsten lineær
--ease-out-soft:     cubic-bezier(.36, 1.3, .64, 1) ← Spring/overshoot! (micro-animations)
--ease-out-cubic:    cubic-bezier(.33, 1, .68, 1)   ← Standard exit
### ease-out-soft med 1.3 overshoot er meget bemærkelsesværdig – den giver en lille "pop" der føles levende og responsiv.

# 6\. Komponent-analyse
### Sidebar Navigation
* Bredde 200px (udvidet), 56px (kollapset)
* Baggrund: oklch(0.2282 0.047 83.09 / 0.035) – næsten transparent, meget subtil
* Nav-items: fuld bredde, 40px høje, 0px padding top/bottom (men 4px via klasse)
* **Active state mekanisme**: Bruger et after: pseudo-element med bg-subtle + opacity-100. Selve linket har **ingen baggrund** – det er pseudo-elementet der laver highlight. Meget smart og undgår layout-shift.
* Icons: Custom SVG sprite-system (#pplx-icon-sprites)
* Keyboard shortcuts vises inline med dæmpet tekst

⠀Søge-input (Hovedelementet)
* Stor, centreret boks med rundet hjørner (~12px)
* Placeholder: "Ask anything..." i dæmpet grå
* Indeholder inline verktøjslinje: + (attachment), Computer (agent-mode chip), Model dropdown, mikrofon-ikon, submit-knap
* Submit-knappen er **sort cirkel** med hvidt ikon – markant kontrast
* Computer-tilstand vist som en **dashed outline pill** – signalerer "tilvalgt men valgfri"

⠀Chip/Filter Buttons (Library-siden)
* 24px høje
* border-radius: 6px
* 1px solid border med oklch(0.2642 0.013 93.9 / 0.14) (meget lys)
* Padding: 0px 8px
* Font: 12px / 500 weight
* Baggrund transparent (hover tilstand ikke mulig at insicere direkte)

⠀"Upgrade plan"-knap (Bottom of sidebar)
* border-radius: 9999px (fully round)
* 1px border, transparent baggrund
* 24px høj, lille og diskret

⠀Primær CTA-knap (eksempel: "Request access")
* border-radius: ~12px (fra modal)
* Baggrund #27251e (mørk charcoal)
* Hvid tekst
* Full width i modal-kontekst
* Sekundær knap: Samme radius, lys/transparent baggrund

⠀Sekundær/ghost knap
Eksempel "Back to Perplexity":
* Lys grå baggrund (#271a0009 til #271a0012)
* Samme rounding som primær

⠀Source Pills (Finance / Search)
* Overlappende favicon-ikoner i cirkel (20-24px)
* "X sources" tekst i samme pill
* Outline-stil med lys border
* border-radius: 9999px

⠀Finance-kort (Stock market cards)
* Hvid/raised baggrund (#fdfbfa)
* Subtil border
* Spark-line chart integreret i kortet
* Grøn linje for positiv, rød for negativ trend
* Stor pris + grøn/rød procenttekst

⠀Modal Dialog
* Centreret med backdrop
* Hvid rundet boks (radius ca. 16px)
* Logo i toppen
* Store rounded knapper, full-width layout
* Blur på baggrunden

⠀Breadcrumb / Kontekst-header (Finance)
* Perplexity Finance › TATACHEM.BO
* Lille › chevron separator
* Kombineret med søgefelt og Share-knap i top toolbar

⠀
# 7\. Sidelayout Patterns
### Startside (Search)
Minimalistisk. Centreret logo i klat sans-serif (lowercase perplexity). Én stor søge-boks. Ingen distraktion. Kontrast til den fyldige Finance-side er markant – **kontekst-drevet UI tæthed**.
### Finance Oversigt
To-kolonne layout: Hoved-content (venstre, ~70%) + Info-sidebar (højre, ~30%). Stokke-detaljer, data-grid, sparkline-charts, source-pills, key-issues accordion, earnings history chart.
### Discover
Editorial card layout. Featured story: stor titel + billede (landscape split). Under det: 3-kolonne grid med thumbnail-cards. **"Sources" med overlappende favicon-cirkler** som visuel signatur.
### Library/History
Toolbar med filtrer-chips øverst. Thread-liste med titel (16px/500), preview-tekst (14px/400/65% opacity), timestamp (12px/quiet). Meget kompakt og skannerbar.
### Spaces
Tile-grid med emoji som "ikon" i cirkulær grå badge. Kortene er kvadratiske med rounded corners og minimal tekst.

# 8\. Designprincipper (udledt)
**Varm neutralitet**: Hele paletten er forankret i varme brune/beige toner (#faf8f5, #271a00-familien) frem for kolde grå. Det skaber en human, papiragtig tone.
**Opacity-baseret hierarki**: Frem for mange farver bruges ét mørkt token i fire opacitetsniveauer (100%, 65%, 14%, 7%). Det giver automatisk konsistens.
**Elevation uden skygger**: Overflader løftes ved hjælp af en lys baggrundsfarveskift (base → raised) frem for tunge box-shadows. Shadows eksisterer, men er meget diskrete.
**Custom easing**: Den specielt designede easing-bibliotek (inkl. ease-out-soft med spring) giver en levende, ikke-standard fornemmelse.
**Komponent-komposition frem for komplekse komponenter**: Søgeboksen, Finance-input-baren og thread-input er alle komponenter bygget af enkle primitive elementer (icon, pill, dropdown, button) arrangeret i en container.
**Konsekvent 12px baseline**: Metadata, timestamps, labels og filter-chips er konsekvent 12px/500. Primær brødtekst er 16px/400. Der er ikke mange mellemliggende størrelser.
**Ingen markante skygger i navigation**: Sidebaren bruger pseudo-element highlights og opacity-baggrunde til hover/active states – absolut ingen box-shadows i navigationen.

# 9\. Hvad ramtt-ui kan låne
Her er de mest transferable mønstre til jeres system:
Det **varm off-white farvepalette** (#faf8f5 som base, #fdfbfa som raised) giver en meget professionel men blød tone. Den **oklch-baserede opacity-stak** for foreground (100% / 65% / 14% / 7%) er elegant og nem at implementere. Det **pseudo-element hover-system** til sidebar-navigation undgår layout-issues. Font-weight-komprimering til kun 400 / 500 / 550 holder UI'et luftigt. Easing-biblioteket med cubic-bezier(.36, 1.3, .64, 1) til spring-animationer er et lille men effektivt trick. Og den **elevation-model** baseret på baggrundsfarveskift frem for skygger er moderne og elegant.
