# ChannelPro MSP Field Kit — Accountable Action Register

Version timestamp: 2026082614  
Status: Active PR action register  
Owner and final human authority: Dr. Max Justice  
Repository: `MaximumJusticeCybersecurity/mjc-site`  
PR: #51  
Branch: `feature/20260826-channelpro-msp-field-kit`

## Operating rule

Every action has one accountable resolver.  No item may be left assigned to `team`, `all`, `TBD`, or an unnamed group.

Reviewers may identify defects or request changes, but the accountable resolver owns closure and evidence.  The Agent Register / Executive Assistant owns reconciliation of this register and shall not mark an item closed without a concrete evidence reference.

## Team-role mapping for this work

- **Forge — Engineer / Builder:** implementation, code, UI, routes, artifacts, test fixes, and preview defects.
- **Verifier A — Decision Assurance Implementer:** independent functional and requirements acceptance review; validates that the field kit behaves as specified and that outputs remain bounded.
- **Aegis — Verifier B / Decision Assurance and Trust Reviewer:** independent governance, claims, human-authority, trust, and AIDA-methodology review.
- **Security Agent — Verifier C:** independent security, privacy, CSP/CORP, data-handling, and client-side boundary review.
- **Agent Register / Executive Assistant:** assignment reconciliation, evidence tracking, PR closeout, unresolved-item tracking, and handoff control.
- **Lindsay — Outreach / Follow-up Operations:** conference lead reconciliation and post-event follow-up actions after Dr. Justice provides names, notes, or business cards.
- **Dr. Max Justice — Owner / vCISO / Security SME / Cybersecurity SME:** conference field validation, public-claims authority, and final merge/public-release decision.
- **Architect — Architecture authority:** only owns architecture changes if an independent verifier identifies a defect that cannot be resolved within the approved implementation boundary.  Architect does not replace Forge for ordinary implementation fixes.

## Implementation ownership

| ID | Deliverable / requirement | Accountable resolver | Independent acceptance / handoff | Status |
|---|---|---|---|---|
| MSP-001 | Hero, MSP-specific value, and CTA hierarchy | Forge | Verifier A | Implemented; acceptance pending |
| MSP-002 | 10-minute AI Decision Review Scan and bounded review-need outputs | Forge | Verifier A; Aegis reviews trust boundary | Implemented; acceptance pending |
| MSP-003 | Five-minute consequential AI decision check | Forge | Verifier A | Implemented; acceptance pending |
| MSP-004 | AI-Assisted Decision Record template | Forge | Aegis | Implemented; acceptance pending |
| MSP-005 | MSP AI Vendor Due-Diligence Checklist | Forge | Aegis | Implemented; acceptance pending |
| MSP-006 | Client AI Discovery / QBR Questionnaire | Forge | Aegis | Implemented; acceptance pending |
| MSP-007 | Human-at-the-Helm escalation matrix | Forge | Aegis | Implemented; acceptance pending |
| MSP-008 | AI Incident Evidence Checklist | Forge | Security Agent; Aegis for decision-evidence boundary | Implemented; acceptance pending |
| MSP-009 | MSP AI Opportunity Map | Aegis | Dr. Max Justice for commercial-positioning approval | Implemented candidate; validation pending |
| MSP-010 | `Bring Me a Decision` and MSP/channel partnership CTA | Forge | Aegis for claims; Dr. Max Justice for public-use approval | Implemented; acceptance pending |
| MSP-011 | First-party `/msp-qr.svg` conference QR asset | Forge | Verifier A | Implemented; acceptance pending |
| MSP-012 | MSP-specific `llms.txt` machine-readable content | Forge | Aegis | Implemented; acceptance pending |
| MSP-013 | `/msp` route, CORP coverage, and repository-compatible security headers | Forge | Security Agent | Implemented; acceptance pending |
| MSP-014 | Deterministic MSP field-kit regression tests | Forge | Verifier A; Security Agent reviews security-relevant assertions | Implemented and CI green |
| MSP-015 | Intent analytics without assessment-answer collection | Forge | Security Agent for privacy boundary; Verifier A for event behavior | Implemented candidate; receipt not yet claimed |

## Required pre-release verification ownership

| Verification item | Accountable resolver | Required evidence / disposition |
|---|---|---|
| Build succeeds on exact PR head | Forge | Green build/check reference |
| `/msp` and extensionless route resolve correctly | Verifier A | Route test / preview evidence |
| All assessment paths produce bounded advisory outputs | Verifier A | Functional test evidence and any defects routed to Forge |
| Assessment answers are not transmitted over the network | Security Agent | Privacy/data-flow review; defects routed to Forge |
| All four downloadable field-kit artifacts are reachable | Verifier A | Link/download verification; defects routed to Forge |
| Keyboard navigation and visible focus | Verifier A | Accessibility review; defects routed to Forge |
| Mobile and desktop layout | Verifier A | Responsive review; defects routed to Forge |
| CTA destinations and mailto prompts | Verifier A | Link/action review; wording defects routed to Forge/Aegis as applicable |
| CSP/CORP/security posture | Security Agent | Security review plus CI evidence; defects routed to Forge unless architecture change required |
| Public privacy/data-handling boundary | Security Agent | PASS/FAIL disposition; defects routed to Forge |
| Public claims, credentials, no overclaiming, no prohibited guarantees | Aegis | Claims review; copy defects routed to Aegis for approved correction and Forge for implementation |
| AIDA / Decision Assurance methodology fidelity | Aegis | PASS/FAIL disposition; methodology defects routed to Aegis, implementation defects to Forge |
| Verifier A independent review | Verifier A | Exact-head review record |
| Verifier B independent review | Aegis | Exact-head review record |
| Verifier C independent review | Security Agent | Exact-head review record |
| Reconcile all verifier findings to named owners | Agent Register / Executive Assistant | Updated action register with no unowned open item |
| Final public claims / event-use decision | Dr. Max Justice | Explicit owner approval or rejection |
| Merge to `main` | Dr. Max Justice | Explicit owner approval after verifier requirements are satisfied |
| Public release/deployment | Dr. Max Justice | Separate explicit release approval under repository policy |

## Defect-routing rule

When a verifier opens a finding, the finding must immediately receive one resolver:

- **Code, HTML, CSS, JavaScript, route, test, artifact-link, responsive, or build defect -> Forge.**
- **Claims, wording, AIDA fidelity, human-authority, ethical-influence, or commercial-positioning defect -> Aegis.**  If code must change to implement the approved correction, Aegis hands the approved correction to Forge.
- **Security, privacy, data-flow, CSP/CORP, client-data, or browser-boundary defect -> Security Agent for disposition, then Forge for remediation.**
- **Architecture defect outside the approved candidate boundary -> Architect.**  Architect returns an approved design to Forge for implementation.
- **Assignment, status, missing evidence, or closeout defect -> Agent Register / Executive Assistant.**
- **Public-release, public-claims authority, or business-policy decision that cannot be resolved under existing requirements -> Dr. Max Justice.**

No verifier owns remediation of code they independently verify, except for documenting the finding and acceptance criteria.

## Conference field-validation ownership

| Field-validation action | Accountable resolver | Output |
|---|---|---|
| Use the elevator pitch and field kit in ChannelPro conversations | Dr. Max Justice | Real buyer reactions and use cases |
| Capture role/company, AI use case, pain point, decision owner, Risk If Wrong, internal/client/both, preferred delivery model, and follow-up commitment | Dr. Max Justice | Conference field notes; do not place sensitive client data in Git |
| Reconcile names/business cards/notes into a follow-up list | Lindsay | Deduplicated follow-up register |
| Execute approved post-event outreach and scheduling | Lindsay | Follow-up status and next action per contact |
| Analyze whether conversations support, weaken, or contradict buyer hypotheses | Aegis | Post-event hypothesis/evidence assessment |
| Decide changes to offer, packaging, message, or commercial path | Dr. Max Justice | Owner decision routed into requirements/change process |
| Convert approved changes into requirements | Aegis | Updated Requirements Steward packet / change entry |
| Implement approved post-event site/product changes | Forge | Review branch / PR candidate |
| Track all post-event actions until closed or explicitly deferred | Agent Register / Executive Assistant | Action register with evidence references |

## Known unvalidated assumptions — owners

| Assumption to resolve | Accountable resolver | Resolution mechanism |
|---|---|---|
| Which MSP AI problem has the highest willingness to pay | Aegis | Analyze Dr. Justice's field evidence; recommend test/offer |
| Internal MSP use vs client resale/delivery vs both | Aegis | Segment conference evidence and identify repeated pattern |
| Best first paid entry: decision review, managed service, assessment, training, or platform | Aegis | Commercial hypothesis analysis; owner decision by Dr. Justice |
| Which artifact creates the strongest follow-up intent | Aegis | Combine conference evidence with verified analytics after approved deployment |
| Channel distribution vs direct MSP consulting | Aegis | Compare partner interest, direct-buyer interest, and follow-up conversion |
| Whether analytics events are received in production | Forge | Verify after approved deployment; do not claim before evidence |
| Whether a server-side lead capture is warranted | Aegis | Recommend only after field evidence; Security Agent owns privacy review if approved |

## Current exact-head CI evidence

The PR has already demonstrated green results on the exact candidate head before this assignment-only commit for:

- Site Security Posture;
- MJC Site Conversion Check;
- Required Security Gate; and
- Local Digital Brain Email Gate.

Because this action-register commit changes the PR head, the Agent Register / Executive Assistant must reconcile the new exact-head workflow status before closeout.  No prior-head result may be represented as exact-head verification for the new commit.

## Closure rule

PR #51 is not ready for merge/public release until:

1. Verifier A, Aegis/Verifier B, and Security Agent/Verifier C each provide their independent disposition on the exact candidate head;
2. every finding has one named resolver and evidence-backed closure or an explicit owner-approved deferral;
3. the Agent Register / Executive Assistant confirms there are no unowned actions;
4. Dr. Max Justice provides explicit merge approval; and
5. Dr. Max Justice separately provides explicit public-release approval where required.
