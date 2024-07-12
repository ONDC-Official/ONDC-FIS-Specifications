## Handling Redirection Callbacks

In `application/html` forms and in payment http urls, the buyer app redirects the user's browser to a seller provided url. After completing the activity, seller app should take the responsibility to redirect the user's browser back to the buyer app so the user can continue his journey on the buyer application. We will follow the below conventions in handling these redirects.

Seller app will redirect back the user to this url: `GET <bap_subscriber_url>/callback` with the following query params:
1. `transaction_id` (transaction id used in the context)
2. `status` (form status in case of form submission redirects, payment status in case of payment redirects)