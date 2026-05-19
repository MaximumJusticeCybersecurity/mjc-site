import React, { useState } from "react";
import "./styles.css";

const CYBERSHIELD_URL = "https://maximumjusticecybersecurity.github.io/CyberShield/";
const CALENDLY_URL = "https://calendly.com/maxjustice";
const CONTACT_EMAIL = "max@maximumjusticecybersecurity.com";

const hoverCopy = {
  "AI-assisted": "CyberShield generates the first-pass operational visibility analysis across AI, cyber, vendor, and governance signals.",
  "Expert-validated": "Dr. Max Justice reviews and sharpens the TrustMap through operational, governance, and consequence-aware analysis.",
  "Executive-ready": "Built for leadership conversations, boardrooms, audit discussions, and operational decision-making.",
  "Built for trust": "Trust is evaluated through visibility, accountability, evidence, governance, and operational consequence.",
};

const topologyIntel = {
  AI: {
    title: "AI",
    text: "AI visibility shows where automated tools influence decisions, data handling, workflows, and accountability before governance catches up.",
    consequence: "Unmapped AI use creates invisible decision risk.",
  },
  Vendors: {
    title: "Vendors",
    text: "Vendor visibility shows which third parties can disrupt operations, touch sensitive data, or weaken compliance confidence.",
    consequence: "Critical vendors often create risk outside executive awareness.",
  },
  Evidence: {
    title: "Evidence",
    text: "Evidence visibility shows whether policies, controls, reviews, and remediation can be defended when customers, auditors, insurers, or regulators ask.",
    consequence: "Controls without evidence create false confidence.",
  },
  Ownership: {
    title: "Ownership",
    text: "Ownership visibility shows who is accountable before pressure arrives, who approves action, and who owns remediation.",
    consequence: "Unclear ownership delays action when time matters.",
  },
  Data: {
    title: "Data",
    text: "Data visibility shows where critical information flows, who accesses it, which vendors touch it, and whether AI systems interact with it.",
    consequence: "Data movement without visibility becomes trust erosion.",
  },
  Policy: {
    title: "Policy",
    text: "Policy visibility shows whether governance is intentional, current, enforceable, and tied to actual operational behavior.",
    consequence: "Policy that is not operationalized becomes paperwork.",
  },
  Cloud: {
    title: "Cloud",
    text: "Cloud visibility shows identity, access, configuration, vendor dependency, and operational exposure across modern infrastructure.",
    consequence: "Cloud complexity hides privilege, data, and continuity risk.",
  },
  Executive: {
    title: "Executive",
    text: "Executive visibility shows whether leadership can see consequence, ownership, escalation priority, and decision context clearly enough to act.",
    consequence: "Executives do not need more activity.  They need decision intelligence.",
  },
  TrustMap: {
    title: "TrustMap",
    text: "",
    consequence: "",
  },
};

const visibilityStates = {
  "AI Decisions": {
    without: "AI workflows spread before policy, ownership, or evidence expectations are defined.",
    with: "AI usage is mapped to owners, approval paths, data handling rules, and executive visibility.",
    consequence: "Leadership may believe AI adoption is informal while sensitive workflows are already operational.",
    heat: [88, 71, 64, 82],
  },
  "Vendor Risk": {
    without: "Critical vendors create hidden operating dependencies that leadership may not see until disruption.",
    with: "Vendor exposure is mapped by operational consequence, not contract size or annual spend.",
    consequence: "Vendor failure can create business disruption even when internal systems appear stable.",
    heat: [72, 90, 66, 78],
  },
  "Audit Evidence": {
    without: "Controls exist, but proof is scattered, stale, or disconnected from accountable owners.",
    with: "Evidence is organized by control, owner, confidence, status, and executive priority.",
    consequence: "Audit pressure exposes the gap between belief and defensible proof.",
    heat: [61, 70, 93, 69],
  },
  "Executive Reporting": {
    without: "Leadership gets activity dashboards instead of operational decision intelligence.",
    with: "Reporting converts cyber, AI, and governance signals into visibility, consequence, and action.",
    consequence: "Executives can be informed and still lack the visibility needed to act.",
    heat: [84, 58, 72, 91],
  },
};

const trustMapOutputs = {
  "Visibility Score": {
    title: "Visibility Score",
    text: "Measures how clearly leadership can observe operational dependencies, AI usage, vendor exposure, governance ownership, escalation paths, and evidence maturity.",
    action: "Use this to determine where leadership is operating with confidence versus assumption.",
  },
  "Exposure Zones": {
    title: "Exposure Zones",
    text: "Identifies areas where cyber, AI, vendor, data, or governance conditions could create operational disruption or trust damage.",
    action: "Use this to focus attention on what can create consequence, not what merely creates noise.",
  },
  "Ownership Gaps": {
    title: "Ownership Gaps",
    text: "Highlights where accountability is fragmented, escalation authority is unclear, or operational responsibility diffuses across teams.",
    action: "Use this to clarify who owns decisions before pressure arrives.",
  },
  "Evidence Confidence": {
    title: "Evidence Confidence",
    text: "Shows whether the organization can defend policies, controls, reviews, and remediation status under customer, audit, insurance, or regulatory scrutiny.",
    action: "Use this to close the gap between claimed readiness and defensible proof.",
  },
  "AI Governance Signals": {
    title: "AI Governance Signals",
    text: "Reveals where AI tools, workflows, data handling, and decision influence may be outpacing governance, policy, and executive oversight.",
    action: "Use this to preserve human accountability as AI enters operations.",
  },
  "Expert-Validated Next Actions": {
    title: "Expert-Validated Next Actions",
    text: "CyberShield creates the first-pass analysis.  Dr. Max Justice validates and sharpens the final priorities through operational and governance judgment.",
    action: "Use this to move from automated output to executive-grade interpretation.",
  },
};

const scenarios = {
  "AI Procurement": {
    title: "AI Procurement Without Governance",
    setup: "A business unit adopts an AI tool before legal, security, privacy, and executive ownership are aligned.",
    consequence: "Sensitive data may enter uncontrolled workflows while leadership believes adoption is still informal.",
    question: "Who owns the decision before the AI workflow becomes operationally consequential?",
  },
  "Vendor Outage": {
    title: "Vendor Outage Escalation",
    setup: "A third-party platform fails during a business-critical window.",
    consequence: "Departments respond separately because operational authority, escalation order, and continuity ownership were never mapped.",
    question: "Which vendor failure would disrupt operations before leadership sees the full picture?",
  },
  "Audit Pressure": {
    title: "Audit Confidence Collapse",
    setup: "A customer, regulator, insurer, or auditor requests proof of cybersecurity control maturity.",
    consequence: "Policies exist, but evidence is fragmented, ownership is unclear, and remediation status is hard to defend.",
    question: "Could your team produce defensible evidence tomorrow without scrambling?",
  },
  "Decision Fog": {
    title: "Executive Reporting Blind Spot",
    setup: "The executive team receives dashboards, tickets, and status reports from several sources.",
    consequence: "Everyone sees activity.  Nobody sees consequence, ownership, or priority clearly enough to act.",
    question: "Are your reports helping leadership decide, or making them feel informed while blind spots remain?",
  },
};

const services = {
  "TrustMap Briefing": {
    label: "Primary offer",
    summary: "A semi-automated CyberShield first pass followed by expert validation from Dr. Max Justice.",
    bullets: [
      "CyberShield generates the initial TrustMap",
      "Dr. Justice validates and sharpens the executive findings",
      "Output focuses on visibility, ownership, evidence, consequence, and next action",
      "Designed for CEOs, owners, boards, and executive teams",
    ],
    receives: [
      "Operational visibility snapshot",
      "Top executive blind spots",
      "TrustMap heat preview",
      "Prioritized next actions",
    ],
  },
  "Fractional vCISO": {
    label: "Service",
    summary: "Executive cybersecurity leadership without full-time CISO overhead.",
    bullets: ["Security strategy and governance cadence", "Board and executive reporting", "MSP and vendor oversight", "Policy ownership and risk prioritization"],
    receives: ["Governance cadence", "Executive reporting", "Risk prioritization", "Vendor oversight"],
  },
  "AI Governance": {
    label: "Service",
    summary: "Human-command AI governance for organizations adopting AI faster than policy can keep up.",
    bullets: ["AI use inventory and governance policy", "Decision authority and approval gates", "Data handling and accountability rules", "Evidence and auditability expectations"],
    receives: ["AI use inventory", "Approval model", "Policy guardrails", "Evidence expectations"],
  },
  "Audit Readiness": {
    label: "Service",
    summary: "Evidence discipline for CMMC, NIST, HIPAA, customer reviews, cyber insurance, and executive scrutiny.",
    bullets: ["Control mapping and ownership clarity", "Evidence collection structure", "Remediation tracking", "Executive-ready readiness summaries"],
    receives: ["Control map", "Evidence structure", "Remediation status", "Executive summary"],
  },
  "Zero Trust Architecture": {
    label: "Service",
    summary: "Practical Zero Trust strategy balanced with operational trust and business reality.",
    bullets: ["Identity and access review", "Privilege and segmentation priorities", "Cloud and Microsoft ecosystem governance", "Architecture roadmap tied to operational risk"],
    receives: ["Identity review", "Access priorities", "Cloud governance", "Architecture roadmap"],
  },
  "Incident Preparedness": {
    label: "Service",
    summary: "Prepare leadership to make calm, fast decisions before pressure arrives.",
    bullets: ["Executive tabletop exercises", "Escalation authority mapping", "Ransomware and vendor outage scenarios", "Communication and continuity readiness"],
    receives: ["Tabletop scenario", "Escalation map", "Communication path", "Continuity priorities"],
  },
};

const industries = {
  "Federal Contractors": {
    tension: "Audit defensibility and governance visibility",
    pressure: "CMMC, NIST 800-171, DFARS flow-downs, supply-chain exposure, and customer scrutiny.",
    question: "Could you prove ownership, evidence, and remediation status if a customer asked tomorrow?",
  },
  Healthcare: {
    tension: "Continuity under ransomware pressure",
    pressure: "HIPAA, patient data exposure, critical vendors, operational continuity, and clinical workflow risk.",
    question: "If ransomware hit a critical vendor, who owns the first-hour operating decision?",
  },
  Manufacturing: {
    tension: "Invisible dependency disruption",
    pressure: "Plant downtime, OT/IT exposure, vendor dependencies, ransomware, and production continuity.",
    question: "Which systems, vendors, identities, or workflows can stop production?",
  },
  "Financial Services": {
    tension: "Trust degradation before awareness",
    pressure: "Regulatory pressure, fraud exposure, cyber maturity, customer confidence, and AI-assisted decision risk.",
    question: "Would current reporting give leadership enough clarity before trust damage spreads?",
  },
  "Legal & Professional Services": {
    tension: "AI-assisted confidentiality exposure",
    pressure: "Client confidentiality, privileged data, AI document handling, vendor tools, and reputation risk.",
    question: "Can you explain where client-sensitive data goes when AI tools enter the workflow?",
  },
};

const topologyNodes = [
  ["AI", "topologyNode ai"],
  ["Cloud", "topologyNode cloud"],
  ["Vendors", "topologyNode vendor"],
  ["Evidence", "topologyNode evidence"],
  ["Ownership", "topologyNode owner"],
  ["Data", "topologyNode data"],
  ["Policy", "topologyNode policy"],
  ["Executive", "topologyNode exec"],
];

function Header() {
  return (
    <header className="header">
      <a href="#top" className="brand" aria-label="Maximum Justice Cybersecurity home">
        <img src="/mjc-site/mjc-logo.png" alt="Maximum Justice Cybersecurity logo" />
        <div>
          <strong>Maximum Justice Cybersecurity</strong>
          <span>vCISO | Security SME | Cybersecurity SME</span>
        </div>
      </a>
      <nav>
        <a href="#visibility">Visibility Gap</a>
        <a href="#trustmap">TrustMap</a>
        <a href="#scenarios">Scenarios</a>
        <a href="#services">Services</a>
        <a href="#industries">Industries</a>
        <a className="navCta" href={CALENDLY_URL} target="_blank" rel="noreferrer">Book Briefing</a>
      </nav>
    </header>
  );
}

function HoverBadge({ label }) {
  return (
    <span className="hoverBadge">
      {label}
      <span className="hoverPanel">{hoverCopy[label]}</span>
    </span>
  );
}

function HeatCell({ label, value }) {
  const tone = value >= 82 ? "critical" : value >= 68 ? "watch" : "steady";
  return (
    <div className={`heatCell ${tone}`}>
      <span>{label}</span>
      <strong>{value}%</strong>
    </div>
  );
}

function Modal({ title, children, close }) {
  return (
    <div className="modalBackdrop" onClick={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modalClose" onClick={close}>×</button>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [state, setState] = useState("AI Decisions");
  const [scenario, setScenario] = useState("AI Procurement");
  const [industry, setIndustry] = useState("Federal Contractors");
  const [service, setService] = useState(null);
  const [activeNode, setActiveNode] = useState("TrustMap");
  const [activeOutput, setActiveOutput] = useState("Visibility Score");

  const visibility = visibilityStates[state];
  const activeScenario = scenarios[scenario];
  const activeIndustry = industries[industry];
  const nodeIntel = topologyIntel[activeNode] || topologyIntel.TrustMap;
  const outputIntel = trustMapOutputs[activeOutput];

  const nodeToState = (label) => {
    if (label === "Vendors") return "Vendor Risk";
    if (label === "Evidence") return "Audit Evidence";
    if (label === "Executive") return "Executive Reporting";
    return "AI Decisions";
  };

  return (
    <div className="site" id="top">
      <Header />

      <main>
        <section className="hero">
          <div className="container heroGrid">
            <div className="heroCopy">
              <span className="eyebrow">Executive operational visibility</span>
              <h1>Most organizations already operate beyond executive visibility.</h1>
              <p>
                CyberShield helps leadership identify hidden cyber, AI, vendor, governance, and decision exposure before fragmented visibility becomes business damage.
              </p>
              <div className="actions">
                <a className="primary" href={CYBERSHIELD_URL} target="_blank" rel="noreferrer">Generate Your TrustMap</a>
                <a className="secondary" href={CALENDLY_URL} target="_blank" rel="noreferrer">Schedule Executive Briefing</a>
              </div>
              <div className="badgeRow">
                <HoverBadge label="AI-assisted" />
                <HoverBadge label="Expert-validated" />
                <HoverBadge label="Executive-ready" />
                <HoverBadge label="Built for trust" />
              </div>
            </div>

            <aside className="topologyCard" aria-label="Operational visibility topology">
              <div className="cardTop">
                <div>
                  <span>Operational Topology</span>
                  <strong>Hover a signal to reveal meaning</strong>
                </div>
                <b>Responsive</b>
              </div>

              <div className={`topology ${activeNode !== "TrustMap" ? "is-hovering" : ""}`} onMouseLeave={() => setActiveNode("TrustMap")}>
                <div className="connector connector-ai" />
                <div className="connector connector-cloud" />
                <div className="connector connector-vendor" />
                <div className="connector connector-evidence" />
                <div className="connector connector-owner" />
                <div className="connector connector-data" />
                <div className="connector connector-policy" />
                <div className="connector connector-exec" />

                <div className={`topologyCenter ${activeNode !== "TrustMap" ? "expanded" : ""}`}>
                  {activeNode === "TrustMap" ? (
                    <span className="idleTrustMap">TrustMap</span>
                  ) : (
                    <>
                      <span>{nodeIntel.title}</span>
                      <p>{nodeIntel.text}</p>
                      <strong>{nodeIntel.consequence}</strong>
                    </>
                  )}
                </div>

                {topologyNodes.map(([label, className]) => (
                  <button
                    key={label}
                    className={className}
                    onMouseEnter={() => setActiveNode(label)}
                    onFocus={() => setActiveNode(label)}
                    onClick={() => setState(nodeToState(label))}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <p className="microcopy">
                Idle state centers TrustMap.  Hover brings TrustMap forward as the interpretation layer.
              </p>
            </aside>
          </div>
        </section>

        <section className="visibilityGap" id="visibility">
          <div className="container">
            <div className="sectionHead">
              <span className="eyebrow">The visibility gap</span>
              <h2>Without operational visibility, leadership sees activity.  Not consequence.</h2>
            </div>

            <div className="contrastGrid">
              <div className="contrastCard without">
                <span>Without visibility</span>
                <h3>{visibility.without}</h3>
                <p>{visibility.consequence}</p>
              </div>
              <div className="contrastCard with">
                <span>With CyberShield</span>
                <h3>{visibility.with}</h3>
                <p>TrustMap compresses fragmented signals into visibility, ownership, evidence, consequence, and next action.</p>
              </div>
            </div>

            <div className="stateButtons">
              {Object.keys(visibilityStates).map((key) => (
                <button key={key} onClick={() => setState(key)} className={state === key ? "active" : ""}>{key}</button>
              ))}
            </div>
          </div>
        </section>

        <section className="section soft" id="trustmap">
          <div className="container trustMapGrid">
            <div>
              <span className="eyebrow">TrustMap</span>
              <h2>They do not leave with a brochure.  They leave with a visibility artifact.</h2>
              <p>
                CyberShield generates the first pass.  Dr. Max Justice validates and sharpens the output so the final TrustMap is built for executive decisions, not marketing theater.
              </p>

              <div className="reportList">
                {Object.keys(trustMapOutputs).map((item) => (
                  <button
                    key={item}
                    className={activeOutput === item ? "active" : ""}
                    onClick={() => setActiveOutput(item)}
                    onMouseEnter={() => setActiveOutput(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="outputExplainer">
                <span>{outputIntel.title}</span>
                <p>{outputIntel.text}</p>
                <strong>{outputIntel.action}</strong>
              </div>
            </div>

            <div className="heatPanel">
              <div className="heatTitle">
                <span>TrustMap Heat Preview</span>
                <strong>{state}</strong>
              </div>
              <div className="heatGrid">
                <HeatCell label="Visibility" value={visibility.heat[0]} />
                <HeatCell label="Ownership" value={visibility.heat[1]} />
                <HeatCell label="Evidence" value={visibility.heat[2]} />
                <HeatCell label="Decision Clarity" value={visibility.heat[3]} />
              </div>
            </div>
          </div>
        </section>

        <section className="section scenarios" id="scenarios">
          <div className="container scenarioGrid">
            <div>
              <span className="eyebrow">Executive scenarios</span>
              <h2>Executives remember scenarios, not frameworks.</h2>
              <p>
                The site uses operational examples to create recognition.  Recognition is what makes the problem live rent-free.
              </p>
              <div className="scenarioButtons">
                {Object.keys(scenarios).map((key) => (
                  <button key={key} className={scenario === key ? "active" : ""} onClick={() => setScenario(key)}>{key}</button>
                ))}
              </div>
            </div>

            <div className="scenarioPanel">
              <span>Operational moment</span>
              <h3>{activeScenario.title}</h3>
              <p><strong>Setup:</strong> {activeScenario.setup}</p>
              <p><strong>Consequence:</strong> {activeScenario.consequence}</p>
              <p><strong>Question:</strong> {activeScenario.question}</p>
            </div>
          </div>
        </section>

        <section className="section soft doctrine">
          <div className="container doctrineGrid">
            <div>
              <span className="eyebrow">Human command doctrine</span>
              <h2>AI can inform decisions.  Leadership owns consequences.</h2>
              <p>
                The Marine Corps teaches composure under pressure.  MJC applies that same principle to cyber, AI, governance, and operational risk.
              </p>
              <div className="doctrineLines">
                <span>Authority remains human.</span>
                <span>Accountability remains human.</span>
                <span>Trust is measured through evidence, behavior, and consequence.</span>
              </div>
            </div>
            <div className="imagePanel">
              <img src="/mjc-site/max-justice-nasa-roof.png" alt="Dr. Max Justice thought leadership visual" />
            </div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="container">
            <div className="sectionHead">
              <span className="eyebrow">Services</span>
              <h2>Start with visibility.  Then decide what deserves attention.</h2>
              <p>Each service supports operational clarity, governance confidence, and executive decision-making under pressure.</p>
            </div>
            <div className="serviceGrid">
              {Object.keys(services).map((key) => (
                <button key={key} className="serviceCard" onClick={() => setService(key)}>
                  <span>{services[key].label}</span>
                  <h3>{key}</h3>
                  <p>{services[key].summary}</p>
                  <b>Open details →</b>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section soft" id="industries">
          <div className="container industryGrid">
            <div>
              <span className="eyebrow">Priority markets</span>
              <h2>Different industries fail in different ways.</h2>
              <p>TrustMap adapts the visibility problem to the executive reality of each market.</p>
              <div className="industryButtons">
                {Object.keys(industries).map((key) => (
                  <button key={key} className={industry === key ? "active" : ""} onClick={() => setIndustry(key)}>{key}</button>
                ))}
              </div>
            </div>

            <div className="industryPanel">
              <span>{activeIndustry.tension}</span>
              <h3>{industry}</h3>
              <p><strong>Pressure:</strong> {activeIndustry.pressure}</p>
              <p><strong>Executive question:</strong> {activeIndustry.question}</p>
            </div>
          </div>
        </section>

        <section className="section callout">
          <div className="container calloutGrid">
            <div>
              <span className="eyebrow">Separate tool. Clear purpose.</span>
              <h2>CyberShield is where the TrustMap begins.</h2>
              <p>
                The MJC website creates the executive realization.  CyberShield runs the first-pass TrustMap.  MJC provides the expert interpretation layer.
              </p>
            </div>
            <a className="primary" href={CYBERSHIELD_URL} target="_blank" rel="noreferrer">Launch CyberShield</a>
          </div>
        </section>

        <section className="finalCta">
          <div className="container finalInner">
            <span className="eyebrow">Start here</span>
            <h2>Generate your TrustMap before a blind spot becomes the incident.</h2>
            <p>CyberShield creates the first pass.  Dr. Max Justice validates and sharpens the executive report.</p>
            <div className="actions center">
              <a className="primary" href={CYBERSHIELD_URL} target="_blank" rel="noreferrer">Generate Your TrustMap</a>
              <a className="secondary" href={CALENDLY_URL} target="_blank" rel="noreferrer">Book Executive Briefing</a>
            </div>
            <div className="emailLine">{CONTACT_EMAIL}</div>
          </div>
        </section>
      </main>

      {service && (
        <Modal title={services[service].title || service} close={() => setService(null)}>
          <p>{services[service].summary}</p>

          <h4>What you receive</h4>
          <div className="modalChips">
            {services[service].receives.map((item) => <span key={item}>{item}</span>)}
          </div>

          <h4>What it covers</h4>
          <ul>
            {services[service].bullets.map((item) => <li key={item}>{item}</li>)}
          </ul>

          {service === "TrustMap Briefing" && (
            <a className="primary small" href={CYBERSHIELD_URL} target="_blank" rel="noreferrer">Generate Your TrustMap</a>
          )}
          <a className="secondary small" href={CALENDLY_URL} target="_blank" rel="noreferrer">Discuss this service</a>
        </Modal>
      )}
    </div>
  );
}
