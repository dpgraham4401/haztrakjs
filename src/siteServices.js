// siteServices.js

import * as eManAPI from './eManAPI.js'

/**
 * Request EPA ID site details
 *
 * @param {string} siteID the epa id
 * */
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

/**
 * Validate a handler's EPA ID
 *
 * @param {string} siteID
 */
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
