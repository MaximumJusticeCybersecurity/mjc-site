import { cp, rm, mkdir } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('site', 'dist', { recursive: true });
console.log('MJC website copied to dist/ for Vercel deployment.');
