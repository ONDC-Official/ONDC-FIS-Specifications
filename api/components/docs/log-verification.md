## Log submission Scenarios for Personal Loan & Igm

#### Instructions

- Create a fork of the [verification-logs](https://github.com/ONDC-Official/verification-logs) repository.
- Create a folder with the name of your entity under your domain folder "FIS12" for credit.
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

- **Flow 1**

  Borrower searches for a "Personal Loan" on a Buyer App compares and selects from the available loan offerings received from the seller app (aka lender). Borrowe is able to avail the loan by submitting all the relevant details/documents and gets the loan disbursed into their given bank accounts.

  Unsolicited /On_status call from seller app to buyer app for every redirection form ("mime_type": "application/html").

- **Flow 2**

  Borrower did not select from the available options of loans before the TTL for the offer and wants to make a selection now. So make the select call again to get the valid offers and then allow the borrower to select from the new offers received.

- **Flow 3**

  Borrower wants to Foreclose the existing loan.
  Showcase the journey of the borrower selecting an existing loan to foreclose and then receive the payment amount (along with all the charges) and payment URL, finally making the payment and foreclosing the loan. Also show the change in the status of the payment and installments.

- **Flow 4**

  Borrower wants to make pre-part payment against the existing loan.
  Showcase the journey of the borrower selecting an existing loan to make pre-part payment and then receive payment URL for the amount that the borrower wants to pay, finally making the payment.
  Also showcase, error scenarios where the seller does not allow for the pre-part payment and the change in the status of the payment and installments.

- **Flow 5**

  Borrower has missed one/many EMIs and wants to make the payments against those paying the late fee.
  Showcase the journey of the borrower selecting an existing loan to make payment against all the missed EMI's and then receive payment amount (along with all the charges) and payment URL for the amount that the borrower needs to pay, finally making the payment. Also show the change in the status of the payment and installments.

- **Flow 6**

  Borrower wants to check for the status of the EMI payment/foreclosed/pre-part payment/missed EMI payment against an existing loan.

### Log Verification

#### To verify your logs, you can use the POST api exposed at [https://log-validation.ondc.org/api/validate/fis/fis12](https://log-validation.ondc.org/api/validate/fis/fis12) within the [Log Validation Utility](https://github.com/ONDC-Official/log-validation-utility).

Available flows are:

- PERSONAL
- LOAN_FORECLOSURE
- PRE_PART_PAYMENT
- MISSED_EMI_PAYMENT

The payload structure for validation is as follows:

```json
{
  "domain": "ONDC:FIS12",
  "version": "2.0.0",
  "flow": "PERSONAL",
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

The api call sequence inside the payload object might differ based on different flows

*Note: Log verification will follow a FIFO model with a TAT of 4 days*
