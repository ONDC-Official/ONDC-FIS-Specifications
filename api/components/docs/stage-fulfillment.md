### Fulfillment (Recurring: SIP, SWP)

After the order is accepted, seller app performs the processing and responds with the state of order processing (fulfillment)

```mermaid
sequenceDiagram
    autonumber
    participant bap AS Distributor
    participant bpp AS AMC/Aggregator
    alt sip started
        bpp ->> bap: `/on_status` w/ fulfillment in `ONGOING` state
    else sip completed
        bpp ->> bap: `/on_status` w/ fulfillment in `COMPLETED` state
    else sip cancelled
        bpp ->> bap: `/on_status` w/ fulfillment in `CANCELLED` state
    end
```

For recurring orders, seller app creates a new order for every instalment and it goes through the entire order lifecycle.

```mermaid
sequenceDiagram
    participant bap AS Distributor
    participant bpp AS AMC/Aggregator
    bpp ->> bap: `/on_confirm` w/ child order in `ACCEPTED` state

    rect rgb(191, 223, 255)
    alt payment successful
        bpp ->> bap: `/on_status` w/ child order payment in `PAID` state
    else payment failed
        bpp ->> bap: `/on_status` w/ child order payment in `NOT_PAID` state
    end
    end
```

---

### Fulfillment (Onetime: Lumpsum, SIP Instalment, Redemption, SWP Instalment)

After the order is accepted, seller app performs the processing and responds with the state of order processing.

```mermaid
sequenceDiagram
    autonumber
    participant bap AS Distributor
    participant bpp AS AMC/Aggregator
    alt order processing successful
        bpp ->> bap: /on_status w/ fulfillment in `SUCCESSFUL` state
    else order processing failed
        bpp ->> bap: /on_status w/ fulfillment in `FAILED` state
    end
```
---

### Cancellation

Confirmed orders can be cancelled if allowed by the provider/bpp

#### lumpsum
1. cancellation can happen in fulfillment states = pending (i.e before payment is made)
2. provider can cancel if the payment is not received within a certain time period and mention the reason as payment not received

#### sip
1. cancellation can happen in fulfillment states = pending, ongoing
2. provider can cancel if the mandate is not registered within a certain time period and mention the reason as payment instrument not received

#### sip instalment
1. cancellation can happen in fulfillment states = pending (i.e before payment is made)

#### redemption
1. cancellation is not possible as the fulfillment gets started immediately after the order is accepted

Cancellation reasons are provided as pre-defined tags