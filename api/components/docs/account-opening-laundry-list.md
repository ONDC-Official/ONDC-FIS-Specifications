The following data points cover all the information about the investor, BPPs can ask for, in xinput. It is used for new folio opening and kyc. BPPs can ask for all this or a subset of this from the BAP.

```jsonc
{
    "account": {
        "investor_name": "",
        "date_of_birth": "",
        "gender": "",
        "father_name": "",
        "mother_name": "",
        "aadhaar_number": "",
        "marital_status": "",
        "occupation": "",
        "source_of_wealth": "",
        "income_range": "",
        "country_of_birth": "", // enum
        "place_of_birth": "",
        "political_exposure": "",

        "india_tax_residency_status": "", // enum
        "pan": "",
        "pekrn": "",
        "other_tax_residencies": [
            {
                "country": "",
                "identifier": "" // in the format `idtype:idnumber`. eg. `ssn:234234234324`
            }
        ],

        "mode_of_holding": "", // enum
        "communication_address": {
            "address": "",
            "postal_code": "",
            "country": "",
            "nature" // enum - `residential`, `business_location`
        },
        "communication_phone_number": {
            "phone_number": "",
            "belongs_to": "" // enum - `self`, `father` etc.
        },
        "communication_email_address": {
            "emailid": "",
            "belongs_to": "" // enum - `self`, `father` etc.
        },
        "overseas_address": {
            "address": "",
            "postal_code": "",
            "country": "",
            "nature": "" // enum - `residential`, `business_location`
        },
        "payout_bank_accounts": [
            {
                "account_number": "",
                "primary_account_holder_name": "",
                "account_type": "",
                "bank_code": ""
            }
        ],
        "nomination": [
            {
                "name": "",
                "pan": "",
                "date_of_birth": "",
                "relationship": "",
                "guardian_name": "",
                "guardian_pan": "",
                "allocation_percentage": ""
            }
        ],
    }
}
```