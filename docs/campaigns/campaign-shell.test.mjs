import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { profiles } from '../../site/campaigns/profiles.mjs';
import {
  normalizeCampaignId,
  allAnswered,
  deriveWaterResult,
  deriveCategoryResult,
  deriveEducationResult,
  hookEligible
} from '../../site/campaigns/campaign-engine.mjs';

const answersFor = (profile, value) => Object.fromEntries(profile.questions.map((q) => [q.id, value]));

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

test('water all-yes result is deterministic and still evidence-qualified', () => {
  const profile = profiles.water_v1;
  const result = deriveWaterResult(profile, answersFor(profile, 'yes'));
  assert.equal(result.total, 0);
  assert.equal(result.band, 'Demonstrated Readiness');
  assert.equal(result.criticalNo, 0);
  assert.equal(result.gaps.length, 0);
});

test('water scoring bands are exact', () => {
  const p = profiles.water_v1;
  let a = answersFor(p, 'yes');
  a.w6 = 'no'; a.w7 = 'no';
  assert.equal(deriveWaterResult(p, a).total, 4);
  assert.equal(deriveWaterResult(p, a).band, 'Material Gaps');

  a = answersFor(p, 'yes');
  a.w1 = 'no'; a.w2 = 'no'; a.w6 = 'no'; a.w7 = 'no';
  assert.equal(deriveWaterResult(p, a).total, 8);
  assert.equal(deriveWaterResult(p, a).band, 'Elevated Operational Risk');

  a = answersFor(p, 'partial');
  a.w1 = 'no'; a.w2 = 'no'; a.w3 = 'no';
  assert.equal(deriveWaterResult(p, a).total, 13);
  assert.equal(deriveWaterResult(p, a).band, 'Immediate Executive Attention');
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

test('allAnswered fails closed on partial answer state', () => {
  const p = profiles.water_v1;
  assert.equal(allAnswered(p, {}), false);
  assert.equal(allAnswered(p, answersFor(p, 'yes')), true);
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
