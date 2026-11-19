# Living Atmosphere — visual review prototype

Isolated route: `/living-atmosphere.html` on the independent portfolio-preview deployment. Regular homepage, mountain assets, shared components and detailed case studies are unchanged.

Implementation: dependency-free WebGL2 adaptation of Leo's MIT raymarching/scattering; original 48³ worker-generated noise; one transparent render pass; nearest-ridge occlusion mask derived from the original SVG. Existing terrain remains underneath. Local soft reading veils protect text from changing cloud luminance. Independent progressive headline line reveal, then paragraph/actions; original semantic HTML remains present. Controls: density, speed, light, depth, pause, reset. No proprietary source or demo image assets.

Local Chrome measurements, 19 November 2026 (short samples, not cross-device guarantees):

| Viewport | Startup, light/dark | GPU p95, light/dark | Median frame interval |
|---|---|---|---|
| 1440×1000 | 312 / 132 ms | 7.20 / 7.21 ms | 34.7 ms (~28.8 fps) |
| 1024×1000 | 134 / 151 ms | 4.74 / 4.89 ms | 34.7 ms |

CPU submission p95 ≤0.2 ms. Render targets 720×185 and 512×154. Quality starts at 0.5 CSS resolution, capped at 350K pixels; sustained slow frames/GPU cost reduce quality and steps. Mobile/tablet ≤900px starts no WebGL rendering (zero frames).

QA: both themes at 1440/1024/768/390/320; no horizontal overflow or page errors; exact headline preserved; old mist animation disabled; axe checks; slider keyboard input; pause/resume; offscreen frame count stable; reduced motion static; no-JS/no-WebGL/context-loss fallbacks. Four animated backdrop samples per theme at 1440px: minimum sampled contrast 5.62:1 light, 8.08:1 dark at default controls. This is sampled contrast, not proof across every possible control setting or device. Build/diagnostics and 36 existing regression tests pass.

Limitations: desktop Chrome measurements only, no physical-phone battery/thermal or Safari/Firefox certification. Mobile intentionally uses the original static hero. Occlusion follows 2D original ridge masks, not a new 3D mountain scene. Adaptive downshift exists but sustained weak-device conditions still need hardware testing. Existing imagery is preserved, so the photographic visual reference informs atmosphere rather than replacing mountains with photographs, trees or a moon.

Review outputs live under ignored `review/living-atmosphere/`. Source license is retained beside the shader. Prototype is noindex; never set as the staging entry point or production homepage without separate approval.
