# Subscribe a Car — local implementation review

4 November 2026. Feature branch: feature/phase-1-editorial-slice. No commit, push, merge or deployment.

## Implementation
Six approved editorial headings; portfolio-facing Subscribe a Car title and original Subscribe Me product identity. Existing FullNavigation and CaseChapters reused unchanged. Both portfolio themes and project-scoped typography/spacing. Authentic mobile exports retain proportions and original colors; opening uses labeled crops. All 19 original interface/specification assets are represented; full-image links are textual and keyboard reachable. UTWorX next project, all-case-studies, original Google Play search (accurately labeled), contact and credits retained.

## Content preservation
- Original HTML remains immutable input, checked against baseline Git objects during the build. No original assets changed.
- Existing /case-studies/subscribe-me-case-study.html route retained; Astro owns only this newly approved output in addition to HaierMall.
- Original title, description, Open Graph, Twitter and Article JSON-LD retained exactly; duplicate conflicting canonical excluded. One established-route canonical remains.
- Meaningful challenge, journey, management, system, screens, outcomes, outcomes-grid and reflection fragments retained.
- Source-backed introduction, three challenges and responses, journey reasoning, UX-team research attribution, handoff, four reflections and closing thought preserved. Redundant screen showcase merged into relevant chapters.
- 100K+ downloads, 3.9-star rating and 217+ reviews remain historical published adoption facts. Six sprints and 50+ components are separate delivery facts. UI Designer — Delivery Phase / joining Sprint 4 remains explicit.
- Review excerpts and names retained; sweeping conclusions replaced with approved measured interpretation. Version 2 opportunities are not presented as shipped features.

## Verification
- Final npm run build: pass; 68 immutable baseline files checked.
- npm test: 25/25 pass.
- npm run check: 0 errors, warnings or hints (60 files).
- Browser: 1440, 1024, 768, 390, 320px × First Light/Juniper Dusk. Six anchors, scroll-active indicator, offsets, image decoding, reduced motion and theme persistence pass; no overflow or console errors.
- Axe WCAG 2/2.1/2.2 AA-tagged full-document scans with menu closed: zero violations. Expanded mobile menu scanned independently. A whole-document scan while the menu overlays underlying links can flag a partially covered background target; this is not claimed as a clean all-scroll-position scan.
- Forward/reverse keyboard test: zero obscured links across ten configurations after replacing tall image-sized anchors with textual inspection links.
- No-JavaScript: 8 legacy fragments and complete content at 1440, 390, 320px; no overflow, navigation stays in document flow.
- 37 unique local link/fragment/image destinations resolve successfully.
- 48 actual viewport screenshots plus navigation captures: review/subscribe-car/index.html. Raw matrix: review/subscribe-car/verification.json.
- Independent source review completed; two findings resolved (restore app search and remove internal reconciliation wording from public copy).
- Impeccable detector ran; advisory type-ramp differences from the older homepage DESIGN.md remain project-specific editorial sizing choices. Existing fonts, colors, navigation and theme system remain shared. No design-system file was silently rewritten.

## Files in this task
New: src/pages/case-studies/subscribe-me-case-study.astro; src/components/SubscribeScreen.astro; src/content/subscribe-story.ts; src/styles/subscribe-case.css; tests/subscribe-case.test.mjs; tests/subscribe-focus.browser.mjs; tests/subscribe-fallback.browser.mjs; this report and docs/superpowers/plans/2026-11-04-subscribe-car.md.
Modified: scripts/prepare-public.mjs (approved route exception and derivatives); tests/preservation.test.mjs (approved migration exception).
Review artifacts are under review/subscribe-car. Pre-existing uncommitted homepage and HaierMall work was not changed by this task.

## Outstanding factual questions and limits
Six-sprint scope relative to Sprint 4 entry; date of the reported rating/review snapshot; verified direct store listings; whether a separate export documents the named checkout progress steps. None was invented. Original Google Play search URL is retained, not represented as a verified direct listing. No manual NVDA/VoiceOver certification or production GitHub Pages deployment was performed.

Approved by the owner on 4 November 2026. Preserve this implementation as an approved baseline alongside HaierMall. Unresolved factual questions remain documented.

