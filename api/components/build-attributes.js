const xlsx = require("node-xlsx").default;
const yaml = require("js-yaml");
const fs = require("fs");

async function buildAttribiutes() {
  let attributes = {};
  console.log("Building attributes");
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
// Parse enumrefs string like "[{label: Foo, href: https://...}]" into an array of objects
function parseEnumRefs(value) {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  if (!trimmed.startsWith('[')) return value;
  try {
    // The string has unquoted keys/values: [{label: Foo, href: https://...}]
    // Extract each {...} block and parse key-value pairs
    const items = [];
    const objectMatches = trimmed.matchAll(/\{([^}]+)\}/g);
    for (const match of objectMatches) {
      const obj = {};
      // Split by comma, but be careful with URLs containing commas (split on ', ' followed by a key)
      const pairs = match[1].split(/,\s*(?=[a-zA-Z_]+:)/);
      for (const pair of pairs) {
        const colonIdx = pair.indexOf(':');
        if (colonIdx > 0) {
          const key = pair.substring(0, colonIdx).trim();
          const val = pair.substring(colonIdx + 1).trim();
          obj[key] = val;
        }
      }
      items.push(obj);
    }
    return items.length > 0 ? items : value;
  } catch (e) {
    return value;
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
            let cellValue = tempItem[i] ?? undefined;
            const colName = tempAtt[i]?.toLowerCase();
            if (colName === 'enumrefs' && cellValue) {
              cellValue = parseEnumRefs(cellValue);
            }
            dataValue[colName] = cellValue;
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

// A key is a tag-group CODE if it is ALL_CAPS (letters, digits, underscores only).
// Keys like 'display', 'descriptor', 'list', '_description' are regular attribute keys.
function isCodeKey(key) {
  return /^[A-Z][A-Z0-9_]*$/.test(key);
}

// Recursively convert list object: CODE keys become array items, others stay as-is.
function convertListToArray(listObj) {
  if (!listObj || typeof listObj !== "object") return listObj;
  const result = [];
  for (const listKey of Object.keys(listObj)) {
    if (listKey === "_description") continue;
    if (!isCodeKey(listKey)) continue; // regular keys inside list are skipped here
    const listItem = listObj[listKey];
    const entry = { code: listKey };
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
    if (key === "tags" && typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      const tagsNode = obj[key];
      const description = tagsNode._description || {};

      const tagGroups = [];

      for (const childKey of Object.keys(tagsNode)) {
        if (childKey === "_description") continue;

        if (isCodeKey(childKey)) {
          const tagGroup = tagsNode[childKey];

          const entry = {
            code: childKey,
          };

          // ✅ Preserve tag group description (required, usage, info etc)
          if (tagGroup._description) {
            entry._description = tagGroup._description;
          }

          if (tagGroup.list) {
            entry.list = convertListToArray(tagGroup.list);
          }

          tagGroups.push(entry);

          delete tagsNode[childKey];
        }
      }

      tagsNode._description = {
        ...description,
        ...(tagGroups.length ? { tags: tagGroups } : {})
      };
    } 
    else if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      restructureTags(obj[key]);
    }
  }
}


module.exports = { buildAttribiutes }
