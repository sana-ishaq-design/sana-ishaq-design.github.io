# Phase 1 corrections and metric provenance — 10 November 2026

## Scope

Baseline cafc8a254d8efc38a2404e29b17ad702f5d3da88 on homepage-refinement. Move Hero links below the unchanged supporting paragraph. Make About a two-column introduction/expertise composition at desktop, naturally stacked at 900px and below. Use the owner's exact four Core Expertise groups and descriptors without project names or links. Preserve personal copy, Process, homepage Services, Contact, footer, HaierMall outcomes and all four case-study sources.

The preview preparation removes ux-audit-service-page.html physically from dist-preview and unwraps any navigation links to that route. It removes the staging sitemap as before. Default dist output and original source still retain the production route. A workflow assertion checks exclusion and noindex before publishing. Legacy HTML fragments now also receive noindex even without an explicit closing head tag.

No gradient, animation or Phase 2 seasonal features are implemented. Archive remains the existing honest empty state with shared infrastructure.

## Metric provenance: published claims are not independent verification

The actual available record is the original case-study HTML, its team-attribution statement, and the owner's earlier confirmation. Derived content datasets, migration documents and regression tests repeat or preserve that record; they do not independently substantiate performance.

| Outcome | Actual available source | Independent supporting record available? |
|---|---|---|
| +31% online sales | case-studies/haiermall-case-study.html, Results lines 921–933: target 31, +%, Online sales, 3 months post-launch | None found in supplied material. No sales export or dated team report inspected. |
| −20% bounce rate | Same file, Results lines 934–945: target 20, −%, Homepage → category | None found. No funnel analytics/report defining denominator and comparison periods inspected. |
| +40% faster product discovery | Same file, Results lines 946–957: target 40, +%, Usability testing | None found. No usability protocol, timing dataset or test report inspected. |
| +15% session duration | Same file, Results lines 958–970: target 15, +%, Session duration / Average session | **No independent supporting source found.** No session-duration analytics export, dashboard evidence or team report inspected. |

Lines 913–916 attribute performance figures to product management and development teams and explicitly state raw analytics dashboards were not directly accessible during the case study. That is reported provenance, not a separately supplied team attestation. Earlier owner approval remains content authority; it is not a new analytics artifact. Absence of independent evidence does not prove any figure false. This task leaves all four numbers and their attribution unchanged.

Search scope: original HaierMall HTML and authentic image assets; src/content/haiermall.ts and project story/collection content; prior evidence/audit/migration notes; handoff folders 01–06; available PDF/spreadsheet inventory. The available Search Console workbook contains portfolio search-performance sheets (Queries, Pages, Countries, Devices, Search appearance, Filters), including portfolio URLs. It is not a HaierMall sales, bounce, session-duration or usability report. Available PDFs are resumes and Barcode Studio decisions, not HaierMall outcome evidence.

Future independent corroboration would require a dated team report or source export with the metric definitions, comparison periods, and—for discovery—the testing method and timing results. No such record is invented here.

## Verification

Tests assert exact expertise text and absence of project links, unchanged introduction/neighboring sections/case sources, desktop two-column About and stacked mobile geometry, CTA left alignment below the paragraph, accessible themes, navigation and pricing 404. The preview workflow runs the production build, Astro checks, regression suite, preview build and output exclusion assertions. Browser evidence and logs: review/phase1-corrections-*.log and review/homepage-refinement/{local,public}. Final results are reported after deployment.
