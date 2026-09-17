# MSP Brain Baseline

## Purpose

The MSP Brain is the reusable baseline agent/runtime package for all MSP implementations under `MSPs/`.

Each MSP receives a tailored derivative of this baseline inside that MSP's own directory. The baseline defines common capabilities, controls, packaging conventions, update behavior, and acceptance gates. The MSP-specific derivative contains customer-specific configuration, workflows, prompts/instructions, integrations, knowledge sources, branding, and executable packaging.

## Reference Structure

```text
MSPs/
  MSP-Brain/
    README.md
    DEPLOYMENT-ARCHITECTURE.md
    baseline/
    packaging/
    tests/
  ThinkEzIT/
    Brain/
      README.md
      app/
      config/
      knowledge/
      integrations/
      packaging/
      tests/
      releases/
```

## Core Principles

1. One primary MSP Brain per MSP.
2. Tailor from the MSP Brain baseline; do not fork behavior ad hoc without documenting the delta.
3. The MSP-specific Brain must be useful in daily work, not merely technically functional.
4. The MSP-specific Brain must support revenue-producing workflows or customer-delivery workflows.
5. Secrets, API keys, credentials, tokens, and customer-sensitive material must never be embedded in source code or installer payloads.
6. Every release must be versioned, integrity-checkable, reversible, and traceable to source.
7. Windows installers must be code-signed before external distribution.
8. Installation must require clear user consent and must not silently weaken endpoint, identity, or security controls.
9. Updates must be authenticated and fail safely.
10. Customer-specific IP and internal operational data must be separated from public website content.

## Tailoring Contract

Every MSP derivative must document:

- Company identity and branding
- Approved users and roles
- Core workflows
- Connected systems and permission boundaries
- Data sources and authoritative repositories
- Customer-specific knowledge
- Security and privacy constraints
- Human approval points
- Commercial/service workflows
- Installation and update behavior
- Acceptance criteria
- Telemetry and support model

## Acceptance Gate

A tailored MSP Brain is not accepted merely because it installs or answers questions.

It must demonstrate:

- Successful installation on a clean target workstation
- Successful startup after reboot
- Correct MSP branding and configuration
- Access only to approved systems/data
- Completion of defined operational workflows
- Human-readable audit/log records
- Safe error handling and rollback
- Actual use by MSP personnel
- Evidence that the resulting workflows can support services the MSP can sell or deliver

ThinkEzIT is the first reference implementation.
