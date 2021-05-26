// e-Manifest Services

// const eManAPI = require('./eManAPI')
import * as eManAPI from './eManAPI.js'

/**
 * Get manifests Data and/or attachment
 *
 * @param {string} mtn manifest tracking number
 * @param {boolean} attachments [1] get zip files [0] just JSON
 * */
async function eManGet (mtn, attachments = 0) {
  try {
    if (attachments) {
      // const res = await eManAPI.get({
      //   url: `/emanifest/manifest/${mtn}/attachments`,
      //   // responeType: 'blob',
      //   headers: {
      //     Accept: 'multipart/mixed'
      //   }
      // })
      // return res
      console.log('This feature is unsupported for this release')
    } else {
      const res = await eManAPI.get({
        url: `/emanifest/manifest/${mtn}`,
        headers: {
          Accept: 'application/json'
        }
      })
      return res.data
    }
    // console.log(res.data)
  } catch (error) {
    console.error(error)
  }
}

export { eManGet }

// Testing Area
// const mtn = '100024721ELC'
// const attachments = 0
// eManGet(mtn, attachments)
