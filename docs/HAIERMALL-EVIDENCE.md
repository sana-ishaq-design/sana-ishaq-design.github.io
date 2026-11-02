# HaierMall evidence reconciliation — pending owner confirmation

Source snapshot: bb92411ebb56f45afdbe80dc48c8c698133cfe91. All locations below refer to unchanged production source, not the new review page. Repeated statements across pages are not independent corroboration. No analytics exports, experiment results, study recordings, audit report or source Figma file are present in this repository. Therefore no business outcome is independently supported by the available materials.

| Existing metric / claim | Repository source and location | What it purports to measure | Conflict / ambiguity | Independent support available here? | Owner confirmation needed |
|---|---|---|---|---|---|
| +31% online sales | index.html:222,296,311,352; case-studies.html:27,783,928,932; case-studies/haiermall-case-study.html:25,28,77,304,925; ux-audit-service-page.html:560 | Post-launch online sales growth; service page calls it completed sales | +25% appears in product-detail showcase; sales may mean revenue, orders or conversion rate | No. Case study at 913–916 says figures came from product/development teams and raw dashboards were unavailable | Exact KPI, baseline/comparison dates, denominator, relative % vs percentage points, attribution and permissible evidence/credit |
| +25% sales increase | case-studies/haiermall-case-study.html:814 | Product-detail design described as primary driver of sales increase | +31% overall; no explanation of different scope or measurement period | No | Is this a separate measure/timeframe or obsolete copy? Which figure is correct? |
| −20% bounce rate | index.html:227,299,352; case-studies.html:785,936; case-studies/haiermall-case-study.html:28,66,937; ux-audit-service-page.html:564 | Homepage → category in case-study results; product pages on service page | −32% at CS:712; CS:689 says '20% bounce rate' (absolute rate rather than reduction); incompatible page scopes | No | Final rate vs relative reduction vs percentage points; analytics definition/version; correct page set and dates; explain 20/32 |
| −32% bounce rate | case-studies/haiermall-case-study.html:712 | Homepage → category pages | Same scope appears with −20%; no segment or dates | No | Separate segment, alternate analysis or correction? |
| 20% bounce rate (unqualified) | case-studies/haiermall-case-study.html:689 | Screenshot annotation describing homepage to category | Could be final rate, unlike −20% reduction | No | Is 20% the measured final rate? What was the baseline? |
| +40% faster product discovery | index.html:302,352; case-studies.html:787,940; case-studies/haiermall-case-study.html:559,751,773,949 | Discoverability/task speed, described as usability testing; homepage says three months post-launch | 'Faster by 40%' is undefined; no protocol, sample, task, comparator or timing; testing vs post-launch context mixed | No | Study/task, participants, time-to-find baseline/new values, calculation, study date, researcher credit |
| +15% average session duration | case-studies/haiermall-case-study.html:961–968 | Average session duration | No named baseline, page set or timeframe; a longer session is not automatically better UX | No | Analytics metric definition, period, comparator and why it represents a beneficial outcome |
| Three months post-launch | index.html:353; case-studies/haiermall-case-study.html:25,304,911,932,1029 | Outcome reporting window | Could describe only sales, while homepage groups discovery results into same window | No | Launch date, measurement dates, applicability per KPI |
| 12 weeks | case-studies.html:951 | Design delivery duration | Not the same as three-month outcome window; case-study hero only says Phase 1 delivered/live | No | Actual project dates and whether 12 weeks is design, development or combined delivery |
| 50+ components | case-studies/haiermall-case-study.html:244,632 | Design-system deliverables count | Counting method and source library absent | No count verification | Source Figma/library, component vs variant count, exact personal contribution |
| 11 critical UX failures | ux-audit-service-page.html:557,568–569 | Audit findings count; claims none were on team's radar | Detailed case study presents five structural failures (CS:321 onward), which may be grouped themes rather than eleven findings | No audit artifact | Original audit, grouping explanation, severity definition; confirm whether team-awareness statement is supportable |
| 40 years of brand equity | case-studies/haiermall-case-study.html:225,286 | Haier brand history, not a project result | Time-sensitive brand fact; irrelevant to personal impact | No primary brand source in repo | Correct historical date/source; omit from proposed short introduction |
| 95% rely on reviews | case-studies/haiermall-case-study.html:576,830 | External Baymard research, not HaierMall findings | No exact study/date/quote linked; cannot be presented as project research | No | Original citation, applicability and exact meaning |
| 17% checkout abandonment | case-studies/haiermall-case-study.html:601,875,898,996 | External abandonment statistic attributed to visual distrust | Generic research is treated as project impact; causal category/denominator require checking | No | Original source/date, exact wording, population and separation from project outcomes |
| 44px targets / full WCAG 2.1 AA compliance | case-studies/haiermall-case-study.html:612–621 | Product UI accessibility, not this portfolio | Tap size and contrast alone do not establish full conformance | No audit/evaluation report | Scope, version, methods, audit results and caveats; avoid blanket conformance claim |
| Lead / sole designer, no functionality changes, design as only lever | case-studies/haiermall-case-study.html:232,267–298,913–919,1056 | Ownership, project constraint and causal attribution | Repository copy is a claim, not independent evidence; no-feature-change does not prove design caused all sales movement | No | Personal role, collaborators, period, interventions, reporting source; distinguish constraint from causal proof |
| Ease, clarity, trustworthiness feedback | case-studies/haiermall-case-study.html:306–310,974–981 | Qualitative post-launch user feedback | No respondents, collection method, dates or raw excerpts | No | Source/method, consent to quote, verbatim vs summary and team attribution |

## Facts suitable for the review evidence area

The repository demonstrably contains `assets/img/Haier homepage.png`, `assets/img/haier-product detail.png`, `assets/img/haier-checkout.png` and `assets/img/haier-product listing default.png`. Their corresponding case-study images are at CS:672 (homepage), CS:794 (detail), CS:857 (checkout) and CS:731 (listing). These prove the presence of design artifacts, not who created them, shipped status, accessibility compliance or measured performance. The review uses **Homepage / Product detail / Checkout** as non-numeric evidence labels, with an explicit pending-outcome note.

## Proposed introduction — approval required

> HaierMall is an appliance e-commerce platform. The redesign focuses on product discovery and purchase confidence, with homepage, product-detail and checkout interfaces.

This is a copy proposal shown as such on the noindex preview. It avoids statistics, brand-history claims, sole ownership and causal performance assertions. It describes intent and existing artifacts. Once contribution is confirmed, a first-person clause can be proposed separately; it is not inserted speculatively.

Original full paragraph and exact headline are preserved in `content/baseline.json`, as well as the unchanged production pages. No metadata or production claim has been corrected without approval.

## Decisions still needed

1. Approve or revise the shortened introduction.
2. Confirm each metric and its definition, dates and source, or approve permanent omission of that particular claim.
3. Confirm personal contribution, team credits and permitted source attribution.
4. Confirm whether the eventual homepage evidence area should show verified business results, deliverable evidence, or a combination. Current artifact-based composition is a safe preview, not final metric approval.

## Excluded non-published material
The commented impact block at index.html:599–608 repeats 31%/20%; it is not a separate published source. A commented generic 12% churn example is not attributed to HaierMall and is excluded.
