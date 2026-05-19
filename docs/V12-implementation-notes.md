# MJC Website V12.1 Implementation Notes

V12 restores the interactive first-pane TrustMap while preserving the executive operational visibility positioning.

## Included

- React and Vite GitHub Pages app
- Restored interactive hero TrustMap with reusable node clicks
- Reset interaction so bubbles do not disappear after selection
- Human trust section for Dr. Max Justice
- Foundational trust/services cards
- Executive operational visibility language
- Bot and AI discovery assets
- robots.txt
- sitemap.xml
- llms.txt
- JSON-LD in index.html
- OpenGraph and Twitter metadata

## Important Photo Note

The package includes a placeholder file at:

`public/dr-max-justice-capitol-placeholder.svg`

Replace it with the real Capitol photo and rename the real photo to:

`public/dr-max-justice-capitol.jpg`

Then update `src/main.jsx` from:

`/mjc-site/dr-max-justice-capitol-placeholder.svg`

to:

`/mjc-site/dr-max-justice-capitol.jpg`

## GitHub Pages

The Vite base is already set to `/mjc-site/`.
