# HaierMall bento — isolated visual review

Route: `/haiermall-bento.html`. This is a separate prototype; neither homepage nor the approved Living Atmosphere route is replaced. The Hero markup is copied unchanged from the approved preview and uses its existing component, CSS and runtime. Other projects and sections retain their existing components.

The new experimental feature uses an approximately equal-width split: a dominant authentic homepage screenshot on the left, project identity and smaller Manrope/Instrument Serif heading on the right, followed by the approved description, a 2×2 impact grid and the established case-study link. Desktop image crop preserves the original aspect ratio; there is no recreated interface. At mobile widths, the heading, image, description, metrics and CTA read in natural order. The metrics remain two columns at 320px.

Metrics are sourced from the shared approved `haiermallOutcomes`; only the bounce context's arrow is presented as the approved wording “Homepage to category”. No source metric definitions or case-study content change. Image and CTA link to `/case-studies/haiermall-case-study.html`.

Tokens, typefaces, navigation, arrow and theme control are reused. Tonal metric surfaces have no border or shadow. Image hover/focus moves only 5px, with no scaling; reduced motion disables it. Semantic article, figure, headings and definition list; both links retain visible focus.

Browser review: 1440, 1024, 768, 390 and 320px in both themes at 100% zoom. No overflow or automated axe violations in the feature; keyboard order, metric values, destination and reduced-motion behavior pass. Description spans two lines at 1440 and three at 1024. Mobile section captures use a taller viewport at the same width/scale to avoid sticky-header capture artifacts.

Build and all 36 regression tests pass. Astro check has zero errors/warnings and two pre-existing unused-import hints in the unrelated density-texture review script. No unrelated cleanup is included.

Screenshot evidence is local under ignored `review/haier-bento/`. Staging only; integration into the redesigned homepage requires explicit visual approval.
