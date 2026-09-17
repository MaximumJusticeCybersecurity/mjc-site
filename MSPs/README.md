# MSP Program

## Purpose

This directory is the durable operating knowledge base for MJC's MSP program.

The program objective is to build repeatable MSP capabilities that combine operational automation, AI-enabled MSP operations, cybersecurity, governance, and commercially viable managed AI services.

Each MSP receives its own subdirectory. Company-specific facts, workflows, requirements, decisions, SOPs, architecture, issues, agent instructions, runbooks, and outcomes belong within that company's directory. Reusable patterns should be generalized upward into shared MSP assets rather than duplicated blindly.

## Reference implementation

ThinkEzIT is the first proof-of-concept and reference implementation.

Canonical directory:

`MSPs/ThinkEzIT/`

## Program operating rules

1. Build something the MSP will actually use.
2. Build something the MSP can actually sell.
3. Validate adoption and commercial demand with evidence, not assumptions.
4. A technically functional system that is unused, unsellable, or produces no buyer interest is a failed implementation.
5. Reusable MSP intellectual property should be generalized only after it is validated in the reference implementation.
6. Memory is convenience, not authority.

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

The MSP agent may read authorized sources, analyze, draft, document, maintain backlog artifacts, and prepare reviewable changes. It may not autonomously make financial commitments, accept contracts, publish public changes, perform destructive repository operations, or represent owner legal approval.

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

