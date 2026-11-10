# Collection filters and pagination review

Local refinement only. No push, merge, or deployment.

## Implementation

- Preserved hero typography, themes, shared navigation/footer, authentic assets and all four destinations.
- Updated hero description and renamed the fixed shortcut strip to “Explore by project”.
- HaierMall remains featured only on All Work page 1. Subscribe a Car and UTWorX share the first two-column row; Barcode Studio starts the next row. Mobile uses one column.
- Standard cards carry category, concise context, role, one contextual highlight and a real case-study link.
- Central registry: `src/content/collection-projects.json`. Only records with `published: true` render. Order is explicit; the featured HaierMall is included in the four-project page limit.
- Category filtering happens before pagination, resets to page 1, and supports URL history. Filters have pressed states, visible focus and a live result count.
- Page routes are pre-rendered as `/case-studies/page/2.html`, etc., only when enough published projects exist. Each gets its own canonical and ItemList. Filtered URLs canonicalize to the collection root.
- Native page links remain available without JavaScript. Category filtering requires JavaScript, with a visible no-script explanation.

## Category mapping

| Project | Categories |
|---|---|
| HaierMall | E-commerce, UX Audits, Design Systems |
| Subscribe a Car | Mobile Apps, Design Systems |
| UTWorX | SaaS & Enterprise, UX Audits |
| Barcode Studio | Design Systems |

Websites & Landing Pages is omitted until a documented published project belongs there. The categories are classifications of existing evidence, not new project claims.

## Content preservation

HaierMall’s featured outcomes and attribution come from its approved content module. Subscribe a Car retains delivery-phase ownership, Sprint 4 entry and historical product-adoption context; no personal six-sprint duration is implied. UTWorX uses documented screen count and two-week delivery, explicitly separate from uncollected usability metrics. Barcode Studio has one role label and no unsupported duration or rating.

Approved individual pages, case-study styles and shared navigation/chapter components match the before-task SHA256 hashes (`review/collection-pagination/preservation.json`). Original HTML and assets remain intact.

## Verification and evidence

- Astro static build and diagnostics; Node regression suite.
- Actual Chrome browser review at 1440, 1024, 768, 390 and 320px in First Light and Juniper Dusk.
- Default/selected filters, keyboard activation and visible focus, URL reload/back/forward, theme persistence, grid alignment, overflow, image loading and canonical uniqueness.
- Automated axe WCAG A/AA checks. This is not manual screen-reader certification.
- Nine-project fixture: 4/4/1 static pages, no duplicates, filtering before pagination, category reset, direct page refresh, native no-JavaScript next-page links and pagination focus.
- Test projects live only under `tests/fixtures/collection`; the separate build is under `review/collection-fixture-build`. Production `dist/case-studies.html` is checked for fixture leakage. No extra pagination is shown for the four real projects.
- Actual screenshots and machine-readable results: `review/collection-pagination/`.

## Changed files for this refinement

- `src/pages/case-studies.astro`
- `src/pages/case-studies/page/[page].astro`
- `src/components/CollectionPage.astro`
- `src/components/CollectionBrowser.tsx`
- `src/content/collection.ts`
- `src/content/collection-projects.json`
- `src/content/collection-types.ts`
- `src/lib/collection-state.mjs`
- `src/styles/collection.css`
- `tests/collection.test.mjs`
- `tests/collection-state.test.mjs`
- `tests/fixtures/collection/projects.json`
- `tests/fixtures/collection/astro.config.mjs`
- `scripts/review-collection-pagination.mjs`
- `tsconfig.json` (exclude generated fixture bundles from source diagnostics)
- This review report and local review evidence.

## Remaining approval

Final visual approval. No known blocking implementation issues. Original project factual limitations remain documented; this collection does not resolve them by inference.

Final results: static build passed; Astro diagnostics 0 errors / 0 warnings / 0 hints; 31 tests passed. Browser QA passed all 10 viewport/theme combinations with measured CLS 0 and zero axe violations in tested default/filtered states. Nine-project fixture pagination passed. Production page 2 is absent, as expected for four projects. Local preview: http://127.0.0.1:4388/case-studies.html.
