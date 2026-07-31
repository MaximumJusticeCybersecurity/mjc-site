import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const guide = await readFile('dist/local-digital-brain-guide.html', 'utf8');
const landing = await readFile('dist/local-digital-brain.html', 'utf8');
const homepage = await readFile('dist/index.html', 'utf8');
const client = await readFile('dist/local-digital-brain-gate.js', 'utf8');
const stylesheet = await readFile('dist/local-digital-brain-gate.css', 'utf8');
const squarespaceWidget = await readFile('dist/whitaker-widget.js', 'utf8');
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

test('MJC homepage exposes the email-gated guide download call to action', () => {
  assert.match(homepage, /id="local-digital-brain"/);
  assert.match(homepage, /data-event="local_brain_guide_clicked"/);
  assert.match(homepage, /href="\/local-digital-brain-guide"/);
  assert.match(homepage, /Enter your email to unlock the complete Local Digital Brain Starter Guide/);
  assert.match(homepage, /Download the Free Guide/);
  assert.doesNotMatch(homepage, /local-digital-brain-guide\.html/);
});

test('Squarespace Whitaker bundle exposes the guide on the public homepage', () => {
  assert.match(squarespaceWidget, /www\.maximumjusticecybersecurity\.com/);
  assert.match(squarespaceWidget, /mjc-local-brain-guide-promo/);
  assert.match(squarespaceWidget, /https:\/\/app\.maximumjusticecybersecurity\.com\/local-digital-brain-guide/);
  assert.match(squarespaceWidget, /Enter your email to unlock the guide/);
  assert.match(squarespaceWidget, /Download the Free Guide/);
  assert.match(squarespaceWidget, /local_brain_guide_clicked/);
  assert.match(squarespaceWidget, /window\.location\.pathname !== '\/'/);
  assert.doesNotMatch(squarespaceWidget, /local-digital-brain-guide\.html/);
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
