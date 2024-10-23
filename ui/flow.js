// flow.js

var flows;

async function loadSteps(steps) {
  const stepPane = document.querySelector(".step-pane");
  const contentPane = document.querySelector(".content-pane");
  stepPane.innerHTML = "";
  contentPane.innerHTML = "";
  for (const [index, step] of steps?.entries()) {
    const { details } = step || [];
    const link = document.createElement("a");
    link.href = "#" + step.summary;
    link.classList.add(
      "list-group-item",
      "list-group-item-action",
      "step-item"
    );
    link.textContent = index + 1 + ". " + step.api;

    const content = document.createElement("div");
    content.id = step.summary;
    content.classList.add("step-content", "p-4");

    var mermaidDiv = document.createElement("div");
    var yamlDiv = document.createElement("div");
    yamlDiv.classList.add("code-section");
    
    if (details && details?.length) {
      for (const [innerIndex, detail] of details.entries()) {
        var mermaidPane = document.createElement("div");
        const { description, mermaid: mermaidGraph } = detail;
        let result;
        if (mermaidGraph) {
          let removeBacktick = mermaidGraph?.replace(/`/g, "");
          result = await mermaid.render(`summary${index}`, removeBacktick);
        }
        const { svg } = result || ''
        mermaidPane.innerHTML =
          "<p>" +
          `${innerIndex + 1}) ${description}` +
          "<p>" +
          "<p>" +
          (svg || '') +
          "<p>";

        mermaidDiv.appendChild(mermaidPane);
      }
    }

    const copyButton = document.createElement("div");
    copyButton.classList.add("copy-code-button");
    copyButton.style.backgroundImage = 'url("icons/icon-copy.png")';

    copyButton.addEventListener("click", function (event) {
      event.preventDefault();
      const textArea = document.createElement("textarea");
      textArea.value = JSON.stringify(step.example.value, null, 2);
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      copyButton.style.backgroundImage = 'url("icons/icon-tick.png")';
      setTimeout(() => {
        copyButton.style.backgroundImage = 'url("icons/icon-copy.png")';
      }, 2000)
    });
    // yamlDiv.innerHTML =
    //   '<pre class="yaml-content">' +
    //   (step?.api === "form" ? step.example.value : JSON.stringify(step.example.value, null, 2)) +
    //   "</pre>";
    yamlDiv.innerHTML = step?.api === "form" ? '<div>'+'<pre class="yaml-content">'+'<xmp>'+step.example.value+'</xmp>'+'</pre>'+'<div class="flow-forms">'+step.example.value+'</div>'+'</div>'
      :'<pre class="yaml-content">' +
       JSON.stringify(step.example.value, null, 2) +
      "</pre>";
    content.innerHTML = "<div>" + "<h3>" + step.summary + "</h3>" + "</div>";

    // if(step?.api === "form") {
    //   yamlDiv.innerHTML = '<div>'+'<pre class="yaml-content">'+'<xmp>'+step.example.value+'</xmp>'+'</pre>'+'<div class="flow-forms">'+step.example.value+'</div>'+'</div>'
    // } else {
    //   const formatter = new JSONFormatter(step.example.value, Infinity);
    //   yamlDiv.appendChild(formatter.render());
    // }
    content.appendChild(mermaidDiv);
    content.appendChild(yamlDiv);
    yamlDiv.appendChild(copyButton);

    yamlDiv.appendChild(copyButton);

    link.addEventListener("click", function (event) {
      event.preventDefault();
      document.querySelectorAll(".step-item").forEach(function (item) {
        item.classList.remove("active");
      });
      document.querySelectorAll(".step-content").forEach(function (content) {
        content.classList.remove("active");
      });
      link.classList.add("active");
      content.classList.add("active");

      const url = new URL(window.location);
      url.searchParams.set('callId', link.getAttribute('href'));
      window.history.pushState({}, '', url);
    });
    stepPane.appendChild(link);
    contentPane.appendChild(content);
  }
  const urlParams = new URLSearchParams(window.location.search);
  const callId = urlParams.get('callId');

  if(callId) {
    const anchorTag = document.querySelector(`a[href="${callId}"]`);
    anchorTag.click();
  }
}







function updateFlow() {
  var flowDropdown = document.getElementById("flow-dropdown");
  var selectedValue = flowDropdown.value;

  const url = new URL(window.location);
  url.searchParams.set('flowId', selectedValue);
  window.history.pushState({}, '', url);

  loadFlow(selectedValue);
}

async function loadFlow(flowName) {
  const flowSummary = document.getElementById("flow-summary");
  const flowDescription = document.getElementById("flow-description");
  flowSummary.innerHTML = "";
  flowDescription.innerHTML = "";
  let selectedFlow = flows.find((obj) => {
    if (obj["summary"] === flowName) return obj;
  });
  flowSummary.textContent = selectedFlow["summary"];
  // flowDescription.textContent = selectedFlow["details"]
  var mermaidDiv = document.createElement("description-div");
  if (selectedFlow?.["details"]) {
    for (const [index, detail] of selectedFlow["details"].entries()) {
      var mermaidPane = document.createElement("description-summary");
      const { description, mermaid: mermaidGraph } = detail;
      let result;
      if (mermaidGraph) {
        let removeBacktick = mermaidGraph?.replace(/`/g, "");
        result = await mermaid.render(`main-summary${index}`, removeBacktick);
      }
      const { svg } = result || ''
      mermaidPane.innerHTML =
        "<p>" + `${index + 1}) ${description}` + "<p>" + "<p>" + (svg || '') + "<p>";

      mermaidDiv.appendChild(mermaidPane);
    }
    //flowDescription.textContent.appendChild(mermaidDiv)
  }
  flowDescription.append(mermaidDiv);
  loadSteps(selectedFlow["steps"]);
}

function loadFlows(data) {
  flows = data;
  const flowDropdown = document.getElementById("flow-dropdown");
  flowDropdown.innerHTML = "";

  const urlParams = new URLSearchParams(window.location.search);
  const flowID = urlParams.get('flowId');

  // Render the steps list
  flows.forEach((flow, index) => {
    if(index === 0 && !flowID) {
      const url = new URL(window.location);
      url.searchParams.set('flowId', flow.summary);
      window.history.pushState({}, '', url);
    }
    var option = document.createElement("option");
    option.text = flow.summary;
    flowDropdown.add(option);
  });

  if(flowID) {
    loadFlow(flowID)
  } else {
    loadFlow(flows[0].summary);
  }
}