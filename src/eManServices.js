// e-Manifest Services
import FormData from 'form-data'
import * as eManAPI from './eManAPI.js'
import fs from 'fs'

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
      const res = await eManAPI.get({
        url: `/emanifest/manifest/${mtn}/attachments`,
        headers: {
          Accept: 'multipart/mixed'
        }
      })
      const form = new FormData()
      form.append('data', res.data)
      return res.data
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
 * Delete manifests when allowed
 *
 * @param {string} mtn manifest tracking number
 * */
async function eManDel (mtn) {
  try {
    mtn = mtn.toUpperCase()
    const res = await eManAPI.delete({
      url: `/emanifest/manifest/delete/${mtn}`,
      headers: {
        Accept: 'application/json'
      }
    })
    return res.data
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
  * @param {string} zipPath Path to zip attachment
  * */
async function eManSave (mtnJson, zipPath) {
  try {
    if (zipPath) {
      const form = new FormData()
      form.append('manifest', mtnJson)
      form.append('attachment', fs.createReadStream(zipPath))
      const formHeaders = form.getHeaders()
      console.log(formHeaders)
      const res = await eManAPI.post({
        url: 'emanifest/manifest/save',
        headers: {
          ...formHeaders
        },
        data: form
      })
      return res.data
    } else {
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
    }
  } catch (error) {
    console.error('Problem saving manifest')
    console.error(error.message)
    console.error(error.response.data)
  }
}

export { eManGet as get, eManSave as save, eManDel as delete }
