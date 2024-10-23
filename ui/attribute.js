var attributes;

function updateAttribute() {
  var example_set = document.getElementById("attribute-dropdown");
  var selectedValue = example_set.value;
  document.querySelectorAll(".test").forEach((div) => div.remove());
  addAttributeSets(selectedValue);
}

function updateSetsAttribute() {
  var attributesDropDown = document.getElementById("attribute-dropdown");
  var example_set = document.getElementById("attribute-sets-dropdown");
  document.querySelectorAll(".test").forEach((div) => div.remove());
  var selectedValue = example_set.value;
  updateSets(attributesDropDown.value, selectedValue);
}

function loadAttributes(data) {
  console.log("data?", data);
  // To fix: attributes are getting appended to list on branch change.
  var elements = document.getElementsByClassName("test");
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
  attributes = data;
  var attributesDropDown = document.getElementById("attribute-dropdown");
  attributesDropDown.innerHTML = "";

  Object.keys(attributes).forEach(function (key) {
    var option = document.createElement("option");
    option.text = key;
    attributesDropDown.add(option);
  });
  const indexKey = Object.keys(attributes);
  addAttributeSets(indexKey[0]);

  console.log("done loading.........");

  const veriosnDropdown = document.getElementById("version-dropdown")
  const content = document.getElementById("content")
  const home = document.getElementById("home")
  const loader = document.getElementById("loader")

  veriosnDropdown.style.display = "block"
  content.style.display = "block"
  home.style.display = "none"
  loader.style.display = "none"

  const urlParams = new URLSearchParams(window.location.search);
  const tabId = urlParams.get('tabId');

  if(tabId) {
    const anchorTag = document.querySelector(`a[href="${tabId}"]`);
    anchorTag.click();
  } else {
    const anchorTag = document.querySelector(`a[href="#swagger"]`);
    anchorTag.click();
  }
}

function emptyAttributeTreeDiv() {
  var cmp = document.getElementById("tree-container")
  cmp.innerHTML = ""
}

function updateSets(value, option) {
  const object = attributes[value]?.attribute_set;
  emptyAttributeTreeDiv()
  localStorage.setItem("attributes", JSON.stringify(object[option]))
  displayAttributeTree(JSON.parse(JSON.stringify(object[option])))
  flattenObject(object[option],null,null,object[option]?.required_attributes);
}

function addAttributeSets(option) {
  const object = attributes[option]?.attribute_set;
  var setsDropDown = document.getElementById("attribute-sets-dropdown");
  setsDropDown.innerHTML = "";

  Object.keys(object).forEach(function (key) {
    var option = document.createElement("option");
    option.text = key;
    setsDropDown.add(option);
  });

  const firstKey = Object.keys(object)[0];
  const keyDetail = object[firstKey];
  const requiredAttr = 'required_attributes' in keyDetail
  emptyAttributeTreeDiv()
  localStorage.setItem("attributes", JSON.stringify(keyDetail))
  displayAttributeTree(JSON.parse(JSON.stringify(keyDetail)))
  flattenObject(keyDetail,null,null,keyDetail?.required_attributes);
}

function flattenObject(obj, prefix = "", result = {},requiredAttr) {
  if ("required" in obj) {
    var input = document.getElementById("attribute-search").value;
    var isSearchMatched = input
      ? prefix?.includes(input)
        ? true
        : false
      : true;

    if (
      isSearchMatched &&
      (requiredAttr === undefined || requiredAttr.includes(prefix))
    ) {
      var table = document.getElementById("tableset");
      const newRow = document.createElement("tr");
      newRow.classList.add("test");
      newRow.style.wordBreak = "break-all";
      const cell1 = document.createElement("td");
      const cell2 = document.createElement("td");
      const cell3 = document.createElement("td");
      const cell4 = document.createElement("td");
      const cell5 = document.createElement("td");
      const cell6 = document.createElement("td");

      cell1.textContent = prefix;
      cell2.textContent = obj["required"];
      cell3.textContent = obj["usage"];
      cell4.textContent = obj["owner"];
      cell5.textContent = obj["type"];
      cell6.textContent = obj["description"];

      newRow.appendChild(cell1);
      newRow.appendChild(cell2);
      newRow.appendChild(cell3);
      newRow.appendChild(cell4);
      newRow.appendChild(cell5);
      newRow.appendChild(cell6);

      table.appendChild(newRow);
    }

    if (Object.keys(obj).length === 5) {
      // return if only 5 keys are present (5 metadata keys)
      return;
    }
  }

  for (const key in obj) {
    if (typeof obj[key] === "string") {
      // pass for attribute metadata keys
      continue;
    }

    if (obj.hasOwnProperty(key) && key !== "required_attributes") {
      const newKey = prefix ? prefix + "." + key : key;
      if (Array.isArray(obj[key])) {
        result[newKey] = obj[key];
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        if (key !== "_description") {
          flattenObject(obj[key], newKey, result, requiredAttr);
        }
      } else {
        result[newKey] = obj[key];
      }
    }
  }

  return result;
}

function searchAttribute() {
  var table = document.getElementById("tableset");
  table.innerHTML = `<tr>
  <th>Attribute Path</th>
  <th>Required</th>
  <th>Sample Usage</th>
  <th>Owner</th>
  <th>Type</th>
  <th>Description</th>
  </tr>`;
  var attributeData = JSON.parse(localStorage.getItem("attributes"));
  flattenObject(attributeData);
}