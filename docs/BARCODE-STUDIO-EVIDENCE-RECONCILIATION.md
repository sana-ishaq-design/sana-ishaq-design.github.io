# Barcode Studio — Product Evidence Reconciliation

Audit date: 9 November 2026. Report only; no portfolio implementation, content rewrite, build, push, merge or deployment.

## Decision

The sources can be reconciled by **separating design artifacts from implementation evidence**, not by choosing the newest-looking image. The existing six-chapter narrative remains suitable, but publication must distinguish the design/handoff story from the current repository implementation. Version labels alone do not establish release identity.

## Evidence ledger and authority

- **H:** original `case-studies/barcode-studio-case-study.html` — documented project account, not an executable specification.
- **S:** 11 original 1200×900 PNGs under `assets/img` — genuine supplied design evidence; several display v1.2.2, but are not independently proven captures of the installed store package.
- **P:** `assets/barcode_studio_ux_decision.pdf` — describes a v1.1→v1.2.2 redesign. Rationale and expected impact, not a validation study or release manifest.
- **D:** typography, colour palette and annotated `documentation - Barcode.png` — handoff/style evidence. The numbered handoff labels a 340×740 design frame; it does not establish runtime browser-popup size.
- **C:** public source pinned to commit `e803b79129ef59836027ef013aea11aa3b04c364`, https://github.com/zfhassaan/barcode-studio/tree/e803b79129ef59836027ef013aea11aa3b04c364 . Relevant files saved read-only as audit copies under `review/barcode-evidence/`.
- **B:** committed `builds/chrome` manifest, CSS and popup JavaScript at that same commit. Manifest says 1.2.2. Static inspection confirms relevant controls and formats; this is not proof of byte-for-byte equality with the store package.
- **L:** https://chromewebstore.google.com/detail/barcode-studio/lknamljgoemoejklldglbpjbbagnjbab . Listing retrieved through web browsing identifies version 1.2.2 and the published product. Search retrieval may be cached. No extension was installed, and no runtime traffic was captured.

Authority by claim: design intent → H/P/S/D; source behavior → pinned C/B; published availability/capabilities → L; actual installed behavior → requires a matched store package/runtime test. No source substitutes for the others.

## Feature/version matrix

| Feature | HTML claim | Screens / design / handoff | Decisions PDF | Source/build and listing | Status and recommended evidence |
|---|---|---|---|---|---|
| Export control | Four output options; single/batch on one tab. Broad format-chip rationale can be confused with output format. | Export Light/Dark show four tiles. Create shows a symbology dropdown plus quick-choice labels. Handoff likewise shows the Create dropdown. | Says export tiles became a dropdown with PNG default; flow separately describes a symbology dropdown. | App.vue `bc-download` is a select; constants enumerate PNG/JPEG/WebP/SVG; PNG is initial default, saved choice restored. Build contains the select; listing does not specify control shape. | **Implemented in C/B; store UI unverified.** Tiles are **designed, release mapping unverified**. Show the existing tile screen as a supplied design artifact, never as proof of the current dropdown. |
| Export formats | PNG/SVG/WebP/PDF. | Export tiles and flow diagram include PDF. | Includes PDF. | C/B enumerate PNG/JPEG/WebP/SVG, not PDF; listing agrees with those four formats. | PNG/JPEG/WebP/SVG **published-capability confirmed** and source-supported. PDF **designed but shipped support unsupported** in inspected evidence. Do not erase PDF from original artwork. |
| Theme controls | Auto default; manual override in About. | Header contains theme controls; colour artifacts support intentional themes. | Header Auto/Light/Dark switcher; old dark-only state described. | AppHeader embeds ThemeToggle, Auto/Light/Dark; initial theme system, selection persisted. Listing supports light/dark, not placement details. | Header control **implemented in C/B** and supported by design evidence. About-placement claim **unsupported**. Historical dark-only state **PDF-documented, not independently version-matched**. |
| About styling | About overlay shown in both themes. | Separate light/dark About designs; developer credit and external GitHub feedback. | Describes a light card over a dark backdrop. | App.vue teleports About to body; `.info-overlay` explicitly has `background:white!important`; dialog uses CSS variables. Build mirrors these rules. Theme variables are defined on `.shell`, so the teleported dialog's actual appearance must not be inferred from shell theme alone. Listing does not settle this. | Design variants **documented**; PDF's specific light-card/dark-backdrop description **not established as shipped**. Show original About artifact with design-stage caption; do not assert a universal runtime appearance. |
| Popup size | 400×600; no persistent state; everything readable without scrolling. | 1200×900 artwork canvases contain smaller product frames; handoff explicitly 340×740. Typography artifact shows IBM Plex Sans examples. | Refers to approximately 500px width. | CSS uses minimum width 420px, shell maximum width 440px, max-height 580px and vertical scrolling. Source declares Inter/system stack. | Handoff size **design specification**; CSS limits **implemented source facts**, not measured store-popup dimensions. Fixed 400×600 and no-scroll claims **unsupported for C/B**. Preserve intended type evidence without claiming exact implementation parity. |
| Privacy and persistence | Zero data ever leaves; no server request; no persistent state. | Local-processing wording in screens; no network trace. | Local processing / zero server calls. | Local QR/barcode libraries, Blob exports and `chrome.storage.local`; persists payload, recent/batch data, preferences and Wi-Fi fields including password. Permissions: storage, clipboardWrite, contextMenus, activeTab; no host_permissions in inspected manifests. Listing describes local generation but discloses broad data categories. Linked policy identifies Helper Box (2019). | Local generation **documented by L and implemented in C/B**. Blanket network guarantees **unsupported**; disclosure is not observed transmission. No-persistent-state claim **contradicted by source**. Show design privacy wording as design evidence, with bounded explanatory copy. |
| Attribution | Sana end-to-end UX design/handoff; developer @zfhassaan; claims both credited inside product. | Handoff supports design execution. About/artwork explicitly credits developer, not Sana. | Names Sana as case-study designer; describes design rationale. | Current footer/About name zfhassaan. Listing publisher display name differs; do not infer legal identity from it. No evidence that Sana authored all current source additions. | Sana design/handoff and developer credit **documented**. In-product dual attribution **unsupported**. Do not expand role to development, sole research ownership or current feature ownership. |
| Feedback and validation | Feedback without external form; generic input errors remain a future improvement. | About directs feedback to GitHub; original screenshots do not establish current validation behavior. | No measured validation study. | Constants link to GitHub new-issue forms; current source includes format-specific validation/help. Build contains corresponding implementation strings. | External feedback **implemented**; “no external form” **incorrect for C**. Original generic-error limitation must be dated to a design stage, not presented as a current verified deficiency. |

## Exact publication wording proposed

These are recommendations, not changes applied to the page.

1. **Project scope:** “I designed Barcode Studio's user experience and developer handoff, working with developer @zfhassaan. The case study distinguishes the supplied design artifacts from the available implementation.”
2. **Export:** “The published listing and inspected implementation support PNG, JPEG, WebP and SVG export, including batch generation. The supplied design screens also include PDF as a design option; PDF export is not supported by the implementation evidence reviewed here.”
3. **Controls:** “The inspected implementation uses separate dropdowns for barcode symbology and export file type. PNG is the initial export default, and a saved preference can be restored.”
4. **Theme:** “Auto, Light and Dark controls sit in the product header. Auto follows the system preference, while a manual choice is retained locally.” Attribute this to the inspected implementation until release mapping is established.
5. **About:** “The About overlay provides privacy information, shortcut guidance, developer attribution and links to GitHub feedback. The supplied light and dark screens document the design treatment.”
6. **Dimensions:** “I designed for a constrained browser popup. The annotated handoff documents a 340×740 frame; the inspected implementation uses different size limits and supports vertical scrolling.” Avoid unnecessary exact runtime-size claims in the main narrative.
7. **Privacy:** “The inspected implementation generates barcodes locally and stores inputs and preferences in the browser's local extension storage. This review did not independently verify all runtime network behavior.” For shorter portfolio copy: “Designed around local barcode generation, with clear privacy messaging at the point of use.”
8. **Ownership:** “UX design and developer handoff: Sana Ishaq. Development: @zfhassaan.” Do not claim that both names appear in the shipped interface.
9. **Speed:** “The design targeted completion in under 30 seconds. This target and the five documented assumptions had not been validated through user testing in the project evidence reviewed.”
10. **Competitive review:** “The documented review considered web barcode tools, TEC-IT/desktop software, existing Chrome extensions and design tools such as Canva. Its observations informed the design direction; they do not establish that every competing product shares these limitations.” No named product sample, study date or participant count should be invented.
11. **Outcome framing:** “The work delivered a documented creation/export flow, light and dark design treatments, and developer handoff. Usability improvements remain design intentions rather than measured results.”
12. **Resources:** “View on Chrome Web Store” links to the exact verified listing; “View implementation source” links separately to the developer repository.

## Confirmed published features vs source-only evidence

**Published-capability confirmed** (listing plus source corroboration, not independent installed-package testing): available v1.2.2 listing; QR and linear barcode generation; PNG/JPEG/WebP/SVG export; batch generation; Wi-Fi QR options; light/dark modes; local-generation description. These are product capabilities, not proof of Sana's ownership of every feature or measured outcomes.

**Implementation confirmed in pinned C/B, exact store mapping unresolved:** Create/Export tabs, dropdown output control, header Auto/Light/Dark switch, persisted settings/input, .txt/.csv batch input and ZIP output, shortcut/context-menu input capture, About and GitHub feedback. Some are also documented by original design artifacts; do not automatically attribute later additions to the designer.

**Designed but release-unverified:** supplied four-tile export UI including PDF, screenshot-specific About variants, handoff dimensions and type styles, the PDF's before/after account.

**Exploratory/unvalidated:** 30-second target; A2 one-format sessions; A3 secondary batch usage; A4 preference for Auto; A5 privacy messaging improving completion; proposed three-session test. No participant study or measured benefit should be added.

**Unsupported as publication facts:** all competitors upload data/require accounts; zero network activity under all circumstances; no persistent state; fixed 400×600 runtime; universal no scrolling; in-product dual credit; PDF export as shipped; all current implementation details being Sana's work.

## Privacy assessment boundary

The inspected application-generation flow calls bundled QR/barcode libraries, builds local outputs and accesses local storage. No payload-upload call was found in that inspected flow. A `fetch()` occurrence in the compiled bundle belongs to the module-preload helper; it is not evidence of payload upload. Neither a string search nor the absence of host permissions certifies all runtime traffic. GitHub feedback deliberately opens external pages. Stored Wi-Fi passwords and input persistence are local-retention facts, not proof of transmission.

Store disclosure lists sensitive data categories; its linked privacy page identifies a different service. Request a product-specific explanation/correction from the developer. Do not describe this as proven tracking, and do not repeat an absolute zero-transmission guarantee. No extension was installed and no network capture was performed.

## Screenshot selection and order

1. **Overview - Barcode.png:** authentic opening composition; caption “Supplied Barcode Studio design artifact showing light and dark Create screens.” Do not call it a current store capture.
2. **Userflow - Barcode.png:** creation, preview and single/batch branches; caption it as the designed flow, not a timed test. PDF format within artwork remains visibly historical/design intent.
3. **Create Light/Dark:** one dominant readable screen and a focused control/input crop. Explain dropdown plus quick choices only as shown; do not call this evidence of dropdown-free selection.
4. **Export Light / Export Dark - Barcde.png:** relevant single/batch evidence. Caption: “Supplied export design with format tiles, including a proposed PDF option; the inspected implementation uses a dropdown and supports JPEG instead.” Preserve the original filename.
5. **About Light/Dark:** only where discussing information and attribution. Explain these are supplied variants, not a proven release comparison.
6. **Colour palette + typography:** design-system excerpts, followed by **documentation - Barcode.png** as the strongest handoff evidence. Preserve product purple and authentic product typography inside images.
7. Link the original decisions PDF with a version-discrepancy note until its historical claims are reconciled. Do not silently edit or replace it.

No fabricated before screen is needed. Current implementation screenshots should be captured only from a release-matched build and clearly labeled; do not substitute them for the designer's contribution evidence.

## Decisions still needed before implementation

1. Approve a **design-and-handoff case study with clearly labeled implementation differences** (recommended), or provide the exact historical release/build and matching artifacts for a strict release narrative.
2. Which controls/version changes were designed by Sana versus introduced during development? In particular: dropdown export, JPEG replacing PDF, Wi-Fi/options and current validation.
3. Can the developer identify the commit/package corresponding to the published store release and reconcile the product-specific privacy disclosure/policy? A matching version number is insufficient.
4. Is the PDF a retrospective account of a shipped redesign or a proposed refinement? Do not publish its before/after story as proven release history until clarified.
5. Approve the exact bounded wording above and visible design-artifact captions; provide any dated competitor sample or subsequent validation if available.

Implementation remains paused. The six-chapter structure is approved in principle, but source/version mapping and ownership require the decisions above.
