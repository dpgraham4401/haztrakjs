<p align="center">
<img src="https://github.com/dpgraham4401/hazTrak/blob/master/logo.png">
</p>
<h1 align="center"><em> hazTrak </em></h1>

<p align="center"> Easily integrate with the EPA electronic hazardous waste tracking system (e-Manifest)</p>

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
  - [e-Manifest Examples](#e-manifest-examples)
	- [Get](#get)
	- [Save](#save)
	- [Delete](#delete)
  - [To do](#todo)
  - [License](#license)

## Intro
e-Manifest was established by the EPA as a national IT system that enables the
Agency and the [RCRA](https://www.epa.gov/rcra) community to electronically track hazardous waste
shipments. It was built as a modular component of [RCRAInfo](https://rcrainfo.epa.gov).

haztrak simplifies the process of consuming the RCRAInfo/e-Manifest API, and
transitioning to electronic manifests by abstracting the implementation and
letting you get back to what's important 

For additional information about e-Manifest, check out the below links
  - [USEPA/e-Manifest Github](https://github.com/USEPA/e-manifest)
  - [RCRAInfo](https://rcrainfo.epa.gov)
  - [RCRAifno PreProduction](https://rcrainfopreprod.epa.gov)
  - [About e-Manifest](https://www.epa.gov/e-manifest)

  All haztrak functions behave asynchronously

## Installation
```bash 
  $ npm install haztrak
```
or 
```bash
  $ yarn add haztrak
```
haztrak uses ES6 module syntax, see [Node's documentation](https://nodejs.org/api/packages.html#packages_modules_packages) for more info.


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
```
haztrak.lookup accepts one of the below string
  - ```'den'```   &rarr; Density code
  - ```'form'```  &rarr; Form Codes
  - ```'source'```&rarr; Source Code
  - ```'state'``` &rarr; State waste codes
  - ```'fed'```   &rarr; Federal Waste Codes
  - ```'min'```   &rarr; Waste minimization codes
  - ```'ports'``` &rarr; Ports of entry

#### e-Manifest Lookup

haztrak.eMaLlookup accepts one of the below strings. Parameters with filt require additional arguements 

This will change to an object in version 2.0. See [ToDo.md](ToDo.md)
```javascript
import haztrak from 'haztrak'

const foo = async () => {
  const shippingNames = await haztrak.eManLookup('name')
  console.log(shippingNames)

  const hazClass = await haztrak.eManLookup('haz-filt', 'Acetal', 'UN1088')
  console.log(hazClass) 
}
```
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

## e-Manifest Examples
Now the good stuff, electronic manifesting

Currently all attachment options are unsuported.

#### Get
eMan.get takes the manifest tracking number (MTN) and returns an object of the curent version in the e-Manifest system.
```javascript
  import haztrak from 'haztrak'

  const exampleGet = async () => {
    const mtn = '012345678ELC'
    const res = await haztrak.eMan.get(mtn)
    console.log(res)
  }
```

#### Save
eMan.save takes a stringified JSON and returns the e-Manifest response oulined in the [USEPA/e-Manifest](https://github.com/USEPA/e-manifest/blob/master/Services-Information/Save%20Update%20Delete%20Revert%20Create-Correction%20Manifest%20services%20v3.7.pdf) documentation. Please see their documentation for the example scheme and responses.

For this example, the manifest we'd like to save is stored in a JSON file
```javascript
import haztrak from 'haztrak'
import fs from 'fs'
const exampleSave = async () => {
  fs.readFile('./exampleMan.json', 'utf8', async (err, data) => {
    if (err) {
      console.log(`Error reading file: ${err}`)
    } else {
      let manifest = JSON.parse(data)
      manifest = JSON.stringify(manifest)
      const res = await haztrak.eMan.save(manifest)
      console.log(res)
    }
  })
}
exampleSave()
```
#### Delete
eMan.delete accepts an mtn and returns the e-Manifest response outlined in the e-Manifest documentation. 
```javascript
const testDel = async () => {
  const mtn = '100032099ELC'
  const res = await haztrak.eMan.delete(mtn)
  console.log(res)
}
testDel()

```
## To Do
For more information about upcoming changes, the status of haztrak or looking to contribute, see the [ToDo](ToDo.md) page.

## License
haztrak is licensed under the terms of the [MIT license](LICENSE.md)
