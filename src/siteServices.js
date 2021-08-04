// siteServices.js

import * as eManAPI from './eManAPI.js'

/**
 * Request site details/exists or search for site.
 *
 * Set siteInfo.details = True for site details, siteInfo.exist=True for site exists
 * if both are undefined, site will search using the other criteria
 * See e-Manifest documentation for required search criteria.
 *
 * @param {object} siteInfo object containing the EPA ID or search criteria
 * @param {string} siteInfo.siteId EPA ID to get details or check if exists 
 * @param {boolean} siteInfo.details if true, get siteId details and exit
 * @param {boolean} siteInfo.exist if true, check if siteId exist and exit 
 * @param {string} siteInfo.epaSiteId optional if searching
 * @param {string} siteInfo.name use if searching
 * @param {string} siteInfo.streetNumber optional if searching
 * @param {string} siteInfo.address1 optional if searching
 * @param {string} siteInfo.city optional if searching
 * @param {string} siteInfo.state use if searching
 * @param {string} siteInfo.zip optional if searching
 * @param {string} siteInfo.siteType Generator | Tsdf | Transporter | Broker use if searching
 * @param {integer} siteInfo.pageNumber number > 0 optional if searching
 * */
async function site (siteInfo) {
  try {
    if (siteInfo.details) {
      const res = await eManAPI.get({
        url: `./site-details/${siteInfo.siteId}`
      })
      return res.data
    } else if (siteInfo.exist) {
      const res = await eManAPI.get({
        url: `./site-exists/${siteInfo.siteId}`
      })
      return res.data
    } else {
      const {siteId, details, exist, ...searchObj} = siteInfo
      // console.log(searchObj)
      const res = await eManAPI.post({
        url: '/site-search',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'text/plain'
        },
        data: searchObj
        
      })
      return res.data
    }
  } catch (error) {
    console.error(error.message)
    console.error(error.response.data)
  }
}
 
// /**
//  * Validate a handler's EPA ID
//  *
//  * @param {string} siteID
//  */
// async function siteExist (siteID) {
//   try {
//     const res = await eManAPI.get({
//       url: `./site-exists/${siteID}`
//     })
//     // console.log(res.data)
//     return res.data
//   } catch (error) {
//     console.error(error.request)
//     console.error(error.message)
//     console.error(error.response.data)
//   }
// }
// 
// // beta
// // eslint-disable-next-line no-unused-vars
// async function siteSearch () {
//   try {
//     const res = await eManAPI.post({
//       url: '/site-search',
//       data: {
//         name: 'Heating and Oil',
//         // eslint-disable-next-line quotes
//         zip: "22033",
//         // eslint-disable-next-line quotes
//         state: "VA"
//       }
//     })
//     console.log(res.data)
//   } catch (error) {
//     console.error(error.message)
//     console.error(error.response.data)
//   }
// }

export { site }
