import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { profiles } from '../../site/campaigns/profiles.mjs';
import {
  normalizeCampaignId,
  allAnswered,
  sanitizeCampaignState,
  deriveWaterResult,
  deriveCategoryResult,
  deriveEducationResult,
  hookEligible
} from '../../site/campaigns/campaign-engine.mjs';

const answersFor = (profile, value) => Object.fromEntries(profile.questions.map((q) => [q.id, value]));

function waterAnswersForTotal(total) {
  const p = profiles.water_v1;
  const answers = answersFor(p, 'yes');
  let remaining = total;
  for (const question of p.questions) {
    if (remaining >= 2) {
      answers[question.id] = 'no';
      remaining -= 2;
    } else if (remaining === 1) {
      answers[question.id] = 'partial';
      remaining -= 1;
    }
  }
  assert.equal(remaining, 0, `unable to construct water total ${total}`);
  return answers;
}

test('profiles have the governed question counts', () => {
  assert.equal(profiles.water_v1.questions.length, 10);
  assert.equal(profiles.healthcare_v1.questions.length, 9);
  assert.equal(profiles.education_ai_trust_v1.questions.length, 10);
  assert.equal(profiles.water_v1.questions.filter((q) => q.critical).length, 5);
});

test('campaign IDs are opaque bounded tokens only', () => {
  assert.equal(normalizeCampaignId('southcentral_pa_01'), 'southcentral_pa_01');
  assert.equal(normalizeCampaignId('A-1_x'), 'A-1_x');
  assert.equal(normalizeCampaignId('person@example.com'), null);
  assert.equal(normalizeCampaignId('../admin'), null);
  assert.equal(normalizeCampaignId('x'.repeat(33)), null);
  assert.equal(normalizeCampaignId(''), null);
});

test('water option weights are exactly YES=0 PARTIAL=1 NO=2', () => {
  const scoreByValue = Object.fromEntries(profiles.water_v1.options.map((option) => [option.value, option.score]));
  assert.deepEqual(scoreByValue, { yes: 0, partial: 1, no: 2 });
});

test('water all-yes result is deterministic and still evidence-qualified', () => {
  const profile = profiles.water_v1;
  const result = deriveWaterResult(profile, answersFor(profile, 'yes'));
  assert.equal(result.total, 0);
  assert.equal(result.band, 'Demonstrated Readiness');
  assert.equal(result.criticalNo, 0);
  assert.equal(result.gaps.length, 0);
});

test('water scoring bands pin every governed endpoint', () => {
  const p = profiles.water_v1;
  const cases = [
    [0, 'Demonstrated Readiness'],
    [3, 'Demonstrated Readiness'],
    [4, 'Material Gaps'],
    [7, 'Material Gaps'],
    [8, 'Elevated Operational Risk'],
    [12, 'Elevated Operational Risk'],
    [13, 'Immediate Executive Attention'],
    [20, 'Immediate Executive Attention']
  ];
  for (const [total, band] of cases) {
    const result = deriveWaterResult(p, waterAnswersForTotal(total));
    assert.equal(result.total, total, `total ${total}`);
    assert.equal(result.band, band, `band for total ${total}`);
  }
});

test('water critical red-flag escalation is independent of aggregate band', () => {
  const p = profiles.water_v1;
  const one = answersFor(p, 'yes'); one.w1 = 'no';
  const two = answersFor(p, 'yes'); two.w1 = 'no'; two.w2 = 'no';
  const three = answersFor(p, 'yes'); three.w1 = 'no'; three.w2 = 'no'; three.w3 = 'no';
  assert.equal(deriveWaterResult(p, one).criticalNo, 1);
  assert.match(deriveWaterResult(p, one).redFlagAction, /assign an accountable owner/i);
  assert.equal(deriveWaterResult(p, two).criticalNo, 2);
  assert.match(deriveWaterResult(p, two).redFlagAction, /leadership/i);
  assert.equal(deriveWaterResult(p, three).criticalNo, 3);
  assert.match(deriveWaterResult(p, three).redFlagAction, /independent assessment/i);
});

test('water value sequence is snapshot then provider worksheet with scorecard supplemental', async () => {
  const html = await readFile('site/water-ready/index.html', 'utf8');
  const snapshotAt = html.indexOf('Jab #1 · Municipal Water Cyber Assurance Snapshot');
  const worksheetAt = html.indexOf('Jab #2 · Provider Validation / Executive Evidence Worksheet');
  const scorecardAt = html.indexOf('Optional supporting decision guidance');
  assert.ok(snapshotAt >= 0);
  assert.ok(worksheetAt > snapshotAt);
  assert.ok(scorecardAt > worksheetAt);
  assert.match(html, /Owner \| Evidence \| Last Tested \| Gap \| Next Action/);
  assert.match(html, /this page does not claim a snapshot was performed/i);
  assert.doesNotMatch(html, /Re-create the scorecard/i);
});

test('clean route aliases resolve to the intended built campaign pages', async () => {
  const routes = [
    ['dist/water-ready/index.html', 'dist/water-ready.html', /Municipal Water Cyber Assurance Snapshot/],
    ['dist/health-ready/index.html', 'dist/health-ready.html', /Healthcare/],
    ['dist/education/ai/trust/index.html', 'dist/education/ai/trust.html', /AI Trust/],
    ['dist/education/ai/trust/strategy/index.html', 'dist/education/ai/trust/strategy.html', /strategy/i]
  ];
  for (const [source, alias, marker] of routes) {
    const [sourceHtml, aliasHtml] = await Promise.all([readFile(source, 'utf8'), readFile(alias, 'utf8')]);
    assert.match(sourceHtml, marker, source);
    assert.equal(aliasHtml, sourceHtml, `${alias} must be byte-identical to ${source}`);
  }
});

test('session-state sanitizer rejects cross-sector, unknown answer, forged completion, and malformed state', () => {
  const water = profiles.water_v1;
  const validAnswers = answersFor(water, 'yes');
  const valid = sanitizeCampaignState(water, { sector_profile: water.key, current_stage: 'value_complete', answers: validAnswers });
  assert.equal(valid.current_stage, 'value_complete');
  assert.equal(allAnswered(water, valid.answers), true);

  const crossSector = sanitizeCampaignState(water, { sector_profile: profiles.healthcare_v1.key, current_stage: 'hook_eligible', answers: validAnswers });
  assert.deepEqual(crossSector, { sector_profile: water.key, current_stage: 'landing', answers: {} });

  const tamperedAnswers = { ...validAnswers, w1: 'definitely_yes' };
  const tampered = sanitizeCampaignState(water, { sector_profile: water.key, current_stage: 'hook_eligible', answers: tamperedAnswers });
  assert.deepEqual(tampered, { sector_profile: water.key, current_stage: 'landing', answers: {} });
  assert.equal(allAnswered(water, tamperedAnswers), false);

  const forgedPartial = sanitizeCampaignState(water, { sector_profile: water.key, current_stage: 'hook_eligible', answers: { w1: 'yes' } });
  assert.equal(forgedPartial.current_stage, 'landing');
  assert.deepEqual(forgedPartial.answers, { w1: 'yes' });

  assert.deepEqual(sanitizeCampaignState(water, 'not-an-object'), { sector_profile: water.key, current_stage: 'landing', answers: {} });
  assert.deepEqual(sanitizeCampaignState(water, { sector_profile: water.key, current_stage: {}, answers: [] }), { sector_profile: water.key, current_stage: 'landing', answers: {} });
});

test('sector profiles use isolated storage identities', () => {
  const keys = Object.values(profiles).map((profile) => `mjc_campaign_session_v1_${profile.key}`);
  assert.equal(new Set(keys).size, keys.length);
});

test('static no-JS water value survives without interactive state', async () => {
  const html = await readFile('site/water-ready/index.html', 'utf8');
  const appAt = html.indexOf('id="campaign-app"');
  const snapshotAt = html.indexOf('Jab #1 · Municipal Water Cyber Assurance Snapshot');
  const worksheetAt = html.indexOf('Jab #2 · Provider Validation / Executive Evidence Worksheet');
  const scriptAt = html.indexOf('type="module" src="/campaigns/campaign-shell.js"');
  assert.ok(snapshotAt >= 0 && snapshotAt < appAt);
  assert.ok(worksheetAt > snapshotAt && worksheetAt < appAt);
  assert.match(html, /<noscript>[\s\S]*provider-validation worksheet above[\s\S]*Owner \| Evidence \| Last Tested \| Gap \| Next Action/i);
  assert.ok(scriptAt > worksheetAt);
});

test('healthcare categories remain non-certification gap summaries', () => {
  const p = profiles.healthcare_v1;
  const a = answersFor(p, 'clear');
  a.h2 = 'partial';
  a.h7 = 'gap';
  const result = deriveCategoryResult(p, a);
  assert.equal(result.counts.clear, 7);
  assert.equal(result.counts.partial, 1);
  assert.equal(result.counts.gap, 1);
  assert.equal(result.gaps[0].category, 'Recovery evidence');
});

test('education diagnostic produces counts and action guidance without a risk probability', () => {
  const p = profiles.education_ai_trust_v1;
  const a = answersFor(p, 'established');
  a.e1 = 'priority';
  a.e4 = 'developing';
  const result = deriveEducationResult(p, a);
  assert.deepEqual(result.counts, { established: 8, developing: 1, priority: 1 });
  assert.match(result.summary, /1 Priority Gap domain/i);
});

test('hook gate requires value completion or explicit help', () => {
  assert.equal(hookEligible('landing'), false);
  assert.equal(hookEligible('value_in_progress'), false);
  assert.equal(hookEligible('value_complete'), true);
  assert.equal(hookEligible('hook_eligible'), true);
  assert.equal(hookEligible('help_requested'), true);
});

test('allAnswered fails closed on partial or invalid answer state', () => {
  const p = profiles.water_v1;
  assert.equal(allAnswered(p, {}), false);
  assert.equal(allAnswered(p, answersFor(p, 'yes')), true);
  assert.equal(allAnswered(p, { ...answersFor(p, 'yes'), w1: 'invalid' }), false);
});

test('public sector pages contain no unrestricted sensitive-data input surface', async () => {
  const paths = [
    'site/water-ready/index.html',
    'site/health-ready/index.html',
    'site/education/ai/trust/index.html'
  ];
  for (const path of paths) {
    const html = await readFile(path, 'utf8');
    assert.doesNotMatch(html, /<textarea\b/i, path);
    assert.doesNotMatch(html, /<input\b[^>]*type=["']?(?:text|file|password)/i, path);
    assert.match(html, /campaign-shell\.js/);
  }
});

test('canonical campaign pages do not imply automatic commercial commitment', async () => {
  const paths = [
    'site/water-ready/index.html',
    'site/health-ready/index.html',
    'site/education/ai/trust/index.html',
    'site/education/ai/trust/strategy/index.html'
  ];
  for (const path of paths) {
    const html = (await readFile(path, 'utf8')).toLowerCase();
    assert.doesNotMatch(html, /guaranteed risk reduction|certified secure|automatically approve/);
  }
});
