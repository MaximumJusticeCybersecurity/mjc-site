(() => {
  if (window.__MJC_WHITAKER_RUNTIME__) return;
  window.__MJC_WHITAKER_RUNTIME__ = '4.0.0';

  const C = {
    calendly: 'https://calendly.com/maxjustice',
    email: 'max@maximumjusticecybersecurity.com',
    example: 'https://maximumjusticecybersecurity.github.io/CyberShield/',
    challenge: 'https://maximumjusticecybersecurity.github.io/CyberShield/vendor-risk-next.html',
    version: '4.0.0-hosted-runtime'
  };

  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const voiceCapable = !!Recognition;
  let recognition = null;

  const S = {
    step: 'start',
    opened: false,
    intent: '',
    answers: {},
    fit: 'Unknown',
    score: 0,
    source: 'MJC website Whitaker hosted runtime v4',
    muted: true,
    lastMessage: ''
  };

  const intentLabels = {
    cybershield: 'Challenge an AI recommendation',
    vciso: 'Need a vCISO or security advisor',
    grc: 'GRC, audit, or compliance help',
    incident: 'Incident-readiness concern',
    partner: 'Partner or referral conversation',
    other: 'Something else'
  };

  const intentKeywords = [
    ['cybershield', ['ai recommendation', 'recommendation', 'ai decision', 'vendor risk', 'cybershield', 'challenge', 'trust decision']],
    ['vciso', ['vciso', 'ciso', 'security advisor', 'security leadership', 'security strategy', 'fractional ciso']],
    ['grc', ['grc', 'audit', 'compliance', 'cmmc', 'hipaa', 'hitrust', 'iso', 'nist', 'questionnaire']],
    ['incident', ['incident', 'breach', 'ransomware', 'compromised', 'readiness', 'tabletop', 'response']],
    ['partner', ['partner', 'referral', 'introduce', 'channel', 'reseller', 'alliance']]
  ];

  const questions = {
    cybershield: [
      ['context', 'What AI-generated recommendation or decision do you need to challenge?', 'High-level only.  Example: AI says a vendor is low risk because SOC 2 and encryption exist.'],
      ['owner', 'Who owns the decision or risk?', 'Security, GRC, procurement, legal, privacy, executive sponsor...'],
      ['urgency', 'What is creating urgency?', 'Audit, customer pressure, board concern, procurement deadline, regulatory pressure...'],
      ['evidence', 'Do you have evidence available now?', 'SOC 2, DPA, vendor questionnaire, policy, screenshot, contract language.  Do not paste it here.']
    ],
    vciso: [
      ['context', 'What is driving the need for security leadership right now?', 'Customer pressure, contract requirement, growth, audit, board concern, insurance, leadership gap...'],
      ['owner', 'Who owns the decision or budget path?', 'CEO, COO, CIO, CTO, compliance, contracts, board...'],
      ['urgency', 'What time window are you working against?', 'This month, this quarter, before audit, before renewal...'],
      ['evidence', 'What already exists?', 'Policies, questionnaire, audit finding, risk register, customer request...']
    ],
    grc: [
      ['context', 'Which compliance or audit pressure is driving this?', 'CMMC, HIPAA/HITRUST, ISO, NIST, customer questionnaire, audit finding, contract requirement...'],
      ['owner', 'Who is accountable for the outcome?', 'Compliance, security, executive sponsor, contract owner...'],
      ['urgency', 'What deadline or pressure exists?', 'Audit date, contract submission, customer due date, insurance renewal...'],
      ['evidence', 'What materials exist now?', 'Policies, SSP, POA&M, questionnaire, control mapping, audit report.  Do not paste sensitive content.']
    ],
    incident: [
      ['context', 'Is this active now or preparation before something happens?', 'Active, suspected, recent, tabletop, readiness planning...'],
      ['owner', 'Who is accountable internally?', 'Security, IT, executive sponsor, outside counsel, MSP...'],
      ['urgency', 'How urgent is this?', 'Now, today, this week, before audit, before renewal...'],
      ['evidence', 'What safe, high-level context can you share?', 'Do not paste logs, screenshots, credentials, system details, customer data, or indicators.']
    ],
    partner: [
      ['context', 'What buyer or channel do you think fits MJC?', 'CISO network, vendor-risk teams, SMB executives, federal contractors, AI governance buyers...'],
      ['owner', 'Who can make the introduction or decision?', 'Name the role or relationship path.'],
      ['urgency', 'Is there a near-term opportunity?', 'Event, audit, contract, referral window, board pressure...'],
      ['evidence', 'What makes this referral credible?', 'Known need, current project, existing relationship, direct request...']
    ],
    other: [
      ['context', 'What are you trying to solve?', 'Keep it high level.'],
      ['owner', 'Who owns the issue or decision?', 'Role or team is enough.'],
      ['urgency', 'What is the timing?', 'Now, this month, this quarter, exploratory...'],
      ['evidence', 'What context exists?', 'Do not paste sensitive content.']
    ]
  };

  function track(name, data = {}) {
    const payload = { name, route: 'whitaker-v4', version: C.version, ...data };
    try { window.dispatchEvent(new CustomEvent('mjc:conversion', { detail: payload })); } catch (_) {}
    try { if (window.va) window.va('event', { name, data: payload }); } catch (_) {}
  }

  function esc(v) {
    return String(v || '').replace(/[&<>'"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[c]));
  }

  function say(text) {
    S.lastMessage = text;
    if (S.muted || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text.replace(/Dr\./g, 'Doctor'));
      u.rate = 0.98; u.pitch = 0.92; u.volume = 0.9;
      const voices = window.speechSynthesis.getVoices?.() || [];
      const preferred = voices.find(v => /Google US English|Microsoft.*David|Microsoft.*Guy|Alex|Daniel/i.test(v.name)) || voices.find(v => /en-US|English/i.test(v.lang));
      if (preferred) u.voice = preferred;
      window.speechSynthesis.speak(u);
    } catch (_) {}
  }

  function listenFor(field, target) {
    if (!voiceCapable) { notice('Voice input is not supported in this browser.'); return; }
    try {
      if (recognition) recognition.abort();
      recognition = new Recognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      document.body.classList.add('wj-listening');
      recognition.onresult = event => {
        const text = event.results?.[0]?.[0]?.transcript || '';
        if (target) target.value = target.value ? `${target.value} ${text}` : text;
        if (field === 'intent') handleVoiceIntent(text);
        notice('Voice captured.');
        track('whitaker_v4_voice_captured', { field });
      };
      recognition.onerror = () => notice('Voice capture stopped.  You can type instead.');
      recognition.onend = () => document.body.classList.remove('wj-listening');
      recognition.start();
    } catch (_) { notice('Voice input could not start.  Browser permissions may be blocking the microphone.'); }
  }

  function handleVoiceIntent(text) {
    const lower = text.toLowerCase();
    for (const [id, words] of intentKeywords) {
      if (words.some(w => lower.includes(w))) { S.intent = id; renderContact(); return; }
    }
    S.intent = 'other'; S.answers.context = text; renderContact();
  }

  function scoreLead() {
    const a = S.answers; let score = 0;
    if (S.intent) score += 10;
    if ((a.name || '').trim()) score += 8;
    if ((a.email || '').includes('@')) score += 12;
    if ((a.organization || '').trim()) score += 10;
    if ((a.role || '').trim()) score += 6;
    if ((a.context || '').trim().length > 12) score += 16;
    if ((a.owner || '').trim().length > 3) score += 12;
    if ((a.urgency || '').trim().length > 3) score += 12;
    if ((a.evidence || '').trim().length > 3) score += 8;
    if (['cybershield','vciso','grc','incident','partner'].includes(S.intent)) score += 6;
    S.score = Math.min(score, 100);
    S.fit = score >= 74 ? 'Strong' : score >= 52 ? 'Possible' : score >= 30 ? 'Weak' : 'Not current';
    return S.fit;
  }

  function leadPacket() {
    const a = S.answers;
    return [
      'Lead ID: pending', `Created date: ${new Date().toISOString()}`, `Source: ${S.source}`, 'Agent: Whitaker', 'Owner: Dr. Max Justice', '',
      `Organization: ${a.organization || ''}`, `Contact name: ${a.name || ''}`, `Contact role: ${a.role || ''}`, `Contact email: ${a.email || ''}`, '',
      `Need category: ${intentLabels[S.intent] || S.intent || ''}`, `Decision/business context: ${a.context || ''}`, `Urgency source: ${a.urgency || ''}`, `Decision owner or authority path: ${a.owner || ''}`, `Evidence pain or security concern: ${a.evidence || ''}`, '',
      `Fit classification: ${S.fit}`, `Fit score: ${S.score}/100`, 'Pricing status: Not discussed', 'Sensitive-data status: Warning given.  No sensitive data requested.',
      `Primary next action: ${S.fit === 'Strong' || S.fit === 'Possible' ? 'Schedule scope conversation' : 'Review proof example / nurture'}`, `Calendly route: ${C.calendly}`, '',
      'Recommended owner prep:', `Review ${a.organization || 'the prospect'} context and confirm whether this is CyberShield Decision Assurance, broader MJC advisory, or a referral path.`
    ].join('\n');
  }

  function mailHref() {
    const subject = encodeURIComponent('MJC Scope Conversation Context');
    const body = encodeURIComponent(`${leadPacket()}\n\nDo not include passwords, secrets, regulated data, active incident details, or confidential artifacts in email.`);
    return `mailto:${C.email}?subject=${subject}&body=${body}`;
  }

  function progress() { return ({ start: 10, intent: 25, contact: 45, qualify: 70, result: 100 }[S.step] || 10); }
  function shell(html) { body.innerHTML = `<div class="wj-progress"><span style="width:${progress()}%"></span></div>${html}`; bindCommon(); }

  function bindCommon() {
    body.querySelectorAll('[data-action]').forEach(el => el.addEventListener('click', () => {
      const a = el.dataset.action;
      if (a === 'start') renderIntent();
      if (a === 'back-start') renderStart();
      if (a === 'back-intent') renderIntent();
      if (a === 'copy') copyPacket();
      if (a === 'restart') reset();
      if (a === 'voice-intent') listenFor('intent');
      if (a === 'toggle-mute') toggleMute();
      if (a === 'repeat') say(S.lastMessage || 'Whitaker is ready.');
    }));
    body.querySelectorAll('[data-voice-field]').forEach(btn => btn.addEventListener('click', () => {
      const field = btn.dataset.voiceField; listenFor(field, body.querySelector(`[name="${field}"]`));
    }));
    body.querySelectorAll('[data-track]').forEach(el => el.addEventListener('click', () => track(el.dataset.track, { fit: S.fit, intent: S.intent })));
  }

  function renderStart() {
    S.step = 'start';
    shell(`<div class="wj-msg"><b>Welcome to Maximum Justice Cybersecurity.</b><br>I’m Whitaker.  I qualify buyers, route real security problems, and help schedule focused conversations with Dr. Max Justice.</div><div class="wj-msg wj-warn"><b>Clean-room rule:</b> Do not share passwords, secrets, private keys, regulated data, confidential customer data, or active incident details here.</div><div class="wj-actions"><button class="wj-btn primary" data-action="start">Start qualification</button><button class="wj-btn" data-action="voice-intent">🎙 Tell Whitaker what you need</button><button class="wj-btn" data-action="toggle-mute">${S.muted ? '🔇 Voice off.  Click to enable speech.' : '🔊 Voice on.  Click to mute.'}</button><a class="wj-btn" href="${C.example}" target="_blank" rel="noopener" data-track="whitaker_v4_example_clicked">See the 3-Minute Vendor-Risk Example</a><a class="wj-btn" href="${C.calendly}" target="_blank" rel="noopener" data-track="whitaker_v4_direct_calendly_clicked">Schedule a Scope Conversation</a></div><div class="wj-small">Voice uses browser microphone permission.  If your browser blocks it, typing still works.</div>`);
    say('Welcome to Maximum Justice Cybersecurity. I am Whitaker. I can help route your cybersecurity or AI governance need.');
  }

  function renderIntent() {
    S.step = 'intent';
    shell(`<div class="wj-msg"><b>What brought you here today?</b><br>Pick the closest path, or use voice and tell me in one sentence.</div><div class="wj-actions intent-grid">${Object.entries(intentLabels).map(([id,label]) => `<button class="wj-btn intent" data-intent="${id}">${esc(label)}</button>`).join('')}</div><div class="wj-actions"><button class="wj-btn" data-action="voice-intent">🎙 Speak your need</button><button class="wj-btn subtle" data-action="back-start">Back</button></div>`);
    body.querySelectorAll('[data-intent]').forEach(btn => btn.addEventListener('click', () => { S.intent = btn.dataset.intent; track('whitaker_v4_intent_selected', { intent: S.intent }); renderContact(); }));
    say('What brought you here today? You can choose a path or tell me in one sentence.');
  }

  function input(name, label, type='text') { return `<label>${esc(label)}<div class="wj-input-wrap"><input name="${name}" type="${type}" value="${esc(S.answers[name])}" ${name==='name'||name==='email'||name==='organization'?'required':''}><button class="wj-mic" type="button" data-voice-field="${name}" title="Speak ${esc(label)}">🎙</button></div></label>`; }
  function textarea(name, label, ph) { return `<label>${esc(label)}<div class="wj-input-wrap"><textarea name="${name}" placeholder="${esc(ph)}">${esc(S.answers[name])}</textarea><button class="wj-mic" type="button" data-voice-field="${name}" title="Speak answer">🎙</button></div></label>`; }

  function renderContact() {
    S.step = 'contact';
    shell(`<div class="wj-msg"><b>${esc(intentLabels[S.intent] || 'MJC inquiry')}</b><br>Good.  I need enough context to avoid wasting your calendar or Dr. Justice’s.</div><form class="wj-form" id="wj-contact">${input('name','Name')}${input('email','Work email','email')}${input('organization','Organization')}${input('role','Role')}<div class="wj-row"><button class="wj-btn subtle" type="button" data-action="back-intent">Back</button><button class="wj-btn primary" type="submit">Continue</button></div></form>`);
    body.querySelector('#wj-contact').addEventListener('submit', e => { e.preventDefault(); Object.assign(S.answers, Object.fromEntries(new FormData(e.currentTarget).entries())); renderQualify(); });
    say('Tell me who you are and the organization. Then I will ask the useful qualification questions.');
  }

  function renderQualify() {
    S.step = 'qualify'; const qs = questions[S.intent] || questions.other;
    shell(`<div class="wj-msg"><b>Now the useful part.</b><br>Keep answers high-level.  No artifacts, no credentials, no regulated data.</div><form class="wj-form" id="wj-qualify">${qs.map(([key,label,ph]) => textarea(key,label,ph)).join('')}<div class="wj-row"><button class="wj-btn subtle" type="button" data-back-contact="1">Back</button><button class="wj-btn primary" type="submit">Score fit</button></div></form>`);
    body.querySelector('[data-back-contact]').addEventListener('click', renderContact);
    body.querySelector('#wj-qualify').addEventListener('submit', e => { e.preventDefault(); Object.assign(S.answers, Object.fromEntries(new FormData(e.currentTarget).entries())); scoreLead(); track('whitaker_v4_fit_scored', { fit: S.fit, score: S.score, intent: S.intent }); renderResult(); });
    say('Keep answers high level. Do not share sensitive data. Then I will score fit and route the next step.');
  }

  function renderResult() {
    S.step = 'result'; const ok = S.fit === 'Strong' || S.fit === 'Possible'; const line = ok ? 'This is worth a focused scope conversation with Dr. Max Justice.' : 'This is not schedule-ready yet. Review the proof example first, then come back with one real decision.';
    shell(`<div class="wj-msg"><b>${S.fit} fit.  Score: ${S.score}/100.</b><br>${line}</div><div class="wj-card"><div class="wj-card-title">Meeting context packet</div><pre>${esc(leadPacket())}</pre></div><div class="wj-actions">${ok ? `<a class="wj-btn primary" href="${C.calendly}" target="_blank" rel="noopener" data-track="whitaker_v4_calendly_clicked">Schedule a Scope Conversation</a><a class="wj-btn" href="${mailHref()}" data-track="whitaker_v4_email_context_clicked">Email this context to MJC</a>` : `<a class="wj-btn primary" href="${C.example}" target="_blank" rel="noopener" data-track="whitaker_v4_example_after_weak_fit_clicked">Review the Vendor-Risk Example</a>`}<button class="wj-btn" data-action="copy">Copy CRM packet</button><button class="wj-btn" data-action="toggle-mute">${S.muted ? '🔇 Enable voice summary' : '🔊 Mute voice'}</button><button class="wj-btn" data-action="repeat">Repeat summary</button><a class="wj-btn" href="${C.challenge}" target="_blank" rel="noopener" data-track="whitaker_v4_challenge_clicked">Challenge One AI Recommendation</a><button class="wj-btn subtle" data-action="restart">Start over</button></div><div class="wj-msg wj-warn"><b>Boundary:</b> Pricing and delivery schedule are confirmed after scope review.  Do not send sensitive artifacts through public chat or email.</div>`);
    say(`${S.fit} fit. Score ${S.score} out of 100. ${line}`);
  }

  function copyPacket() { const text = leadPacket(); navigator.clipboard?.writeText(text).then(() => notice('CRM packet copied.')).catch(() => notice('Copy failed.  Select the packet text manually.')); track('whitaker_v4_packet_copied', { fit: S.fit, intent: S.intent }); }
  function toggleMute() { S.muted = !S.muted; if (S.muted && window.speechSynthesis) window.speechSynthesis.cancel(); notice(S.muted ? 'Whitaker voice muted.' : 'Whitaker voice enabled.'); if (!S.muted) say('Voice enabled. Whitaker can speak summaries.'); renderCurrent(); }
  function renderCurrent() { ({ start: renderStart, intent: renderIntent, contact: renderContact, qualify: renderQualify, result: renderResult }[S.step] || renderStart)(); }
  function notice(text) { const n = document.createElement('div'); n.className = 'wj-toast'; n.textContent = text; document.body.appendChild(n); setTimeout(() => n.remove(), 2400); }
  function reset() { S.step = 'start'; S.intent = ''; S.answers = {}; S.fit = 'Unknown'; S.score = 0; renderStart(); }

  const style = document.createElement('style');
  style.textContent = `.wj-launch{position:fixed;right:22px;bottom:22px;z-index:99999;border:1px solid #48d9ff;background:linear-gradient(180deg,#48d9ff,#18a9cf);color:#03111d;border-radius:999px;padding:13px 17px;font-weight:950;box-shadow:0 18px 45px rgba(0,0,0,.46);cursor:pointer;font-family:Aptos,Inter,Segoe UI,Arial,sans-serif}.wj-panel{position:fixed;right:22px;bottom:82px;z-index:99999;width:min(490px,calc(100vw - 28px));max-height:calc(100vh - 108px);overflow:auto;background:#071625;color:#f7fbff;border:1px solid #29475e;border-radius:22px;box-shadow:0 24px 70px rgba(0,0,0,.72);font-family:Aptos,Inter,Segoe UI,Arial,sans-serif;display:none}.wj-panel.open{display:block}.wj-head{display:flex;justify-content:space-between;gap:12px;padding:18px;border-bottom:1px solid rgba(72,217,255,.24)}.wj-eyebrow{color:#48d9ff;text-transform:uppercase;letter-spacing:.1em;font-size:.72rem;font-weight:950}.wj-title{font-weight:950;font-size:1.1rem}.wj-sub{color:#b8c7d5;font-size:.84rem}.wj-close{background:transparent;color:#b8c7d5;border:0;font-size:1.5rem;cursor:pointer}.wj-progress{height:5px;background:#0f2030}.wj-progress span{display:block;height:100%;background:linear-gradient(90deg,#48d9ff,#78e0a5);transition:width .22s ease}.wj-msg{background:rgba(255,255,255,.052);border:1px solid rgba(184,199,213,.16);border-radius:16px;padding:12px 13px;margin:12px 18px;color:#dce9f5;line-height:1.45}.wj-warn{border-color:rgba(255,209,102,.5);background:rgba(255,209,102,.09)}.wj-actions{display:grid;gap:8px;margin:12px 18px}.wj-btn{border:1px solid #29475e;background:rgba(255,255,255,.055);color:#f7fbff;border-radius:999px;padding:10px 12px;font-weight:850;text-align:center;cursor:pointer;text-decoration:none;display:block}.wj-btn:hover{border-color:#48d9ff}.wj-btn.primary{background:linear-gradient(180deg,rgba(72,217,255,.31),rgba(72,217,255,.12));border-color:#48d9ff}.wj-btn.subtle{color:#b8c7d5}.wj-btn.intent{text-align:left;border-radius:14px}.wj-form{display:grid;gap:9px;margin:12px 18px}.wj-form label{font-size:.83rem;color:#b8c7d5;font-weight:850}.wj-input-wrap{display:grid;grid-template-columns:1fr auto;gap:6px;align-items:start}.wj-form input,.wj-form textarea{width:100%;border:1px solid #29475e;background:#0f2030;color:#f7fbff;border-radius:12px;padding:10px;font:inherit;margin-top:4px}.wj-form textarea{min-height:78px;resize:vertical}.wj-mic{margin-top:4px;border:1px solid #29475e;background:#102337;color:#f7fbff;border-radius:12px;padding:9px 10px;cursor:pointer}.wj-listening .wj-mic{border-color:#78e0a5;box-shadow:0 0 0 3px rgba(120,224,165,.18)}.wj-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}.wj-card{margin:12px 18px;border:1px solid rgba(72,217,255,.24);border-radius:16px;background:#0b1b2a;overflow:hidden}.wj-card-title{padding:10px 12px;color:#48d9ff;font-weight:950;border-bottom:1px solid rgba(72,217,255,.16)}.wj-card pre{white-space:pre-wrap;word-break:break-word;margin:0;padding:12px;color:#dce9f5;font-size:.82rem;max-height:220px;overflow:auto}.wj-toast{position:fixed;right:22px;bottom:82px;z-index:100000;background:#102337;color:#f7fbff;border:1px solid #48d9ff;border-radius:999px;padding:10px 14px;box-shadow:0 16px 40px rgba(0,0,0,.5);font-family:Aptos,Inter,Segoe UI,Arial,sans-serif;font-weight:850}.wj-small{font-size:.82rem;color:#b8c7d5;margin:12px 18px;line-height:1.4}@media(max-width:520px){.wj-launch{right:12px;bottom:12px}.wj-panel{right:12px;bottom:66px;width:calc(100vw - 24px)}.wj-row{grid-template-columns:1fr}}`;
  document.head.appendChild(style);

  const launch = document.createElement('button'); launch.type = 'button'; launch.className = 'wj-launch'; launch.textContent = 'Ask Whitaker'; launch.setAttribute('aria-haspopup', 'dialog'); document.body.appendChild(launch);
  const panel = document.createElement('section'); panel.className = 'wj-panel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Whitaker MJC sales assistant'); panel.innerHTML = `<div class="wj-head"><div><div class="wj-eyebrow">MJC Sales Agent</div><div class="wj-title">Whitaker v4</div><div class="wj-sub">Hosted runtime.  Voice-aware.  Qualify.  Route.</div></div><button class="wj-close" type="button" aria-label="Close Whitaker">×</button></div><div id="wj-body"></div>`; document.body.appendChild(panel);
  const body = panel.querySelector('#wj-body');
  launch.addEventListener('click', () => { S.opened = !S.opened; panel.classList.toggle('open', S.opened); track('whitaker_v4_opened'); });
  panel.querySelector('.wj-close').addEventListener('click', () => { S.opened = false; panel.classList.remove('open'); if (window.speechSynthesis) window.speechSynthesis.cancel(); });
  renderStart();
})();
