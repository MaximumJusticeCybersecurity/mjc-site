# Whitaker Widget Release Check

Date: 2026-07-09  
Status: Review required before public release  
Owner and final human authority: Dr. Max Justice

## Files changed

   - `site/whitaker-widget.js`
   - `docs/20260709-whitaker-squarespace-embed.md`

## Requirements reviewed

   - `AGENTS.md`
   - `docs/2026062312-mjc-site-positioning-and-conversion-requirements.md`
   - `docs/2026062312-content-source-of-truth-and-feedback-currency.md`
   - `content-governance.json`

## Public routes used

   - Calendly: `https://calendly.com/maxjustice`
   - CyberShield challenge: `https://maximumjusticecybersecurity.github.io/CyberShield/vendor-risk-next.html`
   - Vendor-risk example: `https://maximumjusticecybersecurity.github.io/CyberShield/`
   - Email: `max@maximumjusticecybersecurity.com`

## Claims review

The widget avoids:

   - Exact pricing.
   - Delivery timing.
   - Production-readiness claims.
   - Autonomous approval claims.
   - Compliance certification claims.
   - Guaranteed risk-reduction claims.
   - Fear inflation or artificial scarcity.

## Data handling review

The widget warns visitors not to submit:

   - Passwords.
   - Secrets.
   - Private keys.
   - Regulated data.
   - Confidential customer data.
   - Active incident details.

## Known limitation

The widget cannot write directly to the private Revenue OS GitHub CRM from the browser without exposing credentials or adding an approved backend.  It prepares context for email and Calendly handoff.  Private CRM records should be created inside Revenue OS from safe lead data.

## Owner release decision needed

Public Squarespace placement still requires owner/site-admin approval and insertion of the embed snippet:

```html
<script src="https://app.maximumjusticecybersecurity.com/whitaker-widget.js" defer></script>
```
