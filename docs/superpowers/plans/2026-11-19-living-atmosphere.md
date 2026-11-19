# Living Atmosphere — approved isolated spike

Only `/living-atmosphere.html` uses the experiment. Existing homepage and all other routes retain their source and behavior. Copy the homepage composition for this review route; do not make it a new production entry point.

1. Adapt Leo's MIT phase function, volume intersection and front-to-back scattering into a dependency-free WebGL2 module. Retain copyright/license and document modifications. Generate original 3D noise in a worker; do not copy demo image assets.
2. Preserve original terrain SVGs; derive foreground masks from unchanged paths at build time. Put a transparent volume behind those foreground ridges. Retain existing terrain, grain and static fallback.
3. Add isolated density/speed/light/depth controls and pause. Default mobile/reduced motion to static; suspend hidden/offscreen, recover/fallback on context loss, cap resolution/frame rate and adapt quality.
4. Independently reveal actual headline lines using temporary visual clip overlays while keeping original semantic HTML. Cancel on reduced motion, resize or focus. Never gate content visibility on renderer startup.
5. Build/check/regression tests; browser tests in both themes at 1440/1024/768/390/320, reduced motion, no JS, context failure, keyboard, contrast, overflow, suspension; measure startup and frame timings, capture screenshots and motion evidence.
6. Commit only experiment/test/docs files on homepage-refinement; publish via existing isolated workflow; verify public route and unchanged baseline/production. Stop for visual approval.
