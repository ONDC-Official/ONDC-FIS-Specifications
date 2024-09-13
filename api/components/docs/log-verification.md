## Log submission Scenarios for Insuarance & Igm

#### Instructions

- Create a fork of the [verification-logs](https://github.com/ONDC-Official/verification-logs) repository.
- Create a folder with the name of your entity under your domain folder "FIS13" for insuarance.
- Commit your logs in the folder (logs should include request & response payloads for all enabled APIs as per the scenarios below).
- Create PR with a label denoting the domain name.
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

- **Flow 1(Health Insurance Application)**

  The buyer initiates a search for "Health Insurance" on the Buyer App, compares the available offerings received from the seller app, and selects the desired option. Upon selection, the buyer can proceed to avail the insurance services by submitting all the relevant details/documents and subsequently receives the issued policy.

- **Flow 2(Claim Health Insurance)**

  The buyer intends to claim a health insurance policy against an existing one. The user journey involves selecting the existing policy for the claim process. Also showcase the changes in the status of the fulfillments once the claim is initiated & processed.

- **Flow 3(Renew Health Insurance)**

  Buyer wants to renew a health insurance policy against an existing policy. Showcase the journey of the user by selecting an existing policy to renew health insurance.

- **Flow 4(Cancel Health Insurance)**

  Buyer wants to cancel a Health insurance policy against an existing policy. Showcase the journey of the user by selecting an existing policy to cancel health insurance.

### Log Verification

#### To verify your logs, you can use the POST api exposed at [https://log-validation.ondc.org/api/validate/fis](https://log-validation.ondc.org/api/validate/fis) within the [Log Validation Utility](https://github.com/ONDC-Official/log-validation-utility).

Available flows are:

- HEALTH
- HEALTH_CLAIM
- HEALTH_RENEW
- HEALTH_CANCEL

The payload structure for validation is as follows:

Health:

```json
{
  "domain": "ONDC:FIS13",
  "version": "2.0.0",
  "flow": "HEALTH",
  "payload": {
    "search_1": {},
    "on_search_1": {},
    "search_2": {},
    "on_search_2": {},
    "select": {},
    "on_select": {},
    "init_1": {},
    "on_init_1": {},
    "init_2": {},
    "on_init_2": {},
    "status": {},
    "on_status": {},
    "init_3": {},
    "on_init_3": {},
    "confirm": {},
    "on_confirm": {},
    "cancel": {},
    "on_cancel": {}
  }
}
```

CLAIM HEALTH:

```json
{
  "domain": "ONDC:FIS13",
  "version": "2.0.0",
  "flow": "HEALTH_CLAIM",
  "payload": {
    "on_confirm": {},
    "on_update_unsolicated": {},
    "status_1": {},
    "on_status_1": {},
    "status_2": {},
    "on_status_2": {}
  }
}
```

RENEW HEALTH:

```json
{
  "domain": "ONDC:FIS13",
  "version": "2.0.0",
  "flow": "HEALTH_RENEW",
  "payload": {
    "on_confirm": {},
    "on_update_unsolicated_1": {},
    "on_update_unsolicated_2": {}
  }
}
```

CANCEL HEALTH:

```json
{
  "domain": "ONDC:FIS13",
  "version": "2.0.0",
  "flow": "HEALTH_CANCEL",
  "payload": {
    "on_confirm": {},
    "cancel": {},
    "on_cancel": {},
    "on_cancel_unsolicated": {}
  }
}
```

The api call sequence inside the payload object might differ based on different flows

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

_Note: Log verification will follow a FIFO model with a TAT of 4 days_
