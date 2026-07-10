(() => {
  if (window.__MJC_WHITAKER_SERVER_TTS_CLIENT__) return;
  window.__MJC_WHITAKER_SERVER_TTS_CLIENT__ = true;

  const config = {
    baseUrl: window.WHITAKER_VOICE_RUNTIME_URL || 'https://voice.maximumjusticecybersecurity.com',
    endpoint: '/api/whitaker/tts',
    statusEndpoint: '/api/whitaker/tts/status',
    requestTimeoutMs: 12000,
    fallbackToBrowser: true
  };

  if (!window.speechSynthesis || typeof window.speechSynthesis.speak !== 'function') return;

  const originalSpeak = window.speechSynthesis.speak.bind(window.speechSynthesis);
  const originalCancel = window.speechSynthesis.cancel.bind(window.speechSynthesis);
  let activeAudio = null;
  let serverAvailable = null;
  let statusCheckedAt = 0;

  function stopActiveAudio() {
    if (!activeAudio) return;
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
      if (activeAudio.src?.startsWith('blob:')) URL.revokeObjectURL(activeAudio.src);
    } catch (_) {}
    activeAudio = null;
  }

  async function checkStatus() {
    const now = Date.now();
    if (serverAvailable !== null && now - statusCheckedAt < 60000) return serverAvailable;
    statusCheckedAt = now;
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);
      const response = await fetch(`${config.baseUrl}${config.statusEndpoint}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (!response.ok) throw new Error(`status ${response.status}`);
      const data = await response.json();
      serverAvailable = data.status === 'configured';
    } catch (_) {
      serverAvailable = false;
    }
    return serverAvailable;
  }

  async function requestServerAudio(text) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), config.requestTimeoutMs);
    try {
      const response = await fetch(`${config.baseUrl}${config.endpoint}`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text, voice: 'whitaker-default', consent: true }),
        signal: controller.signal
      });
      if (!response.ok) throw new Error(`tts ${response.status}`);
      return await response.blob();
    } finally {
      clearTimeout(timeout);
    }
  }

  async function playServerAudio(text, utterance) {
    const available = await checkStatus();
    if (!available) throw new Error('server tts unavailable');

    const blob = await requestServerAudio(text);
    const url = URL.createObjectURL(blob);
    stopActiveAudio();
    activeAudio = new Audio(url);
    activeAudio.preload = 'auto';

    activeAudio.addEventListener('play', () => {
      try { utterance?.onstart?.(new Event('start')); } catch (_) {}
    }, { once: true });

    activeAudio.addEventListener('ended', () => {
      try { utterance?.onend?.(new Event('end')); } catch (_) {}
      stopActiveAudio();
    }, { once: true });

    activeAudio.addEventListener('error', () => {
      try { utterance?.onerror?.(new Event('error')); } catch (_) {}
      stopActiveAudio();
    }, { once: true });

    await activeAudio.play();
  }

  window.speechSynthesis.speak = function patchedSpeak(utterance) {
    const text = String(utterance?.text || '').trim();
    if (!text) return originalSpeak(utterance);

    playServerAudio(text, utterance).catch(() => {
      serverAvailable = false;
      if (config.fallbackToBrowser) originalSpeak(utterance);
    });
  };

  window.speechSynthesis.cancel = function patchedCancel() {
    stopActiveAudio();
    originalCancel();
  };

  window.WhitakerServerTTS = {
    config,
    refreshStatus: () => {
      serverAvailable = null;
      return checkStatus();
    },
    stop: stopActiveAudio
  };
})();
