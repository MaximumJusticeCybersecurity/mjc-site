# Security Policy

Maximum Justice Cybersecurity (MJC) takes vulnerability disclosure seriously. Please use the process below to report suspected security issues affecting this repository or the production services it supports.

## Supported Versions

Security support is provided for the current production release represented by the `main` branch and the currently deployed production environment.

Older commits, superseded previews, archived branches, and retired deployments are not independently supported unless they remain reachable from production or materially affect the current production security posture.

## Reporting a Vulnerability

Do **not** open a public GitHub issue for a suspected vulnerability and do not include exploit details, secrets, personal data, or sensitive evidence in public discussions.

Use GitHub's **Private vulnerability reporting** capability for this repository whenever it is available. From the repository's **Security and quality** area, select **Report a vulnerability** and provide the details through the private advisory workflow.

If private vulnerability reporting is unavailable, contact MJC at `max@maximumjusticecybersecurity.com` and request a private channel for security disclosure. Do not include sensitive exploit details in the initial message.

Please include, when available:

- A concise description of the vulnerability and affected component
- Reproduction steps or a minimal proof of concept
- The affected URL, endpoint, workflow, commit, or deployment
- Preconditions required for exploitation
- Expected and observed behavior
- Potential confidentiality, integrity, availability, authorization, or privacy impact
- Whether exploitation has been observed in the wild
- Suggested remediation or compensating controls, if known

## Response Targets

MJC will make a reasonable effort to:

- Acknowledge a credible report within **2 business days**
- Complete initial triage within **5 business days**
- Prioritize containment and remediation based on exploitability, affected assets, business impact, and risk-if-wrong
- Keep the reporter informed when material status changes occur

These are response targets, not contractual service-level guarantees. Complex issues, third-party dependencies, or coordinated fixes may require additional time.

## Severity and Handling

Reports are evaluated using technical severity together with operational context, including:

- Exploitability and attack prerequisites
- Exposure of production systems or sensitive data
- Authentication or authorization bypass
- Impact to confidentiality, integrity, or availability
- Supply-chain or deployment impact
- Potential for privilege escalation, persistence, or lateral movement
- Risk to customers, users, MJC operations, or downstream systems

Critical or actively exploited issues may trigger immediate containment, credential rotation, deployment rollback, temporary feature restriction, or other emergency controls before a permanent fix is available.

## Responsible Disclosure Expectations

We ask researchers to:

- Avoid privacy violations, data destruction, service degradation, denial-of-service activity, social engineering, phishing, or physical attacks
- Use the minimum access and data necessary to demonstrate the issue
- Stop testing and report immediately if sensitive data or unauthorized access is encountered
- Allow a reasonable period for investigation and remediation before public disclosure
- Coordinate public disclosure with MJC when practical

Good-faith research that follows this policy is intended to support remediation, not exploitation.

## Scope Notes

This policy applies to security issues in this repository and production assets directly supported by it. Third-party platforms, libraries, SaaS providers, and infrastructure may also be subject to their own security policies and disclosure programs.

This repository does not operate a standing public bug-bounty program. Submission of a report does not create an entitlement to payment, reward, employment, or other compensation unless explicitly agreed in writing.

## Disclosure and Advisory Process

Validated vulnerabilities may be handled through GitHub private security advisories, private remediation branches, coordinated deployment, and—when appropriate—a published security advisory after remediation.

Public disclosure should not occur before affected production systems have been reasonably protected and MJC has had an opportunity to coordinate remediation.