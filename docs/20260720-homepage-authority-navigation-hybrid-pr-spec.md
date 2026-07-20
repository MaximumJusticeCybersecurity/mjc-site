# Homepage Authority and Navigation Hybrid

Version date: 2026-07-20  
Status: Draft for architect review and engineering implementation  
Owner and final human authority: Dr. Max Justice  
Repository baseline: `main` at `2e77534a4422a36a44a61ce9715facfb4e2bfcdf`

## 1. Decision requested

Review and approve a homepage design direction that preserves the current MJC authority positioning and Capitol-based visual identity while adopting selected usability improvements observed in the Pixlel concept.

This is not approval to copy the Pixlel implementation or replace the current MJC positioning.  The intended result is an MJC-owned hybrid that improves navigation, brand visibility, accessibility, and conversion without reducing the site to a generic AI-generated agency template.

## 2. Current finding

The current MJC site has the stronger strategic foundation:

   - It positions Maximum Justice Cybersecurity as an expert-led cybersecurity and AI governance firm.
   - It supports CyberShield as the AI Decision Assurance product and proof engine.
   - It connects Dr. Max Justice's vCISO, Security SME, and Cybersecurity SME authority to the offer.
   - The Capitol image reinforces federal, institutional, and executive credibility.

The Pixlel concept provides several presentational improvements worth evaluating:

   - A brighter, persistent top navigation area.
   - More visible company naming and navigation controls.
   - More deliberate logo placement.
   - A lighter visual frame that reduces the perception of an excessively dark site.

The Pixlel concept does not establish a materially stronger positioning strategy and should be treated as a reference, not a replacement.

## 3. Proposed design direction

### Preserve

   - The Capitol-based homepage hero or an architect-approved derivative that retains federal and institutional authority.
   - The current AI Decision Assurance positioning hierarchy.
   - CyberShield as the current product and proof engine.
   - The primary CTA: `Challenge One AI Recommendation`.
   - The existing claims, trust, and human-authority boundaries.

### Improve

   - Add a persistent white or lightly translucent navigation bar with sufficient contrast in all scroll states.
   - Display the Maximum Justice Cybersecurity name and MJC logo clearly in the header.
   - Ensure the header remains visually distinct from the hero image.
   - Improve mobile navigation, keyboard navigation, focus visibility, and responsive spacing.
   - Clarify paths for three primary visitor intents:
      1. AI Decision Assurance and CyberShield.
      2. vCISO and executive security leadership.
      3. AI governance, vendor risk, and compliance advisory.
   - Add concise proof near the top of the page using only claims and credentials approved for public use.
   - Standardize `CyberShield` capitalization and product naming throughout the affected routes and metadata.

### Avoid

   - Replacing the Capitol hero with a logo-only hero.
   - Decorative animation without a measurable communication or usability purpose.
   - Generic floating-card patterns that weaken MJC differentiation.
   - TrustMap-first, runtime-first, or broad-platform positioning.
   - Unsupported customer, contract-value, outcome, production-readiness, certification, or guaranteed-risk-reduction claims.
   - Publishing or deploying without explicit owner approval.

## 4. Architect review questions

The architect should resolve the following before engineering implementation:

1. Should the header be fully white, lightly translucent, or transition between transparent and solid based on scroll position?
2. What is the approved desktop and mobile header height, spacing system, and breakpoint behavior?
3. Should the MJC logo appear as a compact header mark only, or also as a restrained secondary hero element?
4. Does the existing Capitol asset meet responsive crop, contrast, performance, and licensing requirements?
5. What visual treatment prevents the Capitol image from implying that MJC serves only federal clients?
6. Which existing page sections are retained, reordered, condensed, or removed to satisfy the current homepage message sequence?
7. Which proof elements are currently approved for public use, and where should they appear?
8. What analytics events will demonstrate whether the revised navigation and CTA hierarchy improve visitor action?

The architect should document accepted decisions in the PR before engineering marks the implementation complete.

## 5. Engineering scope

### Header and navigation

   - Implement the architect-approved persistent header.
   - Include visible MJC branding, navigation labels, and primary CTA treatment.
   - Support desktop, tablet, and mobile layouts.
   - Preserve usable navigation with JavaScript disabled where technically feasible.
   - Ensure focus states, tab order, menu controls, and contrast meet accessibility requirements.

### Hero

   - Retain the Capitol authority concept unless the architect records a replacement decision.
   - Apply responsive image sizing and crop behavior.
   - Preserve text readability at all supported viewport sizes.
   - Use the current governed headline, subheadline, supporting proof, trust line, and CTA hierarchy unless a separate approved content decision supersedes them.

### Visitor pathways

Provide visible pathways for:

   - CyberShield and AI Decision Assurance.
   - vCISO and executive cybersecurity advisory.
   - AI governance, vendor risk, GRC, and compliance leadership.

These pathways may be implemented through navigation labels, homepage cards, or section anchors, but must not compete with the primary CyberShield CTA.

### Proof and credibility

   - Implement a concise Dr. Max Justice credibility block consistent with current governance.
   - Use only approved credentials, metrics, organizations, logos, testimonials, awards, or outcomes.
   - Distinguish advisory services, controlled demonstrations, pilots, current capabilities, and roadmap items.

### Metadata and machine-readable content

Review and align:

   - Browser title and description.
   - Canonical and Open Graph metadata.
   - Structured data.
   - `llms.txt`.
   - Social preview content.
   - Product and authority naming consistency.

## 6. Acceptance criteria

### Architecture

   - [ ] Architect records decisions for header behavior, logo treatment, Capitol hero treatment, mobile behavior, proof placement, and CTA hierarchy.
   - [ ] Proposed design does not restore stale TrustMap-first or runtime-first positioning.
   - [ ] Public claims are mapped to approved evidence or removed.

### Functional

   - [ ] Header remains visible and readable across supported desktop and mobile viewport sizes.
   - [ ] All navigation links and section anchors work.
   - [ ] Primary CTA resolves to the approved CyberShield public route.
   - [ ] Secondary and tertiary CTAs resolve to approved public routes.
   - [ ] Mobile navigation opens, closes, traps focus appropriately when required, and returns focus to the triggering control.
   - [ ] Forms and outbound scheduling links function and explain data use where information is collected.

### Accessibility

   - [ ] Keyboard-only navigation is complete and understandable.
   - [ ] Focus indicators are visible.
   - [ ] Text and interactive-control contrast are verified.
   - [ ] Header, navigation, hero, and CTA semantics are valid.
   - [ ] Motion respects reduced-motion preferences.
   - [ ] Meaningful images include appropriate alternative text; decorative images are ignored by assistive technology.

### Responsive and visual

   - [ ] Capitol imagery remains legible and appropriately cropped on desktop, tablet, and mobile.
   - [ ] Hero text never overlaps critical image details or navigation controls.
   - [ ] Header branding remains visible against all hero and page backgrounds.
   - [ ] No horizontal overflow is introduced.
   - [ ] The result remains recognizably MJC and does not resemble an unmodified generic site-builder template.

### Performance and quality

   - [ ] Hero and logo assets are optimized and do not cause avoidable layout shift.
   - [ ] Existing build and deployment commands continue to work.
   - [ ] Automated checks pass.
   - [ ] A manual desktop and mobile QA record is attached to the PR.
   - [ ] Before-and-after screenshots are attached to the PR.

### Governance and release

   - [ ] The exact routes changed are listed in the PR.
   - [ ] Metadata, forms, analytics, accessibility, claims, and rollback are reviewed.
   - [ ] No production deployment or domain change occurs from this PR without explicit owner approval.
   - [ ] Dr. Max Justice provides final approval before merge and public release.

## 7. Verification plan

Engineering should provide:

   - Local build result.
   - Automated test and lint results available in the repository.
   - Desktop screenshots at representative wide and standard widths.
   - Mobile screenshots at representative narrow widths.
   - Keyboard-navigation results.
   - Link and CTA destination verification.
   - Metadata and social-card verification.
   - Lighthouse or equivalent accessibility and performance evidence, with material regressions explained.
   - A rollback statement identifying the prior known-good commit or deployment.

## 8. Out of scope

   - Copying the Pixlel site or its proprietary assets.
   - Replatforming the website.
   - Changing the approved CyberShield product direction.
   - Publishing new pricing or delivery commitments.
   - Adding unsupported client logos, contract values, testimonials, certifications, or outcome claims.
   - Production deployment, DNS changes, or domain migration.

## 9. Handoff sequence

1. Architect reviews this specification and records design decisions in the PR.
2. Owner resolves any positioning, claims, or visual-authority questions.
3. Engineer implements the approved design on this branch or a linked implementation branch.
4. Engineer attaches verification evidence and before-and-after screenshots.
5. Architect performs implementation review against the recorded decisions.
6. Owner provides final merge and release approval.
