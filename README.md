# ONDC-FIS-Specifications

## Business Term Loan servicing in 2.3.0

The BL branch adds pre-part payment, foreclosure and missed-EMI payment flows
under `api/components/flows/term-loan/`. Each is an independent post-disbursal
example: the original loan `on_confirm`, `update` with `update_target: payments`, a solicited `on_update` quote
and payment URL, then an unsolicited `on_update` after lender-verified payment.
All calls use `ONDC:FIS12:BL`, version `2.3.0` and the existing loan order. No
LAMF drawdown child orders or new protocol API actions are introduced.

The original confirmation is reused directly from the existing bureau-only
single-redirection flow. All servicing requests use its order and transaction IDs;
request payments have no ID. Callbacks preserve its provider, item, fulfillment
and stop hierarchy, documents, terms, disbursement and quote fields. Each
servicing flow is an independent illustration. Collect only the selected
servicing payment amount, never the order quote or a deferred historical row.

The pre-part illustration quotes an amount equal to one original installment;
a separate payment is marked PAID after verification and the corresponding
installment becomes DEFERRED. The missed-EMI illustration uses a separate
settlement for an original installment and an illustrative late fee; the original
moves DELAYED to DEFERRED after verified receipt. Foreclosure uses a separate
settlement, changes order and fulfillment to COMPLETED on verified receipt and
retains the installments as DEFERRED. Payment types use underscore spelling.

**Origination example requires ONDC clarification:** The reused confirmation has
five installments with the same placeholder payment ID and all due dates before
its confirmation timestamp. Its item price is INR 441800; its quote is INR
232800; its principal, interest, processing and insurance amounts total INR
232300; and its five installments total INR 231800. The pre-part, missed-EMI
and foreclosure examples demonstrate protocol structure only: due dates do not
establish a valid advance-payment scenario and the displayed foreclosure amount
is not a lender-verified payoff. The original quote contains informational net
disbursed amount as well as charges; do not sum every breakup row as charges.
ONDC should confirm corrected origination values, unique installment IDs, dates
and the matching servicing amounts before these examples become calculation or
production integration fixtures. A return redirect, screenshot, UTR or transport
ACK is not verified payment.

To validate and rebuild this contribution:

```sh
git submodule update --init
cd api/components
npm ci --ignore-scripts
npm run build:servicing
npm run test:servicing
```

The Flow viewer selects the first call automatically and preserves flow/step
links on refresh. Optional diagrams do not emit undefined text; diagram failures
leave the JSON example readable. Protocol payloads render as literal selectable
text. The optional Attribute tab is disabled when no definitions are published,
without aborting the other tabs. Viewer regression tests run with test:servicing.

The focused builder changes only the servicing flow/example extensions in
`api/build/build.yaml` and `ui/build.js`. It preserves the published API schemas
and existing origination examples/flows. For a fresh generation from a reviewed
published BL revision, use `npm run build:servicing -- --base-ref <git-ref>`.

The general `npm start` build has pre-existing `Business Loan Search/on_search`
validation failures. Its pinned-core rebuild also rewrites existing schema
constraints. The servicing examples are validated against the published BL
schemas and against the old core with a narrow compatibility extension for the
published BL underscore payment types, string quote ID, DELAYED/DEFERRED payment
statuses and COMPLETED order status in the relevant callbacks. The extension does
not change the submodule or unrelated API paths. Unknown values remain rejected.
Do not use the general build's zero exit status alone as validation evidence.

These specifications are to enable ONDC Network Participants to expose or consume financial services on ONDC.

ONDC FIS specification is an adaptation of [beckn financial specifications](https://github.com/beckn/financial-services).

These specifications will be released in multiple phases enabling different use case and enhancements.

ONDC Financial Services developer guide [link](https://ondc-official.github.io/ONDC-FIS-Specifications)

## Latest Version

## Earlier Versions

| Version | Release Date | beckn Version                               | Comments                                                                                         |
| ------- | ------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| v2.0.0  | 21 Feb 2024  | financial-service - 0.2.0<br />core - 1.3.0 | - Added UI for specification visual<br />- Base version of credit for personal loan is completed |

## Introduction

Open Network for Digital Commerce (ONDC) is a network based on beckn open protocol and will enable local commerce across segments, such as financial services, mobility, retail etc, to be discovered and engaged by any network-enabled application.

ONDC financial services aims to build a nationwide multi-modal network that provides seamless experiences, supports growth & innovation by,

* bringing together a diverse set of financial services players who can engage with the open network on their own terms
* fostering collaboration, sharing & new models
* facilitating responsive policy by bringing onboard decision making authorities

In the financial service space, the intent is to enable seamless and truly interoperatable service options by bringing in diverse inventory onboard at scale that will serve the country’s population.

This would be possible in the financial service domain by making sure all financial services apps in the network are built in such a way as to enable them to communicate with each other in the same language.

## Enabled/Supported use cases on network

* Complete credit use case for Personal-loan.
* Personal Loan: Without Account Aggregator
* Loan Foreclosure
* Pre-Part Payment
* Missed-EMI Payment
* Form Status for application/html
* Form Status for text/html
* Purchase Finance
* Purchase Finance: Without Account Aggregator

## Working with Protocol

Refer the [link](./Usage.md) for details regarding how to use this repository

## Evolution

The evolution of ONDC FIS specification driven by 2 factors:

1. The beckn financial services and/or core specification evolution.
2. ONDC Network Participants recommendation and requirement for enhancing and expanding the network use cases & experience.

To know more about how the specification evolves, visit the Network GOVERNANCE document.

To follow discussions related to the financial services specification please visit the [Discussions Forum](https://github.com/ONDC-Official/ONDC-FIS-Specifications/discussions) on GitHub

Each major release of ONDC financial service specification will be approved by ONDC financial service working group members for which are listed [here](./Committee.md)

For minor releases for bug fix and cosmetic changes ONDC would make a minor release based on internal approval process and update the committee in the next scheduled discussion.

## Contribution

### Contribution to specifications

Anyone can contribute to the specification. Please refer beckn contribution guidelines.

### Contribution to network

Anyone can contribute to the network enhancements. Contributors must follow the contribution guidelines.

Each contribution will be peer-reviewed by the ONDC financial services committee members. If approved, this contribution will be merged with the applicable versions of the specification.

#### What is Contribution to network

Addition/Modification of examples, enum, policies which are very specific to the networks scope and purview.
