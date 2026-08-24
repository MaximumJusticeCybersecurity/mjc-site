# Maximum Justice Cybersecurity Website

Production website repository for Maximum Justice Cybersecurity (MJC).

**Primary production domain:** https://app.maximumjusticecybersecurity.com/

MJC is an expert-led cybersecurity, AI governance, vCISO, Security SME, Cybersecurity SME, and AI Decision Assurance firm founded by Dr. Max Justice.  The firm helps organizations make high-consequence technology and security decisions defensible before those decisions become operational consequences.

## Current value proposition

MJC operates at the intersection of cybersecurity leadership, AI governance, decision assurance, compliance, and operational resilience.

Core doctrine:

```text
AI is controlled before it acts, or it is not controlled at all.
```

CyberShield applies that doctrine to AI-generated recommendations:

```text
AI-generated recommendation in -> AI Trust Decision Record out
```

The operating loop is:

```text
Claims -> Evidence -> Consequences -> Decision -> Record
```

The objective is not to ask whether an AI system sounds confident.  The objective is to determine whether an accountable human can defend acting on the recommendation based on the evidence available at the time.

## Current capabilities

### CyberShield AI Decision Assurance

CyberShield is MJC's decision-assurance product and proof engine.  It is designed to challenge AI-generated recommendations before organizations rely on them for security, vendor-risk, compliance, governance, or other consequential decisions.

CyberShield can:

- Separate AI claims from supporting assertions
- Map supporting, missing, contradictory, and insufficient evidence
- Classify **Risk If Wrong**
- Record confidence limits instead of treating model confidence as evidence
- Determine when meaningful human review is required
- Preserve decision provenance and accountable human disposition
- Produce a defensible **AI Trust Decision Record**
- Surface Human Legibility and Harness Health considerations
- Evaluate perception-risk and decision-invariance concerns in bounded assurance workflows
- Support framework mapping without treating mapping as certification or proof of compliance

CyberShield does **not** autonomously approve vendors, accept risk, certify compliance, or replace accountable human authority.

### AI governance and agent governance

MJC helps organizations establish governance around AI systems and AI-enabled agents, including:

- Decision authority and escalation boundaries
- Meaningful human oversight
- Risk-if-wrong thresholds
- Decision provenance and evidence retention
- Runtime control requirements before consequential action
- Agent permissions, separation of duties, verification, and change governance
- Harness maintenance, health, and legibility requirements
- AI ethics, model-risk, vendor-risk, and third-party governance

### vCISO and cybersecurity leadership

Dr. Max Justice provides vCISO, Security SME, and Cybersecurity SME leadership for organizations that need executive security judgement without building every capability internally.

Representative capability areas include:

- Enterprise cybersecurity strategy
- Governance, risk, and compliance
- Security architecture and secure SDLC
- Cloud and application security
- Healthcare cybersecurity and regulated-data environments
- Public-sector and federal cybersecurity
- Critical-infrastructure and water/OT cybersecurity
- Security program modernization
- Incident and resilience planning
- Vendor and supply-chain security
- Executive and board-level risk communication

### Local Digital Brain

MJC also provides practical guidance for organizations building local/private AI knowledge systems that can be inspected, controlled, and verified.  The public Local Digital Brain Starter Guide is available from the production website.

## Dr. Max Justice

Dr. Max Justice is the founder of Maximum Justice Cybersecurity and serves as a vCISO, Security SME, and Cybersecurity SME.  He is a CISSP, PMP, Lean Six Sigma Black Belt, Ph.D., MBA, and U.S. veteran with more than 25 years of cybersecurity, technology, program, and executive leadership experience.

His background spans large-scale federal, healthcare, public-sector, and regulated environments, including security governance, secure systems engineering, compliance, program leadership, and capture/delivery efforts involving portfolios measured in hundreds of millions to more than one billion dollars.

## Public pathways

- **MJC production website:** https://app.maximumjusticecybersecurity.com/
- **CyberShield:** https://maximumjusticecybersecurity.github.io/CyberShield/
- **Challenge One AI Recommendation:** https://maximumjusticecybersecurity.github.io/CyberShield/vendor-risk-next.html
- **AI Security and CISO Profile:** https://app.maximumjusticecybersecurity.com/ai-security-ciso-profile.html
- **Local Digital Brain guide:** https://app.maximumjusticecybersecurity.com/local-digital-brain-guide
- **Schedule a scope conversation:** https://calendly.com/maxjustice
- **Contact:** max@maximumjusticecybersecurity.com

## Bot and AI discovery

The production package intentionally supports machine discovery and semantic understanding through:

- `llms.txt`
- `robots.txt`
- `sitemap.xml`
- JSON-LD structured data
- canonical metadata
- OpenGraph metadata
- semantic page structure

The canonical machine-readable description of MJC capabilities is `site/llms.txt`.  Public claims in that file must distinguish operational capability from planned or prototype functionality.

## Deployment

This repository is configured for Vercel deployment.

- Framework preset: Other
- Build command: `npm run build`
- Output directory: `dist`
- Source content: `/site`

The build process copies `/site` into `/dist` for deployment.

## Security and content governance

Before material changes, review:

```text
AGENTS.md
content-governance.json
docs/2026062312-mjc-site-positioning-and-conversion-requirements.md
docs/2026062312-content-source-of-truth-and-feedback-currency.md
docs/20260818-mjc-web-security-baseline.md
```

Security controls include deterministic site security validation, immutable GitHub Actions references, dependency update automation, browser security headers, resource isolation, and an RFC 9116 security contact surface.

## Positioning boundaries

Do not imply:

- autonomous risk acceptance or vendor approval
- compliance certification merely from framework mapping
- guaranteed risk reduction
- unsupported customer outcomes
- production capability for features that remain prototype, bounded, or planned
- that MJC serves only federal customers

MJC serves commercial, healthcare, public-sector, regulated-industry, and critical-infrastructure organizations where the cost of a wrong technology or security decision is material.
