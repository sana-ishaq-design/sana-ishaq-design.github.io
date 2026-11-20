# Living Atmosphere — isolated prototype

Route: `/living-atmosphere.html`. No homepage source or shared component modifications.

Shader adapted from https://github.com/leoawen/volumetric-clouds/blob/main/index.html (Leonardo Soares Gonçalves, 2025, MIT). Retained: Henyey–Greenstein dual-lobe scattering, ray/box intersection and front-to-back absorption/compositing. See LICENSE. No Spectral Clouds code used.

Replaced the Three.js scene and multipass setup with a transparent WebGL2 volume. Original worker-generated periodic noise; no copied HDR or blue-noise images. New flattened density field, palette lighting, fixed camera, reduced-resolution rendering and DOM terrain occlusion. No dependencies added.

Approved artwork update: `artwork/*.webp` are the four owner-supplied files from `hero-artwork.zip`, preserved byte-for-byte. Separate hand-traced SVG transmission masks protect the nearer wooded ridges. The image and mask use matching cover sizing and bottom alignment. These are approximate, softly feathered occlusion masks, not semantic depth maps or reconstructed 3D geometry. The supplied 900px mobile WebPs are selected at ≤900px, with no WebGL animation. Source colors are unchanged; only upper-sky and narrow bottom-edge alpha blending and local text-reading protection are applied. The new artwork remains visible when graphics/JavaScript are unavailable; the original homepage is untouched.

Mobile ≤900px, reduced motion, unsupported WebGL2 and context failure retain supplied static landscapes. Forced colors and print omit decorative artwork. Desktop rendering caps at approximately 30fps and 350K pixels, starts at half CSS resolution, and lowers resolution/steps under sustained load. Hidden/offscreen rendering stops. Prototype controls include pause. Real-device battery/thermal testing remains necessary.

`window.atmosphereMetrics` exposes bounded startup, CPU submission, frame interval and optional asynchronous GPU timer samples for browser review. CPU time is not GPU time; neither desktop emulation nor software rendering establishes phone performance.
