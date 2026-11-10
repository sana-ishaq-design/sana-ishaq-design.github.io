# Subscribe a Car — final UX and technical QA

4 November 2026. Local-only review of /case-studies/subscribe-me-case-study.html. No push, merge or deployment.

## Genuine issues fixed
1. Small initial font-swap shifts (approximately 0.0016–0.0203 across the five viewport widths). Added preloads for the same Manrope Latin variable and Instrument Serif italic files used by HaierMall. Fresh local loading probes now record zero shifts at 1440, 1024, 768, 390 and 320px. This is measured local behavior, not a universal performance guarantee.
2. Footer search and selected-work links visually ran together on desktop. Added 32px separation, retaining destinations, focus styling and natural mobile wrapping.
3. Three captions/alt descriptions were generic or inaccurate relative to their pixels. They now identify accident/breakdown support entry points; the report document-upload step; and subscriber ID/licence records. Original assets and project narrative are untouched.
4. No-JavaScript test incorrectly treated the intentional mobile headline line break as a content change. Normalized whitespace in that assertion; page behavior did not change.

## Browser review
Complete story reviewed through context, challenges, journey, post-booking workflows, implementation, adoption, delivery, reviews, reflections, next project, contact and credits. Spacious composition retained. No section reorder, gallery redesign, asset replacement or metric change.

- Both First Light and Juniper Dusk tested at 1440/1024/768/390/320px.
- Six chapter anchors, active indication in both scroll directions, sticky header offsets, mobile jump menu, Escape handling, theme persistence and reduced motion passed.
- Forward/reverse Tab: zero obscured targets in all ten width/theme combinations. Existing HaierMall-style scroll margins and compact textual image-inspection links retained.
- Eight legacy fragments retain static destinations with JavaScript disabled at desktop and mobile sizes.
- No horizontal overflow or distorted full-screen exports. Browser measurements confirm every 360px source stays at or below 360 CSS pixels. Opening crops remain deliberate; complete screenshots remain available in their chapters and via full-image links.
- Screens grouped by booking, active subscription/support, vehicle issues, subscriber documents and handoff. No new repetitive gallery or fabricated comparisons introduced.
- Main heading order, link names, image alternatives and browser accessibility trees inspected. Axe WCAG 2/2.1/2.2 AA-tagged full-page scans at the normal top-of-page state: zero violations. Expanded jump menu scanned independently; overlays can partially cover underlying content at arbitrary scroll positions, so this is not a claim of zero findings in every possible scroll state.
- No manual NVDA/VoiceOver certification performed. Chrome browser QA, not exhaustive cross-browser/device certification.

## Facts and links
Subscribe Me original product identity, AW Rostamani client, RBB Global delivery organization, UI Designer — Delivery Phase, Sprint 4 entry and UX-team research attribution confirmed. Six sprints remains a project delivery fact; 50+ components remains design-system scope. 100K+ downloads, 3.9-star rating and 217+ reviews remain historical adoption figures, not sole personal causation.

One established-route canonical; original title, description, social tags and Article JSON-LD preserved. AWR.png social image returns 200. Real clicks from homepage and catalog reach the page; direct reload succeeds. All 37 unique local destinations (including fragments/images, UTWorX next project and all case studies) pass. Static .html output is present under the GitHub Pages file-build configuration; no production deployment was performed.

## Build and tests
- npm run build: pass; 68 immutable original files verified.
- npm test: 25/25 pass, including content, metadata, asset and unrelated-page preservation.
- npm run check: zero errors/warnings/hints.
- Browser matrix: ten configurations passed; images decoded; zero console errors.
- Fresh loading probes: zero observed layout shifts across five widths; both-theme refresh probes also zero.
- Protected HaierMall component/CSS and shared header/chapter-navigation hashes match the start of this review.

## Evidence
review/subscribe-final-ux/index.html: 76 separate viewport captures, no stitching.
review/subscribe-final-ux/verification.json: responsive, accessibility and link matrix.
review/subscribe-final-ux/technical.json: image dimensions, proportions, social image, refresh and inbound navigation.
Additional *-navigation.png captures show active desktop navigation and expanded mobile menu. Ending, contact and credits are captured separately so the entire closing can be reviewed without a stitched image.

## Files changed in this QA pass
- src/pages/case-studies/subscribe-me-case-study.astro — font preloads only.
- src/styles/subscribe-case.css — footer link separation only.
- src/content/subscribe-story.ts — three screenshot captions/alt descriptions only.
- tests/subscribe-fallback.browser.mjs — whitespace normalization only.
- This report; review/subscribe-final-ux evidence and diagnostic scripts.

No changes to HaierMall, shared navigation, original source/assets, or unrelated projects.

## Remaining factual questions
Previously documented: exact scope of the six-sprint period relative to Sprint 4 entry; historical rating snapshot date; verified direct store listing; separate evidence for named checkout progress labels. The original Google Play search action remains accurately labeled as search, not a verified direct listing. None of these gaps was filled with invented evidence. No new design question introduced. Approved by the owner on 4 November 2026. Preserve this implementation as an approved baseline alongside HaierMall.

