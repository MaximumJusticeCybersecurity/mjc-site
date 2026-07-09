# Whitaker Voice Runtime Architecture

Version timestamp: 2026070919  
Status: Approved direction, implementation scaffold  
Owner and final human authority: Dr. Max Justice

## Objective

Move Whitaker from browser-native speech to a human-grade, two-way voice runtime while preserving trust, privacy, lead qualification, and safe scheduling handoff.

## Role name

Whitaker should remain the public-facing **MJC Trust Concierge**.

This is more accurate than Sales Agent because Whitaker:

   - Welcomes and orients visitors.
   - Interprets buyer intent.
   - Prevents sensitive-data leakage.
   - Routes security, compliance, AI governance, vCISO, and Decision Assurance needs.
   - Qualifies prospects.
   - Prepares CRM-ready context.
   - Moves strong-fit buyers to Calendly.

## Target experience

Visitor can interact using:

   - Voice only.
   - Text only.
   - Button clicks only.
   - Any combination of voice, text, and buttons.

Whitaker should respond with:

   - Spoken audio when enabled.
   - Visible text transcript.
   - Clear next-action buttons.
   - A CRM-ready context packet.

## Recommended open-source stack

### Browser layer

   - WebRTC for low-latency audio streaming.
   - WebSocket for transcript, state, and response events.
   - Browser fallback to current Web Speech APIs.

### Turn-taking

   - Silero VAD as preferred voice activity detection.
   - WebRTC VAD as lightweight fallback.

### Speech-to-text

   - `faster-whisper` for server-side GPU/CPU accelerated transcription.
   - `whisper.cpp` for edge/local deployments.
   - Vosk only as a very lightweight fallback where Whisper is too heavy.

### Text-to-speech

   - Piper for fast, simple, locally hostable TTS.
   - Coqui XTTS or StyleTTS2 for more human speech.
   - RVC only as a voice-conversion layer if a Max-like voice is explicitly approved.

### Agent brain

   - Server-side Whitaker conversation state.
   - Current website qualification logic as baseline.
   - Future connection to Revenue OS, CyberShield, and Agent Manager.

## Recommended first backend path

```text
Browser mic
-> WebSocket audio chunks
-> Voice Activity Detection
-> faster-whisper transcription
-> Whitaker dialog policy
-> Piper or XTTS speech generation
-> browser audio playback
-> visible transcript and buttons
```

## First release scope

The first true Voice Runtime release should support:

   - WebSocket session creation.
   - Audio upload or chunk streaming.
   - Transcript event return.
   - Text response event return.
   - Optional audio response return.
   - Fallback to browser speech if server TTS is unavailable.
   - Same no-sensitive-data warning.
   - Same Calendly handoff.
   - Same CRM packet format.

## Server endpoint contract

### `POST /api/whitaker/session`

Creates a voice session.

Request:

```json
{
  "source": "mjc-site",
  "surface": "whitaker-widget",
  "visitorConsent": true
}
```

Response:

```json
{
  "sessionId": "uuid",
  "wsUrl": "wss://app.maximumjusticecybersecurity.com/api/whitaker/voice?sessionId=uuid"
}
```

### `WebSocket /api/whitaker/voice`

Client sends:

```json
{
  "type": "audio.chunk",
  "mimeType": "audio/webm;codecs=opus",
  "sequence": 1,
  "payloadBase64": "..."
}
```

Client may also send text:

```json
{
  "type": "text.input",
  "text": "I need help challenging an AI vendor risk recommendation"
}
```

Server responds:

```json
{
  "type": "transcript.partial",
  "text": "I need help challenging..."
}
```

```json
{
  "type": "transcript.final",
  "text": "I need help challenging an AI vendor risk recommendation"
}
```

```json
{
  "type": "assistant.message",
  "text": "That sounds like a CyberShield Decision Assurance path. Who owns the decision or risk?"
}
```

```json
{
  "type": "assistant.audio",
  "mimeType": "audio/wav",
  "payloadBase64": "..."
}
```

```json
{
  "type": "state.patch",
  "intent": "cybershield",
  "fit": "Possible",
  "score": 52
}
```

## Human or Max-like voice requirements

A Max-like voice requires:

   - Explicit written owner consent.
   - Approved audio samples.
   - Model storage controls.
   - Disclosure that Whitaker is an AI assistant, not Dr. Max Justice speaking live.
   - A rule that Whitaker never claims to be Max.
   - A shutdown/rollback path.

## Privacy guardrails

The Voice Runtime must not collect or persist:

   - Passwords.
   - Secrets.
   - Private keys.
   - Tokens.
   - Regulated data.
   - Active incident details.
   - Customer confidential artifacts.

Default logging should capture only:

   - Session ID.
   - Timestamp.
   - Intent.
   - Fit score.
   - Next action.
   - Explicitly safe CRM packet fields.

## Deployment recommendation

The current `mjc-site` package is static Vercel output.  For the full Voice Runtime, use one of these paths:

1. Add Vercel Serverless/Edge API functions if the repo is converted from static-only output.
2. Create a separate `whitaker-voice-runtime` service repository using FastAPI or Node.
3. Deploy the voice runtime behind `voice.maximumjusticecybersecurity.com` or `/api/whitaker/*`.

Recommended path: separate service repo or API package.  The voice stack will need native dependencies, model files, and possibly GPU/CPU tuning that should not be forced into the static site package.

## Implementation phases

### Phase 1: Client adapter and endpoint contract

   - Add client-side voice runtime adapter.
   - Keep browser fallback active.
   - Document endpoint contract.
   - Do not break current live widget.

### Phase 2: Text streaming backend

   - Implement `/api/whitaker/session`.
   - Implement WebSocket text channel.
   - Return assistant text responses.
   - Preserve current qualification state.

### Phase 3: Open-source STT

   - Add VAD.
   - Add faster-whisper or whisper.cpp.
   - Stream final transcripts to Whitaker dialog policy.

### Phase 4: Open-source TTS

   - Add Piper first for stable local speech.
   - Add XTTS/StyleTTS2 evaluation for more human speech.
   - Add privacy and consent controls.

### Phase 5: Max-like voice evaluation

   - Only after explicit approval.
   - Only with disclosure and no-impersonation guardrails.
