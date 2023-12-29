
function renderDropdownCases(branchname,filteredData){
  console.log('renderDropdownCases')
  filteredData?.forEach(function (item) {
    var option = document.createElement("option");
    const fileName = item?.split('.md')[0];
    option.text = fileName;
  });
  renderCases(branchname,filteredData[0]?.split('.md')[0]);
}

function renderCases(branchName,file) {
  console.log('branchName', branchName, file)
fetch(
`https://raw.githubusercontent.com/ondc-official/ONDC-FIS-Specifications/${branchName}/api/components/docs/${file}.md`
)
.then((response) => response.text())
.then((text) => {
const html = marked.parse(text);
console.log('html',html)
document.getElementById("logSubmission-container").innerHTML = html;
});
}