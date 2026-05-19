import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Radar,
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
  Layers3,
  RefreshCw,
  X,
  UserRound,
  Network,
  Target,
  LockKeyhole
} from 'lucide-react';
import './styles.css';
import logo from './assets/mjc-logo.png';

const CYBERSHIELD_URL = 'https://maximumjusticecybersecurity.github.io/CyberShield/';
const CALENDLY_URL = 'https://calendly.com/maxjustice';
const EMAIL = 'max@maximumjusticecybersecurity.com';
const CAPITOL_PHOTO = '/mjc-site/dr-max-justice-capitol.png';

const trustNodes = [
  {
    id: 'ai',
    label: 'AI',
    icon: BrainCircuit,
    angle: -90,
    headline: 'AI adoption outruns governance visibility',
    meaning: 'AI tools can enter workflows before leadership has policy, ownership, evidence, or data lineage visibility.',
    indicators: ['Unsanctioned AI use', 'Unclear decision ownership', 'Data lineage uncertainty'],
    takeaway: 'Leadership may already be accountable for AI-shaped decisions it cannot clearly see.'
  },
  {
    id: 'vendors',
    label: 'Vendors',
    icon: Users,
    angle: -38,
    headline: 'Third-party dependency exceeds governance visibility',
    meaning: 'Critical workflows often depend on vendors without a clean executive view of concentration, escalation, and continuity exposure.',
    indicators: ['Shared accountability unclear', 'Vendor concentration risk', 'Escalation ownership fragmented'],
    takeaway: 'Operational continuity may depend on systems leadership cannot fully observe.'
  },
  {
    id: 'cloud',
    label: 'Cloud',
    icon: Cloud,
    angle: 14,
    headline: 'Cloud changes move faster than interpretability',
    meaning: 'Cloud environments accumulate access, cost, configuration, and ownership drift faster than executive reporting usually captures.',
    indicators: ['Privilege expansion', 'Policy drift', 'Cost and risk disconnected'],
    takeaway: 'Exposure can compound quietly until an incident forces visibility.'
  },
  {
    id: 'evidence',
    label: 'Evidence',
    icon: FileCheck2,
    angle: 66,
    headline: 'Evidence exists, but confidence is fragmented',
    meaning: 'Audit artifacts, control proof, and operational evidence often live in separate places with no executive confidence model.',
    indicators: ['Artifacts scattered', 'Controls unmapped', 'Proof disconnected from decisions'],
    takeaway: 'Assurance without evidence confidence creates false comfort.'
  },
  {
    id: 'ownership',
    label: 'Ownership',
    icon: KeyRound,
    angle: 118,
    headline: 'Ownership gaps create invisible executive exposure',
    meaning: 'When accountability is implied but not mapped, organizations discover responsibility only after friction becomes failure.',
    indicators: ['Unassigned decisions', 'Ambiguous escalation paths', 'Controls without owners'],
    takeaway: 'Responsibility discovered late is operational risk already matured.'
  },
  {
    id: 'data',
    label: 'Data',
    icon: Database,
    angle: 168,
    headline: 'Data flows beyond leadership visibility',
    meaning: 'Sensitive data increasingly moves through AI-assisted workflows, SaaS tools, vendors, and cloud services without a unified executive view.',
    indicators: ['Sensitive workflow exposure', 'Lineage confidence gaps', 'Cross-system uncertainty'],
    takeaway: 'High-value data may be shaping decisions outside visible governance.'
  },
  {
    id: 'policy',
    label: 'Policy',
    icon: ShieldCheck,
    angle: 218,
    headline: 'Policy is written, but adoption is uncertain',
    meaning: 'Policy documents do not prove operating reality.  The gap lives between what is approved and what people actually do.',
    indicators: ['Exceptions unmanaged', 'Controls not tied to workflows', 'Behavior outside governance design'],
    takeaway: 'Compliance language can create false confidence when reality has drifted.'
  },
  {
    id: 'executive',
    label: 'Executive',
    icon: Eye,
    angle: 270,
    headline: 'Executive reporting does not equal executive visibility',
    meaning: 'Dashboards, briefings, and updates can still leave leadership without context, ownership, consequence, or confidence.',
    indicators: ['Conflicting risk narratives', 'Board questions unanswered', 'Confidence without context'],
    takeaway: 'Leadership can be accountable for risk it cannot clearly see.'
  }
];

const services = [
  {
    title: 'TrustMap Briefing',
    icon: Radar,
    summary: 'Translate fragmented cyber, AI, vendor, evidence, and ownership signals into executive operational visibility.',
    details: ['Visibility gap review', 'Operational consequence mapping', 'Executive next-action priorities'],
    cta: 'Generate TrustMap'
  },
  {
    title: 'Fractional vCISO',
    icon: ShieldCheck,
    summary: 'Security leadership for SMBs that need senior judgment without hiring a full-time executive security team.',
    details: ['Security strategy', 'Board and executive reporting', 'Risk ownership and governance cadence'],
    cta: 'Schedule Briefing'
  },
  {
    title: 'AI Governance Visibility',
    icon: BrainCircuit,
    summary: 'Identify where AI use, policy, data, human accountability, and operational decisions are drifting apart.',
    details: ['AI use visibility', 'Policy and data alignment', 'Human consequence ownership'],
    cta: 'Schedule Briefing'
  },
  {
    title: 'Audit Readiness',
    icon: FileCheck2,
    summary: 'Turn control evidence into audit-defensible governance clarity instead of last-minute document collection.',
    details: ['Evidence mapping', 'Control ownership', 'CMMC and NIST alignment'],
    cta: 'Schedule Briefing'
  },
  {
    title: 'Zero Trust Operating Model',
    icon: LockKeyhole,
    summary: 'Move Zero Trust from slogan to operating discipline across identity, access, vendors, systems, and accountability.',
    details: ['Access governance', 'Policy enforcement logic', 'Operational trust boundaries'],
    cta: 'Schedule Briefing'
  },
  {
    title: 'Incident Preparedness',
    icon: AlertTriangle,
    summary: 'Clarify escalation, ownership, executive communication, and operational decision paths before pressure arrives.',
    details: ['Escalation model', 'Executive decision support', 'Operational continuity planning'],
    cta: 'Schedule Briefing'
  }
];

const scenarios = [
  {
    title: 'AI Governance Drift',
    tag: 'AI-era exposure',
    text: 'An AI tool is adopted inside marketing, legal, or operations without centralized visibility.  Six months later, customer data and operational decisions are being influenced outside formal governance awareness.'
  },
  {
    title: 'Fragmented Incident Ownership',
    tag: 'Operational ambiguity',
    text: 'During a disruption, IT, security, vendors, and executives receive different versions of reality.  No one can confidently answer who owns escalation, which systems are affected, or what exposure exists.'
  },
  {
    title: 'Vendor Visibility Failure',
    tag: 'Dependency risk',
    text: 'Critical workflows depend on third-party systems leadership has never fully mapped.  The organization has tools, but no executive visibility model.'
  }
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
        <a href="#max">Dr. Justice</a>
        <a href="#services">Services</a>
        <a className="nav-cta" href={CYBERSHIELD_URL}>Generate TrustMap</a>
      </nav>
    </header>
  );
}

function MiniTrustMap({ size = 'large' }) {
  const [activeId, setActiveId] = useState('ai');
  const active = trustNodes.find((node) => node.id === activeId) || trustNodes[0];
  const positions = useMemo(() => {
    const radius = size === 'large' ? 210 : 150;
    return trustNodes.map((node) => {
      const rad = (node.angle * Math.PI) / 180;
      return { ...node, x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
    });
  }, [size]);

  return (
    <div className={`trust-orbit ${size}`}>
      <svg className="trust-lines" viewBox="0 0 640 640" aria-hidden="true">
        <defs>
          <radialGradient id="lineGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#72d7ff" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#1d8fff" stopOpacity="0.06" />
          </radialGradient>
        </defs>
        {positions.map((node) => (
          <line
            key={node.id}
            x1="320"
            y1="320"
            x2={320 + node.x}
            y2={320 + node.y}
            className={node.id === activeId ? 'line active' : 'line'}
          />
        ))}
        <circle cx="320" cy="320" r="112" fill="url(#lineGlow)" opacity="0.55" />
      </svg>

      <button className="center-trust" onClick={() => setActiveId('ai')} aria-label="Reset TrustMap to AI signal">
        <span>TrustMap</span>
        <small>Signal interpreter</small>
      </button>

      {positions.map((node) => {
        const Icon = node.icon;
        const style = { transform: `translate(calc(-50% + ${node.x}px), calc(-50% + ${node.y}px))` };
        return (
          <button
            key={node.id}
            className={node.id === activeId ? 'orbit-node active' : 'orbit-node'}
            style={style}
            onMouseEnter={() => setActiveId(node.id)}
            onFocus={() => setActiveId(node.id)}
            onClick={() => setActiveId(node.id)}
            aria-label={`Show TrustMap signal for ${node.label}`}
          >
            <Icon size={18} />
            <span>{node.label}</span>
          </button>
        );
      })}

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          className="trust-intel-card"
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.24 }}
        >
          <div className="intel-topline">
            <span>{active.label} signal</span>
            <RefreshCw size={14} />
          </div>
          <h3>{active.headline}</h3>
          <p>{active.meaning}</p>
          <ul>
            {active.indicators.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <strong>{active.takeaway}</strong>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="hero hero-v12">
      <div className="hero-copy">
        <div className="eyebrow"><Radar size={16} /> MJC Website V12</div>
        <h1>Most Organizations Already Operate With More Cyber And AI Risk Than Leadership Can Clearly See.</h1>
        <p className="hero-sub">
          CyberShield turns fragmented AI, vendor, cloud, evidence, ownership, policy, and data signals into executive operational visibility.
        </p>
        <div className="hero-actions">
          <a className="button primary" href={CYBERSHIELD_URL}>Generate Your TrustMap <ArrowRight size={18} /></a>
          <a className="button secondary" href={CALENDLY_URL}>Schedule Executive Briefing</a>
        </div>
        <p className="trust-line">Built by Maximum Justice Cybersecurity for SMB leaders who need operational clarity before cyber and AI risk becomes an executive surprise.</p>
      </div>
      <motion.div className="hero-map-wrap" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="map-label">Interactive Visibility Gap</div>
        <MiniTrustMap />
      </motion.div>
    </section>
  );
}

function MaxTrustSection() {
  return (
    <section id="max" className="section max-section">
      <div className="max-photo-card">
        <img src={CAPITOL_PHOTO} alt="Dr. Max Justice with Capitol background" />
        <div className="photo-caption">
          <span>Human interpretation layer</span>
          <strong>Dr. Max Justice</strong>
        </div>
      </div>
      <div className="max-copy">
        <span className="kicker">Trust transfer</span>
        <h2>SMBs Are Not Only Buying Software.  They Are Trusting The Person Interpreting The Signal.</h2>
        <p>
          MJC is led by Dr. Max Justice, vCISO, Security SME, Cybersecurity SME, U.S. veteran, and creator of The CHN vCISO GPT powered by Cyber Shield.  CyberShield provides the visibility instrument.  Dr. Justice provides executive interpretation, consequence awareness, and operational judgment.
        </p>
        <div className="credential-grid">
          <div><UserRound size={18} /><strong>vCISO advisory</strong><span>Senior security leadership without full-time executive overhead</span></div>
          <div><Network size={18} /><strong>Operating model focus</strong><span>Cyber failures treated as coordination failures, not tool failures</span></div>
          <div><Target size={18} /><strong>SMB intimacy</strong><span>Direct advisory relationship with practical, executive-grade clarity</span></div>
        </div>
      </div>
    </section>
  );
}

function RealizationPanel() {
  return (
    <section className="section realization">
      <div className="section-heading">
        <span className="kicker">Executive realization</span>
        <h2>The Problem Is Rarely A Lack Of Tools.  It Is A Lack Of Visibility.</h2>
        <p>Executives do not need another noisy cyber dashboard.  They need to see where AI, vendors, evidence, ownership, and operational decisions are already drifting beyond leadership visibility.</p>
      </div>
      <div className="comparison-grid">
        <div className="compare-card without">
          <h3>Without Operational Visibility</h3>
          <ul>
            <li>AI adopted without governance awareness</li>
            <li>Fragmented vendor accountability</li>
            <li>Escalation ownership unclear</li>
            <li>Conflicting executive risk narratives</li>
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

function TrustMapDeepDive() {
  return (
    <section id="trustmap" className="section trustmap-deep">
      <div className="section-heading narrow">
        <span className="kicker">Signature instrument</span>
        <h2>TrustMap Turns Fragmented Signals Into Executive Operational Visibility.</h2>
        <p>Explore the signals repeatedly.  Nothing disappears.  The map stays alive because operational visibility is not one-and-done.</p>
      </div>
      <div className="deep-grid">
        <MiniTrustMap size="compact" />
        <div className="instrument-copy">
          <h3>What The TrustMap Produces</h3>
          <ul className="check-list">
            <li><CheckCircle2 size={17} /> Visibility score and confidence signals</li>
            <li><CheckCircle2 size={17} /> Exposure zones across AI, vendors, data, and cloud</li>
            <li><CheckCircle2 size={17} /> Ownership and escalation gaps</li>
            <li><CheckCircle2 size={17} /> Evidence confidence and audit posture</li>
            <li><CheckCircle2 size={17} /> Executive-ready next actions</li>
          </ul>
          <div className="instrument-actions">
            <a className="button primary" href={CYBERSHIELD_URL}>Generate Your TrustMap</a>
            <a className="button ghost" href={CALENDLY_URL}>Interpret Results With MJC</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [selected, setSelected] = useState(null);
  return (
    <section id="services" className="section services-section">
      <div className="section-heading">
        <span className="kicker">Foundational trust services</span>
        <h2>The Advisory Layer Beneath The Instrument.</h2>
        <p>CyberShield reveals the visibility gap.  MJC helps leadership understand what matters, who owns it, and what to do next.</p>
      </div>
      <div className="service-grid">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <button key={service.title} className="service-card" onClick={() => setSelected(service)}>
              <Icon size={22} />
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <span>Open service brief</span>
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div className="modal" initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.96 }} onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close service modal"><X size={18} /></button>
              <span className="kicker">Service brief</span>
              <h3>{selected.title}</h3>
              <p>{selected.summary}</p>
              <ul>
                {selected.details.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="modal-actions">
                <a className="button primary" href={selected.title === 'TrustMap Briefing' ? CYBERSHIELD_URL : CALENDLY_URL}>{selected.cta}</a>
                <a className="button ghost" href={`mailto:${EMAIL}`}>Email MJC</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Scenarios() {
  return (
    <section className="section scenarios-section">
      <div className="section-heading narrow">
        <span className="kicker">Operational stories</span>
        <h2>Visibility Gaps Rarely Announce Themselves.</h2>
        <p>They appear as disconnected decisions, quiet accountability gaps, and executive questions no one can answer cleanly.</p>
      </div>
      <div className="scenario-grid">
        {scenarios.map((scenario, index) => (
          <motion.article className="scenario-card" key={scenario.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
            <span>{scenario.tag}</span>
            <h3>{scenario.title}</h3>
            <p>{scenario.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Briefing() {
  return (
    <section id="briefing" className="section briefing-section">
      <div className="briefing-panel">
        <div>
          <span className="kicker">Executive briefing</span>
          <h2>CyberShield Finds The Gap.  MJC Helps Leadership Interpret The Consequence.</h2>
          <p>Use the TrustMap to surface visibility gaps, then work with MJC to prioritize what matters, what is hidden, who owns it, and what requires action.</p>
        </div>
        <div className="briefing-actions">
          <a className="button primary" href={CYBERSHIELD_URL}>Generate TrustMap</a>
          <a className="button secondary" href={CALENDLY_URL}><CalendarDays size={17} /> Schedule Briefing</a>
          <a className="button ghost" href={`mailto:${EMAIL}`}><Mail size={17} /> Email MJC</a>
        </div>
      </div>
    </section>
  );
}

function Doctrine() {
  return (
    <section className="section doctrine-section">
      <div className="doctrine-card">
        <Layers3 size={26} />
        <div>
          <span className="kicker">Human command doctrine</span>
          <h2>AI Can Inform Decisions.  Humans Still Own Consequences.</h2>
          <p>Operational visibility matters because accountability remains human.  CyberShield helps leadership maintain visibility, governance, and consequence awareness across increasingly complex AI-era environments.</p>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MaxTrustSection />
        <RealizationPanel />
        <TrustMapDeepDive />
        <Services />
        <Scenarios />
        <Briefing />
        <Doctrine />
      </main>
      <footer>
        <img src={logo} alt="MJC shield" />
        <p>Maximum Justice Cybersecurity.  Executive operational visibility for cyber and AI-era environments.</p>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
