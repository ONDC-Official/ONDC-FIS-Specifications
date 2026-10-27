// Rebuild the servicing extensions without overwriting the published BL API
// schemas with the older beckn-core submodule. The general app.js generator
// currently has unrelated source/schema drift and Master Search failures.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const yaml = require('js-yaml');
const RefParser = require('json-schema-ref-parser');

async function build() {
  const args = process.argv.slice(2);
  if (args.length && (args.length !== 2 || args[0] !== '--base-ref'))
    throw new Error('Usage: node build-term-loan-servicing.js [--base-ref <published-git-ref>]');
  const output = path.resolve(__dirname, '../build/build.yaml');
  const original = args.length
    ? execFileSync('git', ['show', `${args[1]}:api/build/build.yaml`], { cwd: __dirname, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 })
    : fs.readFileSync(output, 'utf8');
  const spec = yaml.load(original);
  const unchangedParts = value => JSON.stringify(Object.fromEntries(Object.entries(value)
    .filter(([key]) => !['x-flows', 'x-examples'].includes(key))));
  const before = unchangedParts(spec);
  const names = ['pre_part_payment', 'foreclosure', 'missed_emi_payment'];
  // Resolve once so flow and example references share the same objects/anchors.
  const layer = await RefParser.dereference(path.join(__dirname, 'index.yaml'));
  const flowNames = names.map(name => yaml.load(fs.readFileSync(
    path.join(__dirname, `flows/term-loan/${name}.yaml`), 'utf8')).summary);
  const flows = layer.flows.filter(flow => flowNames.includes(flow.summary));
  assert.equal(flows.length, names.length, 'servicing flow registration is incomplete');
  const summaries = new Set(flows.map(flow => flow.summary));
  const retainedFlows = spec['x-flows'].filter(flow => !summaries.has(flow.summary));
  spec['x-flows'] = [...retainedFlows, ...flows];
  const source = layer.examples['Business-Term-Loan'].example_set;
  const publishedExamples = spec['x-examples']['Business-Term-Loan'].example_set;
  for (const api of ['update', 'on_update']) publishedExamples[api] = source[api];
  const confirmation = source.on_confirm.examples.find(e => e.summary === 'Term Loan Confirmation Before Servicing');
  publishedExamples.on_confirm.examples = [
    ...publishedExamples.on_confirm.examples.filter(e => e.summary !== confirmation.summary),
    confirmation
  ];
  assert.equal(unchangedParts(spec), before, 'servicing build changed an unrelated API schema or extension');
  fs.writeFileSync(output, yaml.dump(spec));
  const viewer = structuredClone(spec);
  for (const entry of Object.values(viewer['x-examples'])) delete entry.example_set.form;
  fs.writeFileSync(path.resolve(__dirname, '../../ui/build.js'), 'let build_spec = ' + JSON.stringify(viewer));
  console.log(`Built ${flows.length} four-call term-loan servicing flows and 10 examples; preserved schemas and ${retainedFlows.length} other flows.`);
}

build().catch(error => { console.error(error); process.exitCode = 1; });
