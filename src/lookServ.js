// lookServ.js

import * as eManAPI from './eManAPI.js'

/**
 * Lookup for RCRAInfo codes
 *
 * @param {string} den, min, port, form, source, state, fed, or mngt
 * */
async function lookup (codes, stCode = 'CA') {
  try {
    let codeUrl = ''
    // if (typeof (codes) !== 'string') {
    //  throw new Error('code type must be string')
    // }
    if (codes === 'den') {
      codeUrl = '/lookup/density-uom'
    } else if (codes === 'form') {
      codeUrl = '/lookup/form-codes'
    } else if (codes === 'source') {
      codeUrl = '/lookup/source-codes'
    } else if (codes === 'state') {
      codeUrl = `/lookup/state-waste-codes/${stCode}`
    } else if (codes === 'fed') {
      codeUrl = 'lookup/federal-waste-codes'
    } else if (codes === 'min') {
      codeUrl = 'lookup/waste-minimization-codes'
    } else if (codes === 'ports') {
      codeUrl = 'lookup/ports-of-entry'
    } else {
      throw new Error('unknown code url')
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
