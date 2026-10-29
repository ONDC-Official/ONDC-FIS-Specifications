const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const yaml = require('js-yaml');
const RefParser = require('json-schema-ref-parser');
const Ajv = require('ajv');
const formats = require('ajv-formats');
const { execFileSync } = require('node:child_process');
const { extendBLServicingSchema } = require('../term-loan-servicing-schema');
const root = path.resolve(__dirname, '..');
const read = p => yaml.load(fs.readFileSync(path.join(root, p), 'utf8'));
const confirmationPath = 'examples/term-loan/on_confirm/on_confirm_request_bureau_single_redirection.yaml';
const initial = read(confirmationPath);
const names = ['pre_part_payment', 'foreclosure', 'missed_emi_payment'];
const labels = ['PRE_PART_PAYMENT', 'FORECLOSURE', 'MISSED_EMI_PAYMENT'];
const fixture = (name, phase) => read('examples/term-loan/' + (phase === 'request' ? `update/update_request_${name}.yaml` : `on_update/on_update_${name}_${phase}.yaml`));
const validators = async (file, oldCore) => {
  const spec = await RefParser.dereference(path.join(root, file));
  if (oldCore) extendBLServicingSchema(spec);
  const ajv = new Ajv({ allErrors: true, strict: false });
  formats(ajv); ajv.addFormat('phone', true);
  if (!oldCore) require('ajv-errors')(ajv);
  return Object.fromEntries(['on_confirm', 'update', 'on_update'].map(api => [api,
    ajv.compile(spec.paths['/' + api].post.requestBody.content['application/json'].schema)]));
};
const schemas = Promise.all([validators('beckn_yaml.yaml', true), validators('../build/build.yaml', false)]);
const originalInstallments = initial.message.order.payments.filter(p => p.time.label === 'INSTALLMENT');

for (const [index, name] of names.entries()) {
  test(`${name} continues the original order and validates both contracts`, async () => {
    const [request, quote, success] = ['request', 'quote', 'success'].map(p => fixture(name, p));
    for (const v of await schemas) {
      for (const [api, payload] of [['on_confirm', initial], ['update', request], ['on_update', quote], ['on_update', success]])
        assert.equal(v[api](payload), true, `${api}: ${JSON.stringify(v[api].errors)}`);
    }
    assert.equal(request.message.update_target, 'payments');
    assert.equal(request.message.order.payments[0].time.label, labels[index]);
    assert.ok(request.message.order.payments.every(p => !('id' in p)));
    for (const payload of [request, quote, success]) {
      assert.equal(payload.context.domain, 'ONDC:FIS12:BL');
      assert.equal(payload.context.version, '2.3.0');
      assert.equal(payload.message.order.id, initial.message.order.id);
      for (const k of ['transaction_id', 'bap_id', 'bap_uri', 'bpp_id', 'bpp_uri']) assert.equal(payload.context[k], initial.context[k]);
    }
    assert.equal(request.context.message_id, quote.context.message_id);
    assert.notEqual(request.context.message_id, success.context.message_id);
    assert.ok(Date.parse(initial.context.timestamp) < Date.parse(request.context.timestamp));
    assert.ok(Date.parse(request.context.timestamp) < Date.parse(quote.context.timestamp));
    assert.ok(Date.parse(quote.context.timestamp) < Date.parse(success.context.timestamp));
    for (const payload of [quote, success]) {
      const o = payload.message.order, baseline = initial.message.order;
      for (const k of ['provider', 'items', 'documents', 'cancellation_terms', 'tags']) assert.deepEqual(o[k], baseline[k], k);
      assert.deepEqual(o.fulfillments[0].stops, baseline.fulfillments[0].stops);
      for (const key of ['PRINCIPAL_AMOUNT','INTEREST_AMOUNT','PROCESSING_FEE','OTHER_UPFRONT_CHARGES','INSURANCE_CHARGES','NET_DISBURSED_AMOUNT','OTHER_CHARGES'])
        assert.deepEqual(o.quote.breakup.find(b => b.title === key), baseline.quote.breakup.find(b => b.title === key));
      assert.equal(o.quote.id, baseline.quote.id);
      assert.ok(o.payments.every(p => !p.type || !p.type.includes('-')));
      assert.deepEqual(o.payments.find(p => p.time.label === 'LOAN_DISBURSMENT'), baseline.payments.find(p => p.time.label === 'LOAN_DISBURSMENT'));
    }
    const quoted = quote.message.order.payments.find(p => p.time.label === labels[index]);
    const paid = success.message.order.payments.find(p => p.time.label === labels[index]);
    assert.equal(quoted.status, 'NOT-PAID'); assert.equal(paid.status, 'PAID'); assert.equal(quoted.id, paid.id);
    assert.ok(quoted.url); assert.equal(paid.url, undefined); assert.ok(paid.params.transaction_id);
    assert.equal(success.message.order.status, name === 'foreclosure' ? 'COMPLETED' : 'ACTIVE');
    assert.equal(success.message.order.fulfillments[0].state.descriptor.code, name === 'foreclosure' ? 'COMPLETED' : 'DISBURSED');
    const after = success.message.order.payments.filter(p => p.time.label === 'INSTALLMENT');
    assert.equal(after.length, originalInstallments.length);
    for (const [i, p] of after.entries()) {
      let status = name === 'foreclosure' || i === 0 ? 'DEFERRED' : originalInstallments[i].status;
      assert.deepEqual(p, {...originalInstallments[i], status});
    }
    if (name === 'missed_emi_payment') {
      const overdue = quote.message.order.payments.filter(p => p.time.label === 'INSTALLMENT')[0];
      assert.deepEqual(overdue, {...originalInstallments[0], status:'DELAYED'});
      assert.deepEqual(quoted.time.range, overdue.time.range);
      const entries = quoted.tags[0].list;
      assert.equal(entries.reduce((sum, e) => sum + Number(e.value.split(' ')[0]), 0), Number(quoted.params.amount));
      assert.equal(quoted.params.amount, '46537');
    }
  });
}

test('registered flows use the exact earlier on_confirm and published examples match', () => {
  const built = read('../build/build.yaml');
  const viewer = JSON.parse(fs.readFileSync(path.join(root, '../../ui/build.js'), 'utf8').split('= ').slice(1).join('= '));
  assert.deepEqual(viewer['x-flows'], built['x-flows']);
  for (const name of names) {
    const flow = read(`flows/term-loan/${name}.yaml`);
    assert.deepEqual(flow.steps.map(s => s.api), ['on_confirm', 'update', 'on_update', 'on_update']);
    assert.equal(flow.steps[0].example.value.$ref, '../../' + confirmationPath);
    const published = built['x-flows'].find(f => f.summary === flow.summary);
    assert.deepEqual(published.steps[0].example.value, initial);
    for (const [i, phase] of ['request','quote','success'].entries()) assert.deepEqual(published.steps[i+1].example.value, fixture(name, phase));
  }
});

test('old-core extensions stay narrow, idempotent and reject unsupported values', async () => {
  const original = await RefParser.dereference(path.join(root,'beckn_yaml.yaml'));
  const before = structuredClone(original); extendBLServicingSchema(original);
  for (const api of Object.keys(before.paths).filter(k => !['/on_confirm','/on_update'].includes(k))) assert.deepEqual(original.paths[api], before.paths[api]);
  const once = structuredClone(original); extendBLServicingSchema(original); assert.deepEqual(original, once);
  for (const v of await schemas) {
    const invalid = structuredClone(fixture('foreclosure','success'));
    invalid.message.order.status = 'BOGUS'; assert.equal(v.on_update(invalid), false);
    invalid.message.order.status = 'COMPLETED'; invalid.message.order.payments[0].type = 'BOGUS'; assert.equal(v.on_update(invalid), false);
  }
});

test('servicing rebuild is deterministic', () => {
  const files = [path.join(root,'../build/build.yaml'),path.join(root,'../../ui/build.js')];
  const before = files.map(f => fs.readFileSync(f,'utf8'));
  execFileSync(process.execPath,[path.join(root,'build-term-loan-servicing.js')],{cwd:root});
  assert.deepEqual(files.map(f => fs.readFileSync(f,'utf8')),before);
});
