from __future__ import annotations

import base64
import json
import os
import shutil
import subprocess
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

app = FastAPI(title="Whitaker Voice Runtime", version="0.2.1")

allowed_origins = [
    origin.strip()
    for origin in os.getenv(
        "WHITAKER_ALLOWED_ORIGINS",
        "https://maximumjusticecybersecurity.com,https://www.maximumjusticecybersecurity.com,https://app.maximumjusticecybersecurity.com",
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)


class SessionRequest(BaseModel):
    source: str = Field(default="mjc-site")
    surface: str = Field(default="whitaker-widget")
    visitorConsent: bool = Field(default=False)


class SessionResponse(BaseModel):
    sessionId: str
    wsUrl: str


class SpeechRequest(BaseModel):
    text: str = Field(min_length=1, max_length=1200)
    voice: str = Field(default="whitaker-default")
    consent: bool = Field(default=True)


sessions: dict[str, dict[str, Any]] = {}

PIPER_BIN = os.getenv("PIPER_BIN", "piper")
PIPER_MODEL = os.getenv("PIPER_MODEL", "")
AUDIO_DIR = Path(os.getenv("WHITAKER_AUDIO_DIR", "/tmp/whitaker-audio"))
AUDIO_DIR.mkdir(parents=True, exist_ok=True)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "whitaker-voice-runtime"}


@app.get("/api/whitaker/tts/status")
def tts_status() -> dict[str, Any]:
    return {
        "status": "configured" if is_piper_ready() else "not_configured",
        "engine": "piper",
        "piperBinaryFound": shutil.which(PIPER_BIN) is not None,
        "modelConfigured": bool(PIPER_MODEL),
        "modelExists": Path(PIPER_MODEL).exists() if PIPER_MODEL else False,
        "fallback": "browser-speech",
    }


@app.post("/api/whitaker/session", response_model=SessionResponse)
def create_session(payload: SessionRequest) -> SessionResponse:
    if not payload.visitorConsent:
        raise HTTPException(status_code=400, detail="Visitor consent is required for voice sessions.")

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


@app.post("/api/whitaker/tts")
def synthesize_speech(payload: SpeechRequest) -> FileResponse:
    if not payload.consent:
        raise HTTPException(status_code=400, detail="Consent is required for server-side speech synthesis.")
    if looks_sensitive(payload.text):
        raise HTTPException(status_code=400, detail="Text appears to contain sensitive material and will not be synthesized.")
    if not is_piper_ready():
        raise HTTPException(status_code=503, detail="Server-side TTS is not configured. Use browser fallback.")

    audio_path = AUDIO_DIR / f"{uuid.uuid4()}.wav"
    try:
        run_piper(payload.text, audio_path)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"TTS synthesis failed: {exc}") from exc
    return FileResponse(str(audio_path), media_type="audio/wav", filename="whitaker.wav")


@app.websocket("/api/whitaker/voice")
async def voice_socket(websocket: WebSocket, sessionId: str) -> None:  # noqa: N803 - match client query param
    await websocket.accept()
    session = sessions.setdefault(sessionId, {"createdAt": datetime.now(timezone.utc).isoformat()})
    await send_assistant_message(websocket, session, "Whitaker Voice Runtime connected.  Tell me what you need in one sentence.")

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
                await send_assistant_message(websocket, session, "Audio stopped.  You can continue by voice or type your next answer.")
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
    await send_assistant_message(websocket, session, response_for_intent(intent))


async def handle_audio_chunk(websocket: WebSocket, session: dict[str, Any], message: dict[str, Any]) -> None:
    payload = message.get("payloadBase64", "")
    try:
        _ = base64.b64decode(payload, validate=False) if payload else b""
    except Exception:
        await websocket.send_json({"type": "error", "message": "Audio payload was not valid base64."})
        return
    session["audioChunks"] = int(session.get("audioChunks", 0)) + 1
    await websocket.send_json({"type": "transcript.partial", "text": "Audio received.  STT is not enabled in this scaffold yet."})


async def send_assistant_message(websocket: WebSocket, session: dict[str, Any], text: str) -> None:
    await websocket.send_json({"type": "assistant.message", "text": text})
    session["lastAssistantText"] = text
    if is_piper_ready() and not looks_sensitive(text):
        await websocket.send_json({"type": "assistant.audio_available", "engine": "piper"})


def is_piper_ready() -> bool:
    return shutil.which(PIPER_BIN) is not None and bool(PIPER_MODEL) and Path(PIPER_MODEL).exists()


def run_piper(text: str, audio_path: Path) -> None:
    command = [PIPER_BIN, "--model", PIPER_MODEL, "--output_file", str(audio_path)]
    result = subprocess.run(command, input=text.encode("utf-8"), stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False)
    if result.returncode != 0:
        stderr = result.stderr.decode("utf-8", errors="ignore")[:500]
        raise RuntimeError(stderr or "piper exited with non-zero status")


def looks_sensitive(text: str) -> bool:
    lower = text.lower()
    blocked_terms = [
        "password", "passwd", "secret", "private key", "api key", "token", "bearer ",
        "ssn", "social security", "credit card", "cvv", "patient", "phi", "hipaa",
        "ransom note", "indicator of compromise", "ioc", "log file", "credential",
    ]
    return any(term in lower for term in blocked_terms)


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
