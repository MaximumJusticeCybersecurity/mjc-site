export const profiles = {
  water_v1: {
    key: 'water_v1',
    mode: 'water',
    eyebrow: 'Municipal Water & Wastewater Decision Support',
    title: 'Turn your cyber readiness answers into an executive action list.',
    intro: 'Re-create the ten scorecard responses, identify critical red flags, challenge the evidence behind every Yes, and leave with a practical worksheet you can use with your existing IT or OT provider.',
    warning: 'Do not enter credentials, IP addresses, remote-access endpoints, PLC/HMI configurations, network diagrams, SCADA logs, dosing parameters, vulnerability outputs, emergency-response secrets, or other sensitive operational details.',
    options: [
      { value: 'yes', label: 'Yes', score: 0 },
      { value: 'partial', label: 'Partial', score: 1 },
      { value: 'no', label: 'No', score: 2 }
    ],
    questions: [
      { id: 'w1', critical: true, text: 'Can leadership produce a complete inventory of internet-facing OT and other externally accessible operational systems?', gap: 'Internet-facing operational exposure is not completely known.' },
      { id: 'w2', critical: true, text: 'Can leadership produce a complete inventory of every remote-access pathway into the operational environment?', gap: 'Remote-access pathways into operations are not completely known.' },
      { id: 'w3', critical: true, text: 'Can critical PLC, HMI, network, and operational configurations be reliably restored from tested known-good copies?', gap: 'Critical operational configurations may not be reliably recoverable.' },
      { id: 'w4', critical: true, text: 'Has the utility demonstrated that essential water or wastewater operations can continue safely when critical digital systems are unavailable?', gap: 'Essential operations have not been demonstrated under loss of critical digital systems.' },
      { id: 'w5', critical: true, text: 'Is there an explicit boundary defining what operational data may be provided to AI tools and services?', gap: 'AI use lacks an explicit operational-data boundary.' },
      { id: 'w6', text: 'Can the utility show evidence that privileged and remote access is MFA-protected, attributable, reviewed, and revoked when no longer required?', gap: 'Privileged or remote-access control evidence needs verification.' },
      { id: 'w7', text: 'Does leadership know what operational or business data vendors, MSPs, cloud tools, and other third parties are permitted to receive?', gap: 'Third-party data access and dependency boundaries need verification.' },
      { id: 'w8', text: 'Is decision authority explicit for isolation, manual operations, notification, and restoration during a cyber event?', gap: 'Cyber-response decision authority is not fully explicit.' },
      { id: 'w9', text: 'Has the utility exercised cyber incident and recovery coordination with operational leadership and the incumbent provider?', gap: 'Cyber incident and recovery coordination needs a current exercise.' },
      { id: 'w10', text: 'Can leadership produce independent evidence that the controls it believes are working actually work?', gap: 'Control effectiveness needs evidence beyond assertion.' }
    ],
    jabTitle: 'Executive / Provider Evidence Challenge',
    jabIntro: 'Take your top gaps to the incumbent provider. For each one, capture an accountable owner, evidence, the last test date, the gap, and the next action. The goal is to make assurance visible, not replace the provider.',
    hookTitle: 'Want an independent second set of eyes?',
    hookText: 'Maximum Justice Cybersecurity can validate the answers and evidence without replacing your existing IT or OT provider.',
    helpLabel: 'Discuss independent validation'
  },

  healthcare_v1: {
    key: 'healthcare_v1',
    mode: 'categories',
    eyebrow: 'Healthcare Cyber Resilience Decision Exercise',
    title: 'Could leadership make the right decisions while critical clinical systems are unavailable?',
    intro: 'Use this 10–15 minute executive exercise to test decision ownership, continuity, recovery evidence, third-party dependency, patient-safety escalation, and AI/data boundaries without submitting PHI or sensitive system information.',
    warning: 'Do not enter PHI/ePHI, patient identifiers, medical-record information, credentials, IP addresses, remote-access endpoints, vulnerability outputs, EHR screenshots/configuration, network diagrams, incident evidence, or other attack-useful healthcare security detail.',
    options: [
      { value: 'clear', label: 'Clear / Demonstrated', score: 0 },
      { value: 'partial', label: 'Partially Defined', score: 1 },
      { value: 'gap', label: 'Unclear / Not Demonstrated', score: 2 }
    ],
    questions: [
      { id: 'h1', category: 'Decision ownership', text: 'If the EHR or another critical clinical system becomes materially unavailable, is authority to invoke downtime procedures explicit and current?', gap: 'Downtime authority needs clarification.' },
      { id: 'h2', category: 'Clinical continuity', text: 'Can care teams sustain safe manual or downtime operations for the required period without relying on unavailable digital workflows?', gap: 'Clinical/manual continuity needs stronger demonstration.' },
      { id: 'h3', category: 'Patient-safety tradeoff', text: 'Is there a defined authority path for deciding when cyber isolation is necessary even if it disrupts clinical operations?', gap: 'Isolation versus patient-safety authority needs clarification.' },
      { id: 'h4', category: 'Evidence preservation', text: 'Can the organization preserve decision and incident evidence while continuing patient care?', gap: 'Evidence-preservation responsibilities need verification.' },
      { id: 'h5', category: 'Patient-safety escalation', text: 'Are thresholds clear for escalating a cyber event as a patient-safety issue?', gap: 'Patient-safety escalation thresholds need clarification.' },
      { id: 'h6', category: 'Executive escalation', text: 'Are executive, board, legal, privacy, and regulatory escalation thresholds defined before an event occurs?', gap: 'Executive/legal/privacy escalation thresholds need verification.' },
      { id: 'h7', category: 'Recovery evidence', text: 'Are restoration and reconnection criteria evidence-based and owned by accountable roles?', gap: 'Restoration/reconnection evidence and ownership need verification.' },
      { id: 'h8', category: 'Third-party dependency', text: 'Is ownership explicit when a critical third-party service is degraded at the same time as an internal clinical-system disruption?', gap: 'Third-party dependency ownership needs clarification.' },
      { id: 'h9', category: 'AI/data boundary', text: 'Are boundaries explicit for what PHI, operational, and security data may be provided to AI-enabled tools or services?', gap: 'AI/data boundaries need verification.' }
    ],
    jabTitle: 'Use the result as a leadership agenda',
    jabIntro: 'For every Partial or Unclear answer, assign one accountable role, identify the evidence leadership expects to see, and name the next resilience exercise or decision that would close the gap.',
    hookTitle: 'Need an independent resilience review?',
    hookText: 'MJC can facilitate the exercise, perform an independent healthcare cybersecurity readiness review, or support leadership as a vCISO / Security SME.',
    helpLabel: 'Discuss healthcare resilience'
  },

  education_ai_trust_v1: {
    key: 'education_ai_trust_v1',
    mode: 'education',
    eyebrow: 'Education AI Trust Toolkit',
    title: 'How AI-ready is your school when the answer sounds confident but the evidence is weak?',
    intro: 'Use the Five-Question AI Trust Test first, then complete a short readiness diagnostic across governance, privacy, cybersecurity, academic integrity, evidence validation, human oversight, and leadership accountability.',
    warning: 'Do not enter student or education records, disciplinary/medical/disability information, credentials, protected identifiers, detailed network weaknesses, vulnerability outputs, or other sensitive school-security information.',
    trustTest: [
      'What material claim is the AI making?',
      'What evidence actually supports that claim?',
      'What evidence, context, or contradiction is missing?',
      'What happens if the recommendation is wrong?',
      'Which accountable human has authority to decide?' 
    ],
    options: [
      { value: 'established', label: 'Established', score: 0 },
      { value: 'developing', label: 'Developing', score: 1 },
      { value: 'priority', label: 'Priority Gap', score: 2 }
    ],
    questions: [
      { id: 'e1', category: 'Governance', text: 'AI use has a documented governance owner, decision authority, and escalation path.', gap: 'AI governance ownership and authority need strengthening.' },
      { id: 'e2', category: 'Student AI use', text: 'Students have clear, usable expectations for appropriate AI use.', gap: 'Student AI-use expectations need strengthening.' },
      { id: 'e3', category: 'Staff AI use', text: 'Faculty and staff have clear boundaries for AI-assisted work and decision making.', gap: 'Staff AI-use boundaries need strengthening.' },
      { id: 'e4', category: 'Privacy', text: 'The school has explicit FERPA-aware data-handling boundaries for AI tools and vendors.', gap: 'AI privacy and data-handling boundaries need strengthening.' },
      { id: 'e5', category: 'Cybersecurity', text: 'AI tools are introduced through a defined cybersecurity and vendor-risk process.', gap: 'AI cybersecurity/vendor-risk review needs strengthening.' },
      { id: 'e6', category: 'Academic integrity', text: 'Assessment design and academic-integrity expectations account for generative AI use.', gap: 'Academic-integrity and assessment practices need strengthening.' },
      { id: 'e7', category: 'Identity and access', text: 'Access to institutional AI tools follows appropriate identity, role, and lifecycle controls.', gap: 'AI identity/access controls need strengthening.' },
      { id: 'e8', category: 'Evidence validation', text: 'Students and staff are taught to validate AI claims, citations, and evidence rather than trust fluent output.', gap: 'Evidence-validation and hallucination awareness need strengthening.' },
      { id: 'e9', category: 'Human oversight', text: 'High-impact AI-assisted decisions have explicit human review and escalation requirements.', gap: 'Human oversight and escalation need strengthening.' },
      { id: 'e10', category: 'Executive accountability', text: 'School leadership or the board receives enough evidence to understand AI risk, ownership, and unresolved decisions.', gap: 'Executive/board accountability needs strengthening.' }
    ],
    jabTitle: 'Turn the diagnostic into a 30-day AI trust plan',
    jabIntro: 'Choose the three Priority or Developing domains with the highest consequence if wrong. Assign an owner, define the evidence of improvement, and schedule one decision review or tabletop exercise.',
    hookTitle: 'Want help turning AI use into defensible governance?',
    hookText: 'MJC can facilitate an AI Trust Strategy Session, governance workshop, or independent cybersecurity and AI governance assessment.',
    helpLabel: 'Discuss an AI Trust Strategy Session'
  }
};

export function getProfile(key) {
  return Object.prototype.hasOwnProperty.call(profiles, key) ? profiles[key] : null;
}
