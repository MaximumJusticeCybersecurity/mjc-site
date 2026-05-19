# MJC Website V12.3 Clean Static Package

Deployment model: GitHub Pages static root deployment.

Use GitHub Pages settings:
- Source: Deploy from branch
- Branch: main
- Folder: / (root)

Do not use GitHub Actions for this package.
Do not upload old /src, /public, /docs, package.json, package-lock.json, vite.config.js, or .github/workflows folders.

V12.3 changes:
- softened hero headline scale and hierarchy
- centered TrustMap pop-up card on desktop/tablet so it no longer cuts off evidence/cloud content
- preserved mobile bottom-card behavior for usability
- reduced Dr. Max Justice photo scale
- changed mobile photo caption to non-overlapping static caption
- removed the duplicate second TrustMap map
- replaced duplicate map with interactive TrustMap deliverables panel
- added more hover/click interaction across deliverables and cards
- preserved bot/AI discovery files: robots.txt, sitemap.xml, llms.txt, OpenGraph metadata, JSON-LD

Clean expected repo root:
.nojekyll
index.html
assets/
robots.txt
sitemap.xml
llms.txt
README.md
mjc-logo.png
dr-max-justice-capitol.png
max-justice-nasa-roof.png
