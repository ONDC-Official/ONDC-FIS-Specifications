// Flow viewer: diagrams are optional; protocol examples always remain readable.
var flows = [];
var flowRenderID = 0;

function readFlowStepFromURL() {
  // Swagger UI shares this page and normalizes fragments to #/..., including flow links.
  try { return decodeURIComponent(window.location.hash.slice(1)).replace(/^\/+/, ""); }
  catch { return ""; }
}

function flowStepURL(flowName, summary) {
  const URLValue = new URL(window.location.href);
  URLValue.searchParams.set("flowId", flowName);
  URLValue.hash = summary;
  return URLValue;
}

async function renderFlowDetails(container, details, prefix) {
  for (const [index, detail] of (details || []).entries()) {
    const description = document.createElement("p");
    description.textContent = (index + 1) + ") " + (detail.description || "");
    container.appendChild(description);
    if (!detail.mermaid) continue;
    const diagram = document.createElement("div");
    diagram.className = "flow-diagram";
    container.appendChild(diagram);
    try {
      const result = await mermaid.render(prefix + "-" + index, detail.mermaid.replace(/`/g, ""));
      diagram.innerHTML = result.svg || "";
    } catch {
      diagram.textContent = "Diagram unavailable. The protocol example remains available below.";
    }
  }
}

async function loadSteps(steps, flowName, selectedSummary, renderID) {
  const stepPane = document.querySelector(".step-pane");
  const contentPane = document.querySelector(".content-pane");
  stepPane.replaceChildren();
  contentPane.replaceChildren();
  const pending = [];
  const entries = [];
  function selectStep(entry, updateURL) {
    for (const current of entries) {
      current.link.classList.toggle("active", current === entry);
      current.content.classList.toggle("active", current === entry);
      if (current === entry) current.link.setAttribute("aria-current", "step");
      else current.link.removeAttribute("aria-current");
    }
    if (updateURL) window.history.replaceState(null, "", flowStepURL(flowName, entry.summary));
  }
  for (const [index, step] of (steps || []).entries()) {
    const link = document.createElement("a");
    link.href = flowStepURL(flowName, step.summary).href;
    link.classList.add("list-group-item", "list-group-item-action", "step-item");
    link.textContent = (index + 1) + ". " + step.api;
    link.setAttribute("aria-label", (index + 1) + ". " + step.api + ": " + step.summary);
    if (step.stepName) {
      link.appendChild(document.createElement("br"));
      const label = document.createElement("span");
      label.className = "step-space";
      label.textContent = step.stepName;
      link.appendChild(label);
    }
    const content = document.createElement("div");
    content.id = step.summary;
    content.classList.add("step-content", "p-4");
    const title = document.createElement("h3");
    title.textContent = step.summary;
    content.appendChild(title);
    const details = document.createElement("div");
    content.appendChild(details);
    pending.push(renderFlowDetails(details, step.details, "flow-" + renderID + "-step-" + index));
    const payload = document.createElement("pre");
    payload.className = "yaml-content";
    payload.tabIndex = 0;
    payload.setAttribute("aria-label", step.api + " protocol example");
    payload.textContent = step.api === "form" ? step.example.value : JSON.stringify(step.example.value, null, 2);
    content.appendChild(payload);
    if (step.api === "form") {
      const form = document.createElement("div");
      form.className = "flow-forms";
      form.innerHTML = step.example.value;
      content.appendChild(form);
    }
    const entry = { link, content, summary: step.summary };
    entries.push(entry);
    link.addEventListener("click", event => { event.preventDefault(); selectStep(entry, true); });
    stepPane.appendChild(link);
    contentPane.appendChild(content);
  }
  const selected = entries.find(entry => entry.summary === selectedSummary) || entries[0];
  if (selected) selectStep(selected, false);
  await Promise.all(pending);
}

function updateFlow() {
  const name = document.getElementById("flow-dropdown").value;
  const flow = flows.find(entry => entry.summary === name);
  if (!flow) return;
  window.history.replaceState(null, "", flowStepURL(name, flow.steps?.[0]?.summary || ""));
  return loadFlow(name);
}

async function loadFlow(flowName, selectedSummary) {
  const selectedFlow = flows.find(flow => flow.summary === flowName);
  if (!selectedFlow) return;
  const renderID = ++flowRenderID;
  document.getElementById("flow-dropdown").value = flowName;
  document.getElementById("flow-summary").textContent = selectedFlow.summary;
  const description = document.getElementById("flow-description");
  description.replaceChildren();
  // Attach a separate container so a slow old Mermaid render cannot overwrite a newer selection.
  const details = document.createElement("div");
  description.appendChild(details);
  await Promise.all([
    renderFlowDetails(details, selectedFlow.details, "flow-" + renderID + "-overview"),
    loadSteps(selectedFlow.steps, flowName, selectedSummary, renderID),
  ]);
}

function restoreFlowSelection(allowDefaultStep = false) {
  const requested = new URL(window.location.href).searchParams.get("flowId");
  const summary = readFlowStepFromURL();
  const flow = flows.find(entry => entry.summary === requested)
    || flows.find(entry => entry.steps?.some(step => step.summary === summary));
  // Swagger and Bootstrap also use fragments; only consume a known flow step.
  if (!flow || !allowDefaultStep && !flow.steps?.some(step => step.summary === summary)) return false;
  loadFlow(flow.summary, summary);
  const tab = document.getElementById("flow-tab");
  if (window.bootstrap?.Tab) {
    window.bootstrap.Tab.getOrCreateInstance(tab).show();
  } else {
    // Do not click the #flow anchor: its default navigation overwrites the step hash.
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.toggle("active", link === tab);
      link.setAttribute("aria-selected", link === tab ? "true" : "false");
    });
    document.querySelectorAll(".tab-pane").forEach(pane => {
      pane.classList.toggle("active", pane.id === "flow");
      pane.classList.toggle("show", pane.id === "flow");
    });
  }
  return true;
}

function loadFlows(data) {
  flows = data || [];
  const dropdown = document.getElementById("flow-dropdown");
  dropdown.replaceChildren();
  for (const flow of flows) {
    const option = document.createElement("option");
    option.text = flow.summary;
    dropdown.add(option);
  }
  if (!restoreFlowSelection(true) && flows.length) loadFlow(flows[0].summary);
}

window.addEventListener("hashchange", () => restoreFlowSelection());
window.addEventListener("popstate", () => restoreFlowSelection());
