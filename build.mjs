import { cp, rm, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const loader = `\n<script>window.WHITAKER_VOICE_RUNTIME_URL='https://voice.maximumjusticecybersecurity.com';</script>\n<script src="/whitaker-server-tts-client.js?v=1.0.0" defer></script>\n<script src="/whitaker.js?v=4.1.0" defer></script>\n`;

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

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('site', 'dist', { recursive: true });
await injectWhitaker('dist');
console.log('MJC website copied to dist/ and Whitaker injected into all HTML pages.');
