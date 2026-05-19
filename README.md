# Maximum Justice Cybersecurity Website, Vercel Ready Package

This package starts from the V12.4 clean website build and adds the missing deployment scaffold needed for Vercel.

## What changed

- Added `package.json`
- Added `build.mjs`
- Added `server.mjs` for local preview
- Added `vercel.json`
- Moved the uploaded website build into `/site`
- Build command copies `/site` into `/dist`
- Removed the GitHub Pages `/mjc-site/` asset base from `index.html`
- Removed `V12` from the browser title
- Updated canonical/OpenGraph URLs toward `app.maximumjusticecybersecurity.com`

## Vercel settings

Use these settings in Vercel:

- Framework Preset: Other
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

## Local preview

```bash
npm install
npm start
```

Open:

```text
http://localhost:4173
```

## Deploy flow

1. Upload or copy this package into the GitHub repository root
2. Commit and push to GitHub
3. In Vercel, import the repo or redeploy the existing project
4. Confirm the deployment loads before connecting `app.maximumjusticecybersecurity.com`
