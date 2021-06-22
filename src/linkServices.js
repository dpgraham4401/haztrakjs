// e-Manifest UI Link Serves

import * as eManAPI from './eManAPI.js'

/**
 * Create link to e-Manifest signature page
 *
 * @param {string} page default=Dashboard, BulkSign
 * @param {string} siteID epa id
 * @param {array} array of manifest tracking numbers
 *
 * @return {string} Deep link to e-Manifest page
 * */
async function eManLink (page = 'Dashboard', siteID, mtn) {
  try {
    if (page.length > 5) {
      if (page.toUpperCase() === 'BULKSIGN') {
        page = 'BulkSign'
      } else {
        page = 'Dashboard'
      }
      const resUiLink = await eManAPI.post({
        url: '/links/emanifest',
        data: {
          page: page,
          epaSiteId: siteID,
          filter: mtn
        }
      })
      return resUiLink.data
      // console.log(resUiLink.data)
    } else {
      page = page.charAt(0).toUpperCase() + page.slice(1).toLowerCase()
      mtn = mtn.toUpperCase()
      siteID = siteID.toUpperCase()
      const resUiLink = await eManAPI.post({
        url: '/links/emanifest',
        data: {
          page: page,
          epaSiteId: siteID,
          manifestTrackingNumber: mtn
        }
      })
      // console.log(resUiLink.data)
      return resUiLink.data
    }
  } catch (error) {
    console.error(error.message)
    console.error(error.response.data)
  }
}

export { eManLink }
