
// tabs.js

function onFirstLoad(build_spec){
      let data = build_spec
      initSchema(data["x-enum"])
      initTag(data["x-tags"])
      loadExample(data["x-examples"])
      //addExample("on-demand")
      loadFlows(data["x-flows"])
      if (data["x-attributes"] && Object.keys(data["x-attributes"]).length) {
            loadAttributes(data["x-attributes"])
      } else {
            // BL does not publish this optional section; do not abort the rest of initialization.
            const tab = document.getElementById("attribute-tab")
            tab.classList.add("disabled")
            tab.setAttribute("aria-disabled", "true")
            tab.setAttribute("tabindex", "-1")
            tab.title = "No attribute definitions are published in this build."
      }
      loadErrors(data["x-errorcodes"])
      loadTlc(data["x-tlc"])
}

window.onload = function(){
      onFirstLoad(build_spec)
}
