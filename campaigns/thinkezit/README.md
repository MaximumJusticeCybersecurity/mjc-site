# ThinkEzIT Vertical Campaign Demonstration

## Objective
Demonstrate how one ThinkEzIT capability set becomes two materially different market conversations: legal and healthcare. Do not expose the underlying campaign machinery to prospects.

## Cadence
1. Jab 1 — industry-specific readiness check / useful diagnostic
2. Jab 2 — personalized observation + one deeper operational insight
3. Hook — low-risk conversation / existing ThinkEzIT 30-day trial where appropriate

## Campaign attribution
Use stable campaign identities and prospect-specific `utm_content` values so traffic can be reconciled without collecting assessment answers or sensitive prospect data.

- Legal Jab 1: `utm_source=outreach&utm_medium=email&utm_campaign=thinkezit_legal_jab1&utm_content=[prospect_slug]`
- Healthcare Jab 1: `utm_source=outreach&utm_medium=email&utm_campaign=thinkezit_healthcare_jab1&utm_content=[prospect_slug]`
- Jab 2 / Hook touches should preserve the same vertical campaign family and use a stage-specific campaign value only when the downstream analytics implementation can reconcile it deterministically.
- Do not transmit readiness-check answers through URL parameters or analytics events.

## Target radius
Approximately 90 road/market miles from Chambersburg, PA. Prioritize Chambersburg, Hagerstown, Carlisle, Gettysburg, Frederick, Harrisburg-area edge, Waynesboro/Greencastle, Martinsburg and adjacent reachable markets before expanding.

## Prospect score (100)
- Operational complexity / staff scale: 20
- Multiple locations or remote-work dependency: 15
- Sensitive/high-consequence information: 20
- Digital workflow dependency: 15
- Downtime/business-continuity consequence: 15
- Security/compliance pressure: 10
- Geographic/relationship accessibility: 5

Scores must be based on observable public characteristics and industry exposure. Never claim an unverified vulnerability.

## Legal segmentation
Tier A: multi-attorney firms, multiple practice areas/offices, high document/email dependency, business/estate/real-estate/family/municipal practices.
Tier B: smaller firms with strong digital dependency and meaningful continuity/confidentiality exposure.
Tier C: solos/micro-firms unless an observable trigger increases fit.

## Healthcare segmentation
Tier A: independent or multi-site physician/specialty groups, dental groups, behavioral health, senior/long-term care, ambulatory providers with meaningful endpoint/workflow dependency.
Tier B: smaller practices with high digital/communications dependency.
Tier C: organizations whose IT is centrally controlled by a large health system unless a local decision path is observable.

## Personalization rules
Each outbound touch must include at least one verified firm/practice-specific fact. Personalization should explain why the issue matters to that organization; it must not imply that ThinkEzIT has observed a security weakness.

## Measurement
Track prospect, segment, score, owner, Jab 1 date, Jab 2 date, Hook date, opens/clicks where lawful and technically available, replies, meetings, disposition, and suppression status. Use campaign-specific UTM values for page traffic.

## Video production grammar
- Real Dr. Justice Walk & Talk source footage
- Blue shirt preferred; black shirt fallback
- Camera perspective approximately waist height
- Pulled back enough to reduce visible lip-sync artifacts
- Subtle 10–20% distance/framing changes to imply Michael and Barry as two walking companions
- Human/conversational, not cinematic
- ~2 minutes

## Media provenance gate
A landing page must not reference a video or local brand asset unless that exact file exists on the candidate and its provenance is approved. Missing media fails closed to a text-first page rather than a broken player, generated substitute, or guessed asset path.

The prior legal page reference to `/media/thinkezit/Walk_Talk_Canonical_Reusable_Source_2026-08-25.mp4` had no corresponding file on this candidate and is therefore removed until an approved source is materialized.

## Status
Legal Jab 1 page: built; broken/unproven local video reference removed pending approved media materialization
Healthcare Jab 1 page: built
Campaign/UTM attribution: explicitly bound for Jab 1
Campaign methodology: documented
Video narration: specified separately
Video render: pending approved Walk & Talk source materialization and provenance; do not invent a substitute asset
Approved local ThinkEzIT logo/media provenance: still required before final release if local asset packaging is required
Analytics/lead-routing implementation: still pending bounded decision and verification
Production QR package: not ready until canonical production routes and final media/CTA state are verified
