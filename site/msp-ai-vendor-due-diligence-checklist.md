# MSP AI Vendor Due-Diligence Checklist

Use these questions when evaluating AI embedded in RMM, PSA, security, service-desk, workflow, automation, analytics, or client-facing technology.

A positive answer does **not** prove that a vendor, model, or product is safe, compliant, accurate, or appropriate for your use case.  Evaluate answers against your own architecture, contracts, data, customers, obligations, and Risk If Wrong.

## A. Decision authority

- [ ] What decisions does the AI recommend?
- [ ] What actions can the AI execute without a human?
- [ ] Which actions require explicit human authorization?
- [ ] Can administrators reduce or disable AI execution authority?
- [ ] Can authority be limited by customer, tenant, role, system, action type, or consequence?
- [ ] Is there a safe mode when AI capability is unavailable or uncertain?

## B. Model and provider transparency

- [ ] Which model(s) and provider(s) are used?
- [ ] Is the model/version visible in logs or records?
- [ ] Can the underlying model change without customer notice?
- [ ] How are material model or prompt changes communicated?
- [ ] Is there a change history for AI behavior that could affect decisions?
- [ ] Can customers remain on an approved model/version when needed?

## C. Data use and segregation

- [ ] What customer, employee, ticket, endpoint, security, or business data is sent to the AI system?
- [ ] Where is that data processed and stored?
- [ ] Is customer data used to train, fine-tune, evaluate, or improve a model?
- [ ] Can training/use for improvement be disabled?
- [ ] How is data segregated among MSP tenants and downstream customers?
- [ ] What retention period applies to prompts, outputs, embeddings, logs, and supporting data?
- [ ] Can retained AI data be deleted according to customer requirements?

## D. Evidence and uncertainty

- [ ] What evidence accompanies an AI recommendation?
- [ ] Can the reviewer inspect the sources supporting material claims?
- [ ] Does the system distinguish source evidence from AI-generated explanation?
- [ ] Does it expose missing, stale, contradictory, or uncertain evidence?
- [ ] Are confidence or uncertainty measures explained rather than presented as unexplained numbers?
- [ ] What happens when evidence is insufficient?
- [ ] Can the system abstain, defer, or request more evidence?

## E. Hallucination and error handling

- [ ] How does the vendor test for inaccurate, fabricated, or unsupported output?
- [ ] What failure modes are known for this use case?
- [ ] What evaluation data and scenarios are used?
- [ ] Are material false-positive and false-negative patterns published or available under NDA?
- [ ] How does the system respond to contradictory data?
- [ ] What prevents a polished explanation from being treated as proof?

## F. Human control

- [ ] Can a human inspect the recommendation before a material action?
- [ ] Can a reviewer modify, reject, defer, or request more evidence?
- [ ] Is human disagreement preserved in the record?
- [ ] Does the interface provide enough evidence and time for meaningful review?
- [ ] Are high-consequence actions routed to a more qualified authority?
- [ ] Can autonomous behavior be constrained based on Risk If Wrong?

## G. Logging and decision reconstruction

- [ ] Are the AI recommendation and resulting action logged?
- [ ] Are relevant inputs, model/provider/version, user/service account, and timestamp preserved?
- [ ] Is human approval or override preserved separately from the AI recommendation?
- [ ] Can logs be exported in a usable format?
- [ ] Can the MSP reconstruct why a material action was taken months later?
- [ ] Are log retention and deletion controls documented?

## H. Reversibility and operational resilience

- [ ] Can AI-triggered actions be rolled back?
- [ ] Is rollback tested for material action types?
- [ ] What happens when the AI service or upstream model provider is unavailable?
- [ ] What happens when the model times out, refuses, returns malformed output, or produces conflicting recommendations?
- [ ] Are there rate, spend, token, or dependency limits that can stop a business function?
- [ ] Does the system fail safely rather than silently widening authority?

## I. Security and supply chain

- [ ] How are prompts, retrieved content, tool calls, and model outputs protected from direct and indirect prompt injection?
- [ ] What tools, connectors, plugins, agents, and external services can the AI invoke?
- [ ] What identity and authorization controls govern those actions?
- [ ] Are secrets prevented from entering prompts, outputs, logs, or model context?
- [ ] How are third-party model/provider outages, breaches, vulnerabilities, and supply-chain changes handled?
- [ ] Is there an incident-response process specific to AI-enabled behavior?

## J. Contract and responsibility boundary

- [ ] What responsibility does the vendor accept for AI-generated recommendations or actions?
- [ ] What responsibility remains with the MSP?
- [ ] What responsibility flows to the MSP's customer?
- [ ] What AI-specific limitations, disclaimers, indemnities, data rights, or exclusions are in the contract?
- [ ] Does the vendor notify customers of material AI incidents or behavior changes?
- [ ] What evidence would the vendor provide after an AI-related incident?

## K. Decision before purchase

Before approving the tool, write down:

**What business problem are we buying AI to solve?**  

**What baseline will tell us whether it created value?**  

**What decisions or actions will it influence?**  

**What is the highest credible Risk If Wrong?**  

**Who owns those decisions?**  

**What evidence must exist before we allow more autonomy?**  

**What would make us reduce, pause, or remove the AI capability?**  

---

Maximum Justice Cybersecurity  
MSP AI Decision Assurance Field Kit  
https://app.maximumjusticecybersecurity.com/msp
