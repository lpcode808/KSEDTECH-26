# Next Conference Starter Brief

Paste this into a new Codex conversation from inside the new project repo.

```text
We are adapting this conference guide skeleton for a new conference.

Goal:
- Keep the same mobile-first static app structure.
- Replace the EMW sample content with the new conference schedule, speakers, venue, links, and branding.
- Preserve notes, speaker stars, export, offline support, and phone-friendly UX.

Source material:
- Official conference URL:
- Schedule URL or PDF:
- Speaker page URL or PDF:
- Event date(s):
- Timezone:
- Venue:
- Audience:
- Any brand/style notes:

Please first inspect the repo and identify exactly where the EMW-specific content lives. Then scrape or extract the new conference content, build clean `SCHEDULE` and `SPEAKERS` arrays, and update `index.html`, `sw.js`, `CLAUDE.md`, and the smoke test as needed.

Before editing, call out any ambiguity in dates, times, speaker names, tracks, or locations. For student-facing summaries, write in clear plain language and keep factual descriptions separate from AI-written explanation.

After editing:
- Run a local static server.
- Check the app in a phone-sized viewport.
- Verify schedule accordions, speaker search, notes, export, and offline cache registration.
- Tell me what still needs human review before publishing.
```

## Extraction Notes

Ask Codex to keep a source trace while scraping:

- Official page/PDF URL.
- Extraction date.
- Any sessions with missing end times.
- Any speakers with missing titles or companies.
- Any inferred speaker-session relationships.
- Any content rewritten for students.

## Human Review List

Before publishing, manually verify:

- Session order and times.
- Timezone.
- Venue rooms.
- Speaker spelling, titles, and organizations.
- Whether all students should see every listed session.
- Any content that sounds like advice, endorsement, or biography.
- Offline behavior after the final `CACHE_NAME` bump.
