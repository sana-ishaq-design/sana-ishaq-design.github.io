# UX Audit Service — Offer, Content, Visual and Publication Audit

Read-only audit, 6 November 2026. No page, price, claim, approved project, navigation or deployment changes. Recommendations below require editorial approval.

## Publication recommendation

**Revise first; retain the service in the portfolio strategy.** It offers a credible next step for SaaS/e-commerce prospects and connects naturally to HaierMall and UTWorX. The current implementation is not ready for promotion: the primary inquiry journey is broken, sample visuals are placeholders, scope promises conflict, and some proof statements exceed their established context.

Do not assume this is safely isolated as an unpublished draft. The page exists in local `dist`, is linked from the approved homepage Services and HaierMall content, and has no noindex instruction. Its live publication status could not be confirmed through the external fetch. Publication/exclusion is a separate release decision; nothing was removed in this audit.

## Existing strengths

- Clear problem-led positioning around SaaS and e-commerce usability and conversion friction.
- Concrete deliverables: annotated findings, severity, recommendations and prioritisation.
- Three scope-based price starting points: $500 / $1,500 / $2,500, with 5 / 10 / 14 business days. Preserve these until the owner approves changes.
- Useful FAQ covering access, optional analytics, confidentiality, platforms and follow-on work.
- Direct expert delivery, remote collaboration and a free 30-minute scoping conversation.
- Real HaierMall evidence and a working link to the approved case study.

## Priority findings

| Priority | Issue and source | Recommendation for approval |
|---|---|---|
| P0 | Seven links use `href="#"`: hero booking, examples, consultation, three package CTAs, final consultation. Header Book Audit only sends visitors to homepage contact. | Define one functional inquiry route. Use the existing approved booking destination if appropriate; examples should target real samples. Distinguish a scoping call from purchasing an audit. |
| P1 | Eight visible placeholder panels: hero, outcome sample, four deliverable pages, process diagram and profile visual. | Use permission-cleared real deliverable excerpts, clearly labeled illustrative samples if later created, or omit nonessential visuals. Never present a mock report as completed client work. |
| P1 | Haier proof says −20% on product pages, versus approved Homepage → category; +31% lacks the three-month window and team-reporting attribution. | Preserve the verified values and correct context with approval. Explain audit-led redesign and implementation, not audit-only causation. |
| P1 | “11 critical UX failures,” “none on the team's radar” are not established by the approved five-finding narrative reviewed. | Request precise source/context. Do not infer that 11 is fabricated or automatically replace it with five; those may be different scopes. Until reconciled, propose omitting the count and internal-awareness assertion from sales proof. |
| P1 | Hero says 200+ projects delivered; credentials says 200+ products audited, and later 200+ projects. Five years general design experience becomes five years auditing. | These are distinct claims. Confirm exact scope and approved wording before reuse. No silent conversion of project experience into audit volume. |
| P1 | “100%” audit delivery statistic, “Most Popular” package, every friction point, revenue-impact ranking, guaranteed clarity/causal claims. | Separate service commitments from historical statistics. Remove or substantiate popularity/volume claims; use bounded expert findings and estimated priorities where analytics are unavailable. No fabricated testimonials found. |
| P1 | Process/included/schema promise a 60-minute walkthrough for every package; Starter includes 30 minutes. “Only difference is screens/flows” conflicts with roadmap, analysis and call differences. | Agree a single package matrix and align prose, cards, FAQs and structured data. Retain current prices pending approval. |
| P1 | Comprehensive “full/complete product experience” has no screen, flow, role or platform cap. Scope exclusions and dependencies are unspecified. | Agree maximum scope, access prerequisites, timeline start, feedback/revision allowance and follow-up support. Clearly state whether redesign, implementation, interviews, testing, analytics setup and accessibility certification are excluded or separately scoped. |
| P1 | Analytics are optional, but sample conversion recommendations promise links to observed behaviour/drop-off and process ranks conversion cost. | Distinguish heuristic assessment from analytics-supported findings. Expert review cannot promise causal revenue diagnosis without relevant evidence. |
| P1 | Legacy navy/teal and Inter/DM Serif; no approved theme toggle/shared mobile menu. Axe flagged 35 contrast-failing elements at desktop. | Reuse portfolio tokens, fonts, global header and themes. Keep this a service page with fit/scope/proof/inquiry hierarchy, not case-study chapters. |
| P1 | JS-enabled CDN failure leaves hero opacity 0. | Visible-first rendering with optional motion. Existing no-JS fallback is positive, but does not handle partial script failure. |
| P1 | Canonical/OG URL is `/ux-audit`, while actual preserved route is `/ux-audit-service-page.html`. `assets/ux-audit-og.jpg` is absent. | Keep the established .html route; align canonical/OG/schema references and add an approved authentic social image. Do not invent a new route or rely on server redirects GitHub Pages does not supply. |
| P2 | FAQ schema includes an answer about universal 60-minute delivery and a question not present in the visible FAQ; $2,500 is framed as a ceiling despite starting-price/custom-scope language. | Match visible, approved FAQ and accurate starting-price descriptions. Do not promise rich-result eligibility. |
| P2 | Repeated outcomes/deliverables/inclusions/credentials grids and multiple audience cards obscure what is actually purchased. | Consolidate overlap and elevate scope, real samples and the next step. Maintain short reading widths and generous section spacing. |
| P2 | Header/footer Case Studies link targets the legacy archive rather than `/case-studies.html`; mobile hides navigation links without a menu. No main landmark. FAQ buttons toggle expanded state but lack explicit panel relationships. | Use approved shared navigation and catalog destination; add semantic main and robust FAQ relationships/fallback. Preserve legacy archive itself. |

## Target audience and boundaries

Primary audience: founders and product teams with an existing SaaS product or e-commerce journey who need to prioritise usability improvements before investing in redesign/development. Enterprise workflow reviews are supported by UTWorX but should be scoped explicitly. “Investor presentation” is a weak fit for the core audit offer; treat prototype/pre-launch assessment as a distinct scope rather than simultaneously promising that live user behaviour is required.

Keep the service about expert diagnosis, prioritisation and actionable guidance. Conversion gains depend on the product, implementation and measurement; a service deliverable is not a guarantee of revenue or retention improvement. No refund/performance guarantee or testimonial quote was found, but the absolute wording currently implies more certainty than the methodology supports.

## Real portfolio evidence

- **HaierMall:** strongest commerce example. Keep +31% online sales, three months post-launch, and −20% homepage-to-category bounce rate, with product-management/development-team attribution. Link to the full story for research, redesign and all verified results.
- **UTWorX:** supports structured expert audit and complex workflow clarity. Present findings/decisions and the explicit absence of formal usability metrics. Do not convert 16 screens or two-week delivery into evidence of business uplift.
- **Subscribe a Car:** not primary proof of Sana leading an audit or research programme; her approved role is delivery-phase UI designer.
- **Barcode Studio:** competitive review is useful design evidence but is not a substitute for a delivered client UX audit report.

No authentic service-report sample set was identified among the referenced service assets: the page contains only one actual Haier image. An audit sample may exist elsewhere privately; request it rather than manufacture evidence. The existing designer illustration is not a portrait or credential proof.

## Proposed service-page structure

1. **Offer and fit:** a clear UX audit proposition, intended SaaS/e-commerce audience, primary scoping CTA and secondary sample link.
2. **When an audit helps:** a concise set of concrete journey problems and who should choose a different engagement.
3. **What you receive:** real annotated sample, severity definition and prioritisation example; clarify evidence source and limits.
4. **Evidence in practice:** HaierMall result with correct attribution, plus a concise UTWorX workflow example if approved.
5. **Scope and working process:** required access, expert review, optional analytics, output formats, walkthrough and exclusions.
6. **Packages and custom scope:** one consistent comparison using approved prices/durations and explicit scope bounds.
7. **FAQ and inquiry:** confidentiality, access, timing, what is not included, next steps and functional booking/contact route.

Avoid creating unnecessary process diagrams or portrait placeholders. An actual report excerpt carries more credibility than decorative service graphics.

## SEO opportunities

Preserve service-intent language: UX audit service, SaaS UX audit, e-commerce UX audit, usability review and heuristic evaluation. Proposed title for approval: “UX Audit Services for SaaS & E-commerce | Sana Ishaq”. Proposed description: “Identify usability friction in your SaaS or e-commerce product with annotated findings, prioritised recommendations and a scoped improvement roadmap.” These are proposals, not edits.

Keep one clear H1, descriptive section headings, a working canonical, authentic OG image, accurate Service/Offer markup and FAQ answers that match visible content. Maintain internal links from homepage Services and relevant HaierMall evidence; add UTWorX contextual linkage only if later approved. Keep the global header unchanged: do not add a competing top-level Audit item. A Services overview or service-footer link is appropriate once publication is approved.

## Approval questions

1. Are all three prices and delivery windows current? What exact screen/flow limits, call lengths and revisions apply?
2. What is the authoritative meaning/source of 200+, five years auditing, the 11-finding claim and Most Popular?
3. Which real deliverable samples may be shown publicly, with any client redaction needed?
4. Should all inquiries use the existing Calendly destination or a dedicated audit intake? What information is required before scoping?
5. Confirm exclusions, analytics expectations, confidentiality/NDA arrangements and whether async delivery is an alternative to a live call.

## Browser evidence and limitations

Reviewed actual local rendering at 1440, 768, 390 and 320px. No document overflow; FAQ mouse activation and aria-expanded update work; no-JS hero is visible. No shared portfolio themes exist on this page, so it cannot pass a two-theme consistency review yet. Contrast failures, missing mobile navigation and broken inquiry destinations remain. Automated checks are not screen-reader certification or a full performance benchmark.

Source: `ux-audit-service-page.html`, `src/components/HomepageSections.astro`, `src/components/HaierMallCase.astro`, approved HaierMall outcomes, and local browser evidence `review/scope-audit/service-opening.png`, `service-1440.png`, `service-390.png`, `browser.json`.

Next step after editorial approval: reconcile offer/evidence first, implement the approved service structure and shared visual system locally, then run accessibility/responsive/link/schema QA and final polish. No publication until explicit approval.

Technical rubric (provisional review judgment, not certification): accessibility 1/4; performance 2/4 (no measured speed benchmark; external animation dependency); theming 1/4; responsive 2/4; implementation integrity 0/4 (broken primary conversion path and visible placeholders). Total 6/20. Priorities: clarify offer, harden inquiry/navigation, adapt layouts, then polish. Re-run the audit after approved fixes.
