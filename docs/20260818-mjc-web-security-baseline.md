# MJC Web Security Baseline

Status: Proposed mandatory production baseline
Date: 2026-08-18
Scope: `maximumjusticecybersecurity.com`, `www.maximumjusticecybersecurity.com`, `app.maximumjusticecybersecurity.com`, and the source/deployment path that publishes those surfaces.

## Purpose

Maximum Justice Cybersecurity is a security firm. Its public web estate must be operated as demonstrable evidence of the controls MJC recommends to clients. Security controls are release requirements, not advisory guidance.

## Control objectives

### WEB-01 Transport security

- HTTPS only for production endpoints
- HSTS on application-controlled production responses
- No mixed active content
- TLS configuration reviewed periodically with an external scanner

### WEB-02 Browser security policy

Application-controlled production responses must explicitly define, at minimum:

- `Content-Security-Policy` or a documented staged `Content-Security-Policy-Report-Only` rollout with a dated enforcement milestone
- `Strict-Transport-Security`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- `Permissions-Policy`
- clickjacking protection through CSP `frame-ancestors` or an equivalent supported control

Header policy must be source controlled and regression tested.

### WEB-03 API request controls

Public APIs must enforce:

- explicit method allowlisting
- explicit content-type validation
- bounded request bodies
- server-side input validation
- non-wildcard origin policy when cross-origin use is required
- generic error responses that do not expose secrets or unnecessary provider metadata
- durable rate limiting appropriate to horizontally scaled/serverless execution
- no sensitive values in URLs, client logs, analytics events, or public responses

In-memory-only throttling is not accepted as the sole production rate-limit control for a serverless endpoint.

### WEB-04 Authentication and authorization boundaries

Client-side state such as `localStorage`, hidden elements, JavaScript flags, or browser-controlled expiration values must never be treated as an authorization boundary.

The Local Digital Brain email gate is a lead-capture/conversion mechanism only. If protected or proprietary material is later placed behind a gate, access must be enforced server-side.

### WEB-05 Secrets and sensitive data

- Secrets must be supplied through approved environment/secret stores
- `.env` and local environment files remain excluded from source control
- repository secret scanning and push protection should be enabled where available
- no credentials, API keys, private keys, regulated data, active-incident artifacts, or confidential customer material may be accepted through public lead-routing interfaces
- public responses should return only the metadata required by the client

### WEB-06 Software supply chain

- GitHub Actions must use minimum required permissions
- third-party Actions should be pinned to reviewed immutable commit SHAs
- dependency count should remain minimal and intentional
- dependency and workflow changes require security review
- build/test evidence must be generated for security-sensitive changes

### WEB-07 Protected production branch

The production branch must require designated CI/security checks before merge. Direct bypass of required release checks is prohibited except under a documented emergency procedure with retrospective review.

Required controls should include:

- build/test validation
- web-security baseline validation
- sensitive-data leak tests for lead-capture/API changes
- conversation resolution/review as configured by repository governance

### WEB-08 Production boundary and domain control

GitHub is the source authority, not the preferred customer-facing application hostname. Public product traffic should converge on MJC-controlled production domains, principally `app.maximumjusticecybersecurity.com`, as migration allows.

Legacy GitHub Pages routes must be inventoried, intentionally retained or redirected, and removed from primary customer journeys when the MJC application domain is ready.

### WEB-09 Security contact and disclosure

Publish and maintain `/.well-known/security.txt` or an equivalent standards-aligned disclosure route containing an approved security contact and disclosure expectations.

### WEB-10 Operational verification

At least quarterly, and after material infrastructure changes, verify and retain evidence for:

- live security headers
- TLS posture
- DNSSEC and CAA posture
- SPF, DKIM, and DMARC alignment for the corporate domain
- WAF/bot/rate-limit operation where deployed
- GitHub/Vercel/Squarespace MFA and least-privilege access
- secret-scanning/push-protection configuration
- backup/restore capability for business-critical configuration and source
- logging and alerting coverage for security-relevant events

## Release policy

A pull request that weakens a mandatory web-security control must fail automated validation or carry an explicit, documented exception approved by the security owner. Exceptions require an owner, rationale, compensating control, expiration date, and tracking issue.

## Initial remediation priorities

### P1

1. Replace in-memory-only production API throttling with a durable/shared or platform-edge rate limiter
2. Source-control and enforce application security headers
3. Make security CI required on the production branch

### P2

4. Pin third-party GitHub Actions to immutable SHAs
5. Verify MFA/least-privilege and secret-scanning/push-protection settings
6. Migrate primary CyberShield customer routes from GitHub Pages to the MJC application domain
7. Publish `security.txt`

### P3

8. Remove unnecessary provider receipt metadata from public API responses
9. Reconcile same-origin/cross-origin API design and explicit CORS behavior
10. Document the Local Digital Brain gate as non-authoritative client-side lead capture
11. Verify DNSSEC, CAA, and corporate email-domain security controls

## Verification ownership

- Engineer / Forge: implement platform, code, pipeline, and infrastructure changes
- Verifier A: code/control implementation review
- Verifier B: negative-path and regression validation
- Verifier C: evidence, governance, and release-control verification
- Security owner / Business Partner: accept residual risk and approve exceptions where required
