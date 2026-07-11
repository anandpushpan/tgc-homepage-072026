# The Gateway Corp — Our History

An "Our History" website built on the **Ember Design System** (warm near-black + orange, Inter + IBM Plex Mono). Two versions of the milestone timeline are included; they share the same hero, statement, social-impact, footer, and design tokens.

| Page | Timeline style |
|------|----------------|
| `index.html` | **Classic** — vertical scroll timeline with cards |
| `history-radial.html` | **Radial** — scroll-driven orbiting dial (inspired by titanintake.com/product-solution) |

The two pages cross-link (nav "Classic Timeline" / footer "Radial Timeline").

## Folder structure

```
website/
├── index.html              # Version 1 — classic vertical timeline (entry point)
├── history-radial.html     # Version 2 — radial dial timeline
├── README.md               # This file
└── assets/
    ├── css/
    │   ├── style.css       # Shared Ember base (design tokens in :root)
    │   └── radial.css      # Radial-timeline-only styles
    ├── js/
    │   ├── main.js         # Shared: mobile nav, scroll reveal, timeline progress
    │   └── radial.js       # Radial dial: geometry + scroll-driven rotation
    ├── logo/
    │   ├── TGC-Logo-white.png   # Used on dark backgrounds (nav, footer)
    │   └── TGC-Logo-black.png   # Full lockup for light backgrounds / favicon
    └── images/             # (Reserved) drop section/hero photography here
```

### Notes on the radial version
- **Accent:** kept on-brand Ember **orange** rather than the reference's lime green. To switch to lime, change `--orange*` usages in `radial.css`.
- **Titles** use Fraunces (serif) to match the reference's editorial feel; the rest stays Inter/IBM Plex Mono.
- **Editing content:** each era is an `<article class="era">` in `history-radial.html` with `data-year` / `data-title` — edit text there; the dial labels and slab read from these automatically.
- On screens narrower than 900px it gracefully falls back to a simple stacked list.

## How to view

- **Simplest:** double-click `index.html` to open it in any browser.
- **Local server (recommended, so relative paths resolve identically to production):**
  ```bash
  # Node
  npx serve website
  # or Python 3
  python -m http.server 8000
  ```

## Fonts

Loaded from Google Fonts (`Inter`, `IBM Plex Mono`) via a `<link>` in `index.html`.
An internet connection is needed for the exact type; a clean system-font fallback is defined otherwise.
To self-host for a fully offline handover, download both families into `assets/fonts/` and swap the `<link>` for `@font-face` rules in `style.css`.

## Sections

1. **Hero** — intro to Gateway's history
2. **Statement + stats** — pull-quote and three key figures
3. **The Milestone Slabs** — scroll-driven timeline (1997 → 2025)
4. **Social Impact** — CSR pillars
5. **Closing + footer**

## Editing

- **Colours & type:** all tokens live in `:root` at the top of `assets/css/style.css`.
- **Content:** edit directly in `index.html`.
- **No em-dashes** are used in copy, per the Ember design system.

## Design system

See `../guide/DESIGN_THEME.md` for the full Ember specification.
