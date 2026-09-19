import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const source=readFileSync(new URL('../site/ai-control-intelligence.html',import.meta.url),'utf8');
const built=readFileSync(new URL('../dist/ai-control-intelligence.html',import.meta.url),'utf8');

const prohibited=[
  'control-registry/',
  'private_control_text',
  'CS-CTRL-',
  'tools/control_registry_validate',
  'Aegis accepted artifact-integrity',
  'checkout',
  'payment',
  'Buy now',
  'purchase now',
  'subscribe now'
];

function walk(dir){
  const out=[];
  for(const name of readdirSync(dir)){
    const full=path.join(dir,name);
    if(statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

test('landing page preserves locked public product truth',()=>{
  for(const phrase of [
    'CyberShield AI Control Intelligence',
    'Governance Before Execution',
    'Authority',
    'Evidence',
    'Consequence',
    'Admissibility',
    'Execution',
    'Verification',
    'Record',
    'Future runtime-control capabilities are roadmap direction'
  ]) assert.ok(source.includes(phrase),`Missing required public message: ${phrase}`);
});

test('CTA is non-transactional and contains no commerce mechanism markers',()=>{
  assert.ok(source.includes('Discuss early access'));
  assert.ok(source.includes('does not create a purchase, subscription, or binding commercial commitment'));
  assert.ok(!/\$\s*\d|buy now|checkout|payment|payment processor|subscribe now/i.test(source));
});

test('private registry content is absent from source and exact built page',()=>{
  for(const marker of prohibited){
    assert.ok(!source.includes(marker),`Private/prohibited source marker leaked: ${marker}`);
    assert.ok(!built.includes(marker),`Private/prohibited built marker leaked: ${marker}`);
  }
});

test('built site contains no private registry source or sourcemap leakage',()=>{
  const files=walk(new URL('../dist/',import.meta.url).pathname);
  for(const file of files){
    const rel=path.relative(new URL('../dist/',import.meta.url).pathname,file).replaceAll('\\','/');
    assert.ok(!rel.includes('control-registry'),`Private registry path leaked to dist: ${rel}`);
    assert.ok(!rel.endsWith('.map'),`Source map prohibited in bounded page candidate: ${rel}`);
  }
});

test('page contains accessibility and responsive baseline',()=>{
  assert.match(source,/href="#main"/);
  assert.match(source,/<main id="main">/);
  assert.match(source,/@media\(max-width:900px\)/);
  assert.match(source,/@media\(max-width:560px\)/);
  assert.match(source,/:focus-visible/);
  assert.match(source,/aria-label="Authority to Record chain"/);
});

test('build output preserves canonical public page',()=>{
  assert.ok(built.includes('https://app.maximumjusticecybersecurity.com/ai-control-intelligence'));
  assert.ok(built.includes('CyberShield AI Control Intelligence'));
});
