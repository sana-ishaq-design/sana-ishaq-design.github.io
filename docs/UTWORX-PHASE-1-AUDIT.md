# UTWorX — Phase 1 content, asset and editorial audit

4 November 2026. Audit and proposal only. No UTWorX implementation authorized or changed.

## Sources and authority
Primary: case-studies/utworx-case-study.html. Supporting: original index.html (especially 481–572), case-studies.html, sitemap.xml, src/content/projects.ts, src/components/FeaturedProjects.astro, docs/HOMEPAGE-CONTENT.md, docs/HOMEPAGE-REVIEW.md, and relevant historical content audit. Latest owner directions govern scope; source case study governs project facts. Historical documents are not evidence of additional research.

## Content inventory — documented facts
- Enterprise B2B SaaS for asset and maintenance management. The legal client/company is not identified in the case study; do not infer it from UI logos, sample people or asset records.
- Lead UI/UX Designer, sole designer; team listed as PM, developer and stakeholders. Two-week end-to-end delivery. Web app plus Android/iOS listed, but available exports are desktop web.
- Product scope: assets, fault notifications, work orders, scheduling, service documentation, reporting and preventive maintenance.
- Three primary role groupings: Operators/Technicians (on-site execution); Supervisors/Team Leads (coordination); Managers/Schedulers (oversight). Additional audience names are facility managers, maintenance managers, operations teams and asset owners. Do not turn these into five additional tested personas or claim a documented permissions model.
- Product-team brief: simplify the interface without removing features or changing existing functionality. Original homepage reports 16 screens across seven operational workflows, delivered in two weeks without disrupting live operations.
- Research evidence: a structured UX audit is described. Three explicit findings: information overload and absent urgency signals; difficult navigation including a 4–5-screen operational picture and off-platform coordination; lack of synthesized dashboard visibility. No interview method, participant count or test results supplied.
- Four design principles: simplify data; improve visibility; streamline workflows; modernize through familiar enterprise patterns.
- Four explicit trade-offs: sidebar vs top navigation; visual summaries/charts vs improved tables; five-stage workflow vs long form; contextual modals vs separate pages. Preserve all alternatives and rationale.
- Five named work-order stages: Preliminary Report → Notification Creation → Work Scheduling → Service Report → Report Generation.
- PM account describes bulk/spreadsheet-style management, task/personnel/spares/documentation handling, recurrence and completion. Reporting describes asset/date/status filtering before loading records.
- Visual-system contribution is supported by consistent navigation, table/form/modal patterns and the stated modernization goal. No component-count claim, component library, token file, Figma handoff, developer annotations or detailed implementation protocol is supplied.
- Delivery evidence: 16 screens, 3 roles, 2 weeks, 0 functionality changes. Attribution: product team and client stakeholders post-delivery. The source expressly says formal usability metrics were not collected. These are delivery/scope facts, not measured conversion, efficiency or revenue gains.
- Three learnings: structure data rather than remove depth; enterprise familiarity over novelty; hierarchy for decisions under time pressure.
- Reflection: formal user testing was not performed within the timeline; a future half-day session with 3–5 users is proposed, not completed research. Predictive alerts, proactive suggestions and anomaly detection were outside scope, not delivered features.
- Existing contact CTA and Sana Ishaq footer credit retained as content baseline.

## Source discrepancies requiring editorial decisions
| Source | What is actually available | Recommendation for approval |
|---|---|---|
| Challenge heading at line 528 says five audit failures | Three finding entries, lines 533–549 | Preserve all three; use a count-free title unless two missing findings are provided. |
| Dashboard annotations at 609–612 describe active/pending/faulted asset summaries, line-chart completion trends, stacked consumption bars and a risk pipeline | Overview shows task-count summaries, grouped Asset Overview bars, single-series consumption bars, and a work-summary table | Caption the visible charts precisely. Keep other published observations separately pending clarification; do not pretend these exports show them. |
| Work-order prose/annotation at 647 and 669 describes persistent five-step progress | Separate module links and task-specific modals appear; no named stepper is visible | Show a source-derived five-stage editorial sequence, explicitly a workflow summary rather than an interface screenshot or tested user journey. |
| PM annotation at 690 says inline PIC assignment with no modal; PM prose describes spreadsheet bulk/recurrence management | Overview has an Assign action and Upload Excel; the other export is a modal with Assigned PIC, Task Details, Spare Parts Used, Completion Notes and attachments | Use overview → task-modal → success visual evidence. Do not call the modal export a spreadsheet editor. Request missing bulk/recurrence view if available. |
| Additional Screens text at 777 names asset registers, technician dashboards and profile settings | The gallery repeats dashboard, work-order and PM exports; no separate profile/role dashboard exports found | Distribute actual images within relevant chapters; do not claim these absent screen types are pictured. |
| Phrases such as insight in seconds vs minutes, reduced errors/retraining cost, and scheduling from a multi-hour process | No formal usability measurement; some language is rationale or intended benefit | Preserve unique reasoning, but propose phrasing these as design intent/qualitative observations rather than quantified measured results. Do not silently rewrite. |

## Asset inventory
Twelve unique PNGs found: nine complete interface exports, two dashboard detail exports and one presentation composite. Eleven unique images are referenced by the original case study; the composite appears on the original homepage. Visually inspected together in review/utworx-audit/contact-sheet.png.

| Original filename | Dimensions | Actual content / placement |
|---|---|---|
| Overview - UTWorX.png | 4320×4008 | Dashboard with work summaries, charts, sidebar and table. Strongest authentic opening; later use focused hierarchy crops rather than repeat the entire image. |
| assest overview.png | 1635×1302 | Grouped monthly bar chart. Detail within operational-visibility chapter. |
| spare part consumtion.png | 1635×1302 | Single-series monthly bar chart with Monthly/Weekly selector. Pair with the asset chart only where comparing different information types. |
| Prelimanary Report - UTWorX.png | 4320×3225 | Create Preliminary Report modal: fault observation, findings, attachments, follow-up, draft/submit. Start of workflow evidence. |
| Notification Creation - UTWorX.png | 4320×3384 | Create Notification modal: title, description, asset, follow-up, attachments, category and priority. Evidence of task-scoped information. |
| Work Scheduling - UTWorX.png | 4320×2880 | Schedule Task modal: technician, spares, date, estimated hours. Strong close-up of coordination work. |
| Service Report - UTWorX.png | 4320×3225 | Add Service Report modal: findings, asset component, spares used, completion state and attachments. Close-the-loop evidence. |
| Report Generation - UTWorX.png | 4320×3225 | Report table with date, asset ID, work-status and Export controls. Reporting chapter; no separate filter panel implied. |
| Preventive Maintenance Scheduler Overview - UTWorX.png | 4320×3225 | PM table with asset/location/date/status, Assign actions and Upload Excel. Bulk context; not proof of an opened spreadsheet editor. |
| Preventive Maintenance Scheduler - UTWorX.png | 4320×3225 | Preventive-maintenance form modal over table. Task execution/details. |
| PMS Success Message - UTWorX.png | 4320×3225 | Completed-work-order success modal. Confirmation state after PM task. |
| UTWorX.png | 1248×832 | Styled multi-screen promotional composite; lower resolution than originals. Existing homepage art, not primary interface evidence or preferred immersive hero. |

No full-screen export is low resolution, but dense table text becomes illegible when the whole screen is reduced to mobile width. Detail exports should not be enlarged beyond their useful source scale. The composite is unsuitable for a large crisp interface showcase. No file can be reliably labeled outdated without version history; the main redundancy is repeated placement of the same file in the old page. The original Overview appears three times; several workflow images appear twice.

Missing evidence: original before-state screens; dedicated native mobile exports; the remaining screens behind the published 16-screen total; separate role dashboards/profile/register exports; opened bulk-import/recurrence editor; named progress-stepper export; component board/handoff artifacts; usability recordings; error/validation/empty states. The existing success modal is real evidence and should be used. Missing files do not invalidate documented delivery facts.

## Recommended narrative and chapters — proposal, not approved copy
Central argument: **Make complex maintenance work easier to read, coordinate and complete, while preserving operational depth.** Distinct from HaierMall conversion and Subscribe a Car commitment/trust: this story concerns role-specific information needs, dense records, task boundaries and coordination under a fixed functional scope.

1. **The brief: clarity without removing capability** — role, team, three operational perspectives, two-week constraint; prominent scope facts labeled delivery rather than outcomes; full-width Overview.
2. **From stored data to operational decisions** — three supplied audit findings and all four principles, connected to subsequent decisions. No invented research phase or participants.
3. **Reading the operation at a glance** — sidebar trade-off and dashboard information hierarchy; full-context dashboard reference plus authentic chart/table close-ups. Distinguish observed visual structure from descriptions that need reconciliation.
4. **Keeping work orders in context** — five named stages summarized in accessible HTML; vary large modal focus, compact adjacent stage explanation, and full-screen context. Preserve long-form vs staged-flow and modal vs page trade-offs. Use Preliminary Report, Notification, Scheduling and Service Report exports without five repetitive full-width blocks.
5. **Planning maintenance across assets** — PM table, task modal and completion state; explain overview vs task-level context. Preserve published bulk-management rationale, subject to the source discrepancy decision above.
6. **Defining the report before reading the records** — Report Generation export; date/asset/status filters and export action. Explain the information boundary, not a fabricated time-saving metric.
7. **Delivery, limitations and reflection** — 16 screens / 3 roles / 2 weeks / 0 functionality changes, product-team/client attribution, absence of formal usability metrics, all three learnings and original reflection. End with existing relevant contact CTA, all case studies, and proposed next project Barcode Studio at /case-studies/barcode-studio-case-study.html (source H1: A barcode generator that works entirely inside the browser.).

Seven sections arise from the evidence. A separate design-system/handoff chapter would overstate the available material; use a concise consistency note where supported instead. Existing decisions/goals/learnings/screen anchors can remain as meaningful subsection targets even when redundant top-level sections are consolidated.

## Visual direction
Retain First Light, Juniper Dusk, Manrope, selective Instrument Serif, Mineral Blue, shared header/theme toggle/chapter menu, reading widths and keyboard offsets. Keep actual UTWorX UI green/blue/white rather than recoloring it to match portfolio themes.

Desktop: a broad dashboard opening; analytical close-ups in an asymmetric editorial layout; a text-based source-derived work-order sequence; modal crops shown beside concise rationale while full originals remain inspectable; PM overview/modal/confirmation shown as related states. No new decorative dashboard panels or made-up charts.

Mobile: one explanatory unit followed by one legible detail crop; original full desktop screen accessible through a labeled full-image link. Keep charts and their labels together when cropping. Sequence becomes a vertical ordered list; no mandatory horizontal scrolling, hover evidence, or fabricated mobile app version. Full-screen context and precise detail serve different purposes; avoid a large closing gallery that repeats earlier imagery.

## URLs, anchors and SEO
- Preserve /case-studies/utworx-case-study.html. Inbound links exist in original index, redesigned homepage, catalog, project notes, Subscribe a Car next-project link and sitemap.
- Preserve meaningful fragments: overview, challenge, goals, dashboard, workorders, maintenance, reporting, decisions, screens, impact, learnings, reflection.
- Two canonical tags point to the SAME established URL (lines 31–33 and 432–435). Recommend deduplicating to one; no route change needed.
- Preserve title: Enterprise SaaS Dashboard Redesign Case Study | Sana Ishaq.
- Preserve substantive description, OG/Twitter copy and Article JSON-LD: 16 screens, 3 roles, 2-week delivery, enterprise SaaS/dashboard/asset-management UX keyword foundations, author and dates.
- OG/Twitter/JSON-LD reference /assets/img/utworx-og.png, which is absent locally. Proposed correction requires approval: use an existing authentic Overview-based social crop or existing UTWorX.png composite; no invented screenshot. Do not silently substitute metadata.
- Existing Calendly destination remains https://calendly.com/sanaishaq/sana-uiux.
- Current Astro file output can preserve the exact .html path after approval, following the immutable-source migration pattern. No route/build changes made now.

## Approval questions
1. Approve the proposed narrative/chapters and source-derived workflow summary?
2. Are the two additional audit findings and missing progress/bulk-management views available, or should presentation use the supplied three findings and visibly supported interface states with approved wording corrections?
3. May the client be named, and is there further documented collaboration, implementation or handoff detail to include? Otherwise retain PM/developer/stakeholder context only.
4. Approve one same-route canonical and repair of the missing social image; prefer an authentic Overview-based social crop or the existing UTWorX promotional composite?
5. Approve reframing unmeasured speed/error/retraining statements as rationale or qualitative observations, while preserving reported delivery facts and all unique reasoning?

No source content corrected, no implementation started, and no push/merge/deploy performed. Await owner review.
