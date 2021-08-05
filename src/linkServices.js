// e-Manifest UI Link Serves

import * as eManAPI from './eManAPI.js'

/**
 * Create link to view/sign e-Manifest 
 *
 * @param {object} linkObj object with parameters of the requested link
 * @param {string} linkObj.page BulkSign | Dashboard | BulkQuickSign | Edit | View | Sign 
 * @param {string} linkObj.epaSiteId epa id Number signing for
 * @param {array} linkObj.mtn array of manifest tracking numbers
 * 
 * @link https://github.com/USEPA/e-manifest 
 *
 * @return {string} Deep link to e-Manifest page
 * */
async function eManLink (linkObj) {
  try {
    if (linkObj.page.length > 5) {
      if (linkObj.page.toUpperCase() === 'BULKSIGN') {
        var postData = {
          page: 'BulkSign'
        }
      } else {
        var postData = {
          page: 'Dashboard'
        }
      }
      postData.epaSiteId = linkObj.epaSiteId.toUpperCase()
      if (linkObj.mtn) {
        postData.filter = linkObj.mtn.map((x) => { return x.toUpperCase()})
      }
      const res = await eManAPI.post({
        url: '/links/emanifest',
        data: postData 
      })
      return res.data
    } else {
      const postData = {
        page: linkObj.page.charAt(0).toUpperCase() + linkObj.page.slice(1).toLowerCase(),
        manifestTrackingNumber: linkObj.mtn.toUpperCase(),
        epaSiteId: linkObj.epaSiteId.toUpperCase()
      }
      const res = await eManAPI.post({
        url: '/links/emanifest',
        data: postData 
      })
      return res.data
    }
  } catch (error) {
    console.error(error.message)
    console.error(error.response)
  }
}

export { eManLink }
