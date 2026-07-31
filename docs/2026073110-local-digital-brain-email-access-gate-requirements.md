# Local Digital Brain Starter Guide Email Access Gate Requirements

Version timestamp: 2026073110  
Owner: Dr. Max Justice  
Repository baseline: `55332ca2e1ba270ae824b9288e4d40d810b1d157`  
Implementation path: Direct engineering  
Architect review: Waived by owner  
Verifier A/B/C review: Waived by owner for this bounded change  
Public route: `https://app.maximumjusticecybersecurity.com/local-digital-brain-guide`

## Owner decision

Dr. Max Justice directs that every normal user opening the free Local Digital Brain Starter Guide must submit an email address before guide access is granted.  The purpose is to identify and measure who is accessing the guide.

This is a bounded conversion and lead-capture change.  The owner authorizes direct engineering implementation without Architect routing or Verifier A/B/C review.  The engineer remains responsible for implementation quality, test evidence, privacy disclosure, rollback, and exact-candidate traceability.

## Required behavior

1. All “Open the Free Guide,” “Open the Free Starter Guide,” and equivalent calls to action must route to the canonical guide URL:
   `https://app.maximumjusticecybersecurity.com/local-digital-brain-guide`
2. A visitor who has not completed the email gate must see an email-entry form before the guide content is shown.
3. The form must require a syntactically valid email address.
4. Successful submission must record or deliver the email to an MJC-controlled destination before access is granted.
5. After successful capture, the visitor must receive immediate access to the guide without unnecessary additional steps.
6. The experience must work on desktop and mobile and remain keyboard accessible.
7. Returning visitors on the same browser may remain unlocked for a reasonable period to avoid repeated submissions.
8. Failed submission or unavailable lead-capture service must fail visibly.  The page must not falsely claim that the email was captured.
9. The gate is a marketing and measurement control, not an authentication or digital-rights-management boundary.  The implementation must not describe it as security protection.
10. Existing guide content, print/save-as-PDF capability, metadata, branding, and responsive behavior must remain intact after access is granted.

## Data and privacy requirements

- Collect only the minimum required field: email address.  Name, phone, company, role, and consent to unrelated marketing are out of scope for this change.
- Display a concise disclosure adjacent to the submit control explaining that MJC uses the email to provide guide access and understand guide usage.
- Do not state or imply newsletter or promotional consent unless a separate optional consent control is implemented.
- Do not expose API keys, credentials, or provider secrets in client-side code.
- Do not log full email addresses to browser console output, analytics events, public URLs, or public repository files.
- Protect the submission endpoint against obvious automated abuse using rate limiting, a honeypot, CAPTCHA, or an equivalent bounded control.
- Use HTTPS only.
- Document the lead destination, processor, retention expectation, and deletion path in implementation notes without committing secrets.

## Engineering constraints

- Keep scope limited to the Local Digital Brain landing page, guide access route, lead-capture endpoint or approved provider integration, tests, and deployment documentation.
- Do not modify unrelated website positioning, CyberShield claims, pricing, navigation hierarchy, Whitaker behavior, or other funnels.
- Prefer an MJC-controlled server-side endpoint.  A third-party form processor may be used only when its data path and activation/deployment dependency are documented.
- Do not grant guide access based only on client-side validation when the capture request has failed.
- Preserve clean URL behavior for `/local-digital-brain-guide`.
- Record all required deployment environment variables by name only.  Never commit their values.

## Acceptance criteria

- [ ] Anonymous visit to `/local-digital-brain-guide` displays the email gate rather than the guide body.
- [ ] Empty and malformed email submissions are rejected with accessible inline feedback.
- [ ] A valid submission reaches the configured MJC-controlled lead destination.
- [ ] Guide access is granted only after a successful capture response.
- [ ] The guide opens successfully at the canonical clean URL after submission.
- [ ] Existing print/save-as-PDF behavior works after access is granted.
- [ ] All landing-page guide CTAs use the canonical URL.
- [ ] Keyboard-only and screen-reader-oriented form labels are present.
- [ ] Mobile layout is verified.
- [ ] Failure, timeout, duplicate submission, and rate-limit behavior are tested.
- [ ] No email value appears in query strings, analytics payloads, console logs, or repository content.
- [ ] Deployment variables and one-time provider activation steps are documented.
- [ ] Rollback is documented and limited to reverting the gate implementation commit.
- [ ] Exact implementation commit and deployed candidate are recorded before public release.

## Required test evidence

The engineering pull request must include:

1. Desktop screenshot of the locked state.
2. Mobile screenshot of the locked state.
3. Successful valid-email submission evidence with the address redacted.
4. Invalid-email validation evidence.
5. Lead-destination receipt evidence with personal data redacted.
6. Guide-access evidence after successful capture.
7. Failure-path evidence when the capture endpoint is unavailable.
8. Build and route verification for the canonical URL.

## Completion gate

The change is complete when the engineer implements the bounded gate, satisfies every acceptance criterion, records deployment dependencies and test evidence, and presents the exact candidate for owner-authorized release.  No Architect or Verifier A/B/C approval is required for this specific owner-authorized change.