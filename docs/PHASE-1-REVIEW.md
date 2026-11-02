# Phase 1 — targeted Hero and theme-control review

Branch: feature/phase-1-editorial-slice. Scope baseline: 05968af. Original production snapshot: bb92411ebb56f45afdbe80dc48c8c698133cfe91. No push, merge, deployment or Phase 2.

## Review
Open http://127.0.0.1:4321/phase-1.html. For a fresh checkout: npm ci, npm run dev. The review route remains noindex/nofollow and absent from the preserved sitemap.

The attached brief cd9015f2-be22-4908-a9e5-2e34542c2dbb authorizes only two refinements. Its image is a conceptual relationship diagram, not a request for its border, divider, background or annotations.

## Changes
Headline width is controlled at 1120px maximum, with existing responsive type and exact baseline wording. The audience phrase occupies the upper lines, followed by Build and the Instrument Serif emphasis. A 64px desktop gap separates the headline from a two-column support row. The paragraph is capped at 52ch with pretty wrapping; actions form a vertical group in the right column. At 850px and below the row stacks with no old horizontal offset; mobile retains its comfortable gutters and existing scale.

ThemePreference now renders one real icon-only button with a 48×48px target and 20px outline SVG. Moon means switch to dark; sun means switch to light. Dynamic accessible name/title matches the destination. The button sits beside mobile Menu, outside the disclosure. Global Escape closes an open mobile Menu even when focus is on the adjacent toggle, then returns focus to Menu.

CSS system preference still initializes the theme before hydration. Media changes update the effective theme and accessible name until an explicit click, tap, Enter or Space chooses a theme. Explicit choices persist under portfolio-review-theme; storage denial retains in-memory operation. No separate return-to-System option is exposed by the requested two-state control. Without JavaScript, content follows the system theme and the disabled control is honestly named unavailable. Icons use the same CSS preference logic to avoid displaying the wrong destination icon before hydration.

## Preservation
The article markup and src/content/haiermall.ts are byte-identical to 05968af. Regression tests also compare every project, artwork, outcome, section-heading and work-intro CSS rule against that commit. +31%, −20%, +40%, +15%, their labels, contexts, team attribution, proposed question/status, links, artwork and metric layout stay intact. All 68 original production files and eight HTML paths remain byte-identical. No SEO metadata or source assets changed.

## Validation
Build and Astro check pass with no diagnostics. Sixteen tests pass, including the exact published Results regression and targeted preservation tests. Browser verification covers 1440/768/390/320 in both themes, sixteen intermediate combinations and thirty-two adaptive outcome fixtures. Page/open-menu axe scans record zero violations; no horizontal overflow. Checks include mouse, emulated touch, Enter/Space, dynamic names/icons, visible focus, persistence after refresh, denied storage, system changes, no JS, forced-colors focus, 200% simulated text resizing and narrow reflow. Full-page image captures force and verify artwork paint.

Evidence: review/hero-theme/verification.json. Actual screen-reader journeys, physical touch devices, other browser engines and actual browser-UI zoom remain unverified. This is not a claim of complete WCAG conformance.

## Changed files
Implementation: src/components/ThemePreference.tsx, src/pages/phase-1.astro, src/styles/editorial.css. Verification: tests/targeted-refinement.test.mjs and scripts/review.mjs. Supporting project/design documentation records this narrow change. No dependencies or architecture changes.

## Previews and review
Eight full-page screenshots and corresponding Hero captures are in review/hero-theme/, with open-menu and artwork captures. Screenshot artifacts are local and ignored by Git. The final response focuses on the changed Hero/header; full-page previews retain the complete approved chapter. Independent scoped finish review found one P2: a wrapped theme button at 320px. A RED geometry assertion reproduced it. The targeted fix reduced only mobile header spacing, retaining target sizes. The reviewer scored that fix resolved in fresh 320/390 captures, with no observed regressions; disposition ship covers the scored fix. The documentation pass updated DESIGN.md and the design sidecar to the actual Hero and icon toggle; approved HaierMall notes were retained. Final preview mirrors live in review/hero-theme/previews/.

## Skill checks
Taste browser inspection returned zero failures and five warnings for approved mixed typography, the existing project-question label, footer divider, fluid size count and no video. These preserved choices do not authorize unrelated changes. Impeccable supplied craft/focus guidance, independent review and token documentation.

Impeccable detector findings are retained in review/hero-theme/impeccable-detect.json. Instrument Serif may trigger its known Inter-substring font warning; approved fonts and preserved project styles are not replaced to satisfy a detector.
