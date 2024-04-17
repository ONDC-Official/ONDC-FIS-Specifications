The following data points cover all the information about the investor, BPPs can ask for, in xinput. It is used for new folio opening. BPPs can ask for all this or a subset of this from the BAP.

```jsonc
{
    "new_folio": [
        "pan",
        "investor_name",
        "date_of_birth",
        "gender",
        "country_of_birth", // enum
        "place_of_birth",
        "marital_status",
        "occupation",
        "source_of_wealth",
        "income_range",
        "pep_details",
        "residential_status", // enum
        "tax_residencies", // can be multiple
        "mode_of_holding", // enum
        "communication_address",
        "communication_phone_number",
        "communication_email_address",
        "overseas_address",
        "payout_bank_account",
        "delivery_demat_account",
        "nominee_information" // can be multiple
    ]
}
```