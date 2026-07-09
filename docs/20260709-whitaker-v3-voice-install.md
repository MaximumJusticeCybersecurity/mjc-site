# Whitaker v3 Voice Install

Version timestamp: 2026070917  
Status: Ready for Squarespace Code Injection replacement  
Owner and final human authority: Dr. Max Justice

## Purpose

Upgrade Whitaker from an interactive qualification widget to a voice-aware sales assistant.

## File to use

```text
site/whitaker-inline-v3-voice.html
```

## Install path

In Squarespace:

```text
Pages -> Custom Code -> Code Injection -> Footer
```

Replace the current Whitaker script with the entire contents of:

```text
site/whitaker-inline-v3-voice.html
```

Save, then test in a private/incognito window.

## What changed in v3

   - Adds browser speech output using Web Speech synthesis.
   - Adds microphone input using browser SpeechRecognition when supported.
   - Adds voice intent detection for AI recommendation, vCISO, GRC, incident readiness, partner/referral, and other paths.
   - Adds mic buttons next to form fields and text areas.
   - Adds voice summary at fit-scoring result when enabled.
   - Preserves guided branching, progress bar, fit scoring, CRM packet, Calendly handoff, and email-context handoff.

## Browser limitations

Voice input depends on browser support and user microphone permission.  Chrome and Edge generally support it best.  Some browsers may support speech output but not microphone transcription.

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
   - No private GitHub token or private CRM write.
   - No external AI API or server-side data transfer.

## Test script

1. Open live MJC site in Chrome or Edge private/incognito browser.
2. Confirm only one `Ask Whitaker` button appears.
3. Click `Ask Whitaker`.
4. Click `Voice off.  Click to enable speech.`
5. Confirm Whitaker speaks.
6. Click `Tell Whitaker what you need` and allow microphone access.
7. Say: `I need help challenging an AI vendor risk recommendation`.
8. Confirm Whitaker routes to the CyberShield path.
9. Use mic buttons on text fields or type manually.
10. Confirm Strong/Possible fit routes to Calendly.
11. Confirm `Copy CRM packet` works.

## Rollback

If anything fails, remove the v3 script from Code Injection Footer and reinsert the previous v2 script.
