# Whitaker v4 Hosted Runtime

Version timestamp: 2026070918  
Status: Ready for review and deployment  
Owner and final human authority: Dr. Max Justice

## Purpose

Move Whitaker out of a large inline Squarespace script and into a hosted runtime loaded by one Footer snippet.

## Files

```text
site/whitaker.js
site/whitaker-loader.html
```

## Squarespace Footer code

After this PR is merged and deployed to `app.maximumjusticecybersecurity.com`, replace the current inline Whitaker code in Squarespace:

```html
<script src="https://app.maximumjusticecybersecurity.com/whitaker.js?v=4.0.0" defer></script>
```

## Why this is better

   - One-line Squarespace install.
   - Future Whitaker updates happen in GitHub/deployment, not inside Squarespace.
   - Smaller Squarespace footer.
   - Cleaner rollback by changing/removing one script tag.
   - Easier versioning.
   - Voice and interaction logic can keep growing without manual copy/paste.

## Current v4 features

   - Hosted runtime architecture.
   - Voice-aware input using browser SpeechRecognition where available.
   - Speech output using browser speech synthesis.
   - Guided branching by buyer intent.
   - Smart voice intent mapping.
   - Fit scoring from 0 to 100.
   - Strong/Possible/Weak/Not current routing.
   - CRM-ready meeting context packet.
   - Copy-to-clipboard CRM packet.
   - Calendly handoff to `https://calendly.com/maxjustice`.
   - Email-context handoff to `max@maximumjusticecybersecurity.com`.
   - Sensitive-data guardrails.

## Guardrails preserved

   - No exact pricing.
   - No delivery timing.
   - No autonomous approval claims.
   - No compliance certification claims.
   - No guaranteed risk-reduction claims.
   - No private GitHub token or private CRM write from browser.
   - No external AI API call.
   - No sensitive artifact collection.

## Deployment sequence

1. Review and merge PR.
2. Confirm `https://app.maximumjusticecybersecurity.com/whitaker.js?v=4.0.0` resolves.
3. In Squarespace, go to `Custom Code -> Code Injection -> Footer`.
4. Remove current inline Whitaker script.
5. Paste the one-line loader from `site/whitaker-loader.html`.
6. Save.
7. Test in Chrome/Edge private browser.

## Test script

1. Open live MJC site.
2. Confirm one `Ask Whitaker` button appears.
3. Click `Ask Whitaker`.
4. Enable voice.
5. Click `Tell Whitaker what you need`.
6. Say: `I need help challenging an AI vendor risk recommendation`.
7. Confirm it routes to CyberShield path.
8. Complete fields by voice or typing.
9. Confirm Strong/Possible leads route to Calendly.
10. Confirm `Copy CRM packet` works.

## Rollback

Remove the one-line loader from Squarespace Footer and paste back the last known-good inline v2/v3 script if needed.
