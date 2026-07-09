(() => {
  const CONFIG = {
    calendlyUrl: 'https://calendly.com/maxjustice',
    contactEmail: 'max@maximumjusticecybersecurity.com',
    challengeUrl: 'https://maximumjusticecybersecurity.github.io/CyberShield/vendor-risk-next.html',
    exampleUrl: 'https://maximumjusticecybersecurity.github.io/CyberShield/',
    source: 'MJC website widget',
    agent: 'Whitaker'
  };

  const state = {
    intent: '',
    fit: 'Unknown',
    answers: {},
    sensitiveWarningShown: false
  };

  const intents = [
    { id: 'cybershield', label: 'Challenge an AI recommendation' },
    { id: 'vciso', label: 'Need a vCISO or security advisor' },
    { id: 'grc', label: 'GRC, audit, or compliance help' },
    { id: 'incident', label: 'Incident-readiness concern' },
    { id: 'partner', label: 'Partner or referral conversation' },
    { id: 'other', label: 'Something else' }
  ];

  function track(name, data = {}) {
    window.dispatchEvent(new CustomEvent('mjc:conversion', { detail: { name, route: 'whitaker', ...data } }));
    try { if (window.va) window.va('event', { name, data: { route: 'whitaker', ...data } }); } catch (_) {}
  }

  function css() {
    return `
      .whitaker-launch{position:fixed;right:22px;bottom:22px;z-index:9999;border:1px solid rgba(72,217,255,.65);background:linear-gradient(180deg,rgba(72,217,255,.95),rgba(72,217,255,.72));color:#03111d;border-radius:999px;padding:13px 17px;font-weight:900;box-shadow:0 18px 45px rgba(0,0,0,.36);cursor:pointer;font-family:Aptos,Inter,Segoe UI,Arial,sans-serif}
      .whitaker-panel{position:fixed;right:22px;bottom:82px;z-index:10000;width:min(420px,calc(100vw - 28px));max-height:min(760px,calc(100vh - 110px));overflow:auto;background:#071625;color:#f7fbff;border:1px solid #29475e;border-radius:22px;box-shadow:0 24px 70px rgba(0,0,0,.46);font-family:Aptos,Inter,Segoe UI,Arial,sans-serif;display:none}
      .whitaker-panel.open{display:block}
      .whitaker-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:18px 18px 12px;border-bottom:1px solid rgba(72,217,255,.18)}
      .whitaker-title{font-weight:900;line-height:1.18}.whitaker-eyebrow{color:#48d9ff;text-transform:uppercase;letter-spacing:.1em;font-size:.72rem;font-weight:900}.whitaker-close{background:transparent;color:#b8c7d5;border:0;font-size:1.45rem;cursor:pointer}
      .whitaker-body{padding:16px 18px 18px}.whitaker-msg{background:rgba(255,255,255,.045);border:1px solid rgba(184,199,213,.16);border-radius:16px;padding:12px 13px;margin-bottom:12px;color:#dce9f5;line-height:1.45}.whitaker-msg strong{color:#fff}.whitaker-warning{border-color:rgba(255,209,102,.45);background:rgba(255,209,102,.08)}
      .whitaker-actions{display:grid;gap:8px;margin:12px 0}.whitaker-choice,.whitaker-btn{border:1px solid #29475e;background:rgba(255,255,255,.05);color:#f7fbff;border-radius:999px;padding:10px 12px;font-weight:800;text-align:left;cursor:pointer;text-decoration:none;display:block}.whitaker-choice:hover,.whitaker-btn:hover{border-color:#48d9ff}.whitaker-btn.primary{background:linear-gradient(180deg,rgba(72,217,255,.28),rgba(72,217,255,.11));border-color:#48d9ff;text-align:center}.whitaker-btn.secondary{text-align:center}
      .whitaker-form{display:grid;gap:9px}.whitaker-form label{font-size:.83rem;color:#b8c7d5;font-weight:800}.whitaker-form input,.whitaker-form textarea,.whitaker-form select{width:100%;border:1px solid #29475e;background:#0f2030;color:#f7fbff;border-radius:12px;padding:10px;font:inherit}.whitaker-form textarea{min-height:74px;resize:vertical}.whitaker-small{font-size:.82rem;color:#b8c7d5;line-height:1.4}.whitaker-hidden{display:none!important}
      @media(max-width:520px){.whitaker-launch{right:12px;bottom:12px}.whitaker-panel{right:12px;bottom:66px;width:calc(100vw - 24px)}}
    `;
  }

  function leadSummary() {
    const a = state.answers;
    return [
      `Source: ${CONFIG.source}`,
      `Agent: ${CONFIG.agent}`,
      `Intent: ${state.intent || 'Not selected'}`,
      `Fit: ${state.fit}`,
      `Name: ${a.name || ''}`,
      `Email: ${a.email || ''}`,
      `Organization: ${a.organization || ''}`,
      `Role: ${a.role || ''}`,
      `Need: ${a.need || ''}`,
      `Decision/business context: ${a.context || ''}`,
      `Urgency/timeline: ${a.urgency || ''}`,
      `Decision owner/path: ${a.ownerPath || ''}`,
      `Sensitive-data warning shown: ${state.sensitiveWarningShown ? 'Yes' : 'No'}`,
      `Pricing status: Not discussed`,
      `Requested next action: Schedule scope conversation`,
      `Calendly route: ${CONFIG.calendlyUrl}`
    ].join('\n');
  }

  function mailtoHref() {
    const subject = encodeURIComponent('Maximum Justice Cybersecurity Scope Conversation Context');
    const body = encodeURIComponent(`${leadSummary()}\n\nPlease do not include passwords, secrets, regulated data, active incident details, or confidential artifacts in email.`);
    return `mailto:${CONFIG.contactEmail}?subject=${subject}&body=${body}`;
  }

  function classifyFit() {
    const a = state.answers;
    const score = ['name','email','organization','role','need','context','urgency','ownerPath'].reduce((n, k) => n + (a[k] && a[k].trim() ? 1 : 0), 0);
    if (score >= 6) return 'Strong';
    if (score >= 4) return 'Possible';
    if (score >= 2) return 'Weak';
    return 'Not current';
  }

  function intentPrompt(id) {
    const prompts = {
      cybershield: 'Tell me about the AI-generated recommendation or decision area.  Keep it high level.  Do not paste sensitive artifacts here.',
      vciso: 'What business pressure is driving the need for security leadership right now?',
      grc: 'Which pressure is driving the work: CMMC, HIPAA/HITRUST, ISO, NIST, customer questionnaire, audit finding, or contract requirement?',
      incident: 'If this is active, do not paste logs, screenshots, credentials, customer data, or system details here.  Is this active now, or are you preparing before something happens?',
      partner: 'Who do you want to introduce or what buyer channel do you think fits MJC?',
      other: 'What are you trying to solve?'
    };
    return prompts[id] || prompts.other;
  }

  function renderStart() {
    body.innerHTML = `
      <div class="whitaker-msg"><strong>Welcome to Maximum Justice Cybersecurity.</strong><br>I can help you find the right path: security leadership, GRC support, incident-readiness guidance, or a CyberShield review before an AI recommendation becomes a business decision.</div>
      <div class="whitaker-msg whitaker-warning">Please do not share passwords, secrets, private keys, confidential customer data, regulated data, or active incident details here.  I can route the conversation safely.</div>
      <div class="whitaker-msg">What brought you here today?</div>
      <div class="whitaker-actions">${intents.map(i => `<button class="whitaker-choice" data-intent="${i.id}">${i.label}</button>`).join('')}</div>
      <a class="whitaker-btn secondary" href="${CONFIG.exampleUrl}" target="_blank" rel="noopener" data-widget-link="example">See the 3-Minute Vendor-Risk Example</a>
    `;
    state.sensitiveWarningShown = true;
    body.querySelectorAll('[data-intent]').forEach(btn => btn.addEventListener('click', () => {
      state.intent = btn.dataset.intent;
      track('whitaker_intent_selected', { intent: state.intent });
      renderQualify();
    }));
    bindWidgetLinks();
  }

  function renderQualify() {
    const prompt = intentPrompt(state.intent);
    body.innerHTML = `
      <div class="whitaker-msg"><strong>Good.</strong> ${prompt}</div>
      <form class="whitaker-form" id="whitaker-form">
        <label>Name<input name="name" autocomplete="name" required></label>
        <label>Work email<input name="email" type="email" autocomplete="email" required></label>
        <label>Organization<input name="organization" autocomplete="organization" required></label>
        <label>Role<input name="role" autocomplete="organization-title"></label>
        <label>Main need<select name="need"><option>CyberShield Decision Assurance</option><option>vCISO / security leadership</option><option>GRC / compliance readiness</option><option>AI governance</option><option>Incident readiness</option><option>Zero Trust / security architecture</option><option>Partner / referral</option><option>Other</option></select></label>
        <label>Decision or business context<textarea name="context" placeholder="High-level context only.  No sensitive details."></textarea></label>
        <label>Urgency or timeline<input name="urgency" placeholder="Audit, board, customer, procurement, contract, operational pressure..."></label>
        <label>Decision owner or authority path<input name="ownerPath" placeholder="Security, GRC, procurement, executive sponsor, owner unknown..."></label>
        <button class="whitaker-btn primary" type="submit">Check fit and schedule</button>
      </form>
      <p class="whitaker-small">Whitaker routes qualified conversations.  Pricing and delivery schedule are confirmed after scope review.</p>
    `;
    body.querySelector('#whitaker-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      state.answers = Object.fromEntries(formData.entries());
      state.fit = classifyFit();
      track('whitaker_fit_classified', { fit: state.fit, intent: state.intent });
      renderResult();
    });
  }

  function renderResult() {
    const strong = state.fit === 'Strong' || state.fit === 'Possible';
    body.innerHTML = strong ? `
      <div class="whitaker-msg"><strong>${state.fit} fit.</strong> This looks worth a focused scope conversation with Dr. Max Justice.  The meeting should start with the decision and pressure, not twenty minutes of throat-clearing.</div>
      <div class="whitaker-actions">
        <a class="whitaker-btn primary" href="${CONFIG.calendlyUrl}" target="_blank" rel="noopener" data-widget-link="calendly">Schedule a Scope Conversation</a>
        <a class="whitaker-btn secondary" href="${mailtoHref()}" data-widget-link="email-context">Email this context to MJC</a>
        <a class="whitaker-btn secondary" href="${CONFIG.challengeUrl}" target="_blank" rel="noopener" data-widget-link="challenge">Challenge One AI Recommendation</a>
      </div>
      <div class="whitaker-msg whitaker-warning">Bring the decision, the pressure, and the outcome you need.  Leave secrets, credentials, and regulated data out of public chat and email.</div>
    ` : `
      <div class="whitaker-msg"><strong>${state.fit} fit for scheduling right now.</strong> I do not want to waste your calendar.  The useful next step is to review the vendor-risk example, then come back with one real recommendation or decision you want challenged.</div>
      <div class="whitaker-actions">
        <a class="whitaker-btn primary" href="${CONFIG.exampleUrl}" target="_blank" rel="noopener" data-widget-link="example">See the 3-Minute Vendor-Risk Example</a>
        <a class="whitaker-btn secondary" href="mailto:${CONFIG.contactEmail}?subject=Maximum%20Justice%20Cybersecurity%20Inquiry" data-widget-link="contact">Contact MJC</a>
      </div>
    `;
    bindWidgetLinks();
  }

  function bindWidgetLinks() {
    body.querySelectorAll('[data-widget-link]').forEach(link => {
      link.addEventListener('click', () => track(`whitaker_${link.dataset.widgetLink}_clicked`, { fit: state.fit, intent: state.intent }));
    });
  }

  const style = document.createElement('style');
  style.textContent = css();
  document.head.appendChild(style);

  const launch = document.createElement('button');
  launch.className = 'whitaker-launch';
  launch.type = 'button';
  launch.textContent = 'Ask Whitaker';
  launch.setAttribute('aria-haspopup', 'dialog');
  document.body.appendChild(launch);

  const panel = document.createElement('section');
  panel.className = 'whitaker-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Whitaker MJC sales assistant');
  panel.innerHTML = `
    <div class="whitaker-head">
      <div><div class="whitaker-eyebrow">MJC Sales Agent</div><div class="whitaker-title">Whitaker</div></div>
      <button class="whitaker-close" type="button" aria-label="Close Whitaker">×</button>
    </div>
    <div class="whitaker-body"></div>
  `;
  document.body.appendChild(panel);
  const body = panel.querySelector('.whitaker-body');

  launch.addEventListener('click', () => {
    panel.classList.toggle('open');
    track('whitaker_opened');
  });
  panel.querySelector('.whitaker-close').addEventListener('click', () => panel.classList.remove('open'));

  renderStart();
})();
