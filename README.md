<p align="center">
<img src="https://github.com/dpgraham4401/hazTrak/blob/master/logo.png">
</p>
<h1 align="center"><em> hazTrak </em></h1>

<p align="center"> Easily integrate with the EPA electronic hazardous waste tracking system e-Manifest</p>

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![Build](https://github.com/dpgraham4401/hazTrak/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/dpgraham4401/hazTrak/actions/workflows/npm-publish.yml)


## Still in alpha phase!!!
The API on this package is liable to break w/o warning on a regular basis for the time being

## Table of Contents
  - [Intro](#Intro)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Examples](#examples)
    - [Site Services](#site-services)
    - [Manifest UI Link](#manifests-ui-link)
    - [RCRAInfo Lookup Services](#rcrainfo-lookup)
    - [e-Manifest Lookup Services](#e-manifest-lookup)
  - [License](#license)

## Intro
This packages aims to make using the e-Manifest API easier to consume. For additional information about e-Manifest, check out the below links
  - [RCRAInfo](https://rcrainfo.epa.gov)
  - [RCRAifno PreProduction](https://rcrainfopreprod.epa.gov)
  - [USEPA/e-Manifest Github](https://github.com/USEPA/e-manifest)
  - [About e-Manifest](https://www.epa.gov/e-manifest)
  
  All haztrak functions are asynchronous  

## Installation
```bash 
  $ npm install haztrak
```
haztrak uses ES6 module syntax, see [Node's doc](https://nodejs.org/api/packages.html#packages_modules_packages) for more information.


## Environment Variables
To run this project, you will need to add the following environment variables to your .env file
see the  [e-Manifest doc](https://github.com/USEPA/e-manifest/blob/master/Services-Information/e-Manifest%20Authenticate%20Get%20and%20Lookup%20Services%20v6.3.pdf) for details

`BASE_URL` RCRAInfo or PreProd baseURL

`RCRAINFO_API_ID`

`RCRAINFO_API_KEY`

Note: you'll need Site Manager level access to at least one EPA ID to get an API ID/key
## Examples


#### Site Services
```javascript
import haztrak from 'haztrak'

const foobar = async () => {
  const siteID = 'VATEST000001'
  const siteIdCheck = await haztrak.siteExist(siteID)
  const siteInfo = await haztrak.siteDetails(siteID)
}
```
#### manifests UI link
Returns a hyperlink to view or sign manifest(s) in RCRAinfo as the specified facility

See [ToDo.md](ToDo.md) for future changes to api
```javascript
import haztrak from 'haztrak'

const foobar = async () => {
  const siteID = 'VATEST000001'
  const page   = 'BulkSign'
  const mtn    = ['000000001ELC', '000000002ELC', '000000003ELC']
  const siteIdCheck = await haztrak.eManLink(page, siteID, mtn)
}
```
'page' argument options include

```'BulkSign'``` &rarr; Sign/Certify all manifest in the array
```'DashBoard'``` &rarr; link to the e-Manifest dashboard
```'BulkQuickSign'```&rarr; Quick sign all manifests in the array (mtn)
```'Edit'```&rarr; 
```'View'```&rarr;
```'Sign'```&rarr;

only 1 MTN allowed for Edt, View, or Sign

#### RCRAInfo Lookup
```javascript
import haztrak from 'haztrak'

const foo = async () => {
  const denCities = await haztrak.lookup('den')
}
````
haztrak.lookup accepts one of the below string
  - ```'den'```   &rarr; Density code
  - ```'form'```  &rarr; Form Codes
  - ```'source'```&rarr; Source Code
  - ```'state'``` &rarr; State waste codes
  - ```'fed'```   &rarr; Federal Waste Codes
  - ```'min'```   &rarr; Waste minimization codes
  - ```'ports'``` &rarr; Ports of entry

#### e-Manifest Lookup

haztrak.eMaLlookup accepts one of the below strings. Parameters with 'filt require additional arguements 

This will change to an object in version 2.0. See [ToDo.md](ToDo.md)
```javascript
import haztrak from 'haztrak'

const foo = async () => {
  const shippingNames = await haztrak.eManLookup('name')
  console.log(shippingNames)

  const hazClass = await haztrak.eManLookup('haz-filt', 'Acetal', 'UN1088')
  console.log(hazClass) 
}
````
  - ```'name'```      &rarr; DOT shipping name
  - ```'id'```        &rarr; DOT ID number
  - ```'haz'```       &rarr; DOT hazard classes
  - ```'pack'```      &rarr; DOT packing groups
  - ```'num-suffix'```   &rarr; Printed manifest tracking number (MTN) suffixes
  - ```'num-suffix-all'```   &rarr; All manifest tracking number (MTN) suffixes
  - ```'cont'```      &rarr; Container types
  - ```'uom'```       &rarr; Quantity Units of Measurement
  - ```'load'```      &rarr; Polychlorinated biphynal (PCB) load types
  - ```'haz-filt'```  &rarr; Get DOT hazard class(es) by DOT shipping name and id number
  - ```'pack-filt'``` &rarr; Get DOT packing group(s) by DOT shipping name and id number
  - ```'id-filt'```   &rarr; DOT Id Numbers by DOT Proper Shipping name
  - ```'name-filt'``` &rarr; DOT Proper Shipping names by DOT Id Number

## License
haztrak is licensed under the terms of the [MIT license](LICENSE.md)