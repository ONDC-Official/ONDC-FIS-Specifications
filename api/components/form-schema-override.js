// The Beckn core Form schema (beckn-core submodule, schema/Form.yaml) does not allow inline forms:
// mime_type has no "none" and every form.data value must be a string. PL 2.3.0 publishes the personal
// details form inline in on_search (mime_type none, typed fields such as { type: string }) and the BAP
// sends the values in select ({ value: ... }), as SL and BL do. The submodule is upstream Beckn, so the
// Form schema is widened here, for both validation and the published build.yaml.
function isFormSchema(node) {
  const props = node?.properties;
  return (
    node?.description === "Describes a form" &&
    Array.isArray(props?.mime_type?.enum) &&
    props?.data?.additionalProperties
  );
}

function widenForm(form) {
  const { mime_type, data } = form.properties;
  if (!mime_type.enum.includes("none")) mime_type.enum.push("none");
  data.additionalProperties = { anyOf: [{ type: "string" }, { type: "object" }] };
}

function applyFormSchemaOverride(root) {
  const seen = new WeakSet();
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (!node || typeof node !== "object" || seen.has(node)) continue;
    seen.add(node);
    if (isFormSchema(node)) widenForm(node);
    for (const value of Object.values(node)) stack.push(value);
  }
  return root;
}

module.exports = { applyFormSchemaOverride };
