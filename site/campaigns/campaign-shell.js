import { getProfile } from './profiles.mjs';
import { normalizeCampaignId, allAnswered, deriveResult, hookEligible } from './campaign-engine.mjs';

const profileKey = document.body.dataset.profile;
const profile = getProfile(profileKey);
if (!profile) throw new Error('Unknown campaign profile.');

const query = new URLSearchParams(window.location.search);
const campaignId = normalizeCampaignId(query.get('cid'));
const storageKey = `mjc_campaign_session_v1_${profile.key}`;
const allowedEvents = new Set([
  'landing_view', 'value_start', 'value_complete', 'summary_view', 'jab_asset_view',
  'jab_asset_download', 'hook_view', 'hook_click'
]);

const event = (name, extra = {}) => {
  if (!allowedEvents.has(name)) return;
  const detail = { event: name, sector_profile: profile.key };
  if (campaignId) detail.campaign_id = campaignId;
  if (extra.category) detail.category = String(extra.category).slice(0, 40);
  window.dispatchEvent(new CustomEvent('mjc:campaign', { detail }));
  if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: 'mjc_campaign', ...detail });
};

const safeReadState = () => {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(storageKey) || '{}');
    if (parsed.sector_profile !== profile.key) return { sector_profile: profile.key, current_stage: 'landing', answers: {} };
    return { sector_profile: profile.key, current_stage: parsed.current_stage || 'landing', answers: parsed.answers || {} };
  } catch {
    return { sector_profile: profile.key, current_stage: 'landing', answers: {} };
  }
};

let state = safeReadState();
const saveState = () => {
  try { sessionStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* disposable local state */ }
};

const app = document.querySelector('#campaign-app');
const summary = document.querySelector('#campaign-summary');
const nextValue = document.querySelector('#campaign-next-value');
const hook = document.querySelector('#campaign-hook');
const progressText = document.querySelector('#progress-text');
const progressFill = document.querySelector('#progress-fill');
const reset = document.querySelector('#campaign-reset');
const explicitHelp = document.querySelector('#request-help-now');

function escapeText(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function renderQuestions() {
  const list = document.createElement('div');
  list.className = 'question-list';
  profile.questions.forEach((question, index) => {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'question';
    const legend = document.createElement('legend');
    legend.textContent = `${index + 1}. ${question.text}`;
    fieldset.appendChild(legend);
    if (question.critical) {
      const meta = document.createElement('p');
      meta.className = 'question__meta question__critical';
      meta.textContent = 'Critical red-flag question';
      fieldset.appendChild(meta);
    } else if (question.category) {
      const meta = document.createElement('p');
      meta.className = 'question__meta';
      meta.textContent = question.category;
      fieldset.appendChild(meta);
    }
    const options = document.createElement('div');
    options.className = 'options';
    profile.options.forEach((option) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'option';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = question.id;
      input.id = `${question.id}-${option.value}`;
      input.value = option.value;
      input.checked = state.answers[question.id] === option.value;
      input.addEventListener('change', () => {
        state.answers[question.id] = option.value;
        state.current_stage = 'value_in_progress';
        saveState();
        updateProgress();
        event('value_start');
      });
      const label = document.createElement('label');
      label.htmlFor = input.id;
      label.textContent = option.label;
      wrapper.append(input, label);
      options.appendChild(wrapper);
    });
    fieldset.appendChild(options);
    list.appendChild(fieldset);
  });
  app.prepend(list);
  updateProgress();
}

function updateProgress() {
  const answered = profile.questions.filter((question) => state.answers[question.id]).length;
  progressText.textContent = `${answered} of ${profile.questions.length} answered`;
  progressFill.style.width = `${Math.round((answered / profile.questions.length) * 100)}%`;
}

function gapList(items) {
  if (!items.length) return '<p>No material gap category was selected. Challenge the evidence behind the strongest answers before treating them as demonstrated.</p>';
  return `<ul class="gap-list">${items.slice(0, 6).map((item) => `<li><strong>${escapeText(item.category || (item.critical ? 'Critical' : 'Gap'))}:</strong> ${escapeText(item.text)}</li>`).join('')}</ul>`;
}

function renderResult(result) {
  let html = '';
  if (profile.mode === 'water') {
    html = `
      <p class="eyebrow">Decision-support result</p>
      <h2>${escapeText(result.band)}</h2>
      <div class="summary-grid">
        <div class="metric"><span>Total points</span><strong>${result.total} / 20</strong></div>
        <div class="metric"><span>Yes</span><strong>${result.yes}</strong></div>
        <div class="metric"><span>Partial</span><strong>${result.partial}</strong></div>
        <div class="metric"><span>No</span><strong>${result.no}</strong></div>
        <div class="metric"><span>Critical NOs</span><strong>${result.criticalNo}</strong></div>
      </div>
      <div class="summary-callout ${result.criticalNo >= 3 ? 'danger-callout' : result.criticalNo ? 'warning-callout' : ''}"><strong>Critical red-flag action:</strong> ${escapeText(result.redFlagAction)}</div>
      <p><strong>One NO can matter more than nine YES answers.</strong> Aggregate score never overrides a critical uncontrolled pathway or inability to sustain essential operations.</p>
      <h3>Gaps worth verifying</h3>${gapList(result.gaps)}
      <p class="disclaimer">This is decision support, not a vulnerability scan, certification, assurance statement, breach probability, or compliance determination.</p>`;
  } else if (profile.mode === 'categories') {
    html = `
      <p class="eyebrow">Healthcare resilience result</p>
      <h2>Leadership decision gaps to resolve</h2>
      <div class="summary-grid">
        <div class="metric"><span>Clear / demonstrated</span><strong>${result.counts.clear}</strong></div>
        <div class="metric"><span>Partially defined</span><strong>${result.counts.partial}</strong></div>
        <div class="metric"><span>Unclear / not demonstrated</span><strong>${result.counts.gap}</strong></div>
      </div>
      <div class="summary-callout"><strong>Recommended internal action:</strong> ${escapeText(result.nextAction)}</div>
      <h3>Categories to resolve</h3>${gapList(result.gaps)}
      <p class="disclaimer">This exercise does not determine HIPAA compliance, clinical safety certification, vulnerability status, or breach likelihood.</p>`;
  } else {
    html = `
      <p class="eyebrow">Education AI readiness action summary</p>
      <h2>Make the next AI decision more defensible</h2>
      <div class="summary-grid">
        <div class="metric"><span>Established</span><strong>${result.counts.established}</strong></div>
        <div class="metric"><span>Developing</span><strong>${result.counts.developing}</strong></div>
        <div class="metric"><span>Priority gaps</span><strong>${result.counts.priority}</strong></div>
      </div>
      <div class="summary-callout"><strong>Action summary:</strong> ${escapeText(result.summary)}</div>
      <h3>Domains to strengthen</h3>${gapList(result.gaps)}
      <p class="disclaimer">This is maturity/action guidance only. It is not FERPA or legal compliance certification, security assurance, or an AI-risk probability.</p>`;
  }
  html += '<div class="assessment__actions no-print"><button class="button-primary" id="print-summary" type="button">Print / Save summary</button></div>';
  summary.innerHTML = html;
  summary.hidden = false;
  document.querySelector('#print-summary').addEventListener('click', () => { event('jab_asset_download'); window.print(); });
  summary.scrollIntoView({ behavior: 'smooth', block: 'start' });
  event('summary_view');
}

function renderNextValue(result) {
  const top = (result.gaps || []).slice(0, 3);
  const rows = top.length ? top.map((item, index) => `
    <div class="worksheet-row">
      <strong>${index + 1}. ${escapeText(item.category || item.text)}</strong>
      <span>Owner: __________ &nbsp; Evidence: __________ &nbsp; Last tested: __________</span><br>
      <span>Gap / next action: ______________________________________________</span>
    </div>`).join('') : '<p>No gap was selected. Choose three strong answers and verify the evidence supporting them.</p>';
  nextValue.innerHTML = `
    <p class="eyebrow">Next value step</p>
    <h2>${escapeText(profile.jabTitle)}</h2>
    <p>${escapeText(profile.jabIntro)}</p>
    <div class="worksheet">${rows}</div>
    <p class="disclaimer">Keep sensitive operational, healthcare, student, credential, and detailed security evidence in your approved internal systems. Do not send it through this public page.</p>
    <div class="assessment__actions no-print"><button class="button-primary" id="complete-next-value" type="button">I have my action list</button></div>`;
  nextValue.hidden = false;
  event('jab_asset_view');
  document.querySelector('#complete-next-value').addEventListener('click', () => {
    state.current_stage = 'hook_eligible';
    saveState();
    revealHook();
  });
}

function revealHook() {
  if (!hookEligible(state.current_stage)) return;
  hook.hidden = false;
  hook.querySelector('h2').textContent = profile.hookTitle;
  hook.querySelector('[data-hook-text]').textContent = profile.hookText;
  hook.querySelector('[data-hook-link]').textContent = profile.helpLabel;
  event('hook_view');
}

function completeAssessment() {
  if (!allAnswered(profile, state.answers)) {
    document.querySelector('#assessment-status').textContent = 'Answer every question before generating the summary.';
    const firstMissing = profile.questions.find((question) => !state.answers[question.id]);
    document.querySelector(`input[name="${firstMissing.id}"]`)?.focus();
    return;
  }
  document.querySelector('#assessment-status').textContent = '';
  const result = deriveResult(profile, state.answers);
  state.current_stage = 'value_complete';
  saveState();
  renderResult(result);
  renderNextValue(result);
  event('value_complete');
}

renderQuestions();
document.querySelector('#complete-assessment').addEventListener('click', completeAssessment);
reset.addEventListener('click', () => {
  try { sessionStorage.removeItem(storageKey); } catch { /* disposable local state */ }
  window.location.reload();
});
explicitHelp.addEventListener('click', () => {
  state.current_stage = 'help_requested';
  saveState();
  revealHook();
  hook.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
hook.querySelector('[data-hook-link]').addEventListener('click', () => event('hook_click'));

if (allAnswered(profile, state.answers) && hookEligible(state.current_stage)) {
  const result = deriveResult(profile, state.answers);
  renderResult(result);
  renderNextValue(result);
  revealHook();
}

event('landing_view');
