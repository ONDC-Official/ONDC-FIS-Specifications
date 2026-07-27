# Common Forms Fields

| Form Field Name | Form Headings | Use-case Name | Form Field Type | Required | Regex | ENUM | FORMAT |
|---|---|---|---|---|---|---|---|
| pan | PERSONAL_INFORMATION_BUSINESS_TERM, PERSONAL_INFORMATION_LAMF, PERSONAL_INFORMATION_SOLAR | BL-Term Loan, LAMF, PF | string | true | `^[A-Z]{5}[0-9]{4}[A-Z]$` | - |  |
| fullName | PERSONAL_INFORMATION_BUSINESS_TERM, PERSONAL_INFORMATION_LAMF, PERSONAL_INFORMATION_SOLAR |  | string | true | `^[A-Za-z]+(?:\s[A-Za-z]+)*$` | - |  |
| dob | PERSONAL_INFORMATION_BUSINESS_TERM, PERSONAL_INFORMATION_LAMF, PERSONAL_INFORMATION_SOLAR |  | string | true | `^(0[1-9]\|[12][0-9]\|3[01])/(0[1-9]\|1[0-2])/\d{4}$` | - |  |
| addressL1 | PERSONAL_INFORMATION_BUSINESS_TERM, PERSONAL_INFORMATION_LAMF |  | string | false | `^[a-zA-Z0-9\s#,./-]+$` | - |  |
| addressL2 | PERSONAL_INFORMATION_BUSINESS_TERM, PERSONAL_INFORMATION_LAMF |  | string | false | `^[a-zA-Z0-9\s#,./-]+$` | - |  |
| pincode | PERSONAL_INFORMATION_BUSINESS_TERM, PERSONAL_INFORMATION_LAMF |  | string | false | `^[1-9][0-9]{5}$` | - |  |
| city | PERSONAL_INFORMATION_BUSINESS_TERM, PERSONAL_INFORMATION_LAMF |  | string | false | `^[a-zA-Z]+(?:[ .'-][a-zA-Z]+)*$` | - |  |
| state | PERSONAL_INFORMATION_BUSINESS_TERM, PERSONAL_INFORMATION_LAMF |  | string | false | `^[a-zA-Z]+(?:[ .'-][a-zA-Z]+)*$` | - |  |
| constitution | PERSONAL_INFORMATION_BUSINESS_TERM |  | enum | true | - | SELF EMPLOYED\|SELF EMPLOYED PROFESSIONAL- DOCTOR\|SELF EMPLOYED PROFESSIONAL-OTHERS\|SOLE PROP FIRM\|PARTNERSHIP FIRM\|PRIVATE LIMITED\|LLP\|ETC |  |
| businessPan | PERSONAL_INFORMATION_BUSINESS_TERM |  | string | true | `^[A-Z]{5}[0-9]{4}[A-Z]$` | - |  |
| businessPanName | PERSONAL_INFORMATION_BUSINESS_TERM |  | string | false | `^[A-Za-z]+(?:\s[A-Za-z]+)*$` | - |  |
| doi | PERSONAL_INFORMATION_BUSINESS_TERM |  | string | true | `^(0[1-9]\|[12][0-9]\|3[01])/(0[1-9]\|1[0-2])/\d{4}$` | - |  |
| natureOfBusiness | PERSONAL_INFORMATION_BUSINESS_TERM |  | enum | true | - | Trading\|Service |  |
| udyamNumber | PERSONAL_INFORMATION_BUSINESS_TERM |  | string | false | `^[a-zA-Z0-9-]+$` | - |  |
| gst | PERSONAL_INFORMATION_BUSINESS_TERM |  | string | false | `^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$` | - |  |
| annualTurnover | PERSONAL_INFORMATION_BUSINESS_TERM |  | string | true | `^(?!0+(\.0+)?$)\d+(\.\d{1,2})?$` | - |  |
| businessEmail | PERSONAL_INFORMATION_BUSINESS_TERM |  | string | false | `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$` | - |  |
| businessAddressL1 | PERSONAL_INFORMATION_BUSINESS_TERM |  | string | false | `^[a-zA-Z0-9\s#,./-]+$` | - |  |
| businessAddressL2 | PERSONAL_INFORMATION_BUSINESS_TERM |  | string | false | `^[a-zA-Z0-9\s#,./-]+$` | - |  |
| businessCity | PERSONAL_INFORMATION_BUSINESS_TERM |  | string | false | `^[a-zA-Z]+(?:[ .'-][a-zA-Z]+)*$` | - |  |
| businessState | PERSONAL_INFORMATION_BUSINESS_TERM |  | string | false | `^[a-zA-Z]+(?:[ .'-][a-zA-Z]+)*$` | - |  |
| businessPincode | PERSONAL_INFORMATION_BUSINESS_TERM |  | string | true | `^[1-9][0-9]{5}$` | - |  |
| bureauConsent | PERSONAL_INFORMATION_BUSINESS_TERM, PERSONAL_INFORMATION_SOLAR |  | boolean | true | - | - |  |
| aa_id | PERSONAL_INFORMATION_BUSINESS_TERM |  | string | true | `^[A-Za-z0-9]+@[A-Za-z0-9]+(?:\.[A-Za-z]{2,})?$` | - |  |
| endUse | PERSONAL_INFORMATION_BUSINESS_TERM |  | enum | false | - | Business expansion\|Working Capital |  |
| userType | PERSONAL_INFORMATION_LAMF | LAMF - Term Loan without AA | enum | false | - | Individual\|Sole Prop |  |
| constitution | PERSONAL_INFORMATION_LAMF |  | enum | true | - | Partnership firm\|ETC |  |
| gender | PERSONAL_INFORMATION_LAMF, PERSONAL_INFORMATION_SOLAR |  | enum | true | - | Male\|Female\|transgender |  |
| employmentType | PERSONAL_INFORMATION_LAMF, PERSONAL_INFORMATION_SOLAR |  | enum | true | - | Salaried\|Self Employment |  |
| annualIncome | PERSONAL_INFORMATION_LAMF |  | string | true | `^(?!0+(\.0+)?$)\d+(\.\d{1,2})?$` | - |  |
| mobileNumber | PERSONAL_INFORMATION_LAMF, PERSONAL_INFORMATION_SOLAR |  | string | true | `^(?:\+91\|91)?[6-9]\d{9}$` | - |  |
| emailId | PERSONAL_INFORMATION_LAMF |  | string | true | `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$` | - |  |
| endUse | PERSONAL_INFORMATION_LAMF |  | enum | false | - | Purchase of Consumer Durables\|Education\|Travel\|Health\|Other Consumption Purposes |  |
| aa_id | PERSONAL_INFORMATION_LAMF |  | string | false | `^[A-Za-z0-9]+@[A-Za-z0-9]+(?:\.[A-Za-z]{2,})?$` | - |  |
| statementUpload | PERSONAL_INFORMATION_LAMF |  | file | true | - | - | .json |
| rtaName | PERSONAL_INFORMATION_LAMF |  | enum | true | - | cams\|KFintech |  |
| merchantPan | MERCHANT_AND_PRODUCT_DETAILS | Purchase Finance | string | true | `^[A-Z]{5}[0-9]{4}[A-Z]$` |  |  |
| merchantGst | MERCHANT_AND_PRODUCT_DETAILS |  | string | true | `^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$` |  |  |
| merchantAccountNumber | MERCHANT_AND_PRODUCT_DETAILS |  | string | true | ^\d{9,18} |  |  |
| merchantIfsc | MERCHANT_AND_PRODUCT_DETAILS |  | string | true | ^[A-Z]{4}0[A-Z0-9]{6} |  |  |
| merchantAccountHolderName | MERCHANT_AND_PRODUCT_DETAILS |  | string | true | ^[A-Za-z]+(?:\s[A-Za-z]+)*$^\d{9,18} |  |  |
| productCategory | MERCHANT_AND_PRODUCT_DETAILS |  | enum | true | - | ON_GRID, OFF_GRID, HYBRID_ROOFTOP |  |
| maxSellerSubvention | MERCHANT_AND_PRODUCT_DETAILS |  | string | false | `^\d+(\.\d{1,2})?$` |  |  |
| productBrand            | MERCHANT_AND_PRODUCT_DETAILS       |                                         | string          | false      | `^[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$`                                    | -                                                                                                                                                                                |
| productModel            | MERCHANT_AND_PRODUCT_DETAILS       |                                         | string          | false      | `^[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$`                                    | -                                                                                                                                                                                |
| productSKUID            | MERCHANT_AND_PRODUCT_DETAILS       |                                         | string          | false      | `^[A-Za-z0-9]+([_-][A-Za-z0-9]+)*$`                                    | -                                                                                                                                                                                |
| productPrice            | MERCHANT_AND_PRODUCT_DETAILS       |                                         | string          | false      | `^\d+(\.\d{1,2})?$`                                                    | -   
| personalEmail           | PERSONAL_INFORMATION_SOLAR               |    Purchase Finance                                     | string          | -          | ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$                        | -                                                                                                                                                                                |
| officialEmail           | PERSONAL_INFORMATION_SOLAR               |                                         | string          | -          | ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$                        | - 
| pincode | PERSONAL_INFORMATION_SOLAR |  | string | true | `^[1-9][0-9]{5}$` | - |  |  
| monthlyIncome | PERSONAL_INFORMATION_SOLAR |  | string | true | `^(?!0+(\.0+)?$)\d+(\.\d{1,2})?$` | - |  | 
| employerName | PERSONAL_INFORMATION_SOLAR |  | string | false | `^[A-Za-z]+(?:\s[A-Za-z]+)*$` | - |  |  
| experienceYears | PERSONAL_INFORMATION_SOLAR |  | string | false | `^P(?=\d\|T\d)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(\d+H)?(\d+M)?(\d+(\.\d+)?S)?)?$` |   |  | 
| downpayment | PERSONAL_INFORMATION_SOLAR |  | string | true | ^(?!0+(\.0+)?$)\d+(\.\d{1,2})?$ |  |  |
| tenure | PERSONAL_INFORMATION_SOLAR |  | string | true | `^P(?=\d\|T\d)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(\d+H)?(\d+M)?(\d+(\.\d+)?S)?)?$` | - |  |
| propertyOwnership | PERSONAL_INFORMATION_SOLAR |  | string | false | | - |  | 
| propertyType | PERSONAL_INFORMATION_SOLAR |  | string | false | | - |  | 
| installationAddress | PERSONAL_INFORMATION_SOLAR |  | string | false | `^[a-zA-Z0-9\s#,./-]+$`|  |  |                                                                                                                                                                                                                                    