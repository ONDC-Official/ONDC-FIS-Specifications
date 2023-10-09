var errors;

function loadErrors(data) {
  var elements = document.getElementsByClassName("test");
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
  errors = data;
  const indexKey = Object.keys(errors);
  addErrorSets(indexKey[0]);
}

function addErrorSets(option) {
  const object = errors[option]
  console.log('object', object)
  object.forEach(function (key) {
    var table = document.getElementById("errorset");
    const newRow = document.createElement("tr");
    newRow.classList.add("test");
    newRow.style.wordBreak = "break-all";
    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");
    const cell3 = document.createElement("td");
    const cell4 = document.createElement("td");

    cell1.textContent = key["Event"];
    cell2.textContent = key["Description"];
    cell3.textContent = key["From"];
    cell4.textContent = key["code"];

    newRow.appendChild(cell1);
    newRow.appendChild(cell2);
    newRow.appendChild(cell3);
    table.appendChild(newRow);
  });
}
