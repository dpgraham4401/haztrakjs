// siteServices.js

// const eManAPI = require('./eManAPI')
import * as eManAPI from './eManAPI.js'

async function siteDetails (siteID) {
  try {
    const siteRes = await eManAPI.get({
      url: `./site-details/${siteID}`
    })
    console.log(siteRes.data)
  } catch (error) {
    console.error(error)
  }
}

async function siteExist (siteID) {
  try {
    const siteRes = await eManAPI.get({
      url: `./site-exists/${siteID}`
    })
    console.log(siteRes.data)
  } catch (error) {
    console.error(error)
  }
}

// need to debug
// eslint-disable-next-line no-unused-vars
async function siteSearch () {
  try {
    const siteRes = await eManAPI.post({
      url: '/site-search',
      data: {
        name: 'Heating and Oil',
        // eslint-disable-next-line quotes
        zip: "22033",
        // eslint-disable-next-line quotes
        state: "VA"
      }
    })
    console.log(siteRes.data)
  } catch (error) {
    console.error(error)
  }
}

export { siteDetails, siteExist }
// module.exports.siteDeatils = SiteDetails
// module.exports.siteExists = SiteExist

// Testing area
// const baseUrl = 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api/v1/';
// const siteID  = 'VATEST000001';
// const searchData = {
//    "epaSiteId": 'VATEST000001'
// }
// const siteDate = siteSearch();
