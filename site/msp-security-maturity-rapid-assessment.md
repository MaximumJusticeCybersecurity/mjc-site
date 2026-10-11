# MSP Security Maturity Rapid Assessment

Use this 15–30 minute instrument for prospect discovery, QBRs, onboarding, and prioritization. It is a screening tool, not a certification or replacement for a full risk assessment.

Score each question from 0–5 using the MSP-SMM maturity scale. Record evidence confidence separately.

## 1. Governance & Risk — 10%

1. Is there a named person accountable for cybersecurity risk and security decisions?
2. Are security policies current, owned, reviewed, and tied to actual operating practices?
3. Are material cyber risks, exceptions, and accepted risks documented with accountable owners?
4. Are critical vendors and outsourced providers subject to security review and accountability?

Suggested evidence: policy register, risk register, exception log, vendor-review records, meeting/QBR artifacts.

## 2. Identity & Access — 15%

5. Is MFA enforced for all privileged/administrative access?
6. Is MFA broadly enforced for workforce access, including remote/cloud access?
7. Are joiner/mover/leaver changes performed through a defined and timely lifecycle process?
8. Are privileged, shared, and service accounts inventoried, minimized, and reviewed?

Suggested evidence: identity-provider exports, MFA coverage report, privileged-role listing, terminated-user samples, service-account inventory.

## 3. Asset & Configuration — 10%

9. Does the organization maintain an authoritative inventory of managed hardware?
10. Does it maintain an inventory of installed software, SaaS, and unsupported/end-of-life technology?
11. Are secure configuration baselines defined for key endpoints, servers, and cloud services?
12. Are configuration drift, unmanaged assets, and exceptions identified and resolved?

Suggested evidence: RMM/MDM/CMDB exports, software inventory, secure-baseline policy, exception reports.

## 4. Endpoint Security — 10%

13. Is managed EDR/XDR deployed to all supported endpoints and servers?
14. Are device encryption, host firewall, hardening, and screen/security policies centrally enforced?
15. Is local administrator access restricted and governed?
16. Does the MSP/client monitor security-agent health and investigate coverage gaps?

Suggested evidence: EDR coverage report, MDM/RMM policy, encryption report, local-admin inventory, agent-health dashboard.

## 5. Vulnerability & Patch — 10%

17. Are internet-facing and internal systems routinely assessed for vulnerabilities/exposures?
18. Are remediation priorities based on severity, exploitability, exposure, and business impact rather than CVSS alone?
19. Are remediation SLAs defined and exceptions explicitly approved?
20. Is remediation independently verified or rescanned before findings are considered closed?

Suggested evidence: vulnerability reports, patch dashboard, SLA policy, exception tickets, rescan evidence.

## 6. Email & Collaboration — 10%

21. Are SPF, DKIM, and DMARC appropriately configured and monitored for owned domains?
22. Are phishing, malicious links/files, impersonation, and business-email-compromise controls centrally managed?
23. Are users trained and tested against common social-engineering threats?
24. Are external sharing and guest access governed across collaboration platforms?

Suggested evidence: DNS/authentication records, mail-security configuration, phishing exercise results, external-sharing reports.

## 7. Data Protection — 10%

25. Does the organization know where its most sensitive or regulated data resides?
26. Is sensitive data encrypted appropriately in transit and at rest?
27. Are access, retention, sharing, and disposal requirements defined and enforced?
28. Are sensitive-data exposure and excessive access periodically reviewed?

Suggested evidence: data inventory/classification records, encryption policies, access reviews, retention rules, DLP/discovery reports.

## 8. Backup & Recovery — 10%

29. Are all critical systems and data covered by managed backups?
30. Are backup copies protected from production credential compromise and ransomware, including immutable/offline protections where appropriate?
31. Are restores tested successfully on a defined schedule?
32. Are RPO and RTO objectives documented for critical services and validated through recovery exercises?

Suggested evidence: backup coverage report, immutable-copy configuration, restore-test record, RPO/RTO matrix, exercise results.

## 9. Detection & Response — 10%

33. Are security-relevant logs centrally collected for critical identities, endpoints, infrastructure, and cloud services?
34. Is there a named party responsible for 24x7 or otherwise contractually defined alert monitoring and escalation?
35. Is there a documented incident-response process with roles, contacts, containment, evidence, and communication requirements?
36. Has the incident-response process been exercised or used and subsequently improved?

Suggested evidence: SIEM/MDR coverage, escalation matrix, IR plan, incident tickets, tabletop/exercise report.

## 10. Resilience & Third Parties — 5%

37. Are critical third-party and SaaS dependencies identified, including concentration/single-provider risk?
38. Does the organization maintain usable BCP/DR plans for material business interruptions?
39. Are critical suppliers periodically reassessed for security and continuity risk?
40. Are crisis communications, cyber-insurance contacts where applicable, and executive decision authorities documented and exercised?

Suggested evidence: dependency register, BCP/DR plans, vendor reassessments, exercise artifacts, communication matrix.

# Critical Control Floor — mandatory

Mark each Pass / Fail / Unverified:

- Privileged MFA
- Managed EDR/XDR coverage
- Critical-system backup coverage
- Successful restore testing
- Critical vulnerability remediation path
- Named incident-response/escalation capability

Any Fail or Unverified result caps the overall maturity rating at Level 2 / Basic.

# Evidence Confidence

For each domain record confidence as 0–100% based on the strength, recency, and completeness of evidence.

Recommended rapid-assessment convention:

- Interview/self-attestation only: 0–39%
- Partial documentation or screenshots: 40–69%
- Strong technical and process evidence: 70–89%
- Direct evidence plus recent operating/test evidence: 90–100%

# Executive Summary Template

- Overall Security Maturity: ___ / 5
- Rating: ___
- Target State: ___ / 5
- Critical Control Floor: PASS / FAIL
- Critical Control Gaps: ___
- Evidence Confidence: ___%
- Three weakest domains: ___ / ___ / ___
- Highest Risk If Wrong finding: ___
- Top five actions: ___
- 0–30 day priorities: ___
- 31–90 day priorities: ___
- 3–12 month priorities: ___

For each material recommendation create a Decision Assurance record:

**Finding → Evidence → Risk If Wrong → Recommended Action → Decision Owner → Decision → Verification**
