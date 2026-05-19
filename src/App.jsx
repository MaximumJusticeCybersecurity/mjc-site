import React from "react";
import "./styles.css";

const CYBERSHIELD_URL = "https://maximumjusticecybersecurity.github.io/CyberShield/";
const CONTACT_EMAIL = "max@maximumjusticecybersecurity.com";
const BRIEFING_MAILTO =
  "mailto:max@maximumjusticecybersecurity.com?subject=Executive%20Cyber%20%26%20AI%20Operational%20Readiness%20Briefing";

function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

function RiskBar({ title, value, status, className }) {
  return (
    <div className="risk-bar">
      <div className="risk-bar__top">
        <span>{title}</span>
        <strong>{status}</strong>
      </div>
      <div className="risk-bar__track">
        <div className={`risk-bar__fill ${className}`} style={{ width: value }} />
      </div>
    </div>
  );
}

function ProblemCard({ title, text }) {
  return (
    <article className="lift-card">
      <div className="card-icon" />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function ServiceCard({ title }) {
  return (
    <article className="service-card">
      <div className="card-icon" />
      <h3>{title}</h3>
      <p>
        Practical executive-focused cybersecurity and governance leadership designed to reduce
        uncertainty and improve operational resilience.
      </p>
    </article>
  );
}

export default function App() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="Maximum Justice Cybersecurity home">
            <div className="brand-mark">MJC</div>
            <div>
              <strong>Maximum Justice Cybersecurity</strong>
              <span>vCISO | Security SME | Cybersecurity SME</span>
            </div>
          </a>

          <nav className="nav" aria-label="Primary navigation">
            <a href="#services">Services</a>
            <a href="#industries">Industries</a>
            <a href="#about">About</a>
            <a href="#tools">CyberShield</a>
            <a className="nav-cta" href={BRIEFING_MAILTO}>
              Schedule Briefing
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-bg hero-bg-a" />
          <div className="hero-bg hero-bg-b" />

          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="pill">Executive Operational Control for Cyber & AI Risk</div>

              <h1>Leadership cannot govern what it cannot clearly see.</h1>

              <p className="hero-sub">
                Maximum Justice Cybersecurity helps executives regain operational visibility, AI
                governance clarity, and accountable cyber leadership before fragmented decisions
                become business disruption.
              </p>

              <div className="cta-row">
                <a className="btn btn-primary" href={BRIEFING_MAILTO}>
                  Schedule Executive Briefing
                </a>
                <a className="btn btn-secondary" href={CYBERSHIELD_URL} target="_blank" rel="noreferrer">
                  Launch CyberShield
                </a>
              </div>

              <div className="badge-row">
                <Badge>U.S. Veteran</Badge>
                <Badge>CISSP</Badge>
                <Badge>PMP</Badge>
                <Badge>AI Governance</Badge>
                <Badge>Zero Trust</Badge>
              </div>
            </div>

            <aside className="snapshot-card" aria-label="Executive risk snapshot preview">
              <div className="snapshot-top">
                <div>
                  <span className="section-kicker">Executive Snapshot</span>
                  <h2>Operational Risk Visibility</h2>
                </div>

                <div className="score-ring">
                  <strong>68</strong>
                  <span>/100</span>
                </div>
              </div>

              <div className="risk-bars">
                <RiskBar title="AI Governance Visibility" status="Limited" value="42%" className="red" />
                <RiskBar title="Executive Reporting Clarity" status="Fragmented" value="56%" className="yellow" />
                <RiskBar title="Vendor Coordination" status="Moderate" value="63%" className="yellow" />
                <RiskBar title="Audit Readiness" status="Developing" value="74%" className="green" />
              </div>

              <div className="reality-box">
                <span>Executive Reality</span>
                <p>
                  Most organizations already operate with fragmented cyber and AI governance. The
                  problem is not tooling. The problem is visibility, ownership, and operational
                  accountability.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="section border-top">
          <div className="container">
            <div className="section-intro">
              <span className="section-kicker">The Leadership Problem</span>
              <h2>
                Most organizations do not need more cybersecurity noise.{" "}
                <em>They need operational control.</em>
              </h2>
              <p>
                Security tools, MSP dashboards, compliance reports, AI experimentation, and vendor
                ecosystems are expanding faster than executive visibility. MJC helps leadership regain
                clarity before fragmented decisions become operational damage.
              </p>
            </div>

            <div className="problem-grid">
              <ProblemCard
                title="Fragmented Ownership"
                text="Cyber, compliance, AI, vendors, and operations often operate without a unified command structure."
              />
              <ProblemCard
                title="AI Without Governance"
                text="Employees adopt AI tools faster than accountability and defensible oversight mature."
              />
              <ProblemCard
                title="Executive Blind Spots"
                text="Leadership is increasingly asked to approve risk without operationally useful visibility."
              />
              <ProblemCard
                title="Audit Exposure"
                text="Evidence may exist, but governance discipline and operational readiness often do not."
              />
            </div>
          </div>
        </section>

        <section id="services" className="section border-top subtle">
          <div className="container">
            <div className="section-intro wide">
              <span className="section-kicker">Services</span>
              <h2>Executive cyber leadership that translates risk into action.</h2>
              <p>
                MJC is built for executives, owners, boards, and operational leaders who need clear
                decisions, accountable governance, and resilient cyber operations.
              </p>
            </div>

            <div className="services-grid">
              <article className="primary-service">
                <div className="pill">Primary Offer</div>
                <h3>Executive Cyber & AI Operational Readiness Briefing</h3>
                <p>
                  A focused executive session designed to evaluate cyber readiness, AI governance
                  maturity, operational visibility, accountability gaps, and resilience priorities.
                </p>

                <div className="check-list">
                  {[
                    "Operational readiness review",
                    "AI governance exposure analysis",
                    "Executive risk visibility assessment",
                    "Governance accountability mapping",
                    "Prioritized operational roadmap",
                  ].map((item) => (
                    <div key={item}>
                      <span />
                      {item}
                    </div>
                  ))}
                </div>

                <a className="btn btn-primary" href={BRIEFING_MAILTO}>
                  Request Executive Briefing
                </a>
              </article>

              <ServiceCard title="Fractional vCISO Advisory" />
              <ServiceCard title="AI Governance Advisory" />
              <ServiceCard title="GRC & Audit Readiness" />
              <ServiceCard title="Zero Trust Architecture" />
              <ServiceCard title="Incident Response Preparedness" />
              <ServiceCard title="Operational Risk Leadership" />
            </div>
          </div>
        </section>

        <section id="tools" className="section border-top">
          <div className="container">
            <div className="tool-panel">
              <div className="orb" />
              <div className="tool-grid">
                <div>
                  <span className="section-kicker">Featured Tool</span>
                  <h2>CyberShield remains its own operational environment.</h2>
                  <p>
                    CyberShield is not the MJC website. It is one operational tool inside the MJC
                    toolbox. Launch it separately exactly as built.
                  </p>

                  <div className="cta-row">
                    <a className="btn btn-primary" href={CYBERSHIELD_URL} target="_blank" rel="noreferrer">
                      Launch CyberShield
                    </a>
                    <a className="btn btn-secondary" href={`mailto:${CONTACT_EMAIL}`}>
                      Contact Max
                    </a>
                  </div>
                </div>

                <div className="cybershield-card">
                  <div className="cyber-top">
                    <div>
                      <span className="section-kicker">CyberShield</span>
                      <h3>Operational Trust Infrastructure</h3>
                    </div>
                    <strong>LIVE</strong>
                  </div>

                  <div className="feature-list">
                    {[
                      "Executive operational readiness",
                      "AI governance visibility",
                      "Operational trust mapping",
                      "Governance coordination",
                      "Executive reporting clarity",
                      "Operational decision support",
                    ].map((feature) => (
                      <div key={feature}>
                        <span>{feature}</span>
                        <i />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="industries" className="section border-top subtle">
          <div className="container">
            <div className="section-intro">
              <span className="section-kicker">Priority Markets</span>
              <h2>Focused where operational failure becomes business damage.</h2>
            </div>

            <div className="industry-grid">
              {[
                "Federal Contractors",
                "Healthcare",
                "Manufacturing",
                "Financial Services",
                "Legal & Professional Services",
              ].map((industry) => (
                <article className="lift-card" key={industry}>
                  <div className="card-icon" />
                  <h3>{industry}</h3>
                  <p>
                    Governance, operational resilience, accountability, audit readiness, and executive
                    visibility.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section border-top">
          <div className="container about-grid">
            <div>
              <span className="section-kicker">About Dr. Max Justice</span>
              <h2>Veteran-led executive cyber leadership built for operational reality.</h2>
              <p>
                Dr. Max Justice is a vCISO, Security SME, Cybersecurity SME, U.S. veteran, CISSP,
                PMP, and creator of The CHN vCISO GPT powered by Cyber Shield.
              </p>
              <p>
                His work focuses on operational governance, executive visibility, AI accountability,
                Zero Trust strategy, resilience planning, and translating cyber complexity into
                leadership decisions.
              </p>

              <div className="badge-row">
                <Badge>NASA CIO Award</Badge>
                <Badge>NGA Leadership Award</Badge>
                <Badge>Federal Contracting</Badge>
                <Badge>AI Governance</Badge>
                <Badge>Operational Resilience</Badge>
                <Badge>Zero Trust</Badge>
              </div>
            </div>

            <div className="philosophy-card">
              <span className="section-kicker">Core Philosophy</span>
              {[
                "Authority remains human.",
                "Accountability remains human.",
                "AI informs decisions. Leadership owns consequences.",
                "Cybersecurity failures are often operational failures.",
                "Visibility matters more than dashboard theater.",
              ].map((line) => (
                <div className="philosophy-line" key={line}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta border-top">
          <div className="container final-inner">
            <span className="section-kicker">Start Here</span>
            <h2>Find out where cyber and AI risk may already be outpacing operational visibility.</h2>
            <p>Schedule an Executive Cyber & AI Operational Readiness Briefing with Dr. Max Justice.</p>

            <div className="cta-row center">
              <a className="btn btn-primary large" href={BRIEFING_MAILTO}>
                Email Max
              </a>
              <a className="btn btn-secondary large" href={CYBERSHIELD_URL} target="_blank" rel="noreferrer">
                Launch CyberShield
              </a>
            </div>

            <div className="email-line">{CONTACT_EMAIL}</div>
          </div>
        </section>
      </main>
    </div>
  );
}
