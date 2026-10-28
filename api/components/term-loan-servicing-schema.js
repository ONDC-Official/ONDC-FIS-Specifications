// BL uses the FIS DEFERRED and DELAYED payment statuses already present in the published
// BL schema and PL/LAMF servicing examples, but absent from the pinned old core.
// Clone the callback schema so shared core Payment refs on other APIs stay intact.
function extendBLServicingSchema(spec) {
  const content = spec.paths['/on_update'].post.requestBody.content['application/json'];
  const status = content.schema.properties.message.properties.order.properties.payments.items.properties.status;
  const missing = ['DEFERRED', 'DELAYED'].filter(value => !status.enum.includes(value));
  if (!missing.length) return spec;
  const callback = structuredClone(content.schema);
  callback.properties.message.properties.order.properties.payments.items.properties.status.enum.push(...missing);
  content.schema = callback;
  return spec;
}

module.exports = { extendBLServicingSchema };
