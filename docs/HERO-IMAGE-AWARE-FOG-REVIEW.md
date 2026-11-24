# Image-aware valley fog

Baseline: `6137102`. Scope: isolated Living Atmosphere preview only.

## Rendering change

Replaced the ray-marched wisp overlay with an image-aware, spatially varying transmission field. The shader samples the approved original artwork in the same center/bottom cover coordinates as the CSS image, softens local detail using five image taps, and compresses local contrast toward theme-specific airlight according to moving density. Clear regions reveal the original pixels. Adjacent slopes have different density phases; neither the camera nor the image coordinates move.

The original image assets, CSS composition, canvas opacity, foreground masks, headline, navigation and section transition are unchanged. The existing static artwork remains the fallback. Texture loading is theme-aware, cancels obsolete requests, and falls back safely on decode errors. Only the current theme's image texture is retained (approximately 6MB additional GPU texture memory). No new dependencies.

## Evidence and limitations

At 1440 × 1000 / 100% zoom, inspect the left mid-distance ridge around x=350–510, y=590–645. In local capture its tree-detail edge contrast increases from 1.75 to 2.33 then drops to 1.48 in First Light; Juniper Dusk increases from 1.28 to 1.65 then drops to 1.11 (average adjacent-pixel luminance difference, not a WCAG ratio). This corresponds to clearer detail around the 5-second sample and softer detail around 10 seconds. The right-hand slope follows a different phase. Sampled nearest-foreground pixels at (1380,720) and (60,730) remain identical across all four captures.

This is a 2.5D approximation, not reconstructed terrain. The flattened source contains baked-in mist; no renderer can recover absent mountain detail. The smallest further depth improvement would be a source-authored middle-distance layer plus the existing foreground cutout and background, not invented/inpainted terrain. That larger change requires separate approval and has not been made.

The two supplied Pixabay video pages were accessible as text, but video playback in the browser was blocked by a verification challenge. No reference video assets were downloaded, copied or deployed. Validation follows the user's explicit cover/uncover behavior, not a claimed frame-for-frame reference match.

## Validation

Astro check: zero diagnostics. All 36 regression tests pass. Preview build and sampled text contrast pass in both themes. Browser testing covers responsive widths 1440/1024/768/390/320, keyboard pause, offscreen suspension, reduced motion, static mobile, no JavaScript, unavailable WebGL and context loss. Repeated live theme switches bind the correct artwork dimensions; a forced texture-decode failure retains the static Hero. Native hidden-tab automation limitation from the prior review remains; the visibility guard is preserved.

Recorded desktop GPU p95 ~0.37–0.39ms versus ~2ms for the prior ray marcher, CPU submission p95 ~0.20ms and median frame interval 34.7ms. Same adaptive resolution and frame cap. Hardware-specific short measurements, not a universal performance guarantee.

Review recordings are normal-speed browser captures trimmed to 15 seconds; local files under ignored `review/hero-compact/density-public/`. Visual approval remains pending. Production must not be modified.
