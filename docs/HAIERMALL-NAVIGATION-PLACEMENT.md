# HaierMall targeted follow-up — 3 November 2026

## Duplication audit
The live rendered DOM contained one main, one hero (`the-project`), one outcome list, one problem introduction and seven unique major section IDs. No duplicate IDs were found. Both route files render one shared case document; they do not nest or render each other. No substantive section was removed. The opening crop and full homepage export serve overview and detailed-evidence purposes respectively.

New regression assertions pin the single hero/introduction/metrics group. Final full-page images are native browser screenshots, not stitched scrolling captures.

## Targeted changes
- `src/components/HaierMallCase.astro`: chapter navigation moved below introduction/artwork/metrics; homepage decisions precede their visual evidence; preload existing Manrope and Instrument Serif italic files without changing typography.
- `src/components/CaseChapters.astro`: numbered links from the existing section array; active underline without width-changing weight; viewport-based active detection; sticky-header resize observation; stable-width compact current-section label.
- `src/styles/haiermall-case.css`: matching seven-section numbering; shared header remains the same component and appearance, with desktop sticky positioning scoped to HaierMall; checkout explanation left-aligned below its heading; consistent reading measure and decision/image spacing.
- `tests/case-chapters.test.mjs`: ordering and duplication regressions.

All prior source content, four verified outcomes and contexts, attribution, imagery, canonical/metadata, next-case and catalog links remain intact. No homepage or other case-study content changed. Compact/no-JavaScript chapter navigation retains the previously verified in-flow fallback.

## Review evidence
Browser scripts and screenshots: `review/haiermall-navigation-placement/`. The matrix covers First Light/Juniper Dusk at 1440, 1024, 768, 390 and 320px, including duplicate IDs/content, common heading left edges, keyboard jumps, active section, sticky offsets, hash Back/Forward, refreshed fragments, theme persistence, no-JavaScript heading visibility, image decoding and axe checks.

An initial loading probe found small font-swap shifts (about 0.001 desktop and 0.038 mobile). Existing font files were preloaded and chapter-label geometry stabilised. Browser measurements describe local observed behavior, not a guarantee for every network/browser condition.

Final verification: build and all 23 tests passed; Astro returned zero errors/warnings/hints. Both themes at all five widths passed with no overflow, duplicate IDs or axe violations. Final loading probes observed zero layout shift at 1440 and390px. An independent review also checked 12 direct-fragment arrivals (`purchase-journey`, `results-grid`, `callouts` at1440/390 with JS on/off); all destination headings remained visible.

No push, merge or deployment. Await visual approval before applying the template to another project.
