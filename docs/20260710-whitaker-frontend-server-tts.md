# Whitaker Frontend Server TTS Bridge

Version timestamp: 2026071010  
Status: Ready for deployment  
Owner and final human authority: Dr. Max Justice

## Purpose

Route Whitaker speech through the server-side TTS runtime when available, while preserving browser speech as a fallback.

## Files

```text
site/whitaker-server-tts-client.js
site/whitaker-loader.html
voice-runtime/app.py
```

## Runtime URL

The loader currently points to:

```text
https://voice.maximumjusticecybersecurity.com
```

Change `window.WHITAKER_VOICE_RUNTIME_URL` only if the deployed runtime uses a different public URL.

## Loader sequence

The server TTS bridge must load before `whitaker.js`:

```html
<script>window.WHITAKER_VOICE_RUNTIME_URL='https://voice.maximumjusticecybersecurity.com';</script>
<script src="https://app.maximumjusticecybersecurity.com/whitaker-server-tts-client.js?v=1.0.0" defer></script>
<script src="https://app.maximumjusticecybersecurity.com/whitaker.js?v=4.1.0" defer></script>
```

## Behavior

1. Whitaker calls browser `speechSynthesis.speak()` as it does today.
2. The bridge intercepts the call.
3. The bridge checks `/api/whitaker/tts/status`.
4. If server TTS is configured, it calls `/api/whitaker/tts`.
5. The returned WAV file plays in the browser.
6. If the runtime is unavailable, browser speech remains the fallback.

## CORS

The voice runtime now allows these origins by default:

```text
https://maximumjusticecybersecurity.com
https://www.maximumjusticecybersecurity.com
https://app.maximumjusticecybersecurity.com
```

Override with:

```bash
WHITAKER_ALLOWED_ORIGINS=https://maximumjusticecybersecurity.com,https://www.maximumjusticecybersecurity.com
```

## Verification

1. Deploy the voice runtime.
2. Confirm `/health` returns `ok`.
3. Confirm `/api/whitaker/tts/status` returns `configured`.
4. Redeploy the MJC site.
5. Update Squarespace Footer with the three-line loader.
6. Enable Whitaker voice.
7. Confirm audio is served from the voice runtime.
8. Stop the voice runtime and confirm browser fallback still works.
