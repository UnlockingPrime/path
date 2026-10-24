# My Path

My personal placement tracker: one goal, a daily note, my roadmap and my career options. It installs on a phone like an app and works offline.

**Live:** https://unlockingprime.github.io/path/

## What's inside

- **Goal** at the top, with day count, streak and days written.
- **Notes.** A blank note for today, plus every previous day since I started. Days I skipped show up greyed out.
- **Path.** My roadmap by phase (semester, endsem, Phase 1, Phase 2) plus my DSA method and daily rules. Everything is editable.
- **Careers.** Career options that fit me, with what each interview tests and my path for it. Everything is editable.
- **Backup.** Export to a JSON file and import it back.

Notes are saved in the browser on each device and are never uploaded. Laptop and phone don't sync, so use export/import to move notes between them.

## Install on a phone

- **Android (Chrome):** open the link and tap **Install** (or ⋮ → *Install app*).
- **iPhone (Safari):** open the link, tap **Share**, then **Add to Home Screen**.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole app (markup, styles, script) |
| `sw.js` | Service worker for offline use. Bump `VERSION` after changes |
| `manifest.json` | Install metadata and icons |
| `icons/` | App icons |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |
