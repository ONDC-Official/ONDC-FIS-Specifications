### Purchase Flow

```mermaid
flowchart LR
    scheme[Select scheme] --> order[Select lumpsum/sip]

    order -- existing folio --> existing_folio[Choose folio]
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

### Redemption Flow
```mermaid
flowchart LR
    scheme[Select scheme] --> order[Select redemption/swp]
    order ---> choose_folio[Choose folio]
    choose_folio -----------> 2fa[Accept TnC & 2fa]
    2fa --------> finish[Finish]
```
---

### Selection

```mermaid
sequenceDiagram
    participant bap AS Distributor
    participant bpp AS AMC/Aggregator
    bap ->> bpp: `/select` w/ scheme, investor identifier
    bpp ->> bap: `/on_select` w/ fulfillment options
```

Seller app checks the investor identifier to determine if he is kyc compliant and if he already has existing folios and if it can accept orders from that investor for the given item, it responds with the possible fulfillment options. Each scheme can possibly support different fulfillment options.

Investor identifier can be folio number, pan number.

##### Fulfillment Options

1. `LUMPSUM`  
Investor can make a one time lumpsum purchase
2. `SIP`  
Investor can make a recurring purchase
3. `REDEMPTION`  
Investor can make a one time redemption
4. `SWP`  
Investor can make a recurring redemption
---

### Initiation
Buyer app makes an `init` call with the details of the investor, order and the fulfillment choice.

Seller app checks if all the details are available and correct. If any additional input is needed, seller app responds with the list of required information (one or multiple steps).

3 possible workflows
1. Existing folio  
Seller app checks for the folio validity

2. New folio  
Seller app responds with the details needed to open a new folio

3. New folio with KYC  
Seller app checks for kyc and respond with the details needed to perform kyc

Seller app can choose to support all or any of the above scenarios. It will error out for cases it won't support.

If everything is ready, seller app responds with different payment options through which the investor can make the payment to complete this order. And the order is created.

##### Payment Options
**New Mandate Registration**  
`amount` represents the mandate limit. It should be atleast the sip instalment amount. Distributor can propose a number, but AMC will have the final say on this.

**Existing Mandate Selection**  
If the investor has an existing mandate, AMC will send that along with masked bank a/c number against which the mandate is registered.

**Netbanking**  
For one time payment, if netbanking is supported for the given investor's bank a/c, AMC will respond with this option.

**UPI Collect**  
For one time payment, if upi collect is supported for the given investor's bank a/c, AMC will respond with this option.

**UPI Intent**  
TBD

**NEFT/RTGS**  
AMC will respond with details of the bank a/c into which the Investor has to make payment through neft/rtgs. This can be useful for corporate investors.

Order in `CREATED` state marks the end of this stage.

```mermaid
sequenceDiagram
    autonumber
    participant bap AS Distributor
    participant bpp AS AMC/Aggregator
    bap ->> bpp: `/init` w/ order details & fulfillment choice
    alt flow = existing folio
        Note over bap, bpp: No additional steps
    else flow = new folio
        rect rgb(191, 223, 255)
            bpp ->> bap: `/on_init` with xinput for folio opening
            create participant fs AS AMC Form System
            bap ->> fs: form submission
            fs ->> bap: form submission response
            bap ->> bpp: `/init` w/ form submission id
        end
    else flow = new folio w/ kyc
        rect rgb(102,179,255)
            bpp ->> bap: `/on_init` with xinput for kyc (1st step)
            bap ->> fs: form submission
            fs ->> bap: form submission response
            bap ->> bpp: `/init` w/ form submission id
            bpp ->> bap: `/on_init` with xinput for digilocker fetch (2nd step)
            bap ->> bap: redirect the investor to complete fetch
            bpp ->> bap: `/on_status` with form submission id
            bpp ->> bap: `/on_init` with xinput for esign (3rd step)
            bap ->> bap: redirect the investor to complete esign
            bpp ->> bap: `/on_status` with form submission id
        end
    end
    bpp ->> bap: `/on_init` w/ payment options & order in `CREATED` state
```
---

### Confirmation
Buyer app sends all the details of the investor and the transaction and the selected payment option along with all the negotiated terms in the previous step. Buyer app performs 2fa and sends those details.

Depending on the selected payment option, seller app responds with either a payment URL or order in accepted state.

Order in `ACCEPTED` or `REJECTED` state marks the end of this stage.

```mermaid
sequenceDiagram
    participant Investor
    participant bap AS Distributor
    participant bpp AS AMC/Aggregator
    Note over bap, bpp: Distributor performs 2fa before confirming. <br /> Static terms cover this
    Note over bap, bpp: Acceptance of TnC by the Investor is <br /> assumed w/ the `confirm` call
    bap ->> bpp: `/confirm` w/ selected payment & 2fa details
    %% opt if seller does 2fa
        %% bpp ->> bap: `/on_confirm` w/ xinput for 2fa
        %% bap ->> bpp: form submission
        %% bap ->> bpp: /confirm w/ form submission id
    %% end
    %% bpp ->> bap: `/on_confirm` w/ multiple payment options
    alt payment = existing mandate
        rect rgb(191, 223, 255)
            bpp ->> bap: `/on_confirm` w/ order in `ACCEPTED` state
        end
    else payment = new mandate/ netbanking/ upi collect
        rect rgb(102,179,255)
            bpp ->> bap: `/on_confirm` w/ payment url
            bap --) Investor: Redirect to url
            Investor --) bpp: Completes the payment
            alt payment successful
                bpp ->> bap: `/on_status` w/ order in `ACCEPTED` state
            else payment failed
                bpp ->> bap: `/on_status` w/ order in `REJECTED` state
            end
        end
    end
```
---

### Fulfillment

After the order is accepted, seller app performs the processing and responds with the state of order processing.

Fulfillment in `SUCCESSFUL` or `FAILED` state marks the end of this stage

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

##### Multiple Items in an order
Only one item in an order is supported
