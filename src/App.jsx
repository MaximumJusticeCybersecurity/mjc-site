import React, { useState } from "react";
import "./styles.css";

const CYBERSHIELD_URL = "https://maximumjusticecybersecurity.github.io/CyberShield/";
const CONTACT_EMAIL = "max@maximumjusticecybersecurity.com";
const CALENDLY_URL = "https://calendly.com/maxjustice";

const serviceDetails = {
  "Executive Readiness Briefing": {
    headline: "A focused executive session that turns uncertainty into a priority map.",
    bullets: [
      "Identify cyber, AI, vendor, and governance blind spots",
      "Clarify who owns risk before pressure hits",
      "Translate technical exposure into business consequence",
      "Leave with 3 to 5 prioritized next actions"
    ],
    outcome: "Best first step for CEOs, owners, and boards that need clarity before committing to a larger engagement."
  },
  "Fractional vCISO": {
    headline: "Security leadership without full-time executive overhead.",
    bullets: [
      "Security strategy and executive reporting",
      "Policy, control ownership, and governance cadence",
      "Vendor and MSP oversight",
      "Board, audit, and leadership communication"
    ],
    outcome: "Best for organizations that need experienced cyber leadership but are not ready to hire a full-time CISO."
  },
  "AI Governance": {
    headline: "Keep human authority intact as AI enters operations.",
    bullets: [
      "AI use policy and decision authority",
      "Risk classification for AI-assisted workflows",
      "Human approval and accountability checkpoints",
      "Evidence and defensibility expectations"
    ],
    outcome: "Best for organizations using AI faster than they have defined ownership, oversight, or acceptable use."
  },
  "GRC & Audit Readiness": {
    headline: "Make evidence, ownership, and control maturity easier to defend.",
    bullets: [
      "CMMC, NIST, HIPAA, and control mapping support",
      "Evidence discipline and audit readiness reviews",
      "Risk register and remediation prioritization",
      "Executive-ready compliance reporting"
    ],
    outcome: "Best for regulated organizations, federal contractors, healthcare, and firms facing customer or audit scrutiny."
  },
  "Zero Trust Architecture": {
    headline: "Practical security architecture that reduces exposure without theater.",
    bullets: [
      "Identity, access, segmentation, and privilege review",
      "Cloud and Microsoft ecosystem governance",
      "Control design and implementation roadmap",
      "Operationally realistic modernization guidance"
    ],
    outcome: "Best for organizations that need modern security architecture tied to business operations."
  },
  "Incident Preparedness": {
    headline: "The worst time to build the plan is during the incident.",
    bullets: [
      "Executive tabletop exercises",
      "Escalation and decision authority mapping",
      "Ransomware and vendor disruption scenarios",
      "Communications and continuity readiness"
    ],
    outcome: "Best for leadership teams that want fewer surprises when pressure hits."
  }
};

const industryDetails = {
  "Federal Contractors": {
    pain: "Contract eligibility, CMMC pressure, NIST 800-171, DFARS flow-downs, supply-chain exposure, and audit defensibility.",
    offer: "MJC helps federal contractors turn compliance evidence into executive-ready governance and risk visibility.",
    trigger: "If a customer asked for proof tomorrow, could you defend ownership, evidence, and remediation status?"
  },
  Healthcare: {
    pain: "HIPAA, ransomware disruption, patient data exposure, third-party platforms, business continuity, and clinical workflow risk.",
    offer: "MJC helps healthcare leaders connect cyber governance, vendor risk, privacy obligations, and operational continuity.",
    trigger: "If ransomware hit a critical vendor, who owns the operating decision in the first hour?"
  },
  Manufacturing: {
    pain: "Plant downtime, OT and IT exposure, vendor dependencies, supply-chain disruption, ransomware, and production continuity.",
    offer: "MJC helps manufacturers map cyber risk to operational disruption and prioritize resilience actions.",
    trigger: "Which systems, vendors, or identities can stop production if they fail?"
  },
  "Financial Services": {
    pain: "Trust, regulatory pressure, fraud exposure, vendor risk, cyber maturity, customer confidence, and AI-assisted decision risk.",
    offer: "MJC helps financial leaders create clearer operational visibility around cyber, vendor, and AI governance risk.",
    trigger: "Would your current reporting give leadership enough clarity before trust damage spreads?"
  },
  "Legal & Professional Services": {
    pain: "Client confidentiality, privileged data, AI document handling, vendor tools, reputation risk, and client trust.",
    offer: "MJC helps firms protect trust while adopting AI and modern technology responsibly.",
    trigger: "Can you explain where client-sensitive data goes when AI tools enter the workflow?"
  }
};

const exposureDetails = {
  "AI governance drift": {
    consequence: "AI use expands through teams before leadership defines policy, oversight, approval authority, or evidence expectations.",
    signal: "Unclear acceptable-use rules, inconsistent tool adoption, and no owner for AI-assisted decisions.",
    action: "Create an AI use inventory, assign ownership, and define human approval checkpoints."
  },
  "Vendor exposure": {
    consequence: "A third party becomes the hidden failure point for operations, data, service delivery, or customer trust.",
    signal: "Critical vendors are known, but business consequence, access level, and continuity plans are not mapped.",
    action: "Rank vendors by operational consequence and require evidence of control maturity."
  },
  "Audit evidence gaps": {
    consequence: "The organization believes it has controls, but cannot produce defensible evidence fast enough under scrutiny.",
    signal: "Policies exist, but owners, artifacts, dates, and remediation status are scattered.",
    action: "Build an evidence map tied to control owners, review cadence, and executive risk status."
  },
  "Executive blind spots": {
    consequence: "Leadership sees cyber activity, but not operational consequence, risk ownership, or decision priority.",
    signal: "Reports show tickets and alerts, but not what can disrupt revenue, trust, compliance, or continuity.",
    action: "Convert technical reporting into executive decision intelligence."
  }
};

const trustSteps = [
  {
    title: "AI Request",
    plain: "An AI-enabled tool, employee, vendor, or workflow attempts to influence an operational decision.",
    example: "A finance team uses AI to evaluate vendor payment risk."
  },
  {
    title: "Trust Evaluation",
    plain: "The organization checks whether the request has enough context, evidence, policy fit, and business justification.",
    example: "Who is requesting it, what data is used, and what decision could it affect?"
  },
  {
    title: "Policy Check",
    plain: "The action is compared against security, privacy, compliance, and business rules.",
    example: "Does this violate customer data handling, HIPAA, CMMC, or internal policy?"
  },
  {
    title: "Human Approval",
    plain: "A human owner remains accountable before the action becomes consequential.",
    example: "AI can recommend. Leadership owns the decision."
  },
  {
    title: "Defensible Record",
    plain: "The decision, evidence, owner, and rationale can be reviewed after the fact.",
    example: "If auditors, customers, boards, or courts ask what happened, the record survives scrutiny."
  }
];

function Header() {
  return (
    <header className="header">
      <a className="brand" href="#top">
        <img src="/mjc-site/mjc-logo.png" alt="Maximum Justice Cybersecurity logo" />
        <div>
          <strong>Maximum Justice Cybersecurity</strong>
          <span>vCISO | Security SME | Cybersecurity SME</span>
        </div>
      </a>
      <nav>
        <a href="#services">Services</a>
        <a href="#industries">Industries</a>
        <a href="#trust">Trust Flow</a>
        <a href="#tool">CyberShield</a>
        <a className="navCta" href={CALENDLY_URL} target="_blank" rel="noreferrer">Book Briefing</a>
      </nav>
    </header>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="modalBackdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modalClose" onClick={onClose}>×</button>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
}

function PrimaryActions() {
  return (
    <div className="actions">
      <a className="primary" href={CALENDLY_URL} target="_blank" rel="noreferrer">Schedule Executive Briefing</a>
      <a className="secondary" href={CYBERSHIELD_URL} target="_blank" rel="noreferrer">Launch CyberShield</a>
    </div>
  );
}

export default function App() {
  const [service, setService] = useState(null);
  const [industry, setIndustry] = useState("Federal Contractors");
  const [exposure, setExposure] = useState("AI governance drift");
  const [trustStep, setTrustStep] = useState(trustSteps[0]);

  return (
    <div className="site" id="top">
      <Header />

      <main>
        <section className="hero">
          <div className="container heroGrid">
            <div className="heroCopy">
              <div className="eyebrow">Executive cyber leadership for the AI era</div>
              <h1>Cyber and AI risk are moving faster than executive visibility.</h1>
              <p>
                MJC helps owners, CEOs, and leadership teams see what can break, who owns the risk,
                and what needs to happen next.
              </p>
              <PrimaryActions />
              <div className="proofBadges">
                <span>U.S. Veteran</span>
                <span>CISSP</span>
                <span>PMP</span>
                <span>AI Governance</span>
                <span>Zero Trust</span>
              </div>
            </div>

            <aside className="riskPanel">
              <div className="panelTop">
                <div>
                  <span>Executive Reality Screen</span>
                  <strong>What leadership needs to see</strong>
                </div>
                <b>Interactive</b>
              </div>
              <button onClick={() => setExposure("AI governance drift")}>AI use without ownership</button>
              <button onClick={() => setExposure("Vendor exposure")}>Critical vendors that can disrupt operations</button>
              <button onClick={() => setExposure("Audit evidence gaps")}>Controls that cannot be defended quickly</button>
              <button onClick={() => setExposure("Executive blind spots")}>Reports that do not support decisions</button>
              <div className="panelResult">
                <span>{exposure}</span>
                <p><strong>Consequence:</strong> {exposureDetails[exposure].consequence}</p>
                <p><strong>Signal:</strong> {exposureDetails[exposure].signal}</p>
                <p><strong>Action:</strong> {exposureDetails[exposure].action}</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="plainBand">
          <div className="container bandGrid">
            <div>
              <span className="kicker">Why MJC exists</span>
              <h2>Executives are asked to approve risk they cannot clearly see.</h2>
            </div>
            <p>
              Security tools show activity. Compliance programs create artifacts. MSPs close tickets.
              Leadership still needs a clear operating picture of ownership, exposure, and consequence.
            </p>
          </div>
        </section>

        <section className="section soft commandSection">
          <div className="container commandGrid">
            <div>
              <span className="kicker">Human command doctrine</span>
              <h2>AI does not own accountability. Leadership does.</h2>
              <p>
                AI can inform decisions, accelerate analysis, and expose patterns. It does not take
                responsibility when the decision fails. MJC helps preserve human command authority as AI enters operations.
              </p>
              <div className="doctrineLines">
                <span>Authority remains human.</span>
                <span>Accountability remains human.</span>
                <span>AI informs decisions. Leadership owns consequences.</span>
              </div>
            </div>
            <div className="photoCard">
              <img src="/mjc-site/max-justice-nasa-roof.png" alt="Dr. Max Justice thought leadership visual" />
            </div>
          </div>
        </section>

        <section id="trust" className="section">
          <div className="container">
            <div className="sectionHead">
              <span className="kicker">Operational trust flow</span>
              <h2>Every step explains what it means.</h2>
              <p>Click each step. No decorative bubbles. Every interaction tells the visitor something useful.</p>
            </div>
            <div className="trustFlow">
              {trustSteps.map((step, idx) => (
                <button
                  key={step.title}
                  className={trustStep.title === step.title ? "selected" : ""}
                  onClick={() => setTrustStep(step)}
                >
                  <span>{String(idx + 1).padStart(2, "0")}</span>
                  {step.title}
                </button>
              ))}
            </div>
            <div className="trustExplainer">
              <h3>{trustStep.title}</h3>
              <p>{trustStep.plain}</p>
              <strong>Example: {trustStep.example}</strong>
            </div>
          </div>
        </section>

        <section className="section soft" id="services">
          <div className="container">
            <div className="sectionHead">
              <span className="kicker">Services</span>
              <h2>Click a service. Get the actual offer.</h2>
              <p>Each card opens a clearer explanation, not a dead tile.</p>
            </div>
            <div className="serviceGrid">
              {Object.keys(serviceDetails).map((name) => (
                <button className="serviceCard" key={name} onClick={() => setService(name)}>
                  <span>{name === "Executive Readiness Briefing" ? "Primary Offer" : "Service"}</span>
                  <h3>{name}</h3>
                  <p>{serviceDetails[name].headline}</p>
                  <b>Open details →</b>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="industries">
          <div className="container industryLayout">
            <div>
              <span className="kicker">Priority markets</span>
              <h2>Each market has different pressure. The website should show that.</h2>
              <div className="industryButtons">
                {Object.keys(industryDetails).map((name) => (
                  <button
                    key={name}
                    className={industry === name ? "active" : ""}
                    onClick={() => setIndustry(name)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
            <div className="industryDetail">
              <h3>{industry}</h3>
              <p><strong>Pain:</strong> {industryDetails[industry].pain}</p>
              <p><strong>MJC angle:</strong> {industryDetails[industry].offer}</p>
              <p><strong>Executive trigger:</strong> {industryDetails[industry].trigger}</p>
            </div>
          </div>
        </section>

        <section className="section soft" id="tool">
          <div className="container toolBox">
            <div>
              <span className="kicker">Featured tool</span>
              <h2>CyberShield stays separate.</h2>
              <p>
                This website establishes authority and demand. CyberShield remains the separate tool visitors can launch when they want to explore the operational environment.
              </p>
            </div>
            <a className="primary" href={CYBERSHIELD_URL} target="_blank" rel="noreferrer">Launch CyberShield</a>
          </div>
        </section>

        <section className="finalCta">
          <div className="container">
            <span className="kicker">Start here</span>
            <h2>Find out where cyber and AI risk may already be outpacing visibility.</h2>
            <p>Schedule an Executive Cyber & AI Operational Readiness Briefing with Dr. Max Justice.</p>
            <a className="primary" href={CALENDLY_URL} target="_blank" rel="noreferrer">Book on Calendly</a>
            <div className="email">{CONTACT_EMAIL}</div>
          </div>
        </section>
      </main>

      {service && (
        <Modal title={service} onClose={() => setService(null)}>
          <p>{serviceDetails[service].headline}</p>
          <ul>
            {serviceDetails[service].bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
          <p><strong>Outcome:</strong> {serviceDetails[service].outcome}</p>
          <a className="primary small" href={CALENDLY_URL} target="_blank" rel="noreferrer">Book briefing</a>
        </Modal>
      )}
    </div>
  );
}
