# Codex execution directive — Public Whitaker Cyber Blue, 2026-10-29

## Owner direction
Reuse MJC's existing **Ask Whitaker** entry point so external visitors open a full-screen, Cyber Blue styled conversational assistant (glowing eye), inspired by MADMAX's *visual shell*. Preserve the existing Whitaker revenue/qualification/booking capabilities. Public visitors must **never connect to owner MADMAX**, localhost:8790, owner knowledge, GitHub credentials, or Aegis Brain:8766.

## Existing repo evidence
- Repo `MaximumJusticeCybersecurity/mjc-site`, existing `site/whitaker-widget.js` and `site/whitaker.js` include an `Ask Whitaker` launch action.
- Hosted runtime docs `docs/20260709-whitaker-v4-hosted-runtime.md`, `docs/whitaker-root-page-install-note.md` describe multiple website embedding paths. Audit **actual** live embed before touching it.
- Work independently from Golden Brain #735 and owner knowledge #742. No host changes.

## Architecture and choice
Fastest safe path: public HTTPS UI hosted with existing MJC web stack (prefer existing deployment; GitHub Pages viable for static UI only); hosted server-side adapter to model provider; **public approved MJC knowledge only**. Do not publish `.env`, API keys, private resumes, or MADMAX files. No Cloudflare tunnel to Windows 8790.

## Implementation instructions
1. Confirm actual deployed site, DNS and Whitaker embed(s) and source of truth. Audit current production behavior and preserve baseline.
2. Ship isolated page `site/whitaker-cyberblue.html` (this PR's initial visual candidate) with accessibility, mobile layout, glowing eye, logo, clean-room warning, and fallback link to existing Whitaker. Do not call it AI-complete.
3. Build production browser chat via **same-origin** `POST /api/whitaker/public-chat` on existing approved hosted runtime. Server-side secrets only; validate request schema, cap request bytes/tokens/rate, origin/CORS, deny tool execution, sanitize/encode rendered text, no raw sensitive logs, abort/timeouts, abuse controls. Stream only if infrastructure supports it safely; otherwise use simple JSON response.
4. Approved-public RAG: curated MJC public materials, SHA/version ledger, tenant separation; do not ingest local private MADMAX/owner knowledge. Explicit uncertainty, citations when appropriate, a prompt-injection negative test, and hard deny of private directories/credentials.
5. Keep existing Whitaker lead capture, conversion events, contact routing, Calendly CTA, and accessibility semantics. For first live change, change ONLY the specific production Ask Whitaker click behavior to navigate to the public page; do not remove embedded functionality until conversion parity is verified. Feature flag and rollback path.
6. Add regression tests for Ask Whitaker launch (one visible entry point per surface), mobile, voice permission fallback, AI backend unreachable, model budget/latency, browser XSS, prompt injection, response errors, privacy boundary, referral attribution, and scheduling.
7. PR / preview deployment first, independent verification and exact owner-approved production promotion. Preserve old widget path for immediate rollback.

## Acceptance
- New public HTTPS link works from a separate external network/mobile, no localhost access.
- Cyber Blue UI renders and is recognizably aligned to MADMAX design, with keyboard accessible controls.
- Chat responds through hosted backend to **public** MJC queries and declines private knowledge; distinguish proposal vs deployed capability.
- Whitaker conversion and booking routes still work and tracking remains intact.
- Negative authorization/security tests pass; no private knowledge, keys, unrestricted browser-to-model secrets, or owner machine exposure.
- Preview verified; documented rollback; owner approval to flip production entry point.

## First delivery state
This branch is a **review candidate** for UI and requirements only. No API, production route change, DNS change, or deployment is represented as complete. Codex must implement and test backend and integration before marking production ready.
