---
description: Safe ship workflow — audit → build → status review → commit → push
---

# /ship — Safe commit & push workflow

Run the complete ship workflow in order. Stop at any step that fails.

**Argument:** The commit message. If no message is provided, ask for one before starting.

## Steps

1. **Audit** — Run `npm run audit`. If ANY errors: stop, list them, do NOT continue.
2. **Build** — Run `npm run build`. If build fails: stop, show errors.
3. **Review status** — Run `git status` and show the user which files will be staged.
   Verify no secrets (.env, credentials.json, etc) are in the list. If anything looks
   unexpected, pause and ask before continuing.
4. **Stage + commit** — Run `git add <specific files shown in step 3>` (never blind `-A`),
   then `git commit -m "$ARGUMENTS"`. The Husky pre-commit hook will re-run audit as a safety net.
5. **Push** — Run `git push`.

## Rules

- NEVER skip the audit step.
- NEVER use `--no-verify` to bypass the pre-commit hook.
- NEVER stage with `git add -A` or `git add .` — name the files explicitly.
- If audit fails, list every error clearly and suggest the smallest fix.
- Commit message must follow conventional commits: `feat(ui):`, `fix(charts):`, `refactor(audit):`, `docs:`, `chore:`.
- If `$ARGUMENTS` is empty, ask the user for a message before doing anything.

## Usage

```
/ship feat(ui): add Accordion component
/ship fix(chart-test): rolling hover time in fullscreen
```
