# CONNECT26 Mobile Page

Standalone mobile-first static page for the 2026 KS Ed Tech Conference.

This repo is intentionally small and is meant to be easy for another agent or merge harness to ingest. If this project is paired with another prototype, treat this repo as a self-contained reference implementation of the mobile experience and 2026 conference content.

## What It Does

The page presents a compact conference microsite for CONNECT26:

- Hero and event details
- Outbound registration links for KS Faculty & Staff and the general public
- 2025 highlight photos
- Learning strands
- Current 55-session catalog notice with a link to the official source
- Keynote and featured presenter summaries
- Keyboard-accessible schedule tabs
- Venue and parking details
- Mobile navigation and delayed sticky registration CTA

## Quick Start

Run:

```sh
npm run serve
```

Then open [http://127.0.0.1:4173/](http://127.0.0.1:4173/).

If `npm` is not available, this is equivalent:

```sh
python3 -m http.server 4173
```

## Tests

Run:

```sh
npm test
```

The test command performs a JavaScript syntax check and a no-dependency static smoke test covering the main content, registration CTAs, schedule tab accessibility, focus/motion safeguards, mobile/desktop CSS breakpoints, and local asset references.

## Project Map

- `index.html`
  Main page structure and all user-facing conference content.
- `styles.css`
  Entire visual system and responsive behavior.
- `script.js`
  Mobile menu, delayed sticky CTA, and schedule tab interactions.
- `scripts/static-smoke.mjs`
  No-dependency regression smoke test for the static page.
- `package.json`
  Convenience scripts for serving and testing.
- `assets/img/`
  Local copies of conference imagery and icons used by the page.
- `scrape-notes.md`
  Source content anchors and visual notes captured from the live 2026 site.
- `AGENT_HANDOFF.md`
  Merge-oriented notes for future agents.
- `scraped/`
  Raw scraped HTML plus QA screenshots used during build verification.

## Current Scope

This implementation is a static microsite, not a framework app.

It includes:

- Mobile-first landing experience
- Registration CTA section
- Learning strands section
- Keynote and featured presenter sections
- Tabbed schedule section
- Venue/location section

It does not include:

- CMS integration
- Dynamic data loading
- Build tooling
- Component framework abstractions
- Form handling beyond outbound registration links

## Static Deploy Notes

This project has no build step. Deploy the root files as static assets:

- `index.html`
- `styles.css`
- `script.js`
- `assets/img/**`

Any static host can serve it. Keep the relative asset paths intact unless your host rewrites them.

## Privacy, Storage, and Network Notes

- The root page does not store user data in cookies, `localStorage`, or a backend.
- The only JavaScript behaviors are local UI interactions.
- Registration buttons navigate to third-party Cvent registration URLs in a new tab.
- Google Fonts are loaded from `fonts.googleapis.com` / `fonts.gstatic.com`.
- All conference imagery used by the root page is local under `assets/img/`.

## Content Source

Primary source: [https://blogs.ksbe.edu/edtechconference/](https://blogs.ksbe.edu/edtechconference/)

The page content and visual cues were adapted from the live 2026 conference site on `2026-05-06`.

## Verification

The page has been checked locally for:

- Mobile layout at `390px` wide
- Tablet layout at `768px` wide
- Desktop layout at `1280px` wide
- No horizontal overflow
- Working mobile menu
- Working schedule tabs
- Sticky CTA hidden at top and visible later in scroll
- Keyboard access for the mobile menu and schedule tabs
- Reduced-motion behavior for smooth scrolling and transitions
- Root smoke tests with `npm test`

Reference screenshots:

- [mobile QA](/Users/justinlai/Coding/KSEDTECH-2026/scraped/qa-mobile-final.png)
- [desktop QA](/Users/justinlai/Coding/KSEDTECH-2026/scraped/qa-desktop-final.png)

## Known Limitations

- Root schedule entries are high-level blocks; the reusable app in `conference-skeleton-export/` now includes the 55-session catalog as untimed entries.
- Registration happens on external Cvent pages, so this static page cannot validate registration completion.
- The root microsite is not an offline app; the separate `conference-skeleton-export/` folder contains a more app-like offline skeleton.
- Content should be rechecked against the official conference site before production launch because dates, pricing, links, and speakers can change.
