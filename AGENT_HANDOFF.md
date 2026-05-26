# Agent Handoff

This document is for any future agent, merge harness, or teammate combining this project with another codebase.

## 2026-05-06 Skeleton Conversion First Pass

The reusable app in [conference-skeleton-export/index.html](/Users/justinlai/Coding/KSEDTECH-2026/conference-skeleton-export/index.html) has been converted from the EMW sample toward CONNECT26.

What changed:

- Replaced EMW page metadata, header, footer, QR target, note export title, localStorage keys, and cache name with CONNECT26 / KS Ed Tech Conference equivalents.
- Removed the visible podcast banner and image-dependent conference framing for now.
- Rethemed the app tokens toward the CONNECT26 source palette: deep KS blues, aqua, pink, and warm yellow accents.
- Replaced the EMW single-day `SCHEDULE` with the currently scraped CONNECT26 blocks:
  `June 1` pre-conference, `June 2` Day 1, and `June 3` Day 2.
- Added date/day metadata to each session card because the skeleton originally assumed one day.
- Replaced EMW speaker data with the featured CONNECT26 presenter roster available in the current scrape.
- Kept speaker-to-session mapping intentionally conservative:
  keynotes and pre-conference huakaʻi are mapped directly; most featured presenters are mapped to generic breakout blocks until the missing sessions source is captured.
- Cleared the old EMW `SESSION_RESEARCH` payload rather than inventing research links.
- Updated [conference-skeleton-export/sw.js](/Users/justinlai/Coding/KSEDTECH-2026/conference-skeleton-export/sw.js) so offline precache no longer depends on `podcast.html` or `code-guide.html`.

Important reasoning:

- Lean toward the skeleton because it already has the valuable app behaviors: mobile-first schedule accordion, speaker search/star, linked notes, export, QR sharing, and offline support.
- Preserve the root static/mobile scrape because it is a clean, update-friendly donor when the official WordPress pages change.
- Do not overfit the presenter page to exact breakout slots yet. The local source does not include `connect26-sessions`, and assigning presenters to specific blocks would be guesswork.
- Images are intentionally not part of this pass, even though local assets exist in [assets/img](/Users/justinlai/Coding/KSEDTECH-2026/assets/img).

Known gaps for the next agent:

- Scrape or otherwise obtain `connect26-sponsors` and `connect26-registration`.
- Room and breakout-block assignments are still not present in the captured sessions table, so keep the generic timed `Breakout Session 1-7` blocks until an official schedule/room source appears.
- Decide whether to keep the skeleton's `Student Summary` label or rename it for educator attendees.
- Update smoke tests in [conference-skeleton-export/scripts/chrome-mobile-smoke.mjs](/Users/justinlai/Coding/KSEDTECH-2026/conference-skeleton-export/scripts/chrome-mobile-smoke.mjs) to use CONNECT26 ids.
- Run a real mobile browser pass after the data is richer.

## 2026-05-25 Sessions Catalog Update

The official sessions page now contains a TablePress catalog with 55 session rows. The local capture lives at [scraped/sessions.html](/Users/justinlai/Coding/KSEDTECH-2026/scraped/sessions.html), and the structured extract lives at [scraped/sessions.json](/Users/justinlai/Coding/KSEDTECH-2026/scraped/sessions.json).

What changed:

- Added [scripts/extract-sessions.mjs](/Users/justinlai/Coding/KSEDTECH-2026/scripts/extract-sessions.mjs) to reproduce the JSON extract from the WordPress table.
- Added [scripts/update-session-data.mjs](/Users/justinlai/Coding/KSEDTECH-2026/scripts/update-session-data.mjs) to regenerate the app schedule/speaker data from the session JSON.
- Updated [conference-skeleton-export/index.html](/Users/justinlai/Coding/KSEDTECH-2026/conference-skeleton-export/index.html) with 55 untimed catalog entries after the official timed schedule blocks.
- Updated the root landing page with a 55-session notice and official session-list link.

Important boundary:

- The sessions page lists presenter, strand, title, and description. It does not provide exact times or rooms, so all catalog entries in the app use `TBD` time and `Breakout rooms TBD`.

## What This Repo Is

This repo is a standalone static implementation of a mobile-friendly `CONNECT26` conference page.

It is optimized for:

- Fast local serving
- Clear source-of-truth content
- Easy extraction into another app
- Low merge complexity

## Core Files

- [index.html](/Users/justinlai/Coding/KSEDTECH-2026/index.html)
  The full content structure lives here.
- [styles.css](/Users/justinlai/Coding/KSEDTECH-2026/styles.css)
  All layout, palette, and responsive decisions live here.
- [script.js](/Users/justinlai/Coding/KSEDTECH-2026/script.js)
  Only three behaviors exist:
  mobile nav toggle, sticky CTA visibility, schedule tabs.

## Merge Guidance

If merging into a larger app:

1. Extract content sections from `index.html` in this order:
   `header`, `hero`, `event-strip`, `highlights`, `registration`, `strands`, `presenters`, `schedule`, `location`, `footer`.
2. Port CSS tokens from the `:root` block in [styles.css](/Users/justinlai/Coding/KSEDTECH-2026/styles.css).
3. Preserve these behavioral rules from [script.js](/Users/justinlai/Coding/KSEDTECH-2026/script.js):
   mobile nav uses `aria-expanded`, sticky CTA appears after scroll, schedule tabs toggle `hidden`.
4. Keep asset paths or migrate them into the destination app's asset pipeline.

## Assumptions Baked In

- This is a curated mobile adaptation, not a literal 1:1 clone of the source WordPress site.
- Content was compressed for a cleaner small-screen experience.
- Learning strand descriptions are short editorial summaries inspired by the source conference themes.
- Registration links are direct outbound `cvent.me` links from the source site.
- Presenter coverage is selective rather than exhaustive in the visible card strip.

## Safe To Change

- Layout system
- Section ordering
- Typography implementation
- Asset packaging
- Framework conversion
- Componentization

## Should Stay Stable Unless Reconfirmed

- Conference title
- Dates
- Venue
- Registration pricing and discount language
- Registration destination links
- Named keynote presenters

These came from the 2026 live site scrape and should be rechecked if the project is revived later.

## Source Material

- Live source notes: [scrape-notes.md](/Users/justinlai/Coding/KSEDTECH-2026/scrape-notes.md)
- Raw source pages:
  - [home](/Users/justinlai/Coding/KSEDTECH-2026/scraped/home.html)
  - [learning](/Users/justinlai/Coding/KSEDTECH-2026/scraped/learning.html)
  - [presenters](/Users/justinlai/Coding/KSEDTECH-2026/scraped/presenters.html)
  - [schedule](/Users/justinlai/Coding/KSEDTECH-2026/scraped/schedule.html)

## Verification Artifacts

- [mobile QA](/Users/justinlai/Coding/KSEDTECH-2026/scraped/qa-mobile-final.png)
- [desktop QA](/Users/justinlai/Coding/KSEDTECH-2026/scraped/qa-desktop-final.png)

## Recommended Next Step For A Merge Agent

Treat this repo as a content and responsive-design donor.

If the destination project already has a framework:

- migrate `index.html` into components,
- import the root color tokens first,
- port only the three interactive behaviors from `script.js`,
- then reconcile spacing and typography with the destination design system.
