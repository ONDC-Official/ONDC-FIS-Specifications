# Loan Category Hierarchy – Structure 

---

# 1. Overview

The Loan Category Hierarchy is designed to logically organize loan products, borrower classifications, offers, and supporting data.

This structure ensures:

- Clear separation of concerns
- Easier scalability
- Consistent data organization
- Better mapping between user inputs and loan flows
- Simpler maintenance for future additions

At the highest level, **Loan** acts as the root category from which all classifications and subcategories derive.

```
Loan
│
├── Classification on Inputs
│   │
│   ├── Unsecured Personal
│   │   ├── Personal Financing
│   │   └── Consumer Invoice Financing
│   │       ├── Agri Purchase Finance
│   │       └── Electronics Purchase Finance
│   │
│   ├── Secured Personal
│   │   ├── Gold Loan
│   │   └── Loan Against Mutual Funds
│   │
│   └── Business
│       ├── Sole Proprietorship
│       └── Other
│           ├── Partnership Firm
│           ├── Private Ltd
│           └── Invoice Financing
│
├── Offers
│   ├── Term Loan
│   ├── Credit Line
│       ├── Document Based Drawdown
│       └── Non Document Based Drawdown
│   
│
└── Additional Data
    ├── Banking
    │   ├── Statement Upload
    │   └── AA Banking
    │
    ├── GST
    │   ├── AA GST
    │   ├── GSP
    │   └── Return Upload
    │
    ├── Mutual Fund
    │   ├── AA Loan
    │   ├── MFC
    │   └── RTA
    │
    ├── ITR
    │   └── Upload
    │
    ├── Bureau Loan
    ├── Derived Data
    └── Additional Upload
│
└── Pre Qualifier




```

---

# 2. High-Level Structure

```
Loan
├── Classification on Inputs
├── Offers
└── Additional Data
```

Each branch has a distinct role in the loan lifecycle.

---

# 3. Root Category: Loan

**Loan** is the parent/root node representing the complete lending ecosystem.

All loan-related classifications, offers, and data types are organized under this root.

### Purpose

- Acts as the single entry point
- Ensures all loan products follow a unified taxonomy
- Supports future expansion

---

# 4. Classification on Inputs

## Purpose

This layer categorizes loans **based on borrower type and loan nature**, determined primarily by user inputs.

It helps:

- Route users to the correct journey
- Apply eligibility logic
- Trigger correct underwriting flows

---

## 4.1 Unsecured Personal

Loans that do **not require collateral**.

### Subcategories

#### Personal Financing

- General personal-use loans
- Common retail lending product

#### Consumer Invoice Financing

- Short-term financing against invoices

Further divided into:

- Agri Purchase Finance
- Electronics Purchase Finance

---

## 4.2 Secured Personal

Loans backed by assets/collateral.

### Subcategories

#### Gold Loan

- Secured against gold assets
- Typically fast disbursal

#### Loan Against Mutual Funds (LAMF)

- Secured against mutual fund holdings
- Lower interest rates due to collateral

---

## 4.3 Business

Loans intended for business entities.

### Subcategories

#### Sole Proprietorship

- Loans for individual-owned businesses

#### Other (Business Types)

Includes:

- Partnership Firm
- Private Ltd
- Invoice Financing

This classification helps tailor underwriting and compliance checks.

---

# 5. Offers

## Purpose

Represents **financial products offered to the borrower** after classification.

This layer is product-driven rather than borrower-driven.

---

## Subcategories

### Term Loan

- Fixed tenure and EMI
- Standard lending product

### Credit Line

Flexible borrowing limit.

Further divided into:

- Document Based Drawdown
- Non Document Based Drawdown



---

# 6. Additional Data

## Purpose

Captures **supporting financial data and verification sources**.

Critical for:

- Risk assessment
- Compliance
- Underwriting
- Fraud checks

---

## 6.1 Banking Data

Includes:

- Statement Upload
- Account Aggregator (AA Banking)

Used for income and cash-flow assessment.

---

## 6.2 GST Data

Includes:

- AA GST
- GSP
- Return Upload

Helps evaluate business revenue and compliance.

---

## 6.3 Mutual Fund Data

Includes:

- AA Loan
- MFC
- RTA

Used for asset-backed lending and portfolio assessment.

---

## 6.4 ITR

Includes:

- ITR Upload

Validates income and tax compliance.

---

## 6.5 Bureau Loan

- Credit bureau data
- Used for creditworthiness evaluation

---

## 6.6 Derived Data

- System-generated insights
- Credit models

---

# 7. Pre Qualifier

**Pre Qualifier** is the dedupe check the borrower app runs with the lender before it asks for an offer (PAN, date of birth and phone). It sits directly under the **Loan** root and is not a loan product.

---

# 8. Personal Loan Category IDs (ONDC:FIS12:PL)

These are the category IDs the Personal Loan catalog uses. Each ID has one meaning.

| Category ID | Code               | Parent                    | Used for                                   |
| ----------- | ------------------ | ------------------------- | ------------------------------------------ |
| 101110      | LOAN               | -                         | Root category                              |
| 104110      | UNSECURED_PERSONAL | 101110 LOAN               | Classification on inputs                   |
| 104112      | OFFERS             | 101110 LOAN               | Offers                                     |
| 104129      | ADDITIONAL_DATA    | 101110 LOAN               | Additional data                            |
| 101111      | PERSONAL_FINANCING | 104110 UNSECURED_PERSONAL | Personal Loan item                         |
| 101117      | TERM_LOAN          | 104112 OFFERS             | Personal Loan item                         |
| 101211      | BUREAU_LOAN        | 104129 ADDITIONAL_DATA    | Personal Loan item (bureau based)          |
| 104146      | PRE_QUALIFIER      | 101110 LOAN               | Dedupe item (proposed)                      |

- `PERSONAL_FINANCING` 101111, `TERM_LOAN` 101117 and `BUREAU_LOAN` 101211 are the IDs the 2.3.0 base already uses for personal loans.
- `PRE_QUALIFIER` needs its own ID: 104137 is already `STATEMENT_UPLOAD` in the base catalog, and the base Master Search catalog declared 104137 twice (`STATEMENT_UPLOAD` and `PRE_QUALIFIER`). 104146 is proposed because it is the next number after the highest ID used on any FIS12 branch (104145) and no branch uses it. The registry owner has to confirm or assign it.
- Do not use the 2.0.3 IDs 101124 (`BUREAU_LOAN` in 2.0.3) and 101125 (`PRE_QUALIFIER` in 2.0.3) for PL: in 2.3.0 they are `SOLE_PROPRIETORSHIP` and `PRIVATE_LTD`.
