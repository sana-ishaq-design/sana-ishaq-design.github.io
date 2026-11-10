# Complete HaierMall — local review, 3 November 2026

The owner approved the complete migration using seven main sections. The local canonical route is `/case-studies/haiermall-case-study.html`; `/haiermall-preview.html` remains a noindex alias of the same document. Nothing has been pushed, merged or deployed.

## Source-to-section coverage

The immutable factual source is `case-studies/haiermall-case-study.html`. `src/content/haiermall-story.ts` extracts original wording at build time and fails if the expected source structure changes.

| New section | Original material retained | Editorial treatment |
|---|---|---|
| The project | Hero context, official platform, premium appliance/electronics market, role/sole designer, delivered/live status, scope and focus (217–255) | Approved opening, shared navigation, full-width original homepage image |
| The impact | Four Results values, labels, contexts, attribution and analytics-access limitation (908–983) | Existing static unboxed outcomes component; no counters or placeholder metrics |
| Understanding the problem | Context and full no-functionality-change constraint (258–314); Nielsen's ten principles, five-brand comparison, Baymard context, all five audit findings and root cause (317–391) | Open editorial rows link directly to the relevant visual decision; no hover disclosure |
| Redesigning the purchase journey | Written before/after hierarchy and five callouts (394–509); decision paragraphs 1–5 (512–628); all four screen showcases and unique rationale (651–905) | One top-level chapter with four visual subsections: recognition/orientation, discovery/evaluation, purchase confidence, checkout continuity |
| Building for implementation | Decision 6: 50+ Figma components, Chinese/Pakistani handoff, naming, focus/error/loading/empty states, px/rem, independent extension (629–648) | Separate delivery section; no invented component-board image |
| Results and reflection | Qualitative feedback, design-only interpretation, attribution/limitations and all four learning paragraphs (908–1035) | Feedback as an editorial statement; concise learning blocks; link back to outcomes rather than a duplicate KPI display |
| What's next | Existing CTA, Calendly destination, credits and Figma availability (1038–1067) | Verified Subscribe Me next-project link, original contact offer, credit footer |

All six decision explanations, six audit/root-cause explanations and four learning paragraphs retain their original wording. Tests compare these source passages with generated static HTML. Repeated showcase descriptions are consolidated into adjacent decision text; unique persistent flash-sale placement and category-specific grid rationale remain.

## Visual evidence

- `Haier homepage.png`: opening crop plus complete homepage showcase.
- `haier-product listing default.png`: complete listing showcase, desktop export explicitly captioned.
- `haier-product detail.png`: approved purchase-controls crop plus complete export.
- `haier-checkout.png`: complete checkout export.
- `haier.png`: original social image remains in the preserved metadata/assets.

Responsive WebP derivatives are made only from existing pixels. Full-size original files remain linked. There are no fabricated mobile screens, before screenshots, interviews or component boards. The before/after comparison is explicitly a written hierarchy comparison. Existing desktop exports do not illustrate every described state; the migration preserves both the documented design reasoning and the authentic exports without adding evidence.

## Outcomes and conflicts

Authoritative Results: **+31% Online sales / 3 months post-launch; −20% Bounce rate / Homepage → category; +40% Faster product discovery / Usability testing; +15% Session duration / Average session.**

Attribution is unchanged: “Performance metrics were provided by the product management and development teams following deployment.” The analytics-access limitation is retained; it does not invalidate these owner-verified outcomes.

Conflicting original annotations remain documented in `docs/HAIERMALL-EVIDENCE.md`, not published as extra outcomes: absolute “20% bounce rate” (original line 689), −32% (712), +25% (814). Baymard's 95% and 17% statements remain explicitly external research context, separate from HaierMall results. Historical WCAG 2.1 AA design scope remains source copy; it is not presented as a certification of this portfolio.

## Navigation and preservation

- Subscribe Me source H1: “Contributing to a Car Subscription Platform That Reached 100K+ Downloads” (original line 478). Canonical destination verified: `/case-studies/subscribe-me-case-study.html` (line 33). This existing page remains unchanged.
- Original HaierMall title, description, canonical, OG/Twitter metadata and Article JSON-LD are reused verbatim. Existing `#results-grid` and `#callouts` anchors remain.
- All 68 original source files remain hash-checked; only HaierMall's generated HTML is now owned by Astro. The other seven original HTML outputs and all original assets remain byte-identical.
- The homepage and shared navigation/theme components were not changed by this migration. Earlier uncommitted About/Contact/navigation refinements are retained.
- No production analytics executes on the local candidate. Production integration remains outside this local review task.
- The complete content and source coverage were reviewed before replacing the slice footer. The self-contained page no longer sends visitors to an older version for its story.

## Validation and owner review

Build, Astro diagnostics, source-preservation tests and browser verification are recorded in the task output. Browser evidence: `review/haiermall-complete/verification.json`; full-page and section screenshots: `review/haiermall-complete/`.

Final results: build succeeded; Astro check returned 0 errors, 0 warnings and 0 hints; all 22 tests passed. Both themes at 1440, 768, 390 and 320px returned no horizontal overflow and zero axe WCAG A/AA violations. Images decoded, shared header geometry matched the homepage, chapter links resolved, keyboard focus/menu/Escape and theme persistence passed. All seven sections, five findings, four showcases, learnings and metrics remained available with JavaScript disabled.

Review the editorial headings, pacing, four visual subsections and next-project transition. New connective headings summarize existing reasoning; no new research or performance results were added. Automated accessibility checks supplement keyboard and responsive testing; they are not a WCAG certification.

The Taste inspector was also run. Its generic rules flagged the approved mixed typography, identity labels, ruled finding rows, static presentation, and long source headings; those do not override this project's approved direction. It also undercounted lazy-loaded screenshots and used a 200px-high viewport at 320px. The dedicated Playwright run decoded all six images, inspected all four required widths at 900px height, and checked actual overflow. No claim is made that the Taste heuristic report is clean. Manual visual review kept the spacious source-led composition and removed a duplicate handoff summary.
