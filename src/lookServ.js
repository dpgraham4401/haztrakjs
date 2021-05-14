// lookServ.js

import * as eManAPI from './eManAPI.js'

/**
 * Lookup for RCRAInfo codes
 *
 * @param {string} den, min, port, form, source, state, fed, or mngt
 * */
async function lookup (codes) {
  try {
    let codeUrl = ''
    if (codes === 'den') {
      codeUrl = '/lookup/density-uom'
    }
    const res = await eManAPI.get({
      url: codeUrl
    })
    // console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export { lookup }

// test area
lookup('den')
