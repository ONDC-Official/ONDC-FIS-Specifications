## Log submission Scenarios for Mutual-Funds & Igm

#### Instructions

- Create a fork of the [verification-logs](https://github.com/ONDC-Official/verification-logs) repository.
- Create a folder with the name of your entity under your domain folder "FIS14" for mutual-funds.
- Commit your logs in the folder (logs should include request & response payloads for all enabled APIs as per the scenarios below).
- Create PR and label it with your domain name.
- Once submitted, please refer to the comments on logs submitted and update the PR based on the comments provided.
- Once the reviews are done, the PR will be merged and the logs shall be considered as approved on pr merge
- For IGM logs, create a folder with name igm under your entity named folder.

### File Naming conventions:

1. **Single Endpoint Naming**:

   - For a single API endpoint, the file name should precisely match the name of the endpoint. For example:
     - `search: search.json` (for the "search" endpoint)
     - `on_search: on_search.json` (for the "on_search" endpoint)

2. **Multiple Calls for Same Endpoint**:

   - When there are multiple API calls for the same endpoint, the naming convention should reflect the sequence of calls using numeric suffixes:
     - `select 1: select_1.json` (for the first call of the "select" endpoint)
     - `select 2: select_2.json` (for the second call of the "select" endpoint)
     - `init 1: init_1.json` (for the first call of the "init" endpoint)
     - `init 2: init_2.json` (for the second call of the "init" endpoint)

These naming conventions ensure clear identification and organization of files based on the corresponding API endpoints and their respective calls.

### Scenarios

- **Flow 1** search(Full-Pull):
  Mutual fund investor searches for available mutual fund schemes in the Buyer App and compares options. This is a full pull search, where the buyer app requests all available mutual fund schemes from the seller app

- **Flow 2** search(Incremental-Pull):
  In this flow, the buyer app performs an incremental pull to retrieve mutual fund schemes from the seller app. This occurs when an investor has already viewed or invested in mutual fund schemes and is now looking to refresh the list with any new schemes or changes in existing ones. Only the new, updated, or modified schemes are fetched.

- **Flow 3** Sip creation new folio with kyc:
  This flow describes the process where the investor wants to set up a new SIP (Systematic Investment Plan) for a mutual fund but doesn’t have a folio (mutual fund account). Investor has to also submit  3 additional forms i.e. kyc, application & E-sign

- **Flow 4** sip instalment (fulfillment success will be covered):
  In this flow, the investor has already set up a SIP and the process focuses on the success of a scheduled SIP installment payment:

- **Flow 5** sip installment payment failure:
  The buyer app attempts to debit the SIP installment amount from the registered bank account.The payment fails due to insufficient balance, bank issues, or mandate rejection.The app sends a notification to the investor about the payment failure and the investor can attempt the payment again

- **Flow 6** lumpsum existing folio:
  In this flow, the investor makes a one-time lump-sum investment in a mutual fund using an existing folio. After selecting the mutual fund and specifying the amount and successful payment, the mutual fund units are allocated, and the folio is updated to reflect the new holdings. No additional forms are required to be filled in this step.

- **Flow 7** lumpsum payment retry (both payment failure and retries will be covered):
  When a lump-sum investment payment fails (due to reasons like insufficient funds or payment gateway issues), the investor is notified and given the option to retry. After addressing the issue, the investor can attempt the payment again, and upon success, the units are allocated accordingly.

- **Flow 8** redemption & redemption failure(part of single flow):
  This flow describes the process of an investor redeeming mutual fund units, where they receive the redemption amount

<!-- ### Log Verification -->

<!-- #### To verify your logs, you can use the POST api exposed at [https://log-validation.ondc.org/api/validate/fis](https://log-validation.ondc.org/api/validate/fis) within the [Log Validation Utility](https://github.com/ONDC-Official/log-validation-utility).

Available flows are:

- Flow-1

The payload structure for validation is as follows:

```json
{
  "domain": "ONDC:FIS14",
  "version": "2.0.0",
  "flow": "",
  "payload": {
    "search": {},
    "on_search": {},
    "select_1": {},
    "on_select_1": {},
    "select_2": {},
    "on_select_2": {},
    "select_3": {},
    "on_select_3": {},
    "init_1": {},
    "on_init_1": {},
    "init_2": {},
    "on_init_2": {},
    "init_3": {},
    "on_init_3": {},
    "confirm": {},
    "on_confirm": {},
    "status": {},
    "on_status": {},
    "update": {},
    "on_update": {}
  }
}
```


#### For Igm logs, use POST api exposed at [https://log-validation.ondc.org/api/validate/igm](https://log-validation.ondc.org/api/validate/igm)

The body structure for igm logs:

```json
{
  "domain": "",
  "version": "1.0.0",
  "payload": {
    "ret_issue": {},
    "ret_issue_close": {},
    "ret_on_issue": {},
    "ret_issue_status": {},
    "ret_on_issue_status": {},
    "ret_on_issue_status_unsolicited": {}
  }
}
```

The api call sequence inside the payload object might differ based on different flows -->

*Note: Log verification will follow a FIFO model with a TAT of 4 days*