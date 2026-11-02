# Phase 1 refinement implementation plan

> Execute with superpowers:executing-plans; authorized by the attached complete refinement brief. Stay on feature/phase-1-editorial-slice. No deployment or scope expansion.

**Goal:** Refine the existing slice's composition, evidence hierarchy, mobile imagery/type/navigation and legibility without restarting its identity.
**Architecture:** Existing Astro/React/TypeScript structure, same isolated phase-1.html route. Original baseline remains byte-identical.
**Spec:** User attachment 246dc6cb-8299-470d-b535-e61019f6edb5/Pasted text.txt, PRODUCT.md and DESIGN.md.

## Global constraints
Preserve headline/baseline, themes/fonts/accent, generous whitespace, authentic imagery, all existing URLs/assets/metadata/resumes. No invented or unresolved numeric results. Short introduction must be labeled as a proposal, with original source retained. No new homepage sections, Archive or demos.

## Review focus
- Keyboard menu/appearance journeys, Escape and breakpoint transitions.
- Mobile type: phrase-aware wrapping at 320/390 without modifying words.
- Evidence/claim separation, including source-location reconciliation.
- Intermediate widths, 200% text resize and 400% equivalent reflow; actual contrast in both themes.
- Mobile cropped artwork uses original pixels, no distortion or simulated UI.

### Task 1 — Evidence and baseline
- [x] Preserve the current paragraph/headline in content/baseline.json; document all HaierMall numeric and attribution claims with exact source lines and confirmation requirements.
- [x] Add regression assertions for prominent evidence, visible pending status, labeled copy proposal, and unchanged baseline. Run RED.

### Task 2 — Existing slice refinement
- [x] Group desktop intro/actions as one offset editorial unit; coordinated mobile CTA group and phrase-aware typography.
- [x] Replace mobile two-row header with native Menu disclosure containing real navigation and appearance selector; accessible no-JS default, Escape and breakpoint behavior.
- [x] Refine desktop collage and provide larger sequential mobile crops from original screens.
- [x] Restore spacious artifact-evidence typography beneath image, followed by the clearly labeled concise proposed context and linked action.
- [x] Raise functional text to 15–16px; keep semantic theming and touch/focus states.

### Task 3 — Verify and review
- [x] Build, type check and preservation tests.
- [x] Eight screenshot/axe combinations plus intermediate widths, text resize/reflow, no JS, storage denial, native menu/theme keyboard and forced-colors checks.
- [x] Inspect final captures; independent finish review and accurate documentation. Commit locally and stop for owner review.

## Rulings
- Evidence is demonstrable artifacts, not invented results: Homepage, Product detail, Checkout. The pending-metrics note is explicit.
- Proposed shorter copy appears only on the isolated noindex review route, labeled for approval. Original baseline is untouched.
- Use Impeccable polish workflow for this specific refinement; no new concept or identity tournament. Taste quotas never override the user's whitespace, restrained motion or limited scope. Extract Design System is inspected but external extraction is not applicable to preserving an already approved local system.
