import React, { useState } from "react";
import "./styles.css";

const CYBERSHIELD_URL = "https://maximumjusticecybersecurity.github.io/CyberShield/";
const CALENDLY_URL = "https://calendly.com/maxjustice";
const CONTACT_EMAIL = "max@maximumjusticecybersecurity.com";

const exposures = {
  "AI Drift": {
    headline: "AI is being used before governance catches up.",
    consequence: "Teams adopt AI tools before ownership, approval paths, data rules, or decision accountability are defined.",
    action: "Start with an AI use inventory and assign executive ownership for consequential decisions.",
    heat: [82, 68, 74, 49],
  },
  "Vendor Blindspot": {
    headline: "Critical vendors may be carrying operational risk you cannot see.",
    consequence: "A vendor outage, breach, or data failure can disrupt operations even when internal systems appear stable.",
    action: "Map vendors by operational consequence, not contract size.",
    heat: [64, 88, 58, 73],
  },
  "Audit Gap": {
    headline: "Controls may exist, but evidence may not survive scrutiny.",
    consequence: "Leadership may believe the organization is ready until an auditor, customer, insurer, or regulator asks for proof.",
    action: "Create an evidence map tied to control owners, dates, and executive risk status.",
    heat: [58, 62, 91, 67],
  },
  "Decision Fog": {
    headline: "Leadership is receiving activity reports, not decision intelligence.",
    consequence: "Executives see alerts, tickets, and compliance status, but not what can disrupt revenue, trust, continuity, or mission.",
    action: "Translate technical reporting into executive operational visibility.",
    heat: [76, 55, 69, 87],
  },
};

const services = {
  "TrustMap Briefing": [
    "A semi-automated CyberShield first pass followed by expert review from Dr. Max Justice.",
    ["CyberShield generates the first-pass TrustMap", "Dr. Max Justice reviews and enhances findings", "Output focuses on visibility, ownership, consequence, and next action", "Designed for CEOs, owners, boards, and executive teams"],
  ],
  "Fractional vCISO": ["Executive cybersecurity leadership without full-time CISO overhead.", ["Security strategy and governance cadence", "Executive and board-level reporting", "MSP and vendor oversight", "Policy ownership and risk prioritization"]],
  "AI Governance": ["Human-command AI governance for organizations adopting AI faster than policy can keep up.", ["AI use policy and inventory", "Decision authority and approval gates", "Data handling and accountability expectations", "Evidence and auditability standards"]],
  "Audit Readiness": ["Evidence discipline for CMMC, NIST, HIPAA, customer reviews, cyber insurance, and executive scrutiny.", ["Control mapping and ownership clarity", "Evidence collection structure", "Remediation tracking", "Executive-ready readiness summaries"]],
  "Zero Trust Architecture": ["Practical Zero Trust strategy balanced with operational trust and business reality.", ["Identity and access review", "Privilege and segmentation priorities", "Cloud and Microsoft ecosystem governance", "Architecture roadmap tied to operational risk"]],
  "Incident Preparedness": ["Prepare leadership to make calm, fast decisions before pressure arrives.", ["Executive tabletop exercises", "Escalation authority mapping", "Ransomware and vendor outage scenarios", "Communication and continuity readiness"]],
};

const industries = {
  "Federal Contractors": ["CMMC, NIST 800-171, DFARS flow-downs, supply-chain risk, customer scrutiny, and audit defensibility.", "Could you prove ownership, evidence, and remediation status if a customer asked tomorrow?", ["CMMC evidence", "Control ownership", "Vendor flow-downs", "Executive accountability"]],
  "Healthcare": ["HIPAA, ransomware disruption, third-party platforms, patient data exposure, continuity, and clinical workflow risk.", "If ransomware hit a critical vendor, who owns the first-hour operating decision?", ["HIPAA exposure", "Vendor continuity", "Patient data risk", "Escalation ownership"]],
  "Manufacturing": ["Plant downtime, OT and IT exposure, vendor dependencies, ransomware, production disruption, and continuity.", "Which systems, vendors, identities, or workflows can stop production?", ["Operational dependencies", "OT/IT exposure", "Recovery confidence", "Vendor consequence"]],
  "Financial Services": ["Trust, regulatory pressure, fraud, cyber maturity, vendor exposure, customer confidence, and AI-assisted decision risk.", "Would current reporting give leadership enough clarity before trust damage spreads?", ["Regulatory visibility", "Fraud exposure", "Vendor risk", "AI decision governance"]],
  "Legal & Professional Services": ["Client confidentiality, privileged data, AI document handling, reputation damage, vendor tools, and client trust.", "Can you explain where client-sensitive data goes when AI tools enter the workflow?", ["Client data handling", "AI leakage risk", "Confidentiality", "Reputation exposure"]],
};

const trustFlow = [
  ["Request", "An AI-enabled tool, vendor, employee, or workflow attempts to influence an operational decision."],
  ["Evaluate", "CyberShield checks context, policy fit, visibility, ownership, and consequence before action."],
  ["Authorize", "Human command authority remains accountable before the action becomes consequential."],
  ["Record", "Evidence, rationale, owner, and decision context are captured for later review."],
  ["TrustMap", "The organization receives a visibility map showing confidence, exposure, and next action."],
];

function Header() {
  return <header className="header"><a className="brand" href="#top"><img src="/mjc-site/mjc-logo.png" alt="MJC logo"/><div><strong>Maximum Justice Cybersecurity</strong><span>vCISO | Security SME | Cybersecurity SME</span></div></a><nav><a href="#trustmap">TrustMap</a><a href="#services">Services</a><a href="#industries">Industries</a><a href="#doctrine">Doctrine</a><a href={CYBERSHIELD_URL} target="_blank">CyberShield</a><a className="navCta" href={CALENDLY_URL} target="_blank">Book Briefing</a></nav></header>
}
function HeatCell({label,value}){const tone=value>=80?'hot':value>=65?'warn':'calm'; return <div className={`heatCell ${tone}`}><span>{label}</span><strong>{value}%</strong></div>}
function Modal({title,children,close}){return <div className="modalBackdrop" onClick={close}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modalClose" onClick={close}>×</button><h3>{title}</h3>{children}</div></div>}

export default function App(){
 const [selectedExposure,setSelectedExposure]=useState('AI Drift');
 const [selectedService,setSelectedService]=useState(null);
 const [selectedIndustry,setSelectedIndustry]=useState('Federal Contractors');
 const [selectedFlow,setSelectedFlow]=useState(trustFlow[0]);
 const exposure=exposures[selectedExposure];
 const industry=industries[selectedIndustry];
 return <div className="site" id="top"><Header/><main>
  <section className="hero"><div className="container heroGrid"><div className="heroCopy"><span className="eyebrow">Composure under pressure</span><h1>See what your cyber and AI reports are not telling you.</h1><p>MJC helps executives turn fragmented cyber, AI, vendor, and governance signals into a TrustMap, a clear view of operational visibility, exposure, ownership, and next action.</p><div className="actions"><a className="primary" href={CYBERSHIELD_URL} target="_blank">Generate Your TrustMap</a><a className="secondary" href={CALENDLY_URL} target="_blank">Schedule Executive Briefing</a></div><div className="badgeRow"><span>AI-assisted</span><span>Expert-validated</span><span>Executive-ready</span><span>Built for trust</span></div></div>
  <aside className="trustMapCard" id="trustmap"><div className="cardTop"><div><span>TrustMap Preview</span><strong>{selectedExposure}</strong></div><b>Interactive</b></div><div className="heatGrid"><HeatCell label="Visibility" value={exposure.heat[0]}/><HeatCell label="Ownership" value={exposure.heat[1]}/><HeatCell label="Evidence" value={exposure.heat[2]}/><HeatCell label="Action Clarity" value={exposure.heat[3]}/></div><div className="exposurePanel"><h3>{exposure.headline}</h3><p>{exposure.consequence}</p><strong>Recommended first move:</strong><p>{exposure.action}</p></div><div className="exposureButtons">{Object.keys(exposures).map(k=><button key={k} onClick={()=>setSelectedExposure(k)} className={selectedExposure===k?'active':''}>{k}</button>)}</div></aside></div></section>
  <section className="trustPromise"><div className="container promiseGrid"><div><span className="eyebrow">The takeaway</span><h2>They do not leave with a brochure. They leave with a TrustMap.</h2></div><div className="reportList">{['Visibility score','Top exposure zones','Governance gaps','AI trust indicators','Executive priorities','Expert-reviewed next steps'].map(i=><span key={i}>{i}</span>)}</div></div></section>
  <section className="section" id="doctrine"><div className="container doctrineGrid"><div><span className="eyebrow">Human command doctrine</span><h2>AI can inform decisions. Leadership owns the consequences.</h2><p>CyberShield generates a semi-automated first pass. Dr. Max Justice then reviews and enhances the output. The result is not AI slop. It is AI-assisted, expert-validated executive intelligence.</p><div className="doctrineLines"><span>Authority remains human.</span><span>Accountability remains human.</span><span>Trust is measured through evidence, behavior, and context.</span></div></div><div className="imagePanel"><img src="/mjc-site/max-justice-nasa-roof.png" alt="Dr. Max Justice thought leadership visual"/></div></div></section>
  <section className="section soft"><div className="container"><div className="sectionHead"><span className="eyebrow">Operational trust flow</span><h2>Trust is not binary. It moves through decisions.</h2><p>Click each step to see how CyberShield turns activity into executive visibility.</p></div><div className="flowGrid">{trustFlow.map((s,i)=><button key={s[0]} onClick={()=>setSelectedFlow(s)} className={selectedFlow[0]===s[0]?'selected':''}><span>{String(i+1).padStart(2,'0')}</span>{s[0]}</button>)}</div><div className="flowExplainer"><h3>{selectedFlow[0]}</h3><p>{selectedFlow[1]}</p></div></div></section>
  <section className="section" id="services"><div className="container"><div className="sectionHead"><span className="eyebrow">Services</span><h2>Start with the TrustMap. Then decide what deserves attention.</h2><p>Each service exists to improve operational visibility, decision confidence, and governance under pressure.</p></div><div className="serviceGrid">{Object.keys(services).map(k=><button key={k} className="serviceCard" onClick={()=>setSelectedService(k)}><span>{k==='TrustMap Briefing'?'Primary offer':'Service'}</span><h3>{k}</h3><p>{services[k][0]}</p><b>Open details →</b></button>)}</div></div></section>
  <section className="section soft" id="industries"><div className="container industryGrid"><div><span className="eyebrow">Priority markets</span><h2>The TrustMap changes by industry.</h2><p>Federal contractors, banks, hospitals, manufacturers, and law firms do not fail the same way.</p><div className="industryButtons">{Object.keys(industries).map(k=><button key={k} className={selectedIndustry===k?'active':''} onClick={()=>setSelectedIndustry(k)}>{k}</button>)}</div></div><div className="industryPanel"><h3>{selectedIndustry}</h3><p><strong>Pressure:</strong> {industry[0]}</p><p><strong>Executive question:</strong> {industry[1]}</p><div className="focusTags">{industry[2].map(t=><span key={t}>{t}</span>)}</div></div></div></section>
  <section className="section cyberShieldCallout"><div className="container calloutGrid"><div><span className="eyebrow">Separate tool. Clear purpose.</span><h2>CyberShield is where the TrustMap begins.</h2><p>This website builds trust and context. CyberShield runs the first-pass TrustMap experience. MJC then provides the expert review layer that turns output into executive intelligence.</p></div><a className="primary" href={CYBERSHIELD_URL} target="_blank">Launch CyberShield</a></div></section>
  <section className="finalCta"><div className="container finalInner"><span className="eyebrow">Start here</span><h2>Generate your TrustMap before a blind spot becomes the incident.</h2><p>CyberShield creates the first pass. Dr. Max Justice validates and sharpens the executive report.</p><div className="actions center"><a className="primary" href={CYBERSHIELD_URL} target="_blank">Generate Your TrustMap</a><a className="secondary" href={CALENDLY_URL} target="_blank">Book Executive Briefing</a></div><div className="emailLine">{CONTACT_EMAIL}</div></div></section>
 </main>{selectedService&&<Modal title={selectedService} close={()=>setSelectedService(null)}><p>{services[selectedService][0]}</p><ul>{services[selectedService][1].map(i=><li key={i}>{i}</li>)}</ul><a className="primary small" href={CALENDLY_URL} target="_blank">Discuss this service</a></Modal>}</div>
}
