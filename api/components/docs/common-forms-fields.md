# Common Forms Fields

## Personal Loan

### Form: Personal Details Form

| Form Field     | Form Description Name                        | Required | Regex Validations                                     | Remarks                           |
| -------------- | -------------------------------------------- | -------- | ----------------------------------------------------- | --------------------------------- |
| panName        | Name as per PAN                              | Yes      | `^[A-Za-z]+(?:\s[A-Za-z]+)*$`                       |                                   |
| personalEmail  | Personal email address                       | No       | `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`  |                                   |
| officialEmail  | Official / work email address                | No       | `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`  |                                   |
| dob            | Date of birth (DD/MM/YYYY)                   | Yes      | ` ^(0[1-9]\|[12][0-9]\|3[01])/(0[1-9]\|1[0-2])/\d{4}$` |                                   |
| gender         | Gender                                       | Yes      |                                                       |                                   |
| pan            | Permanent Account Number (PAN)               | Yes      | `^[A-Z]{5}[0-9]{4}[A-Z]$`                           |                                   |
| contactNumber  | Mobile number                                | Yes      | `^(?:\+91\|91)?[6-9]\d{9}$`                          |                                   |
| employmentType | Employment type (Salaried / Self Employment) | Yes      |                                                       |                                   |
| income         | income                                       | Yes      | `^(?!0+(\.0+)?$)\d+(\.\d{1,2})?$`                   |                                   |
| companyName    | Company or employer name                     | Yes      | `^[a-zA-Z]+(?:[ .'-][a-zA-Z]+)*$`                   |                                   |
| udyamNumber    | Udyam registration number                    | No       | `^[a-zA-Z0-9-]+$`                                   |                                   |
| addressL1      | Address line 1                               | No       | `^[a-zA-Z0-9\s,.-/]+$`                              |                                   |
| addressL2      | Address line 2                               | No       | `^[a-zA-Z0-9\s,.-/]+$`                              |                                   |
| city           | City                                         | No       | `^[a-zA-Z]+(?:[ .'-][a-zA-Z]+)*$`                   |                                   |
| state          | State                                        | No       | `^[a-zA-Z]+(?:[ .'-][a-zA-Z]+)*$`                   |                                   |
| pincode        | Postal / PIN code                            | No       | `^[1-9][0-9]{5}$`                                   |                                   |
| bureauConsent  | Bureau Consent                               | Yes      |                                                       |                                   |
| aa_id          | Account Aggregator ID                        | No       | `^[A-Za-z0-9]+@[A-Za-z0-9]+(?:\.[A-Za-z]{2,})?$`    | Required in flows with AA journey |
| endUse         | Purpose / end use of the loan                | No       |                                                       |                                   |

---

## Form: Set Loan Amount

| Form Fields   | Form Description Name | Required |
| ------------- | --------------------- | -------- |
| requestAmount | Requested Loan Amount | No       |
| requestTerm   | Requested Loan Term   | No       |

---

## Purchase Finance

### Form: Merchant, Bank Account & Product Details

| Form Fields           | Form Description Name                | Required |
| --------------------- | ------------------------------------ | -------- |
| pan                   | Merchant PAN                         | No       |
| gst                   | Goods and Services Tax (GST) Number  | No       |
| bankAccountNumber     | Bank Account Number                  | No       |
| bankIfscNumber        | Bank IFSC Code                       | No       |
| bankAccountHolderName | Bank Account Holder Name             | No       |
| productCategory       | Product Category                     | No       |
| productBrand          | Product Brand                        | No       |
| productModel          | Product Model                        | No       |
| productSKUID          | Product SKU ID                       | No       |
| productPrice          | Product Price                        | No       |
| productReturnPeriod   | Product Return Window                | No       |
| maxSellerSubvention   | Maximum Seller Subvention Percentage | No       |

### Form: Personal Info

| Form Field     | Form Description Name     | Required |
| -------------- | ------------------------- | -------- |
| panName        | Name as per PAN           | Yes      |
| personalemail  | Personal Email Address    | No       |
| officialemail  | Official Email Address    | No       |
| dob            | Date of Birth             | Yes      |
| gender         | Gender                    | Yes      |
| pan            | PAN Number                | Yes      |
| contactNumber  | Mobile Number             | Yes      |
| employmentType | Employment Type           | Yes      |
| income         | Income                    | Yes      |
| companyName    | Company Name              | Yes      |
| udyamNumber    | Udyam Registration Number | No       |
| addressL1      | Address Line 1            | No       |
| addressL2      | Address Line 2            | No       |
| city           | City                      | No       |
| state          | State                     | No       |
| pincode        | Pincode                   | No       |
| bureauConsent  | Bureau Consent            | Yes      |
| aa_id          | Account Aggregator ID     | No       |
| downpayment    | Down Payment Amount       | Yes      |
| tenure         | Tenure (in months)        | No       |

### Form: Udpate down payment

| Form Fields       | Form Description Name | Required |
| ----------------- | --------------------- | -------- |
| updateDownpayment | Update Downpayment    | No       |

## Invoice Based Loan

### ORGANIZATION INFORMATION

| Form Fields   | Form Description Name              | Required |
| ------------- | ---------------------------------- | -------- |
| udyamNumber   | UDYAM Number                       | No       |
| contactNumber | Contact Number                     | No       |
| email         | Email Address                      | No       |
| gstinProfile  | GSTIN Profile Document Upload      | No       |
| gstr1         | GSTR-1 Return Document Upload      | No       |
| gstr2A        | GSTR-2A Return Document Upload     | No       |
| gstr3B        | GSTR-3B Return Document Upload     | No       |
| aa_id         | Account Aggregator ID              | No       |
| bureauConsent | Bureau Consent                     | Yes      |
| tnc           | Acceptance of Terms and Conditions | No       |

### Form: Udpate loan Amount

| Form Fields   | Form Description Name | Required |
| ------------- | --------------------- | -------- |
| requestAmount | Requested Loan Amount | No       |

## Term Loan without AA

### PERSONAL INFORMATION

| Form Field        | Form Description Name      | Required |
| ----------------- | -------------------------- | -------- |
| pan               | PAN Number                 | Yes      |
| fullName          | Full Name (as per PAN)     | Yes      |
| dob               | Date of Birth              | Yes      |
| addressL1         | Address Line 1             | No       |
| addressL2         | Address Line 2             | No       |
| pincode           | Pincode                    | No       |
| city              | City                       | No       |
| state             | State                      | No       |
| constitution      | Business Constitution Type | Yes      |
| businessPan       | Business PAN               | Yes      |
| businessPanName   | Name as per Business PAN   | No       |
| doi               | Date of Incorporation      | Yes      |
| natureOfBusiness  | Nature of Business         | Yes      |
| udyamNumber       | Udyam Registration Number  | No       |
| gst               | GST Number                 | No       |
| annualTurnover    | Annual Turnover            | Yes      |
| businessEmail     | Business Email Address     | No       |
| businessAddressL1 | Business Address Line 1    | No       |
| businessAddressL2 | Business Address Line 2    | No       |
| businessCity      | Business City              | No       |
| businessState     | Business State             | No       |
| businessPincode   | Business Pincode           | Yes      |
| endUse            | End Use of Loan            | No       |
| bureauConsent     | Credit Bureau Consent      | No       |

## LAMF:

### PERSONAL_INFORMATION

| Form Field     | Form Description Name                    | Required |
| -------------- | ---------------------------------------- | -------- |
| userType       | User Type (Individual / Sole Proprietor) | No       |
| pan            | PAN Number                               | Yes      |
| fullName       | Full Name (as per PAN)                   | Yes      |
| constitution   | Business Constitution                    | Yes      |
| gender         | Gender                                   | Yes      |
| employmentType | Employment Type                          | Yes      |
| dob            | Date of Birth                            | Yes      |
| annualIncome   | Annual Income                            | Yes      |
| mobileNumber   | Mobile Number                            | Yes      |
| emailId        | Email Address                            | Yes      |
| addressL1      | Address Line 1                           | No       |
| addressL2      | Address Line 2                           | No       |
| pincode        | Pincode                                  | No       |
| city           | City                                     | No       |
| state          | State                                    | No       |
| endUse         | End Use of Loan                          | No       |
| bureauConsent  | Credit Bureau Consent                    | No       |
| aa_id          | Account Aggregator ID                    | Yes      |

## LAMF: Overdraft Loan

### PERSONAL_INFORMATION

| Form Field     | Form Description Name                    | Required |
| -------------- | ---------------------------------------- | -------- |
| userType       | User Type (Individual / Sole Proprietor) | No       |
| pan            | PAN Number                               | Yes      |
| fullName       | Full Name (as per PAN)                   | Yes      |
| constitution   | Business Constitution                    | Yes      |
| gender         | Gender                                   | Yes      |
| employmentType | Employment Type                          | Yes      |
| dob            | Date of Birth                            | Yes      |
| annualIncome   | Annual Income                            | Yes      |
| mobileNumber   | Mobile Number                            | Yes      |
| emailId        | Email ID                                 | Yes      |
| addressL1      | Address Line 1                           | No       |
| addressL2      | Address Line 2                           | No       |
| pincode        | Pincode                                  | No       |
| city           | City                                     | No       |
| state          | State                                    | No       |
| endUse         | Purpose / End Use of Loan                | No       |
| bureauConsent  | Credit Bureau Consent                    | No       |

## LAMF: MFC

### PERSONAL_INFORMATION

| Form Field      | Form Description Name                    | Required |
| --------------- | ---------------------------------------- | -------- |
| userType        | User Type (Individual / Sole Proprietor) | No       |
| pan             | PAN Number                               | Yes      |
| fullName        | Full Name (as per PAN)                   | Yes      |
| constitution    | Business Constitution                    | Yes      |
| gender          | Gender                                   | Yes      |
| employmentType  | Employment Type                          | Yes      |
| dob             | Date of Birth                            | Yes      |
| annualIncome    | Annual Income                            | Yes      |
| mobileNumber    | Mobile Number                            | Yes      |
| emailId         | Email ID                                 | Yes      |
| addressL1       | Address Line 1                           | No       |
| addressL2       | Address Line 2                           | No       |
| pincode         | Pincode                                  | No       |
| city            | City                                     | No       |
| state           | State                                    | No       |
| endUse          | Purpose / End Use of Loan                | No       |
| bureauConsent   | Credit Bureau Consent                    | No       |
| statementUpload | Bank Statement Upload                    | Yes      |

## Working Capital:

### BANK STATEMENT AND GST RETURNS

| Form Fields          | Form Description Name                 | Required |
| -------------------- | ------------------------------------- | -------- |
| gstinProfile_1       | GSTN Public Profile (Last 24 Months)  | Yes      |
| gstr1B2bInvoice_1    | GSTR-1 B2B Invoice (Last 24 Months)   | Yes      |
| gstr1B2bCdnr_1       | GSTR-1 CDNR (Last 24 Months)          | Yes      |
| gstr1B2bSummary_1    | GSTR-1 Summary (Last 24 Months)       | No       |
| gstr1B2bHsnSummary_1 | GSTR-1 HSN Summary (Last 24 Months)   | No       |
| gstr2aB2bInvoices_1  | GSTR-2A B2B Invoices (Last 24 Months) | Yes      |
| gstr3bSummary_1      | GSTR-3B Summary (Last 24 Months)      | Yes      |
| bankStatementFiles_1 | Bank Statements (Last 12 Months)      | Yes      |
| bankName_1           | Bank Name                             | Yes      |
| filePassword_1       | Bank Statement File Password          | No       |
| mimeType_1           | Bank Statement File Format            | Yes      |
| bureauConsent        | Bureau Consent                        | true     |
| udyamNumber          | Udyam Number                          | false    |

### BUSINESS AND FINANCIAL DOCUMENTS

| Form Fields         | Form Description Name                               | Required |
| ------------------- | --------------------------------------------------- | -------- |
| financialStatements | Financial Statements for the Last 2 Financial Years | Yes      |
| provisions          | Provisions for the Latest Financial Year            | No       |
| shareholdingPattern | Shareholding Pattern Document                       | Yes      |
| itr                 | Income Tax Returns (Last 2 Years) and Audit Report  | Yes      |
| directorsList       | List of Company Directors                           | No       |

### BUSINESS KYC

| Form Field              | Form Description Name                                                        | Required |
| ----------------------- | ---------------------------------------------------------------------------- | -------- |
| companyPan              | Company PAN                                                                  | Yes      |
| companyDeed             | Partnership Deed / Company                                                   | No       |
| gstCertificate          | GST Registration                                                             | Yes      |
| utilityBill             | Latest Utility Bill (Residence & Office Address Proof)                       | No       |
| businessProof           | Business Proof (Shop & Establishment Certificate / Business License / Udyam) | Yes      |
| memorandumAssociation   | Memorandum of Association (MOA)                                              | No       |
| articlesAssociation     | Articles of Association (AOA)                                                | No       |
| boardResolution         | Board Resolution or Partnership Authority Letter                             | No       |
| applicationForm         | Application Form                                                             | Yes      |
| kartaAuthorityLetter    | Karta / Authority Letter                                                     | No       |
| additionalDocumentation | Additional Documentation (Bank Statement, Sanction Conditions, etc.)         | No       |
| coApplicantPanName      | Co-applicant Name (as per PAN)                                               | No       |
| coApplicantPanNumber    | Co-applicant PAN Number                                                      | No       |
| coApplicantGender       | Co-applicant Gender                                                          | No       |
| coApplicantDob          | Co-applicant Date of Birth                                                   | No       |
| coApplicantEmail        | Co-applicant Email Address                                                   | No       |
| coApplicantMobile       | Co-applicant Mobile Number                                                   | No       |

## Credit Line Drawdown:

# Invoice Fields

| Form Field        | Form Description Name | Required |
| ----------------- | --------------------- | -------- |
| invoiceFile       | Invoice Document      | Yes      |
| invoiceNumber     | Invoice Number        | Yes      |
| invoiceDate       | Invoice Date          | Yes      |
| invoiceAmount     | Invoice Amount        | Yes      |
| vendorName        | Vendor Name           | Yes      |
| bankName          | Bank Name             | Yes      |
| accountHolderName | Account Holder Name   | Yes      |
| accountNumber     | Bank Account Number   | Yes      |
| ifscCode          | Bank IFSC Code        | Yes      |
