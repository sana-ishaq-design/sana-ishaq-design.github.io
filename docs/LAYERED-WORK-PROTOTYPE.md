# Layered Selected Work — isolated visual review

Status: prototype for visual approval; not integrated into the redesigned homepage.
Route: `/layered-work.html` (staging base `/portfolio-preview/`).

## Composition and scope

- Reuses the centered Hero and its existing artwork, shader, runtime, content and navigation. Hero content height at 1440 × 1000 remains 632.97px.
- Moves the registered artwork/canvas planes together 120px into the next section (64px at <=800px), without resizing images or changing Hero content height. A gradual visual-only alpha mask dissolves the foreground. Local feathered theme-color gradients protect the small Selected Work label and catalog link.
- Reuses the approved HaierMall bento component and outcome data. Both headline lines are left-aligned in this prototype. No source changes to the approved component.
- Subscribe a Car: original Subscribe Me mobile interface assets, Sprint 4 joining context, UI Designer — Delivery Phase, AW Rostamani / RBB Global attribution. No new performance or personal six-sprint claim. Sources: approved Subscribe case study and `src/content/subscribe-story.ts`.
- UTWorX: authentic dashboard and existing mobile detail crop; 16 screens, three user roles, two weeks, zero functionality changes are delivery scope, not measured impact. Explicit formal-usability-metrics limitation retained. Source: approved UTWorX case study.
- Shared downstream sections, case study routes and catalog (including Barcode Studio) remain available and unchanged.

## Interaction and accessibility

Native CSS sticky panels, 20px stepped offsets and 80px document-flow spacing. No scroll listener, scroll hijacking, scale, rotation, shadow or animation framework added for the stack.

Stack activates only at >=1100px wide, >=900px high, with no reduced-motion preference AND when all panels fit beneath the measured header with clearance. Otherwise ordinary flow. Print and no-JavaScript are ordinary flow. At tested 1440 × 1000 the panels fit; 1024/768/390/320 widths are static.

Keyboard `:focus-visible` restores every panel to ordinary flow. A focus handler then centers the focused link. Forward/backward Tab testing checks its outline, viewport clearance and topmost hit target, including entering the covered first panel.

All project text, metrics, figures and links are server-rendered Astro HTML. Images retain aspect ratios; mobile screen sequences use intentional viewport crops, with complete evidence in their linked case study. No new dependency or image fabrication.

## Local verification

- Standard Astro build and preview build pass.
- `npm run check`: zero errors/warnings; two pre-existing unused-import hints in the density-texture review script.
- 36 existing regression tests pass, including all four detailed case studies and original asset preservation.
- Staging verification: 18 HTML pages noindex; excluded pricing output remains absent.
- Chrome at 100% zoom: 1440, 1024, 768, 390 and 320px, both themes. No overflow, failed images, browser errors or broken project/catalog destinations.
- Automated axe WCAG A/AA checks cover the Hero, shared header, project collection and transition row. This is not manual screen-reader certification.
- Minimum sampled transition-text contrast: 4.71:1 light / 5.94:1 dark across tested sizes and animation frames. Pixel sampling supplements axe over the artwork.
- Forward/reverse stack, natural release, short viewport, reduced motion and no-script fallbacks verified.
- Screenshots and scroll recordings are ignored local evidence under `review/layered-work/`; they are not shipped as website assets.

## Review boundaries

No homepage replacement until visual approval. No edits to existing Hero files, homepage sections, shared components, detailed case studies, theme tokens, production routing or deployment workflow. Only new prototype-specific source, review scripts and this document.

Limitations: native sticky effect is deliberately unavailable on small/short screens; full browser QA uses desktop Chrome viewport emulation, not physical-device or assistive-technology certification. Existing atmosphere GPU safeguards and static mobile fallback are preserved.

## Load stability correction (prototype only)

A cold-load comparison reproduced the existing controls-row removal and font-swap shifts in the approved bento page (approximately 0.46 cumulative shift in that run). This new route preloads the exact existing Latin font files and suppresses the temporary controls row while it is inside the Hero; the existing runtime still moves the controls after the footer and makes them available there. No Hero component, typography or animation source was edited. The repeated local comparison measured zero load/scroll shifts for this route. Final public recordings retain measured performance evidence; results are environment-specific, not a Lighthouse/Core Web Vitals guarantee.
