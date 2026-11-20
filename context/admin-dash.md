# Admin Dash
## Goal
Please create the admin screen. Simple click for now to take user to the page. The db will be implemented later. Please reference @/context/screenshots/admin-dash.png.

## Implementation
Branch: `feature/admin-dash`

### Files
| File | Purpose |
| --- | --- |
| `src/app/page.tsx` | Home page. "Go to admin dashboard" link to `/admin` (temporary entry point until login FR-1 / role routing FR-3). |
| `src/app/admin/page.tsx` | Admin dashboard route (`/admin`). Static Server Component, prerendered. |
| `src/app/admin/mock-data.ts` | All placeholder data (admin user, stats, week, schedule rows, attention items, check-in, schools). Single swap point for the DB later. |
| `src/app/admin/icons.tsx` | Inline SVG icons (no icon library added). |
| `src/app/globals.css` | Theme tokens (`brand`, `warn`, `danger`, `surface`, `line`, `muted`, …) with light values only (dark mode removed), exposed to Tailwind via `@theme inline`. |
| `src/app/layout.tsx` | Site title changed from the Create Next App default to "Crossing Guards". |

### Page sections (match the screenshot)
- **Top nav**: logo/brand, Schedule / Availability / Guards / Locations tabs, notifications button, admin avatar.
- **Header**: date, greeting, Export and Publish schedule buttons.
- **Stat cards**: Locations covered, Needs a guard, Guards available, Schedule status.
- **Weekly schedule**: table of location × Mon–Fri. Each cell is a `Cell` union: `assigned` (avatar + name), `open` (dashed "+ Assign" button), or `absence` (red pill). Scrolls horizontally on narrow screens.
- **Needs attention**: absence and unassigned-shift alerts.
- **Availability check-in**: response progress bar plus per-guard Posted/Waiting status.
- **Location coverage**: schools with crossing counts.
- **Schedule key**: Assigned / Open shift / Absence legend.

### Decisions & notes
- No database: everything reads from `mock-data.ts`. Stat card numbers are hard-coded to match the screenshot, so they don't come from the schedule rows (e.g. 46/50 vs. 5 rows shown).
- Buttons and links (Assign, Publish, Export, nav tabs, week arrows, "View all …") are visual only, with no handlers or real routes yet.
- Brand name "Crossing Crew" is taken from the screenshot.
- Accessibility (NFR-8): semantic `<table>` with row/column headers, `aria-label` on icon-only buttons, `aria-current` on the active tab, `role="progressbar"` on the check-in bar, and decorative icons hidden from screen readers.
- Mobile (NFR-1): stat cards and panels stack on small screens; the nav tabs hide below `md`.
- Light theme only: the user said dark mode isn't needed, so there's no `prefers-color-scheme: dark` override and `color-scheme: light` is set on `:root`.
- Verified with `eslint` and `next build` (all routes static). Not yet checked visually in a browser.

### Next steps
- Replace `mock-data.ts` with DB/API queries once the schema exists.
- Wire up Assign (FR-12, with FR-13 warnings), Publish (FR-15), Export (FR-19), and week navigation.
- Protect `/admin` behind admin-role auth (FR-3).