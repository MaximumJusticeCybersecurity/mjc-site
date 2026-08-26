import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('../site/msp.html', import.meta.url), 'utf8');
const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));

const artifactPaths = [
  'msp-ai-decision-record-template.md',
  'msp-ai-vendor-due-diligence-checklist.md',
  'msp-client-ai-discovery-questionnaire.md',
  'msp-ai-incident-evidence-checklist.md'
];

test('MSP page leads with the owner-approved decision-assurance message', () => {
  assert.match(source, /I make AI-assisted decisions defensible\./);
  assert.match(source, /For MSPs and MSSPs/);
  assert.match(source, /Bring me one AI-assisted decision where being wrong actually matters\./);
});

test('MSP decision scan is ungated and keeps assessment answers local', () => {
  assert.match(source, /id="decision-scan"/);
  assert.match(source, /No assessment answers are sent to MJC\./);
  assert.doesNotMatch(source, /<form[^>]+action=/i);
  assert.doesNotMatch(source, /\bfetch\s*\(/);
  assert.doesNotMatch(source, /XMLHttpRequest/);
  assert.doesNotMatch(source, /navigator\.sendBeacon/);
});

test('MSP scan presents bounded review need rather than a universal trust or compliance score', () => {
  for (const expected of [
    'Lower review need',
    'Moderate review need',
    'High review need',
    'Critical review need'
  ]) {
    assert.ok(source.includes(expected), `Missing bounded assessment outcome: ${expected}`);
  }
  assert.match(source, /not a universal trust score/i);
  assert.match(source, /does not determine that an AI recommendation is correct, compliant, safe, or legally defensible/i);
});

test('all four ungated field-kit artifacts exist and are linked', () => {
  for (const filename of artifactPaths) {
    assert.ok(existsSync(new URL(`../site/${filename}`, import.meta.url)), `Missing source artifact: ${filename}`);
    assert.match(source, new RegExp(`href="/${filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`));
  }
});

test('field kit preserves meaningful human authority', () => {
  assert.match(source, /Human oversight should increase with Risk If Wrong\./);
  assert.match(source, /qualified human authorization before the material action occurs/i);
  assert.match(source, /independent corroboration, explicit named authority, and stronger evidence before action/i);
  assert.match(source, /These tools do not certify an AI output as correct/i);
});

test('MSP analytics record intent events without embedding assessment answers', () => {
  for (const event of [
    'msp_assessment_started',
    'msp_assessment_completed',
    'msp_template_downloaded',
    'msp_vendor_checklist_downloaded',
    'msp_discovery_downloaded',
    'msp_incident_checklist_downloaded',
    'msp_bring_decision_clicked',
    'msp_partnership_clicked'
  ]) {
    assert.ok(source.includes(event), `Missing MSP intent event: ${event}`);
  }
  assert.match(source, /detail:\{event:name,route:'\/msp'\}/);
  assert.doesNotMatch(source, /detail:\{[^}]*score/i);
  assert.doesNotMatch(source, /detail:\{[^}]*answer/i);
});

test('Vercel gives the MSP route an explicit document route and same-origin CORP', () => {
  const rewrite = config.rewrites?.find((rule) => rule.source === '/msp');
  assert.deepEqual(rewrite, { source: '/msp', destination: '/msp.html' });

  const headerRule = config.headers?.find((rule) => rule.source === '/msp');
  const headers = new Map((headerRule?.headers || []).map(({ key, value }) => [key, value]));
  assert.equal(headers.get('Cross-Origin-Resource-Policy'), 'same-origin');
});

test('build output preserves the MSP page and field-kit files', () => {
  const builtPage = new URL('../dist/msp.html', import.meta.url);
  assert.ok(existsSync(builtPage), 'Build output is missing dist/msp.html');
  const built = readFileSync(builtPage, 'utf8');
  assert.match(built, /I make AI-assisted decisions defensible\./);
  assert.match(built, /whitaker\.js/);

  for (const filename of artifactPaths) {
    assert.ok(existsSync(new URL(`../dist/${filename}`, import.meta.url)), `Build output is missing ${filename}`);
  }
});
