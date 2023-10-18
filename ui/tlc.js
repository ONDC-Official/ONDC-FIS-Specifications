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

function addTlcSets(option) {
  const object = tlc[option];
  let previousValues = {};

  object.forEach(function (key) {
    var table = document.getElementById("tlcset");
    const newRow = document.createElement("tr");
    newRow.classList.add("test");

    for (let i = 0; i < 6; i++) {
      const cell = document.createElement("td");
      cell.style.minWidth = "65px";
      const value = key[i] !== undefined ? key[i] : previousValues[i];
      cell.textContent = value;
      newRow.appendChild(cell);
      if (key[i] !== undefined) {
        previousValues[i] = key[i]; 
      }
    }

    table.appendChild(newRow);
  });
}
