
# Rint

npm package to integrate with with EPA's RCRAInfo and e-Manifest system




[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

  
## Features

- Validate EPA ID
- Deep Link to e-Manifest sign
- Get site details

  
## Installation (Placeholder)

Currently unavailable

```bash 
  npm install 
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`RCRAINFO_API_ID`

`RCRAINFO_API_KEY`

  
## Exmaple

### Site Exist

```javascript
import * as eMan from 'Rint'

const siteID = 'VATEST000001'
const siteIdCheck = eMan.siteExist(siteID)
```
### e-Manifest UI link

```javascript
import * as eMan from 'Rint'

const siteID = 'VATEST000001'
const page   = 'BulkSign'
const mtn    = ['000000001ELC', '000000002ELC', '000000003ELC']
const siteIdCheck = eMan.eManLink(page, siteID, mtn)
```