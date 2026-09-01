# MSP Security Maturity Model (MSP-SMM)

Use this model during prospect discovery, onboarding, QBRs, vCIO/vCISO reviews, renewal planning, and security-roadmap conversations.

The model is an advisory maturity framework. It does **not** certify compliance, prove security, replace a formal risk assessment, or guarantee that a control is effective.

## Core scoring rule

**No evidence, no maturity credit.**

A stated control is not equivalent to a verified control. Score based on evidence available at the time of assessment.

| Level | Name | Operational meaning |
|---|---|---|
| 0 | Unknown | No reliable evidence that the control exists or operates |
| 1 | Reactive | Ad hoc, person-dependent, inconsistent, usually after-the-fact |
| 2 | Basic | Control exists but coverage, ownership, consistency, or evidence is incomplete |
| 3 | Managed | Documented, assigned, repeatable, monitored, and routinely operated |
| 4 | Measured | Effectiveness is tested, metrics exist, exceptions are tracked, and improvements are deliberate |
| 5 | Resilient | Continuously validated, automated where appropriate, recovery-tested, governed, and adapted to material change |

## Weighted domains

| Domain | Weight | Primary concern | NIST CSF 2.0 alignment | CIS Controls v8.1 alignment |
|---|---:|---|---|---|
| Governance & Risk | 10% | Accountability, policies, risk ownership, exceptions, third parties | Govern | 14, 15, 17 |
| Identity & Access | 15% | MFA, privileged access, lifecycle, service accounts, conditional access | Protect | 5, 6 |
| Asset & Configuration | 10% | Hardware/software inventory, baselines, unsupported assets, shadow IT | Identify, Protect | 1, 2, 4 |
| Endpoint Security | 10% | EDR/XDR, hardening, encryption, local admin, device management | Protect, Detect | 4, 10 |
| Vulnerability & Patch | 10% | Discovery, prioritization, remediation SLAs, verification | Identify, Protect | 7 |
| Email & Collaboration | 10% | Phishing resistance, domain protections, malicious content, external sharing | Protect, Detect | 9, 14 |
| Data Protection | 10% | Classification, encryption, retention, DLP, sensitive-data discovery | Identify, Protect | 3 |
| Backup & Recovery | 10% | Immutable/offline copies, credential separation, restore testing, RPO/RTO | Protect, Recover | 11 |
| Detection & Response | 10% | Logging, SOC/MDR, alert handling, escalation, IR exercises | Detect, Respond | 8, 13, 17 |
| Resilience & Third Parties | 5% | BCP/DR, critical suppliers, SaaS dependencies, incident communications | Govern, Identify, Recover | 11, 15, 17 |

## Overall score

For each domain:

`weighted domain score = domain maturity (0–5) × domain weight`

Overall maturity is the sum of weighted domain scores divided by 100.

### Rating bands

| Overall score | Rating |
|---|---|
| 0.0–0.9 | Unknown / Uncontrolled |
| 1.0–1.9 | Reactive |
| 2.0–2.9 | Basic |
| 3.0–3.9 | Managed |
| 4.0–4.6 | Measured |
| 4.7–5.0 | Resilient |

## Critical Control Floor

The weighted average must not hide catastrophic weaknesses.

If any of the following are absent, materially incomplete, or unverified, the overall rating is capped at **Level 2 / Basic** until remediated or validated:

1. MFA for privileged/administrative access
2. Managed endpoint detection/response on supported endpoints
3. Recoverable backups for critical business systems and data
4. Successful restore testing for critical backups
5. Defined remediation path for critical vulnerabilities/exposures
6. Defined incident-response capability with named escalation responsibility

A client may have strong policy documentation and still remain Level 2 when a critical operational safeguard is missing.

## Evidence confidence

Report maturity and evidence confidence separately.

| Confidence | Meaning |
|---|---|
| 0–39% | Mostly interview/self-attestation; weak verification |
| 40–69% | Partial artifacts or technical evidence |
| 70–89% | Strong evidence across most material controls |
| 90–100% | Direct evidence plus recent operating/testing evidence across nearly all material controls |

Evidence confidence does not increase maturity by itself. It communicates how strongly the maturity score is supported.

## Minimum evidence types

Use evidence appropriate to the control, including:

- configuration screenshots or exports
- identity/MFA policy exports
- EDR/RMM coverage reports
- asset/software inventories
- vulnerability/patch reports
- backup job and restore-test records
- security alert/ticket samples
- incident-response plans and exercise records
- policies with owner and review date
- third-party/security review records
- log-retention/SIEM evidence
- documented exceptions and risk acceptances

Do not place client secrets, credentials, regulated data, or unnecessary sensitive evidence in the toolkit record.

## Domain scoring anchors

### Governance & Risk
- 1: security decisions are informal and owner-dependent
- 2: policies and responsibilities exist but are incomplete or inconsistently maintained
- 3: named owners, policy lifecycle, risk tracking, and exception handling are repeatable
- 4: risk metrics, testing, vendor oversight, and management review demonstrate effectiveness
- 5: governance adapts to changing threats/business conditions and is continuously validated

### Identity & Access
- 1: passwords dominate; privileged accounts are loosely controlled
- 2: MFA and lifecycle controls exist but have material gaps/exceptions
- 3: MFA, privileged access, joiner/mover/leaver, and service-account controls are consistently governed
- 4: access effectiveness, exceptions, stale privileges, and privileged activity are measured and reviewed
- 5: phishing-resistant/strong authentication and adaptive controls are broadly deployed and continuously validated

### Asset & Configuration
- 1: inventories are incomplete or manually reconstructed
- 2: primary assets are tracked but software/SaaS/configuration coverage is incomplete
- 3: authoritative inventories and configuration baselines are maintained with owners
- 4: drift, unsupported assets, shadow IT, and baseline exceptions are measured
- 5: discovery and configuration validation are continuous with rapid exception handling

### Endpoint Security
- 1: basic AV or inconsistent controls
- 2: centrally managed controls exist but coverage/hardening/local-admin gaps remain
- 3: managed EDR, encryption, hardening, and device management are consistently enforced
- 4: control health and attack-path effectiveness are measured and tested
- 5: endpoint controls are continuously validated and tuned against current threat behavior

### Vulnerability & Patch
- 1: reactive patching; limited visibility
- 2: scanning/patching exists but prioritization and SLA discipline are inconsistent
- 3: routine scanning, risk-based prioritization, defined SLAs, and closure verification operate consistently
- 4: exposure, exploitability, exceptions, and remediation performance are measured
- 5: continuous exposure management informs rapid, risk-based remediation and validation

### Email & Collaboration
- 1: basic spam filtering; weak user/domain protections
- 2: anti-phishing and domain protections exist with material coverage/configuration gaps
- 3: email authentication, malicious content defenses, awareness, and sharing controls are consistently governed
- 4: phishing outcomes, exceptions, impersonation risks, and sharing exposures are measured
- 5: identity-aware collaboration controls and attack simulations continuously improve resistance

### Data Protection
- 1: sensitive data is poorly understood or protected inconsistently
- 2: encryption and access controls exist but classification/retention/discovery are incomplete
- 3: sensitive data locations, access, encryption, retention, and disposal are repeatably governed
- 4: exposure, DLP events, access patterns, and exceptions are measured
- 5: data protections adapt continuously to business use, regulatory needs, and changing exposure

### Backup & Recovery
- 1: backups exist but coverage/restore viability is uncertain
- 2: scheduled backups operate but immutability, separation, testing, or documented RPO/RTO has gaps
- 3: critical systems have protected backups, named RPO/RTO, and routine restore tests
- 4: restore performance and recovery readiness are measured against objectives
- 5: recovery is routinely exercised under realistic failure/ransomware scenarios and continuously improved

### Detection & Response
- 1: alerts are handled reactively with little central visibility
- 2: logging/security tooling exists but ownership, coverage, triage, or escalation has gaps
- 3: monitoring, alert triage, escalation, incident handling, and evidence preservation are repeatable
- 4: detection coverage, response times, false positives, and exercises are measured
- 5: detection/response is continuously validated through threat-informed testing and lessons learned

### Resilience & Third Parties
- 1: dependencies and continuity needs are informal
- 2: critical vendors and continuity plans are identified but validation is incomplete
- 3: critical dependencies, BCP/DR, vendor risk, communication paths, and recovery responsibilities are documented and tested
- 4: supplier performance, concentration risk, exercises, and recovery metrics are measured
- 5: resilience is continuously tested against material dependency failures and business-impact scenarios

## Remediation horizons

Every assessment should produce a roadmap in three horizons:

### 0–30 days — Exposure reduction
Prioritize exploitable weaknesses, critical-control-floor failures, unsupported assets, privileged-access gaps, backup viability, and incident-response ownership.

### 31–90 days — Foundational maturity
Establish repeatable ownership, policies, configuration standards, lifecycle processes, evidence capture, metrics, and operational cadence.

### 3–12 months — Measured resilience
Improve testing, automation, threat-informed validation, recovery exercises, third-party assurance, metrics, and continuous improvement.

## Decision Assurance record for material recommendations

For every material recommendation preserve:

**Finding → Evidence → Risk If Wrong → Recommended Action → Decision Owner → Decision → Verification**

Example:

- Finding: privileged identities are not consistently protected by strong MFA
- Evidence: 7 of 19 privileged identities lack required enforcement
- Risk If Wrong: critical; compromise may provide administrative control
- Recommended Action: enforce strong MFA and eliminate unmanaged privileged identities
- Decision Owner: client-designated accountable executive
- Decision: remediate, modify, defer, accept, or request more evidence
- Verification: MSP retests privileged identities after the implementation window

Human oversight and independent corroboration should increase with Risk If Wrong.

## Executive output

Each completed assessment should report:

- Overall Security Maturity: X.X / 5 and rating
- Target State: X.X / 5
- Critical Control Floor: Pass / Fail
- Critical Control Gaps: count
- High-Priority Findings: count
- Evidence Confidence: percentage
- Three weakest domains
- Top five remediation actions
- 30/90/365-day roadmap
- Material Decision Assurance records

## Operating principle

**Maturity is not the absence of risk. A useful maturity model makes risk, evidence, ownership, and the next decision visible.**
