## Handling Form Submissions
In XInput, `text/html` forms are used to capture additional information from user. Buyer app submits the form to the action url provided in the form html. Seller app will do basic sanity checks like format of the inputs, required fields etc and respond with `status` as `SUBMITTED` and a `submission_id` which is used by the buyer app in the next action call. If the sanity checks fail, seller app will respond with `NACK` with an appropriate error code.

Buyer app will use `submission_id` in `form_response` in the next action call. Seller app can then process the form data and if successful will either send the next form if applicable or send the `status` as `SUCCESS` in `form_response`.

## Handling Redirection Callbacks
In `application/html` forms and in payment http urls, the buyer app redirects the user's browser to a seller provided url. After completing the activity, seller app should take the responsibility to redirect the user's browser back to the buyer app so the user can continue his journey on the buyer application. We will follow the below conventions in handling these redirects.

Seller app will redirect back the user to this url: `GET <bap_subscriber_url>/callback` with the following query params:
1. `transaction_id` (transaction id used in the context)
2. `status` (form status in case of form submission redirects, payment status in case of payment redirects)