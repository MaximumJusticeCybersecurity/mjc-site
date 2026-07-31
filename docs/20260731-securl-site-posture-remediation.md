# SecURL Site Posture Remediation

Date: 2026-07-31  
Owner and final release authority: Dr. Max Justice  
Repository: `MaximumJusticeCybersecurity/mjc-site`  
Baseline commit: `6e47be8c5638cc56f610191983b2271b99d11109`  
Review branch: `security/securl-site-hardening-20260731`

## External evidence received

The owner supplied three SecURL shared-report identifiers for review:

- `588fc687-37e8-4d87-a009-9365164068ef`
- `24237227-0ae5-4b7e-9863-078cf03f3ca2`
- `9253e883-3dbb-4155-b3b7-8625e3a8eaa4`

SecURL is a passive external-posture scanner. Its public documentation states that it evaluates response headers, TLS, cookies, redirects, DNS and email posture, public disclosure signals, third-party assets, inline code, and related observable evidence. Scanner grades are prioritization signals, not proof of exploitability, compliance, or application security.

The shared report pages are client-rendered. Their detailed finding payload was not exposed in the initial HTML response available to this review. The remediation below is therefore limited to gaps independently verified against the exact repository baseline and to controls documented by the scanner. No scanner severity label is treated as authoritative without supporting evidence.

## Accepted and implemented

### Global response-security headers

`vercel.json` now applies the following controls to all routes:

- `Content-Security-Policy`
- `Cross-Origin-Opener-Policy: same-origin`
- `Permissions-Policy`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`

The CSP is constrained to the site origin except for the approved Whitaker voice runtime. It blocks plugins and framing, restricts form submission, upgrades insecure requests, and does not permit `unsafe-eval`.

### Security disclosure contact

The build now publishes `/.well-known/security.txt` with:

- A monitored MJC contact address
- A bounded expiration date
- English as the preferred language
- A canonical URL on the application domain

The record must be renewed before its expiration date.

### Regression protection

A deterministic test validates the security headers, critical CSP directives, and the built `security.txt` artifact. A dedicated GitHub Actions workflow runs this check for relevant pull requests and changes to `main`.

## Already platform-owned

Vercel documents a default `Strict-Transport-Security` response header with a two-year maximum age. This change does not override the platform default or add an irreversible HSTS preload commitment in repository configuration.

TLS certificate issuance, protocol support, and edge redirect behavior remain deployment-platform controls. They must be verified against the preview and production domains during release validation.

## Constrained or deferred

### Cross-Origin-Resource-Policy

A blanket `Cross-Origin-Resource-Policy: same-origin` header was not added. MJC intentionally serves Whitaker JavaScript from the application domain for use by a Squarespace origin. A global same-origin CORP policy would block that approved cross-origin script distribution path.

Follow-on options:

1. Move distributable widget assets to a dedicated host or route with an explicit `cross-origin` resource policy, while keeping site documents and private assets `same-origin`.
2. Replace the current cross-origin distribution model and then apply `same-origin` globally.
3. Add route-specific Vercel behavior only after preview evidence proves that duplicate or overlapping header rules do not produce ambiguous browser behavior.

This is a documented compatibility constraint, not a scanner-score exception.

### Inline script and style allowances

The current static HTML contains inline scripts and styles. The CSP therefore retains `unsafe-inline` for `script-src` and `style-src`. `unsafe-eval` remains prohibited.

Removing these allowances requires a bounded follow-on change to extract inline code into versioned files or introduce stable CSP hashes. That work should be separately tested across all public pages before enforcement.

### DNS and email posture

SPF, DKIM, DMARC, CAA, DNSSEC, MTA-STS, TLS-RPT, BIMI, and related domain controls are not governed by this repository. No DNS record was changed without exact target-domain evidence and access to the authoritative DNS configuration.

### Cookies and application logic

The public site does not establish an authenticated session in the reviewed baseline. Cookie findings, if present in a report, require exact cookie names and issuing responses before remediation. Passive scanner output cannot replace authenticated testing, code review, abuse testing, or penetration testing.

## Release validation

Before merge or production release:

1. Require the `Site Security Posture` workflow to pass.
2. Inspect preview response headers for `/`, the guide route, the lead API route, and `/.well-known/security.txt`.
3. Confirm navigation, email capture, Whitaker browser fallback, and server TTS still work.
4. Verify the site is not unintentionally frameable.
5. Re-run the external scans against the exact production URLs and compare deltas.
6. Record any remaining findings as accepted, constrained, deferred, rejected, or platform-owned.

## Rollback

Rollback is a revert of the remediation commits or closure of the review pull request before merge. No domain, DNS, or production deployment change is included in this branch.
