# MJC Web Security Baseline

Status: Mandatory release-governance baseline once merged
Date: 2026-08-18
Scope: `maximumjusticecybersecurity.com`, `www.maximumjusticecybersecurity.com`, `app.maximumjusticecybersecurity.com`, and the source/deployment path that publishes those surfaces.

## Purpose

Maximum Justice Cybersecurity is a security firm. Its public web estate must be operated as demonstrable evidence of the controls MJC recommends to clients. Security controls are release requirements, not advisory guidance.

This baseline consolidates the 2026-08-18 external/source-aware assessment with the existing SecURL remediation in PR #22 and the broader operational program in issue #25.

## Mandatory control objectives

### WEB-01 Transport security

- HTTPS only for production endpoints
- HSTS verified on production responses
- No mixed active content
- TLS posture externally verified after material infrastructure changes and at least quarterly
- `includeSubDomains` and preload require explicit subdomain inventory and owner approval before adoption

### WEB-02 Browser security policy

Application-controlled production responses must explicitly define and regression-test, at minimum:

- Content Security Policy
- clickjacking protection through CSP `frame-ancestors` or equivalent
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- `Permissions-Policy`
- cross-origin isolation/resource controls where compatible with approved integrations

CSP exceptions such as `unsafe-inline` must be documented compatibility constraints with a follow-on path to removal or hashing/nonces.

### WEB-03 Public API request controls

Public APIs must enforce:

- explicit method allowlisting
- explicit content-type validation
- bounded request bodies
- server-side input validation
- non-wildcard origin policy when cross-origin use is required
- generic error responses
- durable/shared or platform-edge rate limiting suitable for horizontally scaled/serverless execution
- no sensitive values in URLs, client logs, analytics events, or unnecessary public response metadata

Process-local memory is not accepted as the sole production rate-limit boundary for a serverless endpoint.

### WEB-04 Authentication and authorization boundaries

Client-side state such as `localStorage`, hidden elements, JavaScript flags, or browser-controlled expiration values must never be treated as an authorization boundary.

The Local Digital Brain email gate is a lead-capture/conversion mechanism only. If protected or proprietary material is later placed behind a gate, access must be enforced server-side.

### WEB-05 Secrets and sensitive data

- Secrets must be supplied through approved environment/secret stores
- `.env` and local environment files remain excluded from source control
- repository secret scanning and push protection should be enabled where available
- public lead-routing interfaces must not solicit credentials, private keys, regulated data, active-incident artifacts, or confidential customer material
- public API responses return only data required by the client

### WEB-06 Software supply chain

- GitHub Actions use minimum required permissions
- third-party Actions are pinned to reviewed immutable commit SHAs unless a documented exception is approved
- dependencies remain minimal and intentional
- workflow/dependency changes require security review
- security-sensitive changes generate reproducible build/test evidence

### WEB-07 Protected production branch

The production branch must require designated CI/security checks before merge. Direct bypass is prohibited except under a documented emergency procedure with retrospective review.

Required checks must include, as applicable:

- build/test validation
- site security posture validation
- lead/API sensitive-data leak tests
- future durable-rate-limit tests once the control is implemented

### WEB-08 Production boundary and domain control

GitHub is the source authority, not the preferred customer-facing product hostname. Primary customer product routes should converge on MJC-controlled application domains, principally `app.maximumjusticecybersecurity.com`, as migration allows.

Legacy GitHub Pages routes must be inventoried, intentionally retained or redirected, and removed from primary customer journeys when the application-domain replacement is verified.

### WEB-09 Security disclosure

Maintain RFC 9116 `/.well-known/security.txt` with an approved security contact, canonical URL, preferred language, and unexpired `Expires` value.

### WEB-10 Operational verification

At least quarterly, and after material infrastructure changes, retain evidence for:

- live security headers
- TLS posture
- DNSSEC and CAA posture
- SPF, DKIM, and DMARC alignment
- WAF/bot/rate-limit operation where deployed
- GitHub/Vercel/Squarespace MFA and least-privilege access
- secret-scanning/push-protection configuration
- backup/restore capability for business-critical configuration and source
- logging/alerting coverage for security-relevant events

## Release exception policy

A change that weakens a mandatory web-security control must fail automated validation or carry an explicit documented exception approved by the security owner. Every exception requires:

- accountable owner
- rationale
- compensating control
- expiration/review date
- tracking issue

## Initial remediation priorities from the 2026-08-18 assessment

### P1

1. Replace process-local-only production API throttling with durable/shared or platform-edge rate limiting
2. Merge and validate the source-controlled header/security.txt hardening in PR #22
3. Configure production branch rules so designated security CI checks are required, not advisory

### P2

4. Pin third-party GitHub Actions to immutable SHAs
5. Verify MFA/least privilege and secret-scanning/push-protection settings
6. Migrate primary CyberShield customer routes from GitHub Pages to the MJC application domain
7. Complete external DNS/TLS/email-security verification under issue #25

### P3

8. Remove unnecessary provider receipt metadata from public API responses
9. Reconcile the intended same-origin/cross-origin API design and precise CORS behavior
10. Keep the Local Digital Brain gate explicitly documented as non-authoritative client-side lead capture

## Accountability

- Engineer / Forge: implement platform, code, pipeline, and infrastructure changes
- Verifier A: code/control implementation review
- Verifier B: negative-path and regression validation
- Verifier C: evidence, governance, and release-control verification
- Security owner / Business Partner: residual-risk and exception review
- Dr. Max Justice: final production authority

## Traceability

- Implementation PR: #22
- Operational umbrella: #25
- Assessment date: 2026-08-18
