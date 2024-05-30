### Changelog

As we keep getting feedback from the participants, the protocol specs might change to accommodate the feedback. Some will be breaking in nature and some not. This page captures all those changes so you can keep a track and incorporate them in your implementation.

#### 30th May, 2024
- Moving payment modes into tags inside the payment object
- Using `PRE_FULFILLMENT` as the payment type to indicate the stage of payment collection
- Sending payment options in `on_select` call
- Sending payment url in `on_init` call
