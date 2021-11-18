<p align="center">
<img src="https://github.com/dpgraham4401/hazTrak/blob/master/logo.png">
</p>
<h1 align="center"><em> hazTrak </em></h1>

<p align="center"> Easily integrate with the EPA electronic hazardous waste tracking system (e-Manifest)</p>

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![Build](https://github.com/dpgraham4401/hazTrak/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/dpgraham4401/hazTrak/actions/workflows/npm-publish.yml)

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
  - [Contributing](#contributing)
  - [License](#license)

## Intro
e-Manifest was established by the EPA as a national IT system that enables the
Agency and the [RCRA](https://www.epa.gov/rcra) community to electronically track hazardous waste
shipments. It was built as a modular component of [RCRAInfo](https://rcrainfo.epa.gov).

haztrak simplifies the process of integrating with the RCRAInfo/e-Manifest system, and
transitioning to electronic manifests by abstracting the implementation and
letting you get back to what's important.

For additional information about e-Manifest, check out the below links
  - [USEPA/e-Manifest Github](https://github.com/USEPA/e-manifest)
  - [RCRAInfo](https://rcrainfo.epa.gov)
  - [RCRAifno PreProduction](https://rcrainfopreprod.epa.gov)
  - [About e-Manifest](https://www.epa.gov/e-manifest)

One of the best sources of documentation for this project, is the [e-Manifest Swagger page](https://rcrainfopreprod.epa.gov/rcrainfo/secured/swagger)

For a python alternative see the [emanifest pip package](https://pypi.org/project/emanifest/)

## Installation
```bash 
  $ npm install haztrak
  or
  $ yarn add haztrak
```
haztrak uses ES6 module syntax, see [Node's documentation](https://nodejs.org/api/packages.html#packages_modules_packages) for more info.

## Environment Variables
To use haztrak, you'll need Site Maanger access to a site with an API ID and key. You will need to add the following environment variables. 
hazTrak will load any Variables you have in your .env file see the [dotenv] (https://www.npmjs.com/package/dotenv) for more details

`BASE_URL` RCRAInfo or PreProd baseURL

`RCRAINFO_API_ID`

`RCRAINFO_API_KEY`

## Examples

#### Site Services
```javascript
import haztrak from 'haztrak'

const  checkSites = async () => {
  // To get site details, set details field to True
  const detailObject = {
      siteId: 'VATEST000001',
      detail: 'True'
  }
  // To check if site exist, set exist field to True
  const existObject = {
      siteId: 'VATEST000001',
      exist: 'True'
  }
  // Pass search criteria in the obect to search for sites
  const searchCriteria = {
      state: 'VA',
      siteType: 'Transporter',
      name: 'test transporter'
  }
  const siteInfo = await haztrak.site(detailObject)
  const siteExist = await haztrak.site(existObject)
  const searchRes = await haztrak.site(searchCriteria)
}
checkSites()
```
#### manifests UI link
Returns a hyperlink to view or sign manifest(s) in RCRAinfo as the specified facility

```javascript
import haztrak from 'haztrak'

const foobar = async () => {
  linkObject = {
     page: <BulkSign | Dashboard | BulkQuickSign | Edit | View | Sign> 
     epaSiteId: <EPA ID Number viewing manifests as>
     mtn: <array of manifest tracking numbers>
   }
  const eManLink = await haztrak.eManLink(linkObject)
}
```
Edit, View and Sign only accept 1 MTN

#### RCRAInfo Lookup
```javascript
import haztrak from 'haztrak'

const foo = async () => {
  const densityCodes = await haztrak.lookup('den')
}
```
haztrak.lookup accepts one of the below string
  - ```den```    &rarr; Density code
  - ```form```   &rarr; Form Codes
  - ```source``` &rarr; Source Code
  - ```state```  &rarr; State waste codes
  - ```fed```    &rarr; Federal Waste Codes
  - ```min```    &rarr; Waste minimization codes
  - ```ports```  &rarr; Ports of entry

#### e-Manifest Lookup

haztrak.eMaLlookup accepts one of the below strings. Parameters with filt require additional arguements 

```javascript
import haztrak from 'haztrak'

const foo = async () => {
  // shippingName and idNumber are only required for codes with filt suffix
  eLookupObject = {
    codes: <name | id | haz | pack | num-suffix | num-siffix-all | cont | uom | load | haz-filt | pack-filt | name-filt | id-filt>
    shippingName: <possibles values from codes='dot'>
    idNumber: <possibles values from codes='id'>
  }
  const shippingNames = await haztrak.eManLookup(eLookupObject) 
}
```

## e-Manifest Examples
Now the good stuff, electronic manifesting
in version 2.0, downloading zip atachments is unsupported.

eMan provides the following methods
1. billHistory
2. bill
3. search
4. correctionDetail
5. correction
6. siteMtn
7. get
8. sites
9. correct
10. revert
11. exists
12. update
13. del
14. save

#### Get
eMan.get takes the manifest tracking number (MTN) and returns an object of the curent version in the e-Manifest system.
```javascript
  import haztrak from 'haztrak'

  const exampleGet = async () => {
    const mtn = '012345678ELC'
    const res = await haztrak.eMan.get(mtn)
  }
  examplesGet()
```

#### Save
eMan.save takes a stringified JSON and returns the e-Manifest response oulined in the [USEPA/e-Manifest](https://github.com/USEPA/e-manifest/blob/master/Services-Information/) documentation.

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
}
testDel()

```
## Contributing
If you have an idea for something you'd like to see in haztrak, please do not be afraid to contribute! I have some general guidelines in [docs/Contributing](./docs/CONTRIBUTING.md) but if you see something you don't like, I'll probably change it for you. 

The general process for contributing code features/improvements is... 
1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Make sure your changes are tested either with unit or UI tests. (npm test)
4. Commit your Changes (git commit -m 'Add some AmazingFeature')
5. Push to the Branch (git push origin feature/AmazingFeature)
6. Open a Pull Request!

If you'd like to propose something, just go right for the pull request. 

There's more ways to contribute than JavaScript, for more details see [docs/Contributing](./docs/CONTRIBUTING.md) :)

## License
haztrak is licensed under the terms of the [MIT license](LICENSE.md)
