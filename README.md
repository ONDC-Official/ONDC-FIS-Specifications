### Change Logs: Insurance API specs

<table>
<colgroup>
<col style="width: 63%" />
<col style="width: 36%" />
</colgroup>
<thead>
<tr class="header">
<th>Version</th>
<th>FIS13_2.0.0_070524</th>
</tr>
<tr class="odd">
<th>Updates in BRD</th>
<th>6th May 2024</th>
</tr>
<tr class="header">
<th>Updates in PRD/Change log</th>
<th>7th May 2024</th>
</tr>
<tr class="odd">
<th>Updates in API Specs on dev doc</th>
<th>7th May 2024</th>
</tr>
</thead>
<tbody>
</tbody>
</table>

##### Motor Insurance:

1.  Added manual review flag as part of on_search. This is added to
    > allow the buyer app to improve the buyer journey by filtering
    > policies where manual review is not required.

**Example Snippet:**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th>"tags": [<br />
{<br />
"descriptor": {<br />
"name": "General Information",<br />
"code": "GENERAL_INFO"<br />
},<br />
"list": [<br />
{<br />
"descriptor": {<br />
"code": "MANUAL_REVIEW",<br />
"name": "Manual Review",<br />
"short_desc": "Describes manual review value”<br />
},<br />
"value": "true"<br />
}<br />
]<br />
}<br />
]</th>
</tr>
</thead>
<tbody>
</tbody>
</table>

2.  Added following optional fields as part of renewal form. This is
    > added to allow the seller app and buyer app to share previous
    > policy details when the seller is unable to fetch data from the
    > Vahan
    > portal.<img src="media/image4.png" style="width:2.49479in;height:1.98395in" />

    - <u>Case 1</u>: The buyer app choose to send optional details
      > upfront to the seller app

      - Here the seller app has previous policy details therefore even
        > if the vahan portal is not returning the data seller app can
        > use the data shared by the buyer app to generate offers.

    - <u>Case 2</u>: The buyer app chose not to send optional details
      > upfront to the seller app

      - <u>Sub case 1</u> : Previous Policy details were not received
        > from Vahan portal

        - The seller app will NACK the submission of the form with the
          > error code “81208”, Event: “Previous Policy Details
          > Required”. In this scenario the buyer app will collect the
          > optional fields and submit the entire form again.

      - <u>Sub case 2</u>: Previous Policy details were received from
        > Vahan portal

        - The seller app shares the submission ID for the form
          > submission with the buyer app.

3.  <span class="mark">Added IDV_VALUE, IDV_MIN_VALUE, and IDV_MAX_VALUE
    > to the on_search feature. This is added to allow the seller to
    > share the IDV range supported and for the buyer to share the IDV
    > desired by the buyer which shall be within the range shared by the
    > seller.</span>

    - Based on IDV_MIN_VALUE & IDV_MAX_VALUE the buyer app will allow
      > users to set custom IDV value.

**Example Snippet:**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th>"tags": [<br />
{<br />
"descriptor": {<br />
"name": "General Information",<br />
"code": "GENERAL_INFO"<br />
},<br />
"list": [<br />
{<br />
"descriptor": {<br />
"code": "IDV_VALUE",<br />
"name": "IDV Value",<br />
"short_desc": "Describes the IDV value"<br />
},<br />
"value": "350000"<br />
},<br />
{<br />
"descriptor": {<br />
"code": "IDV_MIN_VALUE",<br />
"name": "IDV Min Value",<br />
"short_desc": "Describes the IDV's min value"<br />
},<br />
"value": "150000"<br />
},<br />
{<br />
"descriptor": {<br />
"code": "IDV_MAX_VALUE",<br />
"name": "IDV Max Value",<br />
"short_desc": "Describes the IDV' max value"<br />
},<br />
"value": "500000"<br />
}<br />
]</th>
</tr>
</thead>
<tbody>
</tbody>
</table>

- IDV_SELECTED as part of the select call will be shared. The buyer app
  > will send the selected IDV value as part of tags & in on_select the
  > seller app will send the value as part of IDV_VALUE.

**Example snippet:**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th>"tags": [<br />
{<br />
"descriptor": {<br />
"name": "General Information",<br />
"code": "GENERAL_INFO"<br />
},<br />
"list": [<br />
{<br />
"descriptor": {<br />
"code": "IDV_SELECTED",<br />
"name": "IDV Selected"<br />
},<br />
"value": "350000"<br />
}<br />
]<br />
}<br />
]</th>
</tr>
</thead>
<tbody>
</tbody>
</table>

4.  <span class="mark">Some of the information was changed from optional
    > to mandatory and vice versa. Below are the snippets of
    > changes.</span>

    - <span class="mark">Please note that information could be either in
      > tags or attributes or as part of the form as per the use
      > case.</span>

<img src="media/image2.png" style="width:6.26772in;height:1.66667in" />

<img src="media/image1.png" style="width:6.26772in;height:0.22222in" />

<img src="media/image3.png" style="width:6.26772in;height:0.54167in" />

##### 

##### Health Insurance:

- Added ROOM_CATEGORY tag as part of GENERAL_INFO tag group.

- Updated mime type for family insurance form to **text/html-multi.**
  > For more information, please refer to the [<u>Developer Guide
  > page</u>](https://ondc-official.github.io/ONDC-FIS-Specifications/).
  > Select the version "draft-FIS13-health," then navigate to
  > "Feature-UI" and click on "xinput-form-response."

- Added protocol path references for tags in **Attribute-UI**.

##### Marine Insurance:

- Added protocol path references for tags in **Attribute-UI**.

#####   

##### 
