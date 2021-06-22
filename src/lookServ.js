// lookServ.js

import * as eManAPI from './eManAPI.js'

/**
 * Lookup for RCRAInfo codes
 *
 * @param {string} codes den, min, port, form, source, state, fed, or mngt
 * */
async function lookup (codes, stateCode = 'CA') {
  try {
    codes = codes.toUpperCase()
    let codeUrl = ''
    switch (codes) {
      case 'DEN':
        codeUrl = '/lookup/density-uom'
        break
      case 'FORM':
        codeUrl = '/lookup/form-codes'
        break
      case 'SOURCE':
        codeUrl = '/lookup/source-codes'
        break
      case 'STATE':
        if (arguments.length === 2) {
          codeUrl = `/lookup/state-waste-codes/${stateCode}`
        } else {
          console.error('state waste code requires 2 arguments')
          throw new Error('Unknown stateCode')
        }
        break
      case 'FED':
        codeUrl = '/lookup/federal-waste-codes'
        break
      case 'MNGT':
        codeUrl = '/lookup/management-method-codes'
        break
      case 'MIN':
        codeUrl = '/lookup/waste-minimization-codes'
        break
      case 'PORT':
        codeUrl = '/lookup/ports-of-entry'
        break
      default:
        console.error("'try'  'den', 'min', 'port', 'form', 'source', 'state', 'fed', or 'mngt'")
        throw new Error('Unkown lookup code')
    }
    const res = await eManAPI.get({
      url: codeUrl
    })
    // console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error.message)
    console.error(error.response.data)
  }
}

export { lookup }
