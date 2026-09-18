# CyberShield Customer Route Migration Architecture

Date: 2026-09-02  
Parent: mjc-site #28  
Status: `READY_WITH_CONDITIONS_FOR_BOUNDED_IMPLEMENTATION`

## Objective

Move the primary CyberShield customer journey from GitHub Pages onto the MJC-controlled application domain without breaking the existing customer path, creating a new trust plane, or treating DNS/domain ownership as proof of application security.

GitHub remains a source/repository and temporary compatibility/rollback surface. The preferred production customer trust boundary is `https://app.maximumjusticecybersecurity.com`.

## Current observed legacy routes

1. `https://maximumjusticecybersecurity.github.io/CyberShield/vendor-risk-next.html`
2. `https://maximumjusticecybersecurity.github.io/CyberShield/`

Current negative evidence from #28 shows likely MJC-domain replacements were not implemented at the prior probe and returned 404. Therefore production cutover remains prohibited until replacements are independently proven.

## Exact route disposition

| Legacy route | Disposition | Initial MJC-domain replacement | Legacy treatment |
|---|---|---|---|
| `/CyberShield/vendor-risk-next.html` | MIGRATE | `https://app.maximumjusticecybersecurity.com/vendor-risk-next.html` | RETAIN during compatibility/rollback window; do not remove before replacement validation |
| `/CyberShield/` | MIGRATE | `https://app.maximumjusticecybersecurity.com/cybershield/` | RETAIN during compatibility/rollback window; later redirect/retire only after evidence and separately authorized cutover |

The initial replacement paths deliberately preserve the current customer semantics. A later clean-URL redesign may be proposed separately; it is not required to close this migration and must not delay removal of the fragmented production trust boundary.

## Canonical routing rules

1. MJC-owned production pages and CTAs shall prefer the application-domain replacements after preview/production verification.
2. Legacy GitHub Pages URLs remain valid compatibility/rollback targets through the migration observation window.
3. No automatic client-side fallback from an MJC-domain security error to GitHub Pages is permitted. Rollback is an explicit deployment/configuration decision, not a silent browser downgrade.
4. The legacy route may redirect only to an allowlisted MJC destination after the replacement is independently proven. No user-controlled return/destination parameter may influence redirect target.
5. Canonical metadata for migrated application pages must identify the MJC-domain route, not the GitHub Pages compatibility URL, after cutover.
6. Internal links, TrustMap/CyberShield CTA constants, generated assets, documentation and CI destination checks must converge on the MJC-domain routes in the same implementation candidate.

## Trust and security boundary

The application-domain routes must inherit or exceed the accepted MJC web-security baseline:

- HTTPS with valid certificate and HSTS where current site policy applies;
- restrictive CSP compatible with required CyberShield functionality;
- `frame-ancestors` / anti-clickjacking control;
- content-type and referrer protections;
- narrow CORS and secure cookie settings where cookies exist;
- no repository/client-side secrets;
- no new public admin/debug/config endpoints;
- dependency provenance/lock integrity;
- input/output validation where user input exists;
- no sensitive diagnostic payload in analytics or URLs;
- least-privilege backend/service identity where applicable;
- safe errors with no stack/config leakage.

Migration must not create implicit shared authentication merely because pages now share the MJC domain. Authentication/session behavior must remain explicit and independently tested.

## Content and behavior equivalence

Before any production-link cutover, Forge must prove for each replacement route:

- expected route returns success rather than 404/redirect loop;
- customer-facing purpose and primary CTA remain intact;
- required deep-link/query behavior is preserved or explicitly dispositioned;
- accessibility and responsive behavior do not materially regress;
- security headers/CSP are present and functional;
- canonical metadata is correct;
- analytics required for business measurement works without leaking sensitive content;
- no unintentional static exposure of protected product/API behavior is introduced.

Pixel identity is not required. Functional/security equivalence is required.

## Migration state machine

```text
LEGACY_ONLY
  -> REPLACEMENT_IMPLEMENTED_PREVIEW
  -> REPLACEMENT_VERIFIED_PREVIEW
  -> REPLACEMENT_DEPLOYED_PRODUCTION
  -> REPLACEMENT_VERIFIED_PRODUCTION
  -> MJC_LINKS_CUTOVER
  -> OBSERVATION_WINDOW
  -> LEGACY_REDIRECT_OR_RETIRE_DECISION
```

Failure at any state before `MJC_LINKS_CUTOVER` leaves current links unchanged. Material production failure after cutover triggers rollback to the last proven customer route.

## Rollback contract

Rollback evidence must include:

1. exact pre-cutover link/config identity;
2. exact replacement deployment identity;
3. ability to restore MJC website/CTA destinations to the still-live legacy routes without code invention;
4. legacy routes verified reachable immediately before cutover;
5. post-rollback smoke test of the customer journey;
6. incident/rollback receipt identifying reason and affected route.

Do not delete the legacy GitHub Pages assets before the observation window and explicit retirement decision are complete.

## Observation window

After production cutover, monitor at minimum:

- route 4xx/5xx and redirect-loop failures;
- CTA/customer-journey failures;
- CSP/security-header regressions;
- unexpected traffic to legacy endpoints;
- analytics discontinuity where measurement is approved;
- reports of broken deep links.

No fixed duration is asserted by architecture. Forge/release owner may propose a bounded window based on traffic and rollback confidence; legacy retirement requires evidence rather than elapsed time alone.

## Bounded Forge handoff

Forge may now implement a candidate limited to:

1. create the two application-domain replacement routes;
2. preserve required customer functionality and deep-link behavior;
3. apply the MJC security baseline;
4. update source CTA destinations and compiled/generated references within the governed build path;
5. add deterministic route/destination/security-header checks;
6. document deployment and rollback evidence;
7. produce preview evidence without changing production links until verification gates permit cutover.

### Explicitly prohibited in this handoff

- immediate deletion of GitHub Pages routes;
- unverified production cutover;
- open redirects;
- weakening CSP/security headers to make migration pass;
- adding privileged APIs/admin surfaces merely to reproduce a static route;
- credential or secret exposure;
- merge/deployment/production activation by inference from this architecture;
- treating current Vercel readiness as migration verification.

## Required verification

### Verifier A
- route mapping and deterministic destination checks;
- link/asset/reference completeness;
- deep-link behavior;
- rollback mechanics;
- exact-candidate test evidence.

### Verifier B
- customer journey usefulness and continuity;
- no unnecessary friction introduced by migration;
- rollback and legacy-retention behavior are owner-legible.

### Verifier C / Security Agent
- headers/CSP/TLS boundary;
- redirect manipulation;
- cross-origin/session/cookie confusion;
- protected API/static exposure;
- analytics/referrer leakage;
- legacy-route downgrade/phishing risk;
- post-cutover rollback safety.

## Release boundary

`ARCHITECT_GATE = RESOLVED`

`DISPOSITION = READY_WITH_CONDITIONS`

`NEXT_ACCOUNTABLE_ROLE = ENGINEER / FORGE -> SAME_CANDIDATE VERIFIER A/B/C -> AUTHORIZED CUTOVER OWNER`

`PRODUCTION_CUTOVER = DENY_PENDING_REPLACEMENT_IMPLEMENTATION_AND_VERIFICATION`

`LEGACY_ROUTE_DELETION = DENY_PENDING_OBSERVATION_AND_RETIREMENT_DECISION`

`OWNER_DECISION_REQUIRED_NOW = NONE`
