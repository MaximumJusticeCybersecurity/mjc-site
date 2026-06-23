# Maximum Justice Cybersecurity Website, Vercel Ready Package

Version timestamp: 2026062312

This package starts from the V12.4 clean website build and adds the deployment scaffold needed for Vercel.

## Content governance

Before changing public copy, page hierarchy, calls to action, metadata, forms, or funnel links, read:

```text
AGENTS.md
content-governance.json
docs/2026062312-mjc-site-positioning-and-conversion-requirements.md
docs/2026062312-content-source-of-truth-and-feedback-currency.md
```

Current recorded direction:

```text
MJC = expert-led cybersecurity and AI governance firm
CyberShield = AI Decision Assurance product and proof engine
AI-generated recommendation in -> defensible AI Trust Decision Record out
Primary CTA = Challenge One AI Recommendation
```

The current site code still contains older Executive Operational Visibility and TrustMap-first conversion language.  That code remains the deployed baseline until a separate reviewed implementation updates and verifies the public experience.  Do not claim the requirements in this branch are already live.

## What changed in the Vercel package

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

1. Create a task-specific branch.
2. Reconcile current content requirements and feedback currency.
3. Implement and test locally.
4. Prepare a pull request.
5. Obtain owner approval for public release.
6. Commit and push to GitHub.
7. In Vercel, import the repo or redeploy the existing project.
8. Confirm the deployment, routes, forms, metadata, and rollback before connecting or changing public domains.
