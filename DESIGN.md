---
name: Sana Ishaq — editorial portfolio slice
description: Phase 1 representative Hero and HaierMall chapter; pending owner visual approval.
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
    fontSize: "clamp(48px,6.05vw,96px)"
    fontWeight: 480
    lineHeight: 1.09
    letterSpacing: "-.04em"
  editorial:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(52px,5.5vw,88px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-.025em"
  project-title:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "clamp(42px,5.4vw,84px)"
    fontWeight: 480
    lineHeight: 1.08
    letterSpacing: "-.04em"
  artifact-label:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(36px,4.1vw,64px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-.025em"
  body:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "18px"
    lineHeight: 1.75
  introduction:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "22px"
    lineHeight: 1.7
    letterSpacing: "-.015em"
  text-link:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.6
  evidence-body:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "16px"
    lineHeight: 1.7
  evidence-note:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "15px"
    lineHeight: 1.75
spacing:
  gutter: "clamp(20px, 5vw, 80px)"
  work-intro-separation: "88px"
---

## Overview
Experience mode. The portfolio is the gallery; the projects are the artwork. Source authority is the user's decision register and original homepage exploration. This is a review slice at /phase-1.html, not a replacement production homepage. Both themes and all four viewport compositions are developed together.

## Colors
Semantic variables in src/styles/editorial.css are normative. Light canvas/ink #F2F4EA/#293C34; dark #202F2A/#EDF1E4. Functional blue #416579 in light, #A8CADB in dark. Signature #567C91 is reserved for appropriate decorative use. Muted text #52665C/#BDCEC2. Image grounds #DFE7DF/#30443C. Artwork retains its original colors. System preference is CSS-driven; explicit preference persists separately from the legacy site's theme key.

## Typography
Self-hosted Manrope Variable and Instrument Serif; licenses included in font packages. Sans leads functional UI and narrative. Serif is a large editorial emphasis only. Frontmatter records desktop type roles. At 1000px and below, the Hero uses clamp(48px,7.1vw,72px). At 650px and below, Hero type uses clamp(32px,9.2vw,46px), line height 1.15 and tracking -.035em; the editorial section heading is 56px; project titles use clamp(36px,10.5vw,48px), line height 1.12; artifact labels are 48px; Hero body is 17px/1.8 and introduction copy is 20px/1.75. Hero serif emphasis scales to 1.085em on desktop and 1.13em on mobile; project-title serif emphasis is 1.12em. Display uses fluid sizing; mobile separates audience and promise with phrase-aware serif wrapping. Existing long Hero wording is preserved even where it needs more than two lines. Functional labels are at least 15px, with 16px mobile controls. Long-form measure and line height remain readable at 320px.

## Layout
One quiet frame, full-viewport project image field, wide gaps between ideas. At 1440: 72px gutters, 118px Hero top spacing, 168px Hero bottom spacing, 88px work-intro separation. Copy and actions form one offset group (34% desktop, 15% tablet). At 390/320: 20px gutters, identity/Menu header, single-column narrative and sequential larger authentic crops. Compact header starts at 650px. Whitespace is intentional, never compressed to satisfy a viewport fill score.

## Elevation & Depth
The authentic desktop screenshot collage carries soft offset shadows to separate overlapping white screens. The mobile Menu panel has a shallow separating shadow. No card containers, decorative glow, gradients or glass. Images are cropped by the editorial field rather than passed off as a functional product.

## Shapes
Unrounded project imagery. Native select control. No decorative badges.

## Components
Semantic header/nav/main/section/article/figure/footer. Real links to preserved content. Native labeled System/First Light/Juniper Dusk selector; 44px minimum control height, 3px focus outline with 6px offset. Disabled honestly until hydration; no-JavaScript content uses system color preference. Reduced motion removes scroll/hover travel; forced-colors keeps native controls and focus usable.

### Artifact evidence and copy
Prominent Instrument Serif artifact labels follow the artwork: Homepage, Product detail and Checkout. The visible note distinguishes deliverables from measured outcomes; outcome figures await confirmation. The shorter introduction is labeled for approval. Original copy remains in content/baseline.json and unchanged legacy pages. Native mobile details supports Escape/focus return and breakpoint changes; without JavaScript the open panel stays in flow. Original-pixel crops: homepage (120,140,1200,1000), detail (450,200,900,570).

## Do's and Don'ts
- Preserve copy and metadata unless specific edits are approved.
- Do not feature disputed metrics or attribution claims.
- Do not add content, images, animation or cards just to satisfy a generic detector.
- Do not expand beyond Phase 1. Archive tilted previews and multiple React experiences remain future scope.
- Validate existing output files against the audited Git blobs before building.
