const VALID_CAMPAIGN_ID = /^[A-Za-z0-9_-]{1,32}$/;
const VALID_STAGES = new Set(['landing', 'value_in_progress', 'value_complete', 'summary_available', 'jab_next_available', 'hook_eligible', 'help_requested']);

export function normalizeCampaignId(value) {
  if (!value || !VALID_CAMPAIGN_ID.test(value)) return null;
  return value;
}

export function validAnswer(profile, question, value) {
  return profile.questions.some((item) => item.id === question.id)
    && profile.options.some((option) => option.value === value);
}

export function sanitizeCampaignState(profile, candidate) {
  const empty = { sector_profile: profile.key, current_stage: 'landing', answers: {} };
  if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) return empty;
  if (candidate.sector_profile !== profile.key) return empty;
  if (!candidate.answers || typeof candidate.answers !== 'object' || Array.isArray(candidate.answers)) return empty;

  const answers = {};
  for (const question of profile.questions) {
    const value = candidate.answers[question.id];
    if (value === undefined) continue;
    if (!validAnswer(profile, question, value)) return empty;
    answers[question.id] = value;
  }

  const unknownAnswerKeys = Object.keys(candidate.answers).filter(
    (key) => !profile.questions.some((question) => question.id === key)
  );
  if (unknownAnswerKeys.length) return empty;

  const requestedStage = typeof candidate.current_stage === 'string' ? candidate.current_stage : 'landing';
  const current_stage = VALID_STAGES.has(requestedStage) ? requestedStage : 'landing';
  if (hookEligible(current_stage) && !allAnswered(profile, answers) && current_stage !== 'help_requested') {
    return { ...empty, answers };
  }
  return { sector_profile: profile.key, current_stage, answers };
}

export function allAnswered(profile, answers) {
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) return false;
  return profile.questions.every((question) => {
    if (!Object.prototype.hasOwnProperty.call(answers, question.id)) return false;
    return validAnswer(profile, question, answers[question.id]);
  });
}

export function deriveWaterResult(profile, answers) {
  let total = 0;
  let yes = 0;
  let partial = 0;
  let no = 0;
  let criticalNo = 0;
  const gaps = [];

  for (const question of profile.questions) {
    const answer = answers[question.id];
    const option = profile.options.find((item) => item.value === answer);
    if (!option) throw new Error(`Missing or invalid answer for ${question.id}`);
    total += option.score;
    if (answer === 'yes') yes += 1;
    if (answer === 'partial') partial += 1;
    if (answer === 'no') no += 1;
    if (question.critical && answer === 'no') criticalNo += 1;
    if (option.score > 0) gaps.push({ id: question.id, severity: option.score, text: question.gap, critical: Boolean(question.critical) });
  }

  let band = 'Immediate Executive Attention';
  if (total <= 3) band = 'Demonstrated Readiness';
  else if (total <= 7) band = 'Material Gaps';
  else if (total <= 12) band = 'Elevated Operational Risk';

  let redFlagAction = 'No critical NO answers were recorded. Continue verifying the evidence behind every Yes.';
  if (criticalNo === 1) redFlagAction = 'Investigate the critical gap and assign an accountable owner.';
  if (criticalNo === 2) redFlagAction = 'Elevate the critical gaps to utility or municipal leadership.';
  if (criticalNo >= 3) redFlagAction = 'Obtain independent assessment or validation of the critical gaps.';

  gaps.sort((a, b) => Number(b.critical) - Number(a.critical) || b.severity - a.severity || a.id.localeCompare(b.id));
  return { total, yes, partial, no, criticalNo, band, redFlagAction, gaps };
}

export function deriveCategoryResult(profile, answers) {
  const counts = { clear: 0, partial: 0, gap: 0 };
  const gaps = [];
  for (const question of profile.questions) {
    const answer = answers[question.id];
    const option = profile.options.find((item) => item.value === answer);
    if (!option) throw new Error(`Missing or invalid answer for ${question.id}`);
    counts[answer] = (counts[answer] || 0) + 1;
    if (option.score > 0) gaps.push({ category: question.category, severity: option.score, text: question.gap });
  }
  gaps.sort((a, b) => b.severity - a.severity || a.category.localeCompare(b.category));
  const nextAction = gaps.length
    ? 'Assign an accountable owner and evidence expectation to the highest-consequence unresolved categories.'
    : 'Preserve the evidence supporting these answers and test the exercise again after material system, vendor, or process changes.';
  return { counts, gaps, nextAction };
}

export function deriveEducationResult(profile, answers) {
  const counts = { established: 0, developing: 0, priority: 0 };
  const gaps = [];
  for (const question of profile.questions) {
    const answer = answers[question.id];
    const option = profile.options.find((item) => item.value === answer);
    if (!option) throw new Error(`Missing or invalid answer for ${question.id}`);
    counts[answer] += 1;
    if (option.score > 0) gaps.push({ category: question.category, severity: option.score, text: question.gap });
  }
  gaps.sort((a, b) => b.severity - a.severity || a.category.localeCompare(b.category));
  let summary = 'The diagnostic shows an established foundation across the reviewed domains. Preserve evidence and keep the governance model current.';
  if (counts.priority > 0) summary = `The diagnostic identified ${counts.priority} Priority Gap domain${counts.priority === 1 ? '' : 's'}. Address the highest-consequence domains before expanding AI authority or sensitive-data use.`;
  else if (counts.developing > 0) summary = `The diagnostic identified ${counts.developing} Developing domain${counts.developing === 1 ? '' : 's'}. Convert those areas into owned requirements with evidence and review dates.`;
  return { counts, gaps, summary };
}

export function deriveResult(profile, answers) {
  if (!allAnswered(profile, answers)) throw new Error('All questions must be answered before deriving a result.');
  if (profile.mode === 'water') return deriveWaterResult(profile, answers);
  if (profile.mode === 'categories') return deriveCategoryResult(profile, answers);
  if (profile.mode === 'education') return deriveEducationResult(profile, answers);
  throw new Error(`Unsupported campaign mode: ${profile.mode}`);
}

export function hookEligible(state) {
  return state === 'value_complete' || state === 'summary_available' || state === 'jab_next_available' || state === 'hook_eligible' || state === 'help_requested';
}
