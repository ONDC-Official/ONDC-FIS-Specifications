const xlsx = require("node-xlsx").default;
const yaml = require("js-yaml");
const fs = require("fs");

async function buildTlc() {
  const workSheetsFromBuffer = xlsx.parse(`../../tlc.xlsx`);
  const outputObject = workSheetsFromBuffer[0]?.data.filter((item,index)=>item.length>0 && index!==0).map((item) => ({
    ...item
  }))
  const yamlString = yaml.dump({ code: outputObject });
  fs.writeFileSync(`./tlc/index.yaml`, yamlString);
}


module.exports = { buildTlc }