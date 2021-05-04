// e-Manifest UI Link Serves

const eManAPI = require('./eManAPI')

async function eManLink (page = 'Dashboard', siteID, mtn) {
  try {
    if (page.length > 5) {
      // eslint-disable-next-line eqeqeq
      if (page.toUpperCase() == 'BULKSIGN') {
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
      console.log(resUiLink.data)
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
      console.log(resUiLink.data)
    }
  } catch (error) {
    console.error(error)
  }
}

exports.eManLink = eManLink

// Testing Area
// const page = 'BulkSign';
// const siteID  = 'VATEST000001';
// const mtn = ['100031335ELC', '019404529JJK', '019404519JJK'];
// const siteDate = eManLink(page, siteID, mtn)
