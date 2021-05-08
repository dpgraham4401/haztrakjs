
<h1 align="center"><em> hazTrak </em></h1>

<p align="center">An npm package to integrate with e-Manifest and consume RCRAInfo APIs</p>

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

## Table of Contents

  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Example](#examples)
    - [Site Exist](#site-exist)
    - [Manifest UI Link](#manifests-ui-link)


[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

## Installation
Currently unavailable

```bash 
  npm install hazTrak
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

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
