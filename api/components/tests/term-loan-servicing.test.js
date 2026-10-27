const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const yaml = require('js-yaml');
const RefParser = require('json-schema-ref-parser');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { execFileSync } = require('node:child_process');
const { extendBLServicingSchema } = require('../term-loan-servicing-schema');

const root = path.resolve(__dirname, '..');
const read = file => yaml.load(fs.readFileSync(path.join(root, file), 'utf8'));
const names = ['pre_part_payment', 'foreclosure', 'missed_emi_payment'];
const labels = ['PRE_PART_PAYMENT', 'FORECLOSURE', 'MISSED_EMI_PAYMENT'];
const expectedAmounts = ['15177.00', '62016.00', '30777.00'];
const expectedLoanTotals = ['91752.00', '92916.00', '91977.00'];
const schemas = RefParser.dereference(path.join(root, 'beckn_yaml.yaml')).then(spec => {
  extendBLServicingSchema(spec);
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  ajv.addFormat('phone', true);
  return Object.fromEntries(['on_confirm', 'update', 'on_update'].map(api => [api,
    ajv.compile(spec.paths['/' + api].post.requestBody.content['application/json'].schema)]));
});
const publishedSchemas = RefParser.dereference(path.join(root, '../build/build.yaml')).then(spec => {
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  ajv.addFormat('phone', true);
  require('ajv-errors')(ajv);
  return Object.fromEntries(['on_confirm', 'update', 'on_update'].map(api => [api,
    ajv.compile(spec.paths['/' + api].post.requestBody.content['application/json'].schema)]));
});
const fixture = (name, phase) => read('examples/term-loan/' + (phase === 'request'
  ? `update/update_request_${name}.yaml` : `on_update/on_update_${name}_${phase}.yaml`));
const minor = value => {
  assert.match(value, /^\d+\.\d{2}$/);
  return BigInt(value.replace('.', ''));
};

for (const [index, name] of names.entries()) {
  test(`${name} preserves BL schema, correlation and verified-payment semantics`, async () => {
    const validators = await schemas;
    const publishedValidators = await publishedSchemas;
    const request = fixture(name, 'request');
    const quote = fixture(name, 'quote');
    const success = fixture(name, 'success');
    const first = request.message.order.payments[0];
    for (const [phase, example] of [['request', request], ['quote', quote], ['success', success]]) {
      const api = phase === 'request' ? 'update' : 'on_update';
      assert.equal(validators[api](example), true, JSON.stringify(validators[api].errors));
      assert.equal(publishedValidators[api](example), true, JSON.stringify(publishedValidators[api].errors));
      assert.equal(example.context.domain, 'ONDC:FIS12:BL');
      assert.equal(example.context.version, '2.3.0');
      assert.equal(example.context.action, api);
      assert.equal(example.context.ttl, 'PT30M');
      assert.equal(example.context.transaction_id, request.context.transaction_id);
      assert.equal(example.message.order.id, request.message.order.id);
      for (const key of ['bap_id', 'bap_uri', 'bpp_id', 'bpp_uri'])
        assert.equal(example.context[key], request.context[key]);
      const payment = example.message.order.payments.find(p => p.id === first.id);
      assert.ok(payment);
      assert.equal(payment.time.label, labels[index]);
      assert.equal(new Set(example.message.order.payments.map(p => p.id)).size,
        example.message.order.payments.length, 'duplicate payment IDs');
      assert.ok(!JSON.stringify(example).includes('PERSONAL_LOAN'));
      assert.ok(!JSON.stringify(example).includes('LAMF'));
    }
    assert.equal(request.message.update_target, 'payments');
    assert.equal(quote.context.message_id, request.context.message_id, 'solicited quote correlation');
    assert.notEqual(success.context.message_id, request.context.message_id, 'unsolicited receipt needs fresh ID');
    assert.ok(Date.parse(quote.context.timestamp) > Date.parse(request.context.timestamp));
    assert.ok(Date.parse(success.context.timestamp) > Date.parse(quote.context.timestamp));
    for (const example of [quote, success]) {
      const order = example.message.order;
      const payment = order.payments.find(p => p.id === first.id);
      assert.equal(payment.params.amount, expectedAmounts[index]);
      assert.equal(payment.params.currency, 'INR');
      assert.equal(order.quote.price.value, expectedLoanTotals[index]);
      assert.equal(order.quote.breakup.reduce((n, b) => n + minor(b.price.value), 0n), minor(order.quote.price.value));
      assert.equal(order.quote.breakup.find(b => b.title === 'PRINCIPAL_AMOUNT').price.value, '90000.00');
      assert.equal(order.quote.ttl, 'PT15M');
      assert.equal(order.items[0].descriptor.code, 'LOAN');
      assert.deepEqual(order.items[0].category_ids, ['101124', '101117', '101211']);
      assert.deepEqual(order.items[0].fulfillment_ids, ['F7']);
      assert.equal(order.items[0].price.value, order.quote.price.value);
      assert.deepEqual(order.provider.tags.map(t => t.descriptor.code), ['CONTACT_INFO', 'LSP_INFO']);
      assert.ok(order.fulfillments.every(f => f.type && f.stops.every(s => s.id && s.type && s.instructions.code === 'COMPLETED')));
      assert.equal(order.status, name === 'foreclosure' && example === success ? 'COMPLETE' : 'ACTIVE');
    }
    assert.equal(success.message.order.quote.id, quote.message.order.quote.id);
    assert.equal(success.message.order.payments.filter(p => p.status !== 'DEFERRED').reduce((n, p) => n + minor(p.params.amount), 0n),
      minor(success.message.order.quote.price.value), 'receipts and collectible future repayments must match the amended loan total; deferred history is not a second collection');
    assert.deepEqual(success.message.order.provider, quote.message.order.provider);
    assert.deepEqual(success.message.order.items, quote.message.order.items);
    const quotedPayment = quote.message.order.payments.find(p => p.id === first.id);
    const receipt = success.message.order.payments.find(p => p.id === first.id);
    assert.equal(quotedPayment.status, 'NOT-PAID');
    assert.equal(receipt.status, 'PAID');
    assert.equal(receipt.url, undefined, 'paid receipt must not solicit another collection');
    assert.ok(receipt.params.transaction_id);
    assert.ok(receipt.time.timestamp);
    const url = new URL(quotedPayment.url);
    assert.equal(url.protocol, 'https:');
    assert.equal(url.searchParams.get('transaction_id'), request.context.transaction_id);
    assert.equal(url.searchParams.get('amount'), quotedPayment.params.amount);
    const serialized = JSON.stringify(success);
    for (const privateField of ['installment_numbers', 'payment_screenshot_url', 'celestium_loan_id', 'BRE_EVALUATION'])
      assert.ok(!serialized.includes(privateField), 'private lender webhook field leaked');
  });
}

test('opening on_confirm validates and establishes the original loan for every servicing flow', async () => {
  const confirmation = read('examples/term-loan/on_confirm/on_confirm_servicing_loan.yaml');
  for (const validators of [await schemas, await publishedSchemas])
    assert.equal(validators.on_confirm(confirmation), true, JSON.stringify(validators.on_confirm.errors));
  assert.equal(confirmation.context.action, 'on_confirm');
  assert.equal(confirmation.context.domain, 'ONDC:FIS12:BL');
  assert.equal(confirmation.context.version, '2.3.0');
  const original = confirmation.message.order;
  assert.equal(original.status, 'ACTIVE');
  assert.equal(original.fulfillments[0].state.descriptor.code, 'DISBURSED');
  assert.equal(original.quote.price.value, '91800.00');
  assert.equal(original.payments.reduce((n, p) => n + minor(p.params.amount), 0n), minor(original.quote.price.value));
  assert.ok(original.payments.every(p => p.status === 'NOT-PAID' && p.time.label === 'INSTALLMENT'));
  assert.equal(original.quote.breakup.reduce((n, b) => n + minor(b.price.value), 0n), minor(original.quote.price.value));
  const examples = read('examples/term-loan/index.yaml');
  assert.ok(examples.on_confirm.examples.some(e =>
    e.value.$ref === './on_confirm/on_confirm_servicing_loan.yaml'));
  for (const name of names) {
    const request = fixture(name, 'request');
    const quote = fixture(name, 'quote').message.order;
    assert.ok(Date.parse(confirmation.context.timestamp) < Date.parse(request.context.timestamp));
    assert.notEqual(confirmation.context.message_id, request.context.message_id);
    for (const key of ['transaction_id', 'bap_id', 'bap_uri', 'bpp_id', 'bpp_uri'])
      assert.equal(confirmation.context[key], request.context[key]);
    assert.equal(original.id, request.message.order.id);
    assert.deepEqual(original.provider, quote.provider);
    assert.deepEqual(original.items.map(i => [i.id, i.parent_item_id, i.category_ids, i.fulfillment_ids]),
      quote.items.map(i => [i.id, i.parent_item_id, i.category_ids, i.fulfillment_ids]));
    assert.deepEqual(original.payments.map(p => p.id).sort(),
      quote.payments.filter(p => p.id.startsWith('BL-INSTALLMENT-')).map(p => p.id).sort());
  }
});

test('pre-part updates remaining principal and the lender-approved schedule', () => {
  const order = fixture('pre_part_payment', 'success').message.order;
  const unpaid = order.payments.filter(p => p.status === 'NOT-PAID');
  assert.deepEqual(unpaid.map(p => p.params.amount), ['22950.00', '22725.00']);
  const principals = unpaid.map(p => p.tags.find(t => t.descriptor.code === 'BREAKUP').list
    .find(t => t.descriptor.code === 'PRINCIPAL_AMOUNT').value.split(' ')[0]);
  assert.equal(principals.reduce((n, p) => n + minor(p), 0n), 4500000n);
});

test('missed EMI uses the original installment ID once and preserves its due date', () => {
  const request = fixture('missed_emi_payment', 'request');
  for (const phase of ['quote', 'success']) {
    const order = fixture('missed_emi_payment', phase).message.order;
    assert.equal(order.payments.filter(p => p.id === 'BL-INSTALLMENT-2').length, 1);
    assert.deepEqual(order.payments[0].time.range, request.message.order.payments[0].time.range);
    assert.equal(order.payments.find(p => p.id === 'BL-INSTALLMENT-3').status, 'NOT-PAID');
  }
});

test('verified foreclosure closes the same loan and leaves no collectible future installments', () => {
  const before = fixture('foreclosure', 'quote').message.order;
  const order = fixture('foreclosure', 'success').message.order;
  assert.equal(order.status, 'COMPLETE');
  assert.equal(order.fulfillments[0].state.descriptor.code, 'COMPLETED');
  assert.deepEqual(order.payments.map(p => p.id), before.payments.map(p => p.id));
  const installments = before.payments.filter(p => p.time.label === 'INSTALLMENT');
  for (const original of installments) {
    const expected = original.status === 'PAID' ? original : { ...original, status: 'DEFERRED' };
    assert.deepEqual(order.payments.find(p => p.id === original.id), expected,
      'retain original installment identity, dates, amounts and breakup; only unpaid status changes');
  }
  assert.deepEqual(order.payments.filter(p => p.status === 'DEFERRED').map(p => p.id),
    ['BL-INSTALLMENT-2', 'BL-INSTALLMENT-3']);
  assert.ok(!order.payments.some(p => p.status === 'NOT-PAID'));
  assert.ok(order.payments.filter(p => p.status === 'DEFERRED').every(p => !p.url && !p.params.transaction_id && !p.time.timestamp));
});

test('DEFERRED extends only the old-core on_update payment enum and rejects unknown statuses', async () => {
  const core = await RefParser.dereference(path.join(root, 'beckn_yaml.yaml'));
  const before = structuredClone(core);
  const statusFor = spec => spec.paths['/on_update'].post.requestBody.content['application/json']
    .schema.properties.message.properties.order.properties.payments.items.properties.status;
  assert.deepEqual(statusFor(core).enum, ['PAID', 'NOT-PAID']);
  const registry = read('enum/default/index.yaml');
  assert.ok(JSON.stringify(registry).includes('"DEFERRED"'));
  extendBLServicingSchema(core);
  assert.deepEqual(statusFor(core).enum, ['PAID', 'NOT-PAID', 'DEFERRED']);
  const published = await RefParser.dereference(path.join(root, '../build/build.yaml'));
  assert.ok(statusFor(published).enum.includes('DEFERRED'));
  for (const api of Object.keys(before.paths).filter(api => api !== '/on_update'))
    assert.deepEqual(core.paths[api], before.paths[api], 'unrelated API changed: ' + api);
  const once = structuredClone(core);
  extendBLServicingSchema(core);
  assert.deepEqual(core, once);
  const invalid = structuredClone(fixture('foreclosure', 'success'));
  invalid.message.order.payments[2].status = 'WAIVED';
  for (const validators of [await schemas, await publishedSchemas])
    assert.equal(validators.on_update(invalid), false, 'do not allow arbitrary payment statuses');
});

test('flows and example indexes publish all ten servicing examples in PL four-call order', () => {
  const flows = read('flows/index.yaml');
  const examples = read('examples/term-loan/index.yaml');
  for (const name of names) {
    assert.ok(flows.some(f => f.$ref === `./term-loan/${name}.yaml`));
    const flow = read(`flows/term-loan/${name}.yaml`);
    assert.deepEqual(flow.steps.map(s => s.api), ['on_confirm', 'update', 'on_update', 'on_update']);
    for (const step of flow.steps) {
      const target = path.resolve(root, 'flows/term-loan', step.example.value.$ref);
      assert.ok(fs.existsSync(target));
      const example = yaml.load(fs.readFileSync(target, 'utf8'));
      assert.equal(example.context.action, step.api);
    }
    assert.ok(examples.update.examples.some(e => e.value.$ref === `./update/update_request_${name}.yaml`));
    for (const phase of ['quote', 'success'])
      assert.ok(examples.on_update.examples.some(e => e.value.$ref === `./on_update/on_update_${name}_${phase}.yaml`));
  }
});

test('published YAML and Flow UI contain the same servicing examples', () => {
  const built = read('../build/build.yaml');
  const viewerText = fs.readFileSync(path.join(root, '../../ui/build.js'), 'utf8');
  const viewer = JSON.parse(viewerText.slice(viewerText.indexOf('=') + 1));
  const registered = read('flows/index.yaml');
  assert.equal(built['x-flows'].length, registered.length);
  assert.deepEqual(viewer['x-flows'], built['x-flows']);
  for (const name of names) {
    const flow = read(`flows/term-loan/${name}.yaml`);
    const published = built['x-flows'].find(f => f.summary === flow.summary);
    assert.ok(published);
    for (const [i, phase] of ['request', 'quote', 'success'].entries())
      assert.deepEqual(published.steps[i + 1].example.value, fixture(name, phase));
    assert.deepEqual(published.steps[0].example.value,
      read('examples/term-loan/on_confirm/on_confirm_servicing_loan.yaml'));
  }
  assert.equal(built['x-examples']['Business-Term-Loan'].example_set.update.examples.length, 3);
  assert.equal(built['x-examples']['Business-Term-Loan'].example_set.on_update.examples.length, 6);
});

test('servicing rebuild is deterministic and preserves schemas and other origination flows', () => {
  const output = path.join(root, '../build/build.yaml');
  const viewer = path.join(root, '../../ui/build.js');
  const before = fs.readFileSync(output, 'utf8');
  const viewerBefore = fs.readFileSync(viewer, 'utf8');
  execFileSync(process.execPath, [path.join(root, 'build-term-loan-servicing.js')], { cwd: root });
  assert.equal(fs.readFileSync(output, 'utf8'), before);
  assert.equal(fs.readFileSync(viewer, 'utf8'), viewerBefore);
});
