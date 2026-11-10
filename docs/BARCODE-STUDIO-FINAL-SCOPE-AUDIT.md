# Barcode Studio — Content, Asset, Visual and SEO Audit

Read-only audit, 6 November 2026. No page, shared styling, approved project, routing or deployment changes. Review evidence is in `review/scope-audit/`.

## Recommendation

Retain Barcode Studio. Its strongest story is **making a constrained browser utility understandable, trustworthy and ready for developer handoff**. This demonstrates a different capability from commerce conversion, mobile delivery and enterprise workflows. Do not lead with invented impact statistics. Reconcile the HTML, design screenshots, decision PDF and shipped release before migrating the page.

## Strengths to preserve

- Specific product, documented end-to-end UX design/handoff role, and developer credit to @zfhassaan.
- Real Create, Export and About screens in both product themes, a user-flow diagram, typography/token material and annotated handoff evidence.
- Six explicit design decisions with alternatives and rationale.
- Five assumptions explicitly reserved for validation, plus honest limitations around testing, batch errors and input validation.
- Existing canonical route, Article schema, useful extension/privacy/product-design search intent, PDF resource and working case-study destination.

## Priority findings

| Priority | Finding and exact source | Recommended change, pending approval |
|---|---|---|
| P1 | HTML hero and flow heading present under 30 seconds as accomplished; `#research` A1 and `#improve` say assumptions remain untested. | Retain it as a design goal, never measured completion time. Replace “all measured against” with an accurate distinction between delivered design and unvalidated assumptions. |
| P1 | “Every existing barcode tool,” “every existing solution,” and blanket server-upload/account-gate claims in hero, `#challenge`, `#research`. | Limit statements to named, dated tools actually reviewed. Describe audit observations, not universal market facts. Request the comparison sample; do not invent it. |
| P1 | Resource labeled Chrome Web Store at HTML line 1108 points to the developer GitHub repository. | Point the store CTA to the verified listing; retain a separately labeled source-code link. Product listing exists, but installation was not performed. |
| P1 | Store listing says normal generation is local, but its privacy disclosure also lists sensitive data categories. | Ask developer to reconcile the disclosure and privacy policy. Retain documented local encoding as a product design fact; do not equate that with an independent guarantee of zero network activity. This discrepancy does not prove data transmission. |
| P1 | PDF documents export tiles becoming a dropdown; Export Light screenshot still has PNG/SVG/WebP/PDF tiles. HTML describes chips “vs dropdown,” but Create has both a dropdown and quick choices. | Establish version/scope for each artifact and each control. Distinguish barcode symbology from export file type. Do not silently choose one source or fabricate a before-state. |
| P1 | HTML says theme override lives in About; screenshots and PDF place controls in the header. PDF describes light About on dark backdrop; About Dark asset is dark. | Reconcile shipped behavior versus proposed refinement. Label artifacts by version where established. |
| P1 | HTML/PDF use PDF export; current repository and store list PNG/JPEG/WebP/SVG. HTML says 400×600 popup, PDF about 500px wide, handoff specifies 340×740 for a design frame. | Confirm designed versus shipped export formats and distinguish frame dimensions from runtime popup dimensions. Preserve evidence; flag differences rather than inventing a single specification. |
| P1 | HTML says designer and developer attribution appears in product; supplied About screen names the developer only. | Preserve Sana's documented design/handoff credit in the case study, developer implementation credit separately; remove the assertion of in-product dual credit unless supported. |
| P1 | Legacy navy/teal, Inter/DM Serif, dense repeated card grids, small metadata; no shared header or First Light/Juniper Dusk. | Adopt approved portfolio shell, typography, tokens, accessible chapter navigation and editorial compositions. Keep authentic product purple and product typography inside images. |
| P1 | Browser axe found 80 contrast-failing elements at 1440px. Clickable images are not keyboard triggers. Lightbox close has role/button but Enter does not close it; focus is not managed. | Use existing approved accessible image/link patterns; real button, keyboard activation, focus containment/return and visible focus. |
| P1 | With JavaScript enabled and the animation CDN blocked, hero remains opacity 0. | Make content visible by default; motion must progressively enhance it. No-JavaScript fallback already keeps the hero visible and should be preserved. |
| P2 | Export Light and About Light alt text both incorrectly say Create; typography caption implies complete dark/light tokens although image shows a type-style excerpt. | Caption and describe each actual artifact. Colour-board image prominently shows dark token groups, so avoid presenting it alone as exhaustive proof of both theme inventories. |
| P2 | Images use fixed-aspect cover frames, shrinking/cropping detailed evidence. Overview repeats in the system section. | Preserve proportions; use purposeful detail crops and complete-original links. Avoid repeating the overview unless explaining something new. |
| P2 | Mobile hides chapter links without an alternative. Desktop active state is colour-only; future improvements/resources lack chapter links. No main landmark. | Reuse shared desktop chapter navigation and mobile jump control, preserve all legacy fragments, add semantic main and correct sticky offsets. |
| P1 | OG/Twitter/schema reference missing `assets/img/barcode-studio-og.png`. | Create an approved preview from authentic assets and repair all matching references. Preserve the canonical path. |

## Authentic asset inventory

All 11 unique PNGs are 1200×900; 12 image placements currently repeat the overview. All referenced content images loaded in the browser. The source includes dormant “Upload…” fallback markup, but it is not evidence of missing loaded project screens. Remove obsolete fallback copy during migration.

| Files in assets/img | Evidence and placement |
|---|---|
| Overview - Barcode.png | Dual-theme Create composition; opening image only. |
| Create Dark - Barcode.png / Create Light - Barcode.png | Format/input/preview hierarchy. Crop existing surrounding canvas carefully for mobile readability; do not invent new screens. |
| Export Dark - Barcde.png / Export Light - Barcode.png | Single/batch export and output choices; preserve the existing misspelled filename/URL. |
| About Dark - Barcode.png / About Light - Barcode.png | Shortcuts, privacy wording, feedback links and developer attribution. |
| Userflow - Barcode.png | Branching single/batch journey, not simply six isolated steps. Supply adjacent readable text. |
| typography - Barcode.png | IBM Plex Sans style examples; excerpt, not proof of every type-scale claim. |
| color palette - barcode.png | Named colour/token evidence; preserve product palette. |
| documentation - Barcode.png | Numbered developer handoff with dimensions, spacing and token references; strong evidence of execution quality. |
| ../barcode_studio_ux_decision.pdf | Versioned v1.1→v1.2.2 rationale; contains material differences from HTML/screens. Preserve original; approve any corrected derivative separately. |

Missing or unresolved: source/version mapping, named competitor sample, validation results, original editable design files/component inventory if a full component-library claim is intended, confirmed design repository availability, and a social preview image. No research participants, measured speed improvement or component counts should be added.

## Proposed editorial chapters

1. **A utility that stays in the workflow** — product context, Sana's role, developer attribution, release scope, authentic overview.
2. **Designing with assumptions in view** — observed competitive friction, intended audiences, five unvalidated assumptions and the 30-second target.
3. **From input to usable output** — authentic flow; Create hierarchy, selection controls, contextual guidance and preview. Decision/evidence relationships replace duplicated process prose.
4. **Export without unnecessary detours** — single/batch presentation and format choices, explicitly version-reconciled. One dominant screen and relevant detail rather than another identical pair.
5. **Trust, preferences and implementation** — privacy wording, theme controls, About, semantic tokens, typography and handoff; use readable evidence subsections.
6. **What shipped, what remains to validate** — delivered scope, current release availability, limitations and future testing proposals clearly labeled. End with credits, resources, all case studies and relevant contact CTA.

Keep old fragments (`overview`, `challenge`, `why`, `users`, `research`, `flow`, `decisions`, `screens`, `system`, `outcomes`, `improve`, `links`) as meaningful subsection destinations even when top-level chapters consolidate.

## SEO and implementation plan

Preserve `/case-studies/barcode-studio-case-study.html`, one canonical, substantive extension/product-design terminology, authorship and genuine dates. Proposed title for approval: “Barcode Studio — Chrome Extension UX Design Case Study | Sana Ishaq”. Revise live-store/absolute privacy language consistently in description, social metadata and Article schema after reconciliation.

1. Approve the source/version matrix, role wording and bounded claims.
2. Migrate content into Astro using approved shared header, theme and chapter components; preserve original HTML/assets and route-generation checks.
3. Build opening and representative decision/evidence treatment in both themes for review, then complete remaining chapters.
4. Validate assets, links, schema, legacy fragments, keyboard/lightbox, reduced motion, CDN/no-JS resilience and 1440/1024/768/390/320 layouts. Final polish and visual approval before any deployment.

## Questions requiring answers

- Does this case study describe the original product design, a v1.1→v1.2.2 redesign, or both? Which artifact is authoritative for each release?
- Which competitor products/versions were reviewed, and what observations are retained?
- Was any post-launch validation completed after the documented untested state?
- Can the developer reconcile store privacy disclosures, export formats and actual release behavior?
- Is the designer's linked `barcode-studio-ux` repository intended to be public? Its external availability was not confirmed by this audit.

## Verification and sources

Local browser: 1440, 768, 390 and 320px; no document overflow, all content images loaded; legacy single-theme interface only. Keyboard close failure and CDN failure reproduced. Automated checks are not manual screen-reader certification. PDF text and individual PNG evidence reviewed.

- Local primary source: `case-studies/barcode-studio-case-study.html`; PDF and assets listed above.
- Developer repository: https://github.com/zfhassaan/barcode-studio — confirms local payload generation, persistent settings/values, export behavior and external GitHub feedback. “No persistent state” and “no external form” in the HTML need narrowing accordingly.
- Store listing: https://chromewebstore.google.com/detail/barcode-studio/lknamljgoemoejklldglbpjbbagnjbab — accessible listing for v1.2.2; do not import rating/user count as project impact.
- Screenshots: `review/scope-audit/barcode-opening.png`, `barcode-1440.png`, `barcode-390.png`; machine results: `browser.json`.

Technical rubric (provisional review judgment, not certification): accessibility 1/4; performance 2/4 (lazy loading present, external animation dependency and unresponsive image delivery); theming 1/4; responsive 2/4; implementation integrity 1/4. Total 7/20. Priorities: clarify conflicting evidence, harden interactions, adapt responsive evidence, then polish. Re-run the audit after approved fixes.
