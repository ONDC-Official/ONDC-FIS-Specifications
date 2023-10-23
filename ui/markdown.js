async function fetchMarkdown(branchName) {
  try {
    const container = document.getElementById("markdown-container").innerHTML;
    const response = await fetch(
      `https://api.github.com/repos/ondc-official/ONDC-FIS-Specifications/contents/api/components/docs?ref=${branchName}`
    );
    const data = await response.json();
    if (data?.length == 0) container.innerHTML = "No files present";
    else {
      const filteredData = data?.filter((item) => item?.name.endsWith(".md"));
      if (filteredData.length == 0)
        container.innerHTML = "Markdown files not found";
      else {
    var setsDropDown = document.getElementById("feature-sets-dropdown");
        setsDropDown.innerHTML = "";
        filteredData?.forEach(function (item) {
          var option = document.createElement("option");
          option.text = item?.name;
          setsDropDown.add(option);
        });
        renderMarkdown(filteredData[0]?.name);
      }
    }
  } catch (error) {
    console.log("Error fetching contract", error?.message || error);
    document.getElementById("markdown-container").innerHTML = `Error while fetching files with branch ${branchName}`;
  }
}

function renderMarkdown(file) {
  fetch(
    `https://raw.githubusercontent.com/ONDC-Official/ONDC-FIS-Specifications/feat/markdown/api/components/docs/${file}`
  )
    .then((response) => response.text())
    .then((text) => {
      const html = marked.parse(text);
      document.getElementById("markdown-container").innerHTML = html;
    });
}

function updateFeature() {
  var example_set = document.getElementById("feature-sets-dropdown");
  renderMarkdown(example_set.value);
}

function upadteContract() {
  const selectedOption = document.getElementById("contract-dropdown")?.value;
  fetchMarkdown(selectedOption);
}

window.onload = function () {
  upadteContract();
};