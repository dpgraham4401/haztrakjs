// e-Manifest Services
import FormData from 'form-data'
import * as eManAPI from './eManAPI.js'
import fs from 'fs'

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
 * search: retrieve manifest tracking numbers based on search criteria
 *
 * @param {object} search object wit search criteria
 * @param {string} search.siteId site EPA ID number
 * @param {string} search.status Pending | Scheduled | InTransit | Recieved | ReadyForSignature | SignedComplete | UnderCorrection | Corrected
 * @param {string} search.dateType CertifiedDate | RecievedDate | ShippedDate | UpdateDate
 * @param {string} search.siteType Generator | Tsdf | Transporter | RejectionInfo_AlternateTsdf
 * @param {string} search.startDate date in ___ format
 * @param {string} search.endDate date in ___ format
 **/
async function eManSearch (search) {
  try {
    const searchData = JSON.stringify(search)
    const res = await eManAPI.post({
      url: '/emanifest/search',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'text/plain'
      },
      data: searchData
    })
    return res.data
  } catch (error) {
    console.error('Problem retrieving bill history')
    console.error(error.message)
    console.error(error.response.data)
  }
}

/**
 * Correction-details: Retrieve all correction version info
 *
 * @param {string} mtn manifest tracking number (MTN)
 **/
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

/**
 * Correction-version: Retrieve details of manifest correction version
 *
 * @param {object} version
 * @param {string} version.manifestTrackingNumber mtn
 * @param {string} version.status Signed | UnderCorrection | Corrected
 * @param {string} version.ppcStatus PendingDataEntry | DataQaCompleted
 * @param {integer} version.versionNumber integer >= 1
 * @param {string} attachment path where to save pdf [liable to change]
 **/
async function eManCorrection (version) {
  try {
    const versionData = JSON.stringify(version)
    const res = await eManAPI.post({
      url: '/emanifest/manifest/correction-version',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'text/plain'
      },
      data: versionData
    })
    return res.data
  } catch (error) {
    console.error('Problem retrieving correction version details/attachment')
    console.error(error.message)
    console.error(error.response.data)
  }
}

/**
 * siteMtn: Get all manifest tracking number (MTN) for a given ID
 *
 * @param {string} siteId EPA id number
 **/
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
 * site-ids: Get site-ids by state code and handler type
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
 * Revert: manifest under correction to previous version
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
 * mtnExists: Check whether an manifest tracking number exists
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
  * Update: update manifest with JSON and optional zip attachment
  *
  * @param {string} mtnJson manifest object
  * @param {string} zipPath Path to zip attachment
  * */
async function eManUpdate (mtnJson, zipPath) {
  try {
    if (zipPath) {
      const form = new FormData()
      form.append('manifest', mtnJson)
      form.append('attachment', fs.createReadStream(zipPath))
      const formHeaders = form.getHeaders()
      console.log(formHeaders)
      const res = await eManAPI.put({
        url: 'emanifest/manifest/update',
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
      const res = await eManAPI.put({
        url: 'emanifest/manifest/update',
        headers: {
          ...formHeaders
        },
        data: form
      })
      return res.data
    }
  } catch (error) {
    console.error('Problem updating manifest')
    console.error(error.message)
    console.error(error.response.data)
  }
}

/**
 * Delete: manifests when allowed
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
  * Save: manifest with JSON and optional zip attachment
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

export {
  eManBillHistory as billHistory,
  eManBill as bill,
  eManSearch as search,
  eManCorrectionDetails as correctionDetail,
  eManCorrection as correction,
  siteMtn,
  eManGet as get,
  // get manifests attachments
  eManSites as sites,
  // correct
  eManRevert as revert,
  // correction-verion/attachment
  mtnExists as exists,
  eManUpdate as update,
  eManDel as del,
  eManSave as save
}
