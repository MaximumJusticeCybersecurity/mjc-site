# MJC Website V12.2 Clean Static Deployment Package

This package is built for **GitHub Pages direct publishing from `main` / root**.

## GitHub Pages settings
Use:

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/ (root)`

Do **not** use `/docs` for this package.

## Why this package is different
This package is already built as static production files.  It does not require GitHub Actions to run `npm`, `vite`, or any Node build command during deployment.

That avoids the prior `exit code 127` failure caused by a missing command in the build workflow.

## Included
- Restored interactive first-pane TrustMap
- Dr. Max Justice NASA rooftop/Capitol authority image
- Foundational trust services section
- Executive operational visibility messaging
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- OpenGraph and Twitter metadata
- JSON-LD structured data
- Static validation GitHub Action only

## Upload instructions
1. Extract this zip
2. Copy all contents into the root of the `mjc-site` repository
3. Replace existing files when prompted
4. Commit and push to `main`
5. In GitHub Pages, confirm `main` and `/ (root)` are selected
6. Hard refresh the live site with Ctrl + F5

## Important
If Vercel is still connected, ignore or disconnect it.  This package is intended for GitHub Pages.
