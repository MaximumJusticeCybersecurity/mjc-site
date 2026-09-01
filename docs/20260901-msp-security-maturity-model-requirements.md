# MSP Security Maturity Model — Implementation Requirements

Date: 2026-09-01
Status: Owner-authorized implementation candidate
Repository: `MaximumJusticeCybersecurity/mjc-site`
Branch: `feature/20260901-msp-security-maturity-model`

## Purpose

Add a client-facing Security Maturity Model to the MSP/ChannelPro field kit that MSPs can use for prospect discovery, onboarding, QBRs, vCIO/vCISO reviews, renewals, remediation planning, and security-service conversations.

The model must be operational, evidence-based, simple enough for MSP field use, and bounded so that it does not imply certification, compliance, or guaranteed security.

## Required implementation

### MSP-016 — Security Maturity Model

The MSP field kit shall include:

1. A 0–5 security maturity scale with operational definitions.
2. Ten weighted security domains totaling 100%.
3. NIST CSF 2.0 and CIS Controls v8.1 directional mappings.
4. A `no evidence, no maturity credit` scoring rule.
5. A Critical Control Floor that prevents strong averages from masking catastrophic gaps.
6. Separate Evidence Confidence scoring.
7. A 15–30 minute rapid-assessment instrument.
8. Evidence examples for each domain.
9. 0–30 day, 31–90 day, and 3–12 month remediation horizons.
10. Decision Assurance records for material recommendations.
11. An executive-output format suitable for client review.

## Weighted domains

- Governance & Risk — 10%
- Identity & Access — 15%
- Asset & Configuration — 10%
- Endpoint Security — 10%
- Vulnerability & Patch — 10%
- Email & Collaboration — 10%
- Data Protection — 10%
- Backup & Recovery — 10%
- Detection & Response — 10%
- Resilience & Third Parties — 5%

## Critical Control Floor

The overall score shall be capped at Level 2 / Basic if any of these controls is absent, materially incomplete, or unverified:

- privileged MFA
- managed endpoint detection/response coverage
- recoverable backups for critical systems/data
- successful restore testing
- defined critical vulnerability remediation path
- named incident-response/escalation capability

## Trust boundaries

The public artifact must state or clearly preserve that:

- the model is advisory;
- maturity does not prove absence of risk;
- the score is not a compliance certification;
- framework mappings are directional aids, not compliance determinations;
- evidence should be minimized and client secrets or regulated data should not be stored in public artifacts;
- human accountability remains with the client-designated decision owner;
- material recommendations should retain a decision trail.

## Decision Assurance integration

Material recommendations shall use:

`Finding → Evidence → Risk If Wrong → Recommended Action → Decision Owner → Decision → Verification`

This is an MSP operating pattern and must not redefine the governed CyberShield AI Trust Decision Record or CyberShield risk/recommendation logic.

## Public toolkit integration

The maturity model should ultimately be reachable from the ChannelPro/MSP toolkit landing experience and downloadable/usable without a lead gate.

Recommended public artifacts:

- `/msp-security-maturity-model.md`
- `/msp-security-maturity-rapid-assessment.md`

A later interactive scorer may be implemented as a separate bounded site change after security, privacy, accessibility, and scoring tests are defined.

## Acceptance criteria

1. Maturity levels and weighted domains are present and total 100%.
2. Critical Control Floor is deterministic and clearly documented.
3. Evidence Confidence remains separate from maturity.
4. Rapid assessment includes all ten domains and critical-floor checks.
5. Every domain identifies reasonable evidence sources.
6. Framework mappings are clearly non-certifying.
7. Remediation roadmap horizons are included.
8. Material recommendations can produce a Decision Assurance record.
9. Artifact does not collect or require sensitive client data.
10. Existing MSP field-kit trust boundaries remain intact.
11. Public-site integration receives repository-required review before merge/release.

## Follow-on implementation

After the static instrument is accepted, Forge should implement a browser-side scorer that:

- requires no personal data;
- sends no assessment responses over the network;
- calculates weighted maturity and evidence confidence locally;
- enforces the Critical Control Floor;
- identifies the three weakest domains;
- produces prioritized 30/90/365-day actions;
- allows a printable/exportable executive summary;
- does not claim compliance, certification, probability of breach, or guaranteed risk reduction.
