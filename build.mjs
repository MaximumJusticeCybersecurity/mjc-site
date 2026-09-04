import { cp, rm, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const loader = `\n<script>window.WHITAKER_VOICE_RUNTIME_URL='https://voice.maximumjusticecybersecurity.com';</script>\n<script src="/whitaker-server-tts-client.js?v=1.0.0" defer></script>\n<script src="/whitaker.js?v=4.1.0" defer></script>\n`;

const gateMarkup = `
<section id="guide-access-gate" class="guide-gate" aria-labelledby="guide-access-title">
  <div class="guide-gate__card">
    <a class="guide-gate__brand" href="/">Maximum Justice Cybersecurity</a>
    <p class="guide-gate__eyebrow">Free guide access</p>
    <h1 id="guide-access-title">Open the Local Digital Brain Starter Guide</h1>
    <p class="guide-gate__lead">Enter your email to open the complete guide immediately.</p>
    <form id="guide-access-form" novalidate>
      <label for="guide-access-email">Email address</label>
      <input id="guide-access-email" name="email" type="email" inputmode="email" autocomplete="email" maxlength="254" required aria-describedby="guide-access-privacy guide-access-status">
      <div class="guide-gate__honeypot" aria-hidden="true">
        <label for="guide-access-website">Website</label>
        <input id="guide-access-website" name="website" type="text" tabindex="-1" autocomplete="off">
      </div>
      <button id="guide-access-submit" type="submit">Open the free guide</button>
      <p id="guide-access-status" class="guide-gate__status" role="alert" aria-live="assertive"></p>
      <p id="guide-access-privacy" class="guide-gate__privacy">Maximum Justice Cybersecurity uses your email to provide guide access and understand guide usage. This submission does not enroll you in a newsletter.</p>
    </form>
    <p class="guide-gate__trust"><strong>Trust principle:</strong> start small, keep control, and verify results.</p>
    <noscript>JavaScript is required to confirm guide access. Enable JavaScript and reload this page.</noscript>
  </div>
</section>`;

async function injectWhitaker(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await injectWhitaker(full);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
    const html = await readFile(full, 'utf8');
    if (html.includes('whitaker.js')) continue;
    const updated = html.includes('</body>') ? html.replace('</body>', `${loader}</body>`) : `${html}${loader}`;
    await writeFile(full, updated, 'utf8');
  }
}

async function normalizeGuideLinks(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await normalizeGuideLinks(full);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
    const html = await readFile(full, 'utf8');
    const updated = html
      .replaceAll('href="./local-digital-brain-guide.html"', 'href="/local-digital-brain-guide"')
      .replaceAll('href="/local-digital-brain-guide.html"', 'href="/local-digital-brain-guide"')
      .replaceAll('https://app.maximumjusticecybersecurity.com/local-digital-brain-guide.html', 'https://app.maximumjusticecybersecurity.com/local-digital-brain-guide');
    if (updated !== html) await writeFile(full, updated, 'utf8');
  }
}

async function injectGuideGate() {
  const guidePath = path.join('dist', 'local-digital-brain-guide.html');
  let html = await readFile(guidePath, 'utf8');
  if (html.includes('id="guide-access-gate"')) throw new Error('Guide access gate was already injected.');
  if (!html.includes('<head>') || !html.includes('</head>') || !html.includes('<body>')) {
    throw new Error('Guide page does not contain the expected head and body boundaries.');
  }
  html = html
    .replace('<head>', '<head>\n<link rel="stylesheet" href="/local-digital-brain-gate.css?v=1.0.0">')
    .replace('</head>', '<script src="/local-digital-brain-gate.js?v=1.0.0" defer></script>\n</head>')
    .replace('<body>', `<body class="guide-locked">${gateMarkup}`);
  await writeFile(guidePath, html, 'utf8');
}

async function bundleSquarespaceGuidePromotion() {
  const widgetPath = path.join('dist', 'whitaker-widget.js');
  const promoPath = path.join('dist', 'squarespace-local-brain-guide.js');
  const [widget, promo] = await Promise.all([
    readFile(widgetPath, 'utf8'),
    readFile(promoPath, 'utf8')
  ]);
  if (widget.includes('mjc-local-brain-guide-promo')) {
    throw new Error('Squarespace guide promotion was already bundled.');
  }
  await writeFile(widgetPath, `${widget}\n\n${promo}\n`, 'utf8');
}

async function registerCleanCampaignRoutes() {
  const routes = [
    ['water-ready/index.html', 'water-ready.html'],
    ['health-ready/index.html', 'health-ready.html'],
    ['education/ai/trust/index.html', 'education/ai/trust.html'],
    ['education/ai/trust/strategy/index.html', 'education/ai/trust/strategy.html']
  ];
  for (const [source, alias] of routes) {
    const sourcePath = path.join('dist', source);
    const aliasPath = path.join('dist', alias);
    await mkdir(path.dirname(aliasPath), { recursive: true });
    await cp(sourcePath, aliasPath);
  }
}

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('site', 'dist', { recursive: true });
await normalizeGuideLinks('dist');
await injectGuideGate();
await bundleSquarespaceGuidePromotion();
await registerCleanCampaignRoutes();
await injectWhitaker('dist');
console.log('MJC website copied to dist/, campaign clean routes registered, guide access gate applied, Squarespace guide promotion bundled, and Whitaker injected.');
