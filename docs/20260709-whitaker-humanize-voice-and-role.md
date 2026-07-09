# Whitaker Humanized Voice and Role Update

Version timestamp: 2026070918  
Status: Ready for review and deployment  
Owner and final human authority: Dr. Max Justice

## Purpose

Improve Whitaker after live site testing.

## Requested changes

   - Remove visible version number.
   - Remove visible hosted-runtime subtitle.
   - Make Whitaker respond through voice, text, buttons, or any combination.
   - Improve browser voice quality where possible.
   - Reframe Whitaker as more than a sales agent.

## Implementation

Whitaker is now presented as:

```text
MJC Trust Concierge
```

Reasoning:

Whitaker does more than sell.  It welcomes the visitor, interprets intent, protects against sensitive-data leakage, routes cybersecurity and AI governance needs, qualifies revenue fit, prepares context, and moves strong-fit prospects to a scope conversation.  `Trust Concierge` is more accurate than `Sales Agent` because the role is part guide, part qualification agent, part intake analyst, part trust-preserving front door.

## Interaction changes

   - Start screen now supports typed need, voice need, or button-based routing.
   - Intent screen supports typed need, voice need, or button choice.
   - Field-level microphone buttons remain available.
   - Voice capture now uses interim results and writes captured speech into the target input.
   - Voice intent capture now routes the user based on spoken text.
   - Microphone permission failures now give a clearer fallback to typing.

## Voice quality changes

   - Browser voice preference ranking improved.
   - Speech rate reduced.
   - Pitch lowered slightly.
   - Speech phrasing cleaned for acronyms.
   - Public label no longer exposes version information.

## Important limitation

Browser-native speech synthesis can be improved but will still sound synthetic on many systems.  A truly human or Max-like voice requires a server-side TTS service, explicit voice consent, approved audio samples, privacy review, and an audio generation endpoint.  That is a separate architecture change.

## Next recommended architecture

For a human-grade voice:

   - Add approved TTS provider.
   - Create a secure `/api/whitaker/speech` endpoint.
   - Keep all sensitive-data guardrails.
   - Cache only safe generic prompts.
   - Avoid sending lead-sensitive text to external TTS until privacy controls are approved.
   - Add opt-in notice before voice synthesis.
