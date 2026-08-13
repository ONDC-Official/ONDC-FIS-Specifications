# Loan Application Statuses

These are the mandatory checklists that need to be part of the loan disbursal journey. The checklists are enabled in the form of tags as part of fulfillments.

- The **Stage** is treated as the tag `code`.
- The **Mode** values are incorporated in the `name` field of the tag.
- The **Status** values are incorporated in the `value` field of the tag.

These statuses help in tracking the progress of different stages of the loan application and disbursal lifecycle.

---

## Supported Status Values

| Status      | Description                                                        |
| ----------- | ------------------------------------------------------------------ |
| PENDING     | The process is pending and yet to be initiated.                    |
| INITIATED   | The process has been initiated.                                    |
| IN_PROGRESS | The process is currently in progress.                              |
| SUCCESSFUL  | The process has been completed successfully.                       |
| FAILED      | The process has failed and may require retry or user intervention. |
| FINALIZED   | The loan offer has been finalized.                                 |
| SELECTED    | The loan offer has been selected by the user.                      |

---

# Loan Application Statuses

| Stage                     | Mode         | Status      |
| ------------------------- | ------------ | ----------- |
| KYC                       | OFFLINE      | PENDING     |
|                           | AADHAR       | INITIATED   |
|                           | VKYC         | IN_PROGRESS |
|                           | LIVENESS     | SUCCESSFUL  |
|                           |              | FAILED      |
|                           |              |             |
| REPAYMENT                 | SI           | PENDING     |
|                           | E-MANDATE    | INITIATED   |
|                           |              | IN_PROGRESS |
|                           |              | SUCCESSFUL  |
|                           |              | FAILED      |
|                           |              |             |
| BANK ACCOUNT VERIFICATION | PENNY DROP   | PENDING     |
|                           | PENNYLESS    | INITIATED   |
|                           |              | IN_PROGRESS |
|                           |              | SUCCESSFUL  |
|                           |              | FAILED      |
|                           |              |             |
| LOAN AGREEMENT            | CLICKWRAP    | PENDING     |
|                           | AADHAR ESIGN | INITIATED   |
|                           |              | IN_PROGRESS |
|                           |              | SUCCESSFUL  |
|                           |              | FAILED      |
|                           |              |             |
| LOAN OFFER                |              | PENDING     |
|                           |              | FINALIZED   |
|                           |              | SELECTED    |

---

## Configurability of Stops

The stops listed in the loan journey are **not a fixed or mandatory set of stops** that every Seller NP must implement. Seller NPs can configure the journey based on their specific use case and requirements. If a particular stop is not applicable to their journey, they can choose to skip that stop.

For example, a Seller NP may implement only the stops relevant to its journey and does not need to implement every stop defined in the protocol.

### What the Protocol Enforces

While the stops themselves are configurable, any stop implemented by a Seller NP must follow the **protocol-defined structure and semantics** associated with that stop.

The protocol enforces:

- The defined structure of the stop.
- The defined `type` of the stop.
- The semantics and meaning associated with the stop.
- The applicable validations and rules defined for the stop.
- The relationship between stops through `parent_stop_id`, where applicable.

Seller NPs should not change the meaning of an existing protocol-defined stop or use an existing stop type for a different purpose.

### How to Extend the List of Stops

If a Seller NP requires a **new stop or status that is not currently defined in the protocol**, the Seller NP should first discuss the requirement with the **ONDC team**.

The process is:

1. The Seller NP identifies the requirement for a new stop/status.
2. The requirement is discussed with the ONDC team.
3. The requirement is evaluated and aligned with the ONDC team.
4. Once approved, the new stop/status can be defined and enabled for use by participants.

Seller NPs should **not independently introduce new protocol-level stop types or statuses** without prior alignment with the ONDC team.

---
