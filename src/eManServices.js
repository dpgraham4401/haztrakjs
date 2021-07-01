// e-Manifest Services
import FormData from 'form-data'
import * as eManAPI from './eManAPI.js'

/**
 * Get manifests Data and/or attachment
 *
 * @param {string} mtn manifest tracking number
 * @param {boolean} attachments [1] get zip files [0] just JSON
 * */
async function eManGet (mtn, attachments = false) {
  try {
    mtn = mtn.toUpperCase()
    if (attachments) {
      // getting attachments not suppported yet
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
    console.error('Problem getting manifest')
    console.error(error.message)
    console.error(error.response.data)
  }
}

/**
  * Save manifest with JSON and optional zip attachment
  *
  * @param {string} mtnJson manifest object
  * @param {string} path path to zip attachment
  * */
async function eManSave (mtnJson, path) {
  if (path) {
    // submitting zip attachment not supported in this version
  } else {
    try {
      const form = new FormData()
      form.append('manifest', mtnJson)
      const formHeaders = form.getHeaders()
      const res = await eManAPI.post({
        url: 'emanifest/manifest/save',
        headers: {
          ...formHeaders
        },
        data: form
      })
      return res.data
    } catch (error) {
      console.error('Problem saving manifest')
      console.error(error.message)
      console.error(error.response.data)
    }
  }
}

export { eManGet as get, eManSave as save }
