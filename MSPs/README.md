# MSP Program

## Purpose

This directory is the durable operating knowledge base for MJC's MSP program.

The program objective is to build repeatable MSP capabilities that combine operational automation, AI-enabled MSP operations, cybersecurity, governance, and commercially viable managed AI services.

Each MSP receives its own subdirectory. Company-specific facts, workflows, requirements, decisions, SOPs, architecture, issues, agent instructions, runbooks, outcomes, and tailored Brain implementation material belong within that company's directory. Reusable patterns should be generalized upward into shared MSP assets rather than duplicated blindly.

## Reference implementation

ThinkEzIT is the first proof-of-concept and reference implementation.

Canonical directory:

`MSPs/ThinkEzIT/`

## Directory model

```text
MSPs/
  MSP-Brain/          # Reusable baseline agent/runtime architecture
  ThinkEzIT/
    Brain/            # Tailored ThinkEzIT implementation
  <FutureMSP>/
    Brain/            # Tailored derivative for that MSP
```

## Program operating rules

1. Build something the MSP will actually use.
2. Build something the MSP can actually sell.
3. Validate adoption and commercial demand with evidence, not assumptions.
4. A technically functional system that is unused, unsellable, or produces no buyer interest is a failed implementation.
5. Reusable MSP intellectual property should be generalized only after it is validated in the reference implementation.
6. Memory is convenience, not authority.

## ThinkEzIT success hierarchy

1. Automate ThinkEzIT operational workflows.
2. Build ThinkEzIT's internal AI-enabled MSP operating model.
3. Prove a commercial managed-AI offering ThinkEzIT can sell.

The 90-day revenue clock begins Monday, September 21, 2026 and ends December 20, 2026.

## Source-of-truth hierarchy

For consequential work, resolve conflicts in this order:

1. Approved repository artifact
2. Current explicit owner direction
3. Current email or source document
4. Project files / approved persistent library material
5. Memory or conversation context
6. Inference

When sources disagree, newer approved authoritative material supersedes older material. Never silently resolve a material conflict by guessing.

## Agent model

The operating model is intentionally minimal: one primary MSP AI agent per MSP, tailored to that MSP's environment and needs. The MSP agent is a generalist orchestrator rather than a large internal multi-agent engineering team.

The reusable MSP Brain baseline defines common architecture, controls, packaging, release rules, and acceptance criteria. Each MSP receives a tailored derivative under its own company directory.

The MSP agent may read authorized sources, analyze, draft, document, maintain backlog artifacts, and prepare reviewable changes. It may not autonomously make financial commitments, accept contracts, publish public changes, perform destructive repository operations, or represent owner legal approval.

## Distribution model

The intended external user experience is: trusted link -> signed installer download -> local user-approved installation -> configured MSP Brain application.

A browser should not be expected to execute an `.exe` directly from a GitHub page. GitHub or the MJC website may host the trusted link, while the versioned installer is distributed through an approved release/artifact mechanism.

## Public repository boundary

The current `mjc-site` repository is public. Do not place customer secrets, credentials, access tokens, private certificates, confidential customer data, restricted operational records, or protected customer-specific knowledge directly in public paths. Use protected/private storage or runtime-authorized connections for such material.

## Cross-agent handoff minimum

Every handoff must include:

- Task
- Inputs
- Authoritative source locations
- Constraints
- Acceptance criteria
- Owner
- Current status
- Output location
- Blockers / unresolved questions

