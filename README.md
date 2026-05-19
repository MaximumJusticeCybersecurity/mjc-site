# MJC Website V4

This is the MJC Website V4 build.

## Architecture

MJC Website V4 is the parent authority site for Maximum Justice Cybersecurity.

CyberShield is not embedded. It remains a separate tool and launches here:

https://maximumjusticecybersecurity.github.io/CyberShield/

## Key Design Direction

- Modern, high-conversion executive site
- AI-native trust positioning
- Machine-readable authority surface
- Operational trust narrative
- vCISO, Security SME, Cybersecurity SME credibility
- CyberShield as a separate featured tool
- Executive briefing as primary conversion

## Deployment

This package includes:

- React/Vite source
- vite.config.js with the correct GitHub Pages base
- GitHub Actions deploy workflow
- JSON-LD metadata in index.html
- public/llms.txt
- public/robots.txt
- public/sitemap.xml

## Local Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

Push to the `main` branch. The included GitHub Actions workflow deploys the site to GitHub Pages.

Expected URL:

https://maximumjusticecybersecurity.github.io/mjc-site/

## Contact

max@maximumjusticecybersecurity.com
