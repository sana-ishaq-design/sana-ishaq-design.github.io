# Homepage refinement and Archive — 10 November 2026

## Scope and preservation

Baseline: homepage-refinement at 55acef208564633a0b25957e9f16033bc83c37c2. Before captures: review/homepage-refinement/before (24 viewport screenshots). Production main remains bb92411ebb56f45afdbe80dc48c8c698133cfe91.

Affected surfaces: homepage Hero actions, HaierMall closing, existing About specialisms, Contact, homepage footer, shared Archive component and new /archive.html. Keep the Hero title/layout, other featured projects, Process, Services design, About introduction, all four complete case-study sources and existing collection unchanged. CompactFooter is separate so Barcode Studio's raw shared footer remains untouched.

## Implemented

- Hero editorial links: Explore Selected Work to #selected-work; Get in Touch to #contact.
- HaierMall: remove proposed design-question copy, redundant introduction and long homepage attribution; preserve the original full-width artwork and four exact outcomes; one right-aligned Read Full Case Study link.
- About: owner approved one nested Expertise, demonstrated subsection using the existing specialisms as four concise, evidence-linked groups. No additional top-level Expertise section. Introductory composition is preserved as actually implemented; the prior baseline is not a two-column layout.
- Contact: forest surface, centered editorial headline and concise client/hiring-team invitation, one verified email CTA.
- Compact two-row footer on homepage and Archive only, with Work, Archive, LinkedIn and Email.
- Services: original descriptions and design preserved. Remove the homepage UX Audit service-page promotion; retain the established legacy route, without new packages/prices or a service-page redesign.
- /archive.html shares the homepage dataset, numbered row/popup implementation and empty state. No categories or pagination. Existing legacy Archive and project-note URLs remain available.
- Retained popup improved for mobile as well as desktop, hash links, Back/Forward, direct fragments, keyboard focus trap/return and Escape. No-JS detail content is available when verified entries are published.

## Content gate and metric evidence

No eligible archive project is ready for publication. All four source-backed projects (HaierMall, Subscribe a Car/Subscribe Me, UTWorX and Barcode Studio) have full cases and are explicitly excluded from Archive. Reference-only names include SNO, PeelAways, All Hung Up, Sophie Blake, Gentleman's Community, DesignerOS, PPA and Bone Broth; the visual references establish names, not verified role/contribution, project copy or authentic individual assets. None are published. Both Archive surfaces honestly say no smaller projects are published yet.

HaierMall source: case-studies/haiermall-case-study.html Results block (data-target=31/20/40/15), especially lines 959–968 for +15% Session duration / Average session. Existing src/content/haiermall.ts records the owner-approved exact results and links to #results-grid. Retain +31%, −20%, +40%, +15% with their distinct definitions. Reporting attribution remains in the unchanged complete case study: product management and development teams. No individual causal claim or new measurement is added.

## Blocked decoration

The owner specified design-references/approved-homepage-hero-gradient-reference.png. This file is absent from the repository and parent workspace. The three available original visual-reference images contain no approved atmospheric gradient. Do not invent a substitute: Hero background remains unchanged until the exact reference is available.

## Validation and staging

35 regression tests passed. Browser checks exercise homepage and Archive at 1440/1024/768/390/320 in both themes, including axe, overflow, Hero links, evidence links, mobile navigation, theme persistence and screenshot capture. Popup keyboard/history behavior is tested with an isolated browser-only QA fixture at 1440 and 320; no fixture or fabricated project is published. Actual archive-project imagery/long-note QA awaits authentic entries.

Preview configuration is opt-in. The new staging-only Archive route uses its preview canonical and noindex. Existing production metadata/configuration is not edited. Production main/Pages settings must remain unchanged. Complete results and public screenshots are recorded under review/homepage-refinement/public after deployment.
