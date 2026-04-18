# HUSKE.md — Malte's pilot checklist

Dette er DIN fil. Alt du skal huske for at systemet altid virker —
både her i Claude Code og i normal Claude Chat.

Dato: 18. april 2026

---

## HVER GANG du starter en ny session

### 1. Hvis du arbejder i Claude Code (denne terminal)
Intet du skal huske. Husky + audit + /ship kører automatisk.

### 2. Hvis du arbejder i normal Claude Chat (claude.ai)
**Første gang per projekt — gør alt dette ÉN gang:**

**A) Paste `CLAUDE-RULES-PASTE.md` ind i projektets INSTRUKTIONER** (ikke som fil).

**B) Upload disse 6 filer som Project Knowledge (filer):**
- `CLAUDE.md`
- `components/ui/RULES.md`
- `components/charts/primitives/RULES.md`
- `lib/ui.ts`
- `docs/REPO-OVERVIEW.md`
- `docs/FONT-RULES.md`

**Upload IKKE:**
- `HUSKE.md` (det er DIN fil)
- `scripts/audit.ts`, Husky-filer, .claude/ filer (kun relevant i Claude Code)

---

## SYNC — hold Claude Chat i sync med repoet

Når vi ændrer en af de 7 "upload"-filer her i repoet
(`CLAUDE-RULES-PASTE.md`, `CLAUDE.md`, begge `RULES.md`, `lib/ui.ts`,
`docs/REPO-OVERVIEW.md`, `docs/FONT-RULES.md`):

**Samme dag:** slet den gamle version i Claude Chat projektet og upload
den nye. `CLAUDE-RULES-PASTE.md` erstattes som instruks, de andre som
Project Knowledge.

Hvis Claude Code laver ændringer der påvirker en af de 6 filer, minder
jeg dig om sync-opgaven i sessions-opsummeringen.

---

## HVER GANG du beder om ny UI eller charts

Sig til Claude:

> "Før du rører kode: læs `docs/REPO-OVERVIEW.md`, `components/ui/RULES.md`,
> og `lib/ui.ts`. Bekræft hvad du vil bygge, og om det allerede findes."

Hvis Claude begynder at kode uden at have bekræftet det, **stop ham**.
Det er præcis sådan reglerne glipper.

---

## HVER GANG du vil committe/pushe

### I Claude Code
Sig bare:

> `/ship feat(ui): beskrivelse af ændring`

`/ship` kører i denne rækkefølge:
1. `npm run audit`
2. `npm run build`
3. `git status` (du ser præcis hvad der stages)
4. `git commit` (Husky kører audit igen som sikkerhedsnet)
5. `git push`

Enhver fejl stopper kæden. Du kan ikke committe med fejl.

### I normal Claude Chat
Bed Claude om at:
1. Køre `npm run audit` mentalt ved at liste hvad der kunne bryde reglerne
2. Give dig de præcise commit-kommandoer
3. Du kører dem selv lokalt — Husky stopper dig hvis noget er galt

---

## HVER GANG du tilføjer større features

Efter du har afsluttet en feature eller flere commits, sig:

> "opdater overblikket"

Claude regenererer `docs/REPO-OVERVIEW.md`. Det er inventaret — næste session
starter med det, så Claude ved præcis hvad der allerede findes.

---

## HVIS reglerne alligevel brydes

Eksempel: Claude laver en inline `function ScoreBadge()` i en page-fil.

1. `npm run audit` fanger det → Husky blokerer commit
2. Du siger: "Flyt ScoreBadge til components/ui/ og brug RatingInput i stedet"
3. Commit igen

Hvis et inline-komponent slipper gennem warnings (grandfathered), så sig:

> "Flyt denne inline-komponent til components/ui/ og fjern den fra
> grandfathered-listen i scripts/audit.ts"

---

## DEFAULT-SÆTNINGER du kan copy-paste til Claude

### Ved nyt komponent/page
```
Læs docs/REPO-OVERVIEW.md og components/ui/RULES.md først.
Bekræft hvad der allerede findes der matcher. Byg intet inline.
```

### Ved commit
```
/ship <type>(<scope>): <beskrivelse>
```

### Ved større feature-afslutning
```
opdater overblikket
```

### Når noget ser forkert ud
```
Kør npm run audit og vis mig output. Fix alle errors før vi går videre.
```

---

## HVAD findes hvor — hurtig reference

| Fil | Formål |
|-----|--------|
| `CLAUDE.md` | Stop-banner + regler for Claude Code |
| `CLAUDE-RULES-PASTE.md` | Paste-blok til normal Claude Chat |
| `components/ui/RULES.md` | UI-kontrakten (112 komponenter) |
| `components/charts/primitives/RULES.md` | Chart-kontrakten |
| `lib/ui.ts` | Alle design-konstanter |
| `scripts/audit.ts` | Unified audit — alt håndhæves her |
| `docs/REPO-OVERVIEW.md` | Inventar — 1441 linjer, fuldt repo-overblik |
| `.husky/pre-commit` | Blokerer commits der fejler audit |
| `.claude/commands/ship.md` | /ship workflow |
| `HUSKE.md` | Denne fil (din pilot checklist) |

---

## VARSLER der betyder reglerne glipper

🚨 Hvis du ser Claude skrive:
- `function <Noget>()` inde i `app/**/page.tsx`
- `border-[0.5px]`, `rounded-[12px]`, `text-[13px]` inline
- `font-medium`, `font-semibold`, `font-bold`
- Et hex-farve tal (`#...`) der ikke er zone- eller data-farve
- "Jeg bygger det hurtigt og flytter senere"

→ STOP og sig: "Læs RULES.md og brug `@ramtt/ui` + `lib/ui.ts` fra første linje."

---

## SYSTEMETS FIRE LAG — hvorfor det virker

1. **Husky pre-commit** — blokerer fysisk commit hvis audit fejler.
2. **`/ship` kommando** — én kommando kører hele kæden i rigtig rækkefølge.
3. **Rule Zero audit-check** — fanger inline-komponenter med hardcoded styling
   automatisk.
4. **CLAUDE-RULES-PASTE.md** — giver normal Claude samme kontrakt.

Lag 1 er muren. Lag 2 er rutinen. Lag 3 er radaren. Lag 4 er spejlet i det andet værktøj.

---

## HURTIG-TEST at systemet virker (kør én gang)

```bash
# Tilføj en fake violation
echo 'function FakeBadge() { return <div className="font-medium border-[0.5px]" /> }' >> app/chart-test/page.tsx
git add app/chart-test/page.tsx
git commit -m "test: should fail"
# Forventet: Husky blokerer commit med audit-fejl
git checkout -- app/chart-test/page.tsx
```

Kør testen. Hvis den blokerer → alt virker.
