## Capabilities
The following capabilities are supported through ONDC protocol for MF transactions

### Schemes
- Regular schemes

### Transactions
- Lumpsum purchase
- SIP purchase
- Redemption

### Investors
- Resident Individual (>18y age)

### Accounts
- Single holding pattern folios (non-demat)
- Digilocker based eKYC for KRA-KYC non-compliant investors

### Payments
For purchase transactions, Payment is collected by the seller app directly from the investors, through the following modes
- Netbanking
- UPI Collect
- eNACH Mandates
- UPI Autopay

### Partner tagging
- Sub-brokers

## Investor Journeys

### Purchase Journey

```mermaid
flowchart LR
    scheme[Select scheme] --> order[Select lumpsum/sip]

    order -- existing folio --> existing_folio[Choose/Enter folio]
    order -- new folio --> folio_form[Fill folio details]
    order -- new folio w/ kyc --> kyc_form[Fill kyc details] --> digilocker[Fetch docs from digilocker] --> esign[Esign the application form]

    existing_folio -----> 2fa[Accept TnC & 2fa]
    folio_form -----> 2fa
    esign ---> 2fa

    2fa -- existing mandate --> choose_mandate[Choose mandate]
    2fa -- new mandate --> mandate_reg[Register mandate]
    2fa -- other pmt --> pmt[Complete payment]

    choose_mandate ---> finish[Finish]
    mandate_reg ---> finish
    pmt ---> finish
```

### Redemption Journey
```mermaid
flowchart LR
    scheme[Select scheme] --> order[Select redemption]
    order --> choose_folio[Choose/Enter folio]
    choose_folio --> select_bank[Select Payout Bank A/c]
    select_bank -------> 2fa[Accept TnC & 2fa]
    2fa --------> finish[Finish]
```

## Protocol Details

- [Discovery stage is detailed here](./stage-discovery.md)
- [Order stage is detailed here](./stage-order.md)
- [Fulfillment stage is detailed here](stage-fulfillment.md)
- [Order and Payment lifecycle is detailed here](./lifecycle-and-states.md)
