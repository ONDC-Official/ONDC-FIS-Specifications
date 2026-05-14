# Loan Application Statuses

These are the mandatory checklists that need to be part of the loan disbursal journey. The checklists are enabled in the form of tags as part of fulfillments.

- The **Stage** is treated as the tag `code`.
- The **Mode** values are incorporated in the `name` field of the tag.
- The **Status** values are incorporated in the `value` field of the tag.

These statuses help in tracking the progress of different stages of the loan application and disbursal lifecycle.

---

## Supported Status Values

| Status        | Description |
|---------------|-------------|
| PENDING       | The process is pending and yet to be initiated. |
| INITIATED     | The process has been initiated. |
| IN_PROGRESS   | The process is currently in progress. |
| SUCCESSFUL    | The process has been completed successfully. |
| FAILED        | The process has failed and may require retry or user intervention. |
| FINALIZED     | The loan offer has been finalized. |
| SELECTED      | The loan offer has been selected by the user. |

---

# Loan Application Status Matrix

| Stage                        | Mode         | Status        |
|-----------------------------|--------------|---------------|
| KYC                         | OFFLINE      | PENDING       |
|                             |   AADHAR           | INITIATED     |
|                             |   VKYC     | IN_PROGRESS   |
|                             |   LIVENESS       | SUCCESSFUL    |
|                             |      | FAILED        |
|                             |              |               |
| REPAYMENT                   | SI           | PENDING       |
|                             |  E-MANDATE             | INITIATED     |
|                             |    | IN_PROGRESS   |
|                             |              | SUCCESSFUL    |
|                             |              | FAILED        |
|                             |              |               |
| BANK ACCOUNT VERIFICATION   | PENNY DROP   | PENDING       |
|                             |   PENNYLESS           | INITIATED     |
|                             |     | IN_PROGRESS   |
|                             |              | SUCCESSFUL    |
|                             |              | FAILED        |
|                             |              |               |
| LOAN AGREEMENT              | CLICKWRAP    | PENDING       |
|                             |   AADHAR ESIGN           | INITIATED     |
|                             |  | IN_PROGRESS   |
|                             |              | SUCCESSFUL    |
|                             |              | FAILED        |
|                             |              |               |
| LOAN OFFER                  |              | PENDING       |
|                   |              | FINALIZED     |
|                   |              | SELECTED      |

---

## Example Tag Representation

```yaml
- descriptor:
    code: KYC
    name: OFFLINE
  value: PENDING
```

```yaml
- descriptor:
    code: REPAYMENT
    name: E-MANDATE
  value: SUCCESSFUL
```