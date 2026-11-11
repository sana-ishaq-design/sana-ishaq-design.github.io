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

## Superseding atmospheric correction — 11 November 2026

The previous repeated curves were not visually approved. Replaced three similar ridgelines with two unequal silhouettes: a distant sage summit and an offset lower Mineral Blue slope. Separate fixed softness (4px and 1.5px), restrained color washes and a left-weighted radial mask establish depth. Grain reduced from .13 to .035 opacity. Dark-theme sage and silhouette opacities are tuned independently over the forest canvas, without inversion.

Hero content, layout and spacing remain unchanged. Only mist animates (6px / 36 seconds); mobile and reduced motion remain static. Browser screenshots reviewed in both desktop themes: distinct forms, blue/sage lower-left color and quiet upper/right regions. Visual acceptance remains with the owner. All 20 viewport/theme/motion checks passed, including composited-background contrast and no overflow. Astro: zero diagnostics; 36 regression tests passed. Homepage/Archive accessibility and navigation suite passed 20 states.

## Separate static terrain artwork — 11 November 2026

Supersedes the two-silhouette implementation. Three light-theme ranges and four independently composed dark-theme ranges now live in src/assets/hero-mountains-light.svg and hero-mountains-dark.svg. Uneven anchor peaks and fine fixed contour variation replace repeated curves. Distant dark ranges are sage-lit; nearer dark ranges recede into the forest base. Light terrain uses muted blue/sage tints. Brand canvas/text tokens and all hero layout/content remain unchanged.

Both assets are static, locally bundled SVGs with no scripts or animation. Shared fine grain remains static; the separate mist alone moves 6px over 36 seconds. Mobile uses a proportion-preserving terrain crop. CSS masks fade the top, bottom and right without rectangular artwork boundaries. SVG delivery uses Astro asset bundling and the preview base path.

The browser QA server now serves SVG with the correct image MIME type. Hero QA explicitly decodes the selected terrain image so missing artwork cannot produce a false passing visual test. Twenty viewport/theme/motion states pass including image loading, actual composited contrast, stationary terrain, reduced motion and no overflow. Astro has zero diagnostics and all 36 regression tests pass. Desktop comparison uses matching 1440x1100 captures; mobile captures use 390x1100. Reference used: the previously supplied paired light/dark mockup; no three new screenshots were attached to the latest request. Owner visual review remains pending.
