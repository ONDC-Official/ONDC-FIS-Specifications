const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const yamlPath = path.join(__dirname, 'on_search_request_common.yaml');
const outputPath = path.join(__dirname, 'on_search_form_fields.md');

const fileContent = fs.readFileSync(yamlPath, 'utf8');
const doc = yaml.load(fileContent);

const items = doc.message.catalog.providers[0].items;

// Track unique field + form heading combinations to avoid duplicates
const seen = new Set();
const rows = [];

for (const item of items) {
  if (!item.xinput || !item.xinput.head || !item.xinput.form || !item.xinput.form.data) continue;

  const formHeading = item.xinput.head.descriptor.code;
  const data = item.xinput.form.data;

  for (const [fieldName, fieldProps] of Object.entries(data)) {
    if (typeof fieldProps !== 'object' || fieldProps === null) continue;

    const key = `${formHeading}::${fieldName}`;
    if (seen.has(key)) continue;
    seen.add(key);

    rows.push({
      fieldName,
      formHeading,
      type: fieldProps.type || '-',
      required: fieldProps.required !== undefined ? String(fieldProps.required) : '-',
      regex: fieldProps.regex || '-',
      enums: fieldProps.enums || '-',
    });
  }
}

// Escape pipe characters in values for markdown table
const esc = (val) => {
  if (typeof val !== 'string') return String(val);
  return val.replace(/\|/g, '\\|');
};

// Generate markdown
let md = `# ONDC FIS - on_search Form Fields\n\n`;
md += `> Auto-generated from \`on_search_request_common.yaml\`\n\n`;

md += `| Form Field Name | Form Headings | Use-case Name | Form Field Type | Required | Regex | ENUM |\n`;
md += `|---|---|---|---|---|---|---|\n`;

for (const r of rows) {
  const regex = r.regex === '-' ? '-' : `\`${esc(r.regex)}\``;
  const enums = r.enums === '-' ? '-' : esc(r.enums);
  md += `| ${r.fieldName} | ${r.formHeading} | | ${r.type} | ${r.required} | ${regex} | ${enums} |\n`;
}

fs.writeFileSync(outputPath, md, 'utf8');
console.log(`✅ Markdown file generated: ${outputPath}`);
console.log(`Total unique field entries: ${rows.length}`);
