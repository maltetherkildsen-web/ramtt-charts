# Tailwind CSS v4 Enforcer

You are working in a Tailwind CSS project. Every styling decision goes through Tailwind utility classes. No exceptions, no shortcuts, no "just this once" inline styles.

This matters because mixing styling approaches (inline CSS + Tailwind + custom CSS files) creates unmaintainable code that's nearly impossible to refactor. The whole point of Tailwind is a single, consistent system. The moment you break that contract, the codebase starts to rot.

## The Golden Rule

**All styling happens through Tailwind utility classes in `className` (JSX) or `class` (HTML) attributes.**

This means:

- No `style=` or `style={{}}` attributes — ever
- No standalone `.css` files for component styling
- No `<style>` tags or CSS-in-JS
- No CSS modules for things Tailwind can handle

If you catch yourself reaching for inline styles, stop and find the Tailwind class instead. Tailwind v4's dynamic values mean there is almost always a utility class available — you don't need to escape to raw CSS anymore.

## When Raw CSS Is Actually OK

There are a small number of legitimate exceptions. The key distinction: these go in your **global CSS entry point** (e.g., `globals.css`), not scattered across components.

1. **CSS custom properties / design tokens** — defined via `@theme` in your global CSS
2. **Base element resets** — e.g., setting a default font on `body` via `@layer base`
3. **Animations with `@keyframes`** — complex multi-step animations that can't be expressed as Tailwind utilities
4. **Third-party library overrides** — when you genuinely can't style a library component with classes alone (last resort)

Even for these cases, always check first whether Tailwind provides a utility. For example, Tailwind v4 has built-in animation utilities (`animate-spin`, `animate-pulse`, etc.) and you can define custom ones via `@theme`.

## Tailwind v4 Specifics

Tailwind v4 is a ground-up rewrite. The patterns are different from v3. Here's what matters:

### Setup (New Projects)

For a **Next.js** project:

```bash
npm install tailwindcss @tailwindcss/postcss
```

`postcss.config.mjs`:
```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

`app/globals.css`:
```css
@import "tailwindcss";
```

That's it. No `tailwind.config.js` needed. No `autoprefixer`. No `postcss-import`. Tailwind v4's CSS-first approach handles everything.

For **Vite-based React** projects, use `@tailwindcss/vite` instead of the PostCSS plugin — it's faster:

```bash
npm install tailwindcss @tailwindcss/vite
```

```js
// vite.config.js
import tailwindcss from "@tailwindcss/vite";

export default {
  plugins: [tailwindcss()],
};
```

### Prettier Plugin for Class Sorting (Required)

Every project must have the official Prettier plugin installed for automatic class sorting:

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

`.prettierrc`:
```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

This ensures classes follow Tailwind's recommended order automatically on save. No manual sorting, no debates, no inconsistency. The plugin works in VS Code, Cursor, Zed (built-in Prettier support), and CI/CD pipelines.

When setting up a new project or auditing an existing one, verify that `prettier-plugin-tailwindcss` is in `devDependencies`. If it is missing, install it.

### Configuration Lives in CSS Now

In v4, your design tokens live in CSS using the `@theme` directive — not in a JavaScript config file:

```css
@import "tailwindcss";

@theme {
  --color-brand: oklch(0.72 0.18 155);
  --color-brand-light: oklch(0.85 0.12 155);
  --font-display: "Cal Sans", sans-serif;
  --breakpoint-3xl: 1920px;
}
```

These become usable as `text-brand`, `bg-brand-light`, `font-display`, `3xl:something` automatically.

### Key v4 Patterns

- **Import**: `@import "tailwindcss"` — not `@tailwind base; @tailwind components; @tailwind utilities;`
- **Custom utilities**: use `@utility` directive, not `@layer utilities`
- **Custom variants**: use `@custom-variant`, not `addVariant()` in JS
- **Dynamic values**: `grid-cols-13`, `z-99`, `w-[437px]` all just work — no config extension needed
- **Colors**: OKLCH by default — more vibrant, more perceptually uniform
- **Container queries**: built-in, no plugin needed. Use `@container` and `@min-*`/`@max-*`
- **Default border color**: now `currentColor` (was gray in v3)
- **Default ring**: 1px `currentColor` (was 3px blue in v3)

### Things to Avoid (v3 Patterns That Are Wrong in v4)

- `@tailwind base; @tailwind components; @tailwind utilities;` → use `@import "tailwindcss"`
- `tailwind.config.js` for theme tokens → use `@theme` in CSS
- `@layer utilities { .my-util { ... } }` → use `@utility my-util { ... }`
- `@apply` for reusable styles → prefer extracting a component instead. `@apply` still works but leads to the same maintainability problems as writing raw CSS
- Adding `autoprefixer` to PostCSS → Tailwind v4 handles this via Lightning CSS
- `postcss-import` → not needed, Tailwind handles `@import` natively

## How to Style Common Patterns

When you're tempted to reach for inline styles, here's how to do it in Tailwind instead:

### Dynamic Values from Props/State

Bad:
```jsx
<div style={{ width: `${progress}%` }}>
```

Good — use arbitrary values or CSS custom properties:
```jsx
<div className="w-[var(--progress)]" style={{ '--progress': `${progress}%` }}>
```

Wait — that still uses `style`! Yes, but only for **setting a CSS variable**, not for styling. The actual styling (`w-[var(--progress)]`) is a Tailwind class. This is the one acceptable use of the `style` attribute: passing dynamic runtime values as CSS custom properties that Tailwind classes then consume.

For truly dynamic values that depend on JS state, this CSS-variable bridge is the recommended pattern. The alternative is generating class names dynamically, which works for a known set of values:

```jsx
// Good — when values are from a known set
const widthMap = {
  small: "w-32",
  medium: "w-64",
  large: "w-96",
};
<div className={widthMap[size]} />
```

### Conditional Styling

Use a utility like `clsx` or `cn` (from shadcn) to compose classes conditionally:

```jsx
import { clsx } from "clsx";

<button className={clsx(
  "rounded-lg px-4 py-2 font-medium",
  isActive ? "bg-brand text-white" : "bg-gray-100 text-gray-700",
  isDisabled && "opacity-50 cursor-not-allowed"
)} />
```

### Responsive Design

Tailwind's responsive prefixes handle everything — no media queries in CSS:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Hover, Focus, and Other States

All handled by Tailwind variants:

```jsx
<button className="bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 active:bg-blue-700">
```

### Animations

For simple animations, use Tailwind's built-in utilities:
```jsx
<div className="animate-spin" />
<div className="animate-pulse" />
<div className="transition-colors duration-200 ease-in-out" />
```

For custom animations, define them via `@theme` in your global CSS — not in component files:

```css
@theme {
  --animate-slide-in: slide-in 0.3s ease-out;
}

@keyframes slide-in {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
```

Then use as: `className="animate-slide-in"`

## Self-Check Before Outputting Code

Before you write or suggest any component, mentally verify:

1. Does any element have a `style` attribute? If yes — refactor to Tailwind classes (exception: CSS variable bridge for truly dynamic runtime values)
2. Am I creating a `.css` file? If yes — is it the global entry point (`globals.css`)? If not, stop. Move everything to Tailwind classes.
3. Am I using a `<style>` tag? If yes — stop. There is no good reason for this in a Tailwind project.
4. Am I using `@apply`? If yes — consider extracting a React component instead. `@apply` is a last resort, not a go-to pattern.
5. Am I using v3 patterns? Check: `@tailwind` directives, `tailwind.config.js` for tokens, `@layer utilities`, `autoprefixer` in PostCSS.
6. Am I generating dynamic class names with string interpolation? If yes — use the CSS variable bridge or a lookup map instead. Tailwind can't detect interpolated classes like `` `text-${color}-500` `` at build time.
7. Is `prettier-plugin-tailwindcss` installed in this project? If not — install it before proceeding.

## Working with shadcn/ui

shadcn/ui is the gold standard component library for Tailwind projects. It's not a dependency you install — it copies component source code into your project, built entirely on Tailwind classes and Radix UI primitives. This makes it a perfect fit for the Tailwind-only approach.

### The `cn()` Utility

shadcn projects include a `cn()` helper (usually in `lib/utils.ts`) that merges Tailwind classes intelligently using `tailwind-merge` + `clsx`. Always use `cn()` for conditional and merged classes in a shadcn project:

```jsx
import { cn } from "@/lib/utils";

<div className={cn(
  "rounded-lg border p-4",
  isError && "border-red-500 bg-red-50",
  className // allow parent overrides
)} />
```

### Customizing shadcn Components

When you need to customize a shadcn component, do it the Tailwind way:

**Good** — override via className props or edit the component's Tailwind classes directly:
```jsx
<Button className="bg-brand hover:bg-brand-light">Custom</Button>
```

**Good** — modify the source component in `components/ui/` (that's why shadcn copies it into your project):
```jsx
// components/ui/button.tsx — edit the variants directly
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ...",
  {
    variants: {
      variant: {
        brand: "bg-brand text-white hover:bg-brand-light",
      },
    },
  }
);
```

**Bad** — wrapping shadcn components with inline styles or CSS overrides:
```jsx
// Never do this
<div style={{ border: '2px solid red' }}>
  <Button>Styled</Button>
</div>
```

### shadcn Theming via CSS Variables

shadcn uses CSS variables for theming (defined in `globals.css`). These integrate with Tailwind v4's `@theme` directive:

```css
@import "tailwindcss";

@theme {
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.15 0 0);
  --color-primary: oklch(0.55 0.2 260);
  --color-primary-foreground: oklch(0.98 0 0);
  --color-muted: oklch(0.96 0 0);
  --color-muted-foreground: oklch(0.55 0 0);
  --color-border: oklch(0.9 0 0);
  --radius-lg: 0.5rem;
  --radius-md: calc(var(--radius-lg) - 2px);
  --radius-sm: calc(var(--radius-lg) - 4px);
}
```

Then your components use `bg-primary`, `text-foreground`, `rounded-lg` etc. — all Tailwind, all consistent, all themeable from one place.

## Component Organization

- **One component per file** with all styling inline via `className`
- **Extract components, not CSS** — if you're repeating a set of classes, make a component, not a CSS class
- **Use `clsx`/`cn` for conditional classes** — keeps things readable
- **Design tokens in `globals.css` via `@theme`** — single source of truth
- **No CSS modules, no styled-components, no emotion** — pick one system and that system is Tailwind
