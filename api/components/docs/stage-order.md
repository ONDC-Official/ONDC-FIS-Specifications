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

If everything is ready, seller app responds with different payment options through which the investor can make the payment to complete this order.

##### Payment Options
**New Mandate Registration**  
`amount` represents the mandate limit. It should be atleast the sip instalment amount. Distributor can propose a number, but AMC will have the final say on this.

**Existing Mandate Selection**  
If the investor has an existing mandate, AMC will send that along with masked bank a/c number against which the mandate is registered.

**Netbanking**  
For one time payment, if netbanking is supported for the given investor's bank a/c, AMC will respond with this option.

**UPI Collect**  
For one time payment, if upi collect is supported for the given investor's bank a/c, AMC will respond with this option.

```mermaid
sequenceDiagram
    participant bap AS Distributor
    participant bpp AS AMC/Aggregator
    bap ->> bpp: `/select` w/ scheme, investor identifier
    alt flow = existing folio
        bpp ->> bap: `/on_select` w/ existing + new folio options
    else flow = new folio
        rect rgb(191, 223, 255)
            bpp ->> bap: `/on_select` with xinput for folio opening
            create participant fs AS AMC Form System
            bap ->> fs: form submission
            fs -->> bap: form submission response w/ submission id
            bap ->> bpp: `/select` with form submission id
            bpp ->> bap: `/on_select` w/ form submission success
        end
    else flow = new folio w/ kyc
        rect rgb(102,179,255)
            bpp ->> bap: `/on_select` with xinput for kyc (1st step)
            bap ->> fs: form 1 submission
            fs -->> bap: form 1 submission response w/ submission id
            bap ->> bpp: `/select` w/ form 1 submission id
            bpp ->> bap: `/on_select` with xinput for digilocker fetch (2nd step)
            bap ->> bap: redirect the investor to complete fetch
            bpp ->> bap: `/on_status` with form 2 submission id
            bap ->> bpp: `/select` w/ form 2 submission id
            bpp ->> bap: `/on_select` with xinput for esign (3rd step)
            bap ->> bap: redirect the investor to complete esign
            bpp ->> bap: `/on_status` with form 3 submission id
            bap ->> bpp: `/select` w/ form 3 submission id
            bpp ->> bap: `/on_select` w/ form 3 submission success
        end
    end
```

---

### Initiation
Buyer app makes an `init` call with the details of the investor, order, the fulfillment choice and the bank a/c from where the investor want to make the payment and the payment method. Buyer app takes a clickwrap consent from the investor on the TnC, performs 2fa and sends those details.

Seller app checks all the inputs and the order is created in draft state. The payment URL is sent in the response.

Order in `CREATED` state marks the end of this stage.

#### Initiating Purchase Order
```mermaid
sequenceDiagram
    autonumber
    participant bap AS Distributor
    participant bpp AS AMC/Aggregator
    Note over bap, bpp: Distributor performs 2fa before confirming. <br /> Static terms cover this
    bap ->> bpp: `/init` w/ order details, fulfillment choice (onetime/sip), payment method and bank a/c
    bpp ->> bap: `/on_init` w/ payment URL & order in `CREATED` state
```

#### Initiating Redemption Order
```mermaid
sequenceDiagram
    autonumber
    participant bap AS Distributor
    participant bpp AS AMC/Aggregator
    Note over bap, bpp: Distributor performs 2fa before confirming. <br /> Static terms cover this
    bap ->> bpp: `/init` w/ order details, fulfillment choice (onetime/swp)
    bpp ->> bap: `/on_init` w/ order in `CREATED` state
```
---

### Confirmation
Buyer app sends all the details of the investor and the transaction and the selected payment option along with all the negotiated terms in the previous step.

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
    Note over bap, bpp: Acceptance of TnC by the Investor is <br /> assumed w/ the `confirm` call
    bap ->> bpp: `/confirm` w/ all order details
    alt payment = existing mandate
        rect rgb(191, 223, 255)
            bpp ->> bap: `/on_confirm` w/ order in `ACCEPTED` and payment in `PAID` state
        end
    else payment = new mandate/ netbanking/ upi
        rect rgb(102,179,255)
            bpp ->> bap: `/on_confirm` w/ order in `ACCEPTED` state
            bap --) Investor: Redirect to payment url
            Investor --) bpp: Completes the payment
            alt payment successful
                bpp ->> bap: `/on_status` w/ payment in `PAID` state
            else payment failed
                bpp ->> bap: `/on_status` w/ payment in `FAILED` state
            end
        end
    end
```

If the payment fails, buyer app can ask for a new payment link by calling the update api with the payment object containing investor bank a/c and payment mode.  
Seller app will respond with the new payment link for payment. If the seller app doesn't accept change of bank a/c, it should error out in the `on_update` call.

#### Confirming Redemption Order
```mermaid
---
title: Confirming Redemption Order
---
sequenceDiagram
    participant Investor
    participant bap AS Distributor
    participant bpp AS AMC/Aggregator
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
