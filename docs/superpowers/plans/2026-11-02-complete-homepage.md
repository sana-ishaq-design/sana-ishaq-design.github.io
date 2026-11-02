# Complete portfolio homepage

**Authorization:** Latest milestone attachment 55ac0280-85db-46fd-af1a-8f802136c6c2. Complete locally without intermediate creative approvals. Same feature branch; no push, deployment or silent legacy changes.

**Architecture:** New complete static candidate /homepage.html alongside the preserved /phase-1.html and eight immutable legacy pages. Keep the exact approved Hero markup and CSS; add scoped full-homepage styles, reusable native navigation/theme and static project-note pages with progressively enhanced desktop dialogs. Existing production root stays byte-identical until a publication decision.

## Content and art-direction rulings
- Three full-width featured chapters: original HaierMall untouched; Subscribe Me (published homepage alias Subscribe a Car) uses original mobile UI; UTWorX uses original enterprise interface.
- HaierMall results retain exact values, definitions and attribution. Subscribe Me contribution stays UI Designer, Delivery Phase; published download milestone is attributed to the product. UTWorX delivery evidence is labeled scope, not measured business impact.
- Process, Services, About and Contact use active source copy from index.html, excluding commented content. Section titles/labels can organize that copy, without changing facts or claims.
- Archive supports the four actual projects with source-backed notes, including featured projects. Missing reference-only projects are not invented. Original legacy Archive URL remains.
- All four new project-note routes are statically readable. Desktop ordinary click/Enter may open native route-aware dialog; mobile/modified clicks/direct visits/refresh use full pages. Browser Back closes/restores focus/scroll; Forward reopens. Reduced motion and no-JS fallback work.
- Candidate pages are noindex during local review. Preserve original SEO title/description/social text and root canonical; document and omit the broken optional profile-photo schema path in the candidate; the About illustration is not a portrait. No analytics added to local preview.
- Preserve both resume PDFs; use existing published download link without deciding a replacement/current version. No unfinished demo links.

## Tasks
- [x] RED tests for complete section order, exact locked Hero, original Haier article, note routes/static content, source-only projects and preview metadata.
- [x] Extract active source text into local content data with provenance; generate responsive derivatives from authentic assets only.
- [x] Build complete homepage, varied featured compositions, Process, numbered Archive, Services, About, Contact and professional footer. Reuse current theme tokens and toggle.
- [x] Implement static notes and native route-aware Archive interactions, desktop floating/focus previews, responsive navigation and no-JS fallback.
- [x] Build/check/tests and full-page 1440/768/390/320 captures in both themes. Validate links/assets/metadata/static HTML; axe, focus, Escape, history/direct refresh, touch/mobile, persistence, reduced motion and narrow reflow.
- [x] Inspect sections at real scale as well as full-page captures. Fix material gaps in one batch, independent finish review, accurate docs/tokens. Commit locally and stop for owner review.

## Files
New src/pages/homepage.astro, src/pages/projects/[slug].astro, src/components/{FullNavigation,FeaturedProjects,Archive,ProjectNote,HomepageSections}.astro, src/content/{homepage.json,projects.ts}, src/styles/homepage.css, scripts/review-homepage.mjs, tests/homepage.test.mjs. Extend derivative generation in scripts/prepare-public.mjs. Do not modify phase-1.astro, editorial.css, ThemePreference.tsx or legacy sources.
