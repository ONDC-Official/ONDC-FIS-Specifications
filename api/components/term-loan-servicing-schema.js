// Extend only the relevant old-core request schemas to match the published BL
// contract. The pinned core predates the BL status and payment-type values.
function extendBLServicingSchema(spec) {
  for (const api of ['on_confirm', 'on_update']) {
    const content = spec.paths['/' + api].post.requestBody.content['application/json'];
    const callback = structuredClone(content.schema);
    const order = callback.properties.message.properties.order.properties;
    const extend = (schema, values) => {
      for (const value of values) if (!schema.enum.includes(value)) schema.enum.push(value);
    };
    extend(order.payments.items.properties.type, ['ON_FULFILLMENT', 'POST_FULFILLMENT']);
    // The published BL quote ID is a string, while old core requires UUID.
    delete order.quote.allOf[0].properties.id.format;
    if (api === 'on_update') {
      extend(order.payments.items.properties.status, ['DEFERRED', 'DELAYED']);
      extend(order.status, ['COMPLETED']);
    }
    content.schema = callback;
  }
  return spec;
}
module.exports = { extendBLServicingSchema };
