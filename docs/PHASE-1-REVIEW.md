# Phase 1 refinement review

Local branch: feature/phase-1-editorial-slice. Baseline: bb92411ebb56f45afdbe80dc48c8c698133cfe91. No push, merge or deployment.

## Review destination
Run npm ci, npm run dev, then open http://127.0.0.1:4321/phase-1.html. The noindex preview is separate from the unchanged production index.html and sitemap.

## Design changes
- Supporting Hero paragraph and actions form one offset group; mobile groups actions vertically and gives serif phrases deliberate wrapping.
- Native compact Menu at 650px contains navigation and appearance control. Escape closes and returns focus; no-JavaScript open navigation remains in flow.
- Both themes retain approved colors and self-hosted Manrope/Instrument Serif. Functional labels are 15–16px.
- Stronger desktop screenshot composition; mobile uses larger sequential crops from original pixels, with no synthetic artwork.
- Prominent Homepage / Product detail / Checkout evidence labels follow imagery. The note explicitly distinguishes artifacts from outcomes; figures await confirmation.
- Short introduction is a labeled proposal. Original wording is preserved in content/baseline.json and legacy pages.

## Preservation and implementation
Astro static output, React theme selector and TypeScript remain scoped to the review route. Build verifies 68 original files by Git blob hash before copying, including eight existing HTML paths, metadata, assets, service page, Archive and both resumes. Original font licenses are included. Legacy defects and claims have not been silently corrected.

## Verification
Build and Astro check pass (zero diagnostics). Twelve preservation/refinement tests pass. Browser checks cover eight required theme/viewport combinations (1440,768,390,320), plus sixteen intermediate combinations (360,480,600,650,651,820,1024,1280 in both themes). Checks include open-menu and page axe scans, contrast, no overflow, fonts, runtime errors, keyboard skip navigation, Escape focus return, preference persistence, denied storage, live system preference, no JavaScript, forced-colors focus, 200% simulated text resizing and 320 CSS-pixel reflow. Evidence: review/refinement/verification.json.

Actual browser-UI zoom, screen-reader journeys and physical devices have not been verified. Simulated text resizing and narrow viewport reflow are separate checks, not a claim of full WCAG conformance.

## Skills and design checks
Superpowers structured the refinement plan, regression checks and independent review. Taste informed typography/composition and browser inspection; Impeccable informed polish, craft floor, detection and documentation. Extract Design System instructions were inspected; external extraction is not applicable to preserving this approved local system.

Taste inspector: zero failures, five warnings. Approved mixed serif emphasis stays; fine footer divider marks the review boundary; no authentic video is available or needed within this slice; asymmetric artwork and native controls affect automatic margin inference; fluid heading sizes produce more measured sizes than a generic five-step quota. Image-count, motion, headline-line and shadow quotas are disclosed brief-led exceptions. Impeccable's overused-font warning matches Instrument Serif's 'Inter' substring; the actual face is the approved Instrument Serif. The documentation type ramp is reconciled to CSS.

## Independent review
Fresh-context reviewer inspected all eight captures and source changes against the previous slice. Disposition: ship for requested refinement review; no material fixes or P0–P2 issues. This is not deployment approval. A subsequent no-JavaScript style-order defect found by the added automated assertion was corrected with higher-specificity fallback selectors and reverified.

## Evidence and decisions
See docs/HAIERMALL-EVIDENCE.md for source-by-source metric, attribution and third-party-statistic reconciliation. No repository analytics exports or study records independently substantiate the business figures. Approval remains needed for the proposed shorter introduction, metric definitions/sources, contribution/team credits and eventual results-versus-artifacts evidence composition.

## Screenshots and limits
Final captures are in review/refinement/: light/dark at 1440,768,390,320, plus Hero crops, 390 Menu captures and a 200% text stress capture. Local artifacts are ignored by Git. The full homepage, Archive and multiple Explore Experiences remain out of scope. Stop for owner visual review.
