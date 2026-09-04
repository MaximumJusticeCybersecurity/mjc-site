# MSP AI Incident Evidence Checklist

Use this checklist when an AI-assisted recommendation or action may have contributed to an incident, outage, security event, client impact, financial loss, policy violation, or other material failure.

Preserve evidence before systems rotate logs, vendors change models, users overwrite prompts, or responders alter the environment.  Follow your incident-response, legal-hold, privacy, contractual, regulatory, and chain-of-custody requirements.

> This checklist is operational guidance, not legal, insurance, or forensic certification advice.

## 1. Stabilize first

- [ ] Protect people, systems, data, customers, and critical operations.
- [ ] Stop or bound continuing harmful AI-triggered actions where authorized.
- [ ] Preserve a safe state before destructive remediation.
- [ ] Avoid unnecessary deletion or overwriting of evidence.
- [ ] Escalate to the appropriate incident commander / accountable owner.

## 2. Preserve the AI recommendation

- [ ] Original AI output / recommendation.
- [ ] Exact timestamp or best available time range.
- [ ] User, technician, service account, agent, or workflow that received the output.
- [ ] AI product / vendor / model / version where available.
- [ ] Whether the AI recommended, approved, or directly executed an action.
- [ ] Screenshots only as supplemental evidence; preserve machine-readable logs where possible.

## 3. Preserve instructions and context

- [ ] Original prompt, instruction, system/workflow rule, or automation condition where available.
- [ ] Relevant conversation/context provided to the AI.
- [ ] Retrieval query and retrieved documents where applicable.
- [ ] Tool/function/agent instructions that materially shaped the action.
- [ ] Policy or guardrail version in effect.
- [ ] Any user edits made before action.

## 4. Preserve material inputs

- [ ] Ticket / alert / event data.
- [ ] Endpoint / system / network context.
- [ ] Customer / tenant context.
- [ ] Relevant configuration.
- [ ] Data sources or knowledge-base entries.
- [ ] Evidence supplied to the model.
- [ ] Data freshness / timestamps.
- [ ] Known missing inputs.

Do not collect or duplicate more sensitive data than necessary.

## 5. Preserve supporting and contradictory evidence

- [ ] Evidence the AI relied upon.
- [ ] Evidence the human reviewer relied upon.
- [ ] Contradictory evidence known before action.
- [ ] Contradictory evidence discovered after action.
- [ ] Missing evidence that would have changed the decision.
- [ ] Vendor/source assertions versus independently verified facts.

## 6. Preserve execution evidence

- [ ] Exact action taken.
- [ ] Actor that executed it: human / AI agent / workflow / service account.
- [ ] Commands, API calls, tool calls, scripts, or workflow steps.
- [ ] Target system / resource / tenant.
- [ ] Parameters and configuration.
- [ ] Execution timestamp.
- [ ] Success/failure/partial result.
- [ ] Rollback or containment attempts.

## 7. Preserve human review and authority

- [ ] Named human reviewer, if any.
- [ ] Evidence shown to the reviewer before approval.
- [ ] Human decision: accept / modify / reject / defer / request evidence / other.
- [ ] Human rationale where recorded.
- [ ] Whether the reviewer had appropriate authority.
- [ ] Whether time pressure or workflow design limited meaningful review.
- [ ] Any override or dissent.

## 8. Preserve system and provider telemetry

- [ ] Application logs.
- [ ] Security logs.
- [ ] API gateway / proxy logs.
- [ ] Agent/tool invocation logs.
- [ ] Model/provider request IDs.
- [ ] Change-management records.
- [ ] Authentication / authorization events.
- [ ] Network telemetry where relevant.
- [ ] Vendor incident/status notices.
- [ ] Model or product change notices near the event.

## 9. Record impact

- [ ] Systems/services affected.
- [ ] Customers/tenants affected.
- [ ] Duration.
- [ ] Data affected.
- [ ] Security impact.
- [ ] Privacy impact.
- [ ] Operational impact.
- [ ] Financial impact.
- [ ] Contractual / compliance / legal impact.
- [ ] Reputational / customer-trust impact.
- [ ] Safety / human impact where applicable.

Separate observed impact from estimated or potential impact.

## 10. Record causation carefully

Do not jump from “AI was involved” to “AI caused the incident.”

Document:

**Observed sequence of events:**  

**AI contribution supported by evidence:**  

**Human contribution supported by evidence:**  

**Process/control contribution supported by evidence:**  

**Vendor/system contribution supported by evidence:**  

**Alternative explanations still plausible:**  

**Unknowns:**  

## 11. Corrective action

- [ ] Immediate containment completed.
- [ ] Unsafe authority reduced or disabled where appropriate.
- [ ] Rollback / restoration completed.
- [ ] Evidence gaps addressed.
- [ ] Human review threshold revised where needed.
- [ ] Vendor escalation opened.
- [ ] Prompt/workflow/policy corrected where supported.
- [ ] Model/provider/version change evaluated.
- [ ] Monitoring or detection updated.
- [ ] Decision-record requirements updated.
- [ ] Customer/regulatory/legal notifications handled through accountable channels.

## 12. Reassess before restoring trust

Before re-enabling the same AI-assisted action, ask:

- [ ] What failed?
- [ ] What evidence proves the corrective action addresses that failure?
- [ ] What still remains unknown?
- [ ] Has the Risk If Wrong changed?
- [ ] Is the action still appropriate for AI influence or automation?
- [ ] Does a stronger human authority threshold now apply?
- [ ] Can the next decision be reconstructed from evidence?

---

Maximum Justice Cybersecurity  
MSP AI Decision Assurance Field Kit  
https://app.maximumjusticecybersecurity.com/msp
