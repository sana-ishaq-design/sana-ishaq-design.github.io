# HaierMall final browser UX review — 3 November 2026

## Findings

### Working well — retained
- The existing seven-chapter navigation works in both directions: every anchor, scroll-driven active state, sticky-header clearance, compact menu, native history and direct routes. It was not rebuilt.
- The research section is titled “Understanding the problem” in the actual page. Methods are stated before five clearly separated findings; each finding links to the corresponding decision. Existing widths, spacing and hierarchy are readable on mobile. No research or copy change was warranted.
- Homepage, listing and product-detail exports have identifying captions, nearby design rationale and original full-size inspection links. The purchase-controls crop serves a different purpose from the complete product-page export. Authentic imagery was retained.
- All four verified outcomes and measurement contexts remain visible. Results/reflection retains attribution and reporting limitations. The ending includes the original learnings, verified Subscribe Me destination, All Case Studies, contact CTA and credits.
- Shared header appearance, fonts, themes, source content, metadata and static canonical route remain preserved. No duplicate-content investigation was repeated; the known PNG artifact is outside the coded content.

### Genuine issue found and fixed
Reverse keyboard navigation could leave content links behind the desktop sticky header. Reproduced examples included “All Case Studies” near y=32px and the mobile-evaluation finding link near y=112px, below the visible sticky layer.

Added scoped `scroll-margin-top` using the existing chapter/header offset plus24px, and24px bottom clearance, to case-study content/footer links. No visual layout, navigation logic or copy changed. An actual-browser regression traverses Tab and Shift+Tab through40 controls per direction at five widths in both themes; no content links remained obscured after the fix.

## Implementation files
- Changed `src/styles/haiermall-case.css`: one scoped focus-clearance rule.
- Added `tests/haiermall-focus.browser.mjs`: forward/reverse keyboard obstruction regression.
- Added this review report.
- Generated local evidence in ignored `review/haiermall-final-ux/`: browser scripts, accessibility-tree snapshots, verification JSON and80 separate viewport PNGs. No full-page stitching is used in this package.

## Verification
- Build passed; Astro check:0 errors,0 warnings,0 hints; all23 static/content/preservation tests passed.
- Actual Chrome at1440,1024,768,390,320px in First Light and Juniper Dusk.
- Every one of seven chapter links verified, plus active tracking while scrolling in both directions, visible keyboard focus, reduced-motion behavior, no horizontal overflow, loaded imagery and persistent theme changes.
- Zero axe WCAG A/AA violations across ten combinations; mobile menu open states checked separately.
- All26 local page/image/fragment destinations returned200 and fragment targets existed. Next Case Study and All Case Studies work. The existing Calendly and developer GitHub URLs also returned200 using read-only requests; no forms were submitted.
- Static generation still emits `/case-studies/haiermall-case-study.html`; source SEO metadata, Article JSON-LD and canonical remain unchanged.
- No new dependencies or executable page code were introduced by this pass.
- Final local loading probes observed zero layout shift at1440px and390px while fonts and project images loaded. These are local observations, not a guarantee for every network/browser condition.

## Browser evidence
Open `review/haiermall-final-ux/index.html` for the complete ordered gallery. Each image is a single900px-high browser viewport at its actual desktop/mobile width, and opens at original resolution. Sections range from opening through research, all four showcases, handoff, reflection, next-project links, contact and final credits.

Representative files:
- `{light,dark}-1440-opening.png` — desktop entry.
- `{light,dark}-390-opening.png` — mobile entry.
- `light-1440-navigation.png` — active sticky chapter navigation.
- `dark-390-navigation.png` — open mobile jump menu.
- `{light,dark}-1440-ending.png` — contact and credits.
- `{light,dark}-390-next-project.png` and `{light,dark}-390-credits.png` — the complete mobile ending across two actual viewports.

## Limits and approval
Screen-reader semantics and names were reviewed through the browser accessibility tree and automated checks; this is not a manual NVDA/VoiceOver certification. Live GitHub Pages deployment was not performed; exact static output and direct local routes were verified. No unresolved implementation blocker or new content/design decision was found. Final owner visual approval remains required before other case studies or deployment.
