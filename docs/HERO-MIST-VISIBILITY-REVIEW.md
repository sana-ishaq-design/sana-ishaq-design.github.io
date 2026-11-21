# Mist-only visibility refinement

Baseline: `14b8824`, isolated `/portfolio-preview/living-atmosphere.html`.

## Diagnosis

Actual staging at 1440 × 1000, 100% zoom: both themes successfully initialize WebGL2 and advance roughly 390 frames during the baseline capture. WebGL error is zero. The only console error is the existing root favicon 404, unrelated to rendering. The cloud canvas follows the static artwork in DOM order at the same stacking level, and is visible through its foreground mask. Headline reveal and atmosphere have independent entry functions and timelines; motion continues after reveal completes.

The perceptual limitation is a faint, depth-averaged noise field blending into the static fog already painted in the artwork. It is not an observed stopped desktop animation loop. The ordinary staging homepage is separate and does not contain this volumetric prototype. Viewports <=900px and reduced-motion users intentionally receive static artwork.

## Changes

- Shader depth sampling frequency .85 → .28, retaining coherent wisps instead of averaging as many unrelated noise cells along each ray.
- Horizontal advection .027 → .018 and depth drift .009 → .002. This favors slow, trackable horizontal drift over texture dissolution; it does not speed up the camera or terrain.
- Cloud canvas opacity .48 → .64, improving visibility without changing static artwork, its masks, the reading veil, theme lighting, layout or transitions.
- No added dependencies, ray steps, texture samples, resolution or frame-rate budget. Mountains, trees and camera remain stationary.

## Verification

Preview build, Astro check (zero diagnostics), 36 regression tests and browser matrix at 1440/1024/768/390/320 in both themes pass. No Hero/header axe violations or overflow. Sampled animated contrast passes existing AA thresholds. Keyboard pause, reduced motion, offscreen suspension, static mobile, no-JavaScript, unavailable WebGL and context-loss fallbacks pass.

Visibility-event handling pauses/resumes correctly with a simulated `document.hidden` value. Native background/minimize attempts in automated Chrome did not produce a hidden document; native hidden-tab behavior is therefore not certified by this run. Existing visibility guard and event listener remain unchanged.

Local desktop GPU p95 ~2.25ms in each theme, CPU submission p95 ~0.20ms, median frame interval 34.7ms (~28.8fps). Short samples are hardware-dependent and do not establish a performance improvement. Recording evidence and public verification are retained in ignored review artifacts, not deployed as portfolio content.
