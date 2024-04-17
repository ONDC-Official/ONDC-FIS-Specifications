The buyer app is expected to take care of the following

### 2 Factor Authentication
Perform 2 factor authentication for all orders before confirming.  

One factor is sending otp to investor's email/mobile. Other factor can be anything other than this.  
1. For transaction in existing folio - use the email/mobile present in the folio  
2. For transaction in new folio - use the email/mobile added as communication details in the folio opening form  

The email/mobile used for this 2fa should be sent by BAP as part of the `/confirm` call.

### Verify contact email and mobile
Verify that the contact email address and mobile number given in new folio opening form, exists and investor has access to it.

### Clickwrap consent to terms and conditions
As part of final `on_init` call, BPP sends the terms and conditions for that order in the `documents` array. BAP should show these terms to the investor, and let him explicitly agree to those, before calling `/confirm`. BAP can either show a checkbox or a button to get the investor consent.  
When it receives the `/confirm` call, BPP assumes that the investor clickwrap consent has been taken.