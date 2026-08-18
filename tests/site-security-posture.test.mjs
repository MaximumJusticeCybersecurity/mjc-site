import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import test from 'node:test';

const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
const globalRule = config.headers?.find((rule) => rule.source === '/(.*)');
const headerMap = new Map((globalRule?.headers || []).map(({ key, value }) => [key, value]));

const requiredHeaders = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY'
};

const documentRoutes = [
  '/',
  '/local-digital-brain',
  '/local-digital-brain-guide',
  '/ai-security-ciso-profile'
];

test('Vercel applies the approved security headers to every route', () => {
  assert.ok(globalRule, 'Missing catch-all security-header rule');
  for (const [key, expectedValue] of Object.entries(requiredHeaders)) {
    assert.equal(headerMap.get(key), expectedValue, `${key} is missing or changed`);
  }
});

test('CORP protects document routes without blocking distributable Whitaker scripts', () => {
  assert.equal(
    headerMap.has('Cross-Origin-Resource-Policy'),
    false,
    'CORP must not be applied globally because Whitaker scripts are consumed cross-origin'
  );

  for (const source of documentRoutes) {
    const rule = config.headers?.find((candidate) => candidate.source === source);
    const headers = new Map((rule?.headers || []).map(({ key, value }) => [key, value]));
    assert.equal(
      headers.get('Cross-Origin-Resource-Policy'),
      'same-origin',
      `Document route ${source} must enforce same-origin CORP`
    );
  }
});

test('Content Security Policy is restrictive without breaking approved site capabilities', () => {
  const policy = headerMap.get('Content-Security-Policy');
  assert.ok(policy, 'Content-Security-Policy is missing');

  for (const directive of [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "connect-src 'self' https://voice.maximumjusticecybersecurity.com",
    "media-src 'self' blob: https://voice.maximumjusticecybersecurity.com",
    "form-action 'self' mailto:",
    'upgrade-insecure-requests'
  ]) {
    assert.ok(policy.includes(directive), `CSP directive missing: ${directive}`);
  }

  assert.ok(!policy.includes("'unsafe-eval'"), 'CSP must not permit unsafe-eval');
  assert.ok(!policy.includes('default-src *'), 'CSP must not use a wildcard default source');
});

test('security.txt is published, canonical, and unexpired', () => {
  const source = readFileSync(new URL('../site/.well-known/security.txt', import.meta.url), 'utf8');
  const built = readFileSync(new URL('../dist/.well-known/security.txt', import.meta.url), 'utf8');

  assert.equal(built, source, 'Build output must preserve security.txt exactly');
  assert.match(source, /^Contact: mailto:max@maximumjusticecybersecurity\.com$/m);
  assert.match(source, /^Preferred-Languages: en$/m);
  assert.match(
    source,
    /^Canonical: https:\/\/app\.maximumjusticecybersecurity\.com\/\.well-known\/security\.txt$/m
  );

  const expiresMatch = source.match(/^Expires: (.+)$/m);
  assert.ok(expiresMatch, 'security.txt must include Expires');
  const expiresAt = Date.parse(expiresMatch[1]);
  assert.ok(Number.isFinite(expiresAt), 'security.txt Expires must be a valid timestamp');
  assert.ok(expiresAt > Date.now(), 'security.txt has expired and must be renewed');
});

test('external GitHub Actions are pinned to immutable commit SHAs', () => {
  const workflowsDirectory = new URL('../.github/workflows/', import.meta.url);
  const workflowFiles = readdirSync(workflowsDirectory)
    .filter((name) => name.endsWith('.yml') || name.endsWith('.yaml'));

  const mutableRefs = [];
  const usesPattern = /\buses:\s*([^\s#]+)@([^\s#]+)/g;

  for (const filename of workflowFiles) {
    const source = readFileSync(new URL(filename, workflowsDirectory), 'utf8');
    for (const match of source.matchAll(usesPattern)) {
      const [, action, ref] = match;
      if (action.startsWith('./') || action.startsWith('docker://')) continue;
      if (!/^[0-9a-f]{40}$/i.test(ref)) mutableRefs.push(`${filename}: ${action}@${ref}`);
    }
  }

  assert.deepEqual(
    mutableRefs,
    [],
    `External Actions must use immutable 40-character commit SHAs:\n${mutableRefs.join('\n')}`
  );
});
