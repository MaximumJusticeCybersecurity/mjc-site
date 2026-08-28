# ChannelPro MSP Decision Assurance Field Kit Requirements

Version timestamp: 2026082613  
Status: Owner-authorized Requirements Steward packet — Proceed with constraints  
Owner and final human authority: Dr. Max Justice  
Target repository: `MaximumJusticeCybersecurity/mjc-site`  
Target route: `/msp`  
Implementation branch: `feature/20260826-channelpro-msp-field-kit`

## 1. Owner instruction and business context

Dr. Max Justice will attend ChannelPro DEFEND Alexandria on September 1–2, 2026 as a guest speaker/panel participant and will network with MSP and MSSP leaders.  He has no slide presentation requirement.  The public artifact must therefore support panel conversations, hallway networking, post-event follow-up, and real MSP work after the event.

The owner-approved elevator pitch is:

> **I make AI-assisted decisions defensible.**

The landing experience shall not be a thin promotional page.  It shall give MSPs practical tools they can use immediately while also testing which AI Decision Assurance problems, delivery models, and commercial paths matter most to the MSP market.

## 2. Requirements Steward decision

**Decision: Proceed with constraints.**

This packet authorizes a bounded public-site candidate on a task-specific review branch.  It does not authorize merge, deployment, pricing, guarantees, customer claims, production SaaS claims, autonomous approval, or changes to CyberShield recommendation/risk logic or the AI Trust Decision Record protected schema.

## 3. Governing sources

This packet is subordinate to and shall remain consistent with:

- `AGENTS.md`
- `docs/2026062312-mjc-site-positioning-and-conversion-requirements.md`
- `docs/2026062312-content-source-of-truth-and-feedback-currency.md`
- `content-governance.json`
- CyberShield `governance-summary.json`
- CyberShield `docs/aida/README.md`
- CyberShield `docs/aida/customer-discovery-guide.md`
- CyberShield `docs/aida/decision-assurance-playbook-v0.1.md`
- CyberShield `docs/2026061908-trusted-authority-ethical-influence-standard.md`

## 4. AIDA traceability

The field kit supports the AIDA north star: enable an accountable person to understand why an AI-generated recommendation should or should not be trusted before action.

The MSP-specific implementation must support these AIDA elements without redefining them:

- decision context and accountable owner;
- claims and assumptions;
- supporting and contradictory evidence;
- missing evidence;
- Risk If Wrong;
- reversibility;
- human authority;
- documented final human decision; and
- reassessment when material conditions change.

The landing experience is an educational/advisory field tool.  It is not a new scoring engine or replacement for the governed CyberShield AI Trust Decision Record.

## 5. Primary buyer and accountable users

Primary buyer hypotheses to validate at ChannelPro:

1. MSP/MSSP owner or CEO seeking a defensible way to adopt AI internally.
2. CTO, vCIO, vCISO, security practice lead, service-delivery leader, or operations leader accountable for AI-enabled MSP workflows.
3. MSP seeking an AI governance/assurance service it can deliver to customers.
4. Vendor, distributor, insurer, attorney, or channel partner seeking a repeatable assurance approach for AI-enabled services.

These remain hypotheses until field conversations produce repeated evidence.

## 6. Primary outcome

The visitor should leave with at least one useful artifact or completed assessment even if they never contact MJC.

The field kit shall help an MSP answer:

> **If AI influenced an important decision today, could we explain tomorrow why acting on it was reasonable?**

## 7. Message hierarchy

### Primary message

**I make AI-assisted decisions defensible.**

### MSP-specific explanation

AI is increasingly influencing service-desk, security, operational, vendor, and client decisions.  MJC helps determine whether the evidence is strong enough to rely on an AI-assisted recommendation, when human authority should increase, and what decision record should be preserved.

### Required trust boundary

The page shall state that the tools do not certify an AI output as correct, do not provide legal advice, and do not replace accountable human judgment.

## 8. Required public modules

### MSP-001 — Hero and immediate value

The first viewport shall include:

- the phrase `I make AI-assisted decisions defensible.`;
- an MSP-specific problem statement;
- a primary CTA to run the decision risk scan; and
- a secondary CTA to jump to/download the field kit.

No biography-first presentation.

### MSP-002 — 10-minute AI Decision Risk Scan

Provide a self-service browser assessment requiring no personal data.

Minimum inputs:

- decision/action being influenced by AI;
- whether AI recommends or executes;
- accountable decision owner;
- quality/availability of supporting evidence;
- presence of contradictory or missing evidence;
- consequence if wrong;
- reversibility;
- human approval before action;
- preserved decision record.

Output shall be an advisory escalation category such as:

- lower review need;
- moderate review need;
- high review need; or
- critical review need.

Do **not** label the output a universal trust score, compliance score, probability of correctness, legal conclusion, or CyberShield final determination.

Output shall include specific next actions and explicitly preserve human review.

### MSP-003 — Five-minute decision check

Provide an immediately usable checklist built around:

1. Should AI influence this decision?
2. What evidence supports it?
3. What contradicts it or remains missing?
4. What happens if it is wrong?
5. Who has authority to approve the action?
6. Could the decision be reconstructed later?

### MSP-004 — AI Decision Record template

Provide a downloadable, editable plain-text/Markdown template containing at least:

- decision;
- date/time;
- accountable owner;
- AI system/service;
- AI recommendation;
- material inputs;
- supporting evidence;
- contradictory/missing evidence;
- assumptions;
- Risk If Wrong;
- reversibility;
- human reviewer;
- final human determination: accept/modify/reject/defer/monitor/request evidence;
- rationale;
- resulting action;
- supporting artifacts; and
- reassessment trigger/date.

### MSP-005 — MSP AI Vendor Due-Diligence Checklist

Provide a downloadable checklist addressing:

- decision vs recommendation authority;
- data use/model training;
- model/provider identification and change notice;
- evidence and uncertainty;
- human approval controls;
- action logging and export;
- rollback/reversibility;
- failure/unavailability behavior;
- hallucination/error detection approach;
- retention;
- responsibility/contractual boundary; and
- customer data segregation where applicable.

The checklist shall not imply that a positive answer proves a vendor is safe or compliant.

### MSP-006 — Client AI Discovery Questionnaire

Provide a QBR/discovery questionnaire an MSP can use with customers.  It shall identify:

- where AI is used;
- what data it reaches;
- what decisions it influences;
- what actions it can execute;
- who owns high-consequence decisions;
- what must be preserved as evidence;
- where AI failure would materially affect the business; and
- whether current processes can reconstruct an AI-assisted decision.

### MSP-007 — Human-at-the-helm escalation matrix

Provide a practical four-tier matrix:

- lower consequence: bounded automation may be appropriate;
- moderate consequence: bounded action plus logging/exception review;
- high consequence: qualified human authorization before action;
- critical consequence: independent corroboration and named authority before action.

The page shall state the governing principle:

> **Human oversight should increase with Risk If Wrong.**

### MSP-008 — AI incident evidence checklist

Provide a downloadable checklist for preserving:

- original AI output;
- prompt/instruction where available and appropriate;
- relevant inputs;
- model/vendor/version where available;
- timestamp and actor/service account;
- connected tools/actions;
- supporting evidence;
- logs;
- human approval;
- resulting action;
- business impact; and
- corrective action.

### MSP-009 — MSP AI opportunity map

Show three practical categories:

1. Internal MSP efficiency.
2. Customer advisory/assurance.
3. Recurring managed service opportunity.

Describe opportunities as hypotheses or service patterns, not guaranteed revenue outcomes.

### MSP-010 — Networking and commercial CTA

Primary commercial CTA:

> **Bring me one AI-assisted decision where being wrong actually matters.**

Support two follow-up intents:

- discuss an AI Decision Assurance review; and
- explore an MSP/channel partnership.

Do not use fake scarcity, artificial urgency, unapproved pricing, or guaranteed outcomes.

## 9. Field-validation requirements

The page shall include a short discovery prompt encouraging MSPs to consider or discuss:

- the last AI-assisted decision that mattered;
- what evidence was needed;
- who owned the decision;
- what happened or could happen if it was wrong;
- whether the need is primarily internal MSP use, client delivery, or both; and
- what artifact/service would make Decision Assurance immediately useful.

Conference conversations should capture, outside the public page and without placing sensitive client data in Git:

- role/company;
- AI use case;
- pain point in the participant's own words;
- decision owner;
- Risk If Wrong;
- internal/client/both;
- preferred delivery model;
- follow-up commitment; and
- whether the conversation supports, weakens, or contradicts current buyer hypotheses.

## 10. Privacy and capture

Core educational tools shall be ungated.

The initial candidate shall not require a server-side lead form.  Commercial CTAs may use an explicit `mailto:` action to MJC and may provide copyable prompts so the visitor can choose what to send.

A later server-side lead-capture implementation requires a separate privacy/data-use review and verified receipt path before claiming successful capture.

## 11. Analytics requirements

Instrument browser-side intent events without collecting the visitor's assessment text or answers.

Minimum events:

- `msp_assessment_started`
- `msp_assessment_completed`
- `msp_template_downloaded`
- `msp_vendor_checklist_downloaded`
- `msp_discovery_downloaded`
- `msp_incident_checklist_downloaded`
- `msp_bring_decision_clicked`
- `msp_partnership_clicked`

Local event dispatch or console-visible instrumentation is acceptable for the review candidate.  Production analytics receipt shall not be claimed until independently verified after an approved deployment.

## 12. Accessibility and security

The page shall:

- support keyboard navigation;
- use semantic headings, labels, fieldsets, and live regions;
- preserve visible focus;
- support reduced-motion preferences;
- require no third-party script for core operation;
- use no secrets or client data;
- remain compatible with the repository CSP; and
- receive the same-origin CORP document-route header used by other first-party document routes.

## 13. SEO and machine-readable requirements

The page title, description, structured data where used, and `llms.txt` shall expose the MSP-specific value without overstating capability.

Preferred concepts:

- MSP AI Decision Assurance;
- AI-assisted decision defensibility;
- human-at-the-helm AI review;
- AI vendor due diligence for MSPs;
- AI decision evidence;
- AI governance for MSPs and MSSPs;
- vCISO / Cybersecurity SME / AI governance advisory.

## 14. Verification path

Before merge/release, verify:

1. Build succeeds.
2. MSP page and extensionless `/msp` route are present.
3. All interactive assessment paths produce bounded advisory outputs.
4. No assessment text is sent over the network.
5. All downloadable field-kit artifacts are reachable.
6. Keyboard and mobile layout are reviewed.
7. CTA destinations are verified.
8. CSP/CORP/security posture tests pass.
9. Public claims and credentials are reviewed.
10. Exact candidate receives required independent review under current repository governance.
11. Dr. Max Justice explicitly approves merge/public release.

## 15. Known unvalidated assumptions

- Which MSP AI problem has the highest willingness to pay.
- Whether MSPs prefer internal use, customer resale/delivery, or both.
- Whether the first paid entry should be a decision review, managed service, assessment, training, or platform capability.
- Which field-kit artifact produces the highest follow-up intent.
- Whether channel distribution is materially more attractive than direct MSP consulting.

Alexandria field evidence should update these assumptions after the event.

## 16. Out of scope for this candidate

- CyberShield recommendation/risk logic changes.
- AI Trust Decision Record schema changes.
- Production SaaS claims.
- Autonomous AI approval.
- Customer-specific data ingestion.
- Legal or insurance advice.
- Guaranteed savings, ROI, liability protection, or accuracy claims.
- Public pilot pricing or delivery-time commitments.
- Automatic CRM or email enrollment.
- Deployment or merge to `main` without the required review and owner approval.
