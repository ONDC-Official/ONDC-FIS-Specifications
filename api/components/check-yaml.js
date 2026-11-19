#!/usr/bin/env node
// Strict YAML parse check for every spec file under api/components.
// app.js runs it first (so `node app.js` and `npm start` run it) and it exits non-zero on any error:
// syntax errors, duplicate mapping keys, undefined aliases, duplicate anchors (which js-yaml
// would otherwise silently override) and tab characters (js-yaml accepts a tab inside a plain
// value, but stricter parsers such as PyYAML reject the file).
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const ROOT = __dirname;
const SKIP_DIRS = new Set(["node_modules", ".git"]);

function listYaml(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listYaml(full, out);
    else if (/\.ya?ml$/i.test(entry.name)) out.push(full);
  }
  return out;
}

const files = listYaml(ROOT, []).sort();
const errors = [];

for (const file of files) {
  const rel = path.relative(ROOT, file);
  const anchors = new Map(); // anchor name -> line of first definition
  const text = fs.readFileSync(file, "utf8");
  text.split("\n").forEach((ln, i) => {
    if (ln.includes("\t")) errors.push(`${rel}: tab character at line ${i + 1}`);
  });
  try {
    yaml.load(text, {
      filename: rel,
      // js-yaml calls this once per node; on "close", state.anchor is that node's anchor.
      listener(event, state) {
        if (event !== "close" || state.anchor === null) return;
        const line = state.line + 1;
        if (anchors.has(state.anchor)) {
          errors.push(
            `${rel}: duplicate anchor &${state.anchor} (first defined near line ` +
              `${anchors.get(state.anchor)}, again near line ${line})`
          );
        } else {
          anchors.set(state.anchor, line);
        }
      },
    });
  } catch (err) {
    errors.push(`${rel}: ${String(err.message).split("\n")[0]}`);
  }
}

if (errors.length) {
  console.error(`YAML parse check failed (${errors.length} error(s) in ${files.length} files):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`YAML parse check passed: ${files.length} files`);
