### Changelog

As we keep getting feedback from the participants, the protocol specs might change to accommodate the feedback. Some will be breaking in nature and some not. This page captures all those changes so you can keep a track and incorporate them in your implementation.

#### 30th May, 2024
- Moving payment modes into tags inside the payment object
- Using `PRE_FULFILLMENT` as the payment type to indicate the stage of payment collection
- Sending payment options in `on_select` call
- Sending payment url in `on_init` call
- Sending 2fa details in `init` call
- Sending tnc in `on_select` call
- Passing arn details in organization creds
- Passing pan number in person id
- Adding 2fa email/mobile details to folio information sent by sellerapp (this is needed by the buyer app to perform 2fa)

#### 21st June, 2024
- Adding terms of engagement
- Moving quantity to select call
- Search: moving incremental pull time into tags (as category may not be the only filter going forward)
- Cancel: adding cancellation reasons enums and changing status of order to `CANCELLED` for cancelled sip orders
- Adding item tags and fulfillment tags in all on_* responses, to make the order object self contained all the time
- Removing `type` from order as it is redundant. The actual type can be taken from the fulfillment type
- Using unsolicited `on_confirm` to trigger sip instalment generation notification