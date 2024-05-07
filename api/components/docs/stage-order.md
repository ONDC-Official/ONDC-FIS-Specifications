### Selection
Buyer app makes a `select` call with scheme, fulfillment and investor identifier (pan)

Seller app checks the investor identifier to determine if he is kyc compliant and if he already has existing folios and if it can accept orders from that investor for the chosen scheme, it responds with the possible options of existing/new folio.

Buyer app makes a `select` call with the chosen option of existing/new folio.

Seller app checks if all the details are available and correct. If any additional input is needed, seller app responds with the list of required information (one or multiple steps).

#### Possible Workflows
1. Existing folio  
Seller app checks for the folio validity

2. New folio  
Seller app responds with the details needed to open a new folio (1-step xinput)

3. New folio with KYC  
Seller app responds with the details needed to perform kyc (3-step xinput)

Seller app can choose to support all or any of the above scenarios. It will error out for cases it won't support.

```mermaid
sequenceDiagram
    participant bap AS Distributor
    participant bpp AS AMC/Aggregator
    bap ->> bpp: `/select` w/ scheme, investor identifier
    bpp ->> bap: `/on_select` w/ existing/new folio options
    bap ->> bpp: `/select` w/ the choice of existing/new folio
    alt flow = existing folio
        Note over bap, bpp: No additional steps
    else flow = new folio
        rect rgb(191, 223, 255)
            bpp ->> bap: `/on_select` with xinput for folio opening
            create participant fs AS AMC Form System
            bap ->> fs: form submission
            fs ->> bap: form submission response
        end
    else flow = new folio w/ kyc
        rect rgb(102,179,255)
            bpp ->> bap: `/on_select` with xinput for kyc (1st step)
            bap ->> fs: form submission
            fs ->> bap: form submission response
            bap ->> bpp: `/select` w/ form submission id
            bpp ->> bap: `/on_select` with xinput for digilocker fetch (2nd step)
            bap ->> bap: redirect the investor to complete fetch
            bpp ->> bap: `/on_status` with form submission id
            bap ->> bpp: `/select` w/ form submission id
            bpp ->> bap: `/on_select` with xinput for esign (3rd step)
            bap ->> bap: redirect the investor to complete esign
            bpp ->> bap: `/on_status` with form submission id
        end
    end
```

---

### Initiation
Buyer app makes an `init` call with the details of the investor, order, the fulfillment choice and the bank a/c from where the investor want to make the payment

If everything is ready, seller app responds with different payment options through which the investor can make the payment to complete this order. And the order is created in draft state. The terms and conditions to be accepted by the investor is also sent in the response.

##### Payment Options
**New Mandate Registration**  
`amount` represents the mandate limit. It should be atleast the sip instalment amount. Distributor can propose a number, but AMC will have the final say on this.

**Existing Mandate Selection**  
If the investor has an existing mandate, AMC will send that along with masked bank a/c number against which the mandate is registered.

**Netbanking**  
For one time payment, if netbanking is supported for the given investor's bank a/c, AMC will respond with this option.

**UPI Collect**  
For one time payment, if upi collect is supported for the given investor's bank a/c, AMC will respond with this option.

Order in `CREATED` state marks the end of this stage.

#### Initiating Purchase Order
```mermaid
sequenceDiagram
    autonumber
    participant bap AS Distributor
    participant bpp AS AMC/Aggregator
    bap ->> bpp: `/init` w/ order details & fulfillment choice (onetime/sip)
    bpp ->> bap: `/on_init` w/ payment options, TnC & order in `CREATED` state
```

#### Initiating Redemption Order
```mermaid
sequenceDiagram
    autonumber
    participant bap AS Distributor
    participant bpp AS AMC/Aggregator
    bap ->> bpp: `/init` w/ order details & fulfillment choice (onetime/swp)
    bpp ->> bap: `/on_init` w/ TnC & order in `CREATED` state
```
---

### Confirmation
Buyer app sends all the details of the investor and the transaction and the selected payment option along with all the negotiated terms in the previous step. Buyer app takes a clickwrap consent from the investor on the TnC, performs 2fa and sends those details.

Depending on the selected payment option, seller app responds with either a payment URL or order in accepted state.

Order in `ACCEPTED` or `REJECTED` state marks the end of this stage.

#### Confirming Purchase Order
```mermaid
---
title: Confirming Purchase Order
---
sequenceDiagram
    participant Investor
    participant bap AS Distributor
    participant bpp AS AMC/Aggregator
    Note over bap, bpp: Distributor performs 2fa before confirming. <br /> Static terms cover this
    Note over bap, bpp: Acceptance of TnC by the Investor is <br /> assumed w/ the `confirm` call
    bap ->> bpp: `/confirm` w/ selected payment & 2fa details
    alt payment = existing mandate
        rect rgb(191, 223, 255)
            bpp ->> bap: `/on_confirm` w/ order in `ACCEPTED` state
        end
    else payment = new mandate/ netbanking/ upi
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

#### Confirming Redemption Order
```mermaid
---
title: Confirming Redemption Order
---
sequenceDiagram
    participant Investor
    participant bap AS Distributor
    participant bpp AS AMC/Aggregator
    Note over bap, bpp: Distributor performs 2fa before confirming. <br /> Static terms cover this
    Note over bap, bpp: Acceptance of TnC by the Investor is <br /> assumed w/ the `confirm` call
    bap ->> bpp: `/confirm` w/ 2fa details
    alt all validations pass
        rect rgb(191, 223, 255)
            bpp ->> bap: `/on_confirm` w/ order in `ACCEPTED` state
        end
    else validations fail
        rect rgb(191, 223, 255)
            bpp ->> bap: `/on_confirm` w/ order in `REJECTED` state
        end
    end
```

---

##### Multiple Items in an order
Only one item in an order is supported
