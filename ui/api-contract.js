const REPO = "ONDC-Official/ONDC-FIS-Specifications";

function getStringAfterEquals(inputString) {
  const index = inputString.indexOf("=");
  if (index !== -1) {
    return inputString.slice(index + 1).trim();
  } else {
    return "";
  }
}

// Read the use-case status (info.status) straight from a branch's built spec.
// Only the head of build.yaml (before `paths:`) is parsed, which holds the info block.
async function fetchBranchStatus(branchCode) {
  try {
    const url = `https://raw.githubusercontent.com/${REPO}/${branchCode}/api/build/build.yaml`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const text = await res.text();
    const head = text.split(/\npaths:/)[0];
    const spec = jsyaml.load(head);
    return spec?.info?.branch_status || null;
  } catch (error) {
    console.log("Error fetching status for", branchCode, error?.message || error);
    return null;
  }
}

async function readBuildFile(branchName) {
  if (!branchName) return;
  const url = `https://api.github.com/repos/ondc-official/ONDC-FIS-Specifications/contents/ui/build.js?ref=${branchName}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "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",
      },
    });
    const formattedResponse = await response?.json();

    /*
      For larger build.js files > 1mb,
      the github api is returning empty for content key,
      sol: reading data from download_url
    */

     
    // let splitedText = atob(formattedResponse?.content);
    // build_spec = JSON.parse(getStringAfterEquals(splitedText));
    // onFirstLoad(build_spec);
    
    // if(formattedResponse?.download_url){
    //   setTimeout(async ()=>{
    //     const rawResponse = await fetch(formattedResponse.download_url, {
    //       // headers: {
    //       //   Authorization: "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",
    //       // },
    //     });
    //     const formattedrawResponse = await rawResponse?.text();
    //     build_spec = JSON.parse(getStringAfterEquals(formattedrawResponse));
    //     onFirstLoad(build_spec);
    //   },1200)
    // }
    // else{
    //   const urlWithoutQuery = window.location.origin + window.location.pathname;
    //   window.history.replaceState(null, '', urlWithoutQuery);
    //   const home = document.getElementById("home")
    //   const loader = document.getElementById("loader")
    //   home.style.display = "block"
    //   loader.style.display = "none"
    // }
     if(formattedResponse?.git_url){
      setTimeout(async ()=>{
        const rawResponse = await fetch(formattedResponse.git_url, {
          // headers: {
          //   Authorization: "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",
          // },
        });
        let formattedrawResponse = await rawResponse?.text();
        formattedrawResponse =  JSON.parse(formattedrawResponse)
        let splitedText = atob(formattedrawResponse?.content);
        build_spec = JSON.parse(getStringAfterEquals(splitedText));
        onFirstLoad(build_spec);
      },1200)
    }
    else{
      const urlWithoutQuery = window.location.origin + window.location.pathname;
      window.history.replaceState(null, '', urlWithoutQuery);
      const home = document.getElementById("home")
      const loader = document.getElementById("loader")
      home.style.display = "block"
      loader.style.display = "none"
    }

   
  } catch (error) {
    console.log("Error fetching contract", error?.message || error);
    //alert('Something went wrong, Please try again later')
  }
}

async function fetchRequest(url){
  try{
    const response = await fetch(url, {
      headers: {
        Authorization: "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",
      },
    });
    return await response?.json();
  }catch{
    console.log("Error fetching contract", error?.message || error);
  }
}

async function fetchBranches() {
  try {
  const BRANCHES_URL= "https://api.github.com/repos/ondc-official/ONDC-FIS-Specifications/branches?per_page=100&page=1";
  const TAGS_URL= "https://api.github.com/repos/ondc-official/ONDC-FIS-Specifications/tags";
                  
  let response1, response2;
  response1 = await fetchRequest(BRANCHES_URL)
  response2 = await fetchRequest(TAGS_URL)
  const response = [...response1,...response2]

  return response
  } catch(e) {
    console.log("Error while fetching branches")
  }
}

async function loadContracts() {
  //fetch branches & tags from repo
  const response = await fetchBranches()

  const selectedOption = document.getElementById("contract-dropdown");
  selectedOption.innerHTML = "";
  
  const urlParams = new URLSearchParams(window.location.search);
  const branchName = urlParams.get('branch');

  response.forEach((flow, index) => {
    if(index === 0 && !branchName) {
      const url = new URL(window.location);
      url.searchParams.set('branch', flow.name);
      window.history.pushState({}, '', url);
    }
    var option = document.createElement("option");
    option.text = flow.name;
    selectedOption.add(option);
  });

  if(branchName) {
    document.getElementById("contract-dropdown").value = branchName
    const url = new URL(window.location);
    url.searchParams.set('branch', branchName);
    window.history.pushState({}, '', url);
  }
  readBuildFile(response[0]?.name);
}

function upadteContract() {
  const selectedOption = document.getElementById("contract-dropdown")?.value;

  const urlWithoutQuery = window.location.origin + window.location.pathname;
  window.history.replaceState(null, '', urlWithoutQuery);

  const url = new URL(window.location);
  url.searchParams.set('branch', selectedOption);
  gtag("event", "protocol", {
    use_case: selectedOption,
    page_location: window.location.href
  });
  window.history.pushState({}, '', url);

  init()
}

function toggleHomePage() {
  const veriosnDropdown = document.getElementById("version-dropdown")
  const content = document.getElementById("content")
  const home = document.getElementById("home")
  const loader = document.getElementById("loader")

  veriosnDropdown.style.display = "none"
  content.style.display = "none"
  home.style.display = "block"
  loader.style.display = "none"

  const urlWithoutQuery = window.location.origin + window.location.pathname;
  window.history.replaceState(null, '', urlWithoutQuery);
  renderBranchesTable()
}


function resolveHomePage(branch, tab) {
  const url = new URL(window.location);
  url.searchParams.set('branch', branch);
  
  if(tab) {
    url.searchParams.set('tabId', tab);
  }
  
  window.history.pushState({}, '', url);

  const veriosnDropdown = document.getElementById("version-dropdown")
  const content = document.getElementById("content")
  const home = document.getElementById("home")
  const loader = document.getElementById("loader")

  veriosnDropdown.style.display = "block"
  content.style.display = "none"
  home.style.display = "none"
  loader.style.display = "flex"

  document.getElementById("contract-dropdown").value = branch
  readBuildFile(branch)
}

function tabClicked(tab) {
  const url = new URL(window.location);
  url.searchParams.set('tabId', tab);
  window.history.pushState({}, '', url);
}

function populateVersionDropdown(branches) {
  const selectedOption = document.getElementById("contract-dropdown");
  selectedOption.innerHTML = "";

  branches.forEach((flow) => {
    var option = document.createElement("option");
    option.text = flow.code;
    selectedOption.add(option);
  });

  const urlParams = new URLSearchParams(window.location.search);
  const branchName = urlParams.get('branch');

  if(branchName) {
    document.getElementById("contract-dropdown").value = branchName
  }
}

async function renderBranchesTable() {
  const response = await fetchBranches()

  const filteredBranches = BRANCHES.filter(item1 =>
    response.some(item2 => item1.code === item2.name)
  );

   const statusColors = {
    RELEASED: "#28a745",
    DRAFT: "#ffc107",
    DEPRECATED: "#dc3545",
    TO_BE_DEPRECATED: "#ff851b"
  };

  // Prefer the status declared in each branch's build.yaml (info.status);
  // fall back to the hardcoded value only for branches that haven't added it yet.
  const statuses = await Promise.all(
    filteredBranches.map((branch) => fetchBranchStatus(branch.code))
  );

  let tableBody = ''

  filteredBranches.forEach((branch, i) => {
    const status = statuses[i] || branch.status
    tableBody += `
    <tr>
    <td>${branch.name}</td>
    <td>${branch.short_desc}</td>
    <td>
      <span class="badge" style="background-color: ${statusColors[status]};"> ${status}</span>
    </td>
    <td class="branchLink" onClick="resolveHomePage('${branch.code}')">${branch.code}</td>
    </tr>
    `
  })

  document.getElementById("branchesTableBody").innerHTML = tableBody
  populateVersionDropdown(filteredBranches)
}

function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const branchName = urlParams.get('branch');

    const veriosnDropdown = document.getElementById("version-dropdown")
    const content = document.getElementById("content")
    const home = document.getElementById("home")
    const loader = document.getElementById("loader")

    veriosnDropdown.style.display = "block"
    content.style.display = "none"
    home.style.display = "none"
    loader.style.display = "flex"


  if(!branchName) {
    toggleHomePage()
  } else {
    renderBranchesTable()
    readBuildFile(branchName)
  }
}

window.onload = init
