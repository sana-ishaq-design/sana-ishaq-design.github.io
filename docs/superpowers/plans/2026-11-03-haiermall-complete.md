# Complete HaierMall migration implementation plan

**Goal:** Deliver the complete, standalone local case study in the seven owner-approved editorial sections.
**Architecture:** One shared Astro document renders the canonical .html route and a noindex preview alias. Source-derived content retains original wording for findings, decisions and learnings. The original HTML remains immutable input; only its generated output is replaced.
**Tech stack:** Existing Astro, React outcomes, TypeScript, CSS, Sharp and Playwright. No dependencies added.
**Spec:** Owner's November 3 approval in this chat: The project; The impact; Understanding the problem; Redesigning the purchase journey; Building for implementation; Results and reflection; What's next.

## Constraints and review focus
- Preserve original source files, homepage, other legacy routes, metadata, canonical, four exact verified results and attribution.
- Keep all five findings, six decisions, four screen exports, four learnings and credits; no invented evidence.
- Different visual compositions inside one journey chapter; unchanged shared navigation and theme controls.
- Check 1440, 768, 390 and 320px in both themes, keyboard and no-JavaScript access, fragment links, full images and contrast.
- Existing approval authorizes local implementation; no additional planning approval gate, commit, push, merge or deployment.

## Tasks
1. Add migration assertions covering source prose, seven sections, images, metadata and legacy preservation. Run against the existing slice to establish failure.
2. Extract immutable source content, build the shared complete document and canonical route, generate original-image derivatives, and scope the one route exception in the public copy step. Preserve all other guards.
3. Refine responsive editorial CSS; run build, Astro check and full tests. Capture both themes at four widths; review imagery and typography, test navigation, local anchors, theme persistence and no-JS content.
4. Document source-to-section coverage, conflicts and review limitations. Leave working tree local for owner review.

## Progress
- Source audit refreshed. Subscribe Me canonical and title verified from original HTML.
- Baseline branch is feature/phase-1-editorial-slice; prior About/Contact/navigation edits retained.
- Complete: seven-section migration and canonical route, source extraction and original derivatives.
- Complete: build; Astro diagnostics (0 errors/warnings/hints); all 22 regression tests.
- Complete: both themes at 1440/768/390/320px; no overflow, zero axe violations, all images decoded, shared navigation, keyboard focus, theme persistence and no-JS content.
- Complete: read-only independent review; restored the persistent flash-sale detail and strengthened raw metadata comparison. Removed duplicate handoff summary. Final screenshots refreshed after fixes.
- Left local and uncommitted for owner review. No push, merge or deployment.
