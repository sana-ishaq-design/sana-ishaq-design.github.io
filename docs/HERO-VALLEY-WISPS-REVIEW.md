# Trackable valley wisps

Comparison baseline: `26301b4`. Only `volume.frag` changes; the artwork, typography, layout, mountain positions, masks, section fade, runtime and global canvas opacity (0.64) are unchanged.

Two soft elongated density envelopes now travel horizontally at different rates through the existing volume, modulated by the existing noise texture. At 1440px their centers move approximately 35–58px and 26–43px over 3–5 seconds. Their vertical centers remain stationary. They wrap outside the visible field on different 200/267-second periods, concealed by the existing edge envelope, rather than reversing or restarting on a short visible loop.

Broader procedural haze density is reduced from multiplier 10 to 5.5 so it stays subordinate to the wisps. A minimum transmitted light contribution prevents the denser wisps turning into dark smoke. Theme light colours are unchanged. Existing foreground masks occlude the wisps at trees/ridges; no terrain or camera animation is introduced.

The render budget remains 36 steps at normal quality, adaptive resolution, maximum 30fps, with the existing reduced-motion, mobile, offscreen and hidden-document safeguards. No new texture samples or dependencies. Local final capture: median interval 34.7ms, CPU p95 0.20ms, GPU p95 2.22ms light / 2.33ms dark; baseline capture was approximately 2.26ms. These short samples indicate comparable cost, not a guaranteed performance change.

Preview build and contrast checks passed in both themes; Astro check and all 36 regressions passed. Browser matrix covers 1440/1024/768/390/320, keyboard pause, reduced motion, no-WebGL and context-loss fallback, with zero Hero/header axe violations. Native hidden-tab automation limitation remains as documented in the prior mist review; the runtime guard is unchanged.

Recordings are actual browser capture at 1440 × 1000, device scale 1, 100% zoom, trimmed to 10 seconds at normal speed. Compare the previous `review/hero-compact/mist-public/` recordings with `review/hero-compact/wisps-public/`. These ignored local review files are not portfolio content. Visual approval remains with the user.
