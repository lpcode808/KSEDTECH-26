# Conference Guide Skeleton Export

This folder is a portable starter kit copied from the EMW 2026 student conference guide. It is meant to be copied into a fresh project repo for another conference, then customized in a new Codex conversation.

## What to Copy

Copy this whole folder into the new repo, then rename it or move its contents to the repo root.

| File | Purpose |
|---|---|
| `index.html` | The working mobile-first conference app. It still contains EMW sample content, but the app structure, styling, notes model, speaker search, stars, export flow, and offline registration are ready to reuse. |
| `code-guide.html` | Optional learner-facing walkthrough page. Keep it if students will inspect how the app works; otherwise remove it and its links. |
| `podcast.html` | Optional transcript/companion page from the EMW version. Keep only if the next event needs a similar page. |
| `sw.js` | Offline service worker. Update the cache list and bump `CACHE_NAME` whenever cached files change. |
| `favicon.svg` | Placeholder conference favicon. Replace when the new event has brand assets. |
| `scripts/chrome-mobile-smoke.mjs` | Headless mobile smoke test for the core student flows. |
| `docs/NEXT_CONFERENCE_BRIEF.md` | Starter prompt and checklist for the next Codex conversation. |
| `CLAUDE.md` | Agent-facing architecture notes for the new repo. |

## First Pass in the New Repo

1. Open the new project folder in Codex.
2. Paste the prompt from `docs/NEXT_CONFERENCE_BRIEF.md`.
3. Give Codex the official conference URL, PDF, schedule page, or copied source material.
4. Ask it to replace the EMW sample data with the new event data.
5. Spot-check names, times, locations, speaker titles, and student summaries before sharing.

## Main Things to Replace

In `index.html`:

- Page title, meta description, Open Graph/Twitter tags, and official site link.
- Header text: conference name, date, venue.
- `SCHEDULE` array.
- `SPEAKERS` array.
- `EVENT_DAY_KEY` and `EVENT_TIME_ZONE` for the NOW / Up Next badges.
- `localStorage` keys if you want the new app to be totally separate from EMW on the same device.
- Footer attribution, school links, podcast/banner links, and code-guide links if not needed.

In `sw.js`:

- `CACHE_NAME`, whenever cached files change.
- `PRECACHE_URLS`, if the new repo does not include `podcast.html` or `code-guide.html`.

In `scripts/chrome-mobile-smoke.mjs`:

- Session IDs used by the assertions after the new `SCHEDULE` is loaded.
- Any feature assertions that no longer apply.

## Local Test

```bash
python3 -m http.server 8765
```

Then open:

```text
http://127.0.0.1:8765/index.html
```

For the smoke test, launch Chrome with remote debugging, then run:

```bash
node scripts/chrome-mobile-smoke.mjs
```

## Keep From Original

The pieces worth preserving are the single-file static architecture, mobile-first accordion schedule, searchable/starrable speaker list, typed notes saved in `localStorage`, plain-text/Markdown export, offline service worker, and the final real-device iPhone check before students use it.
