# HaierMall editorial refinement — 3 November 2026

## Inspection and scope
The complete migration already contained all five audit findings, six design explanations, four showcases, four learnings and credits. The legacy completeness CTA was already removed. No substantive content gap was found. Retained the seven approved chapters rather than inventing chapters to match a generic suggested outline.

## Changed files
- `src/components/CaseChapters.astro` — new reusable section navigation accepting ID/label pairs. Real fragment links, active chapter, compact native details menu, Escape/focus handling, native history and reduced-motion support. It is sticky only after progressive enhancement; without JavaScript it stays in flow so the expanded menu cannot obscure destination headings.
- `src/components/EditorialProse.astro` — reusable paragraph grouping, two source sentences per paragraph. Every source sentence and its order remain intact.
- `src/components/HaierMallCase.astro` — integrates chapters/prose, descriptive screenshot captions, Next Case Study and All Case Studies navigation.
- `src/components/HaierScreen.astro` — consistent original-image presentation, descriptive captions and individually named full-size inspection links.
- `src/styles/haiermall-case.css` — shared column proportions, aligned full-width image boundaries, left-aligned question/callouts/product explanation, cohesive purchase-control takeaway, scroll offsets and spacing.
- `tests/case-chapters.test.mjs` — static navigation and image-inspection regression checks.
- Local browser scripts/screenshots in ignored `review/haiermall-editorial-refinement/`.

## Preserved
Homepage/shared global navigation and theme component unchanged. Original metrics, attribution, source text, assets, metadata, Article JSON-LD, canonical route and historic fragments unchanged. Other case studies and catalog remain unchanged, as previously requested. Catalog and next-project destinations remain real existing pages. No new packages, production changes, push or deployment.

The global header matches the homepage and is not currently sticky. The chapter rail accounts for a sticky/fixed global header if that shared implementation changes later; this task does not alter the homepage header behavior.

## Review evidence
Final verification completed after the no-JavaScript fix: build passed; Astro reported 0 errors, warnings or hints; all 23 tests passed. All ten viewport/theme combinations passed with zero axe violations and no horizontal overflow. Native no-JavaScript chapter navigation now leaves the destination heading visible. Final full-page screenshots were refreshed after this fix.

`review/haiermall-editorial-refinement/verification.json` covers both themes at 1440, 1024, 768, 390 and 320px. Checks cover semantic/static content, header consistency, image loading, overflow, keyboard focus, active chapter, destination visibility, native hash Back/Forward, direct refresh, menu Escape, theme persistence and no-JavaScript reading. The open mobile chapter menu has separate axe checks and screenshots in both themes.

All four verified figures remain +31%, −20%, +40%, +15% with their original labels/contexts and attribution. External Baymard figures remain distinguished from project outcomes. The existing annotation conflicts are still documented separately in `HAIERMALL-EVIDENCE.md`; no new factual decision is required for this refinement.

Full-page screenshots are `{light,dark}-{1440,1024,768,390,320}-full.png`. Mobile open-menu views are `{light,dark}-390-jump-menu.png`. Automated checks are not a claim of full WCAG certification. Await owner visual approval before work on other cases or deployment.
