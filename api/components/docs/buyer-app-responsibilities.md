The buyer app is expected to take care of the following

1. Perform 2 factor authentication for all transacations.  
One factor is sending otp to investor's email/mobile  
A. For transaction in existing folio - use the email/mobile present in the folio  
B. For transaction in new folio - use the email/mobile added as communication details in the folio opening form  
Second factor can be anything other than sending otp to email/mobile.

2. Verify that the contact email address given in new folio opening form, exists and investor has access to it.

3. Verify that the mobile number given in the new folio opening form, exists and investor has access to it.

4. Show the terms and conditions to the investor, and let him explicitly agree to those, before calling `/confirm`. When it receives the `/confirm` call, BPP assumes that the investor clickwrap consent has been taken. BAP can either show a checkbox or a button to get the investor consent.