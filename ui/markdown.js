
function renderDropdownMarkdown(branchname,filteredData){

      var setsDropDown = document.getElementById("feature-sets-dropdown");
        setsDropDown.innerHTML = "";
        filteredData?.forEach(function (item) {
          if( item === "log-verification.md") return 
          var option = document.createElement("option");
          const fileName = item?.split('.md')[0];
          option.text = fileName;
          setsDropDown.add(option);
        });
        renderMarkdown(branchname,filteredData[0]?.split('.md')[0]);
  }

function renderMarkdown(branchName,file) {
  fetch(
    `https://raw.githubusercontent.com/ONDC-Official/ONDC-FIS-Specifications/${branchName}/api/components/docs/${file}.md`
  )
    .then((response) => response.text())
    .then(async (text) => {
      const result =  await extractTextBetweenBackticks(text)
      //if mermaid diagram exist
      let createMermaid;
      if(result?.length){
        //const modifiedText = result[0].replace(/mermaid/g, '');
        createMermaid = await mermaid.render(`main-summary1`, result[1])
      }
      const removedMermaidData = text.replace(/```mermaid[\s\S]+?```/g, '');
      const textWithBranchName = removedMermaidData.replace(/branchName/g, branchName);
      const textData = marked.parse(textWithBranchName);

      document.getElementById("markdown-container").innerHTML = textData + (createMermaid?.svg ? createMermaid?.svg : '');
    });
}

function updateFeature() {
  var example_set = document.getElementById("feature-sets-dropdown");
  const selectedOption = document.getElementById("contract-dropdown")?.value;
  renderMarkdown(selectedOption,example_set.value);
}

function extractTextBetweenBackticks(inputString) {
  // const regex = /```([\s\S]*?)```/g;
  // const matches = inputString.match(regex);
  
  // if (matches) {
  //     return matches.map(match => match.replace(/```/g, ''));
  // } else {
  //     return [];
  // }
  const regex = /```mermaid\s*(.*?)\s*```/s;
  const matches = inputString.match(regex);

  if (matches && matches.length >= 2) {
    return matches
  } else {
    console.log("No mermaid data found.");
    return []
  }
}