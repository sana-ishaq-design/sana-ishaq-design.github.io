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
  hero-body:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "18px"
    lineHeight: 1.75
  editorial-emphasis:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "1.158em"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-.025em"
  display:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "clamp(48px,5.278vw,96px)"
    fontWeight: 480
    lineHeight: 1.16
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

Self-hosted Manrope Variable leads functional UI and narrative; Instrument Serif provides editorial emphasis. Licenses are included in font packages. Frontmatter records desktop roles. Hero serif emphasis is 1.158em with line height 1; project-title emphasis is 1.14em. Selected Work is a quiet 17px/1.7 label at weight 450. Hero body is 18px/1.75 with pretty wrapping and a 52ch maximum; project introduction remains 17px/1.7. The proposed question uses clamp(26px,2.5vw,40px), line height 1.3 and tracking -.025em.

At 1100px and below, Hero body is 16px and Hero type uses clamp(40px,5.2vw,60px) and project titles use clamp(36px,4.444vw,52px). Between 651px and 850px, Hero type uses clamp(48px,7vw,60px) and Hero body is 17px/1.75. At 650px and below, Hero type uses clamp(30px,9.23vw,46px), line height 1.22 and tracking -.035em; serif emphasis is 1.17em. Mobile project titles use clamp(30px,9.49vw,46px), line height 1.18 and serif emphasis 1.216em. Section label and body are 16px; proposed question is 24px/1.38. Mobile control text is 16px. Preserve phrase-aware wrapping and existing Hero wording. Outcome values use the frontmatter outcome roles, tabular numerals and link color; labels are 16px/1.7. Context is 15px/1.7 on desktop and 14px on mobile. Shared attribution uses 15px/1.75 on desktop and 14px on mobile.

## Layout

Desktop Hero places the dominant headline above a spacious supporting row. The headline caps at 1120px with balanced wrapping. The row begins 64px below it: description left, vertically grouped CTAs right, with minmax(0,1fr) / minmax(0,.8fr) columns and clamp(64px,8vw,144px) between columns. Description width caps at 52ch; CTA spacing is 12px. At 1440px: 80px gutters, 48px Hero top spacing and 176px bottom spacing. Quiet Selected Work sits 52px above the project heading. The gutter scales from 24px to 100px. At 1800px and above the frame also respects a centered 1640px interior.

At 1100px and below the supporting row uses a 64px column gap. At 850px and below it stacks naturally with 44px above the description. Between 651px and 850px, the headline caps at 700px and CTAs follow the description with 28px top spacing. At 650px and below, the Hero uses 24px mobile gutters, 32px/112px top/bottom spacing, a description capped at 40ch, and CTAs with 36px top spacing and 8px gaps. Desktop navigation becomes Menu; the header uses a 12px gap and summary padding of 4px 0 4px 8px, retaining 48px targets at 320px.

The image field spans the viewport and clips a single original homepage screenshot. Desktop field height is clamp(440px,45.14vw,820px); image width 77.78%, left 11.11%, top 10.77%, rotation -2 degrees. Mobile field aspect ratio is 390/420; image width 128.2%, left -14.1%, top 8.57%, no rotation. Preserve this composition without extra screenshots or an artifact-label strip.

Outcomes sit directly after the image field and before the proposed question. Four results use equal desktop columns with the outcome gap token; one and two use their actual count, while three use three equal columns. The one-result column caps at 740px. At 1100px and below, four results become two equal columns with 40px row and 48px column gaps; other multi-result layouts use a 28px gap. At 650px and below, every count becomes aligned rows with a value and its supporting text in two equal columns, a 24px column gap and the mobile outcome gap between rows. Attribution follows the results group with 32px top spacing, increasing to 36px on mobile.

## Elevation & Depth

Artwork is flat, with no shadow. Cropping, whitespace and tonal image ground create separation. The only implemented shadow separates the mobile Menu panel (0 20px 24px -24px #10271f50). No decorative glow, gradients or glass.

## Shapes

Square-cornered project imagery clips at the field boundary. The theme toggle is square, borderless and transparent, with a restrained outline icon. No decorative badges or card wrappers.

## Components

Semantic header/nav/main/section/article/figure/footer provide structure. Real links lead to preserved content. Underlined text links have a 44px minimum target height. Focus uses a 3px link-colored outline with 6px offset. Hover moves icons 2px right/up; reduced motion removes travel and smooth scrolling. Forced colors preserves usable native controls and focus.

One real icon-only theme button sits outside Menu beside its summary and remains available with the menu closed. Its 48px square target contains a 20px outline SVG: a moon in First Light and a sun in Juniper Dusk indicate the destination. The accessible name and title update to “Switch to dark mode” or “Switch to light mode.” Hover changes link color to ink; the shared focus outline applies. The button is disabled until hydration, with “Theme switching requires JavaScript” as its accessible name. No-JavaScript content follows CSS system preference. System preference initializes and tracks changes until an explicit light/dark choice; the choice persists under portfolio-review-theme, while denied storage retains the in-memory choice. There is no System reset UI. Native mobile details supports global Escape dismissal and returns focus to its summary even when focus is on the adjacent toggle; without JavaScript its open panel stays in flow. Menu and theme targets are at least 48px high.

The question remains visibly labeled Proposed copy · pending verification. Published results are verified and owner-approved; the existing case-study Results section is authoritative. src/content/haiermall.ts preserves four exact records: +31% Online sales (3 months post-launch), −20% Bounce rate (Homepage → category), +40% Faster product discovery (Usability testing), and +15% Session duration (Average session). Missing analytics artifacts do not invalidate this published baseline.

ProjectOutcomes supports one through four owner-approved results with nonempty source and context, and returns null for no qualifying records. HaierMall uses one shared attribution—“Performance metrics were provided by the product management and development teams following deployment.”—followed by a single “Published results and reporting context” link to /case-studies/haiermall-case-study.html#results-grid. Each result retains its label and context without a separate source link when shared attribution is present. Keep results unboxed, with no cards or decorative wrappers. Original copy remains in content/baseline.json and unchanged legacy pages; evidence reconciliation lives in docs/HAIERMALL-EVIDENCE.md.

## Do's and Don'ts

- Do preserve approved copy and metadata and keep proposed copy visibly pending.
- Do use original imagery and the approved single-image field geometry.
- Do validate both themes, keyboard navigation, no-JavaScript behavior and narrow-width reflow. Current evidence is review/hero-theme/verification.json: eight required viewport/theme cases, sixteen intermediate cases and thirty-two fixture layouts (one through four outcomes × four widths × two themes), with zero axe violations. Keyboard/touch theme operation, system changes, refresh persistence, storage denial, no-JavaScript fallback, 200% text resizing and 320px reflow are covered. Sixteen tests cover the targeted behavior and preservation checks; HaierMall article/data bytes and all project/metrics CSS rules match 05968af.
- Don't replace verified published results with placeholders or infer new outcomes.
- Don't add artifact labels, screenshot layers, artwork shadows or decorative cards to this composition.
- Don't expand beyond Phase 1; archive tilted previews and multiple React experiences remain future scope.
