# All Case Studies — local refinement review

6 November 2026. Awaiting owner visual approval. No push, merge or deployment.

## Implementation plan and scope
Preserve the existing four-project collection, featured HaierMall block, project-row structure, established route and destinations. Refine hierarchy, naming, scanning, imagery presentation and factual context. Replace seven category filters plus All Projects with four native project jump links; every project stays visible with or without JavaScript. Use existing shared navigation/theme controls and design tokens. Individual case studies remain untouched.

Implementation imports the immutable original collection HTML and refines its existing featured-card and project-row blocks. Astro owns the same /case-studies.html output route; original HTML remains preserved and hash-checked, as with earlier case-study migrations. This is not a new inventory or homepage-style project showcase.

## Source reconciliation
| Existing collection claim | Relevant source | Local correction |
|---|---|---|
| UTWorX: 7 core workflows overhauled | Original index.html lines 524 and 551 explicitly document seven operational/core workflows. Approved UTWorX page retains this as delivery scope and records zero functionality changes. | Retain seven workflows as scope; remove “overhauled” and any implied measured efficiency gain. Show 16 screens, 3 roles and two-week delivery separately from usability goals. |
| Subscribe: Sprint delivered / 6 Months | Approved Subscribe page: UI Designer — Delivery Phase; joined Sprint 4; published project delivery period six sprints. No six-month duration substantiated there. | Label six sprints as reported project delivery, alongside Sprint 4 joining. Remove six-month duration. Do not equate sprints to months or imply six personal sprints. |
| Subscribe: 100K+ downloads | Approved case study calls this a published product milestone, not an individually attributable result. | Retain with historical product context. Show 50+ components as separate system scope. |
| 4.8★ App Store marquee | No supporting project source found for that claim. Approved Subscribe snapshot is 3.9★ with 217+ Google Play reviews. | Remove unsupported marquee claim; do not substitute a historical rating as a current rating. |
| Barcode: Role: Role: UI/UX Designer — End-to-End | Barcode source hero identifies End-to-End UX, Design + Handoff. | One Role label: End-to-end UX · Design + handoff. |
| Barcode: 1 Weeks | Duration appears in the collection but is not substantiated in the individual project source. | Omit rather than merely correct grammar to “1 week” and imply independent verification. Confirmation remains optional before restoring a duration. |
| HaierMall: 12 Weeks | Not substantiated in the approved individual case-study baseline. | Omit duration pending confirmation. This omission does not assert the old value is false. |
| HaierMall results lack definitions | src/content/haiermall.ts: +31% online sales, 3 months post-launch; −20% bounce, Homepage → category; +40% faster discovery, usability testing. | Preserve these three existing collection results with definitions and PM/development attribution. Full four-result baseline remains untouched in the case study. |
| Barcode speed and live release | Original source frames outcomes against design assumptions and lists Chrome extension V1.2.2. | Retain documented local processing, six design decisions and published release context; do not feature under-30-seconds as a measured usability result. |

## Visual changes
- Retain HaierMall as the larger featured block.
- Subscribe a Car and UTWorX use identical secondary-row sizing and type hierarchy, with project name, concise design focus, context, evidence and role.
- Barcode remains an additional case study, with original export imagery.
- All original collection images retained: Haier homepage; UTWorX Overview; Subscribe Select Return; Barcode Export Dark. Derived WebP copies are never enlarged; the narrow Subscribe screenshot keeps its native resolution.
- Remove artificial browser chrome, unsupported marquee claims and inactive category filtering. No fake product imagery, new dependencies or generic three-column grid.
- Fix a collection/homepage class-name collision found in browser review; scoped collection-summary now avoids inherited homepage padding.

## SEO and preservation
Exact canonical, title, social-image URL, meaningful keyword coverage and collection route retained. Description and OG copy clarify that published downloads are product adoption rather than solely individual design impact. CollectionPage ItemList now includes all four projects and uses Subscribe a Car with Subscribe Me context. Existing destinations, footer contact links and booking URL retained. Shared approved navigation is reused rather than forked.

Before/after hashes in review/collection-baseline-hashes.json confirm approved individual pages, their styles and shared navigation components unchanged. Every immutable baseline asset/source continues to be verified by the build.

## Validation and evidence
Actual browser: 1440, 1024, 768, 390 and 320px, First Light and Juniper Dusk. Viewport captures under review/collection-final/; index.html provides a gallery and results.json records the checks. Checks cover overflow, image loading, project anchors, semantic article count, keyboard focus, theme persistence after refresh, mobile menu/Escape, no-JavaScript content and local destinations. Automated axe checks use WCAG 2 A/AA, 2.1 AA and 2.2 AA tags; they are not manual screen-reader certification.

Build: exact /case-studies.html output. Astro diagnostics and regression results recorded in final response. Await owner review; no production actions.

## Files changed
- src/content/collection.ts — source-derived collection refinements and metadata
- src/pages/case-studies.astro — established static route and shared shell
- src/styles/collection.css — collection-only editorial styling
- scripts/prepare-public.mjs — approved route migration and image derivatives
- scripts/review-collection.mjs — browser QA and screenshots
- tests/preservation.test.mjs — migration exception while retaining source hash checks
- tests/collection.test.mjs — route, inventory and factual-context regression checks
- docs/COLLECTION-REVIEW.md and review/collection-final/ — review evidence

Final verification: static build passed; Astro 74 files, zero errors/warnings/hints; 27/27 regression tests passed. All ten viewport/theme combinations passed browser checks and axe rules. Approved baseline hashes unchanged.
