| Parameter | sample value| Key Name | description |
|-----------------|-----------------|-----------------|-----------------|
| (i) Loan amount (amount disbursed/to be disbursed to the borrower)(in Rupees)  |20,000   | principal  | Title inside quote object |
|(ii) Total interest charge during the entire tenor of the loan (in Rupees)    |3274   | interest   | Title inside quote object    |
| (iii) Other up-front charges, if any (break-up of each component to be given below) (in Rupees)    | 400 |Other up-front charges | Title inside quote object    |
|(a) Processing fees, if any (in Rupees)    | 160 |  Processing fees   | Title inside quote object   |
|(b) Insurance charges, if any (in Rupees)    | 240   | Insurance charges   | Title inside quote object    |
| (c) Others (if any) (in Rupees) (details to be provided)    | 0  | Other Charges | Title inside quote object   |
|(iv) Net disbursed amount ((i)-(iii)) (in Rupees)    | 19600  |  Net disbursed amount  | Title inside quote object   |
|(v) Total amount to be paid by the borrower (sum of (i), (ii) and (iii))    (in Rupees)     | 23674   | Price    | Inside Quote Object   |
|(vi) Annual Percentage Rate - Effective annualized interest rate (in percentage) (computed on net disbursed amount using IRR approach and reducing balance method)    | 17.07%    | ANNUAL_PERCENTAGE_RATE   | loan_info Tag Group   |
|(vii)  Tenor of the loan (in months/days)    | 24 months    |  TERM   | loan_info Tag Group    |
| (viii) Repayment frequency by the borrower   | Monthly  | REPAYMENT_FREQUENCY   |loan_info Tag Group  |
| (ix) Number of instalments of repayment  | 24   | NUMBER_OF_INSTALLMENTS |loan_info Tag Group   |
| (x) Amount of each instalment of repayment (in Rupees)   | 970   | INSTALLMENT_AMOUNT  |  loan-info Tag Group   |
| Details about the contingent charges                  |     |  |     |
|(xi) Rate of annualized penal charges in case of delayed payments (if any)   | 5%  |  DELAY_PENALTY_FEE  | loan_info Tag Group |
| (xii) Rate of annualized other penal charges (if any); (details to be provided)   | 1% | OTHER_PENALTY_FEE | loan_info Tag Group  |
| (xiii) Cooling off/look-up period during which borrower shall not be charged any penalty on prepayment of loan  | PT30D  | COOL_OFF_PERIOD  |  loan_info Tag Group |
|(xiv) Details of LSP acting as recovery agent and authorized to approach the borrower  |   | LSP_INFO  | lsp_info Tag group   |
| (xv) Name, designation, address and phone number of nodal grievance redressal officer designated specifically to deal with FinTech/ digital lending related complaints/ issues     |  | CONTACT_INFO   | contact_info tag group    |
