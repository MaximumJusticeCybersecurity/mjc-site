# ThinkEzIT Brain

## Role

The ThinkEzIT Brain is the first customer-specific implementation of the reusable MSP Brain baseline.

It is intended to become ThinkEzIT's single generalist MSP AI agent: tailored to ThinkEzIT's people, processes, services, operating rules, approved systems, sales model, and customer-delivery workflows.

## Primary Outcome Order

1. Automate ThinkEzIT operational workflows.
2. Build ThinkEzIT's internal AI-enabled MSP operating model.
3. Prove a commercial managed-AI offering ThinkEzIT can sell.

If ThinkEzIT personnel do not use the Brain, the implementation has failed. If the resulting service cannot be sold or buyers will not buy it, the commercial proof has failed.

## 90-Day Commercial Clock

Start: Monday, September 21, 2026.
Day 90: December 20, 2026.

The implementation must produce real adoption and revenue evidence within this period, not merely software completion.

## Planned Directory Model

```text
Brain/
  README.md
  app/            # Application/runtime source
  config/         # Non-secret ThinkEzIT configuration
  knowledge/      # Approved operational knowledge manifests/index definitions
  integrations/   # Connectors and integration adapters
  packaging/      # Installer/build definitions
  tests/          # Functional, security, workflow, and acceptance tests
  releases/       # Release manifests and notes; binaries should use approved release/artifact distribution
```

## End-User Experience

Barry or another authorized ThinkEzIT user receives a trusted link, downloads a signed ThinkEzIT Brain installer, runs it locally, and receives a configured desktop application. The application then guides the user through authorized account connections and validates readiness before normal use.

The goal is a low-friction install experience. The implementation must not trade away code signing, permission boundaries, safe credential handling, update integrity, rollback, or auditability to achieve that simplicity.

## Initial Capability Scope

The first release should prioritize ThinkEzIT workflows already identified in the POC, beginning with operational automation such as onsite evaluation through quoting/customer workflow, then progressively adding internal MSP operating-model capabilities and the commercial managed-AI service workflow.

All customer-specific integrations, permissions, and data access must be explicitly approved and documented before production enablement.
