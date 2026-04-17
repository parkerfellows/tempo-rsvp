# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (HMR)
npm run build     # TypeScript check + production build → dist/
npm run preview   # Preview the production build locally
npm run lint      # ESLint
```

## Project

Landing page for the **Tempo** Chrome extension — a distraction-free reader and RSVP speed reading tool. Single-page React app with no router.

## Stack

- **Vite 5** (pinned to 5.x — Node 20.18 is below the 20.19+ requirement for Vite 6/rolldown)
- **React 19 + TypeScript**
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin — imported as `@import "tailwindcss"` in `index.css`, no `tailwind.config.js` needed
- Custom brand tokens defined in `src/index.css` under `@theme`

## Architecture

Everything lives in `src/App.tsx` — one file with all page sections as named functions:

- `Nav` — sticky header with download CTA
- `Hero` — headline + `RSVPDemo` (interactive animated demo using `useEffect`/`useState`)
- `HowItWorks` — 3-step explainer
- `Science` — cards covering the cognitive science behind RSVP (ORP, saccades, etc.)
- `Features` — feature grid with inline SVG icons
- `CTA` — bottom call-to-action
- `Footer`

The Chrome Web Store URL lives in the `CHROME_STORE_URL` constant at the top of `App.tsx` — set it to `#` until the extension is published.

## Branding

Matches tempo-reader: cyan (`cyan-500`) + violet (`violet-600`) gradient on primary actions, stone neutrals throughout, full dark mode via `dark:` classes.
