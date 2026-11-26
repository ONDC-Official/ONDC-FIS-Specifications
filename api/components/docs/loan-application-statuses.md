# Loan Application Statuses

These are the steps of the Personal Loan journey and the statuses the lender reports for them. The Tunnel and the validator check the steps against this list.

The steps are sent as `fulfillments[].stops`, in order, each linked to the step before it by `parent_stop_id`:

- The **step** is the stop `type`.
- The **status** is the stop `instructions.code`.
- The **method** the lender used for the step (for example video KYC or e-mandate) is the stop `instructions.name`. A step that has no method carries its display name instead (`Personal Information`, `Loan Offer`, `Single Redirection`, `Journey Offline`). Both lists are in the enum file.

The status words are the same as in the SL and BL journeys (`PENDING`, `IN_PROGRESS`, `COMPLETED`), with `FAILED` added for rejections.

---

## Step Chain

| #   | Step (`type`)                                 | Comes after (`parent_stop_id`) | Journey                                        |
| --- | --------------------------------------------- | ------------------------------ | ---------------------------------------------- |
| 1   | PERSONAL_INFORMATION                          | -                              | Both                                           |
| 2   | LOAN_OFFER                                    | PERSONAL_INFORMATION           | Both                                           |
| 3   | SINGLE_REDIRECTION or JOURNEY_OFFLINE         | LOAN_OFFER                     | SINGLE_REDIRECTION: single redirection (`ONLINE`); JOURNEY_OFFLINE: offline journey (`SEMI_ONLINE`) |
| 4   | KYC                                           | step 3                         | Both                                           |
| 5   | BANK_ACCOUNT_VERIFICATION                     | KYC                            | Both                                           |
| 6   | REPAYMENT                                     | BANK_ACCOUNT_VERIFICATION      | Both                                           |
| 7   | LOAN_AGREEMENT                                | REPAYMENT                      | Both                                           |

`BANK_ACCOUNT_VERIFICATION` comes before `REPAYMENT`, as decided in PL 2.0.3.

---

## Supported Status Values (`instructions.code`)

| Status      | Description                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| PENDING     | The step has not started.                                                                                    |
| IN_PROGRESS | The step has started and is not finished.                                                                    |
| COMPLETED   | The step is finished.                                                                                        |
| FAILED      | The step failed. The fulfillment state is `REJECTED` and `error.code` carries the reason code.               |

The 2.0.3 statuses map to these as follows: `INITIATED` becomes `IN_PROGRESS`, `SUCCESSFUL` becomes `COMPLETED`. For the loan offer, `FINALIZED` and `SELECTED` are replaced as shown below.

---

## Steps, Methods and Statuses

| Step                      | Method or display name (`instructions.name`) | Status (`instructions.code`)              |
| ------------------------- | ---------------------------- | ----------------------------------------- |
| PERSONAL_INFORMATION      | Personal Information         | PENDING, COMPLETED                        |
| LOAN_OFFER                | Loan Offer                   | PENDING, IN_PROGRESS, COMPLETED, FAILED   |
| SINGLE_REDIRECTION        | Single Redirection           | PENDING, IN_PROGRESS, COMPLETED           |
| JOURNEY_OFFLINE           | Journey Offline              | PENDING, IN_PROGRESS, COMPLETED           |
| KYC                       | OFFLINE, AADHAR, VKYC, LIVENESS | PENDING, IN_PROGRESS, COMPLETED, FAILED |
| BANK_ACCOUNT_VERIFICATION | PENNY DROP, PENNYLESS        | PENDING, IN_PROGRESS, COMPLETED, FAILED   |
| REPAYMENT                 | SI, E-MANDATE                | PENDING, IN_PROGRESS, COMPLETED, FAILED   |
| LOAN_AGREEMENT            | CLICKWRAP, AADHAR ESIGN      | PENDING, IN_PROGRESS, COMPLETED, FAILED   |

### Loan offer

Proposed mapping (2.0.3 used `FINALIZED` / `SELECTED`):

| When                                                       | LOAN_OFFER status |
| ---------------------------------------------------------- | ----------------- |
| The offer is shown (`on_select` with the offer)            | IN_PROGRESS       |
| The borrower accepts the offer on the lender's pages       | COMPLETED         |
| The lender cannot make an offer (`on_select` with no offer) | Not sent         |

When the lender cannot make an offer, `on_select` carries only `context` and `error` (the reason code, for example `80226` CIBIL rejection). There is no `message`, so no step statuses are sent.

---

## When the Lender Sends the Statuses

- `on_select` with the offer: `PERSONAL_INFORMATION` is `COMPLETED`, `LOAN_OFFER` is `IN_PROGRESS`, the other steps are `PENDING`.
- The lender sends an unsolicited `on_status` after each step on its pages (after every `application/html` form, as in PL 2.0.3).
- While the offline step of the offline journey is open, the item's `xinput.form_response.status` is `OFFLINE_PENDING`.
- When the loan agreement is signed, every step is `COMPLETED` and the fulfillment state is `SANCTIONED`. The lender then sends an unsolicited `on_confirm` when the loan is disbursed (fulfillment state `DISBURSED`).
- When a step fails, that step is `FAILED`, the fulfillment state is `REJECTED`, `xinput.form_response.status` is `REJECTED`, and `error.code` carries the reason (for example `80204` KYC failure, `80206` account verification failure, `80207` repayment setup failure, `80209` e-sign failure).

---

## Configurability of Stops

The steps listed above are **not a fixed or mandatory set** that every lender must run. A lender can skip a step it does not run.

### What the Protocol Enforces

Any step a lender sends must follow the protocol-defined structure and meaning:

- The defined structure of the stop.
- The defined `type` of the stop.
- The status values in `instructions.code` and the methods in `instructions.name` listed above.
- The order of the steps and the link between them through `parent_stop_id`.

Lenders should not change the meaning of an existing step or use an existing step type for a different purpose.

### How to Extend the List of Stops

A new step type, status or method needs ONDC approval:

1. The lender identifies the need for a new step, status or method.
2. The need is discussed with the ONDC team.
3. The ONDC team evaluates and agrees it.
4. Once approved, it is added to this document and the enum file and can be used by participants.

Lenders should **not** introduce new step types, statuses or methods without prior alignment with the ONDC team.
