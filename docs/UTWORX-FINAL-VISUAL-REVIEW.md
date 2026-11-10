# UTWorX — final visual comparison

5 November 2026. Compared actual Chromium rendering against approved HaierMall and Subscribe a Car at 1440px and 390px in First Light and Juniper Dusk. The wider UTWorX browser matrix covers 1440, 1024, 768, 390 and 320px.

## Assessment
- Editorial quality: consistent Manrope/Instrument Serif hierarchy, Mineral Blue emphasis, shared canvas colors and generous reading space. UTWorX retains a more analytical structure suited to operational software.
- Hero: clear central constraint, authentic dashboard opening and role/team context. The longer mobile headline is intentional and remains readable; no need to compress or redesign it.
- Visual evidence: full dashboard establishes context; charts and task-form crops explain specific decisions. Complete originals remain accessible. Native interface colors are preserved in both themes.
- Rhythm: audit findings, chart composition, workflow sequence, task details and reflective prose provide distinct treatments without generic cards. Delivery scope remains clearly separated from measured usability outcomes.
- Navigation: shared header, active chapter rail, mobile jump menu and visible keyboard focus remain consistent. Ending provides next-project, catalog and contact routes with appropriate spacing.

## Two confirmed minor fixes
1. UTWorX used font-character arrows, visibly smaller and inconsistent with approved link icons. Replaced only UTWorX arrows with the existing shared Arrow component; matched next-project icon sizing. Link destinations and wording unchanged.
2. Mobile reporting and maintenance detail crops cut the right edge of Export/Upload Excel controls. Extended those two crop windows to the original image's right boundary, retaining their focused scale and complete-original links.

No other visual defect justified changing the approved compositions. No project copy, metrics, hero layout, metadata, routing or shared component was edited.

## Evidence and checks
- Final comparison gallery: review/utworx-final-comparison/index.html. Individual captures and comparison.json are alongside it.
- Current UTWorX regression evidence: review/utworx-implementation/results.json.
- Build passed; Astro checked 70 files with zero errors, warnings or hints; 26/26 regression tests passed.
- Before/after hashes confirm HaierMall/Subscribe page and style files, FullNavigation and CaseChapters unchanged (six files).
- Automated checks are not manual screen-reader certification. Full-resolution originals remain necessary for exhaustive inspection of dense desktop records on phones.

## Files changed in this review
Product: src/pages/case-studies/utworx-case-study.astro; src/components/UtworxScreen.astro; src/content/utworx-crops.json; src/styles/utworx-case.css.
Review-only: scripts/compare-utworx.mjs; docs/UTWORX-FINAL-VISUAL-REVIEW.md; screenshot galleries/results and baseline hashes under review/.

Recommendation: approve UTWorX as the next portfolio case-study baseline after owner review. No push, merge or deployment performed.
