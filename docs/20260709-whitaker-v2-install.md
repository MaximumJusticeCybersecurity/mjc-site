# Whitaker v2 Interactive Install

Version timestamp: 2026070915  
Status: Ready for Squarespace Code Injection replacement  
Owner and final human authority: Dr. Max Justice

## Purpose

Upgrade the live Whitaker widget from a basic lead router to a more interactive guided qualification agent.

## File to use

```text
site/whitaker-inline-v2.html
```

## Install path

In Squarespace:

```text
Pages -> Custom Code -> Code Injection -> Footer
```

Replace the current Whitaker inline script with the entire contents of:

```text
site/whitaker-inline-v2.html
```

Save, then test in a private/incognito window.

## What changed in v2

   - Guided branching by buyer intent.
   - Progress bar.
   - Separate contact step and qualification step.
   - Fit score from 0 to 100.
   - Fit labels: Strong, Possible, Weak, Not current.
   - CRM-ready meeting context packet displayed to the user.
   - Copy-to-clipboard CRM packet button.
   - Strong/Possible visitors get Calendly and email-context actions.
   - Weak visitors are routed to the vendor-risk proof example.
   - Better mobile behavior.
   - Duplicate-install guard.

## Revenue behavior

Strong or Possible leads are routed to:

```text
https://calendly.com/maxjustice
```

Lead context can be emailed to:

```text
max@maximumjusticecybersecurity.com
```

## Guardrails preserved

   - No exact pricing.
   - No delivery timing.
   - No autonomous approval claims.
   - No compliance certification claims.
   - No guaranteed risk-reduction claims.
   - Sensitive-data warning before qualification.
   - No private GitHub token or browser-side CRM write.

## Test script

1. Open live MJC site in private/incognito browser.
2. Confirm only one `Ask Whitaker` button appears.
3. Select `Challenge an AI recommendation`.
4. Enter a test lead with fake data.
5. Confirm Strong/Possible fit routes to Calendly.
6. Confirm `Copy CRM packet` copies text.
7. Confirm weak-fit path routes to vendor-risk example.
8. Confirm mobile view works.

## Rollback

If anything fails, remove the v2 script from Code Injection Footer and reinsert the previous live Whitaker script.
