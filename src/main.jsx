import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Radar,
  Network,
  Eye,
  BrainCircuit,
  Users,
  Cloud,
  Database,
  FileCheck2,
  KeyRound,
  AlertTriangle,
  CalendarDays,
  Mail,
  CheckCircle2,
  Layers3
} from 'lucide-react';
import './styles.css';
import logo from './assets/mjc-logo.png';

const CYBERSHIELD_URL = 'https://maximumjusticecybersecurity.github.io/CyberShield/';
const CALENDLY_URL = 'https://calendly.com/maxjustice';
const EMAIL = 'max@maximumjusticecybersecurity.com';

const topologyNodes = [
  {
    id: 'ai',
    label: 'AI',
    icon: BrainCircuit,
    angle: -90,
    headline: 'AI systems adopted faster than governance visibility',
    indicators: ['Unsanctioned AI usage', 'Decision ownership fragmented', 'Data lineage confidence reduced'],
    consequence: 'Leadership may already be approving operational risk without full visibility.'
  },
  {
    id: 'vendors',
    label: 'Vendors',
    icon: Users,
    angle: -38,
    headline: 'Third-party dependency exceeds governance visibility',
    indicators: ['Concentrated vendor trust exposure', 'Shared accountability unclear', 'Escalation ownership fragmented'],
    consequence: 'Operational continuity may depend on systems leadership cannot fully observe.'
  },
  {
    id: 'cloud',
    label: 'Cloud',
    icon: Cloud,
    angle: 14,
    headline: 'Cloud decisions move faster than executive interpretability',
    indicators: ['Policy drift across environments', 'Privilege expansion unclear', 'Cost, risk, and ownership disconnected'],
    consequence: 'Operational exposure can compound quietly until an incident forces visibility.'
  },
  {
    id: 'evidence',
    label: 'Evidence',
    icon: FileCheck2,
    angle: 66,
    headline: 'Evidence exists, but confidence is fragmented',
    indicators: ['Audit artifacts scattered', 'Control ownership inconsistent', 'Proof does not map cleanly to decisions'],
    consequence: 'Leadership receives assurance without knowing how durable that assurance is.'
  },
  {
    id: 'ownership',
    label: 'Ownership',
    icon: KeyRound,
    angle: 118,
    headline: 'Ownership gaps create invisible executive exposure',
    indicators: ['Unassigned decisions', 'Ambiguous escalation paths', 'Controls without accountable owners'],
    consequence: 'When risk materializes, the organization discovers responsibility too late.'
  },
  {
    id: 'data',
    label: 'Data',
    icon: Database,
    angle: 168,
    headline: 'Data flows beyond leadership visibility',
    indicators: ['Sensitive data used in AI-assisted workflows', 'Lineage confidence uncertain', 'Cross-system exposure unclear'],
    consequence: 'The organization may not know where high-value data is shaping decisions.'
  },
  {
    id: 'policy',
    label: 'Policy',
    icon: ShieldCheck,
    angle: 218,
    headline: 'Policy is written, but operational adoption is uncertain',
    indicators: ['Policy exceptions unmanaged', 'Controls not tied to workflows', 'Human behavior outside governance design'],
    consequence: 'Compliance language can create false confidence when operational reality has drifted.'
  },
  {
    id: 'executive',
    label: 'Executive',
    icon: Eye,
    angle: 270,
    headline: 'Executive reporting does not equal executive visibility',
    indicators: ['Conflicting risk narratives', 'Dashboard confidence without context', 'Board questions no one can answer cleanly'],
    consequence: 'Leadership can be accountable for risk it cannot clearly see.'
  }
];

const narratives = [
  {
    title: 'AI Governance Drift',
    body: 'An AI tool is adopted in marketing, legal, or operations without centralized visibility. Six months later, sensitive workflows and operational decisions are being influenced outside formal governance awareness.',
    tag: 'AI-era exposure'
  },
  {
    title: 'Fragmented Incident Ownership',
    body: 'During disruption, IT, security, vendors, and executives receive different versions of reality. No one can confidently answer who owns escalation, which systems are affected, or what exposure exists.',
    tag: 'Operational ambiguity'
  },
  {
    title: 'Vendor Visibility Failure',
    body: 'Critical workflows depend on third-party systems leadership has never fully mapped. The organization has tools, but no executive visibility model.',
    tag: 'Dependency risk'
  }
];

const services = [
  'Executive TrustMap Briefing',
  'Fractional vCISO Advisory',
  'AI Governance Visibility',
  'Audit Readiness & Evidence Mapping',
  'Zero Trust Operating Model',
  'Incident Preparedness & Executive Escalation'
];

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Maximum Justice Cybersecurity home">
        <img src={logo} alt="Maximum Justice Cybersecurity shield logo" />
        <div>
          <strong>MJC</strong>
          <span>Executive Operational Visibility</span>
        </div>
      </a>
      <nav aria-label="Primary navigation">
        <a href="#trustmap">TrustMap</a>
        <a href="#briefing">Briefing</a>
        <a href="#services">Services</a>
        <a className="nav-cta" href={CYBERSHIELD_URL}>Generate TrustMap</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><Radar size={16} /> Built for AI-era operational environments</div>
        <h1>Most Organizations Already Operate With More Cyber And AI Risk Than Leadership Can Clearly See.</h1>
        <p className="hero-sub">
          CyberShield helps executives identify operational visibility gaps across AI, vendors, systems, governance, ownership, and organizational decision-making before those gaps become operational failures.
        </p>
        <div className="hero-actions">
          <a className="button primary" href={CYBERSHIELD_URL}>Generate Your TrustMap <ArrowRight size={18} /></a>
          <a className="button secondary" href={CALENDLY_URL}>Schedule Executive Briefing</a>
        </div>
        <p className="trust-line">Maximum Justice Cybersecurity is led by Dr. Max Justice, vCISO, Security SME, Cybersecurity SME, creator of The CHN vCISO GPT powered by Cyber Shield, and U.S. veteran.</p>
      </div>
      <motion.div className="hero-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
        <div className="visibility-gauge">
          <span>Executive Visibility Gap</span>
          <strong>Active</strong>
        </div>
        <div className="signal-stack">
          {['AI adoption outruns governance', 'Vendor exposure lacks clear ownership', 'Evidence confidence is fragmented', 'Board reporting lacks operational context'].map((item, i) => (
            <motion.div className="signal-row" key={item} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .25 + i * .12 }}>
              <AlertTriangle size={16} />
              <span>{item}</span>
            </motion.div>
          ))}
        </div>
        <div className="hero-card-footer">
          <span>CyberShield TrustMap</span>
          <strong>Visibility before failure</strong>
        </div>
      </motion.div>
    </section>
  );
}

function RealizationPanel() {
  return (
    <section className="section realization">
      <div className="section-heading">
        <span className="kicker">Executive realization</span>
        <h2>The Problem Is Rarely A Lack Of Tools. It’s A Lack Of Visibility.</h2>
        <p>Executives do not need another noisy dashboard. They need a clearer way to see where AI, cyber, vendors, ownership, evidence, and operational decisions are already drifting beyond leadership visibility.</p>
      </div>
      <div className="comparison-grid">
        <div className="compare-card without">
          <h3>Without Operational Visibility</h3>
          <ul>
            <li>AI adopted without governance awareness</li>
            <li>Fragmented vendor accountability</li>
            <li>Escalation ownership unclear</li>
            <li>Leadership receiving conflicting risk narratives</li>
            <li>Operational exposure hidden across departments</li>
          </ul>
        </div>
        <div className="compare-card with">
          <h3>With CyberShield + TrustMap</h3>
          <ul>
            <li>Executive operational visibility</li>
            <li>Clear ownership mapping</li>
            <li>Governance-aligned AI adoption</li>
            <li>Consequence-aware decision visibility</li>
            <li>Evidence-backed operational trust</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function TrustMap() {
  const [active, setActive] = useState(topologyNodes[0]);
  const positions = useMemo(() => {
    const radius = 235;
    return topologyNodes.map((node) => {
      const rad = (node.angle * Math.PI) / 180;
      return {
        ...node,
        x: Math.cos(rad) * radius,
        y: Math.sin(rad) * radius
      };
    });
  }, []);

  return (
    <section id="trustmap" className="section trustmap-section">
      <div className="section-heading narrow">
        <span className="kicker">Signature instrument</span>
        <h2>TrustMap Turns Fragmented Signals Into Executive Operational Visibility.</h2>
        <p>Hover each signal source. The outer nodes do not become the story. The TrustMap comes forward because interpretation is the executive value.</p>
      </div>

      <div className="trustmap-stage">
        <svg className="connector-layer" viewBox="-330 -330 660 660" aria-hidden="true">
          {positions.map((node) => (
            <motion.line
              key={node.id}
              x1={node.x}
              y1={node.y}
              x2="0"
              y2="0"
              initial={{ pathLength: 0, opacity: .15 }}
              animate={{ pathLength: 1, opacity: active.id === node.id ? .85 : .28 }}
              transition={{ duration: .5 }}
            />
          ))}
          <circle cx="0" cy="0" r="116" />
        </svg>

        <div className="nodes-layer">
          {positions.map((node) => {
            const Icon = node.icon;
            const isActive = active.id === node.id;
            return (
              <motion.button
                key={node.id}
                className={`topology-node ${isActive ? 'active' : ''}`}
                style={{ transform: `translate(calc(-50% + ${node.x}px), calc(-50% + ${node.y}px))` }}
                onMouseEnter={() => setActive(node)}
                onFocus={() => setActive(node)}
                aria-label={`Inspect ${node.label} visibility signal`}
                whileHover={{ scale: 1.06 }}
              >
                <Icon size={22} />
                <span>{node.label}</span>
              </motion.button>
            );
          })}
        </div>

        <motion.div className="trustmap-core" layout>
          <span className="core-label">TrustMap</span>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className="core-detail"
              initial={{ opacity: 0, y: 10, scale: .98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: .98 }}
              transition={{ duration: .22 }}
            >
              <h3>{active.headline}</h3>
              <ul>
                {active.indicators.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p>{active.consequence}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Narratives() {
  return (
    <section className="section narratives">
      <div className="section-heading">
        <span className="kicker">Operational realism</span>
        <h2>Visibility Gaps Rarely Announce Themselves.</h2>
        <p>They emerge through ordinary decisions, disconnected reporting, unclear ownership, and AI-era workflow drift.</p>
      </div>
      <div className="narrative-grid">
        {narratives.map((n) => (
          <article className="narrative-card" key={n.title}>
            <span>{n.tag}</span>
            <h3>{n.title}</h3>
            <p>{n.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Briefing() {
  return (
    <section id="briefing" className="section briefing">
      <div className="briefing-panel">
        <div>
          <span className="kicker">Executive interpretation</span>
          <h2>CyberShield Identifies Visibility Gaps. MJC Helps Leadership Interpret What Matters.</h2>
          <p>
            The Executive Operational Visibility Briefing helps leadership understand what is fragmented, what is hidden, what requires action, and what creates executive exposure.
          </p>
          <div className="briefing-actions">
            <a className="button primary" href={CALENDLY_URL}><CalendarDays size={18} /> Schedule Executive Briefing</a>
            <a className="button ghost" href={`mailto:${EMAIL}`}><Mail size={18} /> Contact MJC</a>
          </div>
        </div>
        <div className="briefing-list">
          {['What matters now', 'Where ownership is unclear', 'Where AI or vendor risk is hidden', 'Which actions reduce executive uncertainty'].map((item) => (
            <div key={item}><CheckCircle2 size={18} /> {item}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section services">
      <div className="section-heading">
        <span className="kicker">Downstream services</span>
        <h2>Cybersecurity Services Reframed Around Executive Visibility.</h2>
        <p>Services remain available, but they are subordinate to the core mission: reducing executive uncertainty across cyber, AI, governance, and operational risk.</p>
      </div>
      <div className="services-grid">
        {services.map((service) => (
          <div className="service-card" key={service}>
            <Layers3 size={20} />
            <span>{service}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Doctrine() {
  return (
    <section className="section doctrine">
      <div className="doctrine-card">
        <h2>AI Can Inform Decisions. Humans Still Own Consequences.</h2>
        <p>Operational visibility matters because accountability remains human. CyberShield helps leadership maintain visibility, governance, and consequence awareness across increasingly complex operational environments.</p>
        <a className="button secondary" href={CYBERSHIELD_URL}>Generate Your TrustMap <ArrowRight size={18} /></a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <img src={logo} alt="" />
      <p>Maximum Justice Cybersecurity</p>
      <span>Executive Operational Visibility for AI-era environments</span>
    </footer>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <RealizationPanel />
        <TrustMap />
        <Narratives />
        <Briefing />
        <Services />
        <Doctrine />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
