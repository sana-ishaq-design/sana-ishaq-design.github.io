# Phase 1 hero atmosphere — 10 November 2026

Superseding owner approval permits a CSS-based atmosphere without the previously missing PNG. Scope: homepage background only, on homepage-refinement and isolated staging. No Phase 2 seasonal behavior.

## Implementation

HeroAtmosphere.astro supplies three stationary, smooth vector contours, a separate static fine-grain surface and a translucent mist surface. hero-atmosphere.css uses the existing ivory/forest/Mineral Blue palette, #A8BDB7 sage in First Light and #A1C3BA sage in Juniper Dusk. Intersecting radial/vertical masks concentrate detail lower-left and fade at the right and bottom. Absolute positioning and pointer-events:none isolate decoration from content and layout; aria-hidden and nonfocusable SVG exclude it from assistive technology.

Only mist animates: horizontal 0–6–0px over one 36-second cycle, opacity .12–.15–.12. Terrain and grain never animate. Widths at or below 900px and prefers-reduced-motion:reduce are static; forced-colors and print hide decoration. No animation library, animated grain, animated blur, parallax or moving mountains. A fixed 5px blur softens only the stationary contours.

## Verification

The initial stronger First Light treatment failed actual backdrop sampling at 4.29:1 for the secondary link. Lowering decorative layer opacity resolved it without altering text colors or typography. Final browser checks sample the composited backdrop with text hidden, testing each text area's foreground against background pixels, in addition to axe checks. All sampled normal text passes 4.5:1 and large text 3:1 across 1440, 1024, 768, 390 and 320px in both themes and motion preferences.

Motion QA programmatically samples the animation midpoint (6px horizontal, zero vertical movement, .15 opacity) and duration; verifies zero animations on terrain/grain, no animation for mobile/reduced motion, hidden decoration semantics, noninteractive layers, unchanged hero bounds and no overflow. Screenshots record 1440 and 390px in both themes.

Local production build, Astro diagnostics, 36 regression tests, preview exclusion checks, 20 motion/theme/viewport states and 20 homepage/Archive accessibility/layout/theme/viewport states passed. Public evidence is recorded after staging deployment in review/hero-atmosphere/public; full homepage accessibility results remain in review/homepage-refinement/public. Automated checks are not manual screen-reader certification.

Hero content, navigation, CTA placement, About/Core Expertise, Contact, footer, Archive, metrics and case-study sources are unchanged. Production main and publishing settings must remain unchanged; staging pricing-page exclusion remains asserted before deployment.

## Texture reference refinement — 11 November 2026

Applied the supplied two-theme reference to background treatment only: static fine grain increased to .13 opacity, irregular layered ridgelines, reduced contour blur (.6px), and a broader horizontal fade. Hero copy, fonts, navigation and CTA composition are untouched. Atmosphere height is capped at 370px on desktop and 230px below 901px to keep stronger decoration below the reading area. Mist behavior is unchanged. Actual-background contrast checks pass all 20 viewport/theme/motion combinations after lowering the texture away from the secondary CTA. No external assets or new dependencies.
