function renderChangeLogDropDown(branchname, filteredData) {
  console.log("here comes the data", branchname, filteredData);
  var setsDropDown = document.getElementById("change-log-dropdown");
  setsDropDown.innerHTML = "";
  filteredData?.forEach(function (item) {
    var option = document.createElement("option");
    const fileName = item?.split(".docx")[0];
    option.text = fileName;
    setsDropDown.add(option);
  });
  renderMarkdown(branchname, filteredData[0]);
}

function renderMarkdown(branchName, file) {
  if (!file) return;

  const dispalyArea = document.getElementById("change-log-container");

  dispalyArea.innerHTML = `
  <iframe style="width: 100%; height: 500px;" id="something" src="https://docs.google.com/gview?url=https://github.com/ONDC-Official/ONDC-FIS-Specifications/raw/${branchName}/api/components/docs/changeLog/${file}&embedded=true"></iframe>
  `;
}

function updateChangeLog() {
  var example_set = document.getElementById("feature-sets-dropdown");
  const selectedOption = document.getElementById("contract-dropdown")?.value;
  renderMarkdown(selectedOption, example_set.value);
}
