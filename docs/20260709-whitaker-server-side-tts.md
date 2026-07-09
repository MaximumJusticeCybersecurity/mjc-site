# Whitaker Server-Side TTS Implementation

Version timestamp: 2026070919  
Status: Scaffold ready  
Owner and final human authority: Dr. Max Justice

## Problem

Browser-native speech synthesis sounds robotic and should not be treated as the production voice experience.

## Decision

Move Whitaker toward server-side text-to-speech.

Browser speech becomes fallback only.

## First open-source TTS engine

Use Piper first because it is:

   - Lightweight.
   - Local/self-hostable.
   - Operationally simpler than XTTS/StyleTTS2.
   - Good enough for a first server-side voice test.

Piper may still sound synthetic depending on the model.  For more human speech, evaluate XTTS or StyleTTS2 in the next phase.

## New endpoints

### `GET /api/whitaker/tts/status`

Returns whether server-side TTS is configured.

### `POST /api/whitaker/tts`

Request:

```json
{
  "text": "That sounds like a CyberShield Decision Assurance path. Who owns the decision or risk?",
  "voice": "whitaker-default",
  "consent": true
}
```

Response:

```text
audio/wav
```

## Environment variables

```bash
PIPER_BIN=piper
PIPER_MODEL=/models/en_US-lessac-medium.onnx
WHITAKER_AUDIO_DIR=/tmp/whitaker-audio
```

## Local run

```bash
cd voice-runtime
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000
```

With Docker:

```bash
cd voice-runtime
docker compose up --build
```

## Client integration plan

When Whitaker needs to speak:

1. If server-side TTS is enabled, call `/api/whitaker/tts`.
2. Play returned `audio/wav` in the browser.
3. If the endpoint is unavailable, use browser speech fallback.
4. If voice is muted, do nothing.

## Privacy guardrails

The TTS endpoint rejects likely sensitive text containing terms such as:

   - password
   - secret
   - private key
   - API key
   - token
   - SSN
   - credit card
   - PHI/HIPAA
   - incident indicators/logs/credentials

The initial implementation should synthesize only Whitaker-generated text, not visitor text.

## Human or Max-like voice path

Do not implement a Max-like voice until:

   - Dr. Max Justice explicitly approves it.
   - Approved audio samples are selected.
   - Disclosure language is added.
   - No-impersonation rules are enforced.
   - Model storage and rollback controls are documented.

## Next phase

Add a client-side `serverSpeak()` helper inside `site/whitaker.js`:

```text
serverSpeak(text)
  -> POST /api/whitaker/tts
  -> play audio
  -> fallback to browserSpeak(text)
```

Then evaluate Piper voices and compare against XTTS/StyleTTS2.
