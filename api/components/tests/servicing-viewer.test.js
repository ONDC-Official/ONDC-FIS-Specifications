const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

// Small DOM double for the viewer's node creation and selection contracts.
// Browser screenshots and interaction checks are performed separately.
function viewer(URLValue = 'http://localhost/') {
  const elements = [];
  function element(tag = 'div') {
    const classes = new Set();
    const node = { tag, children: [], attrs: {}, listeners: {}, textContent: '', value: '',
      appendChild(child) { this.children.push(child); return child; },
      replaceChildren() { this.children = []; },
      add(child) { this.appendChild(child); },
      setAttribute(key, value) { this.attrs[key] = value; },
      removeAttribute(key) { delete this.attrs[key]; },
      addEventListener(key, fn) { this.listeners[key] = fn; },
      click() { this.clicked = true; this.listeners.click?.({ preventDefault() {} }); },
      classList: { add(...values) { values.forEach(value => classes.add(value)); },
        toggle(value, on) { on ? classes.add(value) : classes.delete(value); },
        contains(value) { return classes.has(value); } },
    };
    elements.push(node);
    return node;
  }
  const byID = Object.fromEntries(['flow-summary', 'flow-description', 'flow-dropdown', 'flow-tab', 'attribute-tab']
    .map(id => [id, element()]));
  const panes = { '.step-pane': element(), '.content-pane': element() };
  const context = { URL, console, document: {
    createElement: element, getElementById: id => byID[id], querySelector: selector => panes[selector],
  }, window: { location: new URL(URLValue), bootstrap: {
    Tab: { getOrCreateInstance: tab => ({ show() { tab.clicked = true; } }) },
  }, history: {
    replaceState(_state, _title, value) { context.window.location = new URL(value); },
  }, addEventListener() {} }, mermaid: { render: async id => ({ svg: '<svg id="' + id + '"></svg>' }) } };
  vm.createContext(context);
  const repo = path.resolve(__dirname, '../../..');
  vm.runInContext(fs.readFileSync(path.join(repo, 'ui/flow.js'), 'utf8'), context);
  return { context, elements, byID, panes, repo };
}

test('all twelve servicing steps render payloads, no undefined SVG and an initial selected step', async () => {
  const ui = viewer();
  const text = fs.readFileSync(path.join(ui.repo, 'ui/build.js'), 'utf8');
  const built = JSON.parse(text.slice(text.indexOf('=') + 1));
  for (const flow of built['x-flows'].filter(f => /Term Loan (Pre-Part Payment|Foreclosure|Missed EMI Payment)$/.test(f.summary))) {
    ui.context.flows = [flow];
    await ui.context.loadFlow(flow.summary);
    const links = ui.panes['.step-pane'].children;
    const panels = ui.panes['.content-pane'].children;
    assert.equal(links.length, 4);
    assert.equal(links[0].attrs['aria-current'], 'step');
    assert.ok(panels[0].classList.contains('active'));
    for (const [index, panel] of panels.entries()) {
      const pre = panel.children.find(node => node.tag === 'pre');
      assert.deepEqual(JSON.parse(pre.textContent), flow.steps[index].example.value);
      assert.ok(pre.attrs['aria-label']);
      assert.equal(pre.tabIndex, 0);
      assert.ok(!panel.children.some(node => node.innerHTML?.includes('undefined')));
      links[index].click();
      assert.equal(links.filter(link => link.attrs['aria-current'] === 'step').length, 1);
      assert.ok(panel.classList.contains('active'));
      assert.equal(decodeURIComponent(ui.context.window.location.hash.slice(1)), flow.steps[index].summary);
      assert.equal(ui.context.window.location.searchParams.get('flowId'), flow.summary);
    }
  }
});

test('missing or failed diagrams keep descriptions and literal protocol JSON readable', async () => {
  const ui = viewer();
  const details = ui.panes['.content-pane'];
  await ui.context.renderFlowDetails(details, [{ description: 'No diagram' }], 'test');
  assert.equal(details.children.length, 1);
  assert.equal(details.children[0].textContent, '1) No diagram');
  ui.context.mermaid.render = async () => { throw new Error('CDN unavailable'); };
  await ui.context.renderFlowDetails(details, [{ description: 'With diagram', mermaid: 'sequenceDiagram' }], 'test');
  assert.match(details.children[2].textContent, /Diagram unavailable/);
  const payload = { value: '<literal>&example</literal>' };
  await ui.context.loadSteps([{ api: 'update', summary: 'Test', example: { value: payload } }], 'Test');
  const pre = ui.panes['.content-pane'].children[0].children.find(node => node.tag === 'pre');
  assert.equal(pre.textContent, JSON.stringify(payload, null, 2));
  assert.equal(pre.innerHTML, undefined);
});

test('flow and step deep links restore the correct selection', async () => {
  const ui = viewer('http://localhost/?flowId=Foreclosure#Success');
  ui.context.flows = [{ summary: 'Foreclosure', steps: [
    { api: 'on_confirm', summary: 'Start', example: { value: {} } },
    { api: 'on_update', summary: 'Success', example: { value: {} } },
  ] }];
  assert.equal(ui.context.restoreFlowSelection(), true);
  assert.equal(ui.byID['flow-dropdown'].value, 'Foreclosure');
  assert.equal(ui.panes['.step-pane'].children[1].attrs['aria-current'], 'step');
  assert.equal(ui.byID['flow-tab'].clicked, true);
  ui.context.window.location.hash = '#/Success';
  assert.equal(ui.context.readFlowStepFromURL(), 'Success');
  ui.context.window.location.hash = '#/Swagger/search';
  assert.equal(ui.context.restoreFlowSelection(), false, 'do not hijack Swagger tab fragments');
  ui.context.window.location.hash = '#%E0%A4%A';
  assert.equal(ui.context.readFlowStepFromURL(), '');
});

test('missing optional attributes do not abort error and TLC initialization', () => {
  const ui = viewer();
  const called = [];
  for (const name of ['initSchema', 'initTag', 'loadExample', 'loadFlows', 'loadErrors', 'loadTlc'])
    ui.context[name] = () => called.push(name);
  ui.context.loadAttributes = () => { throw new Error('Attributes are absent'); };
  vm.runInContext(fs.readFileSync(path.join(ui.repo, 'ui/tabs.js'), 'utf8'), ui.context);
  ui.context.onFirstLoad({});
  assert.ok(called.includes('loadErrors'));
  assert.ok(called.includes('loadTlc'));
  assert.equal(ui.byID['attribute-tab'].attrs['aria-disabled'], 'true');
});
