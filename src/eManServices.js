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
    console.error('error.essage ' + error.message)
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

/**
 * Get site-ids by state code and handler type
 *
 * @param {string} stateCode state code (e.g. MA, TX, VA)
 * @param {boolean} siteType handler type (Generator, TSDF, Transporter)
 * */
async function eManSites (stateCode, siteType) {
  try {
    stateCode = stateCode.toUpperCase()
    siteType = siteType.toUpperCase()
    if (siteType !== 'GENERATOR' && siteType !== 'TRANSPORTER' && siteType !== 'TSDF') {
      throw new Error('siteType must be Generator, tsdf, or transporter')
    }
    const res = await eManAPI.get({
      url: `/emanifest/site-ids/${stateCode}/${siteType}`,
      headers: {
        Accept: 'application/json'
      }
    })
    return res.data
  } catch (error) {
    console.error('Problem getting sites')
    console.error(error.message)
    console.error(error.response.data)
  }
}

/**
 * Check whether an manifest tracking number exists
 *
 * @param {string} mtn manifest tracking number
 * */
async function mtnExists (mtn) {
  try {
    const res = await eManAPI.get({
      url: `/emanifest/manifest/mtn-exists/${mtn}`,
      headers: {
        Accept: 'application/json'
      }
    })
    return res.data
  } catch (error) {
    console.error('Problem testing if mtn exist')
    console.error(error.message)
  }
}

/**
 * Get all manifest tracking number (MTN) for a given ID
 *
 * @param {string} siteId EPA id number
 * */
async function siteMtn (siteId) {
  try {
    const res = await eManAPI.get({
      url: `/emanifest/manifest-tracking-numbers/${siteId}`,
      headers: {
        Accept: 'application/json'
      }
    })
    return res.data
  } catch (error) {
    console.error(`Problem getting the MTNs for ${siteId}`)
    console.error(error.message)
  }
}

/**
 * Revert manifest under correction to previous version
 *
 * @param {string} mtn manifest tracking number (MTN)
 * */
async function eManRevert (mtn) {
  try {
    const res = await eManAPI.get({
      url: `/emanifest/manifest/revert/${mtn}`,
      headers: {
        Accept: 'application/json'
      }
    })
    return res.data
  } catch (error) {
    console.error(`Problem reverting ${mtn}`)
    console.error(error.message)
  }
}

/**
 * Retrieve bill for provided bill id or date
 *
 * @param {object} bill billing object by ID or date
 * @param {string} bill.billId invoice id number
 * @param {string} bill.billingAccount billing account number
 * @param {string} monthYear invoice month and year (mm/yyy)
 * */
async function eManBill (bill) {
  try {
    const billData = JSON.stringify(bill)
    const res = await eManAPI.post({
      url: '/emanifest/billing/bill',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'text/plain'
      },
      data: billData
    })
    return res.data
  } catch (error) {
    console.error('Problem retrieving bill')
    console.error(error.message)
    console.error(error.response.data)
  }
}

/**
 * Retrieve billing history by account ID
 *
 * @param {object} bill billing object by ID or date
 * @param {string} bill.billingAccount billing account number
 * @param {string} bill.startMonthYear start of invoice months and year (mm/yyy)
 * @param {string} bill.endMonthYear end of invoice months and year (mm/yyy)
 * */
async function eManBillHistory (bill) {
  try {
    const billData = JSON.stringify(bill)
    const res = await eManAPI.post({
      url: '/emanifest/billing/bill-history',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'text/plain'
      },
      data: billData
    })
    return res.data
  } catch (error) {
    console.error('Problem retrieving bill history')
    console.error(error.message)
    console.error(error.response.data)
  }
}

/**
 * Retrieve all correction version info
 *
 * @param {string} mtn manifest tracking number (MTN)
 * */
async function eManCorrectionDetails (mtn) {
  try {
    const res = await eManAPI.get({
      url: `/emanifest/manifest/correction-details/${mtn}`,
      headers: {
        Accept: 'application/json'
      }
    })
    return res.data
  } catch (error) {
    console.error(`Problem reverting ${mtn}`)
    console.error(error.message)
  }
}

export {
  eManBillHistory as billHistory,
  eManBill as bill,
  // get manifests attachments
  eManSearch as search,
  eManCorrectionDetails as correctionDetail,
  // correction-version
  siteMtn,
  eManGet as get,
  eManSites as sites,
  // correct
  eManRevert as revert,
  // correction-verion/attachment
  mtnExists as exists,
  // update
  eManDel as del,
  eManSave as save
}
