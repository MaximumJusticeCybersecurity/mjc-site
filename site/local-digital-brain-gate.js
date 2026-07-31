(() => {
  'use strict';

  const STORAGE_KEY = 'mjc.localDigitalBrainGuideAccessExpiresAt';
  const ENDPOINT = '/local-digital-brain-lead';
  const REQUEST_TIMEOUT_MS = 10_000;

  const gate = document.getElementById('guide-access-gate');
  const form = document.getElementById('guide-access-form');
  const emailInput = document.getElementById('guide-access-email');
  const honeypot = document.getElementById('guide-access-website');
  const submitButton = document.getElementById('guide-access-submit');
  const status = document.getElementById('guide-access-status');

  if (!gate || !form || !emailInput || !honeypot || !submitButton || !status) return;

  function storedExpiration() {
    try {
      return Date.parse(window.localStorage.getItem(STORAGE_KEY) || '');
    } catch {
      return Number.NaN;
    }
  }

  function persistExpiration(value) {
    const expiration = Date.parse(value || '');
    if (!Number.isFinite(expiration) || expiration <= Date.now()) return false;
    try {
      window.localStorage.setItem(STORAGE_KEY, new Date(expiration).toISOString());
    } catch {
      // Current-session access remains available when storage is blocked.
    }
    return true;
  }

  function unlockGuide() {
    document.body.classList.remove('guide-locked');
    document.body.classList.add('guide-unlocked');
    gate.hidden = true;
    gate.setAttribute('aria-hidden', 'true');
    const guideHeading = document.querySelector('main h1');
    if (guideHeading) {
      guideHeading.setAttribute('tabindex', '-1');
      guideHeading.focus({ preventScroll: true });
    }
  }

  function setStatus(message, kind = '') {
    status.textContent = message;
    status.dataset.kind = kind;
  }

  function messageFor(code) {
    switch (code) {
      case 'INVALID_EMAIL':
        return 'Enter a valid email address.';
      case 'RATE_LIMITED':
        return 'Too many attempts were received. Wait a few minutes and try again.';
      case 'LEAD_DESTINATION_TIMEOUT':
        return 'The guide-access service timed out. Your email was not confirmed. Try again.';
      case 'LEAD_DESTINATION_UNAVAILABLE':
      case 'LEAD_DELIVERY_FAILED':
        return 'The guide-access service is unavailable. Your email was not confirmed. Try again later.';
      default:
        return 'Guide access could not be confirmed. Your email was not captured. Try again.';
    }
  }

  if (storedExpiration() > Date.now()) {
    unlockGuide();
    return;
  }

  document.body.classList.add('guide-locked');
  gate.hidden = false;
  gate.removeAttribute('aria-hidden');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatus('');

    if (!emailInput.checkValidity()) {
      emailInput.setAttribute('aria-invalid', 'true');
      setStatus('Enter a valid email address.', 'error');
      emailInput.focus();
      return;
    }

    emailInput.removeAttribute('aria-invalid');
    submitButton.disabled = true;
    form.setAttribute('aria-busy', 'true');
    setStatus('Confirming guide access…', 'pending');

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await window.fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailInput.value,
          website: honeypot.value
        }),
        credentials: 'same-origin',
        signal: controller.signal
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || payload.ok !== true || !persistExpiration(payload.accessExpiresAt)) {
        setStatus(messageFor(payload.code), 'error');
        return;
      }
      form.reset();
      unlockGuide();
    } catch (error) {
      const code = error?.name === 'AbortError' ? 'LEAD_DESTINATION_TIMEOUT' : 'LEAD_DELIVERY_FAILED';
      setStatus(messageFor(code), 'error');
    } finally {
      window.clearTimeout(timer);
      submitButton.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });
})();
