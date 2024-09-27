## Order

### States

- `CREATED`: Draft order.
- `ACCEPTED`: Order is accepted by BPP. This means all validations are done and the buyer app can facilitate payment
- `REJECTED`: Order is rejected by BPP. This means some validations have failed and the order cannot be accepted. As most validations are done before creating the order during init phase, it is rare for an order to get rejected
- `CANCELLED`: Order is cancelled either by BAP or BPP. This means for sip order, no more instalments will be generated
- `COMPLETED`: Order is completed successfully. In case of an sip order, it means all instalments are completed. In case of a lumpsum/redemption/sip_instalment order, it means order is processed successfully

#### Order States Flow
```mermaid
stateDiagram-v2
    direction LR
    CREATED : order CREATED
    REJECTED : order REJECTED
    ACCEPTED : order ACCEPTED
    CANCELLED: order CANCELLED
    COMPLETED: order COMPLETED
    [*] --> CREATED
    CREATED --> REJECTED
    CREATED --> ACCEPTED
    CREATED --> CANCELLED
    ACCEPTED --> CANCELLED
    ACCEPTED --> COMPLETED
    COMPLETED --> CANCELLED: on fulfillment reversals
```

## Fulfillment

Fulfillment is the order processing activity, which happens after the order is accepted.

### Types

- `LUMPSUM`
- `SIP`
- `REDEMPTION`
- `SIP_INSTALMENT`

### States

- `PENDING`: In case of purchases, fulfillment starts only after payment is done. This state indicates that the order is confirmed, but the payment is pending.
- `INITIATED`: This means the fulfillment is started. In case of one time orders - the orders are sent for processing. Not applicable for recurring orders.
- `ONGOING`: For recurring orders (sip, swp), this means the instalments are ongoing as per the schedule. Applicable only for recurring orders.
- `COMPLETED`: For recurring orders (sip, swp), this means the instalments are completed as per the schedule and no new instalments will be generated. Applicable only for recurring orders.
- `CANCELLED`: For recurring orders (sip, swp), this means the order is cancelled by the seller app and no new instalments will be generated.
- `SUCCESSFUL`: Order is successfully processed. For purchase orders, this means units have been allotted.
- `FAILED`: Order is not processed. Typically failed by the AMC/RTA due to invalid kyc/bank-account among other reasons.

#### Fulfillment States Flow (Onetime Orders)
```mermaid
stateDiagram-v2
    direction LR
    PENDING: fulfillment PENDING
    INITIATED: fulfillment INITIATED
    SUCCESSFUL : fulfillment SUCCESSFUL
    FAILED : fulfillment FAILED
    CANCELLED: fulfillment CANCELLED

    [*] --> PENDING
    PENDING --> INITIATED
    PENDING --> CANCELLED
    INITIATED --> SUCCESSFUL
    INITIATED --> FAILED
    SUCCESSFUL --> FAILED: on reversals
```

#### Fulfillment States Flow (Recurring Orders)
```mermaid
stateDiagram-v2
    direction LR
    PENDING: fulfillment PENDING
    ONGOING: fulfillment ONGOING
    COMPLETED: fulfillment COMPLETED
    CANCELLED: fulfillment CANCELLED

    [*] --> PENDING
    PENDING --> ONGOING
    PENDING --> CANCELLED
    ONGOING --> COMPLETED
    ONGOING --> CANCELLED
```

- On fulfillment failure, order moves to cancelled state
- On fulfillment success/completion, order moves to completed state
- On fulfillment cancellation, order moves to cancelled state

## Payment

### Types

- `PRE_FULFILLMENT`

### Modes

- `MANDATE_EXISTING`
- `MANDATE_REGISTRATION`
- `NETBANKING`
- `UPI_PG` (upi payment through pg link)
- `UPI_URI` (upi payment through intent/qr via upi uri)
- `UPI_COLLECT` (upi payment through collect request)
- `MANDATE_DEBIT`

### States

- `PAID`: Payment is successfully collected
- `NOT_PAID`: Payment is pending
- `FAILED`: Payment failed either due to incorrect user action or system issues
