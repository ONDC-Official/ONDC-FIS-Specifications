## Order

### Types

- `PURCHASE` - All onetime(lumpsum) and recurring(sip) buy orders
- `REDEMPTION` - All onetime and recurring(swp) sell orders

### States

- `CREATED`: Draft order.
- `ACCEPTED`: Order is accepted by BPP. This means all validations are done and the buyer app can facilitate payment
- `REJECTED`: Order is rejected by BPP. This means some validations have failed and the order cannot be accepted

## Fulfillment

Fulfillment is the order processing activity, which happens after the order is accepted.

### Types

- `LUMPSUM`
- `SIP`
- `REDEMPTION`
- `SWP`
- `SIP_INSTALMENT`

### States

- `ONGOING`: For recurring orders (sip, swp), this means the instalments are ongoing as per the schedule
- `COMPLETED`: For recurring orders (sip, swp), this means the instalments are completed as per the schedule and no new instalments will be generated
- `CANCELLED`: For recurring orders (sip, swp), this means the order is cancelled by the seller app and no new instalments will be generated
- `SUCCESSFUL`: Order is successfully processed. For purchase orders, this means units have been allotted.
- `FAILED`: Order is not processed. Typically failed by the AMC/RTA due to invalid kyc/bank-account among other reasons.

```mermaid
---
title: Order & Fulfillment States
---
stateDiagram-v2
    direction LR
    CREATED : order CREATED
    REJECTED : order REJECTED
    ACCEPTED : order ACCEPTED
    [*] --> CREATED
    CREATED --> REJECTED
    CREATED --> ACCEPTED

    SUCCESSFUL : fulfillment SUCCESSFUL
    FAILED : fulfillment FAILED
    ONGOING: fulfillment ONGOING
    COMPLETED: fulfillment COMPLETED
    CANCELLED: fulfillment CANCELLED

    ACCEPTED --> SUCCESSFUL
    ACCEPTED --> FAILED
    ACCEPTED --> ONGOING
    ACCEPTED --> COMPLETED
    ACCEPTED --> CANCELLED
    note right of ONGOING
        for recurring orders
        sip/swp
    end note
    note right of COMPLETED
        for recurring orders
        sip/swp
    end note
    note right of CANCELLED
        for recurring orders
        sip/swp
    end note
```

## Payment

### Types

- `PRE_FULFILLMENT`

### Modes

- `MANDATE_EXISTING`
- `MANDATE_REGISTRATION`
- `NETBANKING`
- `UPI_COLLECT`
- `MANDATE_DEBIT`

### States

- `PAID`: Payment is successfully collected
- `NOT_PAID`: Payment is pending
- `FAILED`: Payment failed either due to incorrect user action or system issues
