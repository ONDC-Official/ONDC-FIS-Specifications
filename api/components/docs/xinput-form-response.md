# XInput

This XInput schema facilitates seamless communication between buyers and sellers by allowing the exchange of additional information through forms.
Sellers can request specific details using custom forms, and buyers respond with the necessary information, ensuring a smooth transaction process.
The differentiation in MIME types and additional settings, such as resubmit and multiple submissions, adds flexibility to the form interaction between participants.

## Seller-Side Form:

```
{
  "xinput": {
    "head": {
      "descriptor": {
        "name": "Form Details"
      },
      "index": {
        "min": 0,
        "cur": 0,
        "max": 0
      },
      "headings": ["Form Details"]
    },
    "form": {
      "id": "<Form_ID>",
      "mime_type": "<MIME_Type>",
      "url": "<Form_URL>",
      "multiple_sumbissions": <Multiple_Sumbissions_Flag>
    },
    "required": true
  }
}
```

- `head`: Contains basic details regarding the form such as form name, index.

  - `name`: Describes the form name.
  - `index`: Specifies the minimum, current, and maximum indexes.
    - `min`: Minimum index value.
    - `cur`: Current index value.
    - `max`: Maximum index value.
  - `headings`: Array containing all the form headings.

- `form`: Represents the form itself.

  - `id`: Unique ID associated with the form.
  - `mime_type`: Type of MIME.
  - `url`: Endpoint where the form is hosted.
  - `multiple_sumbissions`: Indicates whether multiple submissions are allowed.

 ### mime_type: 
 Describes the type of MIME.It can take one of two possible values: application/html or text/html. 
  - **text/html**: If the value of mime_type is text/html, then the buyer app renders a form presented in HTML format. The rendered HTML-based form structure looks like this:

````html
<form action="/form/submission-path">
  <label for="dob">Date of Birth</label>
  <input type="date" id="dob" name="dob" />
  <label for="panValue">PAN Number</label>
  <input type="text" id="panValue" name="panValue" />
  <input type="hidden" id="formId" name="formId" value="<Form_ID>" />
  <input type="submit" value="Submit" />
</form>
````

The form gets submitted at the specified path in action. On submission, if successful, the buyer is provided with a submission_id.

```shell
{
  "submission_id": "f5a9f4fe-fc3a-4432-aa2d-d397724a5061"
}
```

If an error occurs while submitting the form, then with an appropriate error code, a message will be sent as part of response.

```shell
{
  "message": {
    "ack": {
      "status": "NACK"
    }
  },
  "error": {
    "code": "07",
    "message": "Data sent in request is not correct"
  }
}
```

Note: While submitting text/html form, API headers will contain [Content-Type:"multipart/form-data"].

  - **application/html**:

On the other hand, if the mime_type is set to application/html, the seller provides a link to an external HTML page where the buyer can submit the required information.

## Form response

There are 2 possible ways to get the latest status after submitting a form

1. #### Form response for text/html
   On successfull submission the buyer is provided with a submission_id, which the buyer can use to send as part of next call.

```shell
{
  "xinput": {
    "form_response": {
      "status": "<Status>",
      "submission_id": "<Submission_ID>"
    }
  }
}
```


- `form_response`: Represents the form info after submitting a form.

  - `status`: Denotes the latest state of the form after submission. Possible values include SUCCESS, PENDING, REJECTED, APPROVED, COMPLETED, OFFLINE_PENDING.
  - `submission_id`: Contains the unique ID that the buyer receives upon successful form submission.

2. #### Form response for application/html

  The buyer app redirects the user's browser to a seller app provided url. After completing the activity, seller app should take the responsibility to redirect the user's browser back to the buyer app so the user can continue his journey on the buyer application. We will follow the below conventions in handling these redirects.

  Seller app will redirect back the user to this url: `GET <bap_subscriber_url>/callback` with the following query params:
  1. `transaction_id` (transaction id used in the context)
  2. `status` - form status
  3. `form_id`
  4. `submission_id` (only in success case)

  Seller app will additionally send `on_status` call containing the form status and `submission_id` in `form_response`

  ```mermaid
  sequenceDiagram
      participant bap AS Buyer App
      participant bppf AS Form System
      participant bpp AS Seller App
      bap ->> bppf: redirect the user to form url
      alt submission successful
          bppf ->> bap: browser `/callback` with transaction id and status
          bpp ->> bap: `on_status` with `status`  and `submission_id`
      else submission failed
          bppf ->> bap: browser `/callback` with transaction id and failure status
          bpp ->> bap: `on_status` with `status` as `FAILED`
          bap ->> bppf: redirect the user again to the same form url
          bap ->> bppf: browser `/callback` with failure status (url can be used only once)
          bpp ->> bap: `on_status` with `status` as `FAILED`
      end
  ```
   To provide the buyer with latest form status, seller sends an unsolicated on_status call with Submission_ID. Additionally, if the seller doesn't sends an unsolicated call, the buyer can request the latest form status by sending a status call with the ref_id.

```shell
{
  "xinput": {
    "form_response": {
      "status": "<updated_status>",
      "submission_id": "<Submission_ID>"
    }
  }
}
```

- The seller responds with the latest status of submitted form corresponding to the submission_id ("Submission_ID") that was submitted earlier by the buyer.