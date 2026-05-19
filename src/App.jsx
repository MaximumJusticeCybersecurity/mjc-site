import React, { useState } from "react";
import "./styles.css";

const CYBERSHIELD_URL = "https://maximumjusticecybersecurity.github.io/CyberShield/";
const CONTACT_EMAIL = "max@maximumjusticecybersecurity.com";
const BRIEFING_MAILTO =
  "mailto:max@maximumjusticecybersecurity.com?subject=Executive%20Cyber%20%26%20AI%20Operational%20Readiness%20Briefing";

const services = [
  ["Primary Offer", "Executive Cyber & AI Operational Readiness Briefing", "A focused executive session that maps cyber risk, AI governance exposure, ownership gaps, and immediate operational priorities.", true],
  ["vCISO", "Fractional vCISO Advisory", "Executive security leadership for organizations that need accountability, strategy, and board-ready cyber governance without full-time overhead."],
  ["AI Governance", "Human-Command AI Governance", "Policy, authority, oversight, and operational controls for AI adoption where humans remain accountable for consequential decisions."],
  ["GRC", "Audit Readiness & Evidence Discipline", "CMMC, NIST, HIPAA, vendor risk, evidence readiness, control ownership, and defensible governance workflows."],
  ["Architecture", "Zero Trust & Security Architecture", "Identity, access, segmentation, control design, operational resilience, and pragmatic modernization for real-world environments."],
  ["Preparedness", "Incident Response & Executive Tabletop Readiness", "Prepare leadership teams to make clear decisions under pressure before ransomware, vendor failure, or AI misuse creates damage."],
];

const industries = ["Federal Contractors", "Healthcare", "Manufacturing", "Financial Services", "Legal & Professional Services"];

function CTAButtons({ center = false }) {
  return (
    <div className={`cta-row ${center ? "center" : ""}`}>
      <a className="btn btn-primary" href={BRIEFING_MAILTO}>Schedule Executive Briefing</a>
      <a className="btn btn-secondary" href={CYBERSHIELD_URL} target="_blank" rel="noreferrer">Launch CyberShield</a>
    </div>
  );
}

function Badge({ children }) { return <span className="badge">{children}</span>; }

export default function App() {
  const [signal, setSignal] = useState("AI governance drift");
  const exposures = ["AI governance drift", "Vendor exposure", "Audit evidence gaps", "Executive blind spots"];

  return (
    <div className="site-shell">
      <header className="topbar">
        <a href="#top" className="brand">
          <div className="brand-orb">MJC</div>
          <div><strong>Maximum Justice Cybersecurity</strong><span>vCISO | AI Governance | Operational Trust</span></div>
        </a>
        <nav className="nav">
          <a href="#authority">Authority</a><a href="#services">Services</a><a href="#trust">Trust</a><a href="#industries">Industries</a><a href="#tool">CyberShield</a><a href={BRIEFING_MAILTO} className="nav-button">Briefing</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="mesh mesh-one" /><div className="mesh mesh-two" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="status-pill"><span className="pulse" />MJC Website V4 | Operational trust surface</div>
              <h1>The internet is shifting from <em>attention</em> to <em>interpretation.</em></h1>
              <p className="hero-sub">AI systems are already evaluating organizations, shaping decisions, and influencing operations. Maximum Justice Cybersecurity helps leaders make cyber and AI risk visible, governed, and defensible before trust breaks under pressure.</p>
              <CTAButtons />
              <div className="badge-row"><Badge>U.S. Veteran</Badge><Badge>vCISO</Badge><Badge>Security SME</Badge><Badge>Cybersecurity SME</Badge><Badge>AI Governance</Badge></div>
            </div>

            <aside className="hero-console">
              <div className="console-top"><div><span className="kicker">Executive Interpretation Layer</span><h2>What AI sees before humans call</h2></div><div className="live-chip">LIVE</div></div>
              <div className="agent-orbit">
                <div className="core">MJC</div>
                <span className="orbit orbit-a">Evidence</span><span className="orbit orbit-b">Authority</span><span className="orbit orbit-c">Governance</span><span className="orbit orbit-d">Trust</span>
              </div>
              <div className="signal-grid">
                <div className="signal-card"><span>Human authority</span><strong className="good-text">Explicit</strong><i className="good" /></div>
                <div className="signal-card"><span>AI governance</span><strong className="warn-text">Emerging</strong><i className="warn" /></div>
                <div className="signal-card"><span>Machine readability</span><strong className="good-text">Structured</strong><i className="good" /></div>
                <div className="signal-card"><span>Runtime evidence</span><strong className="warn-text">Developing</strong><i className="warn" /></div>
              </div>
            </aside>
          </div>
        </section>

        <section className="ticker"><div><span>Authority remains human</span><span>Accountability remains human</span><span>Trust requires evidence</span><span>Cyber risk is operational risk</span><span>AI governance is no longer optional</span><span>Authority remains human</span><span>Accountability remains human</span><span>Trust requires evidence</span></div></section>

        <section id="authority" className="section split-section">
          <div className="container split-grid">
            <div><span className="kicker">Why MJC Exists</span><h2>Executives are being asked to approve risk they cannot clearly see.</h2><p>Security tools produce activity. Compliance programs produce artifacts. MSPs produce tickets. None of that automatically gives leadership a defensible operating picture of cyber risk, AI usage, vendor exposure, and accountability.</p></div>
            <div className="stacked-proof">{[["Cyber","Who owns risk under pressure?"],["AI","Who governs decisions before execution?"],["Vendors","Which dependencies can disrupt operations?"],["Evidence","Can trust be verified after the fact?"]].map(([a,b])=><div className="proof-row" key={a}><span>{a}</span><strong>{b}</strong></div>)}</div>
          </div>
        </section>

        <section className="section interpretation-section">
          <div className="container">
            <div className="section-heading"><span className="kicker">The Interpretation Economy</span><h2>AI agents will not read your brand the way humans do.</h2><p>They will parse structure, evidence, signals, schemas, assertions, relationships, and credibility markers. MJC V4 is built to speak to both executive buyers and machine interpretation systems.</p></div>
            <div className="trust-table">
              <div className="trust-column"><h3>Human Trust</h3>{["Brand","Narrative","Emotion","Reputation","Messaging"].map(x=><div key={x}>{x}</div>)}</div>
              <div className="bridge-column"><span /><span /><span /></div>
              <div className="trust-column machine"><h3>Machine Trust</h3>{["Evidence","Telemetry","Verification","Authorization","Structured Truth"].map(x=><div key={x}>{x}</div>)}</div>
            </div>
          </div>
        </section>

        <section id="trust" className="section dark-card-section">
          <div className="container">
            <div className="section-heading"><span className="kicker">Operational Trust Architecture</span><h2>Trust is not a slogan. It is a control surface.</h2><p>MJC helps organizations move from unverifiable confidence to evidence-backed governance that can be explained to executives, auditors, boards, and AI systems.</p></div>
            <div className="runtime-flow">{["AI request","Trust evaluation","Operational admissibility","Human gate","Authorized action"].map((x,i)=><div className="flow-node" style={{"--delay":`${i*120}ms`}} key={x}><span>{String(i+1).padStart(2,"0")}</span><strong>{x}</strong></div>)}</div>
            <div className="scenario-panel">
              <div><span className="kicker">Select an exposure</span><h3>{signal}</h3><p>V4 creates a sharper executive recognition moment by showing where governance, evidence, authorization, and operational accountability can break before the incident becomes visible.</p></div>
              <div className="scenario-buttons">{exposures.map(x=><button className={signal===x?"active":""} onClick={()=>setSignal(x)} key={x}>{x}</button>)}</div>
            </div>
          </div>
        </section>

        <section id="services" className="section services-section">
          <div className="container">
            <div className="section-heading"><span className="kicker">Services</span><h2>Executive cyber leadership for organizations entering the agentic economy.</h2><p>Services are not presented as a commodity menu. They are the human advisory layer behind operational trust, AI governance, and cyber resilience.</p></div>
            <div className="service-bento">{services.map(([eyebrow,title,text,feature])=><article className={`service-card ${feature?"feature":""}`} key={title}><span className="mini-eyebrow">{eyebrow}</span><h3>{title}</h3><p>{text}</p>{feature&&<a href={BRIEFING_MAILTO} className="inline-link">Request the briefing</a>}</article>)}</div>
          </div>
        </section>

        <section id="industries" className="section industries-section">
          <div className="container"><div className="section-heading"><span className="kicker">Priority Markets</span><h2>Focused where trust failure becomes business damage.</h2></div><div className="industry-track">{industries.map(x=><article className="industry-card" key={x}><span>{x}</span><p>Governance visibility, operational resilience, audit readiness, vendor risk, and AI accountability.</p></article>)}</div></div>
        </section>

        <section className="section machine-section">
          <div className="container machine-grid">
            <div><span className="kicker">AI-Readable Authority Surface</span><h2>Your website should not only persuade humans. It should be interpretable by machines.</h2><p>V4 includes structured metadata, JSON-LD, an llms.txt file, semantic sections, retrieval-friendly copy, and explicit trust assertions so search engines and AI systems can understand what MJC is, what it does, and why it is credible.</p></div>
            <pre className="json-card">{JSON.stringify({organization:"Maximum Justice Cybersecurity",authority:["vCISO","Security SME","Cybersecurity SME"],trustAssertions:["Human command authority remains accountable","Cyber and AI risk must be operationally visible","Trust requires evidence, not narrative alone"],featuredTool:"CyberShield"},null,2)}</pre>
          </div>
        </section>

        <section id="tool" className="section tool-section">
          <div className="container tool-shell">
            <div><span className="kicker">Featured Tool</span><h2>CyberShield stays separate. It launches when the visitor is ready.</h2><p>The MJC website establishes authority and demand. CyberShield remains its own operational environment and should not be embedded or diluted into the homepage.</p><CTAButtons /></div>
            <div className="tool-card"><div className="tool-status"><span>CyberShield</span><strong>External Tool</strong></div><h3>Operational Trust Infrastructure</h3><p>Launches at the existing CyberShield GitHub Pages environment. No redesign. No forced merge. No platform confusion.</p><a href={CYBERSHIELD_URL} target="_blank" rel="noreferrer" className="inline-link">Open CyberShield</a></div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container about-grid">
            <div><span className="kicker">Human Trust Layer</span><h2>Dr. Max Justice is the authority layer behind the system.</h2><p>Dr. Max Justice is a vCISO, Security SME, Cybersecurity SME, U.S. veteran, CISSP, PMP, and creator of The CHN vCISO GPT powered by Cyber Shield. His work centers on cyber governance, AI accountability, operational resilience, and executive decision clarity.</p></div>
            <div className="credential-matrix">{["vCISO","Security SME","Cybersecurity SME","U.S. Veteran","CISSP","PMP","AI Governance","Zero Trust","Federal Contracting"].map(x=><span key={x}>{x}</span>)}</div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-inner"><span className="kicker">Start Here</span><h2>Find out where cyber and AI risk may already be outpacing operational visibility.</h2><p>Schedule an Executive Cyber & AI Operational Readiness Briefing with Dr. Max Justice.</p><CTAButtons center /><div className="email-line">{CONTACT_EMAIL}</div></div>
        </section>
      </main>
    </div>
  );
}
