# CLAUDE.md — Conference Guide Skeleton

This repo is a single-file, mobile-first conference companion for students or attendees. It was exported from the EMW 2026 guide and should be treated as a reusable skeleton: preserve the app behaviors, replace the event data and branding.

## Architecture

- `index.html` contains the complete app: HTML shell, CSS, JavaScript, and seed data.
- `sw.js` provides stale-while-revalidate offline support.
- `scripts/chrome-mobile-smoke.mjs` checks core phone-sized user flows through Chrome DevTools Protocol.
- There is no build step, package manager, backend, database, or framework.

## Data to Replace

In `index.html`, the main event data lives in:

- `SCHEDULE`: ordered schedule entries.
- `SPEAKERS`: searchable speaker records.
- `EVENT_DAY_KEY`: date used by NOW / Up Next badges.
- `EVENT_TIME_ZONE`: event timezone for live status formatting.

Suggested `SCHEDULE` shape:

```js
{
  id: "day-01",
  time: "9:00 AM",
  timeEnd: "9:30 AM",
  title: "Opening Remarks",
  type: "welcome",
  speaker: "Person Name · Person Two",
  location: "Main Ballroom",
  description: "Official or lightly edited session description.",
  studentSummary: "Plain-language explanation of why this matters.",
  research: {
    notes: ["Optional context for students."],
    links: [{ label: "Source", url: "https://example.com" }]
  },
  subItems: [
    { title: "Optional nested item", speaker: "Optional person" }
  ]
}
```

Suggested `SPEAKERS` shape:

```js
{
  name: "Full Name",
  role: "Title",
  company: "Organization",
  sessions: ["day-01"]
}
```

## Behaviors to Preserve

- Mobile-first, scrollable app with sticky tab navigation.
- Schedule accordions with student summaries, optional research notes, and inline session notes.
- Speaker tab with search, session chips, profile notes, and starred speakers.
- Notes tab with quick notes, linked notes, search, collapse/expand, export, and clear confirmation.
- `localStorage` persistence for all attendee notes and starred speakers.
- Offline app shell through `sw.js`.
- Minimum 44px touch targets and iOS 16px input font-size guard.

## Adaptation Checklist

1. Replace all metadata and visible EMW/Hawaiʻi-specific copy.
2. Replace `SCHEDULE` and `SPEAKERS` from the new conference source.
3. Update official links, venue, date labels, and footer attribution.
4. Update `EVENT_DAY_KEY` and `EVENT_TIME_ZONE`.
5. Rename `localStorage` keys so notes do not collide with the EMW app.
6. Remove `podcast.html` / `code-guide.html` references if those pages are not copied over.
7. Update `PRECACHE_URLS` and bump `CACHE_NAME` in `sw.js`.
8. Update the smoke test to target real session IDs in the new schedule.
9. Run local browser and mobile smoke checks.
10. Test once on a real iPhone before sharing with students.

## Service Worker Note

After editing any cached file, bump `CACHE_NAME` in `sw.js`. Returning visitors may otherwise see old HTML until the stale-while-revalidate cycle catches up.
