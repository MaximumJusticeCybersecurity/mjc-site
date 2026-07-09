# Whitaker Voice Runtime Service Scaffold

Status: Scaffold only  
Owner and final human authority: Dr. Max Justice

## Purpose

This folder defines the first backend service shape for Whitaker two-way voice.

The current site package is static.  This service can later be moved into a dedicated repository or deployed as a separate service behind:

```text
voice.maximumjusticecybersecurity.com
```

or mapped to:

```text
/api/whitaker/*
```

## Recommended runtime

   - Python 3.11+
   - FastAPI
   - WebSockets
   - faster-whisper or whisper.cpp
   - Silero VAD
   - Piper first for TTS
   - XTTS/StyleTTS2 evaluation later

## Minimum service API

   - `POST /api/whitaker/session`
   - `WebSocket /api/whitaker/voice?sessionId=...`

## Event types

Client to server:

   - `text.input`
   - `audio.chunk`
   - `audio.stop`

Server to client:

   - `transcript.partial`
   - `transcript.final`
   - `assistant.message`
   - `assistant.audio`
   - `state.patch`
   - `error`

## Development sequence

1. Implement text-only WebSocket echo with Whitaker routing policy.
2. Add VAD and STT.
3. Add Piper TTS.
4. Add secure session logging.
5. Add Revenue OS CRM handoff.
6. Add CyberShield handoff.
7. Evaluate human-grade voice.

## Guardrail

Whitaker must never represent itself as Dr. Max Justice speaking live.  A Max-like voice requires explicit consent, approved samples, and disclosure.
