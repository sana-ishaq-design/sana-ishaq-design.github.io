# Complete homepage — content provenance and remaining decisions

## Authority
Latest milestone: attachment 55ac0280-85db-46fd-af1a-8f802136c6c2. The Hero/theme control are locked. Complete local implementation is authorized; push, deployment and original-page rewrites are not.

## Source map
| Area | Source | Treatment |
|---|---|---|
| Hero + theme | Approved c42e5e9; src/pages/phase-1.astro, editorial.css, ThemePreference.tsx | Source files unchanged; exact Hero copied into candidate |
| HaierMall | Approved Phase 1 chapter and src/content/haiermall.ts | Exact article preserved, including four verified Results, context, attribution and proposed-question status |
| Subscribe Me | case-studies/subscribe-me-case-study.html:478–487,562,885–913; index.html:419–447 | Uses case-study brand Subscribe Me; original homepage called it Subscribe a Car. Delivery-phase UI contribution and AW Rostamani/RBB Global credits retained. Published 100K+ product downloads are source-attributed, not a new personal causal claim |
| UTWorX | case-studies/utworx-case-study.html:463–495,860–885 | Exact project identity and design brief; 16 screens, 3 roles and 2 weeks labeled delivery scope; source caveat that formal usability metrics were not collected retained |
| Process | index.html:720–774 | Five active steps and original descriptions; commented Handoff item excluded |
| Services | index.html:639–716 | Four active service titles, audiences and descriptions; original UX Audit URL retained without changing prices or claims |
| About | index.html:924–970 | Three paragraphs plus original location/remoteness statement; no imaginary headshot |
| Contact + profiles | index.html:1011–1066 | Original contact copy and discovery URL; clear recruiter mailto action added as navigation, not a new factual claim; original Email/LinkedIn/Upwork/GitHub destinations |
| Archive | Four actual case studies; source ranges in src/content/projects.ts | Source-specific short notes, original imagery, role and full-case-study link; featured projects may also have short notes |

src/content/homepage.json was extracted from active source DOM, excluding comments. Services/Process descriptions are tested against active original text. All originals remain byte-identical.

## Images
Existing assets only. Subscribe Me uses Browse Car, Vehicle Details and Dashboard originals. UTWorX uses Overview, with a mobile crop of the original work-summary/asset-overview region. Barcode Studio uses Overview. HaierMall is unchanged. No generated project interfaces, fake devices or stock stand-ins. Subscribe Me's browsing source is only 360px wide; the page does not fabricate higher-resolution UI.

## Archive scope and missing material
The original exploration named SNO, PeelAways, All Hung Up, Sophie Blake, Gentleman's Community, DesignerOS, PPA and Bone Broth. No complete project-specific copy/assets for those entries exist here. They are not published as placeholders. The implemented list contains the four supported projects, with source-backed notes and complete static routes. The legacy /case-studies/case_studies_archive.html stays untouched and linked separately.

## SEO/preservation decisions
/homepage.html is the complete review candidate, not a production replacement or new intended public home URL. Its title, description, social metadata and root canonical are carried from index.html. Structured Person data retains supported original fields; only the broken image URL /assets/img/profile-photo.jpg is omitted in the candidate. assets/img/about.png is an illustration, not a portrait, so it is not substituted as Person.image. Production source metadata remains untouched. New candidate/note pages are noindex, follow during local review; they contain complete static HTML and file-format .html routes. Promotion to production and any indexing changes require separate authorization.

## Genuinely unresolved
1. Additional Archive inventory needs actual project copy, role/contribution and imagery.
2. A genuine portrait is absent; the complete About section works without one.
3. Confirm which resume PDF is current. Both remain; the existing published download link is retained.
4. Verify or revise the existing proposed HaierMall design question when ready. Its verified outcome statistics remain authoritative and unchanged.
5. Multiple full-screen Explore Experiences remain future work; none is presented as functional here.

No missing fact blocks the supported complete homepage or its four project notes. Corrections to conflicting original case-study annotations and service claims remain separate decisions; see HAIERMALL-EVIDENCE.md.
