# No-Orphan Requirements and Implementation Coverage SOP

Version: 2026072215  
Owner: Dr. Max Justice  
Applies to: Aegis, Architect, Requirements Steward, Forge, Sentinel, Verifiers A/B/C, Agent Registrar, Resource Manager, CyberShield, and all future domain-agent teams.

## 1. Purpose

Prevent any approved requirement, decision, finding, condition, limitation, or owner commitment from becoming disconnected from implementation, verification, acceptance, or an explicit disposition.

## 2. Governing rule

Every requirement shall map to exactly one canonical home, one accountable owner, one implementation status, one verification path, and one next action or authorized final disposition.

A requirement lacking any mandatory mapping is an orphan. Orphans are prohibited.

## 3. Mandatory lifecycle record

Each requirement shall have a coverage record containing:

- stable requirement identifier;
- requirement text or canonical reference;
- canonical home;
- source decision, issue, architecture package, or owner direction;
- accountable owner;
- implementation phase;
- dependency state;
- implementation status;
- associated issue;
- associated PR and exact candidate commit, when implementation exists;
- implementation artifact or runtime component;
- acceptance criteria;
- deterministic tests;
- required independent verifier or Human Gate;
- evidence location;
- owner acceptance state;
- residual limitations;
- rollback path;
- next valid action;
- explicit deferment, waiver, rejection, supersession, or retirement authority where applicable.

## 4. Allowed implementation states

Use only these status classes unless a canonical schema defines a stricter set:

1. `REQUIREMENT_RECORDED`
2. `ARCHITECTURE_ONLY`
3. `BOUNDED_IMPLEMENTATION_AUTHORIZED`
4. `PR_OPEN`
5. `IMPLEMENTED_SYNTHETIC`
6. `IMPLEMENTED_NOT_INSTALLED`
7. `INSTALLED_NOT_OPERATIONAL`
8. `OPERATIONAL_NOT_FIELD_VERIFIED`
9. `FIELD_VERIFIED`
10. `OWNER_ACCEPTED`
11. `DEFERRED_WITH_AUTHORITY`
12. `SUPERSEDED`
13. `REJECTED`
14. `RETIRED`
15. `BLOCKED`

Status names shall not overstate operational truth.

## 5. Team responsibilities

### Requirements Steward

- assigns stable identifiers;
- confirms requirement wording and canonical home;
- prevents duplicate or competing requirements;
- records authorized changes, waivers, and supersession.

### Architect

- maps requirements to architecture components, dependencies, phases, and verification methods;
- identifies contradictions, missing contracts, and non-implementable requirements;
- does not authorize implementation outside the approved boundary.

### Aegis

- maintains cross-requirement coherence and owner intent;
- verifies that each requirement has a next valid action or final disposition;
- identifies cross-repository and cross-agent orphans;
- produces the owner-facing exception report.

### Forge / Implementation Agent

- implements only requirements explicitly included in the bounded PR scope;
- lists every requirement addressed and not addressed;
- records exact candidate commit, tests, limitations, and rollback;
- does not mark requirements independently verified or owner accepted.

### Sentinel / Security Agent

- checks security, privacy, authority, supply-chain, credential, data, and abuse-case coverage;
- records unresolved findings as traceable requirements or conditions;
- ensures findings cannot disappear when a candidate changes.

### Verifiers A/B/C

- verify the exact candidate against assigned requirement identifiers;
- record pass, fail, blocked, not attempted, or accepted-with-authority dispositions;
- reject evidence not bound to the exact candidate.

### Agent Registrar and Resource Manager

- preserve component, agent, version, dependency, ownership, lifecycle, and evidence relationships;
- do not create a second competing requirement system of record.

### Dr. Max Justice

- retains final authority for material scope, activation, production readiness, deferment, waiver, external action, and owner acceptance.

## 6. Required checklists

### 6.1 Requirement intake checklist

- [ ] Stable identifier assigned.
- [ ] Canonical home selected.
- [ ] Source and owner intent recorded.
- [ ] Duplicate and conflict search completed.
- [ ] Owner and implementation phase assigned.
- [ ] Acceptance criteria defined.
- [ ] Verification method defined.
- [ ] Authority and prohibited actions defined.
- [ ] Dependency and next action recorded.

A requirement shall not enter implementation planning until all items pass or an explicit blocked state is recorded.

### 6.2 Architecture handoff checklist

- [ ] Every requirement mapped to a component or explicit non-implementation disposition.
- [ ] Dependencies and ordering recorded.
- [ ] Canonical ownership reconciled.
- [ ] No duplicate registry, policy, evidence store, memory, or task system introduced.
- [ ] Acceptance and negative tests specified.
- [ ] Security and privacy effects specified.
- [ ] Rollback and stop conditions specified.
- [ ] Exact bounded Engineer packet identified.

### 6.3 PR opening checklist

Every implementation PR shall contain:

- [ ] Parent issue and phase.
- [ ] Exact requirement identifiers in scope.
- [ ] Requirements explicitly out of scope.
- [ ] Exact candidate commit.
- [ ] Mission and whole-system fit.
- [ ] Dependencies and authority boundaries.
- [ ] Tests and negative evidence.
- [ ] Work Receipt or approved interim equivalent.
- [ ] Security and privacy effects.
- [ ] Known limitations.
- [ ] Rollback path.
- [ ] Owner-test impact.
- [ ] Classification as architecture, implementation, verification, integration, activation, or field verification.

### 6.4 PR merge checklist

- [ ] Requirement-to-change traceability reconciled.
- [ ] Exact-head tests complete.
- [ ] Required independent review complete.
- [ ] All findings resolved, deferred with authority, or preserved as open requirements.
- [ ] Evidence bound to the candidate.
- [ ] Coverage matrix updated.
- [ ] No requirement incorrectly marked operational.
- [ ] Rollback remains valid.
- [ ] Owner gate satisfied where required.

No PR shall merge while it creates an unrecorded requirement, condition, limitation, or unresolved finding.

### 6.5 Phase closure checklist

- [ ] Every phase requirement has an allowed status.
- [ ] Every implemented requirement maps to a PR and exact commit.
- [ ] Every unimplemented requirement has a blocker, next action, or authorized disposition.
- [ ] Every test and verifier obligation has a result or explicit blocked status.
- [ ] Owner test completed.
- [ ] Owner disposition recorded.
- [ ] Conditions converted into tracked requirements or issues.
- [ ] Cross-repository reconciliation completed.
- [ ] Orphan count equals zero.

## 7. Requirement Implementation Coverage Matrix

Each program shall maintain a machine-readable or consistently structured matrix with at least these columns:

| Field | Required |
|---|---|
| Requirement ID | Yes |
| Canonical home | Yes |
| Source | Yes |
| Owner | Yes |
| Phase | Yes |
| Status | Yes |
| Dependency | Yes |
| Issue | Yes |
| PR / commit | When implementation exists |
| Artifact / component | When implementation exists |
| Acceptance test | Yes |
| Verifier / Human Gate | Yes |
| Evidence | When tested |
| Owner disposition | When gated |
| Limitation | When present |
| Rollback | When implementation exists |
| Next action or final disposition | Yes |

The matrix is a control record, not a reporting convenience.

## 8. Automated orphan detection

Where practical, CI or deterministic validation shall fail when:

- a mandatory requirement ID is absent from the matrix;
- a requirement references a missing issue, PR, artifact, test, or evidence record;
- an implementation PR lists no requirement identifiers;
- a closed issue contains requirements without final status;
- an unresolved finding lacks a tracked requirement or authorized disposition;
- duplicate canonical homes exist;
- a requirement is marked operational without installation and operational evidence;
- owner acceptance is claimed without an owner disposition record;
- evidence is bound to a superseded candidate;
- a deferred item lacks authority, rationale, review date, and re-entry trigger.

## 9. Change control

Any new requirement discovered during design, implementation, review, testing, installation, field use, or incident response shall be added to the coverage matrix before the current work is considered complete.

Requirements shall not be silently:

- absorbed into implementation;
- removed during summarization;
- closed because a related PR merged;
- treated as waived by inactivity;
- transferred to another team without an accepted handoff;
- considered verified because multiple agents agree.

## 10. Exceptions

A requirement may remain unimplemented only when it is explicitly:

- blocked with a named blocker and next review trigger;
- deferred by authorized authority with rationale and date;
- superseded by a named canonical requirement;
- rejected with documented rationale;
- retired with lifecycle and evidence-retention disposition.

An exception without an authority record is an orphan.

## 11. Reporting

Aegis shall report at each phase and program review:

- total requirements;
- requirements by status;
- requirements without PRs;
- requirements without verification paths;
- requirements without next actions;
- stale blocked or deferred requirements;
- duplicate or conflicting canonical homes;
- candidate-mismatched evidence;
- orphan count.

The required completion target is:

```text
ORPHAN_COUNT = 0
```

## 12. Enforcement

- No architecture phase closes with unresolved unmapped requirements.
- No implementation PR merges without requirement traceability.
- No program phase advances without a zero-orphan reconciliation or an owner-approved exception package.
- No production-readiness or operational claim is permitted while the applicable coverage matrix contains orphans.

## 13. Initial application

Apply this SOP immediately to:

- Issues #136 through #143;
- Issue #104;
- Issue #45;
- Agentic Engineering Attention and Verification;
- Whole-Picture AI Control Posture;
- Harness Governance;
- Proof-Carrying Work;
- Aegis Brain operational issues;
- Executive Assistant and OSINT Agent requirements;
- CyberShield and future cross-repository domain-agent rollouts.
