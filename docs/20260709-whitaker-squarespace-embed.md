# Whitaker Squarespace Embed

Version timestamp: 2026070910  
Status: Ready for owner/site-admin placement  
Owner and final human authority: Dr. Max Justice

## Purpose

Embed Whitaker, the MJC AI Sales Agent, into the Squarespace-powered MJC site as a lightweight revenue widget.

## Current widget script

Repository path:

```text
site/whitaker-widget.js
```

## Squarespace code block embed

Add this before the closing body area or in a site-wide code injection footer when approved:

```html
<script src="https://app.maximumjusticecybersecurity.com/whitaker-widget.js" defer></script>
```

If Squarespace is serving from a different asset path, use the final deployed URL for `whitaker-widget.js`.

## What the widget does

   - Opens as a bottom-right `Ask Whitaker` button.
   - Gives a sensitive-data warning before free-text collection.
   - Classifies visitor intent.
   - Qualifies for CyberShield, vCISO, GRC, incident-readiness, partner/referral, or other paths.
   - Routes Strong and Possible fit visitors to `https://calendly.com/maxjustice`.
   - Creates an email-context option to `max@maximumjusticecybersecurity.com`.
   - Tracks widget events through the existing `mjc:conversion` event pattern and Vercel analytics when present.

## What the widget does not do

   - It does not collect sensitive artifacts.
   - It does not create private GitHub CRM records directly from the browser.
   - It does not expose GitHub credentials or repository write tokens.
   - It does not quote exact pricing or delivery timing.
   - It does not claim autonomous approval, compliance certification, or guaranteed risk reduction.

## Revenue OS handoff

Qualified leads should be recorded in:

```text
MaximumJusticeCybersecurity/mjc-revenue-os/crm/whitaker-leads/
```

using:

```text
MaximumJusticeCybersecurity/mjc-revenue-os/templates/whitaker-lead-record-template.md
```

## Release checklist

   - Confirm widget displays on desktop and mobile.
   - Confirm `https://calendly.com/maxjustice` opens correctly.
   - Confirm mailto context opens to `max@maximumjusticecybersecurity.com`.
   - Confirm sensitive-data warning appears before form submission.
   - Confirm analytics events do not include sensitive form text.
   - Confirm no pricing or delivery timing appears.
   - Obtain owner approval before production Squarespace placement.
