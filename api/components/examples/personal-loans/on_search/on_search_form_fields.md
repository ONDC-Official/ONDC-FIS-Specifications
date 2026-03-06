# ONDC FIS - on_search Form Fields

> Auto-generated from `on_search_request_common.yaml`

| Form Field Name | Form Headings | Use-case Name | Form Field Type | Required | Regex | ENUM |
|---|---|---|---|---|---|---|
| panName | PERSONAL_INFORMATION | | string | - | - | - |
| personalEmail | PERSONAL_INFORMATION | | string | - | - | - |
| officialEmail | PERSONAL_INFORMATION | | string | - | - | - |
| dob | PERSONAL_INFORMATION | | string | - | - | - |
| gender | PERSONAL_INFORMATION | | enum | - | - | Male\|Female\|Transgender |
| pan | PERSONAL_INFORMATION | | string | - | - | - |
| contactNumber | PERSONAL_INFORMATION | | string | - | `^(?:\+91\|91)?[6-9]\d{9}$` | - |
| employmentType | PERSONAL_INFORMATION | | enum | - | - | Salaried\|Self Employment |
| income | PERSONAL_INFORMATION | | string | - | - | - |
| companyName | PERSONAL_INFORMATION | | string | - | - | - |
| udyamNumber | PERSONAL_INFORMATION | | string | - | - | - |
| addressL1 | PERSONAL_INFORMATION | | string | - | - | - |
| addressL2 | PERSONAL_INFORMATION | | string | - | - | - |
| city | PERSONAL_INFORMATION | | string | - | - | - |
| state | PERSONAL_INFORMATION | | string | - | - | - |
| pincode | PERSONAL_INFORMATION | | string | - | - | - |
| bureauConsent | PERSONAL_INFORMATION | | boolean | - | - | - |
| aa_id | PERSONAL_INFORMATION | | string | - | `^[A-Za-z0-9]+@[A-Za-z0-9]+(?:\.[A-Za-z]{2,})?$` | - |
| endUse | PERSONAL_INFORMATION | | enum | - | - | Purchase of Consumer Durables\|Education\|Travel\|Health\|Other Consumption Purposes |
| udyamNumber | ORGANIZATION_INFORMATION | | string | false | `^[a-zA-Z0-9-]+$` | - |
| contactNumber | ORGANIZATION_INFORMATION | | string | false | `^(?:\+91\|91)?[6-9]\d{9}$` | - |
| email | ORGANIZATION_INFORMATION | | string | false | `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$` | - |
| gstinProfile | ORGANIZATION_INFORMATION | | file | false | - | - |
| gstr1 | ORGANIZATION_INFORMATION | | file | false | - | - |
| gstr2A | ORGANIZATION_INFORMATION | | file | false | - | - |
| gstr3B | ORGANIZATION_INFORMATION | | file | false | - | - |
| bureauConsent | ORGANIZATION_INFORMATION | | boolean | true | - | - |
| aa_id | ORGANIZATION_INFORMATION | | string | false | `^[A-Za-z0-9]+@[A-Za-z0-9]+(?:\.[A-Za-z]{2,})?$` | - |
| tnc | ORGANIZATION_INFORMATION | | boolean | - | - | - |
| pan | MERCHANT_AND_PRDOUCT_DETAILS | | string | false | `^[A-Z]{5}[0-9]{4}[A-Z]$` | - |
| gst | MERCHANT_AND_PRDOUCT_DETAILS | | string | false | `^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$` | - |
| bankAccountNumber | MERCHANT_AND_PRDOUCT_DETAILS | | string | false | `^\d{9,18}$'` | - |
| bankIfscNumber | MERCHANT_AND_PRDOUCT_DETAILS | | string | false | `^[A-Z]{4}0[A-Z0-9]{6}$` | - |
| bankAccountHolderName | MERCHANT_AND_PRDOUCT_DETAILS | | string | false | `^[A-Za-z]+(?:\s[A-Za-z]+)*$` | - |
| productCategory | MERCHANT_AND_PRDOUCT_DETAILS | | string | false | `^[A-Za-z]+(?:\s[A-Za-z]+)*$` | - |
| productBrand | MERCHANT_AND_PRDOUCT_DETAILS | | string | false | `^[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$` | - |
| productModel | MERCHANT_AND_PRDOUCT_DETAILS | | string | false | `^[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$` | - |
| productSKUID | MERCHANT_AND_PRDOUCT_DETAILS | | string | false | `^[A-Za-z0-9]+([_-][A-Za-z0-9]+)*$` | - |
| productPrice | MERCHANT_AND_PRDOUCT_DETAILS | | string | false | `^\d+(\.\d{1,2})?$` | - |
| productReturnPeriod | MERCHANT_AND_PRDOUCT_DETAILS | | string | false | `^P\d+[YMD]$` | - |
| maxSellerSubvention | MERCHANT_AND_PRDOUCT_DETAILS | | string | false | `^\d+(\.\d{1,2})?$` | - |
| userType | PERSONAL_INFORMATION_GOLD | | enum | false | - | Individual\|Non-Individual |
| pan | PERSONAL_INFORMATION_GOLD | | string | true | `^[A-Z]{5}[0-9]{4}[A-Z]$` | - |
| fullName | PERSONAL_INFORMATION_GOLD | | string | true | `^[A-Za-z]+(?:\s[A-Za-z]+)*$` | - |
| constitution | PERSONAL_INFORMATION_GOLD | | string | false | `^[A-Za-z]+(?:\s[A-Za-z]+)*$` | - |
| gender | PERSONAL_INFORMATION_GOLD | | enum | true | - | Male\|Female\|Transgender |
| employmentType | PERSONAL_INFORMATION_GOLD | | enum | false | - | Salaried\|Self Employment |
| dob | PERSONAL_INFORMATION_GOLD | | string | true | `^(0[1-9]\|[12][0-9]\|3[01])/(0[1-9]\|1[0-2])/\d{4}$` | - |
| annualIncome | PERSONAL_INFORMATION_GOLD | | string | false | `^(?!0+(\.0+)?$)\d+(\.\d{1,2})?$` | - |
| contactNumber | PERSONAL_INFORMATION_GOLD | | string | true | `^(?:\+91\|91)?[6-9]\d{9}$` | - |
| email | PERSONAL_INFORMATION_GOLD | | string | false | `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$` | - |
| address | PERSONAL_INFORMATION_GOLD | | string | false | `^[a-zA-Z0-9\s,.-/]+$` | - |
| pincode | PERSONAL_INFORMATION_GOLD | | string | true | `^[1-9][0-9]{5}$` | - |
| city | PERSONAL_INFORMATION_GOLD | | string | false | `^[a-zA-Z]+(?:[ .'-][a-zA-Z]+)*$` | - |
| state | PERSONAL_INFORMATION_GOLD | | string | false | `^[a-zA-Z]+(?:[ .'-][a-zA-Z]+)*$` | - |
| jewellery | PERSONAL_INFORMATION_GOLD | | string | true | `^\d+(\.\d{1,3})?$` | - |
| purity | PERSONAL_INFORMATION_GOLD | | enum | true | - | 24K\|22K\|21K\|18k\|14K\|9K |
| endUse | PERSONAL_INFORMATION_GOLD | | enum | false | - | Marriage\|Family Functions\|Medical Treatment and Emergencies\|Travel\|Education Expenses\|Business Expansion\|Agriculture and Farm-Related Needs\|Purchase of Equipment\|Others |
| bureauConsent | PERSONAL_INFORMATION_GOLD | | boolean | true | - | - |
| aa_id | PERSONAL_INFORMATION_GOLD | | string | false | `^[A-Za-z0-9]+@[A-Za-z0-9]+(?:\.[A-Za-z]{2,})?$` | - |
| gstinProfile_1 | BANK_STATEMENT_AND_GST_RETURNS | | file | true | - | - |
| gstr1B2bInvoice_1 | BANK_STATEMENT_AND_GST_RETURNS | | file | true | - | - |
| gstr1B2bCdnr_1 | BANK_STATEMENT_AND_GST_RETURNS | | file | true | - | - |
| gstr1B2bSummary_1 | BANK_STATEMENT_AND_GST_RETURNS | | file | false | - | - |
| gstr1B2bHsnSummary_1 | BANK_STATEMENT_AND_GST_RETURNS | | file | false | - | - |
| gstr2aB2bInvoices_1 | BANK_STATEMENT_AND_GST_RETURNS | | file | true | - | - |
| gstr3bSummary_1 | BANK_STATEMENT_AND_GST_RETURNS | | file | true | - | - |
| bankStatementFiles_1 | BANK_STATEMENT_AND_GST_RETURNS | | file | true | - | - |
| bankName_1 | BANK_STATEMENT_AND_GST_RETURNS | | string | true | `^[A-Za-z]+(?:\s[A-Za-z]+)*$` | - |
| filePassword_1 | BANK_STATEMENT_AND_GST_RETURNS | | string | false | `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$` | - |
| mimeType_1 | BANK_STATEMENT_AND_GST_RETURNS | | enum | true | - | Excel (XLSX)\|Excel (XLS) |
| gstinProfile_2 | BANK_STATEMENT_AND_GST_RETURNS | | file | true | - | - |
| gstr1B2bInvoice_2 | BANK_STATEMENT_AND_GST_RETURNS | | file | true | - | - |
| gstr1B2bCdnr_2 | BANK_STATEMENT_AND_GST_RETURNS | | file | true | - | - |
| gstr1B2bSummary_2 | BANK_STATEMENT_AND_GST_RETURNS | | file | false | - | - |
| gstr1B2bHsnSummary_2 | BANK_STATEMENT_AND_GST_RETURNS | | file | false | - | - |
| gstr2aB2bInvoices_2 | BANK_STATEMENT_AND_GST_RETURNS | | file | true | - | - |
| gstr3bSummary_2 | BANK_STATEMENT_AND_GST_RETURNS | | file | true | - | - |
| bankStatementFiles_2 | BANK_STATEMENT_AND_GST_RETURNS | | file | true | - | - |
| bankName_2 | BANK_STATEMENT_AND_GST_RETURNS | | string | true | `^[A-Za-z]+(?:\s[A-Za-z]+)*$` | - |
| filePassword_2 | BANK_STATEMENT_AND_GST_RETURNS | | string | false | `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$` | - |
| mimeType_2 | BANK_STATEMENT_AND_GST_RETURNS | | enum | true | - | Excel (XLSX)\|Excel (XLS) |
| bureauConsent | BANK_STATEMENT_AND_GST_RETURNS | | boolean | true | - | - |
| udyamNumber | BANK_STATEMENT_AND_GST_RETURNS | | string | false | `^[a-zA-Z0-9-]+$` | - |
| aa_id | BANK_STATEMENT_AND_GST_RETURNS | | string | true | `^[A-Za-z0-9]+@[A-Za-z0-9]+(?:\.[A-Za-z]{2,})?$` | - |
| pan | PERSONAL_INFORMATION_TERM | | string | true | `^[A-Z]{5}[0-9]{4}[A-Z]$` | - |
| fullName | PERSONAL_INFORMATION_TERM | | string | true | `^[A-Za-z]+(?:\s[A-Za-z]+)*$` | - |
| dob | PERSONAL_INFORMATION_TERM | | string | true | `^(0[1-9]\|[12][0-9]\|3[01])/(0[1-9]\|1[0-2])/\d{4}$` | - |
| addressL1 | PERSONAL_INFORMATION_TERM | | string | false | `^[a-zA-Z0-9\s,.-/]+$` | - |
| addressL2 | PERSONAL_INFORMATION_TERM | | string | false | `^[a-zA-Z0-9\s,.-/]+$` | - |
| pincode | PERSONAL_INFORMATION_TERM | | string | false | `^[1-9][0-9]{5}$` | - |
| city | PERSONAL_INFORMATION_TERM | | string | false | `^[a-zA-Z]+(?:[ .'-][a-zA-Z]+)*$` | - |
| state | PERSONAL_INFORMATION_TERM | | string | false | `^[a-zA-Z]+(?:[ .'-][a-zA-Z]+)*$` | - |
| constitution | PERSONAL_INFORMATION_TERM | | enum | true | - | SELF EMPLOYED\|SELF EMPLOYED PROFESSIONAL- DOCTOR\|SELF EMPLOYED PROFESSIONAL-OTHERS\|SOLE PROP FIRM\|PARTNERSHIP FIRM\|PRIVATE LIMITED\|LLP\|ETC |
| businessPan | PERSONAL_INFORMATION_TERM | | string | true | `^[A-Z]{5}[0-9]{4}[A-Z]$` | - |
| businessPanName | PERSONAL_INFORMATION_TERM | | string | false | `^[A-Za-z]+(?:\s[A-Za-z]+)*$` | - |
| doi | PERSONAL_INFORMATION_TERM | | string | true | `^(0[1-9]\|[12][0-9]\|3[01])/(0[1-9]\|1[0-2])/\d{4}$` | - |
| natureOfBusiness | PERSONAL_INFORMATION_TERM | | enum | true | - | Trading\|Service |
| udyamNumber | PERSONAL_INFORMATION_TERM | | string | false | `^[a-zA-Z0-9-]+$` | - |
| gst | PERSONAL_INFORMATION_TERM | | string | false | `^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$` | - |
| annualTurnover | PERSONAL_INFORMATION_TERM | | string | true | `^(?!0+(\.0+)?$)\d+(\.\d{1,2})?$` | - |
| businessEmail | PERSONAL_INFORMATION_TERM | | string | false | `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$` | - |
| businessAddressL1 | PERSONAL_INFORMATION_TERM | | string | false | `^[a-zA-Z0-9\s,.-/]+$` | - |
| businessAddressL2 | PERSONAL_INFORMATION_TERM | | string | false | `^[a-zA-Z0-9\s,.-/]+$` | - |
| businessCity | PERSONAL_INFORMATION_TERM | | string | false | `^[a-zA-Z]+(?:[ .'-][a-zA-Z]+)*$` | - |
| businessState | PERSONAL_INFORMATION_TERM | | string | false | `^[a-zA-Z]+(?:[ .'-][a-zA-Z]+)*$` | - |
| businessPincode | PERSONAL_INFORMATION_TERM | | string | true | `^[1-9][0-9]{5}$` | - |
| bureauConsent | PERSONAL_INFORMATION_TERM | | boolean | false | - | - |
| aa_id | PERSONAL_INFORMATION_TERM | | string | true | `^[A-Za-z0-9]+@[A-Za-z0-9]+(?:\.[A-Za-z]{2,})?$` | - |
| endUse | PERSONAL_INFORMATION_TERM | | enum | false | - | Business expansion\|Working Capital |
| udyamNumber | PERSONAL_INFORMATION_TERM_GST | | string | false | `^[a-zA-Z0-9-]+$` | - |
| contactNumber | PERSONAL_INFORMATION_TERM_GST | | string | false | `^(?:\+91\|91)?[6-9]\d{9}$` | - |
| email | PERSONAL_INFORMATION_TERM_GST | | string | false | `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$` | - |
| gstinProfile | PERSONAL_INFORMATION_TERM_GST | | file | false | - | - |
| gstr1 | PERSONAL_INFORMATION_TERM_GST | | file | false | - | - |
| gstr2A | PERSONAL_INFORMATION_TERM_GST | | file | false | - | - |
| gstr3B | PERSONAL_INFORMATION_TERM_GST | | file | false | - | - |
| bureauConsent | PERSONAL_INFORMATION_TERM_GST | | boolean | true | - | - |
| aa_id | PERSONAL_INFORMATION_TERM_GST | | string | false | `^[A-Za-z0-9]+@[A-Za-z0-9]+(?:\.[A-Za-z]{2,})?$` | - |
| tnc | PERSONAL_INFORMATION_TERM_GST | | boolean | - | - | - |
| pan | PERSONAL_INFORMATION_BUSINESS_TERM | | string | true | `^[A-Z]{5}[0-9]{4}[A-Z]$` | - |
| fullName | PERSONAL_INFORMATION_BUSINESS_TERM | | string | true | `^[A-Za-z]+(?:\s[A-Za-z]+)*$` | - |
| dob | PERSONAL_INFORMATION_BUSINESS_TERM | | string | true | `^(0[1-9]\|[12][0-9]\|3[01])/(0[1-9]\|1[0-2])/\d{4}$` | - |
| addressL1 | PERSONAL_INFORMATION_BUSINESS_TERM | | string | false | `^[a-zA-Z0-9\s,.-/]+$` | - |
| addressL2 | PERSONAL_INFORMATION_BUSINESS_TERM | | string | false | `^[a-zA-Z0-9\s,.-/]+$` | - |
| pincode | PERSONAL_INFORMATION_BUSINESS_TERM | | string | false | `^[1-9][0-9]{5}$` | - |
| city | PERSONAL_INFORMATION_BUSINESS_TERM | | string | false | `^[a-zA-Z]+(?:[ .'-][a-zA-Z]+)*$` | - |
| state | PERSONAL_INFORMATION_BUSINESS_TERM | | string | false | `^[a-zA-Z]+(?:[ .'-][a-zA-Z]+)*$` | - |
| constitution | PERSONAL_INFORMATION_BUSINESS_TERM | | enum | true | - | SELF EMPLOYED\|SELF EMPLOYED PROFESSIONAL- DOCTOR\|SELF EMPLOYED PROFESSIONAL-OTHERS\|SOLE PROP FIRM\|PARTNERSHIP FIRM\|PRIVATE LIMITED\|LLP\|ETC |
| businessPan | PERSONAL_INFORMATION_BUSINESS_TERM | | string | true | `^[A-Z]{5}[0-9]{4}[A-Z]$` | - |
| businessPanName | PERSONAL_INFORMATION_BUSINESS_TERM | | string | false | `^[A-Za-z]+(?:\s[A-Za-z]+)*$` | - |
| doi | PERSONAL_INFORMATION_BUSINESS_TERM | | string | true | `^(0[1-9]\|[12][0-9]\|3[01])/(0[1-9]\|1[0-2])/\d{4}$` | - |
| natureOfBusiness | PERSONAL_INFORMATION_BUSINESS_TERM | | enum | true | - | Trading\|Service |
| udyamNumber | PERSONAL_INFORMATION_BUSINESS_TERM | | string | false | `^[a-zA-Z0-9-]+$` | - |
| gst | PERSONAL_INFORMATION_BUSINESS_TERM | | string | false | `^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$` | - |
| annualTurnover | PERSONAL_INFORMATION_BUSINESS_TERM | | string | true | `^(?!0+(\.0+)?$)\d+(\.\d{1,2})?$` | - |
| businessEmail | PERSONAL_INFORMATION_BUSINESS_TERM | | string | false | `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$` | - |
| businessAddressL1 | PERSONAL_INFORMATION_BUSINESS_TERM | | string | false | `^[a-zA-Z0-9\s,.-/]+$` | - |
| businessAddressL2 | PERSONAL_INFORMATION_BUSINESS_TERM | | string | false | `^[a-zA-Z0-9\s,.-/]+$` | - |
| businessCity | PERSONAL_INFORMATION_BUSINESS_TERM | | string | false | `^[a-zA-Z]+(?:[ .'-][a-zA-Z]+)*$` | - |
| businessState | PERSONAL_INFORMATION_BUSINESS_TERM | | string | false | `^[a-zA-Z]+(?:[ .'-][a-zA-Z]+)*$` | - |
| businessPincode | PERSONAL_INFORMATION_BUSINESS_TERM | | string | true | `^[1-9][0-9]{5}$` | - |
| bureauConsent | PERSONAL_INFORMATION_BUSINESS_TERM | | boolean | false | - | - |
| userType | PERSONAL_INFORMATION_LAMF | | enum | false | - | Individual\|Sole Prop |
| pan | PERSONAL_INFORMATION_LAMF | | string | true | `^[A-Z]{5}[0-9]{4}[A-Z]$` | - |
| fullName | PERSONAL_INFORMATION_LAMF | | string | true | `^[A-Za-z]+(?:\s[A-Za-z]+)*$` | - |
| constitution | PERSONAL_INFORMATION_LAMF | | enum | true | - | Partnership firm\|ETC |
| gender | PERSONAL_INFORMATION_LAMF | | enum | true | - | Male\|Female\|transgender |
| employmentType | PERSONAL_INFORMATION_LAMF | | enum | true | - | Salaried\|Self Employment |
| dob | PERSONAL_INFORMATION_LAMF | | string | true | `^(0[1-9]\|[12][0-9]\|3[01])/(0[1-9]\|1[0-2])/\d{4}$` | - |
| annualIncome | PERSONAL_INFORMATION_LAMF | | string | true | `^(?!0+(\.0+)?$)\d+(\.\d{1,2})?$` | - |
| mobileNumber | PERSONAL_INFORMATION_LAMF | | string | true | `^(?:\+91\|91)?[6-9]\d{9}$` | - |
| emailId | PERSONAL_INFORMATION_LAMF | | string | true | `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$` | - |
| addressL1 | PERSONAL_INFORMATION_LAMF | | string | false | `^[a-zA-Z0-9\s,.-/]+$` | - |
| addressL2 | PERSONAL_INFORMATION_LAMF | | string | false | `^[a-zA-Z0-9\s,.-/]+$` | - |
| pincode | PERSONAL_INFORMATION_LAMF | | string | false | `^[1-9][0-9]{5}$` | - |
| city | PERSONAL_INFORMATION_LAMF | | string | false | `^[a-zA-Z]+(?:[ .'-][a-zA-Z]+)*$` | - |
| state | PERSONAL_INFORMATION_LAMF | | string | false | `^[a-zA-Z]+(?:[ .'-][a-zA-Z]+)*$` | - |
| endUse | PERSONAL_INFORMATION_LAMF | | enum | false | - | Purchase of Consumer Durables\|Education\|Travel\|Health\|Other Consumption Purposes |
| bureauConsent | PERSONAL_INFORMATION_LAMF | | boolean | true | - | - |
| aa_id | PERSONAL_INFORMATION_LAMF | | string | false | `^[A-Za-z0-9]+@[A-Za-z0-9]+(?:\.[A-Za-z]{2,})?$` | - |
| statementUpload | PERSONAL_INFORMATION_LAMF | | file | true | - | - |
| rtaName | PERSONAL_INFORMATION_LAMF | | enum | true | - | cams\|KFintech |
