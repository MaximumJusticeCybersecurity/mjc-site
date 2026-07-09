(() => {
  if (window.__MJC_WHITAKER_VOICE_ADAPTER__) return;
  window.__MJC_WHITAKER_VOICE_ADAPTER__ = true;

  const DEFAULTS = {
    sessionEndpoint: '/api/whitaker/session',
    reconnect: false,
    maxReconnectAttempts: 1
  };

  class WhitakerVoiceRuntimeAdapter {
    constructor(options = {}) {
      this.options = { ...DEFAULTS, ...options };
      this.sessionId = null;
      this.ws = null;
      this.mediaRecorder = null;
      this.stream = null;
      this.sequence = 0;
      this.handlers = new Map();
      this.status = 'idle';
    }

    on(type, handler) {
      if (!this.handlers.has(type)) this.handlers.set(type, new Set());
      this.handlers.get(type).add(handler);
      return () => this.handlers.get(type)?.delete(handler);
    }

    emit(type, payload = {}) {
      this.handlers.get(type)?.forEach(handler => {
        try { handler(payload); } catch (error) { console.error('Whitaker voice handler failed', error); }
      });
      this.handlers.get('*')?.forEach(handler => {
        try { handler({ type, ...payload }); } catch (error) { console.error('Whitaker voice wildcard handler failed', error); }
      });
    }

    async connect() {
      if (this.status === 'connected' || this.status === 'connecting') return;
      this.status = 'connecting';
      this.emit('status', { status: this.status });

      const response = await fetch(this.options.sessionEndpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ source: 'mjc-site', surface: 'whitaker-widget', visitorConsent: true })
      });

      if (!response.ok) throw new Error(`Whitaker session failed: ${response.status}`);
      const session = await response.json();
      this.sessionId = session.sessionId;
      this.ws = new WebSocket(session.wsUrl);

      this.ws.addEventListener('open', () => {
        this.status = 'connected';
        this.emit('status', { status: this.status, sessionId: this.sessionId });
      });
      this.ws.addEventListener('message', event => this.handleMessage(event));
      this.ws.addEventListener('close', () => {
        this.status = 'closed';
        this.emit('status', { status: this.status });
      });
      this.ws.addEventListener('error', error => {
        this.status = 'error';
        this.emit('error', { error });
      });
    }

    handleMessage(event) {
      let message;
      try { message = JSON.parse(event.data); }
      catch { message = { type: 'raw', data: event.data }; }
      this.emit(message.type || 'message', message);
    }

    send(message) {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) throw new Error('Whitaker voice socket is not open');
      this.ws.send(JSON.stringify(message));
    }

    sendText(text, metadata = {}) {
      this.send({ type: 'text.input', text, metadata });
    }

    async startAudio() {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error('Browser microphone API unavailable');
      await this.connect();
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream, { mimeType: this.pickMimeType() });
      this.sequence = 0;
      this.mediaRecorder.addEventListener('dataavailable', async event => {
        if (!event.data || event.data.size === 0) return;
        const payloadBase64 = await this.blobToBase64(event.data);
        this.send({
          type: 'audio.chunk',
          mimeType: event.data.type || this.mediaRecorder.mimeType,
          sequence: ++this.sequence,
          payloadBase64
        });
      });
      this.mediaRecorder.addEventListener('start', () => this.emit('status', { status: 'recording' }));
      this.mediaRecorder.addEventListener('stop', () => this.emit('status', { status: 'recording-stopped' }));
      this.mediaRecorder.start(500);
    }

    stopAudio() {
      if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') this.mediaRecorder.stop();
      this.stream?.getTracks()?.forEach(track => track.stop());
      this.stream = null;
      try { this.send({ type: 'audio.stop' }); } catch (_) {}
    }

    close() {
      this.stopAudio();
      if (this.ws) this.ws.close();
      this.ws = null;
      this.status = 'closed';
      this.emit('status', { status: this.status });
    }

    pickMimeType() {
      const options = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'];
      return options.find(type => MediaRecorder.isTypeSupported?.(type)) || '';
    }

    blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }
  }

  window.WhitakerVoiceRuntimeAdapter = WhitakerVoiceRuntimeAdapter;
})();
