# Centered Hero: compact desktop and animation diagnosis

Scope: isolated `living-atmosphere.html`, `homepage-refinement`; no production or other-section changes. Previous centered baseline: `a440310e06df5042769081015c33c07331f6afd2`.

## Changes

- Above 900px, bottom padding 236px → 124px. At 1440 × 1000, Hero height 744.97px → 632.97px (15.0%); Selected Work begins at 760.97px instead of 872.97px.
- Retain landscape dimensions and image scale. Offset artwork and its registered cloud/mask plane by +32px inside the 112px-shorter Hero: net mountain movement 80px upward.
- Supporting paragraph moves up 6px; CTA group 8px. Typography, copy, alignment and destinations unchanged. Tablet/mobile content geometry unchanged.
- Center and feather the existing translucent reading veil horizontally and vertically to protect text over the raised ridges. No opaque panel or image recoloring.
- Diagnostic controls remain available in document flow after the footer, without obscuring content. Static/suspended messages identify the actual reduced-motion, viewport, forced-colors, hidden-tab or offscreen condition.
- No changes to shader, density, speed, step count, resolution limits, animation scheduling or artwork files.

## Diagnosis

On the actual pre-change staging URL, desktop Chrome at 1440 × 1000, 100% zoom, both themes initialized WebGL2 and compiled/linked successfully (the ready animated state is reached only after these checks). WebGL error was 0. About 378 frames advanced over 12 seconds. Composited screenshots changed by at least three channel levels across 23.7% / 23.0% of the canvas region for light/dark respectively. Therefore a non-playing desktop renderer was not reproduced: the canvas was neither static nor hidden, and its motion survived compositing/masking.

The existing renderer deliberately does not run at viewport widths <=900px, under reduced motion or forced colors, while paused, outside the viewport or in a hidden tab. Motion is restrained by its narrow valley mask and opacity. These are confirmed conditions, not proof of which condition affected the user's browser. Exact cause on that device remains unresolved without its runtime state. Do not describe this work as fixing an observed shader failure.

## Verification

Build, Astro diagnostics and all 36 regression tests passed. Browser checks cover both themes at 1440, 1024, 768, 390 and 320px; no overflow or Hero/header axe violations; keyboard sliders/pause, offscreen suspension, reduced motion, no JavaScript, no WebGL and context loss fallbacks. Static source content remains available. This is not manual screen-reader certification or physical mobile-device testing.

Original desktop GPU p95: 2.87ms in each theme; CPU submission p95 0.20ms; median frame interval 34.7ms (~28.8fps). Initial compact measurements: GPU p95 2.61ms light / 2.24ms dark; CPU 0.20ms and interval 34.7ms unchanged. These short local GPU samples vary between runs and do not establish a performance speedup. Same 720 × 316 canvas and quality 0.5 at 1440px; no increased rendering budget.

Local evidence (ignored from Git): `review/hero-compact/before/`, `review/hero-compact/after/`, recorded frames/video in `review/hero-compact/final/`; responsive screenshots and test JSON under `review/living-atmosphere/`. Public deployment checks are reported separately after publication.
