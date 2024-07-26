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
- Adding update/ on_update calls for payment failure retries

#### 12th July, 2024
- Using numeric codes for cancellation reason ids
- Adding cancellation terms to order object. This is to explicitly add cancellation terms
- Adding cancellation object to order object. This is to convey the details about a cancelled order
- Using standard enums for form headings
- Using `2.0.0` as the first version to adhere to ondc conventions
- Using `quote` to capture nav, units and other fulfillment details
- Moving sip order frequency into fulfillment stops to avoid duplicate usage of `item.time` attribute and also to keep it close to the fulfillment as the recurring nature of the order is captured at the fulfillment level
- Using capital case for `BPP` and `INR` instead of smallcase
- Removing provider code enums to reduce dependency on the protocol for every new provider
- Adding missing submit tag to forms
- Changing `MASKED_FOLIO_NUMBER` to `FOLIO_NUMBER` to support both masked and unmasked in one attribute. It is left to the seller app to decide what to send in that
- Adding `transaction_id` to payment params to capture reference number for successful payments
- Using unsolicited `on_update` calls instead of `on_status` for updates to order involving attributes, tags other than just status
- Using just the updated paths in update call example
- Adding scheme offer documents in the scheme information tag group