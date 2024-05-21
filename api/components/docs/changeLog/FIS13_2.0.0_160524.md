### Change Logs: Insurance API specs

<table>
<colgroup>
<col style="width: 63%" />
<col style="width: 36%" />
</colgroup>
<thead>
<tr class="header">
<th>Version</th>
<th>FIS13_2.0.0_160524</th>
</tr>
<tr class="odd">
<th>Updates in BRD</th>
<th>15th May 2024</th>
</tr>
<tr class="header">
<th>Updates in PRD/Change log</th>
<th>16th May 2024</th>
</tr>
<tr class="odd">
<th>Updates in API Specs on dev doc</th>
<th>16th May 2024</th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Health Insurance**

1. Added an optional tag “Proposal_ID” tag under the general-info tag
   group. This is added to allow insurers to pass on their proposal
   ID under this tag.

   a.  **Use Case 1** : The insurer is able to generate a proposal ID
   at the time of generating offers in the /On_Select call

   &emsp;i.  In this case Quote - ID shared in the /On_Select call along with the offer can be used to pass the proposal-id

   &emsp;ii.  Insurer can also pass the same ID under the proposal_ID tag

   &emsp;&emsp;1. **Sub use case 1.1** - both proposal_id and quote_ID are shared with the buyer app

   &emsp;&emsp;&emsp;a.  Buyer will use the proposal ID to raise any concerns before the policy is generated

   &emsp;&emsp;2. **Sub use case 1.2** - Only quote_ID is shared

   &emsp;&emsp;&emsp;a.  Buyer will use the quote_ID to raise any concerns before the policy is generated

   &emsp;b.  **Use Case 2** : The insurer is not able to generate a proposal ID at the time of generating offers in the /On_Select call. Rather the proposal ID is generated after payment in between the /Init and /Confirm call

   &emsp;&emsp;i.  In this case only quote_ID will be shared in the /On_Select call

   &emsp;&emsp;ii.  Proposal_ID will be shared by the insurer in the later phases whenever the same is generated, either /Init or /Confirm

   &emsp;&emsp;iii.  Buyer will use the quote_ID for raising any concerns before
   the proposal_ID is shared

   &emsp;&emsp;iv.  Buyer will use the proposal_ID once this information has
   been shared by the insurer

  &emsp;c.  **Important thing to note here is that quote_ID once shared shall not change through the transaction**

**Example Snippet:**

```
  "tags": [
 {
   "descriptor": {
     "name": "General Information",
     "code": "GENERAL_INFO"
   },
   "list": [
     {
       "descriptor": {
         "code": "PROPOSAL_ID"
       },
       "value": "PROPOSAL_ID"
     }
   ]
}
]
```

##### **Previous changes**

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Added ROOM_CATEGORY tag as part of GENERAL_INFO tag group</th>
<th><ol type="1">
<li>
<p>Room category is a mandatory tag that the insurer can use to classify
the category of room supported in the offer shared</p>
</li>
<li>
<p>Any string can be passed by the insurer explaining the category
supported</p>
</li>
<li>
<p>Key point to note here is that the buyer apps will use value against
this tag directly and present it to the buyer</p>
</li>
</ol>
<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">

<td> 
Example Snippet:

```
  "tags": [
 {
   "descriptor": {
     "name": "General Information",
     "code": "GENERAL_INFO"
   },
   "list": [
     {
       "descriptor": {
         "code": "ROOM_CATEGORY"
       },
       "value": "Deluxe"
     }
   ]
}
]
```

</td>
</tr>
</thead>
<tbody>
</tbody>
</table></th>
</tr>
<tr>
<th>Updated mime type for family insurance form to
<strong>text/html-multi</strong></th>
<th>For more information, please refer to the <a
href="https://ondc-official.github.io/ONDC-FIS-Specifications/"><u>Developer
Guide page</u></a>. Select the version "draft-FIS13-health," then
navigate to "Feature-UI" and click on "xinput-form-response."</th>
</tr>
<tr>
<th>Added protocol path references for tags in
<strong>Attribute-UI</strong></th>
<th><ol type="1">
<li>
<p>Tags are now added as part of the Attribute-UI on the developer doc</p></li>
<li>
<p>Definitions and usage can be understood from here</p></li>
<li>
<p>To use</p>
<ol type="a">
<li>
<p>Go to the correct version of the protocol</p></li>
<li>
<p>Navigate to Attribute-UI</p></li>
<li>
<p>Select the API call for which you want to understand the usage of a
particular tag</p></li>
<li>
<p>Navigate to the tag in the table below and read the definitions and
usage</p></li>
</ol></li>
</ol></th>
</tr>
<tr>
<th>Corrected the item ID reference for add-ons in the quote object from
I1 to CHILD_ITEM_ID_I1</th>
<th><p>Example Snippet:</p>
<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>

```
 "quote": {
  "id": "OFFER_ID/PROPOSAL_ID",
  "breakup": [
    {
      "title": "ADD_ONS",
      "item": {
        "id": "CHILD_ITEM_ID_I1",
        "add_ons": [
          {
            "id": "A1"
          }
        ]
      },
    ]
 } 

```

</tr>
</thead>
<tbody>
</tbody>
</table></th>
</tr>
<tr class="header">
<th><h5 id="added-cancellation_terms">Added
cancellation_terms</h5></th>
<th><p>Example Snippet:</p>
<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">

  ```
    [
   {
     "external_ref": {
       "mimetype": "text/html,",
       "url": "https://fis.test.bpp.io/cancellation-terms"
     }
   }
 ]
  ```

</tr>
</thead>
<tbody>
</tbody>
</table></th>
</tr>
<tr class="odd">
<th colspan="2">Corrected the MIME type for the KYC form to
application/html</th>
</tr>
</thead>
<tbody>
</tbody>
</table>
