# Approved hybrid Phase 1 — working review

Branch: feature/phase-1-editorial-slice. Original snapshot: bb92411ebb56f45afdbe80dc48c8c698133cfe91. No push, merge, deployment or production source edits.

## Open the result
Local preview: http://127.0.0.1:4321/phase-1.html. From a fresh checkout: npm ci, npm run dev. The route is noindex/nofollow and absent from the preserved sitemap. The original index.html is unchanged.

## Approved composition implemented
The four approved static boards in the Codex visualization folder are the visual reference, not a pixel-perfect specification. Desktop uses an open spread: the existing SEO headline on the left, supporting voice/actions on the right. Product Designer remains explicit. Quiet Selected Work navigation leads into a single-line project title and full-viewport-width HaierMall image field. Original screenshot pixels are retained; the desktop image tilts gently, while mobile uses a straight, enlarged crop with no fabricated UI. Both themes were implemented together.

The concise design question reads: “How could customers move from browsing appliances to a confident purchase?” It remains visibly labeled “Proposed copy · pending verification.” Minimal project context makes no personal contribution or performance claim. The original headline, supporting paragraph and full project paragraph remain preserved in content/baseline.json and immutable legacy pages.

## Published outcomes restored — owner correction
The owner confirms that the approved published HaierMall results are verified. The case-study Results section is authoritative. The prior inference from missing separate analytics files was incorrect and is withdrawn. All four results now render statically immediately below the image, ahead of the proposed question: +31% Online sales / 3 months post-launch; −20% Bounce rate / Homepage → category; +40% Faster product discovery / Usability testing; +15% Session duration / Average session.

The published reporting sentence credits the product management and development teams. A single link opens the full Results/reporting context. The layout uses four equal open columns on desktop, two on tablet, and aligned value/context rows on mobile. It remains adaptable to one through four results; no cards or invented measures are introduced. Exact values/labels/definitions are regression-tested against the source counter targets, not the initial animated ±0% text.

See docs/HAIERMALL-EVIDENCE.md for precise source ranges and separately documented discrepancies, including alternate +25% and −32% annotations within the current case-study page. No original source page or service content was rewritten.

## Preservation and architecture
Astro static generation, React theme control and TypeScript remain. Outcomes are server-rendered React with no client hydration. All 68 original snapshot files are checked against their Git blob hashes before copying. Eight legacy HTML paths, SEO metadata, original assets, service content, Archive and both resume PDFs remain byte-identical. Font licenses are preserved in output.

## Verification
- Build succeeds; Astro check reports no errors, warnings or hints.
- Thirteen automated preservation/content/outcome tests pass.
- Required captures: 1440,768,390,320 in First Light and Juniper Dusk. Sixteen additional intermediate width/theme combinations.
- Thirty-two synthetic outcome layouts: 1/2/3/4 results at four widths in both themes; no overflow and scoped axe checks.
- Page and open-menu axe scans: zero WCAG A/AA-tag violations. Runtime errors, loaded Manrope/italic Instrument Serif, full-width image field and exact headline checked.
- Keyboard Space/Enter opens Menu, Tab reaches Work, Work closes it and focuses Selected Work, Escape restores summary focus. Native select keyboard selection checked; its popup is dismissed before the enclosing Menu.
- Explicit preference persists; denied storage and live system changes work. Without JS, readable content and in-flow open navigation remain; appearance control is honestly disabled.
- 200% simulated text resizing at 320 CSS pixels, narrow reflow, forced-colors focus and reduced-motion rendering checked.

Machine-readable evidence: review/restored-outcomes/verification.json. Actual browser-UI zoom, screen-reader journeys, physical devices and other browser engines are not verified; no full WCAG conformance claim is made. Project screenshots are illustrative artwork, not a usable product UI at mobile scale.

## Design skills and independent review
Superpowers supplied planning, regression tests and verification. Taste supplied rendered composition checks; Impeccable supplied craft guidance, detection, independent finish review and token documentation. Extract Design System was inspected earlier; no external extraction replaces the approved local system.

Raw Taste inspector output: zero failures and five warnings (mixed fonts, question micro-label, footer divider, size count, no video). These are disclosed pinned-design exceptions or scope decisions. Approved section numbering was explicitly allowed in this inspection. Image count, restrained motion and long-headline quotas were explicitly allowed in the inspection. Impeccable's overused-font warning is an Instrument Serif / Inter substring false positive; pre-documentation type-ramp advisories prompted reconciliation to actual CSS.

The restoration finish review requested recapture of two dark mobile images before final review. The capture pipeline now forces an artwork paint, waits for two animation frames, then verifies the product-image raster content in the saved full-page PNG. All eight captures passed that additional check. Fresh-context review of the valid recaptures returned ship for the restoration since 4bffc32, with no material fixes or P0–P2 issues. It verified the exact four values, labels, contexts, attribution, image placement and retained geometry. This is an internal scoped review, not owner approval or deployment permission. No claim is made that separate generative direction-seed/build-state/comp-diff tool gates were run.

## Captures and next decision
Final local captures are review/restored-outcomes/light-1440.png, dark-1440.png, light-768.png, dark-768.png, light-390.png, dark-390.png, light-320.png, dark-320.png, plus Hero and open-menu images. Screenshots and diagnostic artifacts are ignored by Git. Approve the working result before any further scope. The concise question remains proposed copy; the published outcomes are verified and restored. Corrections to alternate source annotations remain a separate approval decision. No remaining homepage sections, Archive implementation, case-study redesign or Explore Experiences were added.

## Preservation of the approved opening
All eight Hero PNGs (both themes × four widths) are byte-identical to the preceding approved hybrid implementation. Hero source and image geometry were not changed.

Final preview mirrors under review/restored-outcomes/previews/ contain the same verified PNG bytes with fresh display paths.
