<p align="center">
<img src="https://github.com/dpgraham4401/hazTrak/blob/master/logo.png">
</p>
<h1 align="center"><em> hazTrak </em></h1>

<p align="center">An npm package to integrate with the EPA electronic hazardous waste tracking system e-Manifest</p>

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

## Table of Contents
  - [Intro](#Intro)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Example](#examples)
    - [Site Exist](#site-exist)
    - [Manifest UI Link](#manifests-ui-link)

## Intro
This packages aims to make using the e-Manifest API easier to consume. For additional information about e-Manifest, check out the below links
  - [RCRAInfo](https://rcrainfo.epa.gov)
  - [RCRAifno PreProduction](https://rcrainfopreprod.epa.gov)
  - [USEPA/e-Manifest Github](https://github.com/USEPA/e-manifest)
  - [About e-Manifest](https://www.epa.gov/e-manifest)

## Installation
Currently unavailable

```bash 
  npm install hazTrak
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`BASE_URL` RCRAInfo or PreProd baseURL [see e-Manifest doc](https://github.com/USEPA/e-manifest/blob/master/Services-Information/e-Manifest%20Authenticate%20Get%20and%20Lookup%20Services%20v6.3.pdf)

`RCRAINFO_API_ID`

`RCRAINFO_API_KEY`

  
## Examples

### Site Exist
```javascript
import * as eMan from 'Rint'

const siteID = 'VATEST000001'
const siteIdCheck = eMan.siteExist(siteID)
```

### manifests UI link
```javascript
import * as eMan from 'Rint'

const siteID = 'VATEST000001'
const page   = 'BulkSign'
const mtn    = ['000000001ELC', '000000002ELC', '000000003ELC']
const siteIdCheck = eMan.eManLink(page, siteID, mtn)
```
