from __future__ import annotations

import base64
import json
import uuid
from datetime import datetime, timezone
from typing import Any

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel, Field

app = FastAPI(title="Whitaker Voice Runtime", version="0.1.0")


class SessionRequest(BaseModel):
    source: str = Field(default="mjc-site")
    surface: str = Field(default="whitaker-widget")
    visitorConsent: bool = Field(default=False)


class SessionResponse(BaseModel):
    sessionId: str
    wsUrl: str


sessions: dict[str, dict[str, Any]] = {}


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "whitaker-voice-runtime"}


@app.post("/api/whitaker/session", response_model=SessionResponse)
def create_session(payload: SessionRequest) -> SessionResponse:
    if not payload.visitorConsent:
        # Keep the response shape simple for the first scaffold.  Production should return HTTP 400.
        pass

    session_id = str(uuid.uuid4())
    sessions[session_id] = {
        "createdAt": datetime.now(timezone.utc).isoformat(),
        "source": payload.source,
        "surface": payload.surface,
        "intent": None,
        "fit": None,
        "score": 0,
    }
    return SessionResponse(sessionId=session_id, wsUrl=f"/api/whitaker/voice?sessionId={session_id}")


@app.websocket("/api/whitaker/voice")
async def voice_socket(websocket: WebSocket, sessionId: str) -> None:  # noqa: N803 - match client query param
    await websocket.accept()
    session = sessions.setdefault(sessionId, {"createdAt": datetime.now(timezone.utc).isoformat()})
    await websocket.send_json({"type": "assistant.message", "text": "Whitaker Voice Runtime connected.  Tell me what you need in one sentence."})

    try:
        while True:
            raw = await websocket.receive_text()
            try:
                message = json.loads(raw)
            except json.JSONDecodeError:
                await websocket.send_json({"type": "error", "message": "Invalid JSON message."})
                continue

            message_type = message.get("type")
            if message_type == "text.input":
                await handle_text(websocket, session, str(message.get("text", "")))
            elif message_type == "audio.chunk":
                await handle_audio_chunk(websocket, session, message)
            elif message_type == "audio.stop":
                await websocket.send_json({"type": "assistant.message", "text": "Audio stopped.  You can continue by voice or type your next answer."})
            else:
                await websocket.send_json({"type": "error", "message": f"Unsupported message type: {message_type}"})
    except WebSocketDisconnect:
        session["closedAt"] = datetime.now(timezone.utc).isoformat()


async def handle_text(websocket: WebSocket, session: dict[str, Any], text: str) -> None:
    intent = infer_intent(text)
    session["intent"] = intent
    session["lastText"] = text
    session["score"] = max(session.get("score", 0), 25 if intent != "other" else 10)
    await websocket.send_json({"type": "transcript.final", "text": text})
    await websocket.send_json({"type": "state.patch", "intent": intent, "score": session["score"]})
    await websocket.send_json({"type": "assistant.message", "text": response_for_intent(intent)})


async def handle_audio_chunk(websocket: WebSocket, session: dict[str, Any], message: dict[str, Any]) -> None:
    # Scaffold only.  Production flow:
    #   1. Decode audio chunk.
    #   2. Run VAD.
    #   3. Buffer utterance.
    #   4. Run faster-whisper or whisper.cpp.
    #   5. Emit transcript.partial/transcript.final.
    #   6. Route to Whitaker dialog policy.
    payload = message.get("payloadBase64", "")
    try:
        _ = base64.b64decode(payload, validate=False) if payload else b""
    except Exception:
        await websocket.send_json({"type": "error", "message": "Audio payload was not valid base64."})
        return
    session["audioChunks"] = int(session.get("audioChunks", 0)) + 1
    await websocket.send_json({"type": "transcript.partial", "text": "Audio received.  STT is not enabled in this scaffold yet."})


def infer_intent(text: str) -> str:
    lower = text.lower()
    rules = {
        "cybershield": ["ai recommendation", "vendor risk", "cybershield", "trust decision", "challenge"],
        "vciso": ["vciso", "ciso", "security leadership", "security advisor", "fractional ciso"],
        "grc": ["grc", "audit", "compliance", "cmmc", "hipaa", "hitrust", "iso", "nist"],
        "incident": ["incident", "breach", "ransomware", "compromised", "tabletop"],
        "partner": ["partner", "referral", "introduce", "channel", "alliance"],
    }
    for intent, terms in rules.items():
        if any(term in lower for term in terms):
            return intent
    return "other"


def response_for_intent(intent: str) -> str:
    responses = {
        "cybershield": "That sounds like a CyberShield Decision Assurance path.  Who owns the decision or risk?",
        "vciso": "That sounds like a security leadership path.  What business pressure is driving the need right now?",
        "grc": "That sounds like a compliance or audit path.  Which framework or customer pressure is driving it?",
        "incident": "If this is active, do not share logs, credentials, customer data, or indicators here.  Is this active now or readiness planning?",
        "partner": "That sounds like a partner or referral path.  What buyer or channel do you think fits MJC?",
        "other": "Got it.  What outcome are you trying to create, and who owns the decision?",
    }
    return responses[intent]
