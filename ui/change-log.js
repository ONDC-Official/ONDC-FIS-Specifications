function renderChangeLogDropDown(branchname, filteredData) {
  var setsDropDown = document.getElementById("change-log-dropdown");
  setsDropDown.innerHTML = "";
  filteredData?.forEach(function (item) {
    var option = document.createElement("option");
    const fileName = item?.split(".docx")[0];
    option.text = fileName;
    setsDropDown.add(option);
  });
  renderDocument(branchname, filteredData[0]?.split(".docx")[0]);
}

function renderDocument(branchName, file) {
  const documentDispalyArea = document.getElementById("change-log-container");
  documentDispalyArea.innerHTML = "";
  documentDispalyArea.innerHTML = `
  <iframe style="width: 100%; height: 500px;" id="something" src="https://docs.google.com/gview?url=https://github.com/ONDC-Official/ONDC-FIS-Specifications/raw/${branchName}/api/components/docs/changeLog/${file}.docx&embedded=true"></iframe>
  `;
}

function updateChangeLog() {
  var example_set = document.getElementById("change-log-dropdown");
  const selectedOption = document.getElementById("contract-dropdown")?.value;
  renderDocument(selectedOption, example_set.value);
}
