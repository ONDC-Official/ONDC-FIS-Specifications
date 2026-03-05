const xlsx = require("node-xlsx").default;
const yaml = require("js-yaml");
const fs = require("fs");

async function buildAttribiutes() {
  let attributes = {};
  const workSheetsFromBuffer = xlsx.parse(`./Unified_Credit.xlsx`);
  for (let i = 0; i < workSheetsFromBuffer.length; i++) {
    const array = workSheetsFromBuffer[i];
    const filterArray = array.data.filter((subArr) => subArr.length > 0);
    const response = formObject(filterArray, array?.name);
    const addArrtibuteName = {
      [array?.name]: response,
    };
    attributes = { ...attributes, ...addArrtibuteName };
  }
  if (Object.keys(attributes)?.length) {
    restructureTags(attributes);
    const attributesYaml = yaml.dump(attributes);
    fs.writeFileSync(`./attributes/unified-credit/index.yaml`, attributesYaml);
  }
}
function formObject(attributes, sheetName) {
  const result = {};
  let dataValue = {};
  attributes.slice(1).forEach((item) => {
    if (!item[0]) {
      console.log(`Skipped row with empty key in [${sheetName}]:`, item);
      return;
    }
    const keys = item[0].split(".");
    let temp = result;
    const tempAtt = attributes[0].slice(1);
    const tempItem = item?.slice(1);
    keys.forEach((key, index) => {
      if (!temp[key]) {
        if (index === keys.length - 1) {
          for (const [i, step] of tempAtt?.entries()) {
            dataValue[tempAtt[i]?.toLowerCase()] = tempItem[i] || undefined;
          }
          temp[key] = key === '_description' ? dataValue : { _description: dataValue };
        } else {
          temp[key] = {};
        }
        dataValue = {};
      }
      temp = temp[key];
    });
  });
  return result;
}

function convertListToArray(listObj) {
  if (!listObj || typeof listObj !== "object") return listObj;
  const result = [];
  for (const listKey of Object.keys(listObj)) {
    if (listKey === "_description") continue;
    const listItem = listObj[listKey];
    const entry = { CODE: listKey };
    if (listItem._description) {
      entry._description = listItem._description;
    }
    if (listItem.list) {
      entry.list = convertListToArray(listItem.list);
    }
    result.push(entry);
  }
  return result;
}

function restructureTags(obj) {
  if (!obj || typeof obj !== "object") return;

  for (const key of Object.keys(obj)) {
    if (key === "tags" && typeof obj[key] === "object") {
      const tagsNode = obj[key];
      const description = tagsNode._description || {};
      const tagsArray = [];

      for (const childKey of Object.keys(tagsNode)) {
        if (childKey !== "_description") {
          const tagGroup = tagsNode[childKey];
          const entry = { CODE: childKey };
          if (tagGroup._description) {
            entry._description = tagGroup._description;
          }
          if (tagGroup.list) {
            entry.list = convertListToArray(tagGroup.list);
          }
          tagsArray.push(entry);
        }
      }

      // Restructure: move tag groups inside _description.tags as array
      obj[key] = {
        _description: {
          ...description,
          type: "tag",
          tags: tagsArray,
        },
      };
    } else if (typeof obj[key] === "object") {
      restructureTags(obj[key]);
    }
  }
}


module.exports = { buildAttribiutes }
