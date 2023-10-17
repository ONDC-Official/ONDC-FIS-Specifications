var tlc;

function loadTlc(data) {
  var elements = document.getElementsByClassName("tlc-test");
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
  tlc = data;
  const indexKey = Object.keys(tlc);
  addTlcSets(indexKey[0]);
}

function fixSpecialChars(text) {
  return text.replaceAll(/â/gi, '"');
}

function addTlcSets(option) {
  const object = tlc[option];
  let previousValues = {};
  const keys = ['Term', 'Api', 'Attribute', 'Owner', 'Value', 'Description']
  object.forEach(function (key) {
    var table = document.getElementById("tlcset");
    const newRow = document.createElement("tr");
    newRow.classList.add("test");

    for (let i = 0; i < 6; i++) {
      const cell = document.createElement("td");
      cell.style.minWidth = "65px";
      const value = key[keys[i]] !== undefined ? fixSpecialChars(key[keys[i]]) : previousValues[keys[i]];
      cell.textContent = value;
      newRow.appendChild(cell);
      if (key[keys[i]] !== undefined) {
        previousValues[keys[i]] = key[keys[i]];
      }
    }

    table.appendChild(newRow);
  });
}