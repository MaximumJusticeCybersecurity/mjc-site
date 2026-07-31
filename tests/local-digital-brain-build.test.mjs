import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const guide = await readFile('dist/local-digital-brain-guide.html', 'utf8');
const landing = await readFile('dist/local-digital-brain.html', 'utf8');
const client = await readFile('dist/local-digital-brain-gate.js', 'utf8');
const stylesheet = await readFile('dist/local-digital-brain-gate.css', 'utf8');
const vercel = JSON.parse(await readFile('vercel.json', 'utf8'));

test('built guide is locked by default and preserves guide capabilities', () => {
  assert.match(guide, /<body class="guide-locked">/);
  assert.match(guide, /id="guide-access-gate"/);
  assert.match(guide, /type="email"/);
  assert.match(guide, /role="alert"/);
  assert.match(guide, /This submission does not enroll you in a newsletter/);
  assert.match(guide, /Print \/ Save as PDF/);
  assert.match(guide, /Build Your Own Local Digital Brain/);
  assert.match(guide, /https:\/\/app\.maximumjusticecybersecurity\.com\/local-digital-brain-guide/);
  assert.doesNotMatch(guide, /local-digital-brain-guide\.html/);
});

test('landing page guide calls to action use the canonical clean route', () => {
  assert.match(landing, /href="\/local-digital-brain-guide"/);
  assert.doesNotMatch(landing, /href="(?:\.\/|\/)local-digital-brain-guide\.html"/);
});

test('client unlocks only from a successful server response and stores no email', () => {
  assert.match(client, /const ENDPOINT = '\/local-digital-brain-lead'/);
  assert.match(client, /response\.ok/);
  assert.match(client, /payload\.ok !== true/);
  assert.match(client, /persistExpiration\(payload\.accessExpiresAt\)/);
  assert.match(client, /window\.localStorage\.setItem\(STORAGE_KEY/);
  assert.doesNotMatch(client, /localStorage\.setItem\([^\n]*email/i);
  assert.doesNotMatch(client, /console\.(?:log|info|debug)/);
  assert.doesNotMatch(client, /URLSearchParams|location\.search/);
});

test('locked-state styling hides guide body and remains mobile accessible', () => {
  assert.match(stylesheet, /body\.guide-locked>:/);
  assert.match(stylesheet, /@media\(max-width:520px\)/);
  assert.match(stylesheet, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(stylesheet, /@media print/);
});

test('Vercel routes lead capture and clean guide before the site fallback', () => {
  const rewrites = vercel.rewrites;
  assert.equal(rewrites[0].source, '/local-digital-brain-lead');
  assert.equal(rewrites[0].destination, '/api/local-digital-brain-access');
  assert.equal(rewrites[1].source, '/local-digital-brain-guide');
  assert.equal(rewrites[1].destination, '/local-digital-brain-guide.html');
  assert.equal(rewrites.at(-1).source, '/(.*)');
});
