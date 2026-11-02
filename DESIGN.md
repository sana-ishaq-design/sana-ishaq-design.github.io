---
name: Sana Ishaq — editorial portfolio slice
description: Phase 1 representative Hero and HaierMall chapter; approved hybrid composition with verified published outcomes.
colors:
  first-light: "#F2F4EA"
  forest-ink: "#293C34"
  juniper-dusk: "#202F2A"
  ivory-ink: "#EDF1E4"
  mineral-blue: "#567C91"
  light-link: "#416579"
  dark-link: "#A8CADB"
  light-muted: "#52665C"
  dark-muted: "#BDCEC2"
  light-image-ground: "#DFE7DF"
  dark-image-ground: "#30443C"
  light-edge: "#C8D3C9"
  dark-edge: "#4C6257"
typography:
  display:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "clamp(48px,5.278vw,96px)"
    fontWeight: 480
    lineHeight: 1.21
    letterSpacing: "-.04em"
  project-title:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "clamp(42px,4.444vw,80px)"
    fontWeight: 480
    lineHeight: 1.2
    letterSpacing: "-.04em"
  body:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "17px"
    lineHeight: 1.7
  text-link:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.6
  evidence-body:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "16px"
    lineHeight: 1.7
  outcome-value:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "clamp(56px,6.1vw,92px)"
    fontWeight: 450
    lineHeight: 1.12
    letterSpacing: "-.03em"
  outcome-value-mobile:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "clamp(44px,13.33vw,56px)"
    fontWeight: 450
    lineHeight: 1.12
    letterSpacing: "-.03em"
  evidence-note:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "15px"
    lineHeight: 1.7
spacing:
  gutter: "clamp(24px,5.556vw,100px)"
  work-intro-separation: "52px"
  outcomes-top: "72px"
  outcomes-top-mobile: "56px"
  outcomes-gap: "48px"
  outcomes-gap-mobile: "36px"
---

## Overview

Experience mode. The portfolio is the gallery; the projects are the artwork. The approved hybrid combines the editorial Hero with quiet Selected Work and original project imagery. This is the /phase-1.html review slice; production homepage replacement remains outside scope. The decision register and approved external hybrid-proposal boards establish visual authority. src/styles/editorial.css is authoritative for implemented measurements.

## Colors

Frontmatter records the semantic palette from src/styles/editorial.css. First Light pairs a pale canvas with Forest Ink; Juniper Dusk pairs a deep green canvas with Ivory Ink. Theme-specific links and muted text preserve contrast. Artwork retains original colors. CSS follows system preference unless an explicit theme is selected; review preference uses a separate storage key from the legacy site.

## Typography

Self-hosted Manrope Variable leads functional UI and narrative; Instrument Serif provides editorial emphasis. Licenses are included in font packages. Frontmatter records desktop roles. Hero serif emphasis is 1.158em with line height 1; project-title emphasis is 1.14em. Selected Work is a quiet 17px/1.7 label at weight 450. Hero body and project introduction are 17px/1.7. The proposed question uses clamp(26px,2.5vw,40px), line height 1.3 and tracking -.025em.

At 1100px and below, Hero type uses clamp(40px,5.2vw,60px) and project titles use clamp(36px,4.444vw,52px). Between 651px and 850px, Hero type uses clamp(48px,7vw,60px). At 650px and below, Hero type uses clamp(30px,9.23vw,46px), line height 1.22 and tracking -.035em; serif emphasis is 1.17em. Mobile project titles use clamp(30px,9.49vw,46px), line height 1.18 and serif emphasis 1.216em. Section label and body are 16px; proposed question is 24px/1.38. Mobile control text is 16px. Preserve phrase-aware wrapping and existing Hero wording. Outcome values use the frontmatter outcome roles, tabular numerals and link color; labels are 16px/1.7. Context is 15px/1.7 on desktop and 14px on mobile. Shared attribution uses 15px/1.75 on desktop and 14px on mobile.

## Layout

Desktop Hero places the headline left and supporting copy/actions right. At 1440px: 80px gutters, 48px Hero top spacing, 176px bottom spacing; support begins 142px below its column top. Quiet Selected Work sits 52px above the project heading. The gutter scales from 24px to 100px. At 1800px and above the frame also respects a centered 1640px interior.

At 1100px and below the two-column Hero narrows. Between 651px and 850px it becomes one column with support offset 45%. At 650px and below it stacks, uses 24px mobile gutters and replaces desktop navigation with Menu. Mobile Hero top/bottom spacing is 32px/112px; support starts 44px below the headline.

The image field spans the viewport and clips a single original homepage screenshot. Desktop field height is clamp(440px,45.14vw,820px); image width 77.78%, left 11.11%, top 10.77%, rotation -2 degrees. Mobile field aspect ratio is 390/420; image width 128.2%, left -14.1%, top 8.57%, no rotation. Preserve this composition without extra screenshots or an artifact-label strip.

Outcomes sit directly after the image field and before the proposed question. Four results use equal desktop columns with the outcome gap token; one and two use their actual count, while three use three equal columns. The one-result column caps at 740px. At 1100px and below, four results become two equal columns with 40px row and 48px column gaps; other multi-result layouts use a 28px gap. At 650px and below, every count becomes aligned rows with a value and its supporting text in two equal columns, a 24px column gap and the mobile outcome gap between rows. Attribution follows the results group with 32px top spacing, increasing to 36px on mobile.

## Elevation & Depth

Artwork is flat, with no shadow. Cropping, whitespace and tonal image ground create separation. The only implemented shadow separates the mobile Menu panel (0 20px 24px -24px #10271f50). No decorative glow, gradients or glass.

## Shapes

Square-cornered project imagery clips at the field boundary. The theme selector remains native, unrounded and ordinarily borderless. No decorative badges or card wrappers.

## Components

Semantic header/nav/main/section/article/figure/footer provide structure. Real links lead to preserved content. Underlined text links have a 44px minimum target height. Focus uses a 3px link-colored outline with 6px offset. Hover moves icons 2px right/up; reduced motion removes travel and smooth scrolling. Forced colors preserves usable native controls and focus.

The labeled System/First Light/Juniper Dusk selector is disabled until hydration. No-JavaScript content follows CSS system preference. Native mobile details supports Escape and focus return; without JavaScript its open panel stays in flow. Mobile menu and selector targets are at least 48px high.

The question remains visibly labeled Proposed copy · pending verification. Published results are verified and owner-approved; the existing case-study Results section is authoritative. src/content/haiermall.ts preserves four exact records: +31% Online sales (3 months post-launch), −20% Bounce rate (Homepage → category), +40% Faster product discovery (Usability testing), and +15% Session duration (Average session). Missing analytics artifacts do not invalidate this published baseline.

ProjectOutcomes supports one through four owner-approved results with nonempty source and context, and returns null for no qualifying records. HaierMall uses one shared attribution—“Performance metrics were provided by the product management and development teams following deployment.”—followed by a single “Published results and reporting context” link to /case-studies/haiermall-case-study.html#results-grid. Each result retains its label and context without a separate source link when shared attribution is present. Keep results unboxed, with no cards or decorative wrappers. Original copy remains in content/baseline.json and unchanged legacy pages; evidence reconciliation lives in docs/HAIERMALL-EVIDENCE.md.

## Do's and Don'ts

- Do preserve approved copy and metadata and keep proposed copy visibly pending.
- Do use original imagery and the approved single-image field geometry.
- Do validate both themes, keyboard navigation, no-JavaScript behavior and narrow-width reflow. Current evidence is review/restored-outcomes/verification.json: eight required viewport/theme cases, sixteen intermediate cases and thirty-two fixture layouts (one through four outcomes × four widths × two themes), with zero axe violations.
- Don't replace verified published results with placeholders or infer new outcomes.
- Don't add artifact labels, screenshot layers, artwork shadows or decorative cards to this composition.
- Don't expand beyond Phase 1; archive tilted previews and multiple React experiences remain future scope.
