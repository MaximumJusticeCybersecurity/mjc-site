# Local Digital Brain Email Access Gate Implementation

## Scope and authority

This implementation executes Issue #20 and the requirements recorded in PR #21.  Dr. Max Justice authorized the bounded engineering path and waived Architect and Verifier A/B/C routing for this change.  Public release remains owner-controlled.

Security hardening after the original implementation is governed by the MJC Web Security Baseline and tracked under Issue #26.

## Implemented flow

1. A normal visit to `/local-digital-brain-guide` loads the existing guide in a locked presentation state.
2. The visitor submits only an email address.  A hidden honeypot field, same-origin enforcement, body-size limit, syntax validation, and a bounded per-instance IP rate limit reject obvious abuse.
3. The browser sends the address in a JSON request body to `/local-digital-brain-lead`.  The address is never placed in a query string, analytics event, console message, local storage, or repository fixture.
4. Vercel rewrites the request to the server-side function at `/api/local-digital-brain-access`.
5. The function sends a guide-access notification through the Resend Email API to an MJC-controlled inbox.  A daily HMAC-derived idempotency key prevents duplicate delivery for the same address during Resend's 24-hour idempotency window.
6. The function grants access only after Resend returns a successful provider receipt.  Provider identity and transaction/receipt identifiers remain server-side and are not returned to the browser.
7. The browser stores only the returned unlock expiration.  The default returning-browser period is 30 days.
8. Failure, timeout, missing configuration, invalid input, honeypot activation, origin mismatch, and rate limiting remain visible and do not unlock the guide.

The gate is a marketing and usage-measurement control.  It is not authentication, authorization, or digital-rights management.  The static guide remains retrievable by a technically determined visitor.

## Origin boundary

The canonical production caller is `https://app.maximumjusticecybersecurity.com`.  The active Vercel preview URL is allowed automatically for deployment verification.  Any other origin, including the root or `www` marketing domains, must be explicitly configured through `LOCAL_DIGITAL_BRAIN_ALLOWED_ORIGINS` and must have a documented browser-use requirement before it is added.

The current browser implementation calls the lead route same-origin from the application-domain guide.  The endpoint does not emit wildcard CORS headers.

## Deployment environment variables

Values must be configured in Vercel and must never be committed.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | Resend sending-only API credential. |
| `LOCAL_DIGITAL_BRAIN_LEAD_TO` | Yes | MJC-controlled inbox receiving guide-access leads. |
| `LOCAL_DIGITAL_BRAIN_LEAD_FROM` | Yes | Verified sender identity on an MJC-controlled domain. |
| `LOCAL_DIGITAL_BRAIN_IDEMPOTENCY_SALT` | Yes | Secret used to HMAC the daily provider idempotency key. |
| `LOCAL_DIGITAL_BRAIN_ALLOWED_ORIGINS` | Optional | Comma-separated additional explicitly approved origins. The application domain and active `VERCEL_URL` are included automatically. |
| `LOCAL_DIGITAL_BRAIN_RATE_LIMIT_MAX` | Optional | Requests allowed per local function-instance window. Default: `5`. |
| `LOCAL_DIGITAL_BRAIN_RATE_LIMIT_WINDOW_MS` | Optional | Local function-instance rate window. Default: `600000`. |
| `LOCAL_DIGITAL_BRAIN_PROVIDER_TIMEOUT_MS` | Optional | Provider timeout. Default: `8000`, maximum: `30000`. |
| `LOCAL_DIGITAL_BRAIN_ACCESS_TTL_DAYS` | Optional | Returning-browser unlock period. Default: `30`, maximum: `365`. |

## One-time provider activation

1. Create or select an MJC-controlled Resend account.
2. Verify the MJC sending domain used by `LOCAL_DIGITAL_BRAIN_LEAD_FROM`.
3. Create a sending-only API key.
4. Configure all required environment variables for Preview and Production as appropriate.
5. Redeploy the exact candidate.
6. Submit one controlled address and verify a redacted provider receipt and inbox delivery through server/provider evidence; the browser response must not contain the receipt identifier.
7. Record the deployed commit and Vercel deployment identity before public release.

No live provider receipt is claimed by repository tests.  CI uses a deterministic provider-contract mock.  Production release must remain blocked until the one-time controlled delivery succeeds.

## Privacy, retention, and deletion

- Data collected: email address only.
- Purpose: provide guide access and understand guide usage.
- No newsletter or unrelated promotional consent is inferred.
- Processing locations: Vercel executes the endpoint; Resend transmits and records the notification; the configured MJC inbox retains the lead.
- Proposed operational retention: retain guide-access lead notifications for no more than 12 months unless an MJC-approved privacy schedule sets a shorter period or a lawful business need requires otherwise.
- Deletion path: delete the lead notification from the MJC inbox and Resend activity, where available, and honor any applicable backup-expiration period.  A requester should use the privacy contact published by MJC.
- The endpoint emits no email-bearing logs and does not return provider receipt identifiers to the browser.  Vercel and Resend platform metadata remain subject to their configured account and service retention.

## Abuse-control limitation

The local IP rate limiter is deterministic and tested but process-local.  Serverless scale-out or cold starts can create independent buckets.  The honeypot, narrow origin validation, provider idempotency, Resend limits, and request bounds remain active.

This process-local limiter is explicitly an interim control and does **not** satisfy the MJC Web Security Baseline requirement for durable/shared or platform-edge production rate limiting.  Issue #26 remains open until that control is implemented and independently verified.

## Tests and evidence

Run:

```text
npm run check:email-gate
```

The check builds the static site, validates endpoint success and failure behavior, validates route and gate injection, and emits redacted synthetic provider-contract evidence under `artifacts/`.

CI asserts that the public response contains neither the submitted email nor provider identity/receipt metadata.  The GitHub workflow also renders desktop and mobile locked-state screenshots from the built guide and uploads them with the test evidence.

## Rollback

Revert the exact implementation/hardening commit.  A rollback of the original gate removes the serverless endpoint, gate assets, build injection, route mappings, tests, workflow, and implementation notes.  Existing guide content remains unchanged in `site/local-digital-brain-guide.html`.  Remove or disable the four required provider environment variables after full gate rollback.  No schema or database migration is involved.
