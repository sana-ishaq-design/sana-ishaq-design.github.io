# Approved hybrid Phase 1 — working review

Branch: feature/phase-1-editorial-slice. Original snapshot: bb92411ebb56f45afdbe80dc48c8c698133cfe91. No push, merge, deployment or production source edits.

## Open the result
Local preview: http://127.0.0.1:4321/phase-1.html. From a fresh checkout: npm ci, npm run dev. The route is noindex/nofollow and absent from the preserved sitemap. The original index.html is unchanged.

## Approved composition implemented
The four approved static boards in the Codex visualization folder are the visual reference, not a pixel-perfect specification. Desktop uses an open spread: the existing SEO headline on the left, supporting voice/actions on the right. Product Designer remains explicit. Quiet Selected Work navigation leads into a single-line project title and full-viewport-width HaierMall image field. Original screenshot pixels are retained; the desktop image tilts gently, while mobile uses a straight, enlarged crop with no fabricated UI. Both themes were implemented together.

The concise design question reads: “How could customers move from browsing appliances to a confident purchase?” It remains visibly labeled “Proposed copy · pending verification.” Minimal project context makes no personal contribution or performance claim. The original headline, supporting paragraph and full project paragraph remain preserved in content/baseline.json and immutable legacy pages.

## Outcomes ruling
The latest user instruction overrides the private placeholders shown in the approved composition boards. The actual dataset src/content/haiermall.ts is empty. ProjectOutcomes renders nothing for zero approved records, without a blank placeholder section. Records must be owner-approved and have source/context. No example figures or deliverable names are rendered as impact. One, two and three-result layouts are supported; synthetic fixtures exist only in tests and are injected into an isolated browser page in memory. No fixture route or query enables them in the shipped output.

See docs/HAIERMALL-EVIDENCE.md for the separate reconciliation table. Verifying a figure and its attribution remains an owner content decision.

## Preservation and architecture
Astro static generation, React theme control and TypeScript remain. Outcomes are server-rendered React with no client hydration. All 68 original snapshot files are checked against their Git blob hashes before copying. Eight legacy HTML paths, SEO metadata, original assets, service content, Archive and both resume PDFs remain byte-identical. Font licenses are preserved in output.

## Verification
- Build succeeds; Astro check reports no errors, warnings or hints.
- Thirteen automated preservation/content/outcome tests pass.
- Required captures: 1440,768,390,320 in First Light and Juniper Dusk. Sixteen additional intermediate width/theme combinations.
- Twenty-four synthetic outcome layouts: 1/2/3 results at four widths in both themes; no overflow and scoped axe checks.
- Page and open-menu axe scans: zero WCAG A/AA-tag violations. Runtime errors, loaded Manrope/italic Instrument Serif, full-width image field and exact headline checked.
- Keyboard Space/Enter opens Menu, Tab reaches Work, Work closes it and focuses Selected Work, Escape restores summary focus. Native select keyboard selection checked; its popup is dismissed before the enclosing Menu.
- Explicit preference persists; denied storage and live system changes work. Without JS, readable content and in-flow open navigation remain; appearance control is honestly disabled.
- 200% simulated text resizing at 320 CSS pixels, narrow reflow, forced-colors focus and reduced-motion rendering checked.

Machine-readable evidence: review/hybrid/verification.json. Actual browser-UI zoom, screen-reader journeys, physical devices and other browser engines are not verified; no full WCAG conformance claim is made. Project screenshots are illustrative artwork, not a usable product UI at mobile scale.

## Design skills and independent review
Superpowers supplied planning, regression tests and verification. Taste supplied rendered composition checks; Impeccable supplied craft guidance, detection, independent finish review and token documentation. Extract Design System was inspected earlier; no external extraction replaces the approved local system.

Raw Taste inspector output: one failure (01 / HaierMall numbering, explicitly present in the approved boards) and five warnings (mixed fonts, question micro-label, footer divider, size count, no video). These are disclosed pinned-design exceptions or scope decisions, not a claim of a clean detector. Image count, restrained motion and long-headline quotas were explicitly allowed in the inspection. Impeccable's overused-font warning is an Instrument Serif / Inter substring false positive; pre-documentation type-ramp advisories prompted reconciliation to actual CSS.

Fresh-context finish review disposition: ship for this scoped user-approved implementation. No material fixes or P0–P2 findings. The reviewer inspected all eight final page captures, both menu captures, approved boards and relevant source. This is a visual/code review verdict, not user approval or deployment permission. Generative direction-seed, quality-card, build-state and comp-diff pipeline files were not supplied; no claim is made that those separate tool gates passed.

## Captures and next decision
Final local captures are review/hybrid/light-1440.png, dark-1440.png, light-768.png, dark-768.png, light-390.png, dark-390.png, light-320.png, dark-320.png, plus Hero and open-menu images. Screenshots and diagnostic artifacts are ignored by Git. Approve the working result before any further scope. The question/contribution and real outcomes remain pending content decisions. No remaining homepage sections, Archive implementation, case-study redesign or Explore Experiences were added.
