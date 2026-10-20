import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');

test('authority page has canonical route, required executive model, and author identity',()=>{
  const html=read('site/ai-decision-assurance.html');
  assert.match(html,/rel="canonical" href="https:\/\/app\.maximumjusticecybersecurity\.com\/ai-decision-assurance"/);
  assert.match(html,/Can You Defend the AI Decision You Just Made\?/);
  assert.match(html,/Claims → Evidence → Consequences → Decision → Record/);
  assert.match(html,/Ten questions every CEO or board should ask/);
  assert.match(html,/Dr\. Max Justice/);
  assert.match(html,/vCISO, Security SME, Cybersecurity SME/);
  assert.match(html,/Challenge one consequential AI recommendation/i);
  assert.match(html,/AI Trust Decision Record/);
});

test('public claim boundaries remain qualified',()=>{
  const html=read('site/ai-decision-assurance.html');
  assert.match(html,/voluntary risk-management framework/i);
  assert.match(html,/petition for rulemaking/i);
  assert.match(html,/not an adopted SEC rule/i);
  assert.match(html,/December 2, 2027/);
  assert.match(html,/August 2, 2028/);
  assert.match(html,/must be revalidated immediately before production publication/i);
  assert.doesNotMatch(html,/AI governance is now a fiduciary obligation/i);
  assert.doesNotMatch(html,/CyberShield (certifies|guarantees|autonomously approves)/i);
});

test('executive handout is printable and includes all ten questions',()=>{
  const html=read('site/assets/decision-assurance/ceo-10-questions.html');
  assert.match(html,/Print \/ Save as PDF/);
  for(let n=1;n<=10;n++) assert.match(html,new RegExp('<strong>'+n+'\\.<\\/strong>'));
  assert.match(html,/Claims → Evidence → Consequences \/ Risk If Wrong → Decision → AI Trust Decision Record/);
});

test('discovery and routing converge on one authority URL',()=>{
  const sitemap=read('site/sitemap.xml');
  const llms=read('site/llms.txt');
  const home=read('site/index.html');
  const vercel=JSON.parse(read('vercel.json'));
  assert.match(sitemap,/https:\/\/app\.maximumjusticecybersecurity\.com\/ai-decision-assurance/);
  assert.match(llms,/Primary AI Decision Assurance authority page:/);
  assert.match(home,/href="\/ai-decision-assurance"/);
  assert.ok(vercel.rewrites.some(r=>r.source==='/ai-decision-assurance'&&r.destination==='/ai-decision-assurance.html'));
});

test('structured data includes Article Person Organization WebPage and BreadcrumbList',()=>{
  const html=read('site/ai-decision-assurance.html');
  for(const t of ['Article','Person','ProfessionalService','WebPage','BreadcrumbList']){
    assert.match(html,new RegExp('"@type":"'+t+'"'));
  }
  assert.match(html,/"datePublished":"2026-09-23"/);
  assert.match(html,/"dateModified":"2026-09-23"/);
});
